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
  inputMode: 'modal' | 'console';
  activeFile: EditorFile | null;
}

export function useAlgorithmExecution({ inputMode, activeFile }: UseAlgorithmExecutionProps) {
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>();
  const [currentInputRequest, setCurrentInputRequest] = useState<InputRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        if (inputMode === 'modal') {
          setIsModalOpen(true);
        }
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
  }, [inputMode]);

  const executeAlgorithm = async () => {
    if (!activeFile) return;

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
    setIsModalOpen(false);
    setCurrentInputRequest(null);

    try {
      await invoke("send_input_values", { values });
    } catch (err) {
      setError(`Erreur lors de l'envoi des entrées: ${err}`);
      setIsRunning(false);
    }
  };

  const handleInputCancel = () => {
    setIsModalOpen(false);
    setCurrentInputRequest(null);
    setIsRunning(false);
    setError("Exécution annulée par l'utilisateur");
  };

  const clearConsole = () => {
    setOutput([]);
    setError(null);
    setExecutionTime(undefined);
  };

  return {
    output,
    error,
    isRunning,
    executionTime,
    currentInputRequest,
    isModalOpen,
    executeAlgorithm,
    handleInputSubmit,
    handleInputCancel,
    clearConsole,
  };
}
