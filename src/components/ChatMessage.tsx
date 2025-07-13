import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex gap-2 lg:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200'
      }`}>
        {isUser ? (
          <User className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
        ) : (
          <Bot className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] lg:max-w-[75%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-3 py-2 lg:px-4 lg:py-3 rounded-xl lg:rounded-2xl shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
            : 'bg-white border border-gray-200/50 text-gray-800'
        }`}>
          <p className="text-xs lg:text-sm leading-relaxed break-words">
            {message.text}
          </p>
        </div>
        
        {/* Timestamp */}
        {message.timestamp && (
          <div className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'} hidden sm:block`}>
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