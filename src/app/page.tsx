'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, FolderOpen, Trash2, Clock, Loader2, Pencil, LogOut, User } from 'lucide-react';
import { getProjectList, deleteProject, saveProject, renameProject, type ProjectMeta } from '@/lib/storage';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { AboutButton } from '@/components/ui/about-modal';
import { generateId } from '@/lib/utils';
import { Tooltip } from '@/components/ui/tooltip';
import { useAuthStore } from '@/store/authStore';
import { LogoMark } from '@/components/ui/logo-mark';
import { Avatar } from '@/components/ui/avatar';
import { ProfileModal } from '@/components/ui/profile-modal';
import { DesktopOnlyGate } from '@/components/ui/desktop-only-gate';
import LandingPage from '@/components/marketing/LandingPage';

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
  const { user, isLoading: authLoading, signOut, profile, saveProfile } = useAuthStore();
  const [projects, setProjects] = useState<ProjectMeta[]>([]);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const pendingProject = projects.find((p) => p.id === pendingDeleteId);

  // Rename state
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameDraft, setRenameDraft] = useState('');

  // Profile dropdown + modal
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    getProjectList().then(setProjects);
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  const handleNewProject = async () => {
    const id = generateId();
    try {
      await saveProject(id, 'Untitled Project', { nodes: [], edges: [] });
    } catch { /* editor will handle fallback */ }
    router.push(`/editor/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setPendingDeleteId(id);
  };

  const confirmDelete = () => {
    if (pendingDeleteId) {
      const idToDelete = pendingDeleteId;
      deleteProject(idToDelete).catch(() => { /* silently swallow */ });
      setProjects((prev) => prev.filter((p) => p.id !== idToDelete));
    }
    setPendingDeleteId(null);
  };

  const startRename = (e: React.MouseEvent, project: ProjectMeta) => {
    e.stopPropagation();
    setRenameDraft(project.title);
    setRenamingId(project.id);
  };

  const commitRename = async () => {
    if (!renamingId) return;
    const trimmed = renameDraft.trim() || 'Untitled Project';
    const current = projects.find((p) => p.id === renamingId);
    if (current && trimmed !== current.title) {
      renameProject(renamingId, trimmed).catch(() => {});
      setProjects((prev) => prev.map((p) => p.id === renamingId ? { ...p, title: trimmed } : p));
    }
    setRenamingId(null);
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
    {profileModalOpen && (
      <ProfileModal
        name={profile?.name ?? null}
        email={user.email ?? ''}
        avatarUrl={profile?.avatar_url ?? null}
        onSave={saveProfile}
        onClose={() => setProfileModalOpen(false)}
      />
    )}
    <div className="min-h-screen bg-gradient-to-br from-[#FFFAEF] to-white dark:from-gray-950 dark:to-gray-900">
      <DesktopOnlyGate />
      {/* Nav */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoMark size={28} />
          <span className="text-lg font-bold text-gray-900 dark:text-white">SiteNest</span>
        </div>
        <div className="flex items-center gap-3">
          <AboutButton variant="text" />
          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full focus:outline-none"
              aria-label="Profile menu"
            >
              <Avatar
                name={profile?.name ?? null}
                email={user.email ?? ''}
                avatarUrl={profile?.avatar_url ?? null}
                size={32}
                className="ring-2 ring-white dark:ring-gray-950 hover:ring-accent/40 transition-all"
              />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-10 z-50 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1.5">
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {profile?.name || user.email}
                    </p>
                    {profile?.name && (
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    )}
                  </div>
                  <button
                    onClick={() => { setProfileOpen(false); setProfileModalOpen(true); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-accent transition-colors"
                  >
                    <User className="w-3.5 h-3.5 flex-shrink-0" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => signOut().then(() => router.replace('/auth'))}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
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
                onClick={() => renamingId !== project.id && router.push(`/editor/${project.id}`)}
                className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 cursor-pointer hover:border-accent hover:shadow-md transition-all"
              >
                {renamingId === project.id ? (
                  <input
                    autoFocus
                    value={renameDraft}
                    onChange={(e) => setRenameDraft(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitRename();
                      if (e.key === 'Escape') setRenamingId(null);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full text-sm font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-accent rounded px-1.5 py-0.5 mb-1 focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                ) : (
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate">
                    {project.title}
                  </h3>
                )}
                <p className="text-xs text-gray-400 mb-4">
                  {project.nodeCount} page{project.nodeCount !== 1 ? 's' : ''}
                </p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    Edited {formatLastEdited(project.updatedAt)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Tooltip content="Rename" side="left">
                      <button
                        onClick={(e) => startRename(e, project)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </Tooltip>
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
