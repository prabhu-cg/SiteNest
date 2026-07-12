'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutGrid,
  GitBranch,
  PenSquare,
  SlidersHorizontal,
  Download,
  Moon,
  ArrowRight,
  Check,
} from 'lucide-react';
import { LogoMark } from '@/components/ui/logo-mark';
import { AboutButton } from '@/components/ui/about-modal';
import { LegalModalButton } from '@/components/ui/legal-modal';

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

const STATS = [
  { value: '∞', label: 'Infinite canvas' },
  { value: '19+', label: 'Wireframe blocks' },
  { value: '2', label: 'Export formats' },
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
    title: 'Smart connections',
    description: 'Link pages together to map navigation, user flows, and how visitors move through your site.',
  },
  {
    icon: PenSquare,
    title: 'Wireframe blocks',
    description: 'Drop in 19+ pre-built blocks — heroes, forms, footers — to sketch a page layout in seconds.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Properties panel',
    description: 'Edit titles, URLs, notes, and colors for every page from one place, without leaving the canvas.',
  },
  {
    icon: Download,
    title: 'Export anywhere',
    description: 'Download your sitemap as a PNG for a deck or a JSON file to hand off to your team.',
  },
  {
    icon: Moon,
    title: 'Light & dark mode',
    description: 'A polished theme that adapts to how you like to work, and remembers your preference.',
  },
];

const STEPS = [
  { step: '01', title: 'Create a project', description: 'Start with a blank canvas — no templates to fight with.' },
  { step: '02', title: 'Add your pages', description: 'Drop nodes onto the canvas for every page in your site.' },
  { step: '03', title: 'Connect & wireframe', description: 'Link pages together and sketch layouts with wireframe blocks.' },
  { step: '04', title: 'Export & share', description: 'Ship a PNG or JSON export your whole team can follow.' },
];

const REASONS = [
  'No more static screenshots that go stale the moment scope changes',
  'One canvas for structure and wireframes — not two disconnected tools',
  'Instant PNG or JSON export whenever a stakeholder asks for the plan',
  'Built around how sitemaps actually get made, not a generic diagram tool',
];

const FAQS = [
  {
    question: 'Do I need to install anything?',
    answer: 'No. SiteNest runs entirely in your browser — sign up and start building right away.',
  },
  {
    question: 'Can I export my sitemap?',
    answer: 'Yes. Export a PNG for decks and docs, or a JSON file if you want to reuse the data elsewhere.',
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFAEF] to-white dark:from-gray-950 dark:to-gray-900">
      {/* Nav */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-20 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoMark size={28} />
            <span className="text-lg font-bold text-gray-900 dark:text-white">SiteNest</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/auth"
              className="px-2 sm:px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              Sign in
            </Link>
            <Link
              href="/auth?mode=signup"
              className="px-3 sm:px-4 py-1.5 text-sm font-semibold text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors whitespace-nowrap"
            >
              <span className="sm:hidden">Get started</span>
              <span className="hidden sm:inline">Get started free</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-6">
          Visual sitemap builder
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
          Plan your site.<br />Visually. Ship with confidence.
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          SiteNest turns a blank page into a clear plan. Drag pages onto an infinite canvas, connect them,
          sketch wireframes, and export a sitemap your whole team can follow.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/auth?mode=signup"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors shadow-sm"
          >
            Get started free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-accent hover:text-accent rounded-lg transition-colors"
          >
            Sign in
          </Link>
        </div>
        <p className="mt-4 text-xs text-gray-400">Free to start · No credit card needed</p>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl py-6 px-3"
            >
              <p className="text-2xl font-extrabold text-accent">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshot */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">A peek at the canvas</h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">This is what building a sitemap in SiteNest actually looks like.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <Image
            src="/marketing/editor-screenshot.png"
            alt="SiteNest editor showing a sitemap canvas with connected pages"
            width={1600}
            height={680}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What SiteNest does</h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Everything you need to plan a site structure, from first idea to final export.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-accent/40 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How it works</h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">From blank canvas to shareable plan in four steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ step, title, description }) => (
              <div key={step}>
                <span className="text-3xl font-extrabold text-accent/20">{step}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white mt-2 mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why not just use a slide deck?
            </h2>
            <ul className="space-y-3">
              {REASONS.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent" />
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Homepage sitemap</span>
              <span className="w-2 h-2 rounded-full bg-accent" />
            </div>
            <div className="space-y-3">
              <div className="h-9 w-2/3 rounded-lg bg-accent/10 border border-accent/30" />
              <div className="pl-6 flex flex-col gap-2">
                <div className="h-7 w-1/2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                <div className="h-7 w-2/5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                <div className="h-7 w-1/2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently asked questions</h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">Everything else you might be wondering about.</p>
        </div>
        <div className="space-y-3">
          {FAQS.map(({ question, answer }) => (
            <details
              key={question}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-5 py-4 open:shadow-sm"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-sm text-gray-900 dark:text-white">
                {question}
                <span className="ml-4 text-gray-400 transition-transform group-open:rotate-45 text-lg leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to plan your next site?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Free to start. No credit card needed.</p>
        <Link
          href="/auth?mode=signup"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors shadow-sm"
        >
          Get started free
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 px-6 py-12 sm:flex-row sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark size={20} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">SiteNest</span>
          </Link>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} SiteNest. Plan your site, visually.</p>
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
