'use client';

import { cn } from '@/lib/utils';

const PALETTE = ['#EE661D', '#3B82F6', '#7C3AED', '#10B981', '#EC4899', '#F59E0B', '#0EA5E9', '#64748B'];

function pickColor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + ((h << 5) - h);
  return PALETTE[Math.abs(h) % PALETTE.length];
}

function initials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  }
  return email[0].toUpperCase();
}

interface AvatarProps {
  name: string | null;
  email: string;
  avatarUrl?: string | null;
  size?: number;
  className?: string;
}

export function Avatar({ name, email, avatarUrl, size = 32, className }: AvatarProps) {
  const fontSize = Math.round(size * 0.38);

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name || email}
        width={size}
        height={size}
        className={cn('rounded-full object-cover flex-shrink-0', className)}
        style={{ width: size, height: size }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
    );
  }

  return (
    <div
      className={cn('rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 select-none', className)}
      style={{ width: size, height: size, backgroundColor: pickColor(email), fontSize }}
      aria-label={name || email}
    >
      {initials(name, email)}
    </div>
  );
}
