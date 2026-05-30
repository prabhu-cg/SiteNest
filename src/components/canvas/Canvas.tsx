'use client';
import type React from 'react';

import { useCallback, useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ReactFlow, {
  Node,
  Edge,
  EdgeProps,
  EdgeTypes,
  Background,
  MiniMap,
  Connection,
  useNodesState,
  useEdgesState,
  useViewport,
  useReactFlow,
  useStore,
  useStoreApi,
  Panel,
  NodeTypes,
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Trash2, ZoomIn, ZoomOut, Scan, Lock, Unlock } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { computeHierarchicalLayout, computeRadialLayout, type LayoutDirection } from '@/lib/layout';
import { useCanvasStore } from '@/store/canvasStore';
import { generateId } from '@/lib/utils';
import SitemapNode from './SitemapNode';
import type { SitemapNode as SitemapNodeType, Edge as StoreEdge } from '@/types';

// ─── Custom edge ────────────────────────────────────────────────────────────

function CustomEdge({
  id,
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
  selected,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
    borderRadius: 10,
  });

  return (
    <>
      {/* Wide transparent hit zone — makes edges easy to click */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={18}
        className="react-flow__edge-interaction"
      />

      <BaseEdge
        path={edgePath}
        markerEnd={selected ? 'url(#sn-arrow-accent)' : 'url(#sn-arrow)'}
        style={{
          stroke: selected ? '#EE661D' : '#c0cad4',
          strokeWidth: selected ? 2.5 : 1.5,
          filter: selected ? 'drop-shadow(0 0 3px rgba(238,102,29,0.35))' : undefined,
          transition: 'stroke 0.15s ease, stroke-width 0.15s ease, filter 0.15s ease',
        }}
      />

      {selected && (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan"
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
          >
            <button
              onClick={() => data?.onDelete?.(id)}
              className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 text-red-500 rounded-full px-2 py-1 shadow-md text-[11px] font-semibold hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

// ─── Internal helpers ────────────────────────────────────────────────────────

function LayoutController({
  layoutRef, storeNodes, storeEdges, updateNode,
}: {
  layoutRef: React.MutableRefObject<((dir?: LayoutDirection) => void) | null>;
  storeNodes: SitemapNodeType[];
  storeEdges: StoreEdge[];
  updateNode: (id: string, updates: Partial<SitemapNodeType>) => void;
}) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    layoutRef.current = (direction: LayoutDirection = 'TB') => {
      if (storeNodes.length === 0) return;
      const positions = direction === 'Radial'
        ? computeRadialLayout(storeNodes, storeEdges)
        : computeHierarchicalLayout(storeNodes, storeEdges, direction);
      // Update the store — the sync effect will propagate positions to React Flow
      positions.forEach(({ id, x, y }) => updateNode(id, { position_x: x, position_y: y }));
      // Wait for the sync effect + RF re-render before fitting view
      setTimeout(() => fitView({ padding: 0.3, maxZoom: 1 }), 100);
    };
  }, [storeNodes, storeEdges, updateNode, fitView, layoutRef]);

  return null;
}

function ExportController({
  exportRef, containerRef, title,
}: {
  exportRef: React.MutableRefObject<(() => Promise<void>) | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  title: string;
}) {
  const { getNodes, setViewport } = useReactFlow();

  useEffect(() => {
    exportRef.current = async () => {
      const container = containerRef.current;
      if (!container) return;

      const allNodes = getNodes();
      if (allNodes.length === 0) return;

      // Read actual DOM heights — node.height from getNodes() is often stale
      // for nodes whose height changed after wireframe blocks were added
      const nodeEls = container.querySelectorAll<HTMLElement>('.react-flow__node');
      const domHeights = new Map<string, number>();
      nodeEls.forEach((el) => {
        const id = el.getAttribute('data-id');
        if (id) domHeights.set(id, el.offsetHeight);
      });

      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      allNodes.forEach((node) => {
        const w = node.width ?? 220;
        const h = domHeights.get(node.id) ?? node.height ?? 300;
        minX = Math.min(minX, node.position.x);
        minY = Math.min(minY, node.position.y);
        maxX = Math.max(maxX, node.position.x + w);
        maxY = Math.max(maxY, node.position.y + h);
      });

      const PAD = 56;
      const contentW = maxX - minX + PAD * 2;
      const contentH = maxY - minY + PAD * 2;
      const cw = container.offsetWidth;
      const ch = container.offsetHeight;
      const zoom = Math.min(cw / contentW, ch / contentH, 1.5);
      const x = (cw - contentW * zoom) / 2 - (minX - PAD) * zoom;
      const y = (ch - contentH * zoom) / 2 - (minY - PAD) * zoom;

      setViewport({ x, y, zoom }, { duration: 0 });
      await new Promise((r) => setTimeout(r, 300));

      const canvas = await html2canvas(container, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        ignoreElements: (el) =>
          el.hasAttribute('data-export-ignore') ||
          el.classList.contains('react-flow__minimap') ||
          el.classList.contains('react-flow__attribution'),
      });

      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${(title || 'sitemap').toLowerCase().replace(/\s+/g, '-')}.png`;
      a.click();
    };
  }, [exportRef, containerRef, getNodes, setViewport, title]);

  return null;
}

function ZoomIndicator() {
  const { zoom } = useViewport();
  return (
    <div data-export-ignore className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1 shadow-sm">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
          {Math.round(zoom * 100)}%
        </span>
      </div>
    </div>
  );
}

// ─── Custom controls ─────────────────────────────────────────────────────────

const controlsSelector = (s: any) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
});

function CustomControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const store = useStoreApi();
  const { isInteractive, minZoomReached, maxZoomReached } = useStore(controlsSelector);

  const toggleInteractivity = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });
  };

  const btnClass = 'w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-orange-50/50 dark:hover:bg-orange-950/10 hover:border-accent/40 shadow-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <Panel position="bottom-left" className="flex flex-col gap-1 m-3" data-export-ignore>
      <Tooltip content="Zoom in" side="right">
        <button className={btnClass} onClick={() => zoomIn()} disabled={maxZoomReached} aria-label="zoom in">
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </Tooltip>
      <Tooltip content="Zoom out" side="right">
        <button className={btnClass} onClick={() => zoomOut()} disabled={minZoomReached} aria-label="zoom out">
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </Tooltip>
      <Tooltip content="Fit to view" side="right">
        <button className={btnClass} onClick={() => fitView({ padding: 0.3 })} aria-label="fit view">
          <Scan className="w-3.5 h-3.5" />
        </button>
      </Tooltip>
      <Tooltip content={isInteractive ? 'Lock canvas' : 'Unlock canvas'} side="right">
        <button className={btnClass} onClick={toggleInteractivity} aria-label="toggle interactivity">
          {isInteractive ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
        </button>
      </Tooltip>
    </Panel>
  );
}

// ─── Stable type maps ────────────────────────────────────────────────────────

const nodeTypes: NodeTypes = { sitemap: SitemapNode };
const edgeTypes: EdgeTypes = { custom: CustomEdge };

// ─── Canvas ──────────────────────────────────────────────────────────────────

interface CanvasProps {
  projectId: string;
  projectTitle?: string;
  onNodeSelect?: (nodeId: string) => void;
  layoutRef?: React.MutableRefObject<((dir?: LayoutDirection) => void) | null>;
  exportRef?: React.MutableRefObject<(() => Promise<void>) | null>;
}

export default function Canvas({ projectId, projectTitle = 'sitemap', onNodeSelect, layoutRef, exportRef }: CanvasProps) {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    selectedNodeId,
    addEdge: addEdgeToStore,
    deleteEdge: deleteEdgeFromStore,
    updateNode,
  } = useCanvasStore();

  const edgeUpdateSuccessful = useRef(false);
  const edgeUpdateStartPos = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  // Sync store → React Flow nodes. Store is the position source of truth;
  // drag positions are persisted to the store on onNodeDragStop so they stay in sync.
  useEffect(() => {
    setNodes(
      storeNodes.map((node) => ({
        id: node.id,
        data: {
          label: node.title,
          title: node.title,
          description: node.description,
          status: node.status,
          icon: node.icon,
          color: node.color,
          wireframe: node.wireframe,
        },
        position: { x: node.position_x ?? 100, y: node.position_y ?? 100 },
        type: 'sitemap',
        selected: node.id === selectedNodeId,
      } as Node))
    );
  }, [storeNodes, selectedNodeId, setNodes]);

  // Edge delete handler — owns both store delete and local selection clear
  const handleEdgeDelete = useCallback(
    (edgeId: string) => {
      deleteEdgeFromStore(edgeId);
      setSelectedEdgeId(null);
    },
    [deleteEdgeFromStore]
  );

  // Keyboard delete for selected edge
  useEffect(() => {
    if (!selectedEdgeId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Delete' && e.key !== 'Backspace') return;
      const t = e.target as HTMLElement;
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return;
      handleEdgeDelete(selectedEdgeId);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [selectedEdgeId, handleEdgeDelete]);

  // Sync store → React Flow edges; selected state owned by Canvas, not RF
  useEffect(() => {
    setEdges(
      storeEdges.map((edge) => ({
        id: edge.id,
        source: edge.source_node_id,
        target: edge.target_node_id,
        type: 'custom',
        selected: edge.id === selectedEdgeId,
        data: { onDelete: handleEdgeDelete },
      })) as Edge[]
    );
  }, [storeEdges, setEdges, selectedEdgeId, handleEdgeDelete]);

  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      updateNode(node.id, { position_x: node.position.x, position_y: node.position.y });
    },
    [updateNode]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      addEdgeToStore({
        id: generateId(),
        source_node_id: connection.source || '',
        target_node_id: connection.target || '',
        project_id: projectId,
        created_at: new Date().toISOString(),
      });
    },
    [projectId, addEdgeToStore]
  );

  const onEdgeUpdateStart = useCallback((event: React.MouseEvent) => {
    edgeUpdateSuccessful.current = false;
    edgeUpdateStartPos.current = { x: event.clientX, y: event.clientY };
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      deleteEdgeFromStore(oldEdge.id);
      addEdgeToStore({
        id: `${newConnection.source}-${newConnection.target}`,
        source_node_id: newConnection.source || '',
        target_node_id: newConnection.target || '',
        project_id: projectId,
        created_at: new Date().toISOString(),
      });
    },
    [projectId, deleteEdgeFromStore, addEdgeToStore]
  );

  const onEdgeUpdateEnd = useCallback(
    (event: MouseEvent | TouchEvent, edge: Edge | undefined) => {
      if (!edgeUpdateSuccessful.current && edge?.id) {
        const start = edgeUpdateStartPos.current;
        const ex = 'clientX' in event ? event.clientX : 0;
        const ey = 'clientY' in event ? event.clientY : 0;
        const dist = start ? Math.hypot(ex - start.x, ey - start.y) : 0;
        if (dist > 8) deleteEdgeFromStore(edge.id);
      }
      edgeUpdateSuccessful.current = false;
      edgeUpdateStartPos.current = null;
    },
    [deleteEdgeFromStore]
  );

  const handleEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdgeId(edge.id);
  }, []);

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      onNodeSelect?.(node.id);
      setSelectedEdgeId(null);
    },
    [onNodeSelect]
  );

  const handlePaneClick = useCallback(() => {
    onNodeSelect?.(null as any);
    setSelectedEdgeId(null);
  }, [onNodeSelect]);

  return (
    <div ref={containerRef} className="w-full h-full relative" style={{ background: '#f1f5f9' }}>
      {/* SVG arrow marker definitions — referenced by CustomEdge via url(#id) */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden>
        <defs>
          <marker id="sn-arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,1 L9,5 L0,9 Z" fill="#c0cad4" />
          </marker>
          <marker id="sn-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,1 L9,5 L0,9 Z" fill="#EE661D" />
          </marker>
        </defs>
      </svg>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        edgeUpdaterRadius={12}
        onEdgeClick={handleEdgeClick}
        onNodeClick={handleNodeClick}
        onNodeDragStop={onNodeDragStop}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={{ x: 40, y: 40, zoom: 1 }}
        minZoom={0.1}
        maxZoom={4}
        zoomOnScroll
        zoomOnPinch
        panOnScroll={false}
        defaultEdgeOptions={{ type: 'custom' }}
      >
        <Background color="#cbd5e1" gap={24} size={1} />
        <CustomControls />
        <MiniMap
          pannable
          nodeColor={(node) => node.data?.color ?? '#cbd5e1'}
          nodeStrokeColor="transparent"
          nodeStrokeWidth={0}
          nodeBorderRadius={4}
          maskColor="rgba(15,23,42,0.12)"
          style={{ backgroundColor: '#e8edf2', borderRadius: 8, border: '1px solid #d1d8df' }}
          nodeComponent={({ x, y, color }) => (
            <rect x={x} y={y} width={220} height={60} rx={4} fill={color as string} />
          )}
        />
        <ZoomIndicator />
        {layoutRef && (
          <LayoutController
            layoutRef={layoutRef}
            storeNodes={storeNodes}
            storeEdges={storeEdges}
            updateNode={updateNode}
          />
        )}
        {exportRef && (
          <ExportController
            exportRef={exportRef}
            containerRef={containerRef}
            title={projectTitle}
          />
        )}
      </ReactFlow>

      {storeNodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-8 text-center max-w-xs">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-accent text-xl">+</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-1">Your canvas is empty</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Click <span className="font-semibold text-accent">Add Page</span> in the sidebar to place your first node here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
