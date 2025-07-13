import React from 'react';
import { Crown, User } from 'lucide-react';

interface HeaderProps {
  email: string | null;
  onPremiumClick: () => void;
}

export function Header({ email, onPremiumClick }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
      <div className="px-4 lg:px-8 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <img 
                src="/logo.jpg" 
                alt="ForexBot" 
                className="w-6 h-6 lg:w-7 lg:h-7 rounded-lg object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ForexBot
              </h1>
              <p className="text-xs lg:text-sm text-gray-500 font-medium">
                AI-Powered Trading Analysis
              </p>
            </div>
          </div>

          {/* User Info & Premium Button */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* User Email */}
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 max-w-[150px] lg:max-w-[200px] truncate">
                {email || "No ID set"}
              </span>
            </div>

            {/* Premium Button */}
            <button
              onClick={onPremiumClick}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Crown className="w-4 h-4" />
              <span className="text-sm lg:text-base">Premium</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}