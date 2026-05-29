import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePublicToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export const ICONS = [
  'home',
  'package',
  'shopping-cart',
  'credit-card',
  'user',
  'settings',
  'help-circle',
  'search',
  'star',
  'heart',
  'message-square',
  'bell',
  'folder',
  'file',
  'lock',
  'unlock',
] as const;

export const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft', color: '#9CA3AF' },
  { value: 'ready', label: 'Ready', color: '#3B82F6' },
  { value: 'completed', label: 'Completed', color: '#10B981' },
] as const;

export const COLOR_OPTIONS = [
  { hex: '#EE661D', name: 'Orange'  },
  { hex: '#64748B', name: 'Slate'   },
  { hex: '#3B82F6', name: 'Blue'    },
  { hex: '#0D9488', name: 'Teal'    },
  { hex: '#7C3AED', name: 'Violet'  },
  { hex: '#EC4899', name: 'Pink'    },
  { hex: '#10B981', name: 'Green'   },
  { hex: '#F59E0B', name: 'Amber'   },
  { hex: '#EF4444', name: 'Red'     },
  { hex: '#0EA5E9', name: 'Sky'     },
] as const;
