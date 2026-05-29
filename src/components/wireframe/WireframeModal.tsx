'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Plus, Trash2, GripVertical, Search, Check, Loader2, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Tooltip } from '@/components/ui/tooltip';
import { BLOCK_REGISTRY, BLOCK_CATEGORIES } from './blocks';
import { generateId } from '@/lib/utils';
import type { WireframeBlock, WireframeBlockType } from '@/types';

interface WireframeModalProps {
  pageTitle: string;
  blocks: WireframeBlock[];
  onClose: () => void;
  onSave: (blocks: WireframeBlock[]) => void;
}

type SaveState = 'idle' | 'saving' | 'saved';

function SaveStatus({ state }: { state: SaveState }) {
  if (state === 'saved') {
    return (
      <span className="flex items-center gap-1 text-xs text-green-500 font-medium flex-shrink-0">
        <Check className="w-3 h-3" /> Saved
      </span>
    );
  }
  if (state === 'saving') {
    return (
      <span className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
        <Loader2 className="w-3 h-3 animate-spin" /> Saving…
      </span>
    );
  }
  return (
    <span className="text-xs text-gray-300 dark:text-gray-600 flex-shrink-0">All changes saved</span>
  );
}

export default function WireframeModal({ pageTitle, blocks: initialBlocks, onClose, onSave }: WireframeModalProps) {
  const [blocks, setBlocks] = useState<WireframeBlock[]>(initialBlocks);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [paletteCategory, setPaletteCategory] = useState('All');
  const [closing, setClosing] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [isDirty, setIsDirty] = useState(false);
  const [exporting, setExporting] = useState(false);
  const dragIndexRef = useRef<number | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const savedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingBlocksRef = useRef(blocks);
  const onSaveRef = useRef(onSave);
  useEffect(() => { onSaveRef.current = onSave; }, [onSave]);

  // Keep pending ref in sync for flush-on-close
  useEffect(() => { pendingBlocksRef.current = blocks; }, [blocks]);

  // Auto-save — only fires when user has actually made a change
  useEffect(() => {
    if (!isDirty) return;

    setSaveState('saving');
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);

    saveTimerRef.current = setTimeout(() => {
      onSaveRef.current(pendingBlocksRef.current);
      setSaveState('saved');
      savedTimerRef.current = setTimeout(() => setSaveState('idle'), 2000);
    }, 800);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [blocks, isDirty]);

  const flushAndClose = useCallback(() => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      onSave(pendingBlocksRef.current);
    }
    setClosing(true);
    setTimeout(onClose, 240);
  }, [onClose, onSave]);

  const exportPng = useCallback(async () => {
    const el = exportRef.current;
    if (!el || exporting || !blocks.length) return;
    setExporting(true);
    try {
      const slug = pageTitle.toLowerCase().replace(/\s+/g, '-') || 'wireframe';
      const pad = 32;
      const canvas = await html2canvas(el, {
        backgroundColor: '#f1f5f9',
        scale: 2,
        useCORS: true,
        // Expand capture area to add padding around the blocks
        x: -pad,
        y: -pad,
        width: el.offsetWidth + pad * 2,
        height: el.offsetHeight + pad * 2,
      });
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${slug}.png`;
      a.click();
    } finally {
      setExporting(false);
    }
  }, [pageTitle, exporting, blocks.length]);

  const addBlock = (type: WireframeBlockType) => {
    setBlocks((prev) => [...prev, { id: generateId(), type }]);
    setIsDirty(true);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 50);
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    setIsDirty(true);
  };

  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleDrop = (toIndex: number) => {
    const fromIndex = dragIndexRef.current;
    if (fromIndex === null || fromIndex === toIndex) return;
    setBlocks((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
    dragIndexRef.current = null;
    setDragOverIndex(null);
    setIsDirty(true);
  };

  const paletteCategories = ['All', ...BLOCK_CATEGORIES];
  const filteredPalette = BLOCK_REGISTRY.filter((meta) => {
    const matchesCat = paletteCategory === 'All' || meta.category === paletteCategory;
    const matchesQ = !paletteQuery || meta.label.toLowerCase().includes(paletteQuery.toLowerCase());
    return matchesCat && matchesQ;
  });

  const paletteGrouped = paletteCategory === 'All' && !paletteQuery
    ? BLOCK_CATEGORIES.map((cat) => ({
        category: cat,
        blocks: filteredPalette.filter((b) => b.category === cat),
      })).filter((g) => g.blocks.length > 0)
    : [{ category: paletteCategory, blocks: filteredPalette }];

  return (
    <div className={`fixed inset-0 z-[60] flex items-stretch justify-end bg-black/40 ${closing ? 'animate-wf-backdrop-out' : 'animate-wf-backdrop'}`}>
      {/* Clickable peek strip */}
      <div className="w-[100px] flex-shrink-0 cursor-pointer" onClick={flushAndClose} />

      {/* Drawer */}
      <div className={`flex flex-col flex-1 h-full bg-white dark:bg-gray-950 shadow-2xl overflow-hidden ${closing ? 'animate-wf-panel-out' : 'animate-wf-panel'}`}>

        {/* Title bar */}
        <div className="h-11 flex-shrink-0 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 px-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{pageTitle}</p>
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0">{blocks.length} block{blocks.length !== 1 ? 's' : ''}</span>
          <SaveStatus state={saveState} />
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
          <Tooltip content="Download as PNG" side="bottom">
            <button
              onClick={exportPng}
              disabled={exporting || blocks.length === 0}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 transition-colors"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            </button>
          </Tooltip>
          <button
            onClick={flushAndClose}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content row: palette + canvas */}
        <div className="flex flex-1 min-h-0">

          {/* Left: Block palette */}
          <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex flex-col">
            <div className="px-3 pt-3 pb-2 space-y-2 flex-shrink-0">
              {/* Search */}
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Search className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search blocks..."
                  value={paletteQuery}
                  onChange={(e) => setPaletteQuery(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none"
                />
              </div>
              {/* Category pills */}
              {!paletteQuery && (
                <div className="flex flex-wrap gap-1">
                  {paletteCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPaletteCategory(cat)}
                      className={[
                        'px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors',
                        paletteCategory === cat
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600',
                      ].join(' ')}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="thin-scroll flex-1 overflow-y-auto p-2 space-y-3">
              {paletteGrouped.map(({ category, blocks: catBlocks }) => (
                <div key={category}>
                  {paletteCategory === 'All' && !paletteQuery && (
                    <p className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-1 mb-1">{category}</p>
                  )}
                  <div className="space-y-1">
                    {catBlocks.map((meta) => (
                      <button
                        key={meta.type}
                        onClick={() => addBlock(meta.type)}
                        className="w-full text-left group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-accent hover:shadow-sm transition-all overflow-hidden"
                      >
                        <div className="w-full overflow-hidden bg-gray-50 border-b border-gray-100 dark:border-gray-700" style={{ height: 48 }}>
                          <div style={{ transform: 'scale(0.25)', transformOrigin: 'top left', width: '400%', pointerEvents: 'none' }}>
                            <meta.component />
                          </div>
                        </div>
                        <div className="px-2.5 py-1.5">
                          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1">
                            <Plus className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            {meta.label}
                          </p>
                          <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{meta.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {filteredPalette.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-8">No blocks match "{paletteQuery}"</p>
              )}
            </div>
          </div>

          {/* Right: Canvas */}
          <div className="flex-1 flex flex-col min-w-0">
            <div ref={scrollRef} className="thin-scroll flex-1 overflow-y-auto bg-[#f1f5f9] dark:bg-gray-900 p-6">
              {blocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">No blocks yet</p>
                  <p className="text-xs text-gray-400 mt-1">Pick blocks from the panel on the left</p>
                </div>
              ) : (
                <div ref={exportRef} className="max-w-3xl mx-auto space-y-1">
                  {blocks.map((block, index) => {
                    const meta = BLOCK_REGISTRY.find((b) => b.type === block.type);
                    if (!meta) return null;
                    const Component = meta.component;
                    return (
                      <div
                        key={block.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index); }}
                        onDrop={() => handleDrop(index)}
                        onDragLeave={() => setDragOverIndex(null)}
                        className={`group relative bg-white rounded-lg overflow-hidden shadow-sm border-2 transition-all ${
                          dragOverIndex === index ? 'border-accent' : 'border-transparent'
                        }`}
                      >
                        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-md px-1.5 py-1 shadow-sm border border-gray-200 dark:border-gray-700">
                            <span className="text-[10px] font-medium text-gray-500 mr-1">{meta.label}</span>
                            <GripVertical className="w-3.5 h-3.5 text-gray-400 cursor-grab" />
                            <button
                              onClick={() => removeBlock(block.id)}
                              className="p-0.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <Component />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
