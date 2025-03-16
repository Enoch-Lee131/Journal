import React from "react";
import { motion } from "framer-motion";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === "light" ? (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </motion.svg>
      ) : (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </motion.svg>
      )}
    </motion.button>
  );
};

const MoodSelector = ({ selectedMood, setMood }) => {
  const moods = [
    { value: "happy", emoji: "😊", label: "Happy" },
    { value: "neutral", emoji: "😐", label: "Neutral" },
    { value: "sad", emoji: "😞", label: "Sad" },
    { value: "angry", emoji: "😠", label: "Angry" },
    { value: "anxious", emoji: "😰", label: "Anxious" }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm font-medium self-center mr-2">Mood:</span>
      {moods.map((mood) => (
        <motion.button
          key={mood.value}
          type="button"
          onClick={() => setMood(mood.value)}
          className={`btn btn-sm ${selectedMood === mood.value ? 'btn-primary' : 'btn-outline'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 500,
            damping: 15,
            delay: moods.findIndex(m => m.value === mood.value) * 0.05
          }}
        >
          <span className="mr-1">{mood.emoji}</span> {mood.label}
        </motion.button>
      ))}
    </div>
  );
};

const JournalCard = ({ journal, expanded, toggleExpand }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case "happy": return "😊";
      case "sad": return "😞";
      case "angry": return "😠";
      case "anxious": return "😰";
      default: return "😐";
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case "happy": return "bg-green-100 text-green-800";
      case "sad": return "bg-blue-100 text-blue-800";
      case "angry": return "bg-red-100 text-red-800";
      case "anxious": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSentimentColor = (score) => {
    if (score >= 0.5) return "text-green-500";
    if (score <= -0.5) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <motion.div 
      className="card shadow-md bg-base-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        }
      }}
    >
      <div className="card-body">
        {journal.title && (
          <h3 className="text-xl font-bold">{journal.title}</h3>
        )}
        
        <div className="flex flex-wrap gap-2 mb-2">
          <div className="badge badge-outline">
            {formatDate(journal.created_at)}
          </div>
          <div className={`badge ${getMoodColor(journal.mood)}`}>
            {getMoodEmoji(journal.mood)} {journal.mood}
          </div>
          <div className={`badge badge-outline ${getSentimentColor(journal.sentiment)}`}>
            Sentiment: {journal.sentiment.toFixed(2)}
          </div>
        </div>
        
        <div className="relative">
          <motion.p 
            className="text-base-content/90"
            initial={{ height: expanded ? "auto" : "3.6em" }}
            animate={{ height: expanded ? "auto" : "3.6em" }}
            transition={{ duration: 0.3 }}
          >
            {expanded 
              ? journal.entry 
              : journal.entry.length > 150 
                ? journal.entry.substring(0, 150) + "..." 
                : journal.entry}
          </motion.p>
          
          {journal.entry.length > 150 && (
            <motion.button 
              className="link text-primary text-sm mt-2 flex items-center"
              onClick={toggleExpand}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {expanded ? (
                <>Show less <motion.span animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>↑</motion.span></>
              ) : (
                <>Read more <motion.span animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>↓</motion.span></>
              )}
            </motion.button>
          )}
        </div>
        
        <div className="card-actions justify-end mt-2">
          <motion.button 
            className="btn btn-sm btn-ghost"
            whileHover={{ scale: 1.1, color: "#3b82f6" }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </motion.button>
          <motion.button 
            className="btn btn-sm btn-ghost text-error"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export { ThemeToggle, MoodSelector, JournalCard };
