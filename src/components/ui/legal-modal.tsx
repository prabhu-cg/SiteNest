'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalModalButtonProps {
  label: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalModalButton({ label, title, updated, sections }: LegalModalButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

          <div
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg mx-4 max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{title}</h2>
                <p className="text-xs text-gray-400 mt-0.5">Last updated {updated}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 flex-shrink-0 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-4 overflow-y-auto thin-scroll space-y-4">
              {sections.map(({ heading, body }) => (
                <div key={heading}>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{heading}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
