// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Journal from "./pages/Journal";
import { supabase } from "./supabaseClient";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the initial auth state
    const getInitialUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
      
      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user || null);
        }
      );
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    getInitialUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* User controls in top right */}
        {user && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center">
              <span className="mr-4 text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/journal" /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/journal" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/journal" />} />
            <Route path="/journal" element={user ? <Journal user={user} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        
        {/* Simple footer */}
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>© {new Date().getFullYear()} MINDSPACE. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;