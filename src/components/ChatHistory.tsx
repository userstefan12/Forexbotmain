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
      className="min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] max-h-[350px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto bg-gradient-to-b from-gray-50/50 to-blue-50/30 rounded-lg lg:rounded-xl p-3 lg:p-4 border border-gray-100/50 custom-scrollbar"
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <MessageSquare className="w-8 h-8 lg:w-12 lg:h-12 mb-3 lg:mb-4 opacity-50" />
          <h3 className="text-sm lg:text-lg font-semibold mb-2">Start Your Analysis</h3>
          <p className="text-xs lg:text-sm text-center max-w-md px-4">
            Ask about gold prices, forex pairs, market trends, or any trading question
          </p>
        </div>
      ) : (
        <div className="space-y-3 lg:space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}