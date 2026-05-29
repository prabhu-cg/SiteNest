'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Search } from 'lucide-react';
import { BLOCK_REGISTRY, BLOCK_CATEGORIES } from './blocks';
import type { WireframeBlockType } from '@/types';

interface WireframeBlockPickerProps {
  anchor: { top: number; right: number };
  onAdd: (type: WireframeBlockType) => void;
  onClose: () => void;
}

export default function WireframeBlockPicker({ anchor, onAdd, onClose }: WireframeBlockPickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = () => {
    setIsScrolling(true);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 800);
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const panelW = 320;
  const panelMaxH = 520;
  const margin = 12;

  const left = Math.min(anchor.right + 8, window.innerWidth - panelW - margin);
  const spaceBelow = window.innerHeight - anchor.top - margin;
  const top = spaceBelow >= panelMaxH
    ? anchor.top
    : Math.max(margin, window.innerHeight - panelMaxH - margin);

  const categories = ['All', ...BLOCK_CATEGORIES];

  const filtered = BLOCK_REGISTRY.filter((meta) => {
    const matchesCategory = activeCategory === 'All' || meta.category === activeCategory;
    const matchesSearch = !query || meta.label.toLowerCase().includes(query.toLowerCase()) || meta.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const grouped = activeCategory === 'All' && !query
    ? BLOCK_CATEGORIES.map((cat) => ({
        category: cat,
        blocks: filtered.filter((b) => b.category === cat),
      })).filter((g) => g.blocks.length > 0)
    : [{ category: activeCategory, blocks: filtered }];

  return createPortal(
    <>
      {/* Full-screen backdrop */}
      <div
        className="fixed inset-0 z-[9998]"
        onClick={onClose}
        onWheel={onClose}
        onPointerDown={onClose}
      />

      {/* Picker panel */}
      <div
        ref={ref}
        className="fixed z-[9999] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden flex flex-col"
        style={{ top, left, width: panelW, maxHeight: 520 }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Add block</p>
          <button onClick={onClose} className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-2 pt-2 pb-0 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <Search className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search blocks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Category pills */}
        {!query && (
          <div className="relative flex-shrink-0 mt-2.5">
            <div className="flex items-center gap-1 px-2 pb-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    'flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors',
                    activeCategory === cat
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                  ].join(' ')}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Fade to indicate more pills are scrollable */}
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Block list */}
        <div
          onScroll={handleScroll}
          className={`flex-1 overflow-y-auto p-2 space-y-3 min-h-0 ${isScrolling ? 'thin-scroll' : 'no-scrollbar'}`}
        >
          {grouped.map(({ category, blocks }) => (
            <div key={category}>
              {activeCategory === 'All' && !query && (
                <p className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-1 mb-1">{category}</p>
              )}
              <div className="space-y-0.5">
                {blocks.map((meta) => (
                  <button
                    key={meta.type}
                    onClick={() => { onAdd(meta.type); onClose(); }}
                    className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group"
                  >
                    {/* Tiny block preview */}
                    <div
                      className="flex-shrink-0 w-16 rounded border border-gray-100 dark:border-gray-700 overflow-hidden bg-white"
                      style={{ height: 36 }}
                    >
                      <div style={{ transform: 'scale(0.2)', transformOrigin: 'top left', width: '500%', pointerEvents: 'none' }}>
                        <meta.component />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-accent transition-colors truncate">
                        {meta.label}
                      </p>
                      <p className="text-[10px] text-gray-400 leading-tight mt-0.5 truncate">{meta.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-6">No blocks match "{query}"</p>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
