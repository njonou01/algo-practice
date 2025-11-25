/**
 * AlgoGénie - Interpréteur d'algorithmes en français
 *
 * Ce fichier contient le composant principal de l'interpréteur.
 * Il permet d'écrire, éditer, exécuter, sauvegarder et charger des algorithmes.
 */

import { Editor as MonacoEditor } from '@monaco-editor/react';
import { File, FolderOpen, Loader2, Maximize2, Minimize2, Play, Save, Wand2, Code, StopCircle } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import type * as monacoEditor from 'monaco-editor';
import type { Monaco } from '../types/monaco';
import Console from '../components/Console';
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
import { useAlgorithmExecution } from '../hooks/useAlgorithmExecution';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useFileOperations } from '../hooks/useFileOperations';


function CodeEditor() {
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

  const activeFile = getActiveFile();
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const {
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
  } = useAlgorithmExecution({ activeFile });

  const { saveCurrentFile, openFileDialog } = useFileOperations({
    activeFile,
    openFile,
    markFileSaved,
    onError: (err) => {
      console.error('[FILE ERROR]', err);
    },
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  type ConsolePosition = 'right' | 'left' | 'top' | 'bottom';
  const [consolePosition, setConsolePosition] = useState<ConsolePosition>('bottom');
  const isMonacoLoading = !isMonacoReady;

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        fontSize: settings.fontSize,
        tabSize: settings.tabSize,
      });
    }
  }, [settings.fontSize, settings.tabSize]);

  useEffect(() => {
    if (!settings.colorKeywords || !settings.colorTypes) {
      return;
    }
    if (monacoRef.current && isMonacoReady) {
      const darkTheme = createDynamicTheme(settings, 'dark');
      const lightTheme = createDynamicTheme(settings, 'light');
      monacoRef.current.editor.defineTheme('algorithm-dark', darkTheme);
      monacoRef.current.editor.defineTheme('algorithm-light', lightTheme);
      const themeName = settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light';
      monacoRef.current.editor.setTheme(themeName);
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

  const handleNewFile = () => {
    createNewFile();
    clearConsole();
  };

  const handleFormat = () => {
    if (!activeFile || !editorRef.current) return;
    const formatted = formatCode(activeFile.code, settings.tabSize);
    const editor = editorRef.current;
    const position = editor.getPosition();
    editor.setValue(formatted);
    updateFileCode(activeFile.id, formatted);
    if (position) {
      editor.setPosition(position);
    }
    editor.focus();
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await fullscreenRef.current?.requestFullscreen().catch(err => console.error(err));
    } else {
      await document.exitFullscreen().catch(err => console.error(err));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useKeyboardShortcuts({ activeFile, onSave: saveCurrentFile, onExecute: executeAlgorithm, onNew: handleNewFile, onOpen: openFileDialog });

  const isDarkTheme = settings.theme === 'dark';
  const iconButtonClasses = `p-2 rounded-md transition-colors ${isDarkTheme ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-800'}`;
  const dividerClasses = `h-6 w-px ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`;
  const hintCodeClasses = `px-1.5 py-1 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'}`;

  const editorSkeleton = (
    <div className={`h-full w-full relative ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`flex flex-col items-center gap-4 p-8 rounded-lg ${isDarkTheme ? 'bg-gray-900/80' : 'bg-white/80'}`}>
          <Loader2 className="animate-spin text-indigo-500" size={32} />
          <p className="font-medium">Chargement de l'éditeur...</p>
        </div>
      </div>
    </div>
  );

  const editorPanel = (
    <div className={`h-full flex flex-col ${isDarkTheme ? 'bg-gray-800' : 'bg-transparent'}`}>
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
      <div className="flex-1 flex overflow-hidden relative">
        {isMonacoLoading && activeFile && <div className="absolute inset-0 z-10">{editorSkeleton}</div>}
        {!activeFile ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-sm px-8">
              <Code size={48} className={`mx-auto mb-4 ${isDarkTheme ? 'text-gray-600' : 'text-gray-300'}`} strokeWidth={1.5} />
              <h2 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Commencez à coder</h2>
              <p className="text-sm mb-6">Créez un nouveau fichier ou ouvrez un algorithme existant.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={handleNewFile} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md flex items-center gap-2">
                  <File size={16} /> Nouveau
                </button>
                <button onClick={openFileDialog} className={`px-4 py-2 font-medium rounded-md flex items-center gap-2 ${isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                  <FolderOpen size={16} /> Ouvrir
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`flex-1 transition-opacity duration-300 ${isMonacoLoading ? 'opacity-0' : 'opacity-100'}`}>
            <MonacoEditor
              height="100%"
              language="algorithmique"
              path={activeFile.modelUri || `file:///${activeFile.id}.algo`}
              value={activeFile.code}
              onChange={(value) => updateFileCode(activeFile.id, value || '')}
              theme={settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light'}
              options={getMonacoOptions(settings)}
              loading={<div/>}
              onMount={(editor, monaco) => {
                editorRef.current = editor;
                monacoRef.current = monaco;
                if (!monaco.languages.getLanguages().some((lang: any) => lang.id === 'algorithmique')) {
                  monaco.languages.register({ id: 'algorithmique' });
                  monaco.languages.setMonarchTokensProvider('algorithmique', algorithmLanguageDefinition);
                  setupCompletionProvider(monaco);
                }
                const darkTheme = createDynamicTheme(settings, 'dark');
                const lightTheme = createDynamicTheme(settings, 'light');
                monaco.editor.defineTheme('algorithm-dark', darkTheme);
                monaco.editor.defineTheme('algorithm-light', lightTheme);
                monaco.editor.setTheme(settings.theme === 'dark' ? 'algorithm-dark' : 'algorithm-light');
                editor.focus();
                setMonacoReady(true);
              }}
            />
          </div>
        )}
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
      inputRequest={currentInputRequest}
      onInputSubmit={handleInputSubmit}
      onInputCancel={handleInputCancel}
    />
  );

  const isHorizontalSplit = ['left', 'right'].includes(consolePosition);
  const firstPanel = ['left', 'top'].includes(consolePosition) ? consolePanel : editorPanel;
  const secondPanel = ['left', 'top'].includes(consolePosition) ? editorPanel : consolePanel;

  return (
    <div ref={fullscreenRef} className="flex flex-col h-full">
      <div className={`border-b ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isRunning ? (
              <button
                onClick={executeAlgorithm}
                disabled={!activeFile}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white text-sm font-medium transition-colors disabled:cursor-not-allowed flex items-center gap-2 rounded-md"
                title="Exécuter (Ctrl+Enter)"
              >
                <Play size={16} />
                <span>Exécuter</span>
              </button>
            ) : (
              <button
                onClick={stopExecution}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors flex items-center gap-2 rounded-md"
                title="Arrêter l'exécution"
              >
                <StopCircle size={16} />
                <span>Arrêter</span>
              </button>
            )}
            <div className={dividerClasses}></div>
            <div className="flex items-center gap-1">
              <button onClick={handleNewFile} className={iconButtonClasses} title="Nouveau (Ctrl+N)"><File size={18} /></button>
              <button onClick={openFileDialog} className={iconButtonClasses} title="Ouvrir (Ctrl+O)"><FolderOpen size={18} /></button>
              <button onClick={saveCurrentFile} className={iconButtonClasses} title="Sauvegarder (Ctrl+S)"><Save size={18} /></button>
            </div>
            <div className={dividerClasses}></div>
            <div className="flex items-center gap-1">
              <button onClick={handleFormat} className={iconButtonClasses} title="Formater le code"><Wand2 size={18} /></button>
              <button onClick={toggleFullscreen} className={iconButtonClasses} title={isFullscreen ? "Quitter le plein écran (ESC)" : "Plein écran"}>
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Tapez <code className={hintCodeClasses}>&lt;-</code> pour <code className={hintCodeClasses}>←</code>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <SplitPane
          key={`${isFullscreen ? 'fullscreen' : 'normal'}-${consolePosition}`}
          left={firstPanel}
          right={secondPanel}
          direction={isHorizontalSplit ? 'horizontal' : 'vertical'}
          defaultSplit={isHorizontalSplit ? 55 : 60}
          minSize={30}
          theme={settings.theme}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
