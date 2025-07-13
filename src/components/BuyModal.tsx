import React from 'react';
import { X, AlertTriangle, CreditCard, ExternalLink } from 'lucide-react';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BuyModal({ isOpen, onClose }: BuyModalProps) {
  const openStripeLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl lg:rounded-3xl w-full max-w-md lg:max-w-lg shadow-2xl border border-gray-200/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 lg:px-8 py-6 lg:py-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded-full"
          >
            <X className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          
          <div className="flex items-center gap-3 text-white">
            <AlertTriangle className="w-8 h-8 lg:w-10 lg:h-10" />
            <div>
              <h3 className="text-xl lg:text-2xl font-bold">Credit Limit Reached</h3>
              <p className="text-red-100 text-sm lg:text-base">
                Upgrade to continue your analysis
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 space-y-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
              You've reached your analysis limit. Upgrade to continue receiving 
              professional forex and gold trading insights powered by our AI system.
            </p>
          </div>

          {/* Purchase Options */}
          <div className="space-y-3">
            <button
              onClick={() => openStripeLink('https://buy.stripe.com/aFa3cuagabhb78k4bacQU03')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 shadow-lg text-sm lg:text-base"
            >
              <CreditCard className="w-5 h-5" />
              🚀 Get Pro Analysis (30 Credits)
              <ExternalLink className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => openStripeLink('https://buy.stripe.com/bJe3cu5ZU0Cx50c5fecQU04')}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 shadow-lg text-sm lg:text-base"
            >
              <CreditCard className="w-5 h-5" />
              💎 Get Elite Analysis (50 Credits)
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors text-sm lg:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}