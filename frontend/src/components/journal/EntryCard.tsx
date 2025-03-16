// src/components/journal/EntryCard.tsx
import React from "react";

interface EntryCardProps {
  entry: {
    id: number;
    entry: string;
    sentiment: number;
    created_at: string;
    tags?: string[];
  };
  onClick?: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onClick }) => {
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
  
  // Truncate long entries
  const truncateEntry = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div 
      className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <p className="text-gray-700">{truncateEntry(entry.entry)}</p>
      
      {/* Tags if available */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {entry.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
        <span className={`rounded-full px-2 py-1 ${getSentimentColorClass(entry.sentiment)}`}>
          {getSentimentLabel(entry.sentiment)}
        </span>
        <span>{new Date(entry.created_at).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default EntryCard;