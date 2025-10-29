/**
 * Composant Console - Interface de sortie et d'entrée
 *
 * Console avec tabs pour séparer :
 * - Sortie : Résultats de l'exécution
 * - Entrées : Valeurs à fournir pour Lire()
 * - Erreurs : Messages d'erreur détaillés
 */

import { useState } from 'react';
import { ArrowUp, ArrowDown, AlertCircle, CheckCircle, Trash2, Plus, Info, Loader2 } from 'lucide-react';

interface ConsoleProps {
  output: string[];
  error: string | null;
  isRunning: boolean;
  executionTime?: number;
  inputValues: string[];
  onInputChange: (values: string[]) => void;
  onClear: () => void;
}

type TabType = 'output' | 'input' | 'errors';

/**
 * Composant Console avec interface à onglets
 *
 * @param output - Lignes de sortie de l'algorithme
 * @param error - Message d'erreur éventuel
 * @param isRunning - Indique si l'algorithme est en cours d'exécution
 * @param executionTime - Temps d'exécution en secondes
 * @param inputValues - Valeurs d'entrée pour Lire()
 * @param onInputChange - Callback quand les entrées changent
 * @param onClear - Callback pour effacer la console
 */
function Console({
  output,
  error,
  isRunning,
  executionTime,
  inputValues,
  onInputChange,
  onClear,
}: ConsoleProps) {
  const [activeTab, setActiveTab] = useState<TabType>('output');

  /**
   * Met à jour une valeur d'entrée
   */
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputValues];
    newInputs[index] = value;
    onInputChange(newInputs);
  };

  /**
   * Ajoute une nouvelle ligne d'entrée
   */
  const handleAddInput = () => {
    onInputChange([...inputValues, '']);
  };

  /**
   * Supprime une ligne d'entrée
   */
  const handleRemoveInput = (index: number) => {
    const newInputs = inputValues.filter((_, i) => i !== index);
    onInputChange(newInputs);
  };

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
            onClick={() => setActiveTab('input')}
            className={`
              px-4 py-2 text-sm font-medium transition-colors relative
              ${activeTab === 'input'
                ? 'text-indigo-600 bg-white border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <ArrowDown size={16} />
              <span>Entrées</span>
              {inputValues.length > 0 && (
                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700">
                  {inputValues.length}
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

        {/* Onglet Entrées */}
        {activeTab === 'input' && (
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 px-4 py-3 flex items-start gap-2">
              <Info size={16} className="text-blue-900 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-900">
                <strong>Info :</strong> Entrez ici les valeurs que votre algorithme demandera avec <code className="bg-blue-100 px-1 py-0.5">Lire()</code>
              </p>
            </div>

            {inputValues.map((value, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium w-8">#{index + 1}</span>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                  placeholder="Valeur..."
                />
                <button
                  onClick={() => handleRemoveInput(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddInput}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 hover:border-indigo-500 text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              <span>Ajouter une entrée</span>
            </button>

            {inputValues.length === 0 && (
              <div className="text-gray-400 text-center py-8">
                <p className="text-sm">Aucune entrée configurée</p>
                <p className="text-xs mt-2">Cliquez sur "Ajouter" pour créer des valeurs d'entrée</p>
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
