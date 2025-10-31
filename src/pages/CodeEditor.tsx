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
import { Code, File, FolderOpen, Loader2, Play, Save } from 'lucide-react';
import { useEffect, useState } from "react";
import Editor from 'react-simple-code-editor';
import Console from '../components/Console';
import InputModal from '../components/InputModal';
import SplitPane from '../components/SplitPane';
import { useSettings } from '../contexts/SettingsContext';
import { useKeyboard } from '../hooks/useKeyboard';

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
}

/**
 * Fonction de coloration syntaxique pour l'éditeur
 * Analyse le code et retourne des éléments JSX colorés selon le type de token
 *
 * @param code - Le code source de l'algorithme à colorer
 * @param settings - Paramètres de coloration syntaxique
 * @returns Éléments JSX avec coloration syntaxique
 */
function highlightSyntax(code: string, settings: any) {
  // Si la coloration est désactivée, retourner le code tel quel
  if (!settings.syntaxHighlighting) {
    return <span>{code}</span>;
  }
  const keywords = [
    'Algorithme', 'Variables', 'Constantes', 'Debut', 'Fin',
    'Si', 'Alors', 'Sinon', 'FinSi',
    'Pour', 'De', 'A', 'Faire', 'FinPour',
    'TantQue', 'FinTantQue', 'Repeter', 'Jusqua',
    'Selon', 'Cas', 'Defaut', 'FinSelon',
    'Fonction', 'Procedure', 'Retourner',
    'Structure', 'Enregistrement', 'FinStructure', 'FinEnregistrement',
    'Lire', 'Ecrire', 'ET', 'OU', 'NON'
  ];

  const types = ['Entier', 'Reel', 'Chaine', 'Caractere', 'Booleen', 'Tableau'];
  const values = ['Vrai', 'Faux'];

  // Remplacer <- par ← et != par ≠
  let highlighted = code.replace(/<-/g, '←').replace(/!=/g, '≠');

  // Découper le code en segments (tokens)
  const tokens: { type: string; value: string }[] = [];
  let currentPos = 0;

  while (currentPos < highlighted.length) {
    let matched = false;

    // Vérifier les commentaires
    if (highlighted.substring(currentPos).startsWith('//')) {
      const lineEnd = highlighted.indexOf('\n', currentPos);
      const commentEnd = lineEnd === -1 ? highlighted.length : lineEnd;
      tokens.push({ type: 'comment', value: highlighted.substring(currentPos, commentEnd) });
      currentPos = commentEnd;
      matched = true;
      continue;
    }

    // Vérifier les chaînes de caractères
    if (highlighted[currentPos] === '"') {
      const stringEnd = highlighted.indexOf('"', currentPos + 1);
      if (stringEnd !== -1) {
        tokens.push({ type: 'string', value: highlighted.substring(currentPos, stringEnd + 1) });
        currentPos = stringEnd + 1;
        matched = true;
        continue;
      }
    }

    // Vérifier les mots-clés, types et valeurs
    for (const keyword of keywords) {
      if (highlighted.substring(currentPos).toLowerCase().startsWith(keyword.toLowerCase())) {
        const prevChar = currentPos > 0 ? highlighted[currentPos - 1] : '';
        const nextChar = highlighted[currentPos + keyword.length] ?? '';
        const isPrevAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(prevChar);
        const isNextAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(nextChar);

        // Vérifier que ce n'est pas dans un autre mot
        if (!isPrevAlpha && !isNextAlpha) {
          // Cas spécial pour "Algorithme" : doit être en début de ligne
          if (keyword === 'Algorithme') {
            // Chercher le début de la ligne
            let lineStart = currentPos;
            while (lineStart > 0 && highlighted[lineStart - 1] !== '\n') {
              lineStart--;
            }
            // Vérifier qu'il n'y a que des espaces avant "Algorithme"
            const beforeAlgo = highlighted.substring(lineStart, currentPos).trim();
            if (beforeAlgo === '') {
              tokens.push({ type: 'keyword', value: highlighted.substring(currentPos, currentPos + keyword.length) });
              currentPos += keyword.length;
              matched = true;
              break;
            }
          } else {
            tokens.push({ type: 'keyword', value: highlighted.substring(currentPos, currentPos + keyword.length) });
            currentPos += keyword.length;
            matched = true;
            break;
          }
        }
      }
    }
    if (matched) continue;

    for (const type of types) {
      if (highlighted.substring(currentPos).toLowerCase().startsWith(type.toLowerCase())) {
        const prevChar = currentPos > 0 ? highlighted[currentPos - 1] : '';
        const nextChar = highlighted[currentPos + type.length] ?? '';
        const isPrevAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(prevChar);
        const isNextAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(nextChar);

        if (!isPrevAlpha && !isNextAlpha) {
          tokens.push({ type: 'type', value: highlighted.substring(currentPos, currentPos + type.length) });
          currentPos += type.length;
          matched = true;
          break;
        }
      }
    }
    if (matched) continue;

    for (const value of values) {
      if (highlighted.substring(currentPos).toLowerCase().startsWith(value.toLowerCase())) {
        const prevChar = currentPos > 0 ? highlighted[currentPos - 1] : '';
        const nextChar = highlighted[currentPos + value.length] ?? '';
        const isPrevAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(prevChar);
        const isNextAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(nextChar);

        if (!isPrevAlpha && !isNextAlpha) {
          tokens.push({ type: 'boolean', value: highlighted.substring(currentPos, currentPos + value.length) });
          currentPos += value.length;
          matched = true;
          break;
        }
      }
    }
    if (matched) continue;

    // Vérifier les nombres (mais pas dans les identifiants)
    const numberMatch = highlighted.substring(currentPos).match(/^(\d+\.?\d*)/);
    if (numberMatch) {
      // Vérifier que ce n'est pas dans un identifiant
      const prevChar = currentPos > 0 ? highlighted[currentPos - 1] : '';
      const nextChar = highlighted[currentPos + numberMatch[1].length] || '';
      const isPrevAlpha = /[a-zA-Z_éèêàâùûôîïç]/.test(prevChar);
      const isNextAlpha = /[a-zA-Z_éèêàâùûôîïç]/.test(nextChar);

      if (!isPrevAlpha && !isNextAlpha) {
        tokens.push({ type: 'number', value: numberMatch[1] });
        currentPos += numberMatch[1].length;
        continue;
      }
    }

    // Vérifier la flèche d'affectation
    if (highlighted[currentPos] === '←') {
      tokens.push({ type: 'arrow', value: '←' });
      currentPos++;
      continue;
    }

    // Vérifier les opérateurs
    if (/[+\-*/%=!<>]/.test(highlighted[currentPos])) {
      tokens.push({ type: 'operator', value: highlighted[currentPos] });
      currentPos++;
      continue;
    }

    // Par défaut : texte normal
    tokens.push({ type: 'text', value: highlighted[currentPos] });
    currentPos++;
  }

  // Convertir les tokens en JSX avec respect des paramètres et couleurs personnalisées
  return (
    <span>
      {tokens.map((token, i) => {
        // Appliquer les couleurs personnalisées si la coloration est activée pour ce type
        let style: React.CSSProperties = {};

        if (token.type === 'keyword' && settings.highlightKeywords) {
          style.color = settings.colorKeywords;
          style.fontWeight = 'bold';
        } else if (token.type === 'type' && settings.highlightTypes) {
          style.color = settings.colorTypes;
          style.fontWeight = 'bold';
        } else if (token.type === 'number' && settings.highlightNumbers) {
          style.color = settings.colorNumbers;
        } else if (token.type === 'string' && settings.highlightStrings) {
          style.color = settings.colorStrings;
        } else if (token.type === 'comment' && settings.highlightComments) {
          style.color = settings.colorComments;
          style.fontStyle = 'italic';
        } else if (token.type === 'boolean' && settings.highlightKeywords) {
          style.color = settings.colorBooleans;
          style.fontWeight = 'bold';
        } else if (token.type === 'arrow') {
          style.color = settings.colorArrow;
          style.fontWeight = 'bold';
        }

        return (
          <span key={i} style={style}>
            {token.value}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Composant principal de l'interpréteur AlgoGénie
 *
 * Gère l'éditeur de code, l'exécution des algorithmes, les entrées/sorties,
 * et les opérations de sauvegarde/chargement de fichiers.
 */
function CodeEditor() {
  // Récupérer les paramètres
  const { settings } = useSettings();

  // État du code de l'algorithme (avec exemple par défaut)
  const [code, setCode] = useState(`Algorithme MonAlgorithme
Variables x, y : Entier

Debut
  Ecrire("Entrez un nombre:\\n")
  Lire(x)
  y <- x * 2
  Ecrire("Le double de ", x, " est ", y, "\\n")
Fin`);

  // États pour l'exécution
  const [output, setOutput] = useState<string[]>([]);                // Sorties de l'algorithme
  const [error, setError] = useState<string | null>(null);           // Message d'erreur éventuel
  const [isRunning, setIsRunning] = useState(false);                 // Indique si l'exécution est en cours
  const [executionTime, setExecutionTime] = useState<number>();      // Temps d'exécution

  // États pour la modal d'entrée
  const [currentInputRequest, setCurrentInputRequest] = useState<InputRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
   * Gère la soumission d'une modal d'entrée
   */
  const handleModalSubmit = async (values: string[]) => {
    setIsModalOpen(false);

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
  const handleModalCancel = () => {
    setIsModalOpen(false);
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
Variables

Debut

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

    // Écouter les requêtes d'entrée
    const unlistenInputRequest = listen<InputRequest>('input-request', (event) => {
      console.log('Requête d\'entrée reçue:', event.payload);
      setCurrentInputRequest(event.payload);
      setIsModalOpen(true);
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
      unlistenInputRequest.then(fn => fn());
      unlistenExecutionComplete.then(fn => fn());
    };
  }, []);

  /**
   * Raccourcis clavier
   */
  useKeyboard([
    {
      key: 'Enter',
      ctrl: true,
      callback: executeAlgorithm,
    },
    {
      key: 's',
      ctrl: true,
      callback: saveFile,
    },
    {
      key: 'o',
      ctrl: true,
      callback: openFile,
    },
    {
      key: 'n',
      ctrl: true,
      callback: newFile,
    },
    {
      key: 'l',
      ctrl: true,
      callback: clearConsole,
    },
  ]);

  return (
    <div className="flex flex-col h-full">
      {/* Barre d'actions */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
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

            <div className="h-6 w-px bg-gray-300"></div>

            <button
              onClick={newFile}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2"
              title="Nouveau (Ctrl+N)"
            >
              <File size={16} />
              <span>Nouveau</span>
            </button>

            <button
              onClick={openFile}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2"
              title="Ouvrir (Ctrl+O)"
            >
              <FolderOpen size={16} />
              <span>Ouvrir</span>
            </button>

            <button
              onClick={saveFile}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2"
              title="Sauvegarder (Ctrl+S)"
            >
              <Save size={16} />
              <span>Sauvegarder</span>
            </button>
          </div>

          <div className="text-xs text-gray-500">
            Tapez <code className="bg-gray-100 px-1 py-0.5">&lt;-</code> pour <code className="bg-gray-100 px-1 py-0.5">←</code> |
            <code className="bg-gray-100 px-1 py-0.5 ml-1">!=</code> pour <code className="bg-gray-100 px-1 py-0.5">≠</code>
          </div>
        </div>
      </div>

      {/* Layout principal avec SplitPane */}
      <div className="flex-1 overflow-hidden">
        <SplitPane
          left={
            <div className="h-full flex flex-col bg-gray-50">
              <div className="px-6 py-3 bg-gray-100 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Code size={16} />
                  <span>Éditeur</span>
                </h2>
              </div>
              <div className="flex-1 overflow-auto bg-gray-900 flex">
                {/* Numéros de ligne */}
                <div
                  className="select-none bg-gray-800 text-gray-500 border-r border-gray-700"
                  style={{
                    fontSize: settings.fontSize,
                    lineHeight: 1.5,
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    textAlign: 'right',
                    minWidth: '50px'
                  }}
                >
                  {code.split('\n').map((_, index) => (
                    <div key={index} style={{ height: `${settings.fontSize * 1.5}px` }}>
                      {index + 1}
                    </div>
                  ))}
                </div>

                {/* Éditeur de code */}
                <div className="flex-1">
                  <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlightSyntax(code, settings)}
                    padding={20}
                    tabSize={settings.tabSize}
                    insertSpaces={true}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: settings.fontSize,
                      lineHeight: 1.5,
                      backgroundColor: '#111827',
                      color: '#e5e7eb',
                      minHeight: '100%',
                      caretColor: 'white'
                    }}
                  />
                </div>
              </div>
            </div>
          }
          right={
            <Console
              output={output}
              error={error}
              isRunning={isRunning}
              executionTime={executionTime}
              onClear={clearConsole}
            />
          }
          defaultSplit={55}
          minSize={30}
        />
      </div>

      {/* Modal pour les entrées interactives */}
      {isModalOpen && currentInputRequest && (
        <InputModal
          isOpen={isModalOpen}
          prompt={currentInputRequest.prompt || "Entrez les valeurs"}
          variables={currentInputRequest.variables}
          onSubmit={handleModalSubmit}
          onCancel={handleModalCancel}
        />
      )}
    </div>
  );
}

export default CodeEditor;
