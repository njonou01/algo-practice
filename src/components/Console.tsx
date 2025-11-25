/**
 * Composant Console - Interface de sortie
 */

import { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Trash2, Loader2, Terminal, ChevronUp, Send } from 'lucide-react';

type ConsolePosition = 'right' | 'left' | 'top' | 'bottom';

interface InputRequest {
  prompt: string;
  variables: string[];
  has_prompt: boolean;
}

interface ConsoleProps {
  output: string[];
  error: string | null;
  isRunning: boolean;
  executionTime?: number;
  onClear: () => void;
  position: ConsolePosition;
  onPositionChange: (position: ConsolePosition) => void;
  theme: 'dark' | 'light';
  inputRequest: InputRequest | null;
  onInputSubmit: (values: string[]) => void;
  onInputCancel: () => void;
}

type TabType = 'output' | 'errors';

function Console({
  output,
  error,
  isRunning,
  executionTime,
  onClear,
  position,
  onPositionChange,
  theme,
  inputRequest,
  onInputSubmit,
  onInputCancel,
}: ConsoleProps) {
  const [activeTab, setActiveTab] = useState<TabType>('output');
  const [isPositionMenuOpen, setIsPositionMenuOpen] = useState(false);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output, isRunning]);

  useEffect(() => {
    if (inputRequest) {
      setInputValues(new Array(inputRequest.variables.length).fill(''));
      setCurrentInputIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 100);
    }
  }, [inputRequest]);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRequest || !inputValues[currentInputIndex]?.trim()) return;
    if (currentInputIndex < inputRequest.variables.length - 1) {
      setCurrentInputIndex(currentInputIndex + 1);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      onInputSubmit(inputValues);
      setInputValues([]);
      setCurrentInputIndex(0);
    }
  };

  const handleInputCancel = () => {
    onInputCancel();
    setInputValues([]);
    setCurrentInputIndex(0);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInputSubmit(e as any);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleInputCancel();
    }
  };
  
  const handleConsoleClick = () => {
    if (inputRequest && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const tabButtonClasses = (tab: TabType) => `
    px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2
    ${activeTab === tab
      ? (isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-800')
      : (isDarkTheme ? 'text-gray-400 hover:bg-gray-700/50 hover:text-white' : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-800')
    }`;

  const iconButtonClasses = `p-2 rounded-md transition-colors ${isDarkTheme ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-800'}`;

  return (
    <div className={`flex flex-col h-full ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className={`flex items-center justify-between border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex">
          <button onClick={() => setActiveTab('output')} className={tabButtonClasses('output')}>
            <Terminal size={16} />
            <span>Sortie</span>
          </button>
          <button onClick={() => setActiveTab('errors')} className={tabButtonClasses('errors')}>
            <AlertTriangle size={16} />
            <span>Erreurs</span>
            {error && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
          </button>
        </div>
        <div className="flex items-center gap-1 pr-2">
          <div className="relative">
            <button onClick={() => setIsPositionMenuOpen(prev => !prev)} onBlur={() => setTimeout(() => setIsPositionMenuOpen(false), 150)} className={iconButtonClasses} title="Position de la console">
              <ChevronUp size={16} />
            </button>
            {isPositionMenuOpen && (
              <div className={`absolute bottom-full right-0 mb-2 p-1 border rounded-md shadow-lg z-10 ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                 <div className="grid grid-cols-2 gap-1">
                    <button onClick={() => { onPositionChange('top'); setIsPositionMenuOpen(false); }} className={`p-2 rounded ${position === 'top' ? 'bg-indigo-600 text-white' : iconButtonClasses}`}><ArrowUp size={16} /></button>
                    <button onClick={() => { onPositionChange('bottom'); setIsPositionMenuOpen(false); }} className={`p-2 rounded ${position === 'bottom' ? 'bg-indigo-600 text-white' : iconButtonClasses}`}><ArrowDown size={16} /></button>
                    <button onClick={() => { onPositionChange('left'); setIsPositionMenuOpen(false); }} className={`p-2 rounded ${position === 'left' ? 'bg-indigo-600 text-white' : iconButtonClasses}`}><ArrowLeft size={16} /></button>
                    <button onClick={() => { onPositionChange('right'); setIsPositionMenuOpen(false); }} className={`p-2 rounded ${position === 'right' ? 'bg-indigo-600 text-white' : iconButtonClasses}`}><ArrowRight size={16} /></button>
                 </div>
              </div>
            )}
          </div>
          <button onClick={onClear} className={iconButtonClasses} title="Effacer la console">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className={`flex-1 overflow-auto p-4 font-mono text-sm ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`} onClick={handleConsoleClick}>
        {activeTab === 'output' ? (
          <div className="space-y-2">
            {isRunning && <div className={`flex items-center gap-2 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}><Loader2 className="animate-spin" size={14} />Exécution...</div>}
            {output.length === 0 && !isRunning && !inputRequest && <div className={`${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>La sortie apparaîtra ici.</div>}
            {output.map((line, index) => <pre key={index} className={`whitespace-pre-wrap ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>{line}</pre>)}
            {inputRequest && (
              <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
                <span className={`pr-2 ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>{'>'}</span>
                <input ref={inputRef} type="text" value={inputValues[currentInputIndex] || ''} onChange={(e) => setInputValues(v => { const n = [...v]; n[currentInputIndex] = e.target.value; return n; })} onKeyDown={handleInputKeyDown} className={`flex-1 bg-transparent outline-none ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`} placeholder={inputRequest.variables[currentInputIndex]} autoComplete="off" />
                <button
                  type="submit"
                  disabled={!inputValues[currentInputIndex]?.trim()}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    inputValues[currentInputIndex]?.trim()
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  title="Valider (Entrée)"
                >
                  <Send size={14} />
                  <span>Valider</span>
                </button>
              </form>
            )}
            {!isRunning && output.length > 0 && executionTime !== undefined && !inputRequest && (
              <div className={`mt-3 flex items-center gap-2 ${isDarkTheme ? 'text-green-400' : 'text-green-600'}`}><CheckCircle size={14} />Exécuté en {executionTime.toFixed(3)}s</div>
            )}
          </div>
        ) : (
          <div>
            {error ? (
              <div className={`border-l-4 p-4 ${isDarkTheme ? 'border-red-500 bg-red-900/20' : 'border-red-500 bg-red-50'}`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className={isDarkTheme ? 'text-red-400' : 'text-red-500'} size={20} />
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${isDarkTheme ? 'text-red-300' : 'text-red-800'}`}>Erreur d'exécution</h3>
                    <pre className={`whitespace-pre-wrap ${isDarkTheme ? 'text-red-200' : 'text-red-700'}`}>{error}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`text-center py-8 ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                <CheckCircle size={32} className={`mx-auto mb-2 ${isDarkTheme ? 'text-green-500' : 'text-green-400'}`} />
                <p>Aucune erreur détectée.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Console;
