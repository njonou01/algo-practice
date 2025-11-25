/**
 * Hook personnalisé pour gérer les raccourcis clavier
 */

import { useEffect, useRef } from 'react';
import type { EditorFile } from '../contexts/EditorContext';

interface UseKeyboardShortcutsProps {
  activeFile: EditorFile | null;
  onSave: () => void;
  onExecute: () => void;
  onNew: () => void;
  onOpen: () => void;
}

export function useKeyboardShortcuts({
  activeFile,
  onSave,
  onExecute,
  onNew,
  onOpen,
}: UseKeyboardShortcutsProps) {
  const activeFileRef = useRef(activeFile);
  activeFileRef.current = activeFile;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S (ou Cmd+S sur Mac) pour sauvegarder
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (activeFileRef.current) {
          onSave();
        }
      }

      // Ctrl+Enter pour exécuter
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        if (activeFileRef.current) {
          onExecute();
        }
      }

      // Ctrl+N pour nouveau fichier
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        onNew();
      }

      // Ctrl+O pour ouvrir fichier
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        onOpen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSave, onExecute, onNew, onOpen]);
}
