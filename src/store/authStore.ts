import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { getProfile, updateProfile as updateProfileInDB, type UserProfile } from '@/lib/storage';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  loadProfile: () => Promise<void>;
  saveProfile: (updates: { name?: string; avatar_url?: string | null }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isLoading: true,
  error: null,

  setUser: (user) => set({ user, isLoading: false, error: null }),
  setLoading: (v) => set({ isLoading: v }),
  setError: (e) => set({ error: e, isLoading: false }),

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const msg = error.message === 'Failed to fetch'
        ? 'Unable to reach the server. If you\'re using Microsoft Edge, try disabling Enhanced Tracking Prevention for this site (Edge Settings → Privacy → Tracking prevention → Basic), or try a different browser.'
        : error.message;
      set({ isLoading: false, error: msg });
      throw error;
    }
    set({ user: data.user, isLoading: false });
  },

  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { set({ isLoading: false, error: error.message }); throw error; }
    const needsConfirmation = !data.session;
    set({ user: data.session ? data.user : null, isLoading: false });
    return { needsConfirmation };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    set({ isLoading: false, error: error ? error.message : null });
    if (error) throw error;
  },

  updatePassword: async (password) => {
    set({ isLoading: true, error: null });
    const { error } = await supabase.auth.updateUser({ password });
    set({ isLoading: false, error: error ? error.message : null });
    if (error) throw error;
  },

  loadProfile: async () => {
    const profile = await getProfile();
    set({ profile });
  },

  saveProfile: async (updates) => {
    await updateProfileInDB(updates);
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    }));
  },
}));
