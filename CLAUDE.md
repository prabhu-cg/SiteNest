# SiteNest Development Guide for Claude Code

## Project Overview

**SiteNest** is a Phase 1 MVP visual sitemap builder with:
- React Flow canvas for infinite sitemap visualization
- Zustand for state management
- Supabase for auth & data persistence
- shadcn/ui + Tailwind for premium UI

**Brand Colors:**
- Accent: #EE661D (Orange)
- Secondary: #FFF9EB (Cream)
- Primary: #FFFFFF (White)

## Architecture

### State Management
- **Auth Store** (`src/store/authStore.ts`): User session state
- **Canvas Store** (`src/store/canvasStore.ts`): Project/nodes/edges state
- Both use Zustand for lightweight, type-safe updates

### Key Components
- **Canvas** (`src/components/canvas/Canvas.tsx`): React Flow container
- **SitemapNode** (`src/components/canvas/SitemapNode.tsx`): Node renderer
- **Sidebar** (`src/components/canvas/Sidebar.tsx`): Pages list
- **PropertiesPanel** (`src/components/canvas/PropertiesPanel.tsx`): Node editor
- **Toolbar** (`src/components/canvas/Toolbar.tsx`): Top actions

### Database
- Tables: `users`, `projects`, `sitemap_nodes`, `edges`
- All have RLS enabled for security
- Foreign keys for referential integrity

## Development Guidelines

### Code Style
- **Naming:** camelCase for functions/variables, PascalCase for components
- **Imports:** Group by: React, lib, components, utils, types
- **Comments:** Only for non-obvious logic; default to clear naming
- **No unnecessary abstractions:** 3 similar items is fine, reuse at 4+

### Component Patterns
```typescript
// Use 'use client' for interactive components
'use client';

interface Props {
  projectId: string;
  onSelect?: (id: string) => void;
}

export default function MyComponent({ projectId, onSelect }: Props) {
  // Component body
}
```

### Store Patterns
```typescript
// Zustand store patterns
const { nodes, addNode, updateNode } = useCanvasStore();

// Update store
updateNode(id, { title: 'New Title' });
```

### Supabase Patterns
```typescript
import { supabase } from '@/lib/supabase';

// Query example
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', userId);
```

## Common Tasks

### Adding a UI Component
1. Create in `src/components/ui/ComponentName.tsx`
2. Use shadcn/ui patterns (Radix UI primitives)
3. Support dark mode: `dark:bg-gray-950`
4. Export as default

### Modifying Canvas
1. Update React Flow nodes/edges in `Canvas.tsx`
2. Update store in `canvasStore.ts`
3. Sync to Supabase (planned)

### Adding Database Fields
1. Update schema in `database/schema.sql`
2. Update type in `src/types/index.ts`
3. Update store interface if needed
4. Update RLS policies if needed

### Styling
- **Tailwind first:** Use @apply only for repeated patterns
- **Colors:** Use `text-accent`, `bg-secondary` instead of hex
- **Dark mode:** Add `dark:` variants for all colors
- **Spacing:** Use Tailwind scale (4px base): `p-4`, `gap-2`, etc.

## Current Implementation Status

### ✅ Complete
- Project structure & config
- Database schema with RLS
- UI component library (Button, Input, Card, Label)
- Canvas component with React Flow
- Sitemap node component
- Sidebar with page list
- Properties panel for node editing
- Toolbar with theme toggle
- Home/auth/editor pages
- Zustand stores (auth, canvas)
- Color theming (Tailwind)

### 🔄 Planned (Phase 1 completion)
- Supabase integration for auth
- API routes for CRUD operations
- Auto-save implementation
- Undo/redo functionality
- Keyboard shortcuts
- Export to PNG (html2canvas)
- Export to JSON
- Public share links
- Responsive mobile layout
- Error handling & loading states

## File Locations Reference

| Feature | Files |
|---------|-------|
| Authentication | `src/app/auth/page.tsx`, `src/store/authStore.ts` |
| Canvas | `src/components/canvas/Canvas.tsx`, `src/store/canvasStore.ts` |
| Database | `database/schema.sql`, `src/lib/supabase.ts` |
| Types | `src/types/index.ts` |
| Config | `tailwind.config.ts`, `tsconfig.json`, `next.config.ts` |
| Styles | `src/app/globals.css`, `src/components/ui/*` |

## Important Notes

### Performance
- React Flow nodes memoized to prevent re-renders
- Store subscriptions are shallow (only affected components re-render)
- Debounce auto-save on node position changes

### Security
- RLS policies prevent cross-user data access
- Never expose private keys in client code
- Validate data on backend (not yet implemented)

### Compatibility
- React 19 with App Router (no class components)
- TypeScript strict mode enabled
- No legacy browser support needed

## Quick Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run lint             # Run linter
npm run db:push          # Sync schema to Supabase (if using Prisma)
npm run db:seed          # Add sample data
```

## When You Need to...

### Add a new page
1. Create in `src/app/new-page/page.tsx`
2. Add to metadata in `layout.tsx` if needed
3. Use `useRouter` for navigation

### Add a Supabase table
1. Modify `database/schema.sql`
2. Add RLS policies
3. Rerun schema in Supabase SQL Editor
4. Add TypeScript type in `src/types/index.ts`

### Handle async operations
1. Use `async/await` in event handlers
2. Update store with `useCanvasStore()` for state
3. Add error handling and loading states

### Support dark mode
1. Always add `dark:` variants to Tailwind classes
2. Use `useTheme()` from `next-themes` if needed
3. Test both light and dark in browser

## Testing

No test suite yet, but QA checklist:
- [ ] Nodes render on canvas
- [ ] Can drag nodes to move them
- [ ] Can connect nodes with edges
- [ ] Properties panel updates reflect changes
- [ ] Sidebar shows all pages
- [ ] Dark/light mode toggles
- [ ] Theme persists on reload
- [ ] No console errors

## Future Phases

### Phase 2: User System
- Real Supabase Auth with email verification
- User profiles with avatar
- Password reset flow

### Phase 3: Imports
- Website crawling
- Auto-generate from robots.txt/sitemap.xml

### Phase 4: Collaboration
- Real-time with Supabase Realtime
- Team workspaces
- Comments and feedback

### Phase 5: AI
- Page title suggestions
- URL slug generation
- Content hints

## Questions?

Refer to:
- SETUP.md for environment setup
- README.md for feature overview
- Component files for implementation details
- Supabase docs for database questions
