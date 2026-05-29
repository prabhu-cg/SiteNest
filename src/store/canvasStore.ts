import { create } from 'zustand';
import type { CanvasStore, SitemapNode, Edge } from '@/types';

const POSITION_KEYS = new Set(['position_x', 'position_y', 'updated_at']);
const MAX_HISTORY = 50;

type Snapshot = { nodes: SitemapNode[]; edges: Edge[] };

type ExtendedStore = CanvasStore & {
  lastAction: string;
  lastUsedColor: string;
  setLastUsedColor: (c: string) => void;
  wireframeNodeId: string | null;
  setWireframeNodeId: (id: string | null) => void;
  past: Snapshot[];
  future: Snapshot[];
  undo: () => void;
  redo: () => void;
};

function pushHistory(past: Snapshot[], nodes: SitemapNode[], edges: Edge[]): Snapshot[] {
  const next = [...past, { nodes, edges }];
  return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
}

export const useCanvasStore = create<ExtendedStore>((set) => ({
  projectId: null,
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isLoading: false,
  error: null,
  isDirty: false,
  lastAction: '',
  lastUsedColor: '#EE661D',
  past: [],
  future: [],

  setLastUsedColor: (color) => set({ lastUsedColor: color }),
  setWireframeNodeId: (id) => set({ wireframeNodeId: id }),
  wireframeNodeId: null,

  setProjectId: (id) => set({ projectId: id }),

  // setNodes / setEdges (bulk load) — does NOT push history (initial load)
  setNodes: (nodes) => set({ nodes, isDirty: true }),
  setEdges: (edges) => set({ edges, isDirty: true }),

  addNode: (node) =>
    set((state) => ({
      past: pushHistory(state.past, state.nodes, state.edges),
      future: [],
      nodes: state.nodes.some((n) => n.id === node.id) ? state.nodes : [...state.nodes, node],
      isDirty: true,
      lastAction: 'Page added',
    })),

  updateNode: (id, updates) =>
    set((state) => {
      const isPositionOnly = Object.keys(updates).every((k) => POSITION_KEYS.has(k));
      let lastAction = state.lastAction;
      let past = state.past;
      let future = state.future;

      if (!isPositionOnly) {
        if (updates.title !== undefined) lastAction = 'Page renamed';
        else if (updates.status !== undefined) lastAction = 'Status updated';
        else if (updates.color !== undefined) lastAction = 'Color changed';
        else if (updates.description !== undefined) lastAction = 'Description updated';
        else if (updates.wireframe !== undefined) lastAction = 'Wireframe updated';
        else lastAction = 'Changes saved';
        past = pushHistory(state.past, state.nodes, state.edges);
        future = [];
      }

      return {
        past,
        future,
        nodes: state.nodes.map((node) => (node.id === id ? { ...node, ...updates } : node)),
        isDirty: true,
        lastAction,
        ...(updates.color ? { lastUsedColor: updates.color } : {}),
      };
    }),

  deleteNode: (id) =>
    set((state) => ({
      past: pushHistory(state.past, state.nodes, state.edges),
      future: [],
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter(
        (edge) => edge.source_node_id !== id && edge.target_node_id !== id
      ),
      isDirty: true,
      lastAction: 'Page deleted',
    })),

  addEdge: (edge) =>
    set((state) => ({
      past: pushHistory(state.past, state.nodes, state.edges),
      future: [],
      edges: [...state.edges, edge],
      isDirty: true,
      lastAction: 'Connection added',
    })),

  deleteEdge: (id) =>
    set((state) => ({
      past: pushHistory(state.past, state.nodes, state.edges),
      future: [],
      edges: state.edges.filter((edge) => edge.id !== id),
      isDirty: true,
      lastAction: 'Connection removed',
    })),

  undo: () =>
    set((state) => {
      if (state.past.length === 0) return {};
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        future: [{ nodes: state.nodes, edges: state.edges }, ...state.future],
        nodes: previous.nodes,
        edges: previous.edges,
        isDirty: true,
        lastAction: 'Undo',
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return {};
      const next = state.future[0];
      return {
        past: [...state.past, { nodes: state.nodes, edges: state.edges }],
        future: state.future.slice(1),
        nodes: next.nodes,
        edges: next.edges,
        isDirty: true,
        lastAction: 'Redo',
      };
    }),

  setSelectedNode: (id) => set({ selectedNodeId: id }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  markDirty: () => set({ isDirty: true }),
  markClean: () => set({ isDirty: false }),
}));
