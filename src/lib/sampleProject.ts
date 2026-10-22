import { computeHierarchicalLayout } from '@/lib/layout';
import type { Edge, SitemapNode, WireframeBlockType } from '@/types';

/** Route id for the built-in read-only sample; it never touches the database. */
export const SAMPLE_PROJECT_ID = 'sample';
export const SAMPLE_PROJECT_TITLE = 'Northwind Coffee Roasters';

type BlockSpec = [type: WireframeBlockType, linkTo?: string];

const SHOP = '#C74504';
const JOURNAL = '#3B82F6';
const ABOUT = '#0D9488';
const ACCOUNT = '#7C3AED';
const VISIT = '#F59E0B';
const LEGAL = '#64748B';

// A fictional specialty-coffee shop. Healthy overall, with a few deliberate navigation problems
// (marked "Sample finding") so the Flow panel has something real to show.
const PAGES: Array<[id: string, title: string, slug: string, status: SitemapNode['status'], color: string, description: string, blocks: BlockSpec[]]> = [
  ['home', 'Home', '/', 'completed', SHOP, 'Landing page: hero, bestsellers, story and a way into every section.', [
    ['announcement-bar', 'subscriptions'], ['navbar', 'login'], ['hero-split', 'shop'], ['card-grid', 'beans'],
    ['feature-list'], ['image-text', 'about'], ['tabs', 'journal'], ['testimonial'], ['map-placeholder', 'visit'],
    ['contact-bar'], ['newsletter'], ['footer-multicolumn', 'privacy'],
  ]],
  ['shop', 'Shop', '/shop', 'completed', SHOP, 'Entry to the store: categories, featured roasts and subscriptions.', [
    ['navbar', 'home'], ['breadcrumb'], ['hero-centered'], ['card-grid', 'beans'], ['card-grid-2', 'gear'], ['cta-banner', 'subscriptions'], ['footer-simple', 'terms'],
  ]],
  ['beans', 'Coffee Beans', '/shop/beans', 'completed', SHOP, 'Filterable list of roasts by origin, process and roast level.', [
    ['navbar', 'home'], ['breadcrumb', 'shop'], ['search-results', 'ethiopia'], ['pagination'], ['footer-simple'],
  ]],
  ['ethiopia', 'Ethiopia Yirgacheffe', '/shop/beans/ethiopia-yirgacheffe', 'ready', SHOP, 'Product page: gallery, tasting notes, variants, reviews and related roasts.', [
    ['navbar', 'home'], ['breadcrumb', 'beans'], ['product-detail', 'cart'], ['reviews'], ['card-grid', 'beans'], ['footer-simple'],
  ]],
  ['gear', 'Brewing Gear', '/shop/gear', 'ready', SHOP, 'Grinders, kettles, filters and brewers.', [
    ['navbar', 'home'], ['breadcrumb', 'shop'], ['product-grid', 'cart'], ['pagination'], ['footer-simple'],
  ]],
  ['subscriptions', 'Subscriptions', '/subscriptions', 'ready', SHOP, 'Plans, what is included and how to pause or skip.', [
    ['navbar', 'home'], ['hero-centered'], ['pricing', 'checkout'], ['comparison-table'], ['faq'], ['cta-banner', 'checkout'], ['footer-simple'],
  ]],
  ['cart', 'Cart', '/cart', 'ready', SHOP, 'Line items, quantity, shipping estimate and promo code.', [
    ['navbar', 'home'], ['table'], ['cta-banner', 'checkout'], ['footer-simple'],
  ]],
  ['checkout', 'Checkout', '/checkout', 'draft', SHOP, 'Single-page checkout: address, delivery, payment and order summary.', [
    ['navbar', 'home'], ['checkout', 'confirmed'], ['footer-simple'],
  ]],
  ['confirmed', 'Order Confirmation', '/order-confirmed', 'draft', SHOP, 'Sample finding: a dead end. Nothing here links onward.', [
    ['empty-state'], ['text-block'],
  ]],
  ['journal', 'Journal', '/journal', 'ready', JOURNAL, 'Articles, brew guides and farm stories.', [
    ['navbar', 'home'], ['hero-centered'], ['blog-layout', 'pour-over'], ['pagination'], ['newsletter'], ['footer-simple'],
  ]],
  ['pour-over', 'How to Brew Pour-Over', '/journal/pour-over', 'ready', JOURNAL, 'Long-form article with steps, photos and a link to the full guides.', [
    ['navbar', 'home'], ['breadcrumb', 'journal'], ['text-block'], ['image-full'], ['process-steps'], ['cta-banner', 'guides'], ['footer-simple'],
  ]],
  ['guides', 'Brew Guides', '/guides', 'draft', JOURNAL, 'Index of method guides: espresso, AeroPress, French press.', [
    ['navbar', 'home'], ['card-grid', 'espresso'], ['footer-simple'],
  ]],
  ['espresso', 'Espresso Basics', '/guides/espresso', 'draft', JOURNAL, 'Sample finding: four clicks from Home, buried too deep.', [
    ['breadcrumb', 'guides'], ['text-block'], ['video-embed'], ['footer-simple'],
  ]],
  ['about', 'Our Story', '/about', 'completed', ABOUT, 'Who we are, how we roast and what we stand for.', [
    ['navbar', 'home'], ['hero-split'], ['timeline'], ['image-text', 'sourcing'], ['team-grid', 'team'], ['cta-banner', 'visit'], ['footer-simple'],
  ]],
  ['sourcing', 'Sourcing', '/about/sourcing', 'ready', ABOUT, 'Farms and cooperatives we buy from, with traceability.', [
    ['navbar', 'home'], ['image-gallery'], ['text-block'], ['stats'], ['footer-simple'],
  ]],
  ['team', 'Team', '/about/team', 'ready', ABOUT, 'The roasters, baristas and buyers.', [
    ['navbar', 'home'], ['team-grid'], ['footer-simple'],
  ]],
  ['careers', 'Careers', '/careers', 'draft', ABOUT, 'Sample finding: unreachable. No block links to this page.', [
    ['text-block'],
  ]],
  ['visit', 'Visit Us', '/visit', 'completed', VISIT, 'Cafe address, opening hours, map and parking.', [
    ['navbar', 'home'], ['map-placeholder'], ['contact-bar'], ['cta-banner', 'contact'], ['footer-simple'],
  ]],
  ['contact', 'Contact', '/contact', 'completed', VISIT, 'Enquiry form for wholesale, events and support.', [
    ['navbar', 'home'], ['form'], ['contact-bar'], ['faq'], ['footer-simple'],
  ]],
  ['account', 'Account', '/account', 'ready', ACCOUNT, 'Profile, addresses and subscription settings.', [
    ['navbar', 'home'], ['profile-page'], ['table', 'orders'], ['footer-simple'],
  ]],
  ['login', 'Sign In', '/login', 'completed', ACCOUNT, 'Email and password sign-in with a reset link.', [
    ['navbar', 'home'], ['login-form', 'account'], ['footer-simple'],
  ]],
  ['orders', 'Order History', '/account/orders', 'ready', ACCOUNT, 'Past orders with a reorder shortcut.', [
    ['navbar', 'home'], ['table', 'ethiopia'], ['footer-simple'],
  ]],
  ['privacy', 'Privacy Policy', '/privacy', 'completed', LEGAL, 'Sample finding: only reachable from a footer.', [
    ['navbar', 'home'], ['text-block'],
  ]],
  ['terms', 'Terms of Sale', '/terms', 'completed', LEGAL, 'Sample finding: only reachable from a footer.', [
    ['navbar', 'home'], ['text-block'],
  ]],
];

// Sitemap structure: parent to child
const TREE: Array<[string, string]> = [
  ['home', 'shop'], ['home', 'journal'], ['home', 'about'], ['home', 'visit'], ['home', 'contact'], ['home', 'account'], ['home', 'privacy'], ['home', 'terms'],
  ['shop', 'beans'], ['shop', 'gear'], ['shop', 'subscriptions'], ['shop', 'cart'], ['shop', 'checkout'],
  ['beans', 'ethiopia'], ['checkout', 'confirmed'],
  ['journal', 'pour-over'], ['journal', 'guides'], ['guides', 'espresso'],
  ['about', 'sourcing'], ['about', 'team'], ['about', 'careers'],
  ['account', 'login'], ['account', 'orders'],
];

export function buildSampleProject(): { nodes: SitemapNode[]; edges: Edge[] } {
  const stamp = '2026-01-01T00:00:00.000Z';

  const nodes: SitemapNode[] = PAGES.map(([id, title, slug, status, color, description, blocks]) => ({
    id,
    project_id: SAMPLE_PROJECT_ID,
    parent_id: TREE.find(([, child]) => child === id)?.[0] ?? null,
    title,
    url_slug: slug,
    description,
    icon: null,
    color,
    status,
    position_x: 0,
    position_y: 0,
    wireframe: blocks.map(([type, linkTo], i) => ({ id: `${id}-${i + 1}`, type, linkTo: linkTo ?? null })),
    created_at: stamp,
    updated_at: stamp,
  }));

  const edges: Edge[] = TREE.map(([source, target]) => ({
    id: `${source}-${target}`,
    project_id: SAMPLE_PROJECT_ID,
    source_node_id: source,
    target_node_id: target,
    created_at: stamp,
  }));

  // Same auto layout the editor offers, so the sample opens tidy and link-aware
  const positions = new Map(computeHierarchicalLayout(nodes, edges, 'TB').map((p) => [p.id, p]));
  nodes.forEach((node) => {
    const p = positions.get(node.id);
    if (p) { node.position_x = p.x; node.position_y = p.y; }
  });

  return { nodes, edges };
}

export const SAMPLE_PAGE_COUNT = PAGES.length;
