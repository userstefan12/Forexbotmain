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
      className="min-h-[300px] lg:min-h-[400px] max-h-[400px] lg:max-h-[500px] overflow-y-auto bg-gradient-to-b from-gray-50/50 to-blue-50/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-100/50 custom-scrollbar"
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <MessageSquare className="w-12 h-12 lg:w-16 lg:h-16 mb-4 opacity-50" />
          <h3 className="text-lg lg:text-xl font-semibold mb-2">Start Your Analysis</h3>
          <p className="text-sm lg:text-base text-center max-w-md">
            Ask about gold prices, forex pairs, market trends, or any trading question
          </p>
        </div>
      ) : (
        <div className="space-y-4 lg:space-y-6">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}