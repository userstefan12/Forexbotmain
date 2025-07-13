import React, { useState, useEffect } from 'react';
import { X, Lock, CreditCard, ExternalLink } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  error: string;
}

export function PasswordModal({ isOpen, onClose, onSubmit, error }: PasswordModalProps) {
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      // Prevent body scroll on mobile
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  const openStripeLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-sm sm:max-w-md shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl font-semibold truncate">Premium Access</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Password Section */}
          <div className="mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Enter Password Token</h4>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password Token"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                autoFocus
              />
              
              {error && (
                <div className="text-red-600 text-xs sm:text-sm bg-red-50 p-2 sm:p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base active:scale-95"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Purchase Section */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center">Buy Credits</h4>
            
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={() => openStripeLink('https://buy.stripe.com/aFa3cuagabhb78k4bacQU03')}
                className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base active:scale-95"
              >
                <CreditCard className="w-4 h-4" />
                <span className="truncate">Pro Analysis (30 Credits)</span>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </button>
              
              <button
                onClick={() => openStripeLink('https://buy.stripe.com/bJe3cu5ZU0Cx50c5fecQU04')}
                className="w-full bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base active:scale-95"
              >
                <CreditCard className="w-4 h-4" />
                <span className="truncate">Elite Analysis (50 Credits)</span>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}