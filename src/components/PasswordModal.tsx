import React, { useState, useEffect } from 'react';
import { X, CreditCard, ExternalLink, Crown, Lock } from 'lucide-react';

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
    }
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl lg:rounded-3xl w-full max-w-md lg:max-w-lg shadow-2xl border border-gray-200/50 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 lg:px-8 py-6 lg:py-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded-full"
          >
            <X className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          
          <div className="flex items-center gap-3 text-white">
            <Crown className="w-8 h-8 lg:w-10 lg:h-10" />
            <div>
              <h3 className="text-xl lg:text-2xl font-bold">Premium Access</h3>
              <p className="text-amber-100 text-sm lg:text-base">
                Unlock advanced trading analysis
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 space-y-6">
          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Password Token
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your premium password token"
                  className="w-full pl-10 pr-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-sm lg:text-base"
                  autoFocus
                />
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm lg:text-base font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 lg:py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg text-sm lg:text-base"
            >
              Unlock Premium Access
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Don't have premium access?
              </span>
            </div>
          </div>

          {/* Purchase Options */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-gray-900 text-center">
              Get Premium Credits
            </h4>
            
            <div className="grid gap-3">
              <button
                onClick={() => openStripeLink('https://buy.stripe.com/aFa3cuagabhb78k4bacQU03')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 shadow-lg text-sm lg:text-base"
              >
                <CreditCard className="w-5 h-5" />
                🚀 Pro Analysis (30 Credits)
                <ExternalLink className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => openStripeLink('https://buy.stripe.com/bJe3cu5ZU0Cx50c5fecQU04')}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 shadow-lg text-sm lg:text-base"
              >
                <CreditCard className="w-5 h-5" />
                💎 Elite Analysis (50 Credits)
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}