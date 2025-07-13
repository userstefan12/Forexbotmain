import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex gap-3 lg:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
        ) : (
          <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[85%] lg:max-w-[80%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-4 py-3 lg:px-6 lg:py-4 rounded-2xl lg:rounded-3xl shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
            : 'bg-white border border-gray-200/50 text-gray-800'
        }`}>
          <p className="text-sm lg:text-base leading-relaxed break-words">
            {message.text}
          </p>
        </div>
        
        {/* Timestamp */}
        {message.timestamp && (
          <div className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
    </div>
  );
}