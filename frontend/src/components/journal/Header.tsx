// src/components/layout/Header.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center py-4">
          {/* Centered app name with modern styling */}
          <h1 className="text-3xl font-light tracking-wide text-center text-indigo-600 mb-6">
            MINDSPACE
          </h1>
          
          {/* Navigation tabs */}
          {user && location.pathname === '/journal' && (
            <div className="flex space-x-1 w-full max-w-2xl justify-center">
              <Link 
                to="/journal" 
                className={`py-3 px-5 rounded-t-lg font-medium ${
                  location.pathname === '/journal' ? 
                  'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' : 
                  'text-gray-500 hover:text-gray-700'
                }`}
              >
                New Entry
              </Link>
              <Link 
                to="/entries" 
                className={`py-3 px-5 rounded-t-lg font-medium ${
                  location.pathname === '/entries' ? 
                  'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' : 
                  'text-gray-500 hover:text-gray-700'
                }`}
              >
                Past Entries
              </Link>
              <Link 
                to="/mood-analyzer" 
                className={`py-3 px-5 rounded-t-lg font-medium ${
                  location.pathname === '/mood-analyzer' ? 
                  'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' : 
                  'text-gray-500 hover:text-gray-700'
                }`}
              >
                Mood Analyzer
              </Link>
              <Link 
                to="/ai-counselor" 
                className={`py-3 px-5 rounded-t-lg font-medium ${
                  location.pathname === '/ai-counselor' ? 
                  'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' : 
                  'text-gray-500 hover:text-gray-700'
                }`}
              >
                AI Counselor
              </Link>
            </div>
          )}
        </div>
        
        {/* User menu - positioned on the right */}
        <div className="absolute top-4 right-4">
          {user ? (
            <div className="flex items-center">
              <span className="mr-4 text-gray-600">{user.email}</span>
              <button
                onClick={onLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 font-medium mr-4"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;