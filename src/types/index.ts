// User types
export interface User {
  id: string;
  auth_id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  theme: 'light' | 'dark';
  created_at: string;
  updated_at: string;
}

// Project types
export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  public_token: string | null;
}

// Wireframe types
export type WireframeBlockType =
  // Navigation
  | 'navbar'
  | 'sidebar-nav'
  | 'breadcrumb'
  | 'tabs'
  | 'pagination'
  | 'stepper'
  | 'announcement-bar'
  // Hero
  | 'hero-split'
  | 'hero-centered'
  | 'hero-video'
  // Content
  | 'card-grid'
  | 'card-grid-2'
  | 'text-block'
  | 'image-text'
  | 'feature-list'
  | 'testimonial'
  | 'team-grid'
  | 'faq'
  | 'logo-bar'
  | 'timeline'
  | 'process-steps'
  | 'product-grid'
  | 'reviews'
  // Media
  | 'image-gallery'
  | 'image-full'
  | 'video-embed'
  | 'audio-player'
  // Forms
  | 'form'
  | 'newsletter'
  | 'contact-bar'
  | 'login-form'
  | 'checkout'
  // Layout
  | 'two-column'
  | 'three-column'
  | 'blog-layout'
  | 'rail-layout'
  | 'left-rail'
  | 'right-rail'
  | 'search-results'
  | 'profile-page'
  | 'error-404'
  | 'pricing'
  | 'product-detail'
  | 'empty-state'
  | 'divider'
  // Data
  | 'table'
  | 'stats'
  | 'chart-placeholder'
  | 'map-placeholder'
  | 'comparison-table'
  | 'kanban'
  | 'calendar'
  // Footer
  | 'footer-simple'
  | 'footer-multicolumn'
  | 'cta-banner';

export interface WireframeBlock {
  id: string;
  type: WireframeBlockType;
  /** Id of the page this block navigates to (e.g. a CTA linking to Pricing) */
  linkTo?: string | null;
}

// Sitemap Node types
export interface SitemapNode {
  id: string;
  project_id: string;
  parent_id: string | null;
  title: string;
  url_slug: string | null;
  description: string | null;
  icon: string | null;
  color: string;
  status: 'draft' | 'ready' | 'completed';
  position_x: number;
  position_y: number;
  wireframe?: WireframeBlock[];
  created_at: string;
  updated_at: string;
}

// Edge types (connections between nodes)
export interface Edge {
  id: string;
  project_id: string;
  source_node_id: string;
  target_node_id: string;
  created_at: string;
}

// React Flow node and edge types
export interface FlowNode {
  id: string;
  data: {
    label: string;
    title: string;
    description?: string;
    status: string;
    icon?: string;
  };
  position: { x: number; y: number };
  style?: {
    background: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    color?: string;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
}

// Canvas state
export interface CanvasState {
  projectId: string | null;
  nodes: SitemapNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;
}

// Store types
export interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

export interface CanvasStore {
  projectId: string | null;
  nodes: SitemapNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;
  setProjectId: (id: string) => void;
  setNodes: (nodes: SitemapNode[]) => void;
  addNode: (node: SitemapNode) => void;
  updateNode: (id: string, updates: Partial<SitemapNode>) => void;
  deleteNode: (id: string) => void;
  setEdges: (edges: Edge[]) => void;
  addEdge: (edge: Edge) => void;
  deleteEdge: (id: string) => void;
  setSelectedNode: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  markDirty: () => void;
  markClean: () => void;
}

export interface ExportOptions {
  format: 'png' | 'json';
  fileName?: string;
  includeDescription?: boolean;
}
