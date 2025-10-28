/**
 * Page Exemples - Bibliothèque d'algorithmes prêts à l'emploi
 *
 * Affiche une collection d'algorithmes d'exemple organisés par difficulté
 * et catégorie. L'utilisateur peut copier un exemple et l'utiliser dans l'éditeur.
 */

import { useNavigate } from 'react-router-dom';
import { examples, AlgorithmExample, getExamplesByDifficulty } from '../utils/examples';
import { useState } from 'react';

/**
 * Composant de carte pour afficher un exemple d'algorithme
 */
function ExampleCard({ example, onUse }: { example: AlgorithmExample; onUse: (example: AlgorithmExample) => void }) {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 border-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    advanced: 'bg-red-100 text-red-800 border-red-300',
  };

  const difficultyLabels = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
  };

  return (
    <div className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-lg">{example.name}</h3>
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${difficultyColors[example.difficulty]}`}>
            {difficultyLabels[example.difficulty]}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">{example.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            📁 {example.category}
          </span>
          {example.input.length > 0 && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
              📥 {example.input.length} entrée{example.input.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        <button
          onClick={() => onUse(example)}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition-colors"
        >
          Utiliser cet exemple
        </button>
      </div>
    </div>
  );
}

/**
 * Page principale des exemples
 */
function Examples() {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  /**
   * Charge un exemple dans l'éditeur et redirige vers la page Interpréteur
   */
  const handleUseExample = (example: AlgorithmExample) => {
    // Sauvegarder l'exemple dans localStorage pour le récupérer dans Interpreter
    localStorage.setItem('loadedExample', JSON.stringify({
      code: example.code,
      input: example.input,
    }));

    // Rediriger vers l'interpréteur
    navigate('/');
  };

  // Filtrer les exemples par difficulté
  const filteredExamples = selectedDifficulty === 'all'
    ? examples
    : getExamplesByDifficulty(selectedDifficulty);

  const beginnerCount = getExamplesByDifficulty('beginner').length;
  const intermediateCount = getExamplesByDifficulty('intermediate').length;
  const advancedCount = getExamplesByDifficulty('advanced').length;

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            📚 Bibliothèque d'Exemples
          </h1>
          <p className="text-gray-600">
            Explorez notre collection d'algorithmes d'exemple pour apprendre et vous inspirer.
            Cliquez sur un exemple pour le charger directement dans l'éditeur.
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Filtrer par niveau:</span>
          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedDifficulty === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Tous ({examples.length})
          </button>
          <button
            onClick={() => setSelectedDifficulty('beginner')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedDifficulty === 'beginner'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            🟢 Débutant ({beginnerCount})
          </button>
          <button
            onClick={() => setSelectedDifficulty('intermediate')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedDifficulty === 'intermediate'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            🟡 Intermédiaire ({intermediateCount})
          </button>
          <button
            onClick={() => setSelectedDifficulty('advanced')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedDifficulty === 'advanced'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            🔴 Avancé ({advancedCount})
          </button>
        </div>

        {/* Grille d'exemples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.map((example) => (
            <ExampleCard
              key={example.id}
              example={example}
              onUse={handleUseExample}
            />
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredExamples.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun exemple trouvé pour ce niveau</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Examples;
