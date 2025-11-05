/**
 * Composant Console - Interface de sortie
 *
 * Console avec tabs pour séparer :
 * - Sortie : Résultats de l'exécution
 * - Erreurs : Messages d'erreur détaillés
 */

import { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, AlertCircle, CheckCircle, Trash2, Loader2 } from 'lucide-react';

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
  // Nouvelles props pour le mode console
  inputRequest: InputRequest | null;
  onInputSubmit: (values: string[]) => void;
  onInputCancel: () => void;
}

type TabType = 'output' | 'errors';

/**
 * Composant Console avec interface à onglets
 *
 * @param output - Lignes de sortie de l'algorithme
 * @param error - Message d'erreur éventuel
 * @param isRunning - Indique si l'algorithme est en cours d'exécution
 * @param executionTime - Temps d'exécution en secondes
 * @param onClear - Callback pour effacer la console
 * @param position - Position actuelle de la console
 * @param onPositionChange - Callback pour changer la position
 */
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

  // États pour le mode console
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDarkTheme = theme === 'dark';

  // Initialiser les valeurs d'entrée quand une requête arrive
  useEffect(() => {
    if (inputRequest) {
      setInputValues(new Array(inputRequest.variables.length).fill(''));
      setCurrentInputIndex(0);
      // Focus automatique sur le champ d'entrée et scroll vers le bas
      setTimeout(() => {
        inputRef.current?.focus();
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [inputRequest]);

  /**
   * Gère la soumission d'une valeur dans la console
   */
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRequest || !inputValues[currentInputIndex]?.trim()) return;

    // Passer à la variable suivante
    if (currentInputIndex < inputRequest.variables.length - 1) {
      setCurrentInputIndex(currentInputIndex + 1);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Toutes les valeurs ont été entrées, soumettre TOUTES au backend
      onInputSubmit(inputValues);
      setInputValues([]);
      setCurrentInputIndex(0);
    }
  };

  /**
   * Gère l'annulation de l'entrée (Échap)
   */
  const handleInputCancel = () => {
    onInputCancel();
    setInputValues([]);
    setCurrentInputIndex(0);
  };

  /**
   * Gère les touches spéciales dans le champ d'entrée
   */
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleInputCancel();
    }
  };

  /**
   * Ferme le menu de position quand on clique ailleurs
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isPositionMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('.console-position-menu')) {
          setIsPositionMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isPositionMenuOpen]);

  return (
    <div className={`flex flex-col h-full border-l ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Barre d'onglets */}
      <div className={`flex items-center justify-between border-b ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex">
          <button
            onClick={() => setActiveTab('output')}
            className={`
              px-4 py-2 text-sm font-medium transition-colors relative
              ${activeTab === 'output'
                ? `border-b-2 border-indigo-600 ${isDarkTheme ? 'text-indigo-400 bg-gray-800' : 'text-indigo-600 bg-white'}`
                : `${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
              }
            `}
          >
            <span className="flex items-center gap-2">
              <ArrowUp size={16} />
              <span>Sortie</span>
              {output.length > 0 && (
                <span className={`px-2 py-0.5 text-xs ${isDarkTheme ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                  {output.length}
                </span>
              )}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('errors')}
            className={`
              px-4 py-2 text-sm font-medium transition-colors relative
              ${activeTab === 'errors'
                ? `border-b-2 border-indigo-600 ${isDarkTheme ? 'text-indigo-400 bg-gray-800' : 'text-indigo-600 bg-white'}`
                : `${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
              }
            `}
          >
            <span className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>Erreurs</span>
              {error && (
                <span className={`px-2 py-0.5 text-xs ${isDarkTheme ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700'}`}>
                  1
                </span>
              )}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          {/* Menu de position */}
          <div className="relative console-position-menu">
            <button
              onClick={() => setIsPositionMenuOpen(!isPositionMenuOpen)}
              className={`px-3 py-1 text-sm transition-colors flex items-center gap-2 ${isDarkTheme ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              title="Position de la console"
            >
              {position === 'right' && <ArrowRight size={16} />}
              {position === 'left' && <ArrowLeft size={16} />}
              {position === 'top' && <ArrowUp size={16} />}
              {position === 'bottom' && <ArrowDown size={16} />}
            </button>

            {/* Menu déroulant */}
            {isPositionMenuOpen && (
              <div className={`absolute top-full right-0 mt-1 border rounded-md shadow-lg z-50 min-w-[120px] ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                <button
                  onClick={() => { onPositionChange('right'); setIsPositionMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2 ${position === 'right' ? (isDarkTheme ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-50 text-indigo-700') : (isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100')}`}
                >
                  <ArrowRight size={16} />
                  <span>Droite</span>
                </button>
                <button
                  onClick={() => { onPositionChange('left'); setIsPositionMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2 ${position === 'left' ? (isDarkTheme ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-50 text-indigo-700') : (isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100')}`}
                >
                  <ArrowLeft size={16} />
                  <span>Gauche</span>
                </button>
                <button
                  onClick={() => { onPositionChange('top'); setIsPositionMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2 ${position === 'top' ? (isDarkTheme ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-50 text-indigo-700') : (isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100')}`}
                >
                  <ArrowUp size={16} />
                  <span>Haut</span>
                </button>
                <button
                  onClick={() => { onPositionChange('bottom'); setIsPositionMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2 ${position === 'bottom' ? (isDarkTheme ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-50 text-indigo-700') : (isDarkTheme ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100')}`}
                >
                  <ArrowDown size={16} />
                  <span>Bas</span>
                </button>
              </div>
            )}
          </div>

          {/* Bouton Clear */}
          <button
            onClick={onClear}
            className={`px-3 py-1 mr-2 text-sm transition-colors flex items-center gap-2 ${isDarkTheme ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            title="Effacer (Ctrl+L)"
          >
            <Trash2 size={16} />
            <span>Effacer</span>
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-4">
        {/* Onglet Sortie */}
        {activeTab === 'output' && (
          <div className="space-y-0">
            {isRunning && (
              <div className={`flex items-center gap-2 px-3 py-2 ${isDarkTheme ? 'text-blue-400 bg-blue-900/50' : 'text-blue-600 bg-blue-50'}`}>
                <Loader2 className="animate-spin" size={16} />
                <span className="text-sm font-medium">Exécution en cours...</span>
              </div>
            )}

            {output.length === 0 && !isRunning && !inputRequest && (
              <div className={`text-center py-8 ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                <p className="text-sm">La sortie de l'algorithme apparaîtra ici</p>
                <p className="text-xs mt-2">Appuyez sur Ctrl+Enter pour exécuter</p>
              </div>
            )}

            {output.map((line, index) => (
              <div
                key={index}
                className={`font-mono text-sm px-2 leading-relaxed ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}
                style={{ paddingTop: '0.125rem', paddingBottom: '0.125rem' }}
              >
                {line}
              </div>
            ))}

            {/* Champ d'entrée intégré dans le flux (comme un vrai terminal) */}
            {inputRequest && (
              <div className={`font-mono text-sm px-2 py-0.5 border-l-2 animate-pulse ${isDarkTheme ? 'text-gray-200 bg-gray-700 border-indigo-500' : 'text-gray-800 bg-gray-50 border-indigo-500'}`}>
                <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
                  <span className={`animate-pulse ${isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'}`}>{'>'}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValues[currentInputIndex] || ''}
                    onChange={(e) => {
                      const newValues = [...inputValues];
                      newValues[currentInputIndex] = e.target.value;
                      setInputValues(newValues);
                    }}
                    onKeyDown={handleInputKeyDown}
                    className={`flex-1 bg-transparent border-none outline-none font-mono ${isDarkTheme ? 'text-gray-200 placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
                    placeholder={inputRequest.variables[currentInputIndex]}
                    autoComplete="off"
                  />
                </form>
                {inputRequest.variables.length > 1 && (
                  <div className={`text-xs mt-1 ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>
                    ({currentInputIndex + 1}/{inputRequest.variables.length}) • Entrée pour valider • Échap pour annuler
                  </div>
                )}
              </div>
            )}

            {!isRunning && output.length > 0 && executionTime !== undefined && !inputRequest && (
              <div className={`mt-4 flex items-center gap-2 px-3 py-2 border-l-4 ${isDarkTheme ? 'text-green-400 bg-green-900/50 border-green-500' : 'text-green-600 bg-green-50 border-green-500'}`}>
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Exécuté avec succès en {executionTime.toFixed(3)}s</span>
              </div>
            )}
          </div>
        )}

        {/* Onglet Erreurs */}
        {activeTab === 'errors' && (
          <div>
            {error ? (
              <div className={`border-l-4 border-red-500 p-4 ${isDarkTheme ? 'bg-red-900/50' : 'bg-red-50'}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={isDarkTheme ? 'text-red-400' : 'text-red-500'} size={24} />
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 ${isDarkTheme ? 'text-red-300' : 'text-red-900'}`}>Erreur d'exécution</h3>
                    <p className={`font-mono text-sm whitespace-pre-wrap ${isDarkTheme ? 'text-red-200' : 'text-red-800'}`}>{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`text-center py-8 ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                <CheckCircle size={48} className={`mx-auto mb-2 ${isDarkTheme ? 'text-green-500' : 'text-green-400'}`} />
                <p className="text-sm">Aucune erreur détectée</p>
                <p className="text-xs mt-2">Les erreurs d'exécution apparaîtront ici</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Console;
