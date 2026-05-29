import dagre from 'dagre';
import type { SitemapNode, Edge } from '@/types';

export type LayoutDirection = 'TB' | 'LR' | 'Radial';

const NODE_WIDTH = 220;        // matches SitemapNode style={{ width: 220 }}
const BASE_HEIGHT = 82;        // accent bar + header (title + status row)
const DESC_HEIGHT = 26;        // added when description is non-empty
const BLOCK_SECTION_PAD = 4;   // border-t + bottom breathing room
const BLOCK_ROW_HEIGHT = 28;   // each block row (py-1.5 + text)

function nodeHeight(node: SitemapNode): number {
  let h = BASE_HEIGHT;
  if (node.description) h += DESC_HEIGHT;
  const blockCount = node.wireframe?.length ?? 0;
  if (blockCount > 0) h += BLOCK_SECTION_PAD + blockCount * BLOCK_ROW_HEIGHT;
  return h;
}

export function computeRadialLayout(
  nodes: SitemapNode[],
  edges: Edge[]
): Array<{ id: string; x: number; y: number }> {
  if (nodes.length === 0) return [];

  // Build children map and find roots (nodes with no incoming edges)
  const childrenMap = new Map<string, string[]>();
  const hasParent = new Set(edges.map((e) => e.target_node_id));
  nodes.forEach((n) => childrenMap.set(n.id, []));
  edges.forEach((e) => childrenMap.get(e.source_node_id)?.push(e.target_node_id));

  const roots = nodes.filter((n) => !hasParent.has(n.id));
  const startIds = roots.length > 0 ? roots.map((r) => r.id) : [nodes[0].id];

  // BFS to assign depth levels
  const depthMap = new Map<string, number>();
  const queue: string[] = [];
  startIds.forEach((id) => { depthMap.set(id, 0); queue.push(id); });

  while (queue.length > 0) {
    const id = queue.shift()!;
    const d = depthMap.get(id)!;
    (childrenMap.get(id) ?? []).forEach((child) => {
      if (!depthMap.has(child)) { depthMap.set(child, d + 1); queue.push(child); }
    });
  }

  // Any disconnected nodes get placed on an outer ring
  const maxDepth = Math.max(0, ...Array.from(depthMap.values()));
  nodes.forEach((n) => { if (!depthMap.has(n.id)) depthMap.set(n.id, maxDepth + 1); });

  // Group by depth level
  const levels = new Map<number, string[]>();
  depthMap.forEach((d, id) => {
    if (!levels.has(d)) levels.set(d, []);
    levels.get(d)!.push(id);
  });

  const RING_GAP = 300; // px between concentric rings
  const positions = new Map<string, { x: number; y: number }>();

  levels.forEach((ids, level) => {
    if (level === 0) {
      ids.forEach((id) => positions.set(id, { x: 0, y: 0 }));
    } else {
      const radius = level * RING_GAP;
      ids.forEach((id, i) => {
        const angle = (2 * Math.PI * i) / ids.length - Math.PI / 2;
        positions.set(id, {
          x: Math.round(radius * Math.cos(angle)),
          y: Math.round(radius * Math.sin(angle)),
        });
      });
    }
  });

  return nodes.map((node) => {
    const pos = positions.get(node.id) ?? { x: 0, y: 0 };
    const h = nodeHeight(node);
    return { id: node.id, x: pos.x - NODE_WIDTH / 2, y: pos.y - h / 2 };
  });
}

export function computeHierarchicalLayout(
  nodes: SitemapNode[],
  edges: Edge[],
  direction: LayoutDirection = 'TB'
): Array<{ id: string; x: number; y: number }> {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: direction,
    ranksep: 60,
    nodesep: 40,
    marginx: 60,
    marginy: 60,
  });

  nodes.forEach((node) => {
    const h = nodeHeight(node);
    g.setNode(node.id, { width: NODE_WIDTH, height: h });
  });
  edges.forEach((edge) => g.setEdge(edge.source_node_id, edge.target_node_id));

  dagre.layout(g);

  return nodes.map((node) => {
    const pos = g.node(node.id);
    const h = nodeHeight(node);
    return {
      id: node.id,
      x: pos.x - NODE_WIDTH / 2,
      y: pos.y - h / 2,
    };
  });
}
