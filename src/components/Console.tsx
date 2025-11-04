/**
 * Composant Console - Interface de sortie
 *
 * Console avec tabs pour séparer :
 * - Sortie : Résultats de l'exécution
 * - Erreurs : Messages d'erreur détaillés
 */

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, AlertCircle, CheckCircle, Trash2, Loader2 } from 'lucide-react';

type ConsolePosition = 'right' | 'left' | 'top' | 'bottom';

interface ConsoleProps {
  output: string[];
  error: string | null;
  isRunning: boolean;
  executionTime?: number;
  onClear: () => void;
  position: ConsolePosition;
  onPositionChange: (position: ConsolePosition) => void;
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
}: ConsoleProps) {
  const [activeTab, setActiveTab] = useState<TabType>('output');
  const [isPositionMenuOpen, setIsPositionMenuOpen] = useState(false);

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
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* Barre d'onglets */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50">
        <div className="flex">
          <button
            onClick={() => setActiveTab('output')}
            className={`
              px-4 py-2 text-sm font-medium transition-colors relative
              ${activeTab === 'output'
                ? 'text-indigo-600 bg-white border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <ArrowUp size={16} />
              <span>Sortie</span>
              {output.length > 0 && (
                <span className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700">
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
                ? 'text-indigo-600 bg-white border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>Erreurs</span>
              {error && (
                <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700">
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
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2"
              title="Position de la console"
            >
              {position === 'right' && <ArrowRight size={16} />}
              {position === 'left' && <ArrowLeft size={16} />}
              {position === 'top' && <ArrowUp size={16} />}
              {position === 'bottom' && <ArrowDown size={16} />}
            </button>

            {/* Menu déroulant */}
            {isPositionMenuOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[120px]">
                <button
                  onClick={() => { onPositionChange('right'); setIsPositionMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2 ${position === 'right' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
                >
                  <ArrowRight size={16} />
                  <span>Droite</span>
                </button>
                <button
                  onClick={() => { onPositionChange('left'); setIsPositionMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2 ${position === 'left' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
                >
                  <ArrowLeft size={16} />
                  <span>Gauche</span>
                </button>
                <button
                  onClick={() => { onPositionChange('top'); setIsPositionMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2 ${position === 'top' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
                >
                  <ArrowUp size={16} />
                  <span>Haut</span>
                </button>
                <button
                  onClick={() => { onPositionChange('bottom'); setIsPositionMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2 ${position === 'bottom' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
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
            className="px-3 py-1 mr-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2"
            title="Effacer (Ctrl+L)"
          >
            <Trash2 size={16} />
            <span>Effacer</span>
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="flex-1 overflow-auto p-4">
        {/* Onglet Sortie */}
        {activeTab === 'output' && (
          <div className="space-y-2">
            {isRunning && (
              <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2">
                <Loader2 className="animate-spin" size={16} />
                <span className="text-sm font-medium">Exécution en cours...</span>
              </div>
            )}

            {output.length === 0 && !isRunning && (
              <div className="text-gray-400 text-center py-8">
                <p className="text-sm">La sortie de l'algorithme apparaîtra ici</p>
                <p className="text-xs mt-2">Appuyez sur Ctrl+Enter pour exécuter</p>
              </div>
            )}

            {output.map((line, index) => (
              <div
                key={index}
                className="font-mono text-sm text-gray-800 bg-gray-50 px-3 py-1 border-l-2 border-gray-300"
              >
                {line}
              </div>
            ))}

            {!isRunning && output.length > 0 && executionTime !== undefined && (
              <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 border-l-4 border-green-500">
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
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-red-500" size={24} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900 mb-2">Erreur d'exécution</h3>
                    <p className="font-mono text-sm text-red-800 whitespace-pre-wrap">{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                <CheckCircle size={48} className="mx-auto mb-2 text-green-400" />
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
