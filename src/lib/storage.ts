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

export async function renameProject(id: string, title: string): Promise<void> {
  await supabase
    .from('projects')
    .update({ title, updated_at: new Date().toISOString() })
    .eq('id', id);
}

export interface UserProfile {
  id: string;
  name: string | null;
  avatar_url: string | null;
}

export async function getProfile(): Promise<UserProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from('users')
    .select('id, name, avatar_url')
    .eq('auth_id', user.id)
    .single();
  return data ?? null;
}

export async function updateProfile(updates: { name?: string; avatar_url?: string | null }): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const { error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('auth_id', user.id);
  if (error) throw new Error(error.message);
}

// ─── Shareable present links ────────────────────────────────────────────────

export interface ShareState {
  isPublic: boolean;
  token: string | null;
}

export interface SharedProject {
  title: string;
  nodes: SharedNode[];
  edges: Pick<Edge, 'source_node_id' | 'target_node_id'>[];
}

export type SharedNode = Pick<SitemapNode, 'id' | 'title' | 'url_slug' | 'wireframe'>;

function newShareToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function getShareState(projectId: string): Promise<ShareState | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('is_public, public_token')
    .eq('id', projectId)
    .single();
  if (error || !data) return null;
  return { isPublic: !!data.is_public, token: data.public_token ?? null };
}

/** Turns sharing on/off. Re-enabling keeps the existing link unless `resetToken` is set. */
export async function setSharing(
  projectId: string,
  enabled: boolean,
  { resetToken = false, currentToken = null }: { resetToken?: boolean; currentToken?: string | null } = {}
): Promise<ShareState | null> {
  const token = enabled ? (resetToken || !currentToken ? newShareToken() : currentToken) : currentToken;
  const { error } = await supabase
    .from('projects')
    .update({ is_public: enabled, public_token: token })
    .eq('id', projectId);
  if (error) return null;
  return { isPublic: enabled, token };
}

export async function loadSharedProject(token: string): Promise<SharedProject | null> {
  const { data, error } = await supabase.rpc('get_shared_project', { share_token: token });
  if (error || !data) return null;
  return data as SharedProject;
}
