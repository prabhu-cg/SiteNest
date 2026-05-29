'use client';

import { useState } from 'react';
import { useCanvasStore } from '@/store/canvasStore';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Plus, Trash2, Copy } from 'lucide-react';
import { generateId } from '@/lib/utils';
import { Tooltip } from '@/components/ui/tooltip';
import type { SitemapNode } from '@/types';

interface SidebarProps {
  projectId: string;
  onAddNode?: () => void;
}

export default function Sidebar({ projectId: _projectId, onAddNode }: SidebarProps) {
  const { nodes, selectedNodeId, setSelectedNode, deleteNode, addNode } = useCanvasStore();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = () => {
    if (pendingDeleteId) deleteNode(pendingDeleteId);
    setPendingDeleteId(null);
  };

  const handleDuplicate = (node: SitemapNode) => {
    const duplicate: SitemapNode = {
      ...node,
      id: generateId(),
      title: `${node.title} (copy)`,
      position_x: (node.position_x ?? 0) + 30,
      position_y: (node.position_y ?? 0) + 30,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addNode(duplicate);
    setSelectedNode(duplicate.id);
  };

  return (
    <>
    <ConfirmDialog
      open={pendingDeleteId !== null}
      title="Delete page?"
      message="This will remove the page and all its connections. This cannot be undone."
      confirmLabel="Delete"
      onConfirm={confirmDelete}
      onCancel={() => setPendingDeleteId(null)}
    />
    <div className="w-56 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col flex-shrink-0">
      {/* Add Page */}
      <div className="p-3 border-b border-gray-100 dark:border-gray-800">
        <Button onClick={onAddNode} className="w-full font-semibold" size="sm">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Page
        </Button>
        <p className="text-xs text-gray-400 mt-2 text-center">Creates a new node on the canvas</p>
      </div>

      {/* Label */}
      <div className="px-3 pt-3 pb-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Pages ({nodes.length})
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {nodes.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">No pages yet</p>
        ) : (
          <div className="space-y-0.5">
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className={`group flex items-start gap-2 px-2 py-2 rounded-md cursor-pointer transition-all border ${
                    isSelected
                      ? 'border-accent bg-orange-50 dark:bg-orange-950/20'
                      : 'border-transparent hover:border-accent/40 hover:bg-orange-50/50 dark:hover:bg-orange-950/10'
                  }`}
                >
                  {/* Color circle */}
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-gray-200 mt-0.5"
                    style={{ backgroundColor: node.color || '#EE661D' }}
                  />

                  {/* Page info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate leading-tight ${
                      isSelected ? 'text-accent' : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {node.title}
                    </p>
                    {node.url_slug && (
                      <p className="text-xs text-gray-400 truncate">{node.url_slug}</p>
                    )}
                  </div>

                  {/* Actions — only visible on hover of the selected item */}
                  <div className={`gap-0.5 ${isSelected ? 'hidden group-hover:flex' : 'hidden'}`}>
                    <Tooltip content="Duplicate">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDuplicate(node); }}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(node.id); }}
                        className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
