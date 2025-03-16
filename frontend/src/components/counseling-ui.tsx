import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiHelpCircle } from "react-icons/fi";

const AssessmentStep = ({ currentStep, totalSteps, children, onNext, onPrev }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <motion.button 
            onClick={onPrev} 
            className="btn btn-circle btn-ghost" 
            disabled={currentStep === 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          <motion.div 
            className="badge badge-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {currentStep} OF {totalSteps}
          </motion.div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>

        <motion.div 
          className="card-actions justify-end mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button 
            className="btn btn-primary"
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentStep === totalSteps ? 'Complete' : 'Continue'} →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

const MoodAssessment = ({ mood, setMood }) => {
  const getMoodEmoji = (moodType) => {
    switch (moodType) {
      case "happy": return "😊";
      case "neutral": return "😐";
      case "sad": return "😞";
      case "angry": return "😠";
      case "anxious": return "😰";
      default: return "😐";
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">How would you describe your mood?</h3>
      <div className="flex flex-col gap-3">
        {["happy", "neutral", "sad", "angry", "anxious"].map((m, index) => (
          <motion.button
            key={m}
            onClick={() => setMood(m)}
            className={`btn btn-lg justify-start ${mood === m ? 'btn-primary' : 'btn-outline'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-2xl mr-3">{getMoodEmoji(m)}</span>
            <span className="capitalize">{m}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const SleepQualityAssessment = ({ quality, setQuality }) => {
  const getSleepEmoji = (quality) => {
    switch (quality) {
      case "excellent": return "😴";
      case "good": return "🙂";
      case "fair": return "😐";
      case "poor": return "😫";
      case "terrible": return "😵";
      default: return "😐";
    }
  };

  const options = [
    { value: "excellent", label: "Excellent", hours: "7-9 hours" },
    { value: "good", label: "Good", hours: "6-7 hours" },
    { value: "fair", label: "Fair", hours: "5 hours" },
    { value: "poor", label: "Poor", hours: "3-4 hours" },
    { value: "terrible", label: "Terrible", hours: "<3 hours" }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">How would you rate your sleep quality?</h3>
      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => setQuality(option.value)}
            className={`btn btn-lg justify-start ${quality === option.value ? 'btn-primary' : 'btn-outline'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-2xl mr-3">{getSleepEmoji(option.value)}</span>
            <span className="flex-1 text-left">{option.label}</span>
            <span className="text-xs opacity-70">{option.hours}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const InsightCard = ({ title, children, icon }) => {
  return (
    <motion.div 
      className="card bg-base-100 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        }
      }}
    >
      <div className="card-body">
        <h2 className="card-title flex items-center">
          {icon} {title}
        </h2>
        {children}
      </div>
    </motion.div>
  );
};

const ResourceCard = ({ title, description, actionText = "View" }) => {
  return (
    <motion.div 
      className="card bg-base-200"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="card-body p-4">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
        <div className="card-actions justify-end mt-2">
          <motion.button 
            className="btn btn-sm btn-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {actionText}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export { 
  AssessmentStep, 
  MoodAssessment, 
  SleepQualityAssessment, 
  InsightCard,
  ResourceCard
};
