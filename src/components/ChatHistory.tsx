import React, { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatHistoryProps {
  messages: ChatMessageType[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="h-64 sm:h-80 lg:h-96 overflow-y-auto bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-100 scroll-smooth"
      style={{ 
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 #f1f5f9'
      }}
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4">
          <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 opacity-50" />
          <p className="text-xs sm:text-sm text-center leading-relaxed">
            Ask about gold prices, forex pairs, or market trends...
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}