'use client';

import { useMemo } from 'react';
import { X, AlertTriangle, CheckCircle2, Link2 } from 'lucide-react';
import { useCanvasStore } from '@/store/canvasStore';
import { analyzeFlow, MAX_CLICK_DEPTH, type FindingKind, type FindingSeverity } from '@/lib/flow';

const KIND_LABEL: Record<FindingKind, string> = {
  unreachable: 'Unreachable page',
  'dead-end': 'Dead end',
  'too-deep': 'Buried too deep',
  'footer-only': 'Footer-only',
  'hierarchy-gap': 'Hierarchy gap',
};

const SEVERITY_DOT: Record<FindingSeverity, string> = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-gray-400',
};

export default function FlowPanel() {
  const { nodes, edges, setFlowPanelOpen, flowHighlightIds, setFlowHighlightIds, setSelectedNode } = useCanvasStore();
  const analysis = useMemo(() => analyzeFlow(nodes, edges), [nodes, edges]);
  const titleOf = (id: string) => nodes.find((n) => n.id === id)?.title ?? 'Untitled';

  const maxDepth = Math.max(0, ...Array.from(analysis.depth.values()));
  const reachable = analysis.depth.size;

  const focus = (ids: string[]) => {
    setFlowHighlightIds(ids);
    if (ids.length === 1) setSelectedNode(ids[0]);
  };

  return (
    <aside className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">Navigation Flow</p>
          <p className="text-xs text-gray-400 mt-0.5">How visitors can actually move through your site</p>
        </div>
        <button onClick={() => setFlowPanelOpen(false)} aria-label="Close flow panel" className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
          <X className="w-4 h-4" />
        </button>
      </div>

      {analysis.linkCount === 0 ? (
        <div className="p-6 text-center">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Link2 className="w-5 h-5 text-accent" />
          </div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">No links yet</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            Add blocks to a page, then drag the dot on a block's right edge onto another page. Once pages are linked, this panel finds orphans, dead ends and pages buried too deep.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-px bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
            {[
              { label: 'Links', value: analysis.linkCount },
              { label: 'Reachable', value: `${reachable}/${nodes.length}` },
              { label: 'Max depth', value: maxDepth },
            ].map((m) => (
              <div key={m.label} className="bg-white dark:bg-gray-950 px-3 py-2.5">
                <p className="text-base font-bold tabular-nums text-gray-900 dark:text-gray-50">{m.value}</p>
                <p className="text-[10px] uppercase tracking-wide text-gray-400">{m.label}</p>
              </div>
            ))}
          </div>

          {analysis.findings.length === 0 ? (
            <div className="p-6 text-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Every page is reachable</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                No dead ends, and all pages are within {MAX_CLICK_DEPTH} clicks of {titleOf(analysis.homeId ?? '')}.
              </p>
            </div>
          ) : (
            <ul className="p-2 space-y-1">
              {analysis.findings.map((f, i) => {
                const active = flowHighlightIds.length === 1 && flowHighlightIds[0] === f.nodeId;
                return (
                  <li key={`${f.kind}-${f.nodeId}-${i}`}>
                    <button
                      onClick={() => focus([f.nodeId])}
                      className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${active ? 'border-accent bg-accent/5' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-900'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${SEVERITY_DOT[f.severity]}`} />
                        <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{KIND_LABEL[f.kind]}</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-0.5 truncate">{titleOf(f.nodeId)}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">{f.detail}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="flex items-start gap-1.5 px-4 pb-4 text-[10px] text-gray-400 leading-snug">
            <AlertTriangle className="w-3 h-3 mt-px flex-shrink-0" />
            Based on block links only. "Home" is the page at "/" (or named Home). Click counts show on each page while this panel is open.
          </p>
        </div>
      )}
    </aside>
  );
}
