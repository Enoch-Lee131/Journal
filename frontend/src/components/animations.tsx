import React from "react";
import { motion } from "framer-motion";

// Animation variants for page transitions
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

// Animation variants for staggered children
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for individual items in a staggered list
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    }
  },
};

// Animation variants for cards
export const cardVariants = {
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

// Animation variants for buttons
export const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Animation variants for form fields
export const formFieldVariants = {
  focus: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

// Animation variants for notifications
export const notificationVariants = {
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

// Reusable animated components
export const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      className="animate-fade-in"
    >
      {children}
    </motion.div>
  );
};

export const AnimatedCard = ({ children, className, onClick }) => {
  return (
    <motion.div
      className={className}
      whileHover="hover"
      variants={cardVariants}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedButton = ({ children, className, onClick, disabled }) => {
  return (
    <motion.button
      className={className}
      whileHover={!disabled && "hover"}
      whileTap={!disabled && "tap"}
      variants={buttonVariants}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export const StaggerContainer = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
};
