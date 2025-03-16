// src/components/journal/EntryDetail.tsx
import React from "react";

interface EntryDetailProps {
  entry: {
    id: number;
    entry: string;
    sentiment: number;
    created_at: string;
    tags?: string[];
  };
  onBack: () => void;
}

const EntryDetail: React.FC<EntryDetailProps> = ({ entry, onBack }) => {
  // Function to get sentiment label
  const getSentimentLabel = (score: number) => {
    if (score > 0.3) return "Positive";
    if (score < -0.3) return "Negative";
    return "Neutral";
  };
  
  // Function to get sentiment color classes
  const getSentimentColorClass = (score: number) => {
    if (score > 0.3) return "bg-green-100 text-green-800";
    if (score < -0.3) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
      >
        <svg 
          className="h-5 w-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="ml-1">Back to entries</span>
      </button>
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">
            {new Date(entry.created_at).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          <span className={`px-3 py-1 rounded-full text-sm ${getSentimentColorClass(entry.sentiment)}`}>
            {getSentimentLabel(entry.sentiment)}
          </span>
        </div>
        
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
          {entry.entry}
        </p>
        
        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {entry.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Show exact time */}
        <div className="mt-6 text-sm text-gray-500">
          <span>Created at: {new Date(entry.created_at).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default EntryDetail;