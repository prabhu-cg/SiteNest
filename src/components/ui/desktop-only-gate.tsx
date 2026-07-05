import { LogoMark } from '@/components/ui/logo-mark';

export function DesktopOnlyGate() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF9EB] px-8 text-center lg:hidden">
      <LogoMark size={56} className="mb-6 shadow-lg rounded-2xl" />
      <h1 className="text-xl font-bold text-gray-900 mb-2">SiteNest is built for desktop</h1>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
        For the best experience, please open SiteNest on a laptop or desktop computer. Mobile support is coming soon.
      </p>
      <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
        <span className="text-lg">💻</span>
        <span className="text-xs font-medium text-gray-600">Open on a larger screen</span>
      </div>
    </div>
  );
}
