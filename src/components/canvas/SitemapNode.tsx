'use client';

import React, { memo, useState, useCallback, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { cn } from '@/lib/utils';
import { useCanvasStore } from '@/store/canvasStore';
import { BLOCK_REGISTRY } from '@/components/wireframe/blocks';
import WireframeBlockPicker from '@/components/wireframe/WireframeBlockPicker';
import { Plus, Trash2, Expand } from 'lucide-react';
import { generateId } from '@/lib/utils';
import type { WireframeBlock, WireframeBlockType } from '@/types';

interface SitemapNodeData {
  title: string;
  description?: string | null;
  status: string;
  color?: string;
  wireframe?: WireframeBlock[];
}

interface SitemapNodeProps {
  id: string;
  data: SitemapNodeData;
  selected?: boolean;
  isConnectable?: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  draft:     'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  ready:     'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  completed: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400',
};

const SitemapNode = memo(({ id, data, selected, isConnectable }: SitemapNodeProps) => {
  const { updateNode, setWireframeNodeId } = useCanvasStore();
  const [pickerAnchor, setPickerAnchor] = useState<{ top: number; right: number } | null>(null);
  const [hovered, setHovered] = useState(false);
  const [wfHovered, setWfHovered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const accentColor = data.color || '#EE661D';
  const statusStyle = STATUS_STYLES[data.status] ?? STATUS_STYLES.draft;
  const blocks = data.wireframe ?? [];

  const openPicker = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) setPickerAnchor({ top: rect.top, right: rect.right });
  }, []);

  const openEditor = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setWireframeNodeId(id);
  }, [id, setWireframeNodeId]);

  const addBlock = useCallback((type: WireframeBlockType) => {
    updateNode(id, { wireframe: [...blocks, { id: generateId(), type } as WireframeBlock] });
  }, [id, blocks, updateNode]);

  const removeBlock = useCallback((blockId: string) => {
    updateNode(id, { wireframe: blocks.filter((b) => b.id !== blockId) });
  }, [id, blocks, updateNode]);

  return (
    <>
      <div
        ref={rootRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn('relative rounded-xl shadow-sm transition-all duration-150', selected || hovered ? 'shadow-md' : '')}
        style={{ width: 220 }}
      >
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          className="!w-2 !h-2 !bg-gray-400 !border-white !transition-opacity !duration-150"
          style={{ opacity: hovered ? 1 : 0 }}
        />

        <div
          className={cn(
            'rounded-xl bg-white dark:bg-gray-900 border transition-all duration-150 overflow-hidden',
            selected ? 'border-2' : 'border-gray-200 dark:border-gray-700'
          )}
          style={selected ? { borderColor: accentColor } : hovered ? { borderColor: '#d1d5db' } : undefined}
        >
          {/* Accent bar */}
          <div className="h-1 flex-shrink-0" style={{ backgroundColor: accentColor }} />

          {/* Header */}
          <div className="px-3 py-2.5">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-50 truncate leading-tight">
              {data.title}
            </p>
            {data.description && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-2 leading-tight">
                {data.description}
              </p>
            )}
            <div className="flex items-center justify-between mt-2">
              <div className={cn('inline-flex text-xs px-2 py-0.5 rounded-full font-medium', statusStyle)}>
                {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
              </div>
              <button
                onClick={openPicker}
                className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-accent transition-colors px-1.5 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-accent"
              >
                <Plus className="w-3 h-3" />
                <span>Add block</span>
                {blocks.length > 0 && (
                  <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full px-1.5 py-px text-[9px] font-semibold leading-none">
                    {blocks.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Block stack */}
          {blocks.length > 0 && (
            <div
              className="border-t border-gray-100 dark:border-gray-800 relative pb-1.5"
              onMouseEnter={() => setWfHovered(true)}
              onMouseLeave={() => setWfHovered(false)}
            >
              {blocks.map((block, index) => {
                const meta = BLOCK_REGISTRY.find((b) => b.type === block.type);
                if (!meta) return null;
                const isLast = index === blocks.length - 1;
                return (
                  <div
                    key={block.id}
                    className={`group/block flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors ${!isLast ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}
                  >
                    {/* Index */}
                    <span className="text-[9px] font-bold tabular-nums text-gray-300 dark:text-gray-600 w-3 flex-shrink-0 select-none">
                      {index + 1}
                    </span>
                    {/* Label */}
                    <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 flex-1 truncate select-none leading-normal">
                      {meta.label}
                    </span>
                    {/* Remove */}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }}
                      className="opacity-0 group-hover/block:opacity-100 p-0.5 rounded hover:bg-red-50 dark:hover:bg-red-950 text-gray-300 hover:text-red-500 transition-all flex-shrink-0"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                );
              })}

              {/* "Open editor" overlay on section hover */}
              {wfHovered && (
                <div
                  onClick={openEditor}
                  className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: '#fff7ed80' }}
                >
                  <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 shadow-sm">
                    <Expand className="w-3 h-3 text-accent" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Open editor</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          className="!w-2 !h-2 !bg-gray-400 !border-white !transition-opacity !duration-150"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      </div>

      {pickerAnchor && (
        <WireframeBlockPicker
          anchor={pickerAnchor}
          onAdd={addBlock}
          onClose={() => setPickerAnchor(null)}
        />
      )}
    </>
  );
});

SitemapNode.displayName = 'SitemapNode';
export default SitemapNode;
