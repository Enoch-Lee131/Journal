import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <motion.div
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const Notification = ({ message, type = "info", onClose }) => {
  const variants = {
    initial: { opacity: 0, y: -50, scale: 0.3 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.5, 
      transition: { 
        duration: 0.2 
      } 
    },
  };

  const getAlertClass = () => {
    switch (type) {
      case "success": return "alert-success";
      case "error": return "alert-error";
      case "warning": return "alert-warning";
      default: return "alert-info";
    }
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`alert ${getAlertClass()} shadow-lg fixed top-4 right-4 z-50 max-w-md`}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div>
            {type === "success" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
            {type === "error" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
            {type === "warning" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            )}
            {type === "info" && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            )}
            <span>{message}</span>
          </div>
          <div className="flex-none">
            <button onClick={onClose} className="btn btn-sm btn-ghost">✕</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EmotionBadge = ({ emotion, size = "md" }) => {
  const getEmoji = () => {
    switch (emotion.toLowerCase()) {
      case "happy": return "😊";
      case "sad": return "😞";
      case "angry": return "😠";
      case "anxious": return "😰";
      case "neutral": return "😐";
      default: return "😐";
    }
  };

  const getColor = () => {
    switch (emotion.toLowerCase()) {
      case "happy": return "bg-green-100 text-green-800";
      case "sad": return "bg-blue-100 text-blue-800";
      case "angry": return "bg-red-100 text-red-800";
      case "anxious": return "bg-yellow-100 text-yellow-800";
      case "neutral": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const sizeClass = size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5";

  return (
    <motion.span
      className={`inline-flex items-center rounded-full ${getColor()} ${sizeClass} font-medium`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="mr-1">{getEmoji()}</span>
      <span className="capitalize">{emotion}</span>
    </motion.span>
  );
};

const PageTransition = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export { LoadingSpinner, Notification, EmotionBadge, PageTransition };
