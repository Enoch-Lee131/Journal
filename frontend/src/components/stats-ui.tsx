import React from "react";
import { motion } from "framer-motion";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const EmotionChart = ({ data, type = "bar", height = 200 }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: type === "doughnut",
        position: 'bottom',
      },
      title: {
        display: false,
      },
    },
    scales: type === "bar" ? {
      y: {
        beginAtZero: true,
      },
    } : undefined,
    cutout: type === "doughnut" ? '70%' : undefined,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-base-200 p-4 rounded-box"
    >
      {type === "bar" ? (
        <Bar data={data} options={chartOptions} height={height} />
      ) : (
        <Doughnut data={data} options={chartOptions} height={height} />
      )}
    </motion.div>
  );
};

const EmotionProgress = ({ emotion, value, maxValue, color }) => {
  const percentage = Math.min(100, Math.round((value / maxValue) * 100));
  
  return (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-2xl mr-3">{emotion}</span>
      <span className="mr-3">{value}</span>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div 
          className={`${color} h-2.5 rounded-full`} 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const CalendarMood = ({ calendarData }) => {
  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy': return 'bg-green-200';
      case 'neutral': return 'bg-gray-200';
      case 'sad': return 'bg-blue-200';
      case 'angry': return 'bg-red-200';
      case 'anxious': return 'bg-yellow-200';
      case 'skipped': return 'bg-gray-100';
      default: return 'bg-white';
    }
  };

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'neutral': return '😐';
      case 'sad': return '😞';
      case 'angry': return '😠';
      case 'anxious': return '😰';
      case 'skipped': return '✖️';
      default: return '⚪';
    }
  };

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day, index) => (
          <div key={`header-${index}`} className="font-bold">{day}</div>
        ))}
        
        {calendarData.map((day, index) => (
          <motion.div 
            key={`day-${index}`} 
            className={`aspect-square rounded-full flex items-center justify-center ${getMoodColor(day.mood)}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.01,
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.2 }
            }}
          >
            {getMoodEmoji(day.mood)}
          </motion.div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {[
          { mood: 'happy', label: 'Happy', color: 'bg-green-200' },
          { mood: 'neutral', label: 'Neutral', color: 'bg-gray-200' },
          { mood: 'sad', label: 'Sad', color: 'bg-blue-200' },
          { mood: 'angry', label: 'Angry', color: 'bg-red-200' },
          { mood: 'anxious', label: 'Anxious', color: 'bg-yellow-200' },
          { mood: 'skipped', label: 'Skipped', color: 'bg-gray-100' }
        ].map((item, index) => (
          <motion.div 
            key={item.mood}
            className="flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`w-4 h-4 rounded-full ${item.color} mr-2`}></div>
            <span className="text-sm">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, description, icon }) => {
  return (
    <motion.div 
      className="stat"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        }
      }}
    >
      {icon && (
        <div className="stat-figure text-primary">
          {icon}
        </div>
      )}
      <div className="stat-title">{title}</div>
      <motion.div 
        className="stat-value"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
      >
        {value}
      </motion.div>
      <div className="stat-desc">{description}</div>
    </motion.div>
  );
};

export { EmotionChart, EmotionProgress, CalendarMood, StatCard };
