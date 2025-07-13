import React from 'react';
import { X } from 'lucide-react';
import { STRIPE_URLS } from '../config/tiers';

interface StripeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (stripeUrl: string) => void;
  selectedUrl: string;
}

export function StripeModal({ isOpen, onClose, onSelectPlan, selectedUrl }: StripeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">💳 Upgrade Your Analysis</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => onSelectPlan(STRIPE_URLS["30"])}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            🚀 Pro Analysis (30)
          </button>
          <button
            onClick={() => onSelectPlan(STRIPE_URLS["50"])}
            className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            💎 Elite Analysis (50)
          </button>
        </div>

        {selectedUrl && (
          <iframe
            src={selectedUrl}
            className="w-full h-96 border-0 rounded-lg shadow-inner"
            title="Stripe Payment"
          />
        )}
      </div>
    </div>
  );
}