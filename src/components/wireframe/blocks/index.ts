import NavbarBlock from './NavbarBlock';
import SidebarNavBlock from './SidebarNavBlock';
import BreadcrumbBlock from './BreadcrumbBlock';
import TabsBlock from './TabsBlock';
import HeroSplitBlock from './HeroSplitBlock';
import HeroCenteredBlock from './HeroCenteredBlock';
import HeroVideoBlock from './HeroVideoBlock';
import CardGridBlock from './CardGridBlock';
import CardGrid2Block from './CardGrid2Block';
import TextBlock from './TextBlock';
import ImageTextBlock from './ImageTextBlock';
import FeatureListBlock from './FeatureListBlock';
import TestimonialBlock from './TestimonialBlock';
import ImageGalleryBlock from './ImageGalleryBlock';
import ImageFullBlock from './ImageFullBlock';
import VideoEmbedBlock from './VideoEmbedBlock';
import FormBlock from './FormBlock';
import NewsletterBlock from './NewsletterBlock';
import ContactBarBlock from './ContactBarBlock';
import TwoColumnBlock from './TwoColumnBlock';
import ThreeColumnBlock from './ThreeColumnBlock';
import PricingBlock from './PricingBlock';
import DividerBlock from './DividerBlock';
import TableBlock from './TableBlock';
import StatsBlock from './StatsBlock';
import ChartPlaceholderBlock from './ChartPlaceholderBlock';
import MapPlaceholderBlock from './MapPlaceholderBlock';
import FooterSimpleBlock from './FooterSimpleBlock';
import FooterMulticolumnBlock from './FooterMulticolumnBlock';
import CtaBannerBlock from './CtaBannerBlock';
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
  { type: 'navbar',       label: 'Navbar',          description: 'Top navigation bar with logo & links',       component: NavbarBlock,          previewHeight: 64,  category: 'Navigation' },
  { type: 'sidebar-nav',  label: 'Sidebar Nav',      description: 'Left sidebar with nav items & content area', component: SidebarNavBlock,      previewHeight: 300, category: 'Navigation' },
  { type: 'breadcrumb',   label: 'Breadcrumb',       description: 'Breadcrumb trail navigation path',           component: BreadcrumbBlock,      previewHeight: 48,  category: 'Navigation' },
  { type: 'tabs',         label: 'Tabs',             description: 'Horizontal tab bar with active indicator',   component: TabsBlock,            previewHeight: 56,  category: 'Navigation' },
  // Hero
  { type: 'hero-split',   label: 'Hero Split',       description: 'Text left, image right hero section',        component: HeroSplitBlock,       previewHeight: 300, category: 'Hero' },
  { type: 'hero-centered',label: 'Hero Centered',    description: 'Centered headline, sub-text & CTAs',         component: HeroCenteredBlock,    previewHeight: 280, category: 'Hero' },
  { type: 'hero-video',   label: 'Hero Video',       description: 'Dark video background with overlay text',    component: HeroVideoBlock,       previewHeight: 280, category: 'Hero' },
  // Content
  { type: 'card-grid',    label: 'Card Grid (3-col)',description: '3-column card layout with images',           component: CardGridBlock,        previewHeight: 260, category: 'Content' },
  { type: 'card-grid-2',  label: 'Card Grid (2-col)',description: '2-column card layout with images',           component: CardGrid2Block,       previewHeight: 280, category: 'Content' },
  { type: 'text-block',   label: 'Text Block',       description: 'Heading with multi-paragraph body text',     component: TextBlock,            previewHeight: 220, category: 'Content' },
  { type: 'image-text',   label: 'Image + Text',     description: 'Image left with text & CTA on right',       component: ImageTextBlock,       previewHeight: 260, category: 'Content' },
  { type: 'feature-list', label: 'Feature List',     description: 'Icon + label feature rows in two columns',  component: FeatureListBlock,     previewHeight: 280, category: 'Content' },
  { type: 'testimonial',  label: 'Testimonial',      description: 'Pull quote with author avatar & star rating',component: TestimonialBlock,     previewHeight: 200, category: 'Content' },
  // Media
  { type: 'image-gallery',label: 'Image Gallery',    description: '3×2 grid of image placeholders',            component: ImageGalleryBlock,    previewHeight: 280, category: 'Media' },
  { type: 'image-full',   label: 'Full-Width Image', description: 'Edge-to-edge image with caption bar',       component: ImageFullBlock,       previewHeight: 240, category: 'Media' },
  { type: 'video-embed',  label: 'Video Embed',      description: 'Video player placeholder with controls',    component: VideoEmbedBlock,      previewHeight: 240, category: 'Media' },
  // Forms
  { type: 'form',         label: 'Form',             description: 'Centered form with inputs & submit button', component: FormBlock,            previewHeight: 320, category: 'Forms' },
  { type: 'newsletter',   label: 'Newsletter',       description: 'Email signup with headline & input',        component: NewsletterBlock,      previewHeight: 160, category: 'Forms' },
  { type: 'contact-bar',  label: 'Contact Bar',      description: 'Row of contact info items with icons',      component: ContactBarBlock,      previewHeight: 80,  category: 'Forms' },
  // Layout
  { type: 'two-column',   label: 'Two Column',       description: 'Two equal content columns side by side',    component: TwoColumnBlock,       previewHeight: 260, category: 'Layout' },
  { type: 'three-column', label: 'Three Column',     description: 'Three equal icon + text columns',           component: ThreeColumnBlock,     previewHeight: 260, category: 'Layout' },
  { type: 'pricing',      label: 'Pricing',          description: 'Three-tier pricing cards with features',    component: PricingBlock,         previewHeight: 340, category: 'Layout' },
  { type: 'divider',      label: 'Divider',          description: 'Section divider with centre label',         component: DividerBlock,         previewHeight: 48,  category: 'Layout' },
  // Data
  { type: 'table',        label: 'Table',            description: 'Data table with header and row cells',      component: TableBlock,           previewHeight: 280, category: 'Data' },
  { type: 'stats',        label: 'Stats',            description: 'Row of four key metric stats',              component: StatsBlock,           previewHeight: 120, category: 'Data' },
  { type: 'chart-placeholder', label: 'Bar Chart',   description: 'Bar chart with axes, labels & legend',      component: ChartPlaceholderBlock,previewHeight: 240, category: 'Data' },
  { type: 'map-placeholder',   label: 'Map',         description: 'Map placeholder with location pin',         component: MapPlaceholderBlock,  previewHeight: 240, category: 'Data' },
  // Footer
  { type: 'footer-simple',      label: 'Footer Simple',      description: 'Minimal dark footer with links',          component: FooterSimpleBlock,      previewHeight: 80,  category: 'Footer' },
  { type: 'footer-multicolumn', label: 'Footer Multi-column',description: 'Dark footer with logo, columns & socials', component: FooterMulticolumnBlock, previewHeight: 200, category: 'Footer' },
  { type: 'cta-banner',         label: 'CTA Banner',         description: 'Full-width dark banner with dual CTAs',    component: CtaBannerBlock,         previewHeight: 160, category: 'Content' },
];

export const BLOCK_CATEGORIES = [...new Set(BLOCK_REGISTRY.map((b) => b.category))];

export {
  NavbarBlock, SidebarNavBlock, BreadcrumbBlock, TabsBlock,
  HeroSplitBlock, HeroCenteredBlock, HeroVideoBlock,
  CardGridBlock, CardGrid2Block, TextBlock, ImageTextBlock, FeatureListBlock, TestimonialBlock,
  ImageGalleryBlock, ImageFullBlock, VideoEmbedBlock,
  FormBlock, NewsletterBlock, ContactBarBlock,
  TwoColumnBlock, ThreeColumnBlock, PricingBlock, DividerBlock,
  TableBlock, StatsBlock, ChartPlaceholderBlock, MapPlaceholderBlock,
  FooterSimpleBlock, FooterMulticolumnBlock, CtaBannerBlock,
};
