import dagre from 'dagre';
import type { SitemapNode, Edge } from '@/types';
import { collectLinks } from '@/lib/flow';

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


const SIBLING_GAP = 40; // matches dagre nodesep

/** Sources before targets among siblings; unlinked siblings keep their order, cycles fall back to it */
function orderByLinks(ids: string[], links: Array<[string, string]>): string[] {
  const inGroup = new Set(ids);
  const indegree = new Map(ids.map((id) => [id, 0]));
  const outgoing = new Map(ids.map((id) => [id, [] as string[]]));
  for (const [from, to] of links) {
    if (from === to || !inGroup.has(from) || !inGroup.has(to)) continue;
    outgoing.get(from)!.push(to);
    indegree.set(to, indegree.get(to)! + 1);
  }
  const remaining = [...ids];
  const ordered: string[] = [];
  while (remaining.length > 0) {
    const next = remaining.find((id) => indegree.get(id) === 0) ?? remaining[0];
    remaining.splice(remaining.indexOf(next), 1);
    ordered.push(next);
    outgoing.get(next)!.forEach((to) => indegree.set(to, indegree.get(to)! - 1));
  }
  return ordered;
}

/**
 * Re-orders siblings so block links read in one direction (source left of / above target),
 * which keeps the orthogonal link lines short and uncrossed. Each sibling's subtree moves with it.
 */
function alignSiblingsToLinks(
  nodes: SitemapNode[],
  edges: Edge[],
  centers: Map<string, { x: number; y: number }>,
  direction: LayoutDirection
) {
  const links = collectLinks(nodes).map((l): [string, string] => [l.from, l.to]);
  if (links.length === 0) return;

  const cross = direction === 'LR' ? 'y' : 'x';
  const rank = direction === 'LR' ? 'x' : 'y';
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const size = (id: string) => (direction === 'LR' ? nodeHeight(byId.get(id)!) : NODE_WIDTH);

  const parentOf = new Map<string, string>();
  const childrenOf = new Map<string, string[]>();
  edges.forEach((e) => {
    if (parentOf.has(e.target_node_id)) return;
    parentOf.set(e.target_node_id, e.source_node_id);
    childrenOf.set(e.source_node_id, [...(childrenOf.get(e.source_node_id) ?? []), e.target_node_id]);
  });

  const shiftSubtree = (id: string, delta: number, seen = new Set<string>()) => {
    if (seen.has(id)) return;
    seen.add(id);
    centers.get(id)![cross] += delta;
    (childrenOf.get(id) ?? []).forEach((child) => shiftSubtree(child, delta, seen));
  };

  const groups = new Map<string, string[]>();
  nodes.forEach((n) => {
    const key = `${parentOf.get(n.id) ?? ''}|${Math.round(centers.get(n.id)![rank])}`;
    groups.set(key, [...(groups.get(key) ?? []), n.id]);
  });

  // Top-down, so a parent's move is settled before its children are re-ordered
  const ordered = [...groups.values()].sort((a, b) => centers.get(a[0])![rank] - centers.get(b[0])![rank]);
  for (const group of ordered) {
    if (group.length < 2) continue;
    const current = [...group].sort((a, b) => centers.get(a)![cross] - centers.get(b)![cross]);
    const next = orderByLinks(current, links);
    if (next.every((id, i) => id === current[i])) continue;

    const slots = current.map((id) => centers.get(id)![cross]);
    const deltas = next.map((id, i) => slots[i] - centers.get(id)![cross]);
    next.forEach((id, i) => shiftSubtree(id, deltas[i]));

    // Unequal node sizes (left-to-right layout) can overlap after a swap — push apart in order
    let edge = -Infinity;
    next.forEach((id) => {
      const start = centers.get(id)![cross] - size(id) / 2;
      if (start < edge + SIBLING_GAP) shiftSubtree(id, edge + SIBLING_GAP - start);
      edge = centers.get(id)![cross] + size(id) / 2;
    });
  }

  // Reordering siblings can leave their parent off to one side: re-centre each over its children, bottom-up
  [...nodes]
    .sort((a, b) => centers.get(b.id)![rank] - centers.get(a.id)![rank])
    .forEach((n) => {
      const kids = childrenOf.get(n.id);
      if (!kids?.length) return;
      const at = kids.map((k) => centers.get(k)![cross]);
      centers.get(n.id)![cross] = (Math.min(...at) + Math.max(...at)) / 2;
    });
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

  const centers = new Map(nodes.map((n) => {
    const { x, y } = g.node(n.id);
    return [n.id, { x, y }] as const;
  }));
  alignSiblingsToLinks(nodes, edges, centers, direction);

  return nodes.map((node) => {
    const pos = centers.get(node.id)!;
    const h = nodeHeight(node);
    return {
      id: node.id,
      x: pos.x - NODE_WIDTH / 2,
      y: pos.y - h / 2,
    };
  });
}
