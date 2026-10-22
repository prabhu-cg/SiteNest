'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type React from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, RotateCcw, X, Eye, EyeOff, MousePointerClick, ChevronRight, FileText, FolderTree, Tag } from 'lucide-react';
import { BLOCK_REGISTRY } from '@/components/wireframe/blocks';
import { findHome } from '@/lib/flow';
import type { SharedNode } from '@/lib/storage';

interface PresentModeProps {
  nodes: SharedNode[];
  edges: { source_node_id: string; target_node_id: string }[];
  /** Page to start on; defaults to Home */
  startId?: string | null;
  /** Omit for the public share page, which has nothing to exit to */
  onExit?: () => void;
  title?: string;
}

export default function PresentMode({ nodes, edges, startId: requestedStartId, onExit, title }: PresentModeProps) {
  const startId = useMemo(() => {
    if (requestedStartId && nodes.some((n) => n.id === requestedStartId)) return requestedStartId;
    return findHome(nodes, new Set(edges.map((e) => e.target_node_id)));
  }, [nodes, edges, requestedStartId]);

  // path[0] is the start page; the last entry is the page on screen
  const [path, setPath] = useState<string[]>(() => (startId ? [startId] : []));
  const [showLinks, setShowLinks] = useState(true);
  const [showLabels, setShowLabels] = useState(false);

  // Sitemap hierarchy (first parent wins), used for the sidebar and sub-page cards
  const { childrenOf, roots } = useMemo(() => {
    const childrenOf = new Map<string, string[]>();
    const hasParent = new Set<string>();
    const ids = new Set(nodes.map((n) => n.id));
    edges.forEach((e) => {
      if (!ids.has(e.source_node_id) || !ids.has(e.target_node_id) || hasParent.has(e.target_node_id)) return;
      hasParent.add(e.target_node_id);
      childrenOf.set(e.source_node_id, [...(childrenOf.get(e.source_node_id) ?? []), e.target_node_id]);
    });
    return { childrenOf, roots: nodes.filter((n) => !hasParent.has(n.id)).map((n) => n.id) };
  }, [nodes, edges]);

  const currentId = path[path.length - 1];
  const page = nodes.find((n) => n.id === currentId);
  const titleOf = (id: string) => nodes.find((n) => n.id === id)?.title ?? 'Untitled';

  const goBack = useCallback(() => setPath((p) => (p.length > 1 ? p.slice(0, -1) : p)), []);
  const restart = useCallback(() => setPath(startId ? [startId] : []), [startId]);
  const exit = useCallback(() => onExit?.(), [onExit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exit();
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goBack(); }
      else if (e.key === 'r') restart();
      else if (e.key === 'h') setShowLinks((v) => !v);
      else if (e.key === 'l') setShowLabels((v) => !v);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [exit, goBack, restart]);

  const renderTree = (ids: string[], depth: number, seen: Set<string>): React.ReactNode =>
    ids.filter((id) => !seen.has(id) && seen.add(id)).map((id) => (
      <li key={id}>
        <button
          onClick={() => setPath([id])}
          style={{ paddingLeft: 12 + depth * 14 }}
          className={`w-full flex items-center gap-1.5 pr-3 py-1.5 text-left text-xs truncate transition-colors ${id === currentId ? 'bg-accent/20 text-white font-semibold' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
        >
          <FileText className="w-3 h-3 flex-shrink-0 opacity-60" />
          <span className="truncate">{titleOf(id)}</span>
        </button>
        {(childrenOf.get(id)?.length ?? 0) > 0 && <ul>{renderTree(childrenOf.get(id)!, depth + 1, seen)}</ul>}
      </li>
    ));

  const subPages = childrenOf.get(currentId) ?? [];
  const blocks = page?.wireframe ?? [];
  const linkable = blocks.filter((b) => b.linkTo && nodes.some((n) => n.id === b.linkTo));
  const clicks = path.length - 1;

  return createPortal(
    <div className="fixed inset-0 z-[10000] bg-gray-900 flex flex-col" role="dialog" aria-label="Present mode">
      {/* Top bar */}
      <div className="h-12 flex items-center gap-2 px-3 border-b border-white/10 flex-shrink-0">
        {onExit ? (
          <button onClick={exit} className="flex items-center gap-1.5 px-2.5 h-7 text-xs font-semibold text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors">
            <X className="w-3.5 h-3.5" /> Exit
          </button>
        ) : (
          <span className="px-2 text-xs font-semibold text-white truncate max-w-[180px]">{title}</span>
        )}
        <div className="w-px h-4 bg-white/15" />
        <button onClick={goBack} disabled={path.length < 2} aria-label="Back" className="p-1.5 rounded-md text-white/80 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button onClick={restart} disabled={path.length < 2} aria-label="Restart" className="p-1.5 rounded-md text-white/80 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Fake address bar */}
        <div className="flex-1 max-w-xl mx-auto h-7 rounded-md bg-white/10 flex items-center px-3 text-xs text-white/70 truncate">
          yoursite.com<span className="text-white">{page?.url_slug || '/'}</span>
        </div>

        <button
          onClick={() => setShowLabels((v) => !v)}
          aria-pressed={showLabels}
          title="Show every block's name (L)"
          className={`flex items-center gap-1.5 px-2.5 h-7 text-xs font-medium rounded-md transition-colors ${showLabels ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
        >
          <Tag className="w-3.5 h-3.5" />
          Block names
        </button>
        <button
          onClick={() => setShowLinks((v) => !v)}
          aria-pressed={showLinks}
          title="Outline the blocks that are clickable (H)"
          className={`flex items-center gap-1.5 px-2.5 h-7 text-xs font-medium rounded-md transition-colors ${showLinks ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
        >
          {showLinks ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          Highlight links
        </button>
        {!onExit && (
          <a href="/" className="hidden md:block pl-2 text-[11px] text-white/40 hover:text-white/70 transition-colors">
            Made with SiteNest
          </a>
        )}
      </div>

      <div className="flex-1 flex min-h-0">
      {/* Sitemap structure */}
      <nav aria-label="Sitemap" className="w-56 flex-shrink-0 border-r border-white/10 overflow-y-auto py-2 hidden md:block">
        <p className="flex items-center gap-1.5 px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
          <FolderTree className="w-3 h-3" /> Sitemap
        </p>
        <ul>{renderTree(roots.length > 0 ? roots : nodes.map((n) => n.id), 0, new Set())}</ul>
      </nav>

      {/* Page */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto my-6 bg-white rounded-lg shadow-2xl overflow-hidden min-h-[60vh]">
          {blocks.length === 0 && (
            <div className="py-20 px-10 text-center">
              <p className="text-xl font-semibold text-gray-800">{page?.title ?? 'No page'}</p>
              <p className="text-sm text-gray-400 mt-1">No blocks on this page yet.</p>
              {subPages.length > 0 && (
                <div className="mt-8 max-w-lg mx-auto text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Sub-pages</p>
                  <div className="grid grid-cols-2 gap-2">
                    {subPages.map((id) => (
                      <button
                        key={id}
                        onClick={() => setPath((p) => [...p, id])}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-accent hover:text-accent transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{titleOf(id)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {blocks.map((block) => {
            const meta = BLOCK_REGISTRY.find((b) => b.type === block.type);
            if (!meta) return null;
            const target = block.linkTo && nodes.some((n) => n.id === block.linkTo) ? block.linkTo : null;
            const nameChip = (
              <span className={`absolute top-2 left-2 z-10 px-2 py-1 rounded-md bg-gray-900/80 text-white text-[10px] font-semibold pointer-events-none transition-opacity ${showLabels ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {meta.label}
              </span>
            );
            if (!target) {
              return (
                <div key={block.id} className="group relative">
                  {nameChip}
                  <meta.component />
                </div>
              );
            }
            return (
              <button
                key={block.id}
                onClick={() => setPath((p) => [...p, target])}
                aria-label={`${meta.label} — go to ${titleOf(target)}`}
                className="group relative block w-full text-left cursor-pointer"
              >
                {nameChip}
                <meta.component />
                {/* Drawn above the block: the block's own SVG background would hide an inset shadow */}
                <span
                  aria-hidden
                  className={`absolute inset-0 pointer-events-none border-2 border-dashed transition-all group-hover:border-solid group-hover:border-[3px] group-hover:border-accent ${showLinks ? 'border-accent/70 bg-accent/[0.06]' : 'border-transparent'}`}
                />
                <span className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-accent text-white text-[11px] font-semibold shadow-md transition-opacity ${showLinks ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <MousePointerClick className="w-3 h-3" /> {titleOf(target)}
                </span>
              </button>
            );
          })}
        </div>

        {blocks.length > 0 && linkable.length === 0 && (
          <p className="text-center text-sm text-amber-300 pb-6">
            Dead end — nothing on this page links anywhere. Press <kbd className="px-1 rounded bg-white/10">←</kbd> to go back.
          </p>
        )}
      </div>
      </div>

      {/* Click trail */}
      <div className="h-11 border-t border-white/10 flex items-center gap-3 px-4 flex-shrink-0 overflow-x-auto">
        <span className="text-xs font-bold tabular-nums text-white bg-accent rounded-full px-2.5 py-0.5 flex-shrink-0">
          {clicks} click{clicks === 1 ? '' : 's'}
        </span>
        <ol className="flex items-center gap-1 text-xs text-white/60 whitespace-nowrap">
          {path.map((id, i) => (
            <li key={`${id}-${i}`} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3 h-3 text-white/30" />}
              <button
                onClick={() => setPath((p) => p.slice(0, i + 1))}
                className={i === path.length - 1 ? 'text-white font-semibold' : 'hover:text-white'}
              >
                {titleOf(id)}
              </button>
            </li>
          ))}
        </ol>
        <span className="ml-auto text-[11px] text-white/30 flex-shrink-0 hidden md:block">{onExit ? 'Esc exit · ' : ''}← back · R restart · H highlight links · L block names</span>
      </div>
    </div>,
    document.body
  );
}
