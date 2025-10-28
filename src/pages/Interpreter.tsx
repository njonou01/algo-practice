/**
 * AlgoGénie - Interpréteur d'algorithmes en français
 *
 * Ce fichier contient le composant principal de l'interpréteur.
 * Il permet d'écrire, éditer, exécuter, sauvegarder et charger des algorithmes.
 */

import { invoke } from "@tauri-apps/api/core";
import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { useState, useEffect } from "react";
import Editor from 'react-simple-code-editor';
import SplitPane from '../components/SplitPane';
import Console from '../components/Console';
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
 * Fonction de coloration syntaxique pour l'éditeur
 * Analyse le code et retourne des éléments JSX colorés selon le type de token
 *
 * @param code - Le code source de l'algorithme à colorer
 * @returns Éléments JSX avec coloration syntaxique
 */
function highlightSyntax(code: string) {
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

  // Remplacer <- par ←
  let highlighted = code.replace(/<-/g, '←');

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
        const nextChar = highlighted[currentPos + keyword.length];
        if (!nextChar || !/[a-zA-Z0-9]/.test(nextChar)) {
          tokens.push({ type: 'keyword', value: highlighted.substring(currentPos, currentPos + keyword.length) });
          currentPos += keyword.length;
          matched = true;
          break;
        }
      }
    }
    if (matched) continue;

    for (const type of types) {
      if (highlighted.substring(currentPos).toLowerCase().startsWith(type.toLowerCase())) {
        const nextChar = highlighted[currentPos + type.length];
        if (!nextChar || !/[a-zA-Z0-9]/.test(nextChar)) {
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
        const nextChar = highlighted[currentPos + value.length];
        if (!nextChar || !/[a-zA-Z0-9]/.test(nextChar)) {
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

  // Convertir les tokens en JSX
  return (
    <span>
      {tokens.map((token, i) => (
        <span key={i} className={token.type}>
          {token.value}
        </span>
      ))}
    </span>
  );
}

/**
 * Composant principal de l'interpréteur AlgoGénie
 *
 * Gère l'éditeur de code, l'exécution des algorithmes, les entrées/sorties,
 * et les opérations de sauvegarde/chargement de fichiers.
 */
function Interpreter() {
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
  const [inputValues, setInputValues] = useState<string[]>(["42"]);  // Valeurs d'entrée
  const [output, setOutput] = useState<string[]>([]);                // Sorties de l'algorithme
  const [error, setError] = useState<string | null>(null);           // Message d'erreur éventuel
  const [isRunning, setIsRunning] = useState(false);                 // Indique si l'exécution est en cours
  const [executionTime, setExecutionTime] = useState<number>();      // Temps d'exécution

  /**
   * Exécute l'algorithme en appelant le backend Rust via Tauri
   * Divise les entrées par ligne et envoie le code au backend pour exécution
   */
  const executeAlgorithm = async () => {
    setIsRunning(true);
    setOutput([]);
    setError(null);

    const startTime = performance.now();

    try {
      const filteredInputs = inputValues
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const result = await invoke<ExecutionResult>("execute_algorithm", {
        code: code,
        inputValues: filteredInputs,
      });

      const endTime = performance.now();
      setExecutionTime((endTime - startTime) / 1000);

      if (result.success) {
        setOutput(result.output);
        setError(null);
      } else {
        setError(result.error || "Erreur inconnue");
        setOutput([]);
      }
    } catch (err) {
      setError(`Erreur: ${err}`);
      setOutput([]);
    } finally {
      setIsRunning(false);
    }
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
    setInputValues([]);
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
        setInputValues(example.input || []);
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
              className="px-5 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white disabled:text-gray-500 text-sm font-medium rounded transition-colors disabled:cursor-not-allowed flex items-center gap-2"
              title="Exécuter (Ctrl+Enter)"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Exécution...</span>
                </>
              ) : (
                <>
                  <span>▶</span>
                  <span>Exécuter</span>
                </>
              )}
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <button
              onClick={newFile}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Nouveau (Ctrl+N)"
            >
              📄 Nouveau
            </button>

            <button
              onClick={openFile}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Ouvrir (Ctrl+O)"
            >
              📂 Ouvrir
            </button>

            <button
              onClick={saveFile}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Sauvegarder (Ctrl+S)"
            >
              💾 Sauvegarder
            </button>
          </div>

          <div className="text-xs text-gray-500">
            Tapez <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;-</code> pour <code className="bg-gray-100 px-1 py-0.5 rounded">←</code>
          </div>
        </div>
      </div>

      {/* Layout principal avec SplitPane */}
      <div className="flex-1 overflow-hidden">
        <SplitPane
          left={
            <div className="h-full flex flex-col bg-gray-50">
              <div className="px-6 py-3 bg-gray-100 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900">📝 Éditeur</h2>
              </div>
              <div className="flex-1 overflow-auto bg-gray-900">
                <Editor
                  value={code}
                  onValueChange={code => setCode(code)}
                  highlight={code => highlightSyntax(code)}
                  padding={20}
                  tabSize={2}
                  insertSpaces={true}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    lineHeight: 1.5,
                    backgroundColor: '#111827',
                    color: '#e5e7eb',
                    minHeight: '100%',
                    caretColor: 'white'
                  }}
                />
              </div>
            </div>
          }
          right={
            <Console
              output={output}
              error={error}
              isRunning={isRunning}
              executionTime={executionTime}
              inputValues={inputValues}
              onInputChange={setInputValues}
              onClear={clearConsole}
            />
          }
          defaultSplit={55}
          minSize={30}
        />
      </div>
    </div>
  );
}

export default Interpreter;
