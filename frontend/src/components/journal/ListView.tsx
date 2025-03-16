// src/components/journal/ListView.tsx
import React from "react";
import EntryCard from "./EntryCard";

interface ListViewProps {
  entries: any[];
  onEntryClick: (entry: any) => void;
}

const ListView: React.FC<ListViewProps> = ({ entries, onEntryClick }) => {
  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <EntryCard 
          key={entry.id} 
          entry={entry} 
          onClick={() => onEntryClick(entry)} 
        />
      ))}
    </div>
  );
};

export default ListView;