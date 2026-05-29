'use client';

import { useState } from 'react';
import { useCanvasStore } from '@/store/canvasStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { COLOR_OPTIONS, STATUS_OPTIONS } from '@/lib/utils';
import { BLOCK_REGISTRY } from '@/components/wireframe/blocks';
import { GripVertical, Trash2, Expand } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import type { WireframeBlock } from '@/types';

interface PropertiesPanelProps {
  projectId: string;
}

function BlocksSection({
  nodeId: _nodeId,
  blocks,
  onUpdate,
  onOpenEditor,
}: {
  nodeId: string;
  blocks: WireframeBlock[];
  onUpdate: (blocks: WireframeBlock[]) => void;
  onOpenEditor: () => void;
}) {
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const handleDrop = (toIndex: number) => {
    if (dragFrom === null || dragFrom === toIndex) return;
    const next = [...blocks];
    const [moved] = next.splice(dragFrom, 1);
    next.splice(toIndex, 0, moved);
    onUpdate(next);
  };

  const removeBlock = (blockId: string) => {
    onUpdate(blocks.filter((b) => b.id !== blockId));
  };

  if (blocks.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <Label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Blocks
        </Label>
        <button
          onClick={onOpenEditor}
          className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-accent transition-colors"
        >
          <Expand className="w-3 h-3" />
          Open editor
        </button>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {blocks.map((block, index) => {
          const meta = BLOCK_REGISTRY.find((b) => b.type === block.type);
          if (!meta) return null;
          const isOver = dragOver === index && dragFrom !== index;

          return (
            <div
              key={block.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                setDragFrom(index);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                setDragOver(index);
              }}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(index);
                setDragFrom(null);
                setDragOver(null);
              }}
              onDragEnd={() => {
                setDragFrom(null);
                setDragOver(null);
              }}
              className={[
                'flex items-center gap-2 px-2 py-2 group/block transition-colors',
                index !== blocks.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : '',
                isOver ? 'bg-accent/5 border-t-2 border-t-accent' : 'hover:bg-orange-50/50 dark:hover:bg-orange-950/10',
                dragFrom === index ? 'opacity-40' : '',
              ].join(' ')}
            >
              <GripVertical className="w-3.5 h-3.5 text-gray-300 cursor-grab hover:text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-700 dark:text-gray-300 flex-1 truncate">
                {meta.label}
              </span>
              <button
                onClick={() => removeBlock(block.id)}
                className="opacity-0 group-hover/block:opacity-100 p-0.5 rounded hover:bg-red-50 dark:hover:bg-red-950 text-gray-300 hover:text-red-500 transition-all flex-shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PropertiesPanel({ projectId: _projectId }: PropertiesPanelProps) {
  const { nodes, selectedNodeId, updateNode, deleteNode, setWireframeNodeId } = useCanvasStore() as any;
  const selectedNode = nodes.find((n: any) => n.id === selectedNodeId);
  const [colorOpen, setColorOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => setConfirmOpen(true);
  const confirmDelete = () => {
    if (selectedNode) deleteNode(selectedNode.id);
    setConfirmOpen(false);
  };

  if (!selectedNode) {
    return (
      <div className="w-72 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center px-6">
          Select a page node on the canvas to edit its properties
        </p>
      </div>
    );
  }

  return (
    <>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete page?"
        message={`"${selectedNode?.title}" will be removed from the canvas along with all its connections. This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      <div className="w-72 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">Page Properties</p>
          <p className="text-xs text-gray-400 mt-0.5">Changes save automatically</p>
        </div>

        <div className="flex-1 p-4 space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Page Title
            </Label>
            <Input
              id="title"
              key={`title-${selectedNode.id}`}
              placeholder="Enter page title"
              defaultValue={selectedNode.title}
              onChange={(e) => updateNode(selectedNode.id, { title: e.target.value })}
              className="mt-1.5 h-8 text-sm"
            />
          </div>

          {/* Page Path */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <Label htmlFor="url_slug" className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Page Path
              </Label>
              <Tooltip content="The URL path for this page, e.g. /about or /contact" side="right">
                <span className="text-xs text-gray-400 cursor-default">ⓘ</span>
              </Tooltip>
            </div>
            <Input
              id="url_slug"
              key={`slug-${selectedNode.id}`}
              placeholder="/about"
              defaultValue={selectedNode.url_slug || ''}
              onChange={(e) => updateNode(selectedNode.id, { url_slug: e.target.value })}
              className="h-8 text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">The URL path for this page (e.g. /about)</p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Description
            </Label>
            <textarea
              id="description"
              key={`desc-${selectedNode.id}`}
              placeholder="Short page description..."
              defaultValue={selectedNode.description || ''}
              onChange={(e) => updateNode(selectedNode.id, { description: e.target.value })}
              rows={3}
              className="mt-1.5 w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-950 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Status
            </Label>
            <select
              id="status"
              value={selectedNode.status}
              onChange={(e) => updateNode(selectedNode.id, { status: e.target.value as any })}
              className="mt-1.5 w-full h-8 px-2 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Node Color */}
          <div>
            <Label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Node Color
            </Label>
            <div className="relative mt-1.5">
              <button
                type="button"
                onClick={() => setColorOpen((v) => !v)}
                className="w-full h-8 flex items-center gap-2 px-3 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <span className="w-4 h-4 rounded-full flex-shrink-0 border border-gray-300" style={{ backgroundColor: selectedNode.color }} />
                <span className="flex-1 text-left text-gray-700 dark:text-gray-300">
                  {COLOR_OPTIONS.find((c) => c.hex === selectedNode.color)?.name ?? selectedNode.color}
                </span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {colorOpen && (
                <div className="absolute z-50 top-9 left-0 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 max-h-56 overflow-y-auto">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => { updateNode(selectedNode.id, { color: c.hex }); setColorOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedNode.color === c.hex ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
                    >
                      <span className="w-4 h-4 rounded-full flex-shrink-0 border border-gray-200" style={{ backgroundColor: c.hex }} />
                      <span className="text-gray-700 dark:text-gray-300">{c.name}</span>
                      {selectedNode.color === c.hex && (
                        <svg className="w-3 h-3 text-accent ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Blocks section */}
          <BlocksSection
            key={`blocks-${selectedNode.id}`}
            nodeId={selectedNode.id}
            blocks={selectedNode.wireframe ?? []}
            onUpdate={(blocks) => updateNode(selectedNode.id, { wireframe: blocks })}
            onOpenEditor={() => setWireframeNodeId(selectedNode.id)}
          />
        </div>

        {/* Footer — Delete */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={handleDelete}
            className="w-full h-8 text-xs font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-md hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
          >
            Delete Page
          </button>
        </div>
      </div>
    </>
  );
}
