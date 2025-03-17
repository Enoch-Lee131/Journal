// src/components/journal/ViewJournals.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import EntryCard from "./EntryCard";
import EntryDetail from "./EntryDetail";
import ListView from "./ListView";
import CalendarView from "./CalendarView";
import TimelineView from "./TimelineView";

interface ViewJournalsProps {
  user: any;
}

const ViewJournals: React.FC<ViewJournalsProps> = ({ user }) => {
  const [journalList, setJournalList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // "all", "positive", "negative", "neutral"
  const [viewMode, setViewMode] = useState("list"); // "list", "calendar", "timeline"
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  useEffect(() => {
    fetchJournals();
  }, [user]);

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/journals/${user.id}`);
      setJournalList(res.data);
    } catch (error) {
      console.error("Error fetching journals:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = journalList.filter(entry => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      entry.entry.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Sentiment filter
    const matchesSentiment = 
      filterMode === "all" ||
      (filterMode === "positive" && entry.sentiment > 0.3) ||
      (filterMode === "negative" && entry.sentiment < -0.3) ||
      (filterMode === "neutral" && entry.sentiment >= -0.3 && entry.sentiment <= 0.3);
    
    return matchesSearch && matchesSentiment;
  });

  // Render entry detail view if an entry is selected
  if (selectedEntry) {
    return (
      <EntryDetail 
        entry={selectedEntry} 
        onBack={() => setSelectedEntry(null)} 
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mx-auto max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Journal Entries</h2>
      
      {/* Search and filter controls */}
      <div className="mb-6">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-200"
          />
          <svg 
            className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* Filter controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1.5 rounded-full text-sm ${filterMode === "all" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterMode("positive")}
            className={`px-3 py-1.5 rounded-full text-sm ${filterMode === "positive" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
          >
            Positive
          </button>
          <button
            onClick={() => setFilterMode("negative")}
            className={`px-3 py-1.5 rounded-full text-sm ${filterMode === "negative" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}
          >
            Negative
          </button>
          <button
            onClick={() => setFilterMode("neutral")}
            className={`px-3 py-1.5 rounded-full text-sm ${filterMode === "neutral" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}
          >
            Neutral
          </button>
        </div>
        
        {/* View mode selector */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 text-sm rounded-md ${viewMode === "list" ? "bg-white shadow" : ""}`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-4 py-2 text-sm rounded-md ${viewMode === "calendar" ? "bg-white shadow" : ""}`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 text-sm rounded-md ${viewMode === "timeline" ? "bg-white shadow" : ""}`}
            >
              Timeline
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No journal entries found.</p>
        </div>
      ) : (
        <>
          {viewMode === "list" && (
            <ListView 
              entries={filteredEntries} 
              onEntryClick={setSelectedEntry} 
            />
          )}
          
          {viewMode === "calendar" && (
            <CalendarView 
              entries={filteredEntries}
              onDateClick={(date) => {
                // Filter entries for the selected date
                const entriesOnDate = filteredEntries.filter(entry => {
                  const entryDate = new Date(entry.created_at);
                  return (
                    entryDate.getDate() === date.getDate() &&
                    entryDate.getMonth() === date.getMonth() &&
                    entryDate.getFullYear() === date.getFullYear()
                  );
                });
                
                // If there's only one entry, select it directly
                if (entriesOnDate.length === 1) {
                  setSelectedEntry(entriesOnDate[0]);
                }
                // Otherwise, keep current view but filter to just that date
                // (This would require additional state management)
              }}
            />
          )}
          
          {viewMode === "timeline" && (
            <TimelineView 
              entries={filteredEntries} 
              onEntryClick={setSelectedEntry} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ViewJournals;