/**
 * Hook personnalisé pour gérer les opérations sur les fichiers
 */

import { useCallback } from 'react';
import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import type { EditorFile } from '../contexts/EditorContext';

interface UseFileOperationsProps {
  activeFile: EditorFile | null;
  openFile: (path: string, code: string, name: string) => void;
  markFileSaved: (fileId: string, path: string) => void;
  onError: (error: string) => void;
}

export function useFileOperations({
  activeFile,
  openFile,
  markFileSaved,
  onError,
}: UseFileOperationsProps) {
  const saveCurrentFile = useCallback(async () => {
    if (!activeFile) return;

    try {
      // Si le fichier a déjà un chemin, sauvegarder directement
      if (activeFile.path) {
        await writeTextFile(activeFile.path, activeFile.code);
        markFileSaved(activeFile.id, activeFile.path);
        return;
      }

      // Sinon, demander où sauvegarder (Save As)
      const algoNameMatch = activeFile.code.match(/Algorithme\s+(\w+)/i);
      const defaultName = algoNameMatch ? algoNameMatch[1] : activeFile.name.replace('.algo', '');

      const filePath = await save({
        defaultPath: `${defaultName}.algo`,
        filters: [{
          name: 'Algorithme',
          extensions: ['algo']
        }]
      });

      if (filePath) {
        await writeTextFile(filePath, activeFile.code);
        markFileSaved(activeFile.id, filePath);
      }
    } catch (err) {
      onError(`Erreur lors de la sauvegarde: ${err}`);
    }
  }, [activeFile, markFileSaved, onError]);

  const openFileDialog = useCallback(async () => {
    try {
      const selected = await open({
        filters: [{
          name: 'Algorithme',
          extensions: ['algo']
        }],
        multiple: false
      });

      if (selected && typeof selected === 'string') {
        const fileContent = await readTextFile(selected);
        const safeContent = fileContent ?? '';
        const fileName = selected.split('/').pop() || selected.split('\\').pop() || 'fichier.algo';
        openFile(selected, safeContent, fileName);
      }
    } catch (err) {
      onError(`Erreur lors de l'ouverture: ${err}`);
    }
  }, [openFile, onError]);

  return {
    saveCurrentFile,
    openFileDialog,
  };
}
