import React from 'react';
import { User, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-1`}>
      <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-600' : 'bg-gray-600'
        }`}>
          {isUser ? (
            <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          ) : (
            <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          )}
        </div>
        
        {/* Message Bubble */}
        <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-md' 
            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
        }`}>
          <p className="text-xs sm:text-sm leading-relaxed break-words">{message.text}</p>
        </div>
      </div>
    </div>
  );
}