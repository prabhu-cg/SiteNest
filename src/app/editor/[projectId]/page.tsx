'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Canvas from '@/components/canvas/Canvas';
import Sidebar from '@/components/canvas/Sidebar';
import PropertiesPanel from '@/components/canvas/PropertiesPanel';
import Toolbar from '@/components/canvas/Toolbar';
import { useCanvasStore } from '@/store/canvasStore';
import { useAuthStore } from '@/store/authStore';
import { generateId } from '@/lib/utils';
import { saveProject, loadProject, getProjectList } from '@/lib/storage';
import WireframeModal from '@/components/wireframe/WireframeModal';
import type { SitemapNode } from '@/types';
import type { LayoutDirection } from '@/lib/layout';
import { Loader2 } from 'lucide-react';

export default function EditorPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [projectTitle, setProjectTitle] = useState('Untitled Project');

  const {
    setProjectId,
    addNode,
    setSelectedNode,
    setNodes,
    setEdges,
    updateNode,
    nodes,
    edges,
    isDirty,
    markClean,
    markDirty,
    lastUsedColor,
    wireframeNodeId,
    setWireframeNodeId,
    undo,
    redo,
    past,
    future,
  } = useCanvasStore() as any;

  const wireframeNode = nodes.find((n: SitemapNode) => n.id === wireframeNodeId);

  const layoutRef = useRef<((dir?: LayoutDirection) => void) | null>(null);
  const exportRef = useRef<(() => Promise<void>) | null>(null);
  const handleAutoLayout = (direction: LayoutDirection) => layoutRef.current?.(direction);
  const handleExport = () => exportRef.current?.();

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) router.replace('/auth');
  }, [user, authLoading, router]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.key === 'z' && e.shiftKey) || e.key === 'y') { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  // Load project from Supabase on mount (waits for auth)
  useEffect(() => {
    if (!user) return;
    setProjectId(projectId);
    let cancelled = false;

    setIsLoading(true);
    (async () => {
      const [saved, list] = await Promise.all([
        loadProject(projectId),
        getProjectList(),
      ]);
      if (cancelled) return;
      const nodes = saved?.nodes ?? [];
      const edges = saved?.edges ?? [];
      setNodes(nodes);
      setEdges(edges);
      const meta = list.find((p) => p.id === projectId);
      if (meta?.title) setProjectTitle(meta.title);
      // New project — no row in `projects` table yet; create it now so it
      // shows up on the home page even if the user navigates back immediately.
      if (!meta) {
        await saveProject(projectId, projectTitle, { nodes, edges });
      }
      markClean();
      setIsLoading(false);
    })();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, user?.id]);

  // Auto-save to Supabase whenever nodes/edges change
  useEffect(() => {
    if (!isDirty || isLoading) return;
    const timer = setTimeout(() => {
      saveProject(projectId, projectTitle, { nodes, edges })
        .then(() => markClean())
        .catch(() => { /* silently swallow save errors */ });
    }, 800);
    return () => clearTimeout(timer);
  }, [nodes, edges, isDirty, isLoading, projectId, projectTitle, markClean]);

  const handleTitleChange = (title: string) => {
    setProjectTitle(title);
    markDirty();
  };

  const handleAddNode = () => {
    const newNode: SitemapNode = {
      id: generateId(),
      project_id: projectId,
      parent_id: null,
      title: 'New Page',
      url_slug: '/new-page',
      description: null,
      icon: null,
      color: lastUsedColor ?? '#EE661D',
      status: 'draft',
      position_x: 100 + Math.random() * 300,
      position_y: 100 + Math.random() * 300,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addNode(newNode);
    setSelectedNode(newNode.id);
  };

  if (authLoading || !user || isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950">
      {wireframeNode && (
        <WireframeModal
          pageTitle={wireframeNode.title}
          blocks={wireframeNode.wireframe ?? []}
          onClose={() => setWireframeNodeId(null)}
          onSave={(blocks: any) => {
            updateNode(wireframeNodeId, { wireframe: blocks });
          }}
        />
      )}
      <Toolbar
        projectId={projectId}
        projectTitle={projectTitle}
        onTitleChange={handleTitleChange}
        onAutoLayout={handleAutoLayout}
        onExport={handleExport}
        onUndo={undo}
        onRedo={redo}
        canUndo={past?.length > 0}
        canRedo={future?.length > 0}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar projectId={projectId} onAddNode={handleAddNode} />
        <div className="flex-1">
          <Canvas projectId={projectId} projectTitle={projectTitle} onNodeSelect={setSelectedNode} layoutRef={layoutRef} exportRef={exportRef} />
        </div>
        <PropertiesPanel projectId={projectId} />
      </div>
    </div>
  );
}
