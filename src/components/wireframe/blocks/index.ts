import NavbarBlock from './NavbarBlock';
import SidebarNavBlock from './SidebarNavBlock';
import BreadcrumbBlock from './BreadcrumbBlock';
import TabsBlock from './TabsBlock';
import PaginationBlock from './PaginationBlock';
import StepperBlock from './StepperBlock';
import HeroSplitBlock from './HeroSplitBlock';
import HeroCenteredBlock from './HeroCenteredBlock';
import HeroVideoBlock from './HeroVideoBlock';
import CardGridBlock from './CardGridBlock';
import CardGrid2Block from './CardGrid2Block';
import TextBlock from './TextBlock';
import ImageTextBlock from './ImageTextBlock';
import FeatureListBlock from './FeatureListBlock';
import TestimonialBlock from './TestimonialBlock';
import TeamGridBlock from './TeamGridBlock';
import FAQBlock from './FAQBlock';
import LogoBarBlock from './LogoBarBlock';
import TimelineBlock from './TimelineBlock';
import ProcessStepsBlock from './ProcessStepsBlock';
import ImageGalleryBlock from './ImageGalleryBlock';
import ImageFullBlock from './ImageFullBlock';
import VideoEmbedBlock from './VideoEmbedBlock';
import AudioPlayerBlock from './AudioPlayerBlock';
import FormBlock from './FormBlock';
import NewsletterBlock from './NewsletterBlock';
import ContactBarBlock from './ContactBarBlock';
import TwoColumnBlock from './TwoColumnBlock';
import ThreeColumnBlock from './ThreeColumnBlock';
import BlogLayoutBlock from './BlogLayoutBlock';
import RailLayoutBlock from './RailLayoutBlock';
import LeftRailBlock from './LeftRailBlock';
import RightRailBlock from './RightRailBlock';
import SearchResultsBlock from './SearchResultsBlock';
import ProfilePageBlock from './ProfilePageBlock';
import Error404Block from './Error404Block';
import PricingBlock from './PricingBlock';
import DividerBlock from './DividerBlock';
import TableBlock from './TableBlock';
import StatsBlock from './StatsBlock';
import ChartPlaceholderBlock from './ChartPlaceholderBlock';
import MapPlaceholderBlock from './MapPlaceholderBlock';
import ComparisonTableBlock from './ComparisonTableBlock';
import KanbanBlock from './KanbanBlock';
import FooterSimpleBlock from './FooterSimpleBlock';
import FooterMulticolumnBlock from './FooterMulticolumnBlock';
import CtaBannerBlock from './CtaBannerBlock';
import AnnouncementBarBlock from './AnnouncementBarBlock';
import LoginFormBlock from './LoginFormBlock';
import ProductGridBlock from './ProductGridBlock';
import ProductDetailBlock from './ProductDetailBlock';
import CheckoutBlock from './CheckoutBlock';
import CalendarBlock from './CalendarBlock';
import EmptyStateBlock from './EmptyStateBlock';
import ReviewsBlock from './ReviewsBlock';
import type { WireframeBlockType } from '@/types';

export interface BlockMeta {
  type: WireframeBlockType;
  label: string;
  description: string;
  component: React.ComponentType;
  previewHeight: number;
  category: string;
}

export const BLOCK_REGISTRY: BlockMeta[] = [
  // Navigation
  { type: 'navbar',        label: 'Navbar',           description: 'Top navigation bar with logo & links',              component: NavbarBlock,          previewHeight: 64,  category: 'Navigation' },
  { type: 'sidebar-nav',   label: 'Sidebar Nav',       description: 'Left sidebar with nav items & content area',        component: SidebarNavBlock,      previewHeight: 300, category: 'Navigation' },
  { type: 'breadcrumb',    label: 'Breadcrumb',        description: 'Breadcrumb trail navigation path',                  component: BreadcrumbBlock,      previewHeight: 48,  category: 'Navigation' },
  { type: 'tabs',          label: 'Tabs',              description: 'Horizontal tab bar with active indicator',          component: TabsBlock,            previewHeight: 56,  category: 'Navigation' },
  { type: 'pagination',    label: 'Pagination',        description: 'Page number row with prev / next controls',         component: PaginationBlock,      previewHeight: 80,  category: 'Navigation' },
  { type: 'stepper',       label: 'Stepper',           description: 'Multi-step wizard progress bar with step labels',   component: StepperBlock,         previewHeight: 120, category: 'Navigation' },
  { type: 'announcement-bar', label: 'Announcement Bar', description: 'Slim promo strip with link and dismiss button',   component: AnnouncementBarBlock, previewHeight: 40,  category: 'Navigation' },
  // Hero
  { type: 'hero-split',    label: 'Hero Split',        description: 'Text left, image right hero section',               component: HeroSplitBlock,       previewHeight: 300, category: 'Hero' },
  { type: 'hero-centered', label: 'Hero Centered',     description: 'Centered headline, sub-text & CTAs',                component: HeroCenteredBlock,    previewHeight: 280, category: 'Hero' },
  { type: 'hero-video',    label: 'Hero Video',        description: 'Dark video background with overlay text',           component: HeroVideoBlock,       previewHeight: 280, category: 'Hero' },
  // Content
  { type: 'card-grid',     label: 'Card Grid (3-col)', description: '3-column card layout with images',                  component: CardGridBlock,        previewHeight: 260, category: 'Content' },
  { type: 'card-grid-2',   label: 'Card Grid (2-col)', description: '2-column card layout with images',                  component: CardGrid2Block,       previewHeight: 280, category: 'Content' },
  { type: 'text-block',    label: 'Text Block',        description: 'Heading with multi-paragraph body text',            component: TextBlock,            previewHeight: 220, category: 'Content' },
  { type: 'image-text',    label: 'Image + Text',      description: 'Image left with text & CTA on right',              component: ImageTextBlock,       previewHeight: 260, category: 'Content' },
  { type: 'feature-list',  label: 'Feature List',      description: 'Icon + label feature rows in two columns',         component: FeatureListBlock,     previewHeight: 280, category: 'Content' },
  { type: 'testimonial',   label: 'Testimonial',       description: 'Pull quote with author avatar & star rating',       component: TestimonialBlock,     previewHeight: 200, category: 'Content' },
  { type: 'team-grid',     label: 'Team Grid',         description: '3-column grid of team member cards with socials',  component: TeamGridBlock,        previewHeight: 320, category: 'Content' },
  { type: 'faq',           label: 'FAQ',               description: 'Accordion-style question & answer list',           component: FAQBlock,             previewHeight: 340, category: 'Content' },
  { type: 'logo-bar',      label: 'Logo Bar',          description: 'Row of partner / client logo placeholders',        component: LogoBarBlock,         previewHeight: 160, category: 'Content' },
  { type: 'timeline',      label: 'Timeline',          description: 'Vertical alternating milestone timeline',           component: TimelineBlock,        previewHeight: 400, category: 'Content' },
  { type: 'process-steps', label: 'Process Steps',     description: 'Numbered how-it-works steps with icon & label',    component: ProcessStepsBlock,    previewHeight: 220, category: 'Content' },
  { type: 'cta-banner',    label: 'CTA Banner',        description: 'Full-width dark banner with dual CTAs',            component: CtaBannerBlock,       previewHeight: 160, category: 'Content' },
  { type: 'product-grid', label: 'Product Grid',      description: '4-up product cards with price & add button',       component: ProductGridBlock,     previewHeight: 300, category: 'Content' },
  { type: 'reviews',      label: 'Reviews',           description: 'Rating summary with review cards',                 component: ReviewsBlock,         previewHeight: 300, category: 'Content' },
  // Media
  { type: 'image-gallery', label: 'Image Gallery',     description: '3×2 grid of image placeholders',                  component: ImageGalleryBlock,    previewHeight: 280, category: 'Media' },
  { type: 'image-full',    label: 'Full-Width Image',  description: 'Edge-to-edge image with caption bar',             component: ImageFullBlock,       previewHeight: 240, category: 'Media' },
  { type: 'video-embed',   label: 'Video Embed',       description: 'Video player placeholder with controls',           component: VideoEmbedBlock,      previewHeight: 240, category: 'Media' },
  { type: 'audio-player',  label: 'Audio Player',      description: 'Podcast / audio player with waveform & controls', component: AudioPlayerBlock,     previewHeight: 160, category: 'Media' },
  // Forms
  { type: 'form',          label: 'Form',              description: 'Centered form with inputs & submit button',        component: FormBlock,            previewHeight: 320, category: 'Forms' },
  { type: 'newsletter',    label: 'Newsletter',        description: 'Email signup with headline & input',              component: NewsletterBlock,      previewHeight: 160, category: 'Forms' },
  { type: 'contact-bar',   label: 'Contact Bar',       description: 'Row of contact info items with icons',            component: ContactBarBlock,      previewHeight: 80,  category: 'Forms' },
  { type: 'login-form',   label: 'Login Form',        description: 'Sign-in card with email, password & submit',      component: LoginFormBlock,       previewHeight: 340, category: 'Forms' },
  { type: 'checkout',     label: 'Checkout',          description: 'Payment form beside an order summary',             component: CheckoutBlock,        previewHeight: 340, category: 'Forms' },
  // Layout
  { type: 'two-column',    label: 'Two Column',        description: 'Two equal content columns side by side',          component: TwoColumnBlock,       previewHeight: 260, category: 'Layout' },
  { type: 'three-column',  label: 'Three Column',      description: 'Three equal icon + text columns',                 component: ThreeColumnBlock,     previewHeight: 260, category: 'Layout' },
  { type: 'blog-layout',   label: 'Blog Layout',       description: 'Article column with sidebar (author, categories, recent posts)', component: BlogLayoutBlock, previewHeight: 360, category: 'Layout' },
  { type: 'rail-layout',   label: 'Rail Layout',       description: 'Left nav rail, main content area, right widget rail',           component: RailLayoutBlock, previewHeight: 320, category: 'Layout' },
  { type: 'left-rail',     label: 'Left Rail',         description: 'Left sidebar nav with main content area',         component: LeftRailBlock,        previewHeight: 320, category: 'Layout' },
  { type: 'right-rail',    label: 'Right Rail',        description: 'Main content area with right widget sidebar',     component: RightRailBlock,       previewHeight: 320, category: 'Layout' },
  { type: 'search-results',label: 'Search Results',    description: 'Search bar, filter panel, and result cards',      component: SearchResultsBlock,   previewHeight: 360, category: 'Layout' },
  { type: 'profile-page',  label: 'Profile Page',      description: 'User profile with cover, avatar, stats & feed',  component: ProfilePageBlock,     previewHeight: 360, category: 'Layout' },
  { type: 'error-404',     label: '404 Error',         description: '404 page with illustration and CTA buttons',      component: Error404Block,        previewHeight: 320, category: 'Layout' },
  { type: 'pricing',       label: 'Pricing',           description: 'Three-tier pricing cards with features',          component: PricingBlock,         previewHeight: 340, category: 'Layout' },
  { type: 'product-detail', label: 'Product Detail',  description: 'Image gallery with title, price & add to cart',   component: ProductDetailBlock,   previewHeight: 340, category: 'Layout' },
  { type: 'empty-state',  label: 'Empty State',       description: 'Illustration, message and call to action',        component: EmptyStateBlock,      previewHeight: 260, category: 'Layout' },
  { type: 'divider',       label: 'Divider',           description: 'Section divider with centre label',               component: DividerBlock,         previewHeight: 48,  category: 'Layout' },
  // Data
  { type: 'table',              label: 'Table',           description: 'Data table with header and row cells',           component: TableBlock,            previewHeight: 280, category: 'Data' },
  { type: 'stats',              label: 'Stats',           description: 'Row of four key metric stats',                   component: StatsBlock,            previewHeight: 120, category: 'Data' },
  { type: 'chart-placeholder',  label: 'Bar Chart',       description: 'Bar chart with axes, labels & legend',           component: ChartPlaceholderBlock, previewHeight: 240, category: 'Data' },
  { type: 'map-placeholder',    label: 'Map',             description: 'Map placeholder with location pin',              component: MapPlaceholderBlock,   previewHeight: 240, category: 'Data' },
  { type: 'comparison-table',   label: 'Comparison Table',description: 'Feature comparison matrix with check / X marks', component: ComparisonTableBlock,  previewHeight: 320, category: 'Data' },
  { type: 'calendar',           label: 'Calendar',        description: 'Month grid with scheduled events',               component: CalendarBlock,         previewHeight: 320, category: 'Data' },
  { type: 'kanban',             label: 'Kanban Board',    description: 'Three-column kanban board with cards and tags',  component: KanbanBlock,           previewHeight: 420, category: 'Data' },
  // Footer
  { type: 'footer-simple',      label: 'Footer Simple',       description: 'Minimal dark footer with links',             component: FooterSimpleBlock,      previewHeight: 80,  category: 'Footer' },
  { type: 'footer-multicolumn', label: 'Footer Multi-column', description: 'Dark footer with logo, columns & socials',   component: FooterMulticolumnBlock, previewHeight: 200, category: 'Footer' },
];

export const BLOCK_CATEGORIES = [...new Set(BLOCK_REGISTRY.map((b) => b.category))];

export {
  NavbarBlock, SidebarNavBlock, BreadcrumbBlock, TabsBlock, PaginationBlock, StepperBlock,
  HeroSplitBlock, HeroCenteredBlock, HeroVideoBlock,
  CardGridBlock, CardGrid2Block, TextBlock, ImageTextBlock, FeatureListBlock, TestimonialBlock,
  TeamGridBlock, FAQBlock, LogoBarBlock, TimelineBlock, ProcessStepsBlock,
  ImageGalleryBlock, ImageFullBlock, VideoEmbedBlock, AudioPlayerBlock,
  FormBlock, NewsletterBlock, ContactBarBlock,
  TwoColumnBlock, ThreeColumnBlock, BlogLayoutBlock, RailLayoutBlock, LeftRailBlock, RightRailBlock,
  SearchResultsBlock, ProfilePageBlock, Error404Block, PricingBlock, DividerBlock,
  TableBlock, StatsBlock, ChartPlaceholderBlock, MapPlaceholderBlock, ComparisonTableBlock, KanbanBlock,
  FooterSimpleBlock, FooterMulticolumnBlock, CtaBannerBlock,
  AnnouncementBarBlock, LoginFormBlock, ProductGridBlock, ProductDetailBlock,
  CheckoutBlock, CalendarBlock, EmptyStateBlock, ReviewsBlock,
};
