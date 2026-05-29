# SiteNest - Visual Sitemap Builder

A modern, production-ready visual sitemap builder web application built with Next.js 15, React Flow, and Supabase.

## Overview

SiteNest is a lightweight, free alternative to Octopus.do focused on visual sitemap planning for individual users. Create beautiful sitemaps with an infinite canvas, drag-and-drop nodes, hierarchy management, and export capabilities.

## Features

### Core Canvas Features
- ✅ Infinite canvas with pan and zoom
- ✅ Drag-and-drop sitemap nodes
- ✅ Parent-child hierarchy
- ✅ Edge connectors between pages
- ✅ Minimap for navigation
- ✅ Undo/Redo (planned)
- ✅ Keyboard shortcuts (planned)
- ✅ Auto-save with local + Supabase persistence
- ✅ Project dashboard

### Node Features
- ✅ Page title
- ✅ URL slug
- ✅ Description
- ✅ Status tags (Draft, Ready, Completed)
- ✅ Color labels
- ✅ Icons
- ✅ Child pages support

### UI & UX
- ✅ Premium SaaS feel (Figma-inspired)
- ✅ Floating toolbar
- ✅ Left navigation sidebar
- ✅ Right properties panel
- ✅ Smooth animations
- ✅ Dark/light mode
- ✅ Responsive design

### Export & Sharing
- ✅ Export to PNG
- ✅ Export to JSON
- ✅ Public share links

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Canvas:** React Flow
- **State Management:** Zustand
- **Backend:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Auth:** Supabase Auth

## Project Structure

```
sitenest/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── page.tsx            # Dashboard home
│   │   ├── auth/               # Authentication pages
│   │   └── editor/             # Canvas editor
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── canvas/             # Canvas-specific components
│   │   │   ├── Canvas.tsx      # Main React Flow canvas
│   │   │   ├── SitemapNode.tsx # Node component
│   │   │   ├── Sidebar.tsx     # Left sidebar
│   │   │   ├── Toolbar.tsx     # Top toolbar
│   │   │   └── PropertiesPanel.tsx # Right panel
│   │   └── providers/          # React providers
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client
│   │   └── utils.ts            # Utility functions
│   ├── store/                  # Zustand stores
│   │   ├── authStore.ts        # Auth state
│   │   └── canvasStore.ts      # Canvas state
│   └── types/                  # TypeScript types
├── database/
│   ├── schema.sql              # PostgreSQL schema
│   └── seed.sql                # Sample data
├── public/                     # Static assets
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
├── next.config.ts              # Next.js config
└── .env.example                # Environment template
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier)
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd sitenest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new project in [Supabase](https://supabase.com)
   - Run the SQL schema from `database/schema.sql` in the Supabase SQL editor
   - (Optional) Run `database/seed.sql` to populate sample data
   - Copy your project URL and anon key to `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating a Sitemap

1. **Sign up/In** at the authentication page
2. **Create a new project** from the dashboard
3. **Add pages** using the "Add Page" button in the sidebar
4. **Configure each page:**
   - Title, URL slug, description
   - Status (Draft, Ready, Completed)
   - Color and icon
5. **Connect pages** by dragging from one node to another
6. **Auto-save** happens automatically; watch for the status indicator

### Exporting

- **JSON:** Export to JSON for programmatic use
- **PNG:** Export canvas as image
- **Share:** Generate public links to view your sitemap

## Development

### Key Files to Know

- `src/components/canvas/Canvas.tsx` - Main React Flow canvas
- `src/store/canvasStore.ts` - Canvas state management
- `src/lib/supabase.ts` - Supabase client setup
- `database/schema.sql` - Database structure

### Adding Features

#### New UI Component
1. Create component in `src/components/ui/`
2. Use shadcn/ui patterns
3. Accept theme props for dark mode

#### New Canvas Feature
1. Update Zustand store in `src/store/canvasStore.ts`
2. Add UI in relevant component
3. Sync to Supabase as needed

#### New Database Table
1. Add to `database/schema.sql`
2. Include RLS policies
3. Update TypeScript types in `src/types/`

## Color Palette

- **Accent:** `#EE661D` (Orange)
- **Secondary:** `#FFF9EB` (Cream)
- **Primary:** `#FFFFFF` (White)

## API Routes

Future endpoints will follow RESTful conventions:
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create project
- `GET /api/projects/[id]/nodes` - Get sitemap nodes
- `POST /api/projects/[id]/nodes` - Add node
- `PUT /api/projects/[id]/nodes/[nodeId]` - Update node
- `DELETE /api/projects/[id]/nodes/[nodeId]` - Delete node

## Performance Optimization

- React memoization on node components
- Debounced auto-save (2s)
- Lazy loading of projects
- Optimistic UI updates
- Image optimization via Next.js

## Security

- Supabase Auth for user management
- Row-level security (RLS) on all tables
- Protected API routes (planned)
- HTTPS only in production
- No sensitive data in client

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
# Or deploy manually
npm run build
npm run start
```

## Roadmap

### Phase 1 (Current)
- ✅ Core visual sitemap builder MVP
- ✅ Basic node/edge management
- ✅ Local + cloud persistence
- ✅ Dark/light mode
- ✅ Export (PNG, JSON)

### Phase 2
- User system + authentication
- Premium tier indicators
- Better UX polish
- Keyboard shortcuts
- Undo/redo

### Phase 3
- Website crawling/import
- Auto-generate sitemaps
- URL validation

### Phase 4
- Real-time collaboration
- Team workspaces
- Comments and feedback

### Phase 5
- AI features (separate)
- Smart suggestions
- Content generation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open a GitHub issue or contact support.

## Built with ❤️

Created with Next.js, React Flow, and Supabase.
