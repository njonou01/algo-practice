/**
 * AlgoGénie - Interpréteur d'algorithmes en français
 *
 * Ce fichier contient le composant principal de l'interpréteur.
 * Il permet d'écrire, éditer, exécuter, sauvegarder et charger des algorithmes.
 */

import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { File, FolderOpen, Loader2, Maximize2, Minimize2, Play, Save, Wand2 } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import type * as monacoEditor from 'monaco-editor';
import type { Monaco } from '../types/monaco';
import Console from '../components/Console';
import InputModal from '../components/InputModal';
import SplitPane from '../components/SplitPane';
import FileTabs from '../components/FileTabs';
import { useSettings } from '../contexts/SettingsContext';
import { useEditor } from '../contexts/EditorContext';
import { formatCode } from '../utils/codeFormatter';
import {
  getMonacoOptions,
  algorithmLanguageDefinition,
  setupCompletionProvider,
  createDynamicTheme
} from '../config/monacoConfig';

/**
 * Interface pour le résultat d'exécution d'un algorithme
 */
interface ExecutionResult {
  success: boolean;      // Indique si l'exécution s'est bien passée
  output: string[];      // Lignes de sortie de l'algorithme
  error: string | null;  // Message d'erreur éventuel
}

/**
 * Interface pour une requête d'entrée du backend
 */
interface InputRequest {
  prompt: string;        // Texte du dernier Ecrire()
  variables: string[];   // Noms des variables à lire
  has_prompt: boolean;   // true si un Ecrire() précède
  current_output: string[];  // Output accumulé jusqu'à ce point
}

/**
 * Événement de mise à jour de l'output en temps réel
 */
interface OutputUpdate {
  output: string[];      // Lignes complètes (avec \n)
  current_line: string;  // Ligne courante incomplète (sans \n)
}

/**
 * Composant principal de l'interpréteur AlgoGénie
 *
 * Gère l'éditeur de code, l'exécution des algorithmes, les entrées/sorties,
 * et les opérations de sauvegarde/chargement de fichiers.
 */
function CodeEditor() {
  // Récupérer les paramètres et l'état de l'éditeur depuis les contextes
  const { settings } = useSettings();
  const {
    files,
    activeFileId,
    createNewFile,
    openFile,
    closeFile,
    setActiveFile,
    renameFile,
    updateFileCode,
    markFileSaved,
    isMonacoReady,
    setMonacoReady,
    getActiveFile,
  } = useEditor();

  // Fichier actif
  const activeFile = getActiveFile();

  // Ref pour le fichier actif (pour éviter stale closures)
  const activeFileRef = useRef(activeFile);
  activeFileRef.current = activeFile;

  // Référence à l'éditeur Monaco
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  // États pour l'exécution
  const [output, setOutput] = useState<string[]>([]);                // Sorties de l'algorithme
  const [error, setError] = useState<string | null>(null);           // Message d'erreur éventuel
  const [isRunning, setIsRunning] = useState(false);                 // Indique si l'exécution est en cours
  const [executionTime, setExecutionTime] = useState<number>();      // Temps d'exécution
  const executingFileIdRef = useRef<string | null>(null);            // ID du fichier en cours d'exécution

  // États pour la modal d'entrée
  const [currentInputRequest, setCurrentInputRequest] = useState<InputRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État et référence pour le mode plein écran
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  // État pour la position de la console
  type ConsolePosition = 'right' | 'left' | 'top' | 'bottom';
  const [consolePosition, setConsolePosition] = useState<ConsolePosition>('bottom');

  // L'état de chargement de Monaco vient du contexte
  // Il ne sera chargé qu'une seule fois dans toute la session
  const isMonacoLoading = !isMonacoReady;

  /**
   * NOTE: La gestion des modèles est maintenant déléguée au wrapper @monaco-editor/react
   * via les props `value` et `path`. Le wrapper gère automatiquement la création,
   * la mise à jour et le switch de modèles.
   *
   * On garde juste le nettoyage lors de la fermeture de fichiers via EditorContext.
   */

  /**
   * Mettre à jour les options de l'éditeur Monaco quand les settings changent
   */
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        fontSize: settings.fontSize,
        tabSize: settings.tabSize,
      });
    }
  }, [settings.fontSize, settings.tabSize]);

  /**
   * Mettre à jour le thème Monaco quand les couleurs ou le thème changent
   */
  useEffect(() => {
    // NE PAS mettre à jour si les couleurs ne sont pas encore chargées
    if (!settings.colorKeywords || !settings.colorTypes) {
      console.log('[WAIT] Settings pas encore chargés, skip mise à jour du thème');
      return;
    }

    if (monacoRef.current && isMonacoReady) {
      console.log('[THEME] Mise à jour du thème suite au changement de settings...');
      const darkTheme = createDynamicTheme(settings, 'dark');
      const lightTheme = createDynamicTheme(settings, 'light');
      monacoRef.current.editor.defineTheme('algorithm-dark', darkTheme);
      monacoRef.current.editor.defineTheme('algorithm-light', lightTheme);

      const themeName = settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light';
      monacoRef.current.editor.setTheme(themeName);
      console.log('[SUCCESS] Thème mis à jour:', themeName);
    }
  }, [
    settings.theme,
    settings.colorKeywords,
    settings.colorTypes,
    settings.colorNumbers,
    settings.colorStrings,
    settings.colorComments,
    settings.colorBooleans,
    settings.colorArrow,
    settings.colorFunctions,
    isMonacoReady
  ]);

  /**
   * Démarre l'exécution asynchrone avec gestion dynamique des entrées
   */
  const executeAlgorithm = async () => {
    if (!activeFile) return;

    // Capturer l'ID du fichier en cours d'exécution
    executingFileIdRef.current = activeFile.id;

    setOutput([]);
    setError(null);
    setIsRunning(true);

    try {
      // Lancer l'exécution asynchrone avec le code du fichier actif
      await invoke("execute_algorithm_async", {
        code: activeFile.code,
      });
    } catch (err) {
      setError(`Erreur lors du lancement: ${err}`);
      setIsRunning(false);
      executingFileIdRef.current = null;
    }
  };

  /**
   * Gère la soumission des entrées (modal ou console)
   */
  const handleInputSubmit = async (values: string[]) => {
    setIsModalOpen(false);
    setCurrentInputRequest(null);

    try {
      // Envoyer les valeurs au backend
      await invoke("send_input_values", { values });
    } catch (err) {
      setError(`Erreur lors de l'envoi des valeurs: ${err}`);
      setIsRunning(false);
    }
  };

  /**
   * Annule l'exécution
   */
  const handleInputCancel = () => {
    setIsModalOpen(false);
    setCurrentInputRequest(null);
    setIsRunning(false);
    setError("Exécution annulée par l'utilisateur");
  };

  /**
   * Sauvegarde le fichier actif dans un fichier .algo
   * Extrait automatiquement le nom de l'algorithme pour proposer un nom de fichier par défaut
   */
  const saveCurrentFile = async () => {
    if (!activeFile) return;

    try {
      // Si le fichier a déjà un chemin, sauvegarder directement
      if (activeFile.path) {
        await writeTextFile(activeFile.path, activeFile.code);
        markFileSaved(activeFile.id, activeFile.path);
        return;
      }

      // Sinon, demander où sauvegarder (Save As)
      // Extraire le nom de l'algorithme du code (après "Algorithme")
      const algoNameMatch = activeFile.code.match(/Algorithme\s+(\w+)/i);
      const defaultName = algoNameMatch ? algoNameMatch[1] : activeFile.name.replace('.algo', '');

      // Ouvrir le dialog de sauvegarde
      const filePath = await save({
        defaultPath: `${defaultName}.algo`,
        filters: [{
          name: 'Algorithme',
          extensions: ['algo']
        }]
      });

      // Écrire le fichier si un chemin a été sélectionné
      if (filePath) {
        await writeTextFile(filePath, activeFile.code);
        markFileSaved(activeFile.id, filePath);
      }
    } catch (err) {
      setError(`Erreur lors de la sauvegarde: ${err}`);
    }
  };

  /**
   * Ouvre un fichier .algo dans un nouvel onglet
   * Réinitialise les sorties et erreurs précédentes
   */
  const openFileDialog = async () => {
    try {
      // Ouvrir le dialog de sélection de fichier
      const selected = await open({
        filters: [{
          name: 'Algorithme',
          extensions: ['algo']
        }],
        multiple: false
      });

      // Charger le contenu du fichier si un fichier a été sélectionné
      if (selected && typeof selected === 'string') {
        const fileContent = await readTextFile(selected);
        const fileName = selected.split('/').pop() || selected.split('\\').pop() || 'fichier.algo';
        openFile(selected, fileContent, fileName);
        setOutput([]);
        setError(null);
      }
    } catch (err) {
      setError(`Erreur lors de l'ouverture: ${err}`);
    }
  };

  /**
   * Crée un nouvel algorithme vide dans un nouvel onglet
   */
  const handleNewFile = () => {
    createNewFile();
    setOutput([]);
    setError(null);
  };

  /**
   * Efface la console
   */
  const clearConsole = () => {
    setOutput([]);
    setError(null);
  };

  /**
   * Debug : Inspecter la tokenisation du code
   */
  const handleDebugTokens = () => {
    if (!monacoRef.current || !editorRef.current) {
      console.error('[ERROR] Monaco ou Editor non disponible');
      return;
    }

    const model = editorRef.current.getModel();
    if (!model) {
      console.error('[ERROR] Pas de modèle disponible');
      return;
    }

    console.log('[DEBUG] === DEBUG TOKENISATION ===');
    console.log('Langage du modèle:', model.getLanguageId());

    const lineCount = Math.min(model.getLineCount(), 10);
    for (let i = 1; i <= lineCount; i++) {
      const lineContent = model.getLineContent(i);
      const tokens = monacoRef.current.editor.tokenize(lineContent, 'algorithmique');
      console.log(`Ligne ${i}: "${lineContent}"`);
      console.log('Tokens:', tokens);
    }

    // Vérifier les langages enregistrés
    const languages = monacoRef.current.languages.getLanguages();
    console.log('Langages enregistrés:', languages.map((l: any) => l.id));

    // Vérifier le thème actuel
    console.log('Thème actuel:', settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light');

    console.log('[DEBUG] === FIN DEBUG ===');
  };

  /**
   * Formate le code du fichier actif automatiquement
   */
  const handleFormat = () => {
    if (!activeFile) return;

    if (editorRef.current) {
      const formatted = formatCode(activeFile.code, settings.tabSize);
      const editor = editorRef.current;

      // Sauvegarder la position du curseur
      const position = editor.getPosition();

      // Appliquer le formatage
      editor.setValue(formatted);

      // Mettre à jour le fichier avec le code formaté
      updateFileCode(activeFile.id, formatted);

      // Restaurer la position du curseur (approximativement)
      if (position) {
        editor.setPosition(position);
      }

      // Focus sur l'éditeur
      editor.focus();
    } else {
      // Fallback si Monaco n'est pas encore monté
      const formatted = formatCode(activeFile.code, settings.tabSize);
      updateFileCode(activeFile.id, formatted);
    }
  };

  /**
   * Active ou désactive le mode plein écran
   */
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      // Entrer en mode plein écran
      if (fullscreenRef.current) {
        try {
          await fullscreenRef.current.requestFullscreen();
        } catch (err) {
          console.error('Erreur lors de l\'activation du plein écran:', err);
        }
      }
    } else {
      // Quitter le mode plein écran
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.error('Erreur lors de la sortie du plein écran:', err);
      }
    }
  };

  /**
   * Écoute les changements d'état du mode plein écran
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  /**
   * Gestion des raccourcis clavier
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S (ou Cmd+S sur Mac) pour sauvegarder
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveCurrentFile();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeFile]); // Dépendre de activeFile pour avoir la bonne closure dans saveCurrentFile

  /**
   * Charge un exemple depuis localStorage si disponible
   * (utilisé quand l'utilisateur clique sur "Utiliser cet exemple" depuis la page Exemples)
   * DÉPRÉCIÉ: Gardé pour compatibilité, mais openFile() est maintenant appelé directement depuis Examples.tsx
   */
  useEffect(() => {
    const loadedExample = localStorage.getItem('loadedExample');
    if (loadedExample) {
      try {
        const example = JSON.parse(loadedExample);

        // Vérifier si le fichier n'a pas déjà été ouvert par la nouvelle méthode
        const fileName = example.title ? `${example.title}.algo` : 'Exemple.algo';
        const alreadyOpen = files.some(f => f.name.startsWith(fileName.replace('.algo', '')));

        if (!alreadyOpen) {
          console.log('[LEGACY] Chargement d\'exemple via localStorage (ancien système)');
          // Créer un nouveau fichier avec le code de l'exemple
          const examplePath = `example://legacy-${Date.now()}`;
          openFile(examplePath, example.code, fileName);
          setOutput([]);
          setError(null);
        }

        // Nettoyer le localStorage après chargement
        localStorage.removeItem('loadedExample');
      } catch (err) {
        console.error('Erreur lors du chargement de l\'exemple:', err);
      }
    }
  }, [files]);

  /**
   * Écoute les événements du backend pour les requêtes d'entrée et les résultats
   */
  useEffect(() => {
    const startTimeRef = { current: performance.now() };
    const listeners: (() => void)[] = [];

    // Fonction async pour setup les listeners
    const setupListeners = async () => {
      // Écouter les mises à jour d'output en temps réel
      const unlistenOutputUpdate = await listen<OutputUpdate>('output-update', (event) => {
        const { output: completeLines, current_line } = event.payload;

        // Construire l'output : lignes complètes + ligne courante si non vide
        const fullOutput = [...completeLines];
        if (current_line) {
          fullOutput.push(current_line);
        }

        setOutput(fullOutput);
      });
      listeners.push(unlistenOutputUpdate);

      // Écouter les requêtes d'entrée
      const unlistenInputRequest = await listen<InputRequest>('input-request', (event) => {
        console.log('Requête d\'entrée reçue:', event.payload);
        const request = event.payload;

        // Afficher l'output accumulé jusqu'à ce point
        setOutput(request.current_output);

        setCurrentInputRequest(request);

        // Ouvrir la modal seulement si le mode est 'modal'
        if (settings.inputMode === 'modal') {
          setIsModalOpen(true);
        }
        // En mode 'console', le champ d'entrée s'affichera directement dans la console
      });
      listeners.push(unlistenInputRequest);

      // Écouter les résultats d'exécution
      const unlistenExecutionComplete = await listen<ExecutionResult>('execution-complete', (event) => {
        console.log('Exécution terminée:', event.payload);
        const result = event.payload;
        const endTime = performance.now();
        setExecutionTime((endTime - startTimeRef.current) / 1000);

        // Vérifier que c'est toujours le même fichier
        const currentFileId = activeFileRef.current?.id;
        const executingFileId = executingFileIdRef.current;

        if (executingFileId && currentFileId !== executingFileId) {
          console.warn('[WARN] Fichier changé pendant exécution, résultats ignorés');
          setIsRunning(false);
          executingFileIdRef.current = null;
          return;
        }

        if (result.success) {
          setOutput(result.output);
          setError(null);
        } else {
          setError(result.error || "Erreur inconnue");
          setOutput([]);
        }

        setIsRunning(false);
        executingFileIdRef.current = null;
        startTimeRef.current = performance.now();
      });
      listeners.push(unlistenExecutionComplete);

    };

    setupListeners();

    // Nettoyer les listeners au démontage
    return () => {
      listeners.forEach(fn => fn());
    };
  }, [settings.inputMode]);


  // Définir le thème
  const isDarkTheme = settings.theme === 'dark';

  // Classes CSS pour les boutons selon le thème
  const buttonClasses = isDarkTheme
    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100';

  const dividerClasses = isDarkTheme ? 'bg-gray-600' : 'bg-gray-300';

  const formatButtonClasses = isDarkTheme
    ? 'text-indigo-400 hover:text-indigo-300 hover:bg-gray-700'
    : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50';

  const hintTextClasses = isDarkTheme ? 'text-gray-400' : 'text-gray-500';
  const hintCodeClasses = isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100';

  // Skeleton loader pour Monaco - ressemble à du vrai code
  const editorSkeleton = (
    <div className={`h-full w-full relative ${isDarkTheme ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
      {/* Contenu de l'éditeur simulé */}
      <div className={`h-full w-full p-4 font-mono text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} opacity-50`}>
        <div className="flex gap-4">
          {/* Numéros de ligne */}
          <div className={`select-none text-right ${isDarkTheme ? 'text-gray-600' : 'text-gray-400'}`}>
            <div className="leading-relaxed">1</div>
            <div className="leading-relaxed">2</div>
            <div className="leading-relaxed">3</div>
            <div className="leading-relaxed">4</div>
            <div className="leading-relaxed">5</div>
            <div className="leading-relaxed">6</div>
            <div className="leading-relaxed">7</div>
            <div className="leading-relaxed">8</div>
            <div className="leading-relaxed">9</div>
            <div className="leading-relaxed">10</div>
            <div className="leading-relaxed">11</div>
            <div className="leading-relaxed">12</div>
            <div className="leading-relaxed">13</div>
            <div className="leading-relaxed">14</div>
            <div className="leading-relaxed">15</div>
          </div>

          {/* Code simulé avec vraies couleurs */}
          <div className="flex-1 leading-relaxed">
            <div><span className={isDarkTheme ? 'text-purple-400' : 'text-purple-600'}>Algorithme</span> MonAlgorithme</div>
            <div className={isDarkTheme ? 'text-gray-600' : 'text-gray-400'}>// Commentaire</div>
            <div></div>
            <div><span className={isDarkTheme ? 'text-purple-400' : 'text-purple-600'}>Variables</span></div>
            <div className="pl-4">x, y : <span className={isDarkTheme ? 'text-blue-400' : 'text-blue-600'}>Entier</span></div>
            <div className="pl-4">nom : <span className={isDarkTheme ? 'text-blue-400' : 'text-blue-600'}>Chaine</span></div>
            <div></div>
            <div><span className={isDarkTheme ? 'text-purple-400' : 'text-purple-600'}>Debut</span></div>
            <div className="pl-4"><span className={isDarkTheme ? 'text-purple-400' : 'text-purple-600'}>Ecrire</span>(<span className={isDarkTheme ? 'text-green-400' : 'text-green-600'}>"Bonjour"</span>)</div>
            <div className="pl-4">x <span className={isDarkTheme ? 'text-orange-400' : 'text-orange-600'}>←</span> <span className={isDarkTheme ? 'text-yellow-400' : 'text-yellow-600'}>42</span></div>
            <div className="pl-4"><span className={isDarkTheme ? 'text-purple-400' : 'text-purple-600'}>Lire</span>(nom)</div>
            <div></div>
            <div><span className={isDarkTheme ? 'text-purple-400' : 'text-purple-600'}>Fin</span></div>
          </div>
        </div>
      </div>

      {/* Message de chargement centré avec design moderne */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative px-8 py-6 rounded-xl shadow-2xl backdrop-blur-md ${isDarkTheme ? 'bg-gray-900/90 border border-gray-700' : 'bg-white/90 border border-gray-200'}`}>
          {/* Effet de brillance */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>

          <div className="relative flex flex-col items-center gap-4">
            {/* Spinner avec cercle décoratif */}
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-xl ${isDarkTheme ? 'bg-indigo-500/30' : 'bg-indigo-400/30'}`}></div>
              <Loader2 className={`relative animate-spin ${isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'}`} size={40} strokeWidth={2.5} />
            </div>

            {/* Texte de chargement */}
            <div className="text-center">
              <div className={`text-base font-semibold mb-1 ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>
                Chargement de l'éditeur
              </div>
              <div className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                Initialisation de Monaco Editor
              </div>
            </div>

            {/* Barre de progression animée */}
            <div className={`w-48 h-1 rounded-full overflow-hidden ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className={`h-full rounded-full animate-pulse ${isDarkTheme ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`} style={{ width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Définir les panneaux éditeur et console
  const editorPanel = (
    <div className={`h-full flex flex-col ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
      {/* Barre d'onglets des fichiers */}
      {files.length > 0 && (
        <FileTabs
          files={files}
          activeFileId={activeFileId}
          onTabClick={setActiveFile}
          onTabClose={closeFile}
          onTabRename={renameFile}
          theme={settings.theme}
        />
      )}

      {/* Zone de l'éditeur */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Skeleton loader (affiché pendant le chargement) */}
        {isMonacoLoading && activeFile && (
          <div className="absolute inset-0 z-10">
            {editorSkeleton}
          </div>
        )}

        {/* Écran d'accueil quand aucun fichier n'est ouvert */}
        {!activeFile && (
          <div className={`flex-1 flex items-center justify-center ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="text-center max-w-2xl px-8">
              {/* Icône */}
              <div className={`mb-6 ${isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'}`}>
                <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              {/* Titre */}
              <h2 className={`text-2xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>
                Commencez à coder
              </h2>

              {/* Description */}
              <p className={`text-base mb-8 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                Créez un nouveau fichier ou ouvrez un algorithme existant pour commencer
              </p>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleNewFile}
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                    ${isDarkTheme
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'
                    }
                  `}
                >
                  <File size={20} />
                  <span>Nouveau fichier</span>
                </button>

                <button
                  onClick={openFileDialog}
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                    ${isDarkTheme
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }
                  `}
                >
                  <FolderOpen size={20} />
                  <span>Ouvrir un fichier</span>
                </button>
              </div>

              {/* Raccourcis clavier */}
              <div className={`mt-8 pt-8 border-t ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
                <p className={`text-sm mb-3 ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>
                  Raccourcis clavier
                </p>
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                  <div className={`flex items-center gap-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                    <kbd className={`px-2 py-1 rounded ${isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>Ctrl</kbd>
                    <span>+</span>
                    <kbd className={`px-2 py-1 rounded ${isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>N</kbd>
                    <span>Nouveau</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                    <kbd className={`px-2 py-1 rounded ${isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>Ctrl</kbd>
                    <span>+</span>
                    <kbd className={`px-2 py-1 rounded ${isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>O</kbd>
                    <span>Ouvrir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Éditeur de code Monaco */}
        <div className={`flex-1 ${isMonacoLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          {!activeFile ? (
            <div className={`flex items-center justify-center h-full ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <p className={isDarkTheme ? 'text-gray-500' : 'text-gray-400'}>Aucun fichier ouvert</p>
            </div>
          ) : (
            <MonacoEditor
              height="100%"
              language="algorithmique"
              path={activeFile.modelUri || `file:///${activeFile.id}.algo`}
              value={activeFile.code}
              onChange={(value) => {
                if (activeFile) {
                  updateFileCode(activeFile.id, value || '');
                }
              }}
              theme={settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light'}
              options={getMonacoOptions(settings)}
              loading={<div></div>}
              onMount={(editor, monaco) => {
                // Stocker les références
                editorRef.current = editor;
                monacoRef.current = monaco;

                console.log('[INIT] onMount - Initialisation UNIQUE de Monaco');

                // Vérifier si le langage est déjà enregistré
                const languages = monaco.languages.getLanguages();
                const algoLangExists = languages.some((lang: any) => lang.id === 'algorithmique');

                if (!algoLangExists) {
                  console.log('[LANG] Enregistrement du langage algorithmique...');
                  monaco.languages.register({ id: 'algorithmique' });
                  monaco.languages.setMonarchTokensProvider('algorithmique', algorithmLanguageDefinition);
                  setupCompletionProvider(monaco);
                  console.log('[SUCCESS] Langage enregistré');
                }

                // Toujours recréer et appliquer les thèmes
                console.log('[THEME] Définition des thèmes...');
                const darkTheme = createDynamicTheme(settings, 'dark');
                const lightTheme = createDynamicTheme(settings, 'light');
                monaco.editor.defineTheme('algorithm-dark', darkTheme);
                monaco.editor.defineTheme('algorithm-light', lightTheme);

                // Appliquer le thème approprié
                const themeName = settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light';
                monaco.editor.setTheme(themeName);
                console.log('[SUCCESS] Thème appliqué:', themeName);

                // Focus sur l'éditeur
                editor.focus();

                // Marquer Monaco comme chargé
                setMonacoReady(true);

                console.log('[SUCCESS] Monaco initialisé - les modèles sont gérés automatiquement par @monaco-editor/react');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

  const consolePanel = (
    <Console
      output={output}
      error={error}
      isRunning={isRunning}
      executionTime={executionTime}
      onClear={clearConsole}
      position={consolePosition}
      onPositionChange={setConsolePosition}
      theme={settings.theme}
      inputRequest={settings.inputMode === 'console' ? currentInputRequest : null}
      onInputSubmit={handleInputSubmit}
      onInputCancel={handleInputCancel}
    />
  );

  // Déterminer la configuration du SplitPane selon la position
  const isHorizontalSplit = consolePosition === 'left' || consolePosition === 'right';
  const firstPanel = (consolePosition === 'left' || consolePosition === 'top') ? consolePanel : editorPanel;
  const secondPanel = (consolePosition === 'left' || consolePosition === 'top') ? editorPanel : consolePanel;
  const defaultSplitSize = isHorizontalSplit
    ? (isFullscreen ? 85 : 55)
    : (isFullscreen ? 80 : 60);

  return (
    <div ref={fullscreenRef} className={`flex flex-col h-full ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Barre d'actions */}
      <div className={`border-b shadow-sm ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={executeAlgorithm}
              disabled={isRunning || !activeFile}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white disabled:text-gray-500 text-sm font-medium transition-colors disabled:cursor-not-allowed flex items-center gap-2"
              title={isRunning ? "Une exécution est déjà en cours..." : !activeFile ? "Aucun fichier ouvert" : "Exécuter (Ctrl+Enter)"}
            >
              {isRunning ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Exécution...</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>Exécuter</span>
                </>
              )}
            </button>

            <div className={`h-6 w-px ${dividerClasses}`}></div>

            <button
              onClick={handleNewFile}
              className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${buttonClasses}`}
              title="Nouveau (Ctrl+N)"
            >
              <File size={16} />
              <span>Nouveau</span>
            </button>

            <button
              onClick={openFileDialog}
              className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${buttonClasses}`}
              title="Ouvrir (Ctrl+O)"
            >
              <FolderOpen size={16} />
              <span>Ouvrir</span>
            </button>

            <button
              onClick={saveCurrentFile}
              className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${buttonClasses}`}
              title="Sauvegarder (Ctrl+S)"
            >
              <Save size={16} />
              <span>Sauvegarder</span>
            </button>

            <div className={`h-6 w-px ${dividerClasses}`}></div>

            <button
              onClick={handleFormat}
              className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${formatButtonClasses}`}
              title="Formater le code"
            >
              <Wand2 size={16} />
              <span>Formater</span>
            </button>

            <button
              onClick={handleDebugTokens}
              className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${buttonClasses}`}
              title="Debug tokenisation (voir console F12)"
            >
              <span>Debug</span>
            </button>

            <div className={`h-6 w-px ${dividerClasses}`}></div>

            <button
              onClick={toggleFullscreen}
              className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${buttonClasses}`}
              title={isFullscreen ? "Quitter le plein écran (ESC)" : "Plein écran"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 size={16} />
                  <span>Quitter</span>
                </>
              ) : (
                <>
                  <Maximize2 size={16} />
                  <span>Plein écran</span>
                </>
              )}
            </button>
          </div>


          <div className={`text-xs ${hintTextClasses}`}>
            Tapez <code className={`px-1 py-0.5 ${hintCodeClasses}`}>&lt;-</code> pour <code className={`px-1 py-0.5 ${hintCodeClasses}`}>←</code> |
            <code className={`px-1 py-0.5 ml-1 ${hintCodeClasses}`}>!=</code> pour <code className={`px-1 py-0.5 ${hintCodeClasses}`}>≠</code>
          </div>
        </div>
      </div>

      {/* Layout principal avec SplitPane */}
      <div className="flex-1 overflow-hidden">
        <SplitPane
          key={`${isFullscreen ? 'fullscreen' : 'normal'}-${consolePosition}`}
          left={firstPanel}
          right={secondPanel}
          direction={isHorizontalSplit ? 'horizontal' : 'vertical'}
          defaultSplit={defaultSplitSize}
          minSize={isFullscreen ? 10 : 30}
          theme={settings.theme}
        />
      </div>

      {/* Modal pour les entrées interactives (mode modal uniquement) */}
      {isModalOpen && currentInputRequest && settings.inputMode === 'modal' && (
        <InputModal
          isOpen={isModalOpen}
          prompt={currentInputRequest.prompt || "Entrez les valeurs"}
          variables={currentInputRequest.variables}
          onSubmit={handleInputSubmit}
          onCancel={handleInputCancel}
        />
      )}
    </div>
  );
}

export default CodeEditor;
