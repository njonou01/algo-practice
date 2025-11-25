/**
 * Hook personnalisé pour gérer l'exécution des algorithmes
 */

import { useState, useRef, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import type { EditorFile } from '../contexts/EditorContext';

interface ExecutionResult {
  success: boolean;
  output: string[];
  error: string | null;
}

interface OutputUpdate {
  output: string[];
  current_line: string;
}

interface InputRequest {
  prompt: string;
  variables: string[];
  has_prompt: boolean;
  current_output: string[];
}

interface UseAlgorithmExecutionProps {
  activeFile: EditorFile | null;
}

export function useAlgorithmExecution({ activeFile }: UseAlgorithmExecutionProps) {
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>();
  const [currentInputRequest, setCurrentInputRequest] = useState<InputRequest | null>(null);

  const executingFileIdRef = useRef<string | null>(null);
  const activeFileRef = useRef(activeFile);
  activeFileRef.current = activeFile;

  // Setup event listeners
  useEffect(() => {
    const startTimeRef = { current: performance.now() };
    const listeners: (() => void)[] = [];

    const setupListeners = async () => {
      // Écouter les mises à jour d'output en temps réel
      const unlistenOutputUpdate = await listen<OutputUpdate>('output-update', (event) => {
        const { output: completeLines, current_line } = event.payload;
        const fullOutput = [...completeLines];
        if (current_line) {
          fullOutput.push(current_line);
        }
        setOutput(fullOutput);
      });
      listeners.push(unlistenOutputUpdate);

      // Écouter les requêtes d'entrée
      const unlistenInputRequest = await listen<InputRequest>('input-request', (event) => {
        const request = event.payload;
        setOutput(request.current_output);
        setCurrentInputRequest(request);
      });
      listeners.push(unlistenInputRequest);

      // Écouter les résultats d'exécution
      const unlistenExecutionComplete = await listen<ExecutionResult>('execution-complete', (event) => {
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

    return () => {
      listeners.forEach(fn => fn());
    };
  }, []);

  const executeAlgorithm = async () => {
    if (!activeFile) return;

    // Empêcher le double lancement
    if (isRunning) {
      console.warn('[WARN] Exécution déjà en cours, ignoré');
      return;
    }

    executingFileIdRef.current = activeFile.id;
    setOutput([]);
    setError(null);
    setIsRunning(true);

    try {
      await invoke("execute_algorithm_async", {
        code: activeFile.code,
      });
    } catch (err) {
      setError(`Erreur lors du lancement: ${err}`);
      setIsRunning(false);
      executingFileIdRef.current = null;
    }
  };

  const handleInputSubmit = async (values: string[]) => {
    setCurrentInputRequest(null);

    try {
      await invoke("send_input_values", { values });
    } catch (err) {
      setError(`Erreur lors de l'envoi des entrées: ${err}`);
      setIsRunning(false);
    }
  };

  const handleInputCancel = () => {
    setCurrentInputRequest(null);
    setIsRunning(false);
    setError("Exécution annulée par l'utilisateur");
  };

  const clearConsole = () => {
    setOutput([]);
    setError(null);
    setExecutionTime(undefined);
  };

  const stopExecution = async () => {
    // Si une requête d'entrée est en cours, envoyer des valeurs vides pour débloquer le backend
    if (currentInputRequest) {
      try {
        await invoke("send_input_values", { values: [] });
      } catch (err) {
        console.warn('[WARN] Erreur lors de l\'envoi des valeurs vides:', err);
      }
    }

    executingFileIdRef.current = null;
    setIsRunning(false);
    setCurrentInputRequest(null);
    setError("Exécution arrêtée par l'utilisateur");
  };

  return {
    output,
    error,
    isRunning,
    executionTime,
    currentInputRequest,
    executeAlgorithm,
    stopExecution,
    handleInputSubmit,
    handleInputCancel,
    clearConsole,
  };
}
