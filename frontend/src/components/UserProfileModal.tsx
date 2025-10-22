import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import { useSaveUserProfile } from '../hooks/useQueries';

interface UserProfileModalProps {
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const saveProfileMutation = useSaveUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await saveProfileMutation.mutateAsync({
  name: name.trim(),
  email: 'mohamed.wael@mercaturaforum.com', // Use a real one when ready
});
      onClose();
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-xl border border-slate-700 p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Your Profile</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            disabled={saveProfileMutation.isPending}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300">
            Welcome to Cairo Blockchain Week! Please tell us your name to complete your profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
              disabled={saveProfileMutation.isPending}
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || saveProfileMutation.isPending}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            {saveProfileMutation.isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Profile</span>
            )}
          </button>
        </form>

        {saveProfileMutation.isError && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-300 text-sm">
              Failed to save profile. Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileModal;
