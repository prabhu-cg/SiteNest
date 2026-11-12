'use client';

import Link from 'next/link';
import {
  LayoutGrid,
  GitBranch,
  PenSquare,
  Activity,
  Play,
  Download,
  ArrowRight,
  Check,
  ChevronDown,
} from 'lucide-react';
import { LogoMark } from '@/components/ui/logo-mark';
import { MacbookFrame } from '@/components/marketing/MacbookFrame';
import { AboutButton } from '@/components/ui/about-modal';
import { LegalModalButton } from '@/components/ui/legal-modal';
import { SAMPLE_PROJECT_ID, SAMPLE_PROJECT_TITLE, SAMPLE_PAGE_COUNT } from '@/lib/sampleProject';

const LAST_UPDATED = 'July 2026';

const TERMS_SECTIONS = [
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

const PRIVACY_SECTIONS = [
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

// A slice of the built-in sample project (src/lib/sampleProject.ts), shown as a mini sitemap
const MINI_SITEMAP = [
  { title: 'Home', slug: '/', depth: 0, color: '#e8b923' },
  { title: 'Shop', slug: '/shop', depth: 1, color: '#e8b923' },
  { title: 'Coffee Beans', slug: '/shop/beans', depth: 2, color: '#e8b923' },
  { title: 'Brewing Gear', slug: '/shop/gear', depth: 2, color: '#e8b923' },
  { title: 'Journal', slug: '/journal', depth: 1, color: '#3B82F6' },
  { title: 'Our Story', slug: '/about', depth: 1, color: '#0D9488' },
];

const STATS = [
  { value: '∞', label: 'Infinite canvas' },
  { value: '55+', label: 'Wireframe blocks' },
  { value: 'PNG', label: 'One-click export' },
  { value: 'Free', label: 'To get started' },
];

const FEATURES = [
  {
    icon: LayoutGrid,
    title: 'Infinite canvas',
    description: 'Drag pages anywhere, zoom out for the big picture, or zoom in to work on one section of the site.',
  },
  {
    icon: GitBranch,
    title: 'Link blocks to pages',
    description: 'Drag from any block, like a CTA or a card, to the page it opens. Navigation is drawn right on the canvas.',
  },
  {
    icon: PenSquare,
    title: 'Wireframe blocks',
    description: 'Drop in 55+ pre-built blocks — heroes, forms, footers — to sketch a page layout in seconds.',
  },
  {
    icon: Activity,
    title: 'Flow analysis',
    description: 'Find orphan pages, dead ends and pages buried too many clicks deep, with a plain-English reason for each.',
  },
  {
    icon: Play,
    title: 'Click-through preview',
    description: 'Present your sitemap and click through it like a visitor. Share a read-only link, no account needed to view.',
  },
  {
    icon: Download,
    title: 'Export a PNG',
    description: 'Download your sitemap or any page wireframe as a PNG for a deck or a handoff.',
  },
];

const STEPS = [
  { step: '01', title: 'Create a project', description: 'Start with a blank canvas — no templates to fight with.' },
  { step: '02', title: 'Add your pages', description: 'Drop nodes onto the canvas for every page in your site.' },
  { step: '03', title: 'Wireframe & link', description: 'Sketch layouts with blocks, then link blocks to the pages they open.' },
  { step: '04', title: 'Test & share', description: 'Check the flow, click through it, and send a read-only link.' },
];

const REASONS = [
  'No more static screenshots that go stale the moment scope changes',
  'One canvas for structure and wireframes — not two disconnected tools',
  'Click through the plan and share a read-only link whenever a stakeholder asks',
  'Built around how sitemaps actually get made, not a generic diagram tool',
];

const FAQS = [
  {
    question: 'Do I need to install anything?',
    answer: 'No. SiteNest runs entirely in your browser — sign up and start building right away.',
  },
  {
    question: 'Can I export my sitemap?',
    answer: 'Yes. Export your sitemap or any page wireframe as a PNG for decks and docs. You can also share a read-only click-through link.',
  },
  {
    question: 'Is my project data private?',
    answer: 'Yes. Every project is stored with row-level security enabled, so only your account can access it.',
  },
  {
    question: 'Does SiteNest work on mobile?',
    answer: 'Not yet. SiteNest is built for larger screens — open it on a laptop or desktop for the full experience.',
  },
  {
    question: 'Do I need a credit card to sign up?',
    answer: 'No. SiteNest is free to start, no credit card required.',
  },
  {
    question: 'Can my team collaborate on a project together?',
    answer: 'Real-time collaboration is planned for a future release. For now, each project belongs to a single account.',
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-ink-secondary">
      <span aria-hidden className="h-2 w-2 rounded-full bg-primary" />
      {children}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background/90 backdrop-blur sticky top-0 z-20 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark size={28} />
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-foreground">Site<span className="text-primary-text">Nest</span></span>
              <span className="mt-0.5 text-[11px] font-semibold text-muted-foreground">Visual sitemap builder</span>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/auth"
              className="px-2 sm:px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Sign in
            </Link>
            <Link
              href="/auth?mode=signup"
              className="px-3 sm:px-5 h-10 inline-flex items-center text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary-hover rounded-full transition-[background-color,transform] active:scale-[0.98] whitespace-nowrap"
            >
              <span className="sm:hidden">Get started</span>
              <span className="hidden sm:inline">Get started free</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero + stats band */}
      <div className="bg-surface">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <Eyebrow>Visual sitemap builder</Eyebrow>
          <h1 className="mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl text-foreground leading-[1.05]">
            Plan your site.<br /><em className="italic">Visually.</em> Ship with confidence.
          </h1>
          <p className="mt-6 text-lg text-ink-secondary max-w-2xl mx-auto leading-relaxed">
            SiteNest turns a blank page into a clear plan. Drag pages onto an infinite canvas, connect them,
            sketch wireframes, and export a sitemap your whole team can follow.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/auth?mode=signup"
              className="inline-flex items-center gap-2 px-7 h-[52px] text-base font-semibold text-primary-foreground bg-primary hover:bg-primary-hover rounded-full transition-[background-color,transform] active:scale-[0.98]"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 px-7 h-[52px] text-base font-semibold text-foreground bg-card border border-border-strong hover:bg-surface rounded-full transition-[background-color,transform] active:scale-[0.98]"
            >
              Sign in
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Free to start · No credit card needed</p>
        </section>

        {/* Stats */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="text-center bg-card border border-border rounded-card py-6 px-3"
              >
                <p className="font-display text-3xl text-foreground tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Screenshot */}
      <section className="bg-background max-w-5xl mx-auto px-6 pt-20 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl text-foreground">A peek at the canvas</h2>
          <p className="mt-3 text-muted-foreground">Link blocks to pages, then check the flow. Sample project shown.</p>
        </div>
        <MacbookFrame
          src="/marketing/editor-screenshot.png"
          alt="SiteNest editor: a sitemap canvas with pages, dashed block-to-page links and the Navigation Flow panel flagging an unreachable page"
        />
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-foreground">What SiteNest does</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Everything you need to plan a site structure, from first idea to final export.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-card p-8 hover:border-primary hover:shadow-raised transition-[border-color,box-shadow] duration-200"
            >
              <div className="w-10 h-10 bg-primary-soft border border-border rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary-text" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-foreground">How it works</h2>
            <p className="mt-3 text-muted-foreground">From blank canvas to shareable plan in four steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ step, title, description }) => (
              <div key={step}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium tabular-nums text-ink-secondary"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />{step}</span>
                <h3 className="text-xl font-semibold text-foreground mt-4 mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-5">
              Why not just use a slide deck?
            </h2>
            <ul className="space-y-3">
              {REASONS.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary-soft border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary-text" />
                  </span>
                  <span className="text-sm text-ink-secondary leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-card p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{SAMPLE_PROJECT_TITLE}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Sample project · {SAMPLE_PAGE_COUNT} pages</p>
              </div>
              <Link
                href={`/editor/${SAMPLE_PROJECT_ID}`}
                className="inline-flex items-center gap-1.5 shrink-0 text-sm font-semibold text-primary-text hover:underline underline-offset-4"
              >
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <ul className="space-y-2" aria-label="Sample sitemap">
              {MINI_SITEMAP.map(({ title, slug, depth, color }) => (
                <li
                  key={slug}
                  style={{ marginLeft: depth * 24 }}
                  className={`flex items-center gap-3 rounded-xl border px-3.5 py-2 ${depth === 0 ? 'bg-primary-soft border-primary' : 'bg-surface border-border'}`}
                >
                  <span aria-hidden className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-sm font-medium text-foreground truncate">{title}</span>
                  <span className="ml-auto text-xs text-muted-foreground tabular-nums truncate">{slug}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface border-y border-border py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl text-foreground">Frequently asked questions</h2>
            <p className="mt-3 text-muted-foreground">Everything else you might be wondering about.</p>
          </div>
          <div className="divide-y divide-border rounded-card border border-border bg-card overflow-hidden">
            {FAQS.map(({ question, answer }) => (
              <details key={question} className="group">
                <summary className="flex w-full items-center justify-between gap-4 p-5 text-left cursor-pointer list-none font-medium text-sm text-foreground">
                  {question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 -mt-1 text-sm text-muted-foreground leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-background py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl text-foreground">Ready to plan your next site?</h2>
          <p className="mt-4 text-lg text-ink-secondary">Free to start. No credit card needed.</p>
          <Link
            href="/auth?mode=signup"
            className="mt-8 inline-flex items-center gap-2 px-8 h-[52px] text-base font-semibold text-primary-foreground bg-primary hover:bg-primary-hover rounded-full transition-[background-color,transform] active:scale-[0.98]"
          >
            Get started free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 px-6 py-12 sm:flex-row sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark size={28} />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight text-foreground">Site<span className="text-primary-text">Nest</span></span>
              <span className="mt-0.5 text-[10px] font-semibold text-muted-foreground">Visual sitemap builder</span>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SiteNest. Visual sitemap builder.</p>
          <div className="flex items-center gap-5">
            <AboutButton variant="plain" />
            <LegalModalButton label="Privacy" title="Privacy Policy" updated={LAST_UPDATED} sections={PRIVACY_SECTIONS} />
            <LegalModalButton label="Terms" title="Terms of Service" updated={LAST_UPDATED} sections={TERMS_SECTIONS} />
          </div>
        </div>
      </footer>
    </div>
  );
}
