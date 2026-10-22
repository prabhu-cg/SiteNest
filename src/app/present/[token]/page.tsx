'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import PresentMode from '@/components/canvas/PresentMode';
import { loadSharedProject, type SharedProject } from '@/lib/storage';

export default function SharedPresentPage() {
  const { token } = useParams<{ token: string }>();
  const [project, setProject] = useState<SharedProject | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    let cancelled = false;
    loadSharedProject(token).then((p) => {
      if (cancelled) return;
      setProject(p);
      setStatus(p ? 'ready' : 'missing');
    });
    return () => { cancelled = true; };
  }, [token]);

  if (status === 'ready' && project) {
    return <PresentMode nodes={project.nodes} edges={project.edges} title={project.title} />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6">
      {status === 'loading' ? (
        <Loader2 className="w-5 h-5 animate-spin text-accent" />
      ) : (
        <div className="text-center max-w-sm">
          <p className="text-base font-semibold text-gray-900 dark:text-gray-50">This link isn't available</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sharing may have been turned off, or the link was reset. Ask the owner for a new one.
          </p>
        </div>
      )}
    </div>
  );
}
