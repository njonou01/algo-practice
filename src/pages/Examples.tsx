/**
 * Page Exemples - Bibliothèque d'algorithmes prêts à l'emploi
 *
 * Affiche une collection d'algorithmes d'exemple organisés par difficulté
 * et catégorie. L'utilisateur peut copier un exemple et l'utiliser dans l'éditeur.
 */

import { useNavigate } from 'react-router-dom';
import { examples, AlgorithmExample, getExamplesByDifficulty } from '../utils/examples';
import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useEditor } from '../contexts/EditorContext';

/**
 * Composant de carte pour afficher un exemple d'algorithme
 */
function ExampleCard({ example, onUse, isDarkTheme }: { example: AlgorithmExample; onUse: (example: AlgorithmExample) => void; isDarkTheme: boolean }) {
  const difficultyColors = {
    beginner: isDarkTheme ? 'bg-green-900 text-green-200 border-green-700' : 'bg-green-100 text-green-800 border-green-300',
    intermediate: isDarkTheme ? 'bg-yellow-900 text-yellow-200 border-yellow-700' : 'bg-yellow-100 text-yellow-800 border-yellow-300',
    advanced: isDarkTheme ? 'bg-red-900 text-red-200 border-red-700' : 'bg-red-100 text-red-800 border-red-300',
  };

  const difficultyLabels = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
  };

  return (
    <div className={`border rounded-lg hover:shadow-md transition-shadow overflow-hidden ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className={`font-semibold text-lg ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{example.name}</h3>
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${difficultyColors[example.difficulty]}`}>
            {difficultyLabels[example.difficulty]}
          </span>
        </div>

        <p className={`text-sm mb-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{example.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs px-2 py-1 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
            📁 {example.category}
          </span>
          {example.input.length > 0 && (
            <span className={`text-xs px-2 py-1 rounded ${isDarkTheme ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-700'}`}>
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
  const { settings } = useSettings();
  const { openFile, files } = useEditor();
  const isDarkTheme = settings.theme === 'dark';
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  /**
   * Charge un exemple dans l'éditeur et redirige vers la page Interpréteur
   */
  const handleUseExample = (example: AlgorithmExample) => {
    // Générer un nom de fichier unique pour l'exemple
    let finalFileName = `${example.name}.algo`;
    let counter = 2;

    // Si un fichier existe déjà avec ce nom, ajouter un suffixe
    while (files.find(f => f.name === finalFileName)) {
      const baseName = example.name;
      finalFileName = `${baseName} (${counter}).algo`;
      counter++;
    }

    // Générer un chemin unique pour l'exemple (pas un vrai chemin fichier)
    const examplePath = `example://${example.id || example.name.toLowerCase().replace(/\s+/g, '-')}`;

    console.log(`[EXAMPLE] Ouverture de l'exemple: ${finalFileName}`);

    // Ouvrir l'exemple comme un nouveau fichier
    // Le système de gestion des collisions dans EditorContext s'occupera du reste
    openFile(examplePath, example.code, finalFileName);

    // Sauvegarder aussi dans localStorage pour compatibilité avec l'ancien système
    localStorage.setItem('loadedExample', JSON.stringify({
      code: example.code,
      input: example.input,
      title: example.name,
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
    <div className={`flex-1 overflow-auto ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            [EXAMPLE] Bibliothèque d'Exemples
          </h1>
          <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>
            Explorez notre collection d'algorithmes d'exemple pour apprendre et vous inspirer.
            Cliquez sur un exemple pour le charger directement dans l'éditeur.
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Filtrer par niveau:</span>
          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedDifficulty === 'all'
                ? 'bg-indigo-600 text-white'
                : isDarkTheme ? 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Tous ({examples.length})
          </button>
          <button
            onClick={() => setSelectedDifficulty('beginner')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedDifficulty === 'beginner'
                ? 'bg-green-600 text-white'
                : isDarkTheme ? 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            🟢 Débutant ({beginnerCount})
          </button>
          <button
            onClick={() => setSelectedDifficulty('intermediate')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedDifficulty === 'intermediate'
                ? 'bg-yellow-600 text-white'
                : isDarkTheme ? 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            🟡 Intermédiaire ({intermediateCount})
          </button>
          <button
            onClick={() => setSelectedDifficulty('advanced')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedDifficulty === 'advanced'
                ? 'bg-red-600 text-white'
                : isDarkTheme ? 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
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
              isDarkTheme={isDarkTheme}
            />
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredExamples.length === 0 && (
          <div className="text-center py-12">
            <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-500'}>Aucun exemple trouvé pour ce niveau</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Examples;
