'use client';

import { ReactNode, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const GAP = 6;

function calcPosition(rect: DOMRect, side: string) {
  if (side === 'top')    return { top: rect.top - GAP,              left: rect.left + rect.width / 2,   transform: 'translate(-50%, -100%)' };
  if (side === 'bottom') return { top: rect.bottom + GAP,           left: rect.left + rect.width / 2,   transform: 'translate(-50%, 0)' };
  if (side === 'left')   return { top: rect.top + rect.height / 2,  left: rect.left - GAP,              transform: 'translate(-100%, -50%)' };
  /* right */            return { top: rect.top + rect.height / 2,  left: rect.right + GAP,             transform: 'translate(0, -50%)' };
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [pos, setPos] = useState<{ top: number; left: number; transform: string } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const show = useCallback(() => {
    if (!wrapperRef.current) return;
    setPos(calcPosition(wrapperRef.current.getBoundingClientRect(), side));
  }, [side]);

  const hide = useCallback(() => setPos(null), []);

  return (
    <div ref={wrapperRef} className={cn('inline-flex', className)} onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {pos && typeof document !== 'undefined' && createPortal(
        <span
          role="tooltip"
          style={{ position: 'fixed', top: pos.top, left: pos.left, transform: pos.transform, zIndex: 9999 }}
          className={cn(
            'pointer-events-none px-2 py-1 rounded-md',
            'bg-gray-900 dark:bg-gray-700 text-white',
            'text-[11px] font-medium whitespace-nowrap shadow-lg',
          )}
        >
          {content}
        </span>,
        document.body
      )}
    </div>
  );
}
