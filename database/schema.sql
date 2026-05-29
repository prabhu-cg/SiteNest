-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID NOT NULL UNIQUE, -- References Supabase auth.users.id
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  avatar_url VARCHAR(500),
  theme CHAR(5) DEFAULT 'light', -- 'light' or 'dark'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_public BOOLEAN DEFAULT FALSE,
  public_token VARCHAR(32) UNIQUE
);

-- Sitemap Nodes Table
CREATE TABLE IF NOT EXISTS sitemap_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES sitemap_nodes(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL DEFAULT 'Untitled Page',
  url_slug VARCHAR(255),
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(7) DEFAULT '#EE661D',
  status VARCHAR(50) DEFAULT 'draft',
  position_x FLOAT DEFAULT 0,
  position_y FLOAT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Edges Table (connections between nodes)
CREATE TABLE IF NOT EXISTS edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  source_node_id UUID NOT NULL REFERENCES sitemap_nodes(id) ON DELETE CASCADE,
  target_node_id UUID NOT NULL REFERENCES sitemap_nodes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT edges_unique UNIQUE (source_node_id, target_node_id)
);

-- Indexes for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_public_token ON projects(public_token);
CREATE INDEX idx_sitemap_nodes_project_id ON sitemap_nodes(project_id);
CREATE INDEX idx_sitemap_nodes_parent_id ON sitemap_nodes(parent_id);
CREATE INDEX idx_edges_project_id ON edges(project_id);
CREATE INDEX idx_edges_source_node_id ON edges(source_node_id);
CREATE INDEX idx_edges_target_node_id ON edges(target_node_id);

-- Row Level Security Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE sitemap_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE edges ENABLE ROW LEVEL SECURITY;

-- Users RLS: Users can only read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth_id = auth.uid());

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth_id = auth.uid());

-- Projects RLS: Users can read own projects or public projects
CREATE POLICY "Users can read own projects" ON projects
  FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Anyone can read public projects" ON projects
  FOR SELECT USING (is_public = TRUE);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Sitemap Nodes RLS: Inherit from projects
CREATE POLICY "Users can read nodes in own projects" ON sitemap_nodes
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );

CREATE POLICY "Anyone can read nodes in public projects" ON sitemap_nodes
  FOR SELECT USING (
    project_id IN (SELECT id FROM projects WHERE is_public = TRUE)
  );

CREATE POLICY "Users can insert nodes in own projects" ON sitemap_nodes
  FOR INSERT WITH CHECK (
    project_id IN (
      SELECT id FROM projects WHERE user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );

CREATE POLICY "Users can update nodes in own projects" ON sitemap_nodes
  FOR UPDATE USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );

CREATE POLICY "Users can delete nodes in own projects" ON sitemap_nodes
  FOR DELETE USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );

-- Edges RLS: Inherit from projects
CREATE POLICY "Users can read edges in own projects" ON edges
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );

CREATE POLICY "Anyone can read edges in public projects" ON edges
  FOR SELECT USING (
    project_id IN (SELECT id FROM projects WHERE is_public = TRUE)
  );

CREATE POLICY "Users can insert edges in own projects" ON edges
  FOR INSERT WITH CHECK (
    project_id IN (
      SELECT id FROM projects WHERE user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );

CREATE POLICY "Users can update edges in own projects" ON edges
  FOR UPDATE USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );

CREATE POLICY "Users can delete edges in own projects" ON edges
  FOR DELETE USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );
