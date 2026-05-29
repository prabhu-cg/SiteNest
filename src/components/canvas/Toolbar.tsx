'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCanvasStore } from '@/store/canvasStore';
import {
  Download, Undo2, Redo2, Moon, Sun,
  ChevronDown, ChevronLeft, Check, Loader2,
} from 'lucide-react';
import type { LayoutDirection } from '@/lib/layout';
import { useTheme } from 'next-themes';
import { Tooltip } from '@/components/ui/tooltip';
import { AboutButton } from '@/components/ui/about-modal';
import { LogoMark } from '@/components/ui/logo-mark';

interface ToolbarProps {
  projectId: string;
  projectTitle?: string;
  onTitleChange?: (title: string) => void;
  onExport?: () => void;
  onAutoLayout?: (direction: LayoutDirection) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const LAYOUT_OPTIONS: { direction: LayoutDirection; label: string; description: string }[] = [
  { direction: 'TB',     label: 'Top → Bottom', description: 'Root at top, children arranged below' },
  { direction: 'LR',     label: 'Left → Right', description: 'Root at left, children to the right' },
  { direction: 'Radial', label: 'Radial',        description: 'Root at centre, children in concentric rings' },
];

function AutoLayoutMenu({ onAutoLayout }: { onAutoLayout: (dir: LayoutDirection) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Backdrop — closes dropdown on any outside click, works over React Flow canvas */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex items-center gap-1.5 px-2.5 h-7 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        Auto Layout
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-9 left-0 z-50 w-60 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1">
          {LAYOUT_OPTIONS.map(({ direction, label, description }) => (
            <button
              key={direction}
              onClick={() => { onAutoLayout(direction); setOpen(false); }}
              className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{description}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SaveStatus() {
  const { isDirty, lastAction } = useCanvasStore();
  const [display, setDisplay] = useState<{ text: string; type: 'idle' | 'action' | 'saving' | 'saved' }>({ text: '', type: 'idle' });
  const prevDirtyRef = useRef(isDirty);
  const actionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // When a new action happens, show its label briefly then show "Saving…"
  useEffect(() => {
    if (!isDirty) return;
    if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
    setDisplay({ text: lastAction || 'Editing…', type: 'action' });
    actionTimerRef.current = setTimeout(() => {
      setDisplay({ text: 'Saving…', type: 'saving' });
    }, 600);
  }, [isDirty, lastAction]);

  // When save completes (isDirty flips to false), show "Saved"
  useEffect(() => {
    if (prevDirtyRef.current && !isDirty) {
      if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
      setDisplay({ text: 'Saved', type: 'saved' });
      const t = setTimeout(() => setDisplay({ text: '', type: 'idle' }), 2000);
      prevDirtyRef.current = isDirty;
      return () => clearTimeout(t);
    }
    prevDirtyRef.current = isDirty;
    return undefined;
  }, [isDirty]);

  if (display.type === 'idle') {
    return <span className="text-xs text-gray-300 dark:text-gray-600">All changes saved</span>;
  }
  if (display.type === 'saved') {
    return (
      <span className="flex items-center gap-1 text-xs text-green-500 font-medium">
        <Check className="w-3 h-3" /> Saved
      </span>
    );
  }
  if (display.type === 'saving') {
    return (
      <span className="flex items-center gap-1 text-xs text-gray-400">
        <Loader2 className="w-3 h-3 animate-spin" /> Saving…
      </span>
    );
  }
  // action
  return <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{display.text}</span>;
}

export default function Toolbar({
  projectId: _projectId,
  projectTitle = 'Untitled Project',
  onTitleChange,
  onExport,
  onAutoLayout,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}: ToolbarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(projectTitle);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (!editingTitle) setTitleDraft(projectTitle); }, [projectTitle, editingTitle]);

  const commitTitle = () => {
    setEditingTitle(false);
    const trimmed = titleDraft.trim() || 'Untitled Project';
    setTitleDraft(trimmed);
    onTitleChange?.(trimmed);
  };

  return (
    <div className="h-11 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center px-3 gap-2 flex-shrink-0">
      {/* Back to home */}
      <Tooltip content="Back to projects" side="bottom">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1 p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </Tooltip>

      {/* Logo */}
      <div className="flex items-center gap-1.5 mr-1">
        <LogoMark size={20} />
        <span className="text-sm font-bold text-gray-900 dark:text-gray-50">SiteNest</span>
      </div>

      <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />

      {/* Editable project title */}
      {editingTitle ? (
        <input
          ref={titleInputRef}
          value={titleDraft}
          onChange={(e) => setTitleDraft(e.target.value)}
          onBlur={commitTitle}
          onKeyDown={(e) => { if (e.key === 'Enter') commitTitle(); if (e.key === 'Escape') { setTitleDraft(projectTitle); setEditingTitle(false); } }}
          className="text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-accent rounded px-2 h-6 w-40 focus:outline-none"
          autoFocus
        />
      ) : (
        <Tooltip content="Click to rename" side="bottom">
          <button
            onClick={() => { setEditingTitle(true); setTimeout(() => titleInputRef.current?.select(), 10); }}
            className="text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white truncate max-w-[160px] px-1 h-6 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {projectTitle}
          </button>
        </Tooltip>
      )}

      <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />

      {/* Undo / Redo */}
      <Tooltip content="Undo (⌘Z)" side="bottom">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>
      </Tooltip>
      <Tooltip content="Redo (⌘⇧Z)" side="bottom">
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>
      </Tooltip>

      {/* Auto Layout */}
      {onAutoLayout && (
        <>
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
          <AutoLayoutMenu onAutoLayout={onAutoLayout} />
        </>
      )}

      <div className="flex-1" />

      {/* Save status — right-aligned, before actions */}
      <SaveStatus />

      {/* Theme toggle */}
      <Tooltip content="Toggle theme" side="bottom">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
      </Tooltip>

      <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />

      <Tooltip content="About SiteNest" side="bottom">
        <AboutButton variant="icon" />
      </Tooltip>

      <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />

      <button
        onClick={() => onExport?.()}
        className="flex items-center gap-1.5 px-3 h-7 text-xs font-semibold text-white bg-accent hover:bg-accent/90 rounded-md transition-colors"
      >
        <Download className="w-3 h-3" />
        Export
      </button>
    </div>
  );
}
