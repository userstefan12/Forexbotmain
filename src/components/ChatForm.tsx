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
    <form onSubmit={handleSubmit} className="flex space-x-2 sm:space-x-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about gold prices, forex pairs..."
        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200 text-sm sm:text-base placeholder:text-gray-400"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-sm hover:shadow-md disabled:shadow-none active:scale-95 flex-shrink-0"
      >
        <Send className="w-4 h-4" />
        <span className="hidden xs:inline text-sm sm:text-base">Send</span>
      </button>
    </form>
  );
}