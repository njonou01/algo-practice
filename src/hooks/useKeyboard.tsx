/**
 * Hook personnalisé pour gérer les raccourcis clavier
 *
 * Permet d'enregistrer des combinaisons de touches (Ctrl+Key, etc.)
 * et d'exécuter des callbacks associés.
 */

import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  callback: () => void;
}

/**
 * Hook useKeyboard
 *
 * @param shortcuts - Tableau de raccourcis clavier à enregistrer
 *
 * @example
 * useKeyboard([
 *   { key: 'Enter', ctrl: true, callback: executeCode },
 *   { key: 's', ctrl: true, callback: saveFile }
 * ]);
 */
export function useKeyboard(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl === undefined || shortcut.ctrl === event.ctrlKey;
        const shiftMatch = shortcut.shift === undefined || shortcut.shift === event.shiftKey;
        const altMatch = shortcut.alt === undefined || shortcut.alt === event.altKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          event.preventDefault();
          shortcut.callback();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
}
