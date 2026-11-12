import type { Metadata } from 'next';
import { MarketingNav, MarketingFooter } from '@/components/marketing/MarketingChrome';
import { TECH_STACK, WHAT_IT_DOES } from '@/lib/siteContent';

export const metadata: Metadata = {
  title: 'About | SiteNest',
  description: 'Why SiteNest exists, what it does, and who built it.',
};

export default function AboutPage() {
  return (
    <div className="marketing-page min-h-screen bg-background flex flex-col">
      <MarketingNav />
      <main className="flex-1">
        <header className="bg-surface border-b border-border">
          <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-ink-secondary">
              <span aria-hidden className="h-2 w-2 rounded-full bg-primary" />
              v0.1.0 · Phase 1 MVP
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl text-foreground leading-[1.05]">About SiteNest</h1>
            <p className="mt-5 text-lg text-ink-secondary max-w-2xl leading-relaxed">
              A visual sitemap builder: plan pages on an infinite canvas, link blocks to pages, then test the flow.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 py-16 space-y-14">
          <section>
            <h2 className="text-3xl sm:text-4xl text-foreground">Why SiteNest exists</h2>
            <div className="mt-4 space-y-4 text-ink-secondary leading-relaxed">
              <p>
                Site structure usually lives in the worst possible place: a slide deck that goes stale the moment scope changes, a whiteboard photo nobody can find, or two disconnected tools — one for the sitemap, one for the wireframes. It gets built once for a kickoff, then forgotten until the next stakeholder review forces a rebuild from scratch.
              </p>
              <p>
                SiteNest gives site planning the same rigor a shipped product deserves: an infinite canvas, connected pages, wireframe blocks, and an export that&apos;s always current. Every project stays live, so you can see, at a glance, how a site is organised and how visitors move through it.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl sm:text-4xl text-foreground">What it does</h2>
            <ul className="mt-4 space-y-3">
              {WHAT_IT_DOES.map(({ term, description }) => (
                <li key={term} className="flex items-start gap-3 text-ink-secondary leading-relaxed">
                  <span aria-hidden className="mt-2.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <span>
                    <span className="font-semibold text-foreground">{term}</span> — {description}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl sm:text-4xl text-foreground">Tech stack</h2>
            <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TECH_STACK.map(({ label, value }) => (
                <div key={label} className="rounded-card border border-border bg-card p-4">
                  <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="text-3xl sm:text-4xl text-foreground">Who built SiteNest, and why</h2>
            <div className="mt-4 space-y-4 text-ink-secondary leading-relaxed">
              <p>
                I&apos;m Prabhu Raja, a senior designer with over 15 years of experience on enterprise products, design systems, and digital experiences. My work comes down to one idea: designing clarity from complexity.
              </p>
              <p>
                Site structure is where that gets tested first. Every project I&apos;ve worked on starts with a sitemap, and almost every sitemap ends up in a slide deck that goes stale the moment scope changes. I built SiteNest to apply the same discipline to it: understand the site, simplify the structure, systemise the pages, and keep one live plan that you can click through and check.
              </p>
              <p>
                SiteNest is an independent project. I scoped, designed, and built it myself with AI assistance. If you have feedback, a feature request, or just want to say hello, write to{' '}
                <a href="mailto:prabhu_cg@proton.me" className="text-primary-text font-medium underline underline-offset-4">prabhu_cg@proton.me</a>.
              </p>
            </div>
          </section>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
