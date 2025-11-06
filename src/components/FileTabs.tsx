/**
 * Composant FileTabs - Barre d'onglets pour les fichiers ouverts
 *
 * Affiche les onglets des fichiers ouverts avec :
 * - Nom du fichier
 * - Indicateur de modification (point)
 * - Bouton de fermeture
 * - Onglet actif mis en évidence
 * - Double-clic pour renommer
 */

import { X } from 'lucide-react';
import { useState } from 'react';
import { EditorFile } from '../contexts/EditorContext';

interface FileTabsProps {
  files: EditorFile[];
  activeFileId: string | null;
  onTabClick: (fileId: string) => void;
  onTabClose: (fileId: string) => void;
  onTabRename: (fileId: string, newName: string) => void;
  theme: 'dark' | 'light';
}

function FileTabs({ files, activeFileId, onTabClick, onTabClose, onTabRename, theme }: FileTabsProps) {
  const isDark = theme === 'dark';
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleDoubleClick = (file: EditorFile) => {
    setEditingFileId(file.id);
    setEditingName(file.name.replace('.algo', ''));
  };

  const handleRenameSubmit = (fileId: string) => {
    if (editingName.trim()) {
      const newName = editingName.trim().endsWith('.algo')
        ? editingName.trim()
        : `${editingName.trim()}.algo`;
      onTabRename(fileId, newName);
    }
    setEditingFileId(null);
    setEditingName('');
  };

  const handleRenameCancel = () => {
    setEditingFileId(null);
    setEditingName('');
  };

  return (
    <div className={`flex items-center overflow-x-auto border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
      {files.map((file) => {
        const isActive = file.id === activeFileId;
        const isEditing = editingFileId === file.id;

        return (
          <div
            key={file.id}
            onClick={() => !isEditing && onTabClick(file.id)}
            onDoubleClick={() => !isEditing && handleDoubleClick(file)}
            className={`
              group flex items-center gap-2 px-4 py-2.5 min-w-[120px] max-w-[200px] cursor-pointer
              border-r transition-colors relative
              ${isActive
                ? isDark
                  ? 'bg-gray-900 border-gray-700 text-gray-100'
                  : 'bg-white border-gray-200 text-gray-900'
                : isDark
                  ? 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-750 hover:text-gray-200'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
          >
            {/* Indicateur de fichier actif */}
            {isActive && (
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${isDark ? 'bg-indigo-500' : 'bg-indigo-600'}`}></div>
            )}

            {/* Indicateur de modification (point) */}
            {file.isDirty && !isEditing && (
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
            )}

            {/* Nom du fichier ou champ de saisie */}
            {isEditing ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => handleRenameSubmit(file.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameSubmit(file.id);
                  } else if (e.key === 'Escape') {
                    handleRenameCancel();
                  }
                }}
                autoFocus
                className={`
                  flex-1 text-sm font-medium px-1 py-0 rounded outline-none
                  ${isDark
                    ? 'bg-gray-800 text-gray-100 border border-indigo-500'
                    : 'bg-white text-gray-900 border border-indigo-600'
                  }
                `}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="flex-1 text-sm font-medium truncate select-none">
                {file.name}
              </span>
            )}

            {/* Bouton de fermeture */}
            {!isEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(file.id);
                }}
                className={`
                  flex-shrink-0 p-0.5 rounded transition-colors
                  ${isDark
                    ? 'hover:bg-gray-700 text-gray-500 hover:text-gray-200'
                    : 'hover:bg-gray-200 text-gray-400 hover:text-gray-700'
                  }
                  ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                `}
                title="Fermer (Ctrl+W)"
              >
                <X size={14} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FileTabs;
