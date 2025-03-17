// src/components/journal/WriteJournal.tsx
import React, { useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { getApiUrl } from '../../lib/api';


interface WriteJournalProps {
  user: any;
  onEntrySubmitted: () => void;
}

const WriteJournal: React.FC<WriteJournalProps> = ({ user, onEntrySubmitted }) => {
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Add tags to the request
      const res = await axios.post(`${getApiUrl()}/journals`, {
        entry,
        user_id: user.id,
        tags: tags
      });
      
      setResponse(res.data.message);
      setSentiment(res.data.sentiment_summary);
      setEntry("");
      setTags([]);
      
      // Notify parent component that entry was submitted
      setTimeout(() => {
        onEntrySubmitted();
      }, 2000);
      
    } catch (error) {
      setResponse("Error saving entry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Write in Your Journal</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="relative mb-6">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="How are you feeling today?"
            rows={5}
            className="w-full bg-gray-50 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 p-4 text-gray-700 resize-none shadow-inner"
            required
          />
        </div>
        
        {/* Tags section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags (optional)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1.5 text-blue-500 hover:text-blue-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              className="flex-grow border rounded-l-lg p-2"
              placeholder="Add a tag..."
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-gray-100 border border-l-0 border-gray-300 px-3 rounded-r-lg"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FiSend size={18} />
            )}
            <span>Save Entry</span>
          </button>
        </div>
      </form>
      
      {response && (
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
          <p className="text-blue-800">
            {response} {sentiment && <span className="font-medium">— {sentiment}</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default WriteJournal;