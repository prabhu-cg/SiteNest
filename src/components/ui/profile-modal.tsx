'use client';

import { useState } from 'react';
import { AlertCircle, Loader2, X, Check } from 'lucide-react';
import { Avatar } from './avatar';
import { Button } from './button';
import { cn } from '@/lib/utils';

const AVATAR_STYLES = [
  { id: 'adventurer',      label: 'Adventurer' },
  { id: 'lorelei',         label: 'Lorelei'    },
  { id: 'bottts-neutral',  label: 'Robot'      },
  { id: 'fun-emoji',       label: 'Emoji'      },
  { id: 'micah',           label: 'Micah'      },
  { id: 'avataaars',       label: 'Avataaars'  },
  { id: 'open-peeps',      label: 'Peeps'      },
  { id: 'croodles-neutral', label: 'Croodles'  },
  { id: 'pixel-art',       label: 'Pixel Art'  },
] as const;

function dicebearUrl(style: string, seed: string): string {
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&size=96&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

interface ProfileModalProps {
  name: string | null;
  email: string;
  avatarUrl: string | null;
  onSave: (updates: { name: string; avatar_url: string | null }) => Promise<void>;
  onClose: () => void;
}

export function ProfileModal({ name, email, avatarUrl, onSave, onClose }: ProfileModalProps) {
  const [displayName, setDisplayName] = useState(name ?? '');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(avatarUrl);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await onSave({ name: displayName.trim(), avatar_url: selectedAvatar });
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setSaveError(
        msg.toLowerCase().includes('not signed in')
          ? 'You must be signed in to save changes.'
          : msg.toLowerCase().includes('network') || msg.toLowerCase().includes('fetch')
            ? 'Network error — check your connection and try again.'
            : 'Failed to save. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      <div
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">Edit Profile</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live preview */}
        <div className="flex items-center gap-4 mb-5">
          <Avatar name={displayName || null} email={email} avatarUrl={selectedAvatar} size={56} />
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{displayName || email}</p>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Display name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => { setDisplayName(e.target.value); setSaveError(null); }}
              placeholder="Your name"
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C74504]/30 focus:border-[#C74504] text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
          </div>

          {/* Avatar picker */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
              Choose Avatar
            </label>
            <div className="grid grid-cols-5 gap-2">

              {/* Option 0 — Initials */}
              <button
                type="button"
                onClick={() => { setSelectedAvatar(null); setSaveError(null); }}
                className={cn(
                  'relative flex-1 flex flex-col items-center gap-1.5 rounded-xl p-1.5 transition-all border-2',
                  selectedAvatar === null
                    ? 'border-[#C74504] bg-orange-50 dark:bg-orange-950/20'
                    : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
                title="Use initials"
              >
                <Avatar name={displayName || null} email={email} avatarUrl={null} size={44} />
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-none">Initials</span>
                {selectedAvatar === null && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C74504] rounded-full flex items-center justify-center">
                    <Check className="w-2 h-2 text-white" strokeWidth={3} />
                  </span>
                )}
              </button>

              {/* Options 1-5 — DiceBear styles */}
              {AVATAR_STYLES.map(({ id, label }) => {
                const url = dicebearUrl(id, email);
                const isSelected = selectedAvatar === url;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => { setSelectedAvatar(url); setSaveError(null); }}
                    className={cn(
                      'relative flex-1 flex flex-col items-center gap-1.5 rounded-xl p-1.5 transition-all border-2',
                      isSelected
                        ? 'border-[#C74504] bg-orange-50 dark:bg-orange-950/20'
                        : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                    title={label}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={label}
                      width={44}
                      height={44}
                      className="rounded-full w-[44px] h-[44px] object-cover"
                    />
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-none">{label}</span>
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C74504] rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}

            </div>
          </div>
        </div>

        {/* Save error */}
        {saveError && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30 px-3 py-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-px" />
            <p className="text-sm text-red-600 dark:text-red-400">{saveError}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
