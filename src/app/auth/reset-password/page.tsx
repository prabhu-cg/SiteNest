'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import AuthShell from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthShell>
      <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
        {done ? (
          <div className="text-center py-4">
            <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
            <h2 className="text-lg font-semibold mb-1">Password updated</h2>
            <p className="text-sm text-muted-foreground">You&apos;re being redirected to your dashboard…</p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Lock className="w-4 h-4 text-primary" />
                Set a new password
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Choose a strong password for your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {(error || validationError) && (
                <div role="alert" className="p-3 bg-destructive-soft border border-destructive/30 text-destructive rounded-lg text-xs">
                  {validationError ?? error}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>

              <Button type="submit" className="w-full mt-1" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Update password
              </Button>
            </form>
          </>
        )}
      </div>
    </AuthShell>
  );
}
