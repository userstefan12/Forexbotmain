import React from 'react';

interface HeaderProps {
  email: string | null;
  onPremiumClick: () => void;
}

export function Header({ email, onPremiumClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBH31aoPyY7d9q3hMhZiV1rTr3mhfAY5OtIg&s" 
              alt="ForexBot Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl shadow-md object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">ForexBot</h1>
              <p className="text-xs sm:text-sm text-gray-500 truncate">AI Trading Analysis</p>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Email Display - Hidden on small screens */}
            {email && (
              <div className="hidden md:block text-xs lg:text-sm text-gray-600 bg-gray-50 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg max-w-[120px] lg:max-w-none truncate">
                {email}
              </div>
            )}
            
            {/* Premium Button */}
            <button
              onClick={onPremiumClick}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Premium Access</span>
              <span className="sm:hidden">Premium</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Email Display */}
        {email && (
          <div className="md:hidden mt-2 pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg truncate">
              {email}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}