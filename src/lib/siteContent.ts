// Copy for the About, Privacy and Terms pages

export const LAST_UPDATED = 'July 2026';

export const TERMS_SECTIONS = [
  {
    heading: 'Acceptance of terms',
    body: 'By creating an account or using SiteNest, you agree to these terms. SiteNest is currently a Phase 1 MVP, and features, pricing, and functionality may change as the product evolves.',
  },
  {
    heading: 'Your content',
    body: 'You own the projects, pages, and wireframes you create. We store them only to provide the service to you and do not use your content for any purpose beyond that.',
  },
  {
    heading: 'Acceptable use',
    body: 'Do not use SiteNest to store or share illegal content, attempt to disrupt the service, or access accounts that are not yours.',
  },
  {
    heading: 'No warranty',
    body: 'SiteNest is provided "as is" during its MVP phase without warranties of any kind. We aim for reliability but cannot guarantee uninterrupted access.',
  },
  {
    heading: 'Changes to these terms',
    body: 'We may update these terms as SiteNest develops. Continued use of the service after a change means you accept the updated terms.',
  },
];

export const PRIVACY_SECTIONS = [
  {
    heading: 'What we collect',
    body: 'Your email address, basic profile details (name, avatar), and the project data you create — pages, connections, and wireframes.',
  },
  {
    heading: 'How we use it',
    body: 'To authenticate you, save and sync your projects, and operate the core features of SiteNest. We do not use your data for advertising.',
  },
  {
    heading: 'Where it’s stored',
    body: 'Your data is stored in Supabase (PostgreSQL) with row-level security enabled, so only your account can access your projects.',
  },
  {
    heading: 'Third parties',
    body: 'We don’t sell your data. Supabase is used as our hosting and authentication infrastructure to run the service.',
  },
  {
    heading: 'Your choices',
    body: 'You can edit your profile, delete individual projects, or delete your account at any time from within the app.',
  },
];

export const TECH_STACK = [
  { label: 'Frontend', value: 'Next.js 15 (App Router)' },
  { label: 'UI library', value: 'React 19' },
  { label: 'Canvas', value: 'React Flow' },
  { label: 'State', value: 'Zustand' },
  { label: 'Styling', value: 'Tailwind CSS' },
  { label: 'Language', value: 'TypeScript' },
  { label: 'Backend', value: 'Supabase (Auth, Postgres)' },
  { label: 'Hosting', value: 'Vercel' },
];

export const WHAT_IT_DOES = [
  { term: 'Infinite canvas', description: 'drag pages anywhere, zoom out for the big picture, or zoom in to work on one section.' },
  { term: 'Smart connections', description: 'link pages together to map navigation and how visitors move through the site.' },
  { term: '19+ wireframe blocks', description: "heroes, forms, footers, and more to sketch a page layout in seconds." },
  { term: 'Properties panel', description: 'edit titles, URLs, notes, and colors for every page without leaving the canvas.' },
  { term: 'PNG & JSON export', description: 'for stakeholder reviews and handing work off to the rest of the team.' },
];
