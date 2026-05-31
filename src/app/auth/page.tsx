'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { LogoMark } from '@/components/ui/logo-mark';

type Mode = 'signin' | 'signup';

export default function AuthPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, signIn, signUp, error, setError } = useAuthStore();

  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!authLoading && user) router.replace('/');
  }, [user, authLoading, router]);

  const switchMode = (m: Mode) => { setMode(m); setError(null); setConfirmed(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        router.replace('/');
      } else {
        const { needsConfirmation } = await signUp(email, password);
        if (needsConfirmation) {
          setConfirmed(true);
        } else {
          router.replace('/');
        }
      }
    } catch {
      // error already set in store
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF9EB]">
        <Loader2 className="w-5 h-5 animate-spin text-[#FD6920]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <div className="relative hidden lg:flex lg:w-[58%] bg-[#FD6920] flex-col overflow-hidden">
        {/* Logo top-left */}
        <div className="absolute top-8 left-8 flex items-center gap-2.5 z-10">
          <LogoMark size={32} className="rounded-lg" />
          <span className="text-white font-bold text-lg tracking-tight">SiteNest</span>
        </div>

        {/* Ghost watermark icon — centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[52%] max-w-[340px] opacity-[0.18]"
          >
            <path d="M39.5849 30.6633C39.7449 30.941 39.7884 31.2708 39.7058 31.5805C39.6232 31.8901 39.4213 32.1545 39.1442 32.3156L24.6058 40.7963C24.4205 40.9044 24.2099 40.9613 23.9955 40.9613C23.781 40.9613 23.5704 40.9044 23.3851 40.7963L8.84668 32.3156C8.57362 32.1515 8.37618 31.8865 8.2971 31.5779C8.21802 31.2693 8.26367 30.9419 8.42416 30.6667C8.58465 30.3916 8.84707 30.1907 9.15461 30.1075C9.46214 30.0244 9.79004 30.0658 10.0673 30.2226L24 38.3475L37.9327 30.2226C38.2104 30.0626 38.5402 30.0192 38.8498 30.1018C39.1595 30.1844 39.4238 30.3863 39.5849 30.6633ZM37.9327 22.9534L24 31.0783L10.0673 22.9534C9.79145 22.8161 9.47361 22.789 9.1785 22.8777C8.88339 22.9664 8.63317 23.1643 8.47879 23.431C8.3244 23.6977 8.27745 24.0132 8.34748 24.3133C8.41752 24.6134 8.59928 24.8755 8.85577 25.0463L23.3942 33.5271C23.5795 33.6351 23.7901 33.6921 24.0045 33.6921C24.219 33.6921 24.4296 33.6351 24.6149 33.5271L39.1533 25.0463C39.293 24.9673 39.4155 24.8614 39.5139 24.7346C39.6122 24.6079 39.6844 24.4629 39.7263 24.308C39.7682 24.1531 39.7788 23.9915 39.7577 23.8324C39.7366 23.6734 39.6841 23.5201 39.6033 23.3815C39.5225 23.2429 39.4149 23.1218 39.2869 23.0251C39.1588 22.9284 39.0129 22.8581 38.8575 22.8183C38.7021 22.7784 38.5403 22.7699 38.3815 22.7931C38.2228 22.8163 38.0702 22.8708 37.9327 22.9534ZM8.25 16.7306C8.25048 16.5184 8.30669 16.3101 8.413 16.1264C8.51931 15.9428 8.672 15.7903 8.85577 15.6842L23.3942 7.20341C23.5795 7.09538 23.7901 7.03846 24.0045 7.03846C24.219 7.03846 24.4296 7.09538 24.6149 7.20341L39.1533 15.6842C39.3362 15.7909 39.4879 15.9437 39.5934 16.1273C39.6988 16.3109 39.7543 16.5189 39.7543 16.7306C39.7543 16.9424 39.6988 17.1504 39.5934 17.334C39.4879 17.5176 39.3362 17.6704 39.1533 17.7771L24.6149 26.2579C24.4296 26.3659 24.219 26.4228 24.0045 26.4228C23.7901 26.4228 23.5795 26.3659 23.3942 26.2579L8.85577 17.7771C8.672 17.671 8.51931 17.5185 8.413 17.3349C8.30669 17.1512 8.25048 16.9429 8.25 16.7306ZM11.8664 16.7306L24 23.8091L36.1336 16.7306L24 9.65224L11.8664 16.7306Z" fill="white"/>
          </svg>
        </div>

        {/* Tagline bottom-left */}
        <div className="absolute bottom-16 left-8 right-8 z-10">
          <span className="text-white/60 text-4xl font-serif leading-none select-none">&ldquo;</span>
          <p className="text-white text-lg font-medium leading-snug mt-1">
            Every great website starts<br />with a clear plan.
          </p>
          <p className="text-white/60 text-sm mt-2">— Build yours visually</p>
        </div>

        {/* Copyright */}
        <div className="absolute bottom-6 left-8 z-10">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} SiteNest. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 bg-[#FFF9EB] flex flex-col items-center justify-center px-8 py-12">
        {/* Logo + wordmark */}
        <div className="flex flex-col items-center mb-8">
          <LogoMark size={52} className="mb-3 rounded-xl shadow-sm" />
          <h1 className="text-2xl font-bold text-gray-900">SiteNest</h1>
          <p className="text-sm text-gray-500 mt-1">Visual sitemap builder</p>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          {confirmed ? (
            <div className="text-center py-4">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h2 className="text-base font-semibold text-gray-900 mb-1">Check your email</h2>
              <p className="text-sm text-gray-500">
                We sent a confirmation link to{' '}
                <span className="font-medium text-gray-700">{email}</span>.
                Click it to activate your account.
              </p>
              <button
                onClick={() => { setConfirmed(false); setMode('signin'); }}
                className="mt-5 text-sm text-[#FD6920] hover:underline"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <>
              {/* Mode tabs */}
              <div className="flex rounded-lg bg-gray-100 p-0.5 mb-5">
                {(['signin', 'signup'] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={[
                      'flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors',
                      mode === m
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700',
                    ].join(' ')}
                  >
                    {m === 'signin' ? 'Sign in' : 'Sign up'}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD6920]/30 focus:border-[#FD6920] text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                    required
                    minLength={mode === 'signup' ? 6 : undefined}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD6920]/30 focus:border-[#FD6920] text-gray-900 placeholder-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2 mt-1 bg-[#FD6920] hover:bg-[#e85e18] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
