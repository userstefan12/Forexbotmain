import React from 'react';
import { ChatHistory } from './ChatHistory';
import { ChatForm } from './ChatForm';
import { TierSelector } from './TierSelector';
import { ChatCounts, ChatHistory as ChatHistoryType } from '../types';
import { CHAT_TIERS } from '../config/tiers';

interface ChatInterfaceProps {
  currentTier: string;
  counts: ChatCounts;
  history: ChatHistoryType;
  onSendMessage: (tierKey: string, message: string) => void;
}

export function ChatInterface({ currentTier, counts, history, onSendMessage }: ChatInterfaceProps) {
  const tier = CHAT_TIERS.find(t => t.key === currentTier);
  const messages = history[currentTier] || [];
  const count = counts[currentTier] || 0;
  const isLimitReached = count >= (tier?.limit || 0);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Tier Selector */}
      <TierSelector currentTier={currentTier} counts={counts} />

      {/* Main Chat Container */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-gray-200/50 shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl lg:text-3xl">
                {currentTier === "10" && "📊"}
                {currentTier === "30" && "🚀"}
                {currentTier === "50" && "💎"}
              </div>
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-white">
                  {tier?.label}
                </h2>
                <p className="text-blue-100 text-sm lg:text-base">
                  Professional market analysis
                </p>
              </div>
            </div>
            
            {/* Usage Counter */}
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
              <div className="text-white text-sm lg:text-base font-semibold">
                {count} / {tier?.limit}
              </div>
              <div className="text-blue-100 text-xs">
                messages used
              </div>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="p-6 lg:p-8 space-y-6">
          <ChatHistory messages={messages} />
          <ChatForm 
            onSendMessage={(message) => onSendMessage(currentTier, message)}
            disabled={isLimitReached}
          />
          
          {/* Limit Warning */}
          {isLimitReached && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🚫</div>
                <div>
                  <h3 className="font-semibold text-red-800 text-sm lg:text-base">
                    Credit Limit Reached
                  </h3>
                  <p className="text-red-600 text-xs lg:text-sm">
                    Upgrade to continue receiving professional analysis
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}