import React from 'react';
import { ChatHistory } from './ChatHistory';
import { ChatForm } from './ChatForm';
import { ChatTier, ChatMessage } from '../types';
import { BarChart3, Zap, Crown } from 'lucide-react';

interface ChatSectionProps {
  tier: ChatTier;
  messages: ChatMessage[];
  count: number;
  onSendMessage: (message: string) => void;
  isActive: boolean;
}

export function ChatSection({ tier, messages, count, onSendMessage, isActive }: ChatSectionProps) {
  const isLimitReached = count >= tier.limit;

  if (!isActive) return null;

  const getTierIcon = () => {
    switch (tier.key) {
      case "10": return <BarChart3 className="w-5 h-5" />;
      case "30": return <Zap className="w-5 h-5" />;
      case "50": return <Crown className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getTierColor = () => {
    switch (tier.key) {
      case "10": return "from-blue-500 to-blue-600";
      case "30": return "from-purple-500 to-purple-600";
      case "50": return "from-amber-500 to-amber-600";
      default: return "from-blue-500 to-blue-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getTierColor()} text-white p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getTierIcon()}
            <h2 className="text-lg font-semibold">{tier.label}</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {count} / {tier.limit}
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className="p-6">
        <ChatHistory messages={messages} />
        <ChatForm 
          onSendMessage={onSendMessage}
          disabled={isLimitReached}
        />
        
        {isLimitReached && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm text-center">
            Credit limit reached. Please purchase more credits to continue.
          </div>
        )}
      </div>
    </div>
  );
}