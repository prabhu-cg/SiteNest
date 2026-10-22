'use client';

import { useEffect, useState } from 'react';
import { Share2, Check, Copy, Loader2, RefreshCw } from 'lucide-react';
import { getShareState, setSharing, type ShareState } from '@/lib/storage';

export default function ShareMenu({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ShareState | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStatus('loading');
    getShareState(projectId).then((s) => {
      setState(s);
      setStatus(s ? 'idle' : 'error');
    });
  }, [open, projectId]);

  const update = async (enabled: boolean, resetToken = false) => {
    setStatus('saving');
    const next = await setSharing(projectId, enabled, { resetToken, currentToken: state?.token });
    if (next) setState(next);
    setStatus(next ? 'idle' : 'error');
  };

  const url = state?.token && typeof window !== 'undefined' ? `${window.location.origin}/present/${state.token}` : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked — the link is still selectable in the field */ }
  };

  return (
    <div className="relative">
      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex items-center gap-1.5 px-2.5 h-7 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <Share2 className="w-3 h-3" />
        Share
      </button>

      {open && (
        <div className="absolute top-9 right-0 z-50 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">Share a clickable preview</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
            Anyone with the link can click through your linked pages. They can't edit anything or see the canvas.
          </p>

          {status === 'loading' && (
            <div className="py-6 flex justify-center"><Loader2 className="w-4 h-4 animate-spin text-accent" /></div>
          )}

          {status === 'error' && (
            <p className="mt-3 text-xs text-red-600 dark:text-red-400 leading-snug">
              Couldn't update sharing. If this is the first time, run <code className="font-mono">database/migrations/001_shared_present_links.sql</code> in the Supabase SQL Editor.
            </p>
          )}

          {state && status !== 'loading' && (
            <>
              <label className="mt-3 flex items-center justify-between cursor-pointer">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Anyone with the link can view</span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={state.isPublic}
                  disabled={status === 'saving'}
                  onChange={(e) => update(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
              </label>

              {state.isPublic && url && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1.5">
                    <input
                      readOnly
                      value={url}
                      onFocus={(e) => e.currentTarget.select()}
                      className="flex-1 min-w-0 h-8 px-2 text-xs font-mono border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-300"
                    />
                    <button
                      onClick={copy}
                      className="flex items-center gap-1 px-2.5 h-8 text-xs font-semibold text-white bg-accent hover:bg-accent/90 rounded-md transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <button
                    onClick={() => update(true, true)}
                    disabled={status === 'saving'}
                    className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset link (the old one stops working)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
