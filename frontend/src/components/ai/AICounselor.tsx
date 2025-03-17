// src/components/ai/AICounselor.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getApiUrl } from '../../lib/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AICounselorProps {
  user: any;
}

const AICounselor: React.FC<AICounselorProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialAnalysis, setInitialAnalysis] = useState('');
  const [hasInitialAnalysis, setHasInitialAnalysis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial analysis when component mounts
  useEffect(() => {
    getInitialAnalysis();
  }, [user]);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getInitialAnalysis = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const res = await axios.post(`${getApiUrl()}/journal`, {
        user_id: user.id
      });
      
      setInitialAnalysis(res.data.analysis);
      
      // Add the initial analysis as the first message from AI
      setMessages([
        {
          id: Date.now().toString(),
          text: res.data.analysis,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
            
      setHasInitialAnalysis(true);
    } catch (error) {
      console.error('Error getting initial analysis:', error);
      setMessages([
        {
          id: Date.now().toString(),
          text: "I'm having trouble analyzing your journal entries. Please try again later.",
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Get context from previous messages (up to last 5)
      const recentMessages = messages.slice(-5);
      const context = recentMessages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
      
      // Send to OpenAI API for response
      const openaiResponse = await axios.post(`${getApiUrl()}/chat`, {
        user_id: user.id,
        message: newMessage,
        context: context,
        initial_analysis: initialAnalysis
      });
            
      // Add AI response to chat
      const aiMessage: Message = {
        id: Date.now().toString() + '-ai',
        text: openaiResponse.data.response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Counselor</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Messages container */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 && isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-2"></div>
                <p className="text-gray-500">Analyzing your journal entries...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isLoading || !hasInitialAnalysis}
              placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
              className="flex-grow py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading || !newMessage.trim() || !hasInitialAnalysis}
              className="py-2 px-6 rounded-r-md bg-indigo-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">How to get the most out of your AI counselor</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>Reflect on the AI's insights about your journal entries</li>
          <li>Ask follow-up questions about specific emotions or patterns</li>
          <li>Request specific coping strategies or mindfulness exercises</li>
          <li>Remember that this is not a replacement for professional therapy</li>
        </ul>
      </div>
    </div>
  );
};

export default AICounselor;