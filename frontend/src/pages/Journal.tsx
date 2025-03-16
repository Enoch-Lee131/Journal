// src/pages/Journal.tsx
import React, { useState } from "react";
import WriteJournal from "../components/journal/WriteJournal";
import ViewJournals from "../components/journal/ViewJournals";
import AICounselor from "../components/ai/AICounselor";

interface JournalProps {
  user: any;
}

const Journal: React.FC<JournalProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState("write"); // "write", "entries", "mood", or "counselor"
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Logo positioned in the center */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-light tracking-wide text-indigo-600">
          MINDSPACE
        </h1>
      </div>
      
      {/* Tab navigation */}
      <div className="bg-white shadow-sm mb-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setActiveTab("write")} 
              className={`py-4 px-6 border-b-2 font-medium ${activeTab === "write" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              New Entry
            </button>
            <button 
              onClick={() => setActiveTab("entries")} 
              className={`py-4 px-6 border-b-2 font-medium ${activeTab === "entries" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              Past Entries
            </button>
            <button 
              onClick={() => setActiveTab("mood")} 
              className={`py-4 px-6 border-b-2 font-medium ${activeTab === "mood" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              Mood Analyzer
            </button>
            <button 
              onClick={() => setActiveTab("counselor")} 
              className={`py-4 px-6 border-b-2 font-medium ${activeTab === "counselor" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              AI Counselor
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 flex-grow">
        {activeTab === "write" && (
          <WriteJournal 
            user={user} 
            onEntrySubmitted={() => setActiveTab("entries")} 
          />
        )}
        {activeTab === "entries" && (
          <ViewJournals user={user} />
        )}
        {activeTab === "mood" && (
          <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mood Analyzer</h2>
            <p className="text-gray-600">
              This feature analyzes the sentiment and emotions in your journal entries to help you understand your mood patterns over time.
            </p>
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <p className="text-center text-gray-500">Mood analysis will be implemented here.</p>
            </div>
          </div>
        )}
        {activeTab === "counselor" && (
          <AICounselor user={user} />
        )}
      </div>
    </div>
  );
};

export default Journal;