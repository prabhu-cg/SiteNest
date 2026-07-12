'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { LogoMark } from '@/components/ui/logo-mark';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, updatePassword, error, setError } = useAuthStore();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    // If no session by the time loading finishes, the reset link wasn't clicked first
    if (!authLoading && !user) router.replace('/auth');
  }, [user, authLoading, router]);

  useEffect(() => { setError(null); }, [setError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    if (password !== confirm) {
      setValidationError('Passwords do not match');
      return;
    }
    setSubmitting(true);
    try {
      await updatePassword(password);
      setDone(true);
      setTimeout(() => router.replace('/'), 2500);
    } catch {
      // error set in store
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFAEF]">
        <Loader2 className="w-5 h-5 animate-spin text-[#C74504]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFAEF] flex flex-col items-center justify-center px-8 py-12">
      <div className="flex flex-col items-center mb-8">
        <LogoMark size={52} className="mb-3 rounded-xl shadow-sm" />
        <h1 className="text-2xl font-bold text-gray-900">SiteNest</h1>
        <p className="text-sm text-gray-500 mt-1">Visual sitemap builder</p>
      </div>

      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {done ? (
          <div className="text-center py-4">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <h2 className="text-base font-semibold text-gray-900 mb-1">Password updated</h2>
            <p className="text-sm text-gray-500">You&apos;re being redirected to your dashboard…</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-[#C74504]" />
              <h2 className="text-sm font-semibold text-gray-900">Set a new password</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">Choose a strong password for your account.</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {(error || validationError) && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                  {validationError ?? error}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">New password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74504]/30 focus:border-[#C74504] text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Confirm password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74504]/30 focus:border-[#C74504] text-gray-900 placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 mt-1 bg-[#C74504] hover:bg-[#b53f04] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Update password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
