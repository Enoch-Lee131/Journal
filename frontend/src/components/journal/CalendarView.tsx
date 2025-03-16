// src/components/journal/CalendarView.tsx
import React, { useState } from "react";

interface CalendarViewProps {
  entries: any[];
  onDateClick: (date: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ entries, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Function to get days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Function to get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Check if a date has entries
  const hasEntriesOnDate = (date: Date) => {
    return entries.some(entry => {
      const entryDate = new Date(entry.created_at);
      return (
        entryDate.getDate() === date.getDate() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  // Function to get sentiment class for a date
  const getDateSentimentClass = (date: Date) => {
    const entriesOnDate = entries.filter(entry => {
      const entryDate = new Date(entry.created_at);
      return (
        entryDate.getDate() === date.getDate() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getFullYear() === date.getFullYear()
      );
    });
    
    if (entriesOnDate.length === 0) return "";
    
    // Calculate average sentiment
    const avgSentiment = entriesOnDate.reduce((sum, entry) => sum + entry.sentiment, 0) / entriesOnDate.length;
    
    if (avgSentiment > 0.3) return "bg-green-200";
    if (avgSentiment < -0.3) return "bg-red-200";
    return "bg-gray-200";
  };
  
  // Previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const monthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  
  // Generate calendar days
  const days = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-12"></div>);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const hasEntries = hasEntriesOnDate(date);
    const sentimentClass = getDateSentimentClass(date);
    
    days.push(
      <div 
        key={`day-${day}`} 
        className={`h-12 flex items-center justify-center relative cursor-pointer hover:bg-gray-100 ${sentimentClass}`}
        onClick={() => onDateClick(date)}
      >
        <span className={`text-sm ${hasEntries ? "font-bold" : ""}`}>{day}</span>
        {hasEntries && <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1 bg-blue-500 rounded-full"></span>}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h3 className="text-lg font-medium">{monthYear}</h3>
        <button 
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center items-center space-x-4 text-xs text-gray-600">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-green-200 rounded-full mr-1"></div>
          <span>Positive</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-gray-200 rounded-full mr-1"></div>
          <span>Neutral</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-red-200 rounded-full mr-1"></div>
          <span>Negative</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;