/**
 * Page Exemples - Bibliothèque d'algorithmes prêts à l'emploi
 */

import { useNavigate } from 'react-router-dom';
import { examples, AlgorithmExample, getExamplesByDifficulty } from '../utils/examples';
import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useEditor } from '../contexts/EditorContext';
import { Code, Copy } from 'lucide-react';

function ExampleCard({ example, onUse, isDarkTheme }: { example: AlgorithmExample; onUse: (example: AlgorithmExample) => void; isDarkTheme: boolean }) {
  const difficultyStyles = {
    beginner: {
      label: 'Débutant',
      classes: isDarkTheme ? 'border-green-700/50 bg-green-900/50 text-green-300' : 'border-green-200 bg-green-50 text-green-700',
    },
    intermediate: {
      label: 'Intermédiaire',
      classes: isDarkTheme ? 'border-yellow-700/50 bg-yellow-900/50 text-yellow-300' : 'border-yellow-200 bg-yellow-50 text-yellow-700',
    },
    advanced: {
      label: 'Avancé',
      classes: isDarkTheme ? 'border-red-700/50 bg-red-900/50 text-red-300' : 'border-red-200 bg-red-50 text-red-700',
    },
  };

  const style = difficultyStyles[example.difficulty];

  return (
    <div className={`group relative border rounded-lg overflow-hidden transition-all duration-300
      ${isDarkTheme ? 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:shadow-2xl hover:shadow-gray-900/50' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'}`}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-semibold text-base ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{example.name}</h3>
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${style.classes}`}>{style.label}</span>
        </div>
        <p className={`text-sm mb-4 flex-grow ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>{example.description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
            {example.category}
          </span>
          <button
            onClick={() => onUse(example)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-200"
          >
            <Copy size={14} /> Utiliser
          </button>
        </div>
      </div>
    </div>
  );
}

function Examples() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { openFile, files } = useEditor();
  const isDarkTheme = settings.theme === 'dark';
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const handleUseExample = (example: AlgorithmExample) => {
    let finalFileName = `${example.name}.algo`;
    let counter = 2;
    while (files.find(f => f.name === finalFileName)) {
      finalFileName = `${example.name} (${counter}).algo`;
      counter++;
    }
    const examplePath = `example://${example.id || example.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    openFile(examplePath, example.code, finalFileName);
    navigate('/');
  };

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'] as const;
  const counts = {
    all: examples.length,
    beginner: getExamplesByDifficulty('beginner').length,
    intermediate: getExamplesByDifficulty('intermediate').length,
    advanced: getExamplesByDifficulty('advanced').length,
  };
  const labels = { all: 'Tous', beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé' };
  
  const filteredExamples = selectedDifficulty === 'all' ? examples : getExamplesByDifficulty(selectedDifficulty);

  return (
    <div className={`flex-1 overflow-auto ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-800/50'}`}>
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="text-center mb-10">
          <Code size={40} className={`mx-auto mb-4 ${isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'}`} strokeWidth={1.5} />
          <h1 className={`text-3xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Bibliothèque d'Exemples</h1>
          <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>
            Explorez, apprenez et inspirez-vous avec notre collection d'algorithmes.
          </p>
        </div>

        <div className={`flex justify-center mb-8 p-1 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {difficulties.map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors w-36
                ${selectedDifficulty === difficulty
                  ? `text-white ${isDarkTheme ? 'bg-indigo-600' : 'bg-indigo-600'}`
                  : `${isDarkTheme ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'}`
                }`}
            >
              {labels[difficulty]} ({counts[difficulty]})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExamples.map((example) => (
            <ExampleCard key={example.id} example={example} onUse={handleUseExample} isDarkTheme={isDarkTheme} />
          ))}
        </div>

        {filteredExamples.length === 0 && (
          <div className="text-center py-16">
            <p className={isDarkTheme ? 'text-gray-500' : 'text-gray-400'}>Aucun exemple trouvé pour ce niveau.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Examples;
