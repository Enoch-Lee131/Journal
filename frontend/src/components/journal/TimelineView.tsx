// src/components/journal/TimelineView.tsx
import React from "react";
import EntryCard from "./EntryCard";

interface TimelineViewProps {
  entries: any[];
  onEntryClick: (entry: any) => void;
}

const TimelineView: React.FC<TimelineViewProps> = ({ entries, onEntryClick }) => {
  // Group entries by month
  const groupEntriesByMonth = (entries: any[]) => {
    const grouped: { [key: string]: any[] } = {};
    
    entries.forEach(entry => {
      const date = new Date(entry.created_at);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(entry);
    });
    
    return grouped;
  };

  const groupedEntries = groupEntriesByMonth(entries);
  const months = Object.keys(groupedEntries).sort((a, b) => {
    // Sort months in reverse chronological order
    const dateA = new Date(groupedEntries[a][0].created_at);
    const dateB = new Date(groupedEntries[b][0].created_at);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-8">
      {months.map((month) => (
        <div key={month} className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{month}</h3>
          <div className="space-y-4">
            {groupedEntries[month].map((entry) => (
              <EntryCard 
                key={entry.id} 
                entry={entry} 
                onClick={() => onEntryClick(entry)} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineView;