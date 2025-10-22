import React from 'react';
import { X } from 'lucide-react';
import { useInternetIdentity } from 'ic-use-internet-identity';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { login, clear, identity, status, isError, error } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const isLoggingIn = status === 'logging-in';

  const handleAuth = async () => {
    try {
      if (isAuthenticated) {
        await clear();
      } else {
        await login();
      }
      onClose();
    } catch (err) {
      console.error('Login error:', err);
      // keep modal open so the error message is visible
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-xl border border-slate-700 p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isAuthenticated ? 'Account' : 'Login to Your Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-slate-300">
                You are currently logged in with Internet Identity.
              </p>

              <button
                onClick={handleAuth}
                disabled={isLoggingIn}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Logout
              </button>

              {/* status + error */}
              {isLoggingIn && (
                <p className="text-xs text-slate-400 mt-2" aria-live="polite">
                  Opening Internet Identity…
                </p>
              )}
              {isError && (
                <p className="text-xs text-red-400 mt-2">
                  Login error: {String((error as any)?.message ?? error)}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-slate-300 space-y-2">
                <p>
                  Sign in securely using Internet Identity — a blockchain-based
                  authentication system that protects your privacy.
                </p>
                <p className="text-sm text-slate-400">
                  No passwords, no personal data collection, just secure authentication.
                </p>
              </div>

              <button
                onClick={handleAuth}
                disabled={isLoggingIn}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                aria-busy={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                    <span>Connecting…</span>
                  </>
                ) : (
                  <span>Login with Internet Identity</span>
                )}
              </button>

              {/* status + error */}
              {isLoggingIn && (
                <p className="text-xs text-slate-400" aria-live="polite">
                  Opening Internet Identity…
                </p>
              )}
              {isError && (
                <p className="text-xs text-red-400">
                  Login error: {String((error as any)?.message ?? error)}
                </p>
              )}

              <p className="text-xs text-slate-400">
                New to Internet Identity? You'll be guided through a quick setup process.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
