'use client';

import { useState } from 'react';
import { X, Info } from 'lucide-react';

const TECH_STACK = [
  { name: 'Next.js 15', role: 'Framework' },
  { name: 'React 19', role: 'UI library' },
  { name: 'React Flow', role: 'Canvas & node graph' },
  { name: 'Zustand', role: 'State management' },
  { name: 'Supabase', role: 'Auth & database' },
  { name: 'Tailwind CSS', role: 'Styling' },
  { name: 'TypeScript', role: 'Type safety' },
  { name: 'Vercel', role: 'Hosting' },
];

interface AboutButtonProps {
  variant?: 'icon' | 'text';
}

export function AboutButton({ variant = 'icon' }: AboutButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {variant === 'text' ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          About
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

          <div
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">SiteNest</h2>
                <p className="text-xs text-gray-400 mt-0.5">Visual Sitemap Builder</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold">
                  v0.1.0 — Phase 1 MVP
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 flex-shrink-0 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                SiteNest is a visual sitemap builder that lets you plan and organise the structure of any website. Drag nodes onto an infinite canvas, connect pages, add wireframes, and export your work — all in the browser.
              </p>
            </div>

            {/* Tech stack */}
            <div className="px-6 py-4">
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-3">Built with</p>
              <div className="grid grid-cols-2 gap-2">
                {TECH_STACK.map(({ name, role }) => (
                  <div key={name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Made with ♥ for the web</span>
              <a
                href="https://github.com/prabhu-cg/SiteNest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-accent hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
