import type { Metadata } from 'next';
import { MarketingNav, MarketingFooter } from '@/components/marketing/MarketingChrome';
import { LegalDocument } from '@/components/marketing/LegalDocument';
import { LAST_UPDATED, PRIVACY_SECTIONS } from '@/lib/siteContent';

export const metadata: Metadata = { title: 'Privacy Policy | SiteNest' };

export default function Page() {
  return (
    <div className="marketing-page min-h-screen bg-background flex flex-col">
      <MarketingNav />
      <LegalDocument title="Privacy Policy" updated={LAST_UPDATED} sections={PRIVACY_SECTIONS} />
      <MarketingFooter />
    </div>
  );
}
