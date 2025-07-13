import React from 'react';
import { Header } from './components/Header';
import { ChatSection } from './components/ChatSection';
import { PasswordModal } from './components/PasswordModal';
import { BuyModal } from './components/BuyModal';
import { useChatApp } from './hooks/useChatApp';
import { CHAT_TIERS } from './config/tiers';

function App() {
  const {
    currentTier,
    email,
    counts,
    history,
    isPasswordModalOpen,
    isBuyModalOpen,
    passwordError,
    setIsPasswordModalOpen,
    setIsBuyModalOpen,
    setPasswordError,
    handlePasswordSubmit,
    sendMessage
  } = useChatApp();

  const currentTierData = CHAT_TIERS.find(tier => tier.key === currentTier);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        email={email}
        onPremiumClick={() => {
          setPasswordError('');
          setIsPasswordModalOpen(true);
        }}
      />

      <main className="max-w-4xl mx-auto p-6">
        {currentTierData && (
          <ChatSection
            tier={currentTierData}
            messages={history[currentTier] || []}
            count={counts[currentTier] || 0}
            onSendMessage={(message) => sendMessage(currentTier, message)}
            isActive={true}
          />
        )}
      </main>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordSubmit}
        error={passwordError}
      />

      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />
    </div>
  );
}

export default App;