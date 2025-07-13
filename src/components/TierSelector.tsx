import React from 'react';
import { Check, Lock } from 'lucide-react';
import { CHAT_TIERS } from '../config/tiers';
import { ChatCounts } from '../types';

interface TierSelectorProps {
  currentTier: string;
  counts: ChatCounts;
}

export function TierSelector({ currentTier, counts }: TierSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {CHAT_TIERS.map((tier) => {
        const isActive = currentTier === tier.key;
        const count = counts[tier.key] || 0;
        const progress = (count / tier.limit) * 100;
        const isPremium = tier.password !== null;

        return (
          <div
            key={tier.key}
            className={`relative bg-white/70 backdrop-blur-xl rounded-xl lg:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
              isActive 
                ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                : 'border-gray-200/50 hover:border-gray-300/50'
            }`}
          >
            {/* Premium Badge */}
            {isPremium && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Premium
              </div>
            )}

            <div className="p-4 lg:p-6">
              {/* Tier Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl lg:text-3xl">
                  {tier.key === "10" && "📊"}
                  {tier.key === "30" && "🚀"}
                  {tier.key === "50" && "💎"}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm lg:text-base">
                    {tier.key === "10" && "Basic Analysis"}
                    {tier.key === "30" && "Pro Analysis"}
                    {tier.key === "50" && "Elite Analysis"}
                  </h3>
                  <p className="text-gray-500 text-xs lg:text-sm">
                    {tier.limit} messages
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs lg:text-sm mb-2">
                  <span className="text-gray-600">Used: {count}</span>
                  <span className="text-gray-600">Limit: {tier.limit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      tier.key === "10" ? "bg-blue-500" :
                      tier.key === "30" ? "bg-purple-500" :
                      "bg-amber-500"
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">
                  <Check className="w-4 h-4" />
                  Currently Active
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}