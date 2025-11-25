/**
 * Composant FileTabs - Barre d'onglets pour les fichiers ouverts
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
      const newName = editingName.trim().endsWith('.algo') ? editingName.trim() : `${editingName.trim()}.algo`;
      onTabRename(fileId, newName);
    }
    setEditingFileId(null);
  };

  const handleRenameCancel = () => {
    setEditingFileId(null);
  };

  return (
    <div className={`flex items-center overflow-x-auto border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
      {files.map((file) => {
        const isActive = file.id === activeFileId;
        const isEditing = editingFileId === file.id;

        const tabClasses = `
          group flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium cursor-pointer border-r transition-colors
          ${isActive
            ? (isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800')
            : (isDark ? 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200' : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-800')
          }
          ${isDark ? 'border-gray-700' : 'border-gray-200'}
        `;

        const dirtyIndicatorClasses = `w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors
          ${isActive ? 'bg-blue-500' : (isDark ? 'bg-gray-600' : 'bg-gray-400')}
        `;
        
        const inputClasses = `w-full bg-transparent outline-none ring-1 rounded px-1 py-0
          ${isDark ? 'ring-indigo-500 text-white' : 'ring-indigo-600 text-black'}
        `;

        return (
          <div key={file.id} onClick={() => !isEditing && onTabClick(file.id)} onDoubleClick={() => handleDoubleClick(file)} className={tabClasses}>
            {file.isDirty && !isEditing && <div className={dirtyIndicatorClasses}></div>}
            {isEditing ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => handleRenameSubmit(file.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenameSubmit(file.id);
                  if (e.key === 'Escape') handleRenameCancel();
                }}
                autoFocus
                className={inputClasses}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="truncate select-none">{file.name}</span>
            )}
            {!isEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(file.id);
                }}
                className={`p-0.5 rounded-full transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} ${isDark ? 'text-gray-500 hover:bg-gray-700 hover:text-white' : 'text-gray-400 hover:bg-gray-300 hover:text-gray-700'}`}
                title="Fermer"
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
