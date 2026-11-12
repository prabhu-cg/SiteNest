import Link from 'next/link';
import { LogoMark } from '@/components/ui/logo-mark';

// Hand-drawn website wireframe on paper with an orange pen. Unsplash photo (Compagnons); the Unsplash
// licence does not require on-page attribution.
const HERO_IMAGE = 'https://images.unsplash.com/photo-1600132806608-231446b2e7af?auto=format&fit=crop&w=1800&q=80';

const QUOTES = [
  { text: 'Design is not just what it looks like and feels like. Design is how it works.', author: 'Steve Jobs' },
  { text: 'Plans are worthless, but planning is everything.', author: 'Dwight D. Eisenhower' },
  { text: 'The details are not the details. They make the design.', author: 'Charles Eames' },
  { text: 'Design is thinking made visual.', author: 'Saul Bass' },
  { text: 'Good design is obvious. Great design is transparent.', author: 'Joe Sparano' },
  { text: 'Form ever follows function.', author: 'Louis Sullivan' },
  { text: 'Less, but better.', author: 'Dieter Rams' },
] as const;

// Same quote all day for everyone, rotating at midnight
function dailyQuote() {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86_400_000);
  return QUOTES[dayOfYear % QUOTES.length];
}

function AuthPanel() {
  const quote = dailyQuote();
  return (
    <div
      className="hidden lg:flex lg:w-[58%] relative flex-col justify-between p-12 overflow-hidden bg-primary bg-cover bg-center"
      style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
    >
      {/* Amber tint, then a dark scrim so the white text stays readable */}
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-primary/50 mix-blend-multiply" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgb(53 51 53 / 0.55), rgb(53 51 53 / 0.3) 45%, rgb(53 51 53 / 0.8))' }}
      />

      <Link href="/" className="relative flex items-center gap-3 w-fit">
        <LogoMark size={36} tone="inverse" className="rounded-lg" />
        <span className="text-white text-xl font-bold tracking-tight">SiteNest</span>
      </Link>

      <div className="relative max-w-lg">
        <span aria-hidden className="block text-white/20 leading-none select-none -ml-3 font-display" style={{ fontSize: '10rem', lineHeight: 1 }}>&ldquo;</span>
        <blockquote className="font-display text-white text-[2.25rem] font-medium leading-[1.15] tracking-[-0.02em] -mt-6 [text-shadow:0_1px_12px_rgb(0_0_0/0.25)]">
          {quote.text}
        </blockquote>
        <p className="text-white/80 text-sm mt-5 font-medium tracking-wide">— {quote.author}</p>
      </div>

      <p className="relative text-white/70 text-xs">© {new Date().getFullYear()} SiteNest. All rights reserved.</p>
    </div>
  );
}

/** Split-screen frame for every auth page: tinted photo on the left, form on white on the right */
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex">
      <AuthPanel />
      <div className="flex-1 bg-background flex flex-col items-center justify-center px-6 py-8 sm:py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex flex-col items-center mb-6 sm:mb-8">
            <LogoMark size={52} className="mb-3 rounded-xl" />
            <h1 className="font-display text-3xl text-foreground">
              Site<span className="text-primary-text">Nest</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">Visual sitemap builder</p>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
