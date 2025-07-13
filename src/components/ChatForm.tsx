import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatFormProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export function ChatForm({ onSendMessage, disabled }: ChatFormProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const suggestions = [
    "What's the current gold price trend?",
    "Analyze EUR/USD pair",
    "Market outlook for this week",
    "Best forex pairs to trade today"
  ];

  return (
    <div className="space-y-4">
      {/* Quick Suggestions */}
      {message === '' && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              disabled={disabled}
              className="text-xs lg:text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 px-3 py-2 rounded-full transition-colors border border-gray-200/50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Message Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about markets, trading strategies, or analysis..."
            className="w-full px-4 py-4 lg:px-6 lg:py-5 pr-14 lg:pr-16 bg-white border-2 border-gray-200/50 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm lg:text-base placeholder-gray-400 shadow-sm"
            disabled={disabled}
          />
          
          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg lg:rounded-xl transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center shadow-lg disabled:shadow-none"
          >
            {disabled ? (
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 opacity-50" />
            ) : (
              <Send className="w-4 h-4 lg:w-5 lg:h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}