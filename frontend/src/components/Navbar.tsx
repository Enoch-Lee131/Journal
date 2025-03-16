import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUser, FiMoon, FiSun } from "react-icons/fi";

interface NavbarProps {
  user: any;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, toggleTheme }) => {
  const location = useLocation();
  const [theme, setTheme] = useState("light");

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toggleTheme();
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 py-3">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          📓 Reflectify
        </Link>
      </div>
      <div className="flex-none space-x-2">
        {/* Counseling link */}
        <Link to="/counseling" className="btn btn-ghost btn-circle" title="Counseling">
          <FiUser size={20} />
        </Link>
        <button onClick={handleThemeToggle} className="btn btn-ghost btn-circle">
          {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
