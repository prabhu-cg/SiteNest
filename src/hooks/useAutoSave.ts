import { useEffect, useRef } from 'react';
import { useCanvasStore } from '@/store/canvasStore';
import { debounce } from '@/lib/utils';

const AUTOSAVE_DELAY = 2000; // 2 seconds

export function useAutoSave(projectId: string) {
  const { isDirty, markClean, nodes, edges } = useCanvasStore();
  const saveTimerRef = useRef<NodeJS.Timeout>();

  // TODO: Implement actual Supabase save
  const saveToSupabase = debounce(async () => {
    if (!isDirty || !projectId) return;

    try {
      // Example: await supabase.from('projects').update(...).eq('id', projectId);
      console.log('Saving to Supabase...', { projectId, nodes, edges });
      markClean();
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, AUTOSAVE_DELAY);

  useEffect(() => {
    if (isDirty) {
      saveToSupabase();
    }

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [isDirty, nodes, edges, projectId, saveToSupabase]);

  return { isSaving: isDirty };
}
