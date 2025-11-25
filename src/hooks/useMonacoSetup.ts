/**
 * Hook pour initialiser Monaco Editor une seule fois globalement
 * Évite de réenregistrer le langage à chaque changement de fichier
 */

import { useEffect, useRef } from 'react';
import {
  algorithmLanguageDefinition,
  setupCompletionProvider,
  createDynamicTheme
} from '../config/monacoConfig';
import type { AppSettings } from '../contexts/SettingsContext';

// Variable globale pour s'assurer qu'on n'initialise qu'une seule fois
let isMonacoInitialized = false;

export function useMonacoSetup(settings: AppSettings, monaco: any) {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!monaco || hasInitialized.current || isMonacoInitialized) {
      return;
    }

    console.log('[INIT] Initialisation GLOBALE de Monaco Editor...');

    try {
      // 1. Enregistrer le langage algorithmique (UNE SEULE FOIS)
      console.log('[LANG] Enregistrement du langage algorithmique...');
      const languages = monaco.languages.getLanguages();
      const algoLangExists = languages.some((lang: any) => lang.id === 'algorithmique');

      if (!algoLangExists) {
        monaco.languages.register({ id: 'algorithmique' });
        monaco.languages.setMonarchTokensProvider('algorithmique', algorithmLanguageDefinition);
        console.log('[SUCCESS] Langage enregistré');
      } else {
        console.log('[INFO] Langage déjà enregistré');
      }

      // 2. Créer les thèmes (peuvent être recréés si les settings changent)
      console.log('[THEME] Création des thèmes...');
      const darkTheme = createDynamicTheme(settings, 'dark');
      const lightTheme = createDynamicTheme(settings, 'light');
      monaco.editor.defineTheme('algorithm-dark', darkTheme);
      monaco.editor.defineTheme('algorithm-light', lightTheme);
      console.log('[SUCCESS] Thèmes créés');

      // 3. Appliquer le thème approprié
      const themeName = settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light';
      monaco.editor.setTheme(themeName);
      console.log('[SUCCESS] Thème appliqué:', themeName);

      // 4. Configurer l'autocomplétion (UNE SEULE FOIS)
      if (!algoLangExists) {
        setupCompletionProvider(monaco);
        console.log('[SUCCESS] Autocomplétion configurée');
      }

      hasInitialized.current = true;
      isMonacoInitialized = true;
      console.log('[SUCCESS] Monaco Editor initialisé avec succès !');

    } catch (error) {
      console.error('[ERROR] Erreur lors de l\'initialisation de Monaco:', error);
    }
  }, [monaco, settings]);

  // Mettre à jour uniquement le thème quand les couleurs changent
  useEffect(() => {
    if (!monaco || !hasInitialized.current) {
      return;
    }

    console.log('[THEME] Mise à jour des thèmes...');
    const darkTheme = createDynamicTheme(settings, 'dark');
    const lightTheme = createDynamicTheme(settings, 'light');
    monaco.editor.defineTheme('algorithm-dark', darkTheme);
    monaco.editor.defineTheme('algorithm-light', lightTheme);

    const themeName = settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light';
    monaco.editor.setTheme(themeName);
    console.log('[SUCCESS] Thèmes mis à jour');

  }, [
    monaco,
    settings.theme,
    settings.colorKeywords,
    settings.colorTypes,
    settings.colorNumbers,
    settings.colorStrings,
    settings.colorComments,
    settings.colorBooleans,
    settings.colorArrow,
    settings.colorFunctions
  ]);
}
