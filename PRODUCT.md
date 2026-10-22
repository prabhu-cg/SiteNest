# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who plan the structure of a website before it is designed or built:

- Freelance designers and developers scoping a client's site.
- Agencies and product teams aligning stakeholders and reviewing structure with clients.
- Founders and marketers planning a first site or a redesign, often without design training.
- UX and information-architecture specialists restructuring navigation.

Their job: lay out pages, decide what goes on each page, decide how visitors move between them, and get sign-off.

## Product Purpose

SiteNest is a visual sitemap builder. Pages sit on an infinite canvas, connected by sitemap structure; each page carries a wireframe assembled from a block library. Success is a team leaving a review with a structure they have agreed on and have actually tested, not just drawn.

## Positioning

Working positioning, formed from the build sessions and not separately confirmed by the owner: a sitemap you can test, not only draw. Any block on any page can link to another page; the Flow panel audits those links for unreachable pages, dead ends, pages buried too deep, footer-only pages and sitemap children never linked from their parent; Present mode lets a reviewer click through the result like a visitor; a shareable read-only link sends that walkthrough to a client without an account.

## Operating Context

- Desktop-only editing; a gate blocks small screens.
- Projects are saved automatically to Supabase and are private to their owner.
- Reviews happen with clients and stakeholders who do not have an account, hence the read-only present link.
- Output leaves the product as a PNG of the sitemap or of a single page wireframe.

## Capabilities and Constraints

Terminology: **page** (a node on the canvas), **block** (a wireframe section on a page), **link** (a block pointing at a page), **structure edge** (parent to child on the canvas), **Flow** (navigation analysis), **Present** (click-through preview), **share link** (public read-only Present URL).

- Pages, structure edges, 55+ wireframe blocks in eight categories, drag-to-link from any block to any page, auto layout (top-bottom, left-right, radial) that orders linked siblings source-before-target, undo/redo, PNG export.
- Flow analysis, Present mode and share links run entirely client-side on data the user already has.
- Share links are token-gated through a database function; the public-read policies in the base schema must stay dropped, or tokens become listable.
- Free today. The product uses no paid third-party APIs and no AI. Whether that is permanent is an open decision: the owner said "free for now" and has expressed a wish to keep it fully free. Do not add paywalls, metered features or paid-service dependencies without asking.
- A link belongs to a block, not to an item inside a block (a navbar links to one page, not to each menu item).
- A built-in, read-only sample project ("Northwind Coffee Roasters", 24 fictional pages with deliberate navigation problems) lives in code at `src/lib/sampleProject.ts`. It is never written to the database and is opened from the dashboard at `/editor/sample`. In read-only mode every store action is a no-op; only viewing, Flow, Present and PNG export work.
- Undecided: pricing or monetization, team collaboration, and a per-item link model.

## Brand Commitments

- Name: SiteNest, with "Nest" highlighted in the wordmark.
- Shares its design token system with the owner's other product, Assessly (the Doxa token family), so the products read as one family.
- Sign-in uses a photograph panel from Unsplash. The Unsplash licence needs no on-page credit, and the owner chose not to show one.

## Evidence on Hand

- `public/marketing/editor-screenshot.png` is a real editor screenshot.
- No customer testimonials, usage numbers, case studies or press exist. Do not invent any.

## Product Principles

1. **A sitemap is a hypothesis to test.** Prefer features that let a team check structure over features that only decorate it.
2. **Free to start, free to share.** A reviewer should never need an account or payment to see the work.
3. **Derived, not duplicated.** Links, depth and findings come from the data the user already drew; no extra setup.
4. **Plain machinery.** Deterministic, explainable analysis over opaque scoring or AI guesses.
5. **Nothing leaves the owner's control by default.** Projects are private; sharing is an explicit, revocable act.
