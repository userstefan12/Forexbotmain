import React, { useState } from 'react';
import { Send } from 'lucide-react';

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

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about gold prices, forex pairs, market trends..."
        className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-gray-300"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-2 shadow-lg disabled:shadow-none"
      >
        <Send className="w-4 h-4" />
        Send
      </button>
    </form>
  );
}