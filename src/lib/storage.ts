import { supabase } from '@/lib/supabase';
import type { SitemapNode, Edge } from '@/types';

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

async function getInternalUserId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', user.id)
    .single();

  if (data) return data.id;

  // Backfill: user row missing (pre-trigger accounts)
  const { data: inserted } = await supabase
    .from('users')
    .insert({ auth_id: user.id, email: user.email ?? '' })
    .select('id')
    .single();

  return inserted?.id ?? null;
}

export async function getProjectList(): Promise<ProjectMeta[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, updated_at, created_at, sitemap_nodes(id)')
    .order('updated_at', { ascending: false });

  if (error || !data) return [];

  return data.map((p: any) => ({
    id: p.id,
    title: p.title,
    nodeCount: p.sitemap_nodes?.length ?? 0,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  }));
}

export async function loadProject(id: string): Promise<ProjectData | null> {
  const [{ data: nodesData, error: nodesErr }, { data: edgesData, error: edgesErr }] =
    await Promise.all([
      supabase.from('sitemap_nodes').select('*').eq('project_id', id),
      supabase.from('edges').select('*').eq('project_id', id),
    ]);

  if (nodesErr || edgesErr) return null;

  return {
    nodes: (nodesData ?? []) as SitemapNode[],
    edges: (edgesData ?? []) as Edge[],
  };
}

export async function saveProject(id: string, title: string, data: ProjectData): Promise<void> {
  const userId = await getInternalUserId();
  if (!userId) return;

  await supabase
    .from('projects')
    .upsert({ id, user_id: userId, title, updated_at: new Date().toISOString() }, { onConflict: 'id' });

  const { nodes, edges } = data;
  const now = new Date().toISOString();

  if (nodes.length > 0) {
    await supabase
      .from('sitemap_nodes')
      .upsert(
        nodes.map((n) => ({ ...n, project_id: id, updated_at: now })),
        { onConflict: 'id' }
      );
    await supabase
      .from('sitemap_nodes')
      .delete()
      .eq('project_id', id)
      .not('id', 'in', `(${nodes.map((n) => n.id).join(',')})`);
  } else {
    await supabase.from('sitemap_nodes').delete().eq('project_id', id);
  }

  if (edges.length > 0) {
    await supabase
      .from('edges')
      .upsert(
        edges.map((e) => ({ ...e, project_id: id })),
        { onConflict: 'id' }
      );
    await supabase
      .from('edges')
      .delete()
      .eq('project_id', id)
      .not('id', 'in', `(${edges.map((e) => e.id).join(',')})`);
  } else {
    await supabase.from('edges').delete().eq('project_id', id);
  }
}

export async function deleteProject(id: string): Promise<void> {
  await supabase.from('projects').delete().eq('id', id);
}
