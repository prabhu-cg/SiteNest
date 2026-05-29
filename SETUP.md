# SiteNest Setup Guide

Complete setup instructions for getting SiteNest running locally and deployed.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- A Supabase account (free tier is fine)
- A Vercel account (for deployment)

## Local Development Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd sitenest
npm install
```

### 2. Supabase Setup

#### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Choose a database password and region
4. Wait for the database to initialize (~2 min)

#### Create Database Tables

1. Go to SQL Editor in Supabase dashboard
2. Create a new query
3. Copy and paste the contents of `database/schema.sql`
4. Click "Run"

The schema includes:
- Users table (linked to Supabase Auth)
- Projects table (with public sharing)
- Sitemap nodes table
- Edges table (connections)
- Row-level security policies

#### Get Your Credentials

1. Go to Settings → API
2. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Environment Variables

Create `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_NAME=SiteNest
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

You should see:
- Home page with "Create New Project" button
- Auth page for login (demo mode accepts any credentials)

## Supabase Configuration Details

### Authentication

Currently, the app uses a demo authentication mode. To enable real Supabase Auth:

1. In `src/app/auth/page.tsx`, implement:
```typescript
import { supabase } from '@/lib/supabase';

// In handleLogin:
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

2. In `src/app/page.tsx`, implement:
```typescript
useEffect(() => {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    // Load user from database
  }
}, []);
```

### Row-Level Security (RLS)

All tables have RLS enabled. Policies restrict:
- Users see only their own data
- Public projects are visible to everyone
- Only project owners can edit/delete

### Sample Data

To add sample data:

```bash
# In Supabase SQL Editor, run:
```

See `database/seed.sql` for structure.

## Project Configuration

### Tailwind CSS Colors

Custom colors defined in `tailwind.config.ts`:

```
Accent: #EE661D (Orange)
Secondary: #FFF9EB (Cream)
Primary: #FFFFFF (White)
```

Modify color palette by editing:
```typescript
// tailwind.config.ts
colors: {
  accent: { DEFAULT: "#EE661D", ... },
  secondary: { DEFAULT: "#FFF9EB", ... },
  ...
}
```

### TypeScript Paths

Path aliases configured in `tsconfig.json`:

```
@/* → src/*
```

### Next.js Configuration

- App Router enabled
- Strict mode on
- Image optimization disabled (unoptimized: true)
- TypeScript strict checking enabled

## Development Workflow

### Folder Structure Explanation

```
src/
├── app/                    # Pages & layouts
│   ├── layout.tsx          # Root theme/provider setup
│   ├── page.tsx            # Dashboard home
│   ├── auth/               # Auth pages
│   └── editor/[projectId]/ # Canvas editor
├── components/
│   ├── ui/                 # Base UI components (Button, Input, etc.)
│   ├── canvas/             # Canvas-specific components
│   └── providers/          # React context providers
├── lib/
│   ├── supabase.ts         # Supabase client (one instance for whole app)
│   └── utils.ts            # Helper functions, constants
├── store/                  # Zustand global state
├── types/                  # TypeScript interfaces
└── app/globals.css         # Global styles + React Flow customization
```

### Adding New Features

#### Add a New UI Component

1. Create in `src/components/ui/YourComponent.tsx`
2. Follow shadcn/ui patterns
3. Support dark mode with `dark:` classes
4. Export from component file

#### Add Canvas Features

1. Update `src/store/canvasStore.ts` (add state & actions)
2. Update component that uses it
3. Update `src/types/index.ts` if needed
4. Sync to Supabase via API (planned)

#### Add Database Tables

1. Update `database/schema.sql`
2. Add RLS policies
3. Update TypeScript types
4. Add Zustand store if needed
5. Rerun schema in Supabase SQL editor

## Testing Locally

### Test Authentication

1. Go to http://localhost:3000/auth
2. Enter any email/password (demo mode)
3. Should redirect to dashboard

### Test Canvas

1. Click "Create New Project"
2. You should see canvas editor with sidebar
3. Click "Add Page" to create nodes
4. Click nodes to edit properties on right panel
5. Drag nodes to move them
6. Drag from node handles to create edges

### Test Dark Mode

Click sun/moon icon in toolbar to toggle dark mode.

## Deployment

### Deploy to Vercel

1. Push code to GitHub

2. Go to [vercel.com](https://vercel.com)

3. Click "New Project" and select your repo

4. Configure environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

5. Click "Deploy"

6. Your app is live!

### Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Database has RLS enabled
- [ ] Supabase Auth configured (not demo mode)
- [ ] Backup Supabase database
- [ ] Test authentication flow
- [ ] Test canvas functionality
- [ ] Test exports (PNG, JSON)
- [ ] Monitor Supabase logs

## Troubleshooting

### "Supabase environment variables missing"

Check `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Restart dev server after adding variables.

### Canvas doesn't load

Check browser console for errors. Common issues:
- Missing Supabase credentials
- React Flow version mismatch
- No nodes in store

### Dark mode not working

Ensure:
1. `ThemeProvider` is in root layout
2. `next-themes` is installed
3. HTML element has `suppressHydrationWarning`

### Database errors

Check Supabase dashboard:
- SQL Editor: Verify schema is correct
- Auth: Users should be visible
- Data: Verify row-level security policies

## Next Steps

1. Implement real Supabase Auth
2. Create API routes for CRUD operations
3. Add auto-save with Supabase
4. Implement undo/redo
5. Add keyboard shortcuts
6. Create export functionality
7. Add project management features

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [React Flow Docs](https://reactflow.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Zustand](https://github.com/pmndrs/zustand)

## Support

For issues:
1. Check this guide
2. Check GitHub issues
3. Check Supabase/Vercel logs
4. Create a new issue with details
