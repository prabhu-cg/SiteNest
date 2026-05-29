import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains_mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SiteNest - Visual Sitemap Builder",
  description: "Create beautiful visual sitemaps for your projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains_mono.variable} font-sans antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
          {/* Mobile block — shown only on screens narrower than 1024px */}
          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF9EB] px-8 text-center lg:hidden">
            <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">SiteNest is built for desktop</h1>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              For the best experience, please open SiteNest on a laptop or desktop computer. Mobile support is coming soon.
            </p>
            <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
              <span className="text-lg">💻</span>
              <span className="text-xs font-medium text-gray-600">Open on a larger screen</span>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
