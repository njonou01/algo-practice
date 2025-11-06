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
import { Code, File, FolderOpen, Loader2, Maximize2, Minimize2, Play, Save, Wand2 } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import Console from '../components/Console';
import InputModal from '../components/InputModal';
import SplitPane from '../components/SplitPane';
import { useSettings } from '../contexts/SettingsContext';
import { useEditor } from '../contexts/EditorContext';
import { formatCode } from '../utils/codeFormatter';
import {
  algorithmLanguageDefinition,
  setupCompletionProvider,
  createDynamicTheme,
  getMonacoOptions
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
  output: string[];      // Output complet à ce point de l'exécution
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
  const { code, setCode, isMonacoReady, setMonacoReady } = useEditor();

  // Référence à l'éditeur Monaco
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  // États pour l'exécution
  const [output, setOutput] = useState<string[]>([]);                // Sorties de l'algorithme
  const [error, setError] = useState<string | null>(null);           // Message d'erreur éventuel
  const [isRunning, setIsRunning] = useState(false);                 // Indique si l'exécution est en cours
  const [executionTime, setExecutionTime] = useState<number>();      // Temps d'exécution

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
   * Mettre à jour le thème Monaco quand les settings changent
   */
  useEffect(() => {
    if (monacoRef.current && editorRef.current) {
      // Recréer les thèmes avec les nouvelles couleurs
      const darkTheme = createDynamicTheme(settings, 'dark');
      const lightTheme = createDynamicTheme(settings, 'light');
      monacoRef.current.editor.defineTheme('algorithm-dark', darkTheme);
      monacoRef.current.editor.defineTheme('algorithm-light', lightTheme);

      // Appliquer le thème actuel
      const themeName = settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light';
      monacoRef.current.editor.setTheme(themeName);
    }
  }, [settings.theme, settings.colorKeywords, settings.colorTypes, settings.colorNumbers, settings.colorStrings, settings.colorComments, settings.colorBooleans, settings.colorArrow, settings.colorFunctions]);

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
   * Démarre l'exécution asynchrone avec gestion dynamique des entrées
   */
  const executeAlgorithm = async () => {
    setOutput([]);
    setError(null);
    setIsRunning(true);

    try {
      // Lancer l'exécution asynchrone
      await invoke("execute_algorithm_async", {
        code: code,
      });
    } catch (err) {
      setError(`Erreur lors du lancement: ${err}`);
      setIsRunning(false);
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
   * Sauvegarde le code actuel dans un fichier .algo
   * Extrait automatiquement le nom de l'algorithme pour proposer un nom de fichier par défaut
   */
  const saveFile = async () => {
    try {
      // Extraire le nom de l'algorithme du code (après "Algorithme")
      const algoNameMatch = code.match(/Algorithme\s+(\w+)/i);
      const defaultName = algoNameMatch ? algoNameMatch[1] : 'MonAlgorithme';

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
        await writeTextFile(filePath, code);
      }
    } catch (err) {
      setError(`Erreur lors de la sauvegarde: ${err}`);
    }
  };

  /**
   * Ouvre un fichier .algo et charge son contenu dans l'éditeur
   * Réinitialise les sorties et erreurs précédentes
   */
  const openFile = async () => {
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
        setCode(fileContent);
        setOutput([]);
        setError(null);
      }
    } catch (err) {
      setError(`Erreur lors de l'ouverture: ${err}`);
    }
  };

  /**
   * Crée un nouvel algorithme vide
   */
  const newFile = () => {
    setCode(`Algorithme NouvelAlgorithme
Constantes
  // Ajoutez vos constantes ici (ex: PI <- 3.14159)

Variables
  // Ajoutez vos variables ici (ex: x, y : Entier)

Debut
  // Votre code ici

Fin`);
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
   * Formate le code automatiquement
   */
  const handleFormat = () => {
    if (editorRef.current) {
      const formatted = formatCode(code, settings.tabSize);
      const editor = editorRef.current;

      // Sauvegarder la position du curseur
      const position = editor.getPosition();

      // Appliquer le formatage
      editor.setValue(formatted);

      // Restaurer la position du curseur (approximativement)
      if (position) {
        editor.setPosition(position);
      }

      // Focus sur l'éditeur
      editor.focus();
    } else {
      // Fallback si Monaco n'est pas encore monté
      const formatted = formatCode(code, settings.tabSize);
      setCode(formatted);
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
   * Charge un exemple depuis localStorage si disponible
   * (utilisé quand l'utilisateur clique sur "Utiliser cet exemple" depuis la page Exemples)
   */
  useEffect(() => {
    const loadedExample = localStorage.getItem('loadedExample');
    if (loadedExample) {
      try {
        const example = JSON.parse(loadedExample);
        setCode(example.code);
        setOutput([]);
        setError(null);
        // Nettoyer le localStorage après chargement
        localStorage.removeItem('loadedExample');
      } catch (err) {
        console.error('Erreur lors du chargement de l\'exemple:', err);
      }
    }
  }, []);

  /**
   * Écoute les événements du backend pour les requêtes d'entrée et les résultats
   */
  useEffect(() => {
    let startTime = performance.now();

    // Écouter les mises à jour d'output en temps réel (delta streaming)
    const unlistenOutputUpdate = listen<OutputUpdate>('output-update', (event) => {
      console.log('Mise à jour output (delta):', event.payload);
      // Append les nouvelles lignes (delta streaming)
      setOutput(prev => [...prev, ...event.payload.output]);
    });

    // Écouter les requêtes d'entrée
    const unlistenInputRequest = listen<InputRequest>('input-request', (event) => {
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

    // Écouter les résultats d'exécution
    const unlistenExecutionComplete = listen<ExecutionResult>('execution-complete', (event) => {
      console.log('Exécution terminée:', event.payload);
      const result = event.payload;
      const endTime = performance.now();
      setExecutionTime((endTime - startTime) / 1000);

      if (result.success) {
        setOutput(result.output);
        setError(null);
      } else {
        setError(result.error || "Erreur inconnue");
        setOutput([]);
      }

      setIsRunning(false);
      startTime = performance.now(); // Réinitialiser pour la prochaine exécution
    });

    // Nettoyer les listeners au démontage
    return () => {
      unlistenOutputUpdate.then(fn => fn());
      unlistenInputRequest.then(fn => fn());
      unlistenExecutionComplete.then(fn => fn());
    };
  }, []);


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
      <div className={`px-6 py-3 border-b ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'}`}>
        <h2 className={`text-sm font-semibold flex items-center gap-2 ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>
          <Code size={16} />
          <span>Éditeur</span>
        </h2>
      </div>
      <div className="flex-1 flex overflow-hidden relative">
        {/* Skeleton loader (affiché pendant le chargement) */}
        {isMonacoLoading && (
          <div className="absolute inset-0 z-10">
            {editorSkeleton}
          </div>
        )}

        {/* Éditeur de code Monaco */}
        <div className={`flex-1 ${isMonacoLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <MonacoEditor
              height="100%"
              defaultLanguage="algorithmique"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light'}
              options={getMonacoOptions(settings)}
              loading={<div></div>}
              onMount={(editor, monaco) => {
                editorRef.current = editor;
                monacoRef.current = monaco;

                // Enregistrer le langage algorithmique
                monaco.languages.register({ id: 'algorithmique' });
                monaco.languages.setMonarchTokensProvider('algorithmique', algorithmLanguageDefinition);

                // Créer et enregistrer les thèmes dynamiques avec les couleurs des settings
                const darkTheme = createDynamicTheme(settings, 'dark');
                const lightTheme = createDynamicTheme(settings, 'light');
                monaco.editor.defineTheme('algorithm-dark', darkTheme);
                monaco.editor.defineTheme('algorithm-light', lightTheme);

                // Configurer l'autocomplétion
                setupCompletionProvider(monaco);

                // Focus sur l'éditeur
                editor.focus();

                // Marquer Monaco comme chargé (une seule fois dans toute la session)
                setTimeout(() => setMonacoReady(true), 100);
              }}
            />
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
              disabled={isRunning}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white disabled:text-gray-500 text-sm font-medium transition-colors disabled:cursor-not-allowed flex items-center gap-2"
              title="Exécuter (Ctrl+Enter)"
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
              onClick={newFile}
              className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${buttonClasses}`}
              title="Nouveau (Ctrl+N)"
            >
              <File size={16} />
              <span>Nouveau</span>
            </button>

            <button
              onClick={openFile}
              className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${buttonClasses}`}
              title="Ouvrir (Ctrl+O)"
            >
              <FolderOpen size={16} />
              <span>Ouvrir</span>
            </button>

            <button
              onClick={saveFile}
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
