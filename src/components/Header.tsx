import React from 'react';
import { TrendingUp } from 'lucide-react';

interface HeaderProps {
  email: string | null;
  onPremiumClick: () => void;
}

export function Header({ email, onPremiumClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ForexBot</h1>
              <p className="text-sm text-gray-500">AI-Powered Trading Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {email && (
              <div className="hidden sm:block text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                {email}
              </div>
            )}
            <button
              onClick={onPremiumClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Premium Access
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}