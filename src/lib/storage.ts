import type { SitemapNode, Edge } from '@/types';

const PROJECT_PREFIX = 'sitenest_project_';
const PROJECT_LIST_KEY = 'sitenest_projects';

export interface ProjectMeta {
  id: string;
  title: string;
  nodeCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ProjectData {
  nodes: SitemapNode[];
  edges: Edge[];
}

export function saveProject(id: string, title: string, data: ProjectData): void {
  try {
    localStorage.setItem(`${PROJECT_PREFIX}${id}`, JSON.stringify(data));
    const list = getProjectList();
    const existing = list.find((p) => p.id === id);
    const now = new Date().toISOString();
    if (existing) {
      existing.title = title;
      existing.nodeCount = data.nodes.length;
      existing.updatedAt = now;
    } else {
      list.push({ id, title, nodeCount: data.nodes.length, createdAt: now, updatedAt: now });
    }
    localStorage.setItem(PROJECT_LIST_KEY, JSON.stringify(list));
  } catch {
    // localStorage may be unavailable
  }
}

export function loadProject(id: string): ProjectData | null {
  try {
    const raw = localStorage.getItem(`${PROJECT_PREFIX}${id}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getProjectList(): ProjectMeta[] {
  try {
    const raw = localStorage.getItem(PROJECT_LIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteProject(id: string): void {
  try {
    localStorage.removeItem(`${PROJECT_PREFIX}${id}`);
    const list = getProjectList().filter((p) => p.id !== id);
    localStorage.setItem(PROJECT_LIST_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}
