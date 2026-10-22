'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import AuthShell from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip } from '@/components/ui/tooltip';
import { DesktopOnlyGate } from '@/components/ui/desktop-only-gate';

type Mode = 'signin' | 'signup' | 'forgot';

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
      </div>
    }>
      <AuthPageInner />
    </Suspense>
  );
}

function AuthPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading, signIn, signUp, forgotPassword, error, setError } = useAuthStore();

  const [mode, setMode] = useState<Mode>(searchParams.get('mode') === 'signup' ? 'signup' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!authLoading && user) router.replace('/');
  }, [user, authLoading, router]);

  const switchMode = (m: Mode) => { setMode(m); setError(null); setConfirmed(false); setResetSent(false); setShowPassword(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        router.replace('/');
      } else if (mode === 'signup') {
        const { needsConfirmation } = await signUp(email, password);
        if (needsConfirmation) {
          setConfirmed(true);
        } else {
          router.replace('/');
        }
      } else {
        await forgotPassword(email);
        setResetSent(true);
      }
    } catch {
      // error already set in store
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
      </div>
    );
  }

  const errorBox = error && (
    <div role="alert" className="p-3 bg-destructive-soft border border-destructive/30 text-destructive rounded-lg text-xs">
      {error}
    </div>
  );

  return (
    <>
      <DesktopOnlyGate />
      <AuthShell>
        <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
          {confirmed ? (
            <div className="text-center py-4">
              <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
              <h2 className="text-lg font-semibold mb-1">Check your email</h2>
              <p className="text-sm text-muted-foreground">
                We sent a confirmation link to{' '}
                <span className="font-medium text-foreground">{email}</span>.
                Click it to activate your account.
              </p>
              <Button variant="link" onClick={() => { setConfirmed(false); setMode('signin'); }} className="mt-4">
                Back to sign in
              </Button>
            </div>
          ) : resetSent ? (
            <div className="text-center py-4">
              <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
              <h2 className="text-lg font-semibold mb-1">Reset link sent</h2>
              <p className="text-sm text-muted-foreground">
                We sent a password reset link to{' '}
                <span className="font-medium text-foreground">{email}</span>.
                Check your inbox and follow the link.
              </p>
              <Button variant="link" onClick={() => switchMode('signin')} className="mt-4">
                Back to sign in
              </Button>
            </div>
          ) : mode === 'forgot' ? (
            <>
              <button
                onClick={() => switchMode('signin')}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                ← Back to sign in
              </button>
              <div className="mb-5">
                <h2 className="text-lg font-semibold">Forgot your password?</h2>
                <p className="text-sm text-muted-foreground mt-1">Enter your email and we&apos;ll send you a reset link.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {errorBox}
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="pl-8"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Send reset link
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-5">
                <h2 className="text-lg font-semibold">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {mode === 'signin' ? 'Sign in to open your sitemaps' : 'Start planning your next site, free'}
                </p>
              </div>

              <div role="tablist" aria-label="Sign in or sign up" className="flex rounded-lg border border-border bg-card p-1 mb-5">
                {(['signin', 'signup'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="tab"
                    aria-selected={mode === m}
                    onClick={() => switchMode(m)}
                    className={[
                      'flex-1 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                      mode === m
                        ? 'bg-primary-soft text-primary-text'
                        : 'text-muted-foreground hover:text-foreground',
                    ].join(' ')}
                  >
                    {m === 'signin' ? 'Sign in' : 'Sign up'}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {errorBox}

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      tabIndex={1}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => switchMode('forgot')}
                        tabIndex={4}
                        className="text-xs font-medium text-primary-text hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                      required
                      minLength={mode === 'signup' ? 6 : undefined}
                      autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                      tabIndex={2}
                      className="pl-8 pr-9"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex">
                      <Tooltip content={showPassword ? 'Hide password' : 'Show password'} side="top">
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-1" disabled={submitting} tabIndex={3}>
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                </Button>
              </form>
            </>
          )}
        </div>
      </AuthShell>
    </>
  );
}
