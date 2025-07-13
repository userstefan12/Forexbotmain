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
    <div className="space-y-3 lg:space-y-4">
      {/* Quick Suggestions */}
      {message === '' && (
        <div className="flex flex-wrap gap-1 lg:gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              disabled={disabled}
              className="text-xs bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 px-2 lg:px-3 py-1 lg:py-2 rounded-full transition-colors border border-gray-200/50"
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
            className="w-full px-3 py-3 lg:px-4 lg:py-4 pr-12 lg:pr-14 bg-white border-2 border-gray-200/50 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm placeholder-gray-400 shadow-sm"
            disabled={disabled}
          />
          
          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className="absolute right-1 lg:right-2 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center shadow-lg disabled:shadow-none"
          >
            {disabled ? (
              <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 opacity-50" />
            ) : (
              <Send className="w-3 h-3 lg:w-4 lg:h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}