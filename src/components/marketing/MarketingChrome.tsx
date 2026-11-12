import Link from 'next/link';
import { LogoMark } from '@/components/ui/logo-mark';

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
      {children}
    </Link>
  );
}

export function MarketingNav() {
  return (
      <nav className="border-b border-border bg-background/90 backdrop-blur sticky top-0 z-20 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" aria-label="SiteNest home" className="flex items-center gap-3">
            <LogoMark size={28} />
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-foreground">Site<span className="text-primary-text">Nest</span></span>
              <span className="mt-0.5 text-[11px] font-semibold text-muted-foreground">Visual sitemap builder</span>
            </div>
          </Link>
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
  );
}

export function MarketingFooter() {
  return (
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
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </div>
        </div>
      </footer>
  );
}
