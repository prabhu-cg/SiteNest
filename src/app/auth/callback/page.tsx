'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const tokenHash = searchParams.get('token_hash');
    const type = searchParams.get('type') as 'signup' | 'recovery' | 'email' | null;

    async function handle() {
      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (tokenHash && type) {
          const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
          if (error) throw error;
        } else {
          router.replace('/');
          return;
        }

        if (type === 'recovery') {
          router.replace('/auth/reset-password');
        } else {
          router.replace('/');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Verification failed. The link may have expired.');
      }
    }

    handle();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="text-center max-w-sm px-4">
        <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h2 className="text-base font-semibold text-gray-900 mb-1">Link expired or invalid</h2>
        <p className="text-sm text-gray-500 mb-5">{error}</p>
        <a href="/auth" className="text-sm text-primary hover:underline">
          Back to sign in
        </a>
      </div>
    );
  }

  return <Loader2 className="w-5 h-5 animate-spin text-primary" />;
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <Suspense fallback={<Loader2 className="w-5 h-5 animate-spin text-primary" />}>
        <CallbackHandler />
      </Suspense>
    </div>
  );
}
