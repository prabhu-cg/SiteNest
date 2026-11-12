import type { Metadata } from 'next';
import { MarketingNav, MarketingFooter } from '@/components/marketing/MarketingChrome';
import { LegalDocument } from '@/components/marketing/LegalDocument';
import { LAST_UPDATED, TERMS_SECTIONS } from '@/lib/siteContent';

export const metadata: Metadata = { title: 'Terms of Service | SiteNest' };

export default function Page() {
  return (
    <div className="marketing-page min-h-screen bg-background flex flex-col">
      <MarketingNav />
      <LegalDocument title="Terms of Service" updated={LAST_UPDATED} sections={TERMS_SECTIONS} />
      <MarketingFooter />
    </div>
  );
}
