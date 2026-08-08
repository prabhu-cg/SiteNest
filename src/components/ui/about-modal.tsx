'use client';

import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { LogoMark } from '@/components/ui/logo-mark';

const TECH_STACK = [
  { label: 'Frontend', value: 'Next.js 15 (App Router)' },
  { label: 'UI library', value: 'React 19' },
  { label: 'Canvas', value: 'React Flow' },
  { label: 'State', value: 'Zustand' },
  { label: 'Styling', value: 'Tailwind CSS' },
  { label: 'Language', value: 'TypeScript' },
  { label: 'Backend', value: 'Supabase (Auth, Postgres)' },
  { label: 'Hosting', value: 'Vercel' },
];

const WHAT_IT_DOES = [
  { term: 'Infinite canvas', description: 'drag pages anywhere, zoom out for the big picture, or zoom in to work on one section.' },
  { term: 'Smart connections', description: 'link pages together to map navigation and how visitors move through the site.' },
  { term: '19+ wireframe blocks', description: "heroes, forms, footers, and more to sketch a page layout in seconds." },
  { term: 'Properties panel', description: 'edit titles, URLs, notes, and colors for every page without leaving the canvas.' },
  { term: 'PNG & JSON export', description: 'for stakeholder reviews and handing work off to the rest of the team.' },
];

interface AboutButtonProps {
  variant?: 'icon' | 'text' | 'plain';
}

export function AboutButton({ variant = 'icon' }: AboutButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {variant === 'plain' ? (
        <button
          onClick={() => setOpen(true)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </button>
      ) : variant === 'text' ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          About
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

          <div
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-border w-full max-w-2xl mx-4 max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-muted-foreground flex-shrink-0 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header (fixed) */}
            <div className="flex items-start gap-4 p-6 sm:p-8 pb-6 border-b border-border flex-shrink-0">
              <LogoMark size={48} className="flex-shrink-0 shadow-md rounded-xl" />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-extrabold text-foreground leading-none">About SiteNest</h2>
                <p className="text-xs text-muted-foreground mt-1.5">Visual Sitemap Builder</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold">
                  v0.1.0 — Phase 1 MVP
                </span>
              </div>
            </div>

            {/* Content (scrolls) */}
            <div className="flex-1 overflow-y-auto thin-scroll p-6 sm:p-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <section>
                <h3 className="mb-1.5 text-sm font-bold text-foreground">Why SiteNest Exists</h3>
                <p>
                  Site structure usually lives in the worst possible place: a slide deck that goes stale the moment scope changes, a whiteboard photo nobody can find, or two disconnected tools — one for the sitemap, one for the wireframes. It gets built once for a kickoff, then forgotten until the next stakeholder review forces a rebuild from scratch.
                </p>
                <p className="mt-3">
                  SiteNest gives site planning the same rigor a shipped product deserves: an infinite canvas, connected pages, wireframe blocks, and an export that&apos;s always current. Every project stays live, so you can see, at a glance, how a site is organised and how visitors move through it.
                </p>
              </section>

              <section>
                <h3 className="mb-1.5 text-sm font-bold text-foreground">What It Does</h3>
                <ul className="list-disc space-y-1 pl-5">
                  {WHAT_IT_DOES.map(({ term, description }) => (
                    <li key={term}>
                      <span className="font-medium text-foreground">{term}</span> — {description}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-1.5 text-sm font-bold text-foreground">Tech Stack</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {TECH_STACK.map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground/70">{label}</p>
                      <p className="text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-1.5 text-sm font-bold text-foreground">Who Built This</h3>
                <p>
                  SiteNest is an independent side project by{' '}
                  <a href="mailto:prabhu_cg@proton.me" className="text-accent hover:underline">Prabhu Raja</a>, a product designer with 15+ years across enterprise and B2B software — currently VP of User Experience at BNY, previously at Thomson Reuters HighQ, Sweepr, and Marston Holdings. Day to day, that work centres on design systems, accessibility, and turning ambiguous, high-stakes workflows into clear, systemised outcomes.
                </p>
                <p className="mt-3">
                  SiteNest is a small, focused tool: plan a site&apos;s structure, sketch it, connect it, and export it when you need to walk stakeholders through the plan — the same discipline applied to site planning that shipped teams already apply to product specs.
                </p>
                <p className="mt-3">
                  Feedback, feature requests, or just want to say hello —{' '}
                  <a href="mailto:prabhu_cg@proton.me" className="text-accent hover:underline">prabhu_cg@proton.me</a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
