-- Shareable read-only present links
-- Run once in the Supabase SQL Editor.

-- 1. Token-gated read. Returns only what Present mode needs (no user/project ids),
--    and only when the project is shared AND the token matches. Returns NULL otherwise.
CREATE OR REPLACE FUNCTION get_shared_project(share_token TEXT)
RETURNS JSON
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT json_build_object(
    'title', p.title,
    'nodes', COALESCE((
      SELECT json_agg(json_build_object(
        'id', n.id,
        'title', n.title,
        'url_slug', n.url_slug,
        'wireframe', n.wireframe
      ))
      FROM sitemap_nodes n WHERE n.project_id = p.id
    ), '[]'::json),
    'edges', COALESCE((
      SELECT json_agg(json_build_object(
        'source_node_id', e.source_node_id,
        'target_node_id', e.target_node_id
      ))
      FROM edges e WHERE e.project_id = p.id
    ), '[]'::json)
  )
  FROM projects p
  WHERE p.is_public = TRUE AND p.public_token = share_token;
$$;

GRANT EXECUTE ON FUNCTION get_shared_project(TEXT) TO anon, authenticated;

-- 2. Remove the blanket public-read policies from schema.sql.
--    They let anyone holding the (public) anon key list EVERY shared project and its token,
--    which would make the share token meaningless. The function above replaces them.
DROP POLICY IF EXISTS "Anyone can read public projects" ON projects;
DROP POLICY IF EXISTS "Anyone can read nodes in public projects" ON sitemap_nodes;
DROP POLICY IF EXISTS "Anyone can read edges in public projects" ON edges;
