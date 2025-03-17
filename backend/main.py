import os
import ssl
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
import openai
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from dotenv import load_dotenv
from typing import Optional
from openai import OpenAI

load_dotenv()
ssl._create_default_https_context = ssl._create_unverified_context
nltk.download('vader_lexicon')

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "API is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://journal-kqvg.onrender.com", "https://journal-ui.onrender.com", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not SUPABASE_URL or not SUPABASE_KEY or not OPENAI_API_KEY:
    raise Exception("Missing one or more required environment variables: SUPABASE_URL, SUPABASE_KEY, OPENAI_API_KEY")

client = openai.OpenAI(api_key=OPENAI_API_KEY)
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

class JournalEntry(BaseModel):
    entry: str
    user_id: str  

class CounselorRequest(BaseModel):
    user_id: str

@app.post("/journal")
async def create_journal_entry(journal_entry: JournalEntry):
    entry_text = journal_entry.entry
    user_id = journal_entry.user_id

    try:
        analyzer = SentimentIntensityAnalyzer()
        sentiment_result = analyzer.polarity_scores(entry_text)
        sentiment_score = sentiment_result['compound']
        if sentiment_score >= 0.05:
            sentiment_summary = "Positive 😊"
        elif sentiment_score <= -0.05:
            sentiment_summary = "Negative 😞"
        else:
            sentiment_summary = "Neutral"

        data = supabase.table("journal_entries").insert({
            "user_id": user_id,
            "entry": entry_text,
            "sentiment": sentiment_score
        }).execute()

        return {
            "message": "Journal entry saved!",
            "sentiment": sentiment_score,
            "sentiment_summary": sentiment_summary
        }
    except Exception as e:
        print("Error saving journal entry:", e)
        raise HTTPException(status_code=500, detail=f"Error saving journal entry: {e}")

@app.get("/journals/{user_id}")
async def get_journals(user_id: str):
    try:
        response = supabase.table("journal_entries")\
                           .select("*")\
                           .eq("user_id", user_id)\
                           .order("created_at", desc=True)\
                           .execute()
        return response.data
    except Exception as e:
        print("Error fetching journals:", e)
        raise HTTPException(status_code=500, detail=f"Error fetching journals: {e}")

@app.get("/prompt")
async def get_prompt():
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt="Generate a creative journaling prompt for self-reflection:",
            max_tokens=50,
            n=1,
            stop=None,
            temperature=0.7
        )
        prompt_text = response.choices[0].text.strip()
        return {"prompt": prompt_text}
    except Exception as e:
        print("Error generating prompt:", e)
        raise HTTPException(status_code=500, detail=f"Error generating prompt: {e}")

@app.post("/counselor")
async def counselor_endpoint(request: CounselorRequest):
    user_id = request.user_id
    try:
        response = supabase.table("journal_entries") \
                           .select("*") \
                           .eq("user_id", user_id) \
                           .order("created_at", desc=True) \
                           .execute()
        user_entries = response.data
        if not user_entries:
            return {"analysis": "No journal entries found for this user."}

        joined_entries = "\n".join(
            f"- {entry['entry']} (sentiment: {entry['sentiment']})"
            for entry in user_entries
        )
        custom_prompt = (
            "Based on the following journal entries, provide personalized psychological insights and self-care recommendations:\n\n"
            f"{joined_entries}"
        )

        openai_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI counselor."},
                {"role": "user", "content": custom_prompt},
            ],
            max_tokens=200,
            temperature=0.7
        )

        analysis_text = openai_response.choices[0].message.content.strip()

        return {"analysis": analysis_text}

    except Exception as e:
        print("Error in counselor endpoint:", e)
        raise HTTPException(status_code=500, detail=f"Error generating counseling: {e}")


class ChatRequest(BaseModel):
    user_id: str
    message: str
    context: Optional[str] = None
    initial_analysis: Optional[str] = None

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    user_id = request.user_id
    user_message = request.message
    context = request.context
    initial_analysis = request.initial_analysis
    
    try:
        system_message = (
            "You are an empathetic AI counselor who provides thoughtful psychological insights "
            "and practical coping strategies based on a user's journal entries and ongoing conversation. "
            "Keep your responses helpful, supportive, and concise (around 2-3 paragraphs)."
        )
        
        messages = [
            {"role": "system", "content": system_message},
        ]
        
        if initial_analysis:
            messages.append({
                "role": "system", 
                "content": f"Initial analysis of the user's journal entries: {initial_analysis}"
            })
        
        if context:
            messages.append({
                "role": "system", 
                "content": f"Recent conversation context:\n{context}"
            })
        
        messages.append({"role": "user", "content": user_message})
        
        openai_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=250,
            temperature=0.7
        )

        response_text = openai_response.choices[0].message.content.strip()

        return {"response": response_text}

    except Exception as e:
        print("Error in chat endpoint:", e)
        raise HTTPException(status_code=500, detail=f"Error generating response: {e}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
