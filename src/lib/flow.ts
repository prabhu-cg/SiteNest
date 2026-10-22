import type { SitemapNode, WireframeBlockType } from '@/types';

export const MAX_CLICK_DEPTH = 3;

const FOOTER_BLOCKS = new Set<WireframeBlockType>(['footer-simple', 'footer-multicolumn']);

export type FindingKind = 'unreachable' | 'dead-end' | 'too-deep' | 'footer-only' | 'hierarchy-gap';
export type FindingSeverity = 'high' | 'medium' | 'low';

export interface FlowFinding {
  kind: FindingKind;
  severity: FindingSeverity;
  nodeId: string;
  detail: string;
}

export interface FlowAnalysis {
  homeId: string | null;
  linkCount: number;
  /** Fewest clicks from home, per reachable page */
  depth: Map<string, number>;
  findings: FlowFinding[];
}

interface Link {
  from: string;
  to: string;
  inFooter: boolean;
}

export function collectLinks(nodes: SitemapNode[]): Link[] {
  const ids = new Set(nodes.map((n) => n.id));
  const links: Link[] = [];
  for (const node of nodes) {
    for (const block of node.wireframe ?? []) {
      if (block.linkTo && block.linkTo !== node.id && ids.has(block.linkTo)) {
        links.push({ from: node.id, to: block.linkTo, inFooter: FOOTER_BLOCKS.has(block.type) });
      }
    }
  }
  return links;
}

/** Home = a page at "/" or named Home, else the first page with no parent, else the first page */
export function findHome(nodes: Pick<SitemapNode, 'id' | 'title' | 'url_slug'>[], hasParent: Set<string>): string | null {
  if (nodes.length === 0) return null;
  const byName = nodes.find((n) => n.url_slug === '/' || n.url_slug === '/home' || /^home(page)?$/i.test(n.title.trim()));
  return (byName ?? nodes.find((n) => !hasParent.has(n.id)) ?? nodes[0]).id;
}

export function analyzeFlow(nodes: SitemapNode[], structureEdges: { source_node_id: string; target_node_id: string }[]): FlowAnalysis {
  const hasParent = new Set(structureEdges.map((e) => e.target_node_id));
  const homeId = findHome(nodes, hasParent);
  const links = collectLinks(nodes);
  const title = new Map(nodes.map((n) => [n.id, n.title]));

  const outgoing = new Map<string, Link[]>();
  const incoming = new Map<string, Link[]>();
  nodes.forEach((n) => { outgoing.set(n.id, []); incoming.set(n.id, []); });
  links.forEach((l) => { outgoing.get(l.from)!.push(l); incoming.get(l.to)!.push(l); });

  // Breadth-first from home: fewest clicks to reach each page
  const depth = new Map<string, number>();
  if (homeId) {
    depth.set(homeId, 0);
    const queue = [homeId];
    while (queue.length > 0) {
      const id = queue.shift()!;
      for (const l of outgoing.get(id) ?? []) {
        if (!depth.has(l.to)) { depth.set(l.to, depth.get(id)! + 1); queue.push(l.to); }
      }
    }
  }

  const findings: FlowFinding[] = [];
  if (links.length === 0) return { homeId, linkCount: 0, depth, findings };

  for (const node of nodes) {
    if (node.id === homeId) continue;
    const inbound = incoming.get(node.id)!;
    const d = depth.get(node.id);

    if (d === undefined) {
      findings.push({
        kind: 'unreachable', severity: 'high', nodeId: node.id,
        detail: inbound.length === 0
          ? 'No block links here, so visitors can never reach this page.'
          : 'Only linked from pages that are themselves unreachable from Home.',
      });
      continue;
    }
    if (d > MAX_CLICK_DEPTH) {
      findings.push({ kind: 'too-deep', severity: 'medium', nodeId: node.id, detail: `${d} clicks from Home (aim for ${MAX_CLICK_DEPTH} or fewer).` });
    }
    if (inbound.length > 0 && inbound.every((l) => l.inFooter)) {
      findings.push({ kind: 'footer-only', severity: 'low', nodeId: node.id, detail: 'Only reachable through a footer link.' });
    }
  }

  for (const node of nodes) {
    if (depth.has(node.id) && (outgoing.get(node.id)!.length === 0)) {
      findings.push({ kind: 'dead-end', severity: 'medium', nodeId: node.id, detail: 'No block links out, so visitors have nowhere to go next.' });
    }
  }

  // Sitemap structure says "child of X" but X never links to it
  for (const e of structureEdges) {
    const linked = (outgoing.get(e.source_node_id) ?? []).some((l) => l.to === e.target_node_id);
    if (!linked && title.has(e.source_node_id) && title.has(e.target_node_id)) {
      findings.push({
        kind: 'hierarchy-gap', severity: 'low', nodeId: e.target_node_id,
        detail: `Child of "${title.get(e.source_node_id)}" in the sitemap, but that page has no block linking to it.`,
      });
    }
  }

  const rank = { high: 0, medium: 1, low: 2 };
  findings.sort((a, b) => rank[a.severity] - rank[b.severity]);
  return { homeId, linkCount: links.length, depth, findings };
}
