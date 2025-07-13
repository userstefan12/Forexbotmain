import React from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { PasswordModal } from './components/PasswordModal';
import { BuyModal } from './components/BuyModal';
import { useChatApp } from './hooks/useChatApp';

function App() {
  const {
    currentTier,
    email,
    counts,
    history,
    isPasswordModalOpen,
    isBuyModalOpen,
    passwordError,
    switchTier,
    setIsPasswordModalOpen,
    setIsBuyModalOpen,
    setPasswordError,
    handlePasswordSubmit,
    sendMessage
  } = useChatApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <Header
          email={email}
          onPremiumClick={() => {
            setPasswordError('');
            setIsPasswordModalOpen(true);
          }}
        />

        <main className="p-4 lg:p-8">
          <ChatInterface
            currentTier={currentTier}
            counts={counts}
            history={history}
            onSendMessage={sendMessage}
          />
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
    </div>
  );
}

export default App;