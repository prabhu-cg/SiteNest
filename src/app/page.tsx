'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, FolderOpen, Trash2, Clock, Loader2 } from 'lucide-react';
import { getProjectList, deleteProject, type ProjectMeta } from '@/lib/storage';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { generateId } from '@/lib/utils';
import { Tooltip } from '@/components/ui/tooltip';
import { useAuthStore } from '@/store/authStore';

function formatLastEdited(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const isToday = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();
  if (isToday) return `Today at ${time}`;
  if (isYesterday) return `Yesterday at ${time}`;
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${date} at ${time}`;
}

export default function Home() {
  const router = useRouter();
  const { user, isLoading: authLoading, signOut } = useAuthStore();
  const [projects, setProjects] = useState<ProjectMeta[]>([]);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const pendingProject = projects.find((p) => p.id === pendingDeleteId);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) router.replace('/auth');
  }, [user, authLoading, router]);

  useEffect(() => {
    setProjects(getProjectList().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
  }, []);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-accent" />
      </div>
    );
  }

  const handleNewProject = () => {
    const id = generateId();
    router.push(`/editor/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setPendingDeleteId(id);
  };

  const confirmDelete = () => {
    if (pendingDeleteId) {
      deleteProject(pendingDeleteId);
      setProjects((prev) => prev.filter((p) => p.id !== pendingDeleteId));
    }
    setPendingDeleteId(null);
  };

  return (
    <>
    <ConfirmDialog
      open={pendingDeleteId !== null}
      title="Delete project?"
      message={`"${pendingProject?.title ?? 'This project'}" and all its pages will be permanently deleted. This cannot be undone.`}
      confirmLabel="Delete"
      onConfirm={confirmDelete}
      onCancel={() => setPendingDeleteId(null)}
    />
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9EB] to-white dark:from-gray-950 dark:to-gray-900">
      {/* Nav */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">SiteNest</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:block">{user.email}</span>
          <Button variant="ghost" size="sm" className="text-sm text-gray-500" onClick={() => signOut().then(() => router.replace('/auth'))}>
            Sign out
          </Button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Projects</h1>
            <p className="text-sm text-gray-500 mt-1">{projects.length} sitemap{projects.length !== 1 ? 's' : ''}</p>
          </div>
          <Button onClick={handleNewProject} className="font-semibold">
            <Plus className="w-4 h-4 mr-1.5" />
            New Project
          </Button>
        </div>

        {/* Project grid */}
        {projects.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-1">No projects yet</h2>
            <p className="text-sm text-gray-400">Click "New Project" above to create your first sitemap.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => router.push(`/editor/${project.id}`)}
                className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 cursor-pointer hover:border-accent hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  {project.nodeCount} page{project.nodeCount !== 1 ? 's' : ''}
                </p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    Edited {formatLastEdited(project.updatedAt)}
                  </span>
                  <Tooltip content="Delete project" side="left">
                    <button
                      onClick={(e) => handleDeleteClick(e, project.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}

            {/* New project card */}
            <div
              onClick={handleNewProject}
              className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-5 cursor-pointer hover:border-accent hover:bg-accent/5 transition-all min-h-[130px]"
            >
              <Plus className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-500">New Project</span>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
