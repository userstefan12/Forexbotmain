import React from 'react';
import { MessageCircle } from 'lucide-react';

interface HeaderProps {
  email: string | null;
  onPremiumClick: () => void;
}

export function Header({ email, onPremiumClick }: HeaderProps) {
  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white p-6 shadow-xl">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold flex items-center gap-2 tracking-wide">
          <MessageCircle className="w-7 h-7" />
          ForexBot
        </h1>
        <p className="text-sm opacity-90 font-medium">Multi-Agent AI for Gold & Forex Analysis</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm opacity-95 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
          {email ? `Chat ID: ${email}` : "No Chat ID set"}
        </span>
        <button
          onClick={onPremiumClick}
          className="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm border border-white/20"
        >
          Have Premium?
        </button>
      </div>
    </header>
  );
}