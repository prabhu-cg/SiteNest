import type { Metadata } from 'next';

// Shared links are private-by-obscurity: keep them out of search results
export const metadata: Metadata = {
  title: 'Shared sitemap — SiteNest',
  robots: { index: false, follow: false },
};

export default function PresentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
