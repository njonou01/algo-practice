import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface InputModalProps {
  isOpen: boolean;
  prompt: string;
  variables: string[];
  onSubmit: (values: string[]) => void;
  onCancel: () => void;
}

export default function InputModal({ isOpen, prompt, variables, onSubmit, onCancel }: InputModalProps) {
  const [values, setValues] = useState<string[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Initialiser les valeurs vides
  useEffect(() => {
    if (isOpen) {
      setValues(new Array(variables.length).fill(''));
      // Focus sur le premier input après un court délai
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen, variables.length]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Vérifier que toutes les valeurs sont renseignées
    if (values.every(v => v.trim().length > 0)) {
      onSubmit(values);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < variables.length - 1) {
        // Passer au champ suivant
        const nextInput = document.getElementById(`input-${index + 1}`);
        nextInput?.focus();
      } else {
        // Soumettre si c'est le dernier champ et qu'il est rempli
        if (values.every(v => v.trim().length > 0)) {
          handleSubmit(e as any);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {prompt || "Entrer une valeur"}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Annuler (Échap)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-4">
            {variables.map((varName, index) => (
              <div key={index}>
                <label
                  htmlFor={`input-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {varName}
                </label>
                <input
                  ref={index === 0 ? firstInputRef : null}
                  id={`input-${index}`}
                  type="text"
                  value={values[index] || ''}
                  onChange={(e) => {
                    const newValues = [...values];
                    newValues[index] = e.target.value;
                    setValues(newValues);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder={`Entrez ${varName}`}
                  autoComplete="off"
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!values.every(v => v.trim().length > 0)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Valider
            </button>
          </div>
        </form>

        {/* Raccourci clavier */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <p className="text-xs text-gray-500">
            <span className="font-medium">Entrée</span> pour passer au champ suivant •
            <span className="font-medium"> Échap</span> pour annuler
          </p>
        </div>
      </div>
    </div>
  );
}
