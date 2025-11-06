import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Store } from '@tauri-apps/plugin-store';

/**
 * Représente un fichier dans l'éditeur
 */
export interface EditorFile {
  id: string;           // UUID unique
  name: string;         // Nom affiché dans l'onglet
  path: string | null;  // Chemin du fichier (null si pas encore sauvegardé)
  code: string;         // Contenu du fichier
  isDirty: boolean;     // Modifié depuis la dernière sauvegarde
}

interface EditorContextType {
  files: EditorFile[];
  activeFileId: string | null;

  // Gestion des fichiers
  createNewFile: () => void;
  openFile: (path: string, code: string, name: string) => void;
  closeFile: (fileId: string) => void;
  setActiveFile: (fileId: string) => void;
  renameFile: (fileId: string, newName: string) => void;

  // Modification du code
  updateFileCode: (fileId: string, code: string) => void;

  // Sauvegarde
  markFileSaved: (fileId: string, path: string) => void;

  // État de Monaco
  isMonacoReady: boolean;
  setMonacoReady: (ready: boolean) => void;

  // Helper pour obtenir le fichier actif
  getActiveFile: () => EditorFile | null;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

/**
 * Génère un UUID simple
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function EditorProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<EditorFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [isMonacoReady, setMonacoReady] = useState(false);

  // Initialiser le store et charger les fichiers sauvegardés
  useEffect(() => {
    async function initStore() {
      try {
        const storeInstance = await Store.load('settings.json');
        setStore(storeInstance);

        // Charger les fichiers depuis le store
        const savedFiles = await storeInstance.get('editorFiles');
        const savedActiveId = await storeInstance.get('activeFileId');

        if (savedFiles && Array.isArray(savedFiles) && savedFiles.length > 0) {
          setFiles(savedFiles);
          setActiveFileId(savedActiveId as string || savedFiles[0].id);
        } else {
          // Démarrer sans fichier
          setFiles([]);
          setActiveFileId(null);
        }
      } catch (e) {
        console.error('Erreur lors du chargement des fichiers:', e);
        // Démarrer sans fichier en cas d'erreur
        setFiles([]);
        setActiveFileId(null);
      }
    }

    initStore();
  }, []);

  // Sauvegarder automatiquement les fichiers dans le store
  useEffect(() => {
    if (store && files.length > 0) {
      const saveFiles = async () => {
        try {
          await store.set('editorFiles', files);
          await store.set('activeFileId', activeFileId);
          await store.save();
        } catch (e) {
          console.error('Erreur lors de la sauvegarde des fichiers:', e);
        }
      };
      saveFiles();
    }
  }, [files, activeFileId, store]);

  /**
   * Crée un nouveau fichier
   */
  const createNewFile = () => {
    const newFile: EditorFile = {
      id: generateId(),
      name: 'Sans titre.algo',
      path: null,
      code: `Algorithme NouvelAlgorithme

// Définir une structure de données
// Enregistrement Personne
//   nom : Chaine
//   age : Entier
// FinEnregistrement

// Définir une fonction
// Fonction Calculer(x : Entier, y : Entier) : Entier
// DebutFonction
//   Retourner x + y
// FinFonction

// Définir une procédure
// Procedure Afficher(message : Chaine)
// DebutProcedure
//   Ecrire(message, "\n")
// FinProcedure

Constantes
  // PI <- 3.14159

Variables
  // x, y : Entier
  // resultat : Reel

Debut
  // Votre code ici
  Ecrire("Bonjour !\n")

Fin`,
      isDirty: false,
    };
    setFiles([...files, newFile]);
    setActiveFileId(newFile.id);
  };

  /**
   * Ouvre un fichier existant
   */
  const openFile = (path: string, code: string, name: string) => {
    // Vérifier si le fichier est déjà ouvert
    const existingFile = files.find(f => f.path === path);
    if (existingFile) {
      setActiveFileId(existingFile.id);
      return;
    }

    const newFile: EditorFile = {
      id: generateId(),
      name,
      path,
      code,
      isDirty: false,
    };
    setFiles([...files, newFile]);
    setActiveFileId(newFile.id);
  };

  /**
   * Ferme un fichier
   */
  const closeFile = (fileId: string) => {
    const newFiles = files.filter(f => f.id !== fileId);

    // Permettre de fermer tous les fichiers
    setFiles(newFiles);

    // Si on ferme le fichier actif, sélectionner un autre fichier ou null
    if (activeFileId === fileId) {
      if (newFiles.length > 0) {
        const fileIndex = files.findIndex(f => f.id === fileId);
        const nextFile = newFiles[Math.max(0, fileIndex - 1)];
        setActiveFileId(nextFile.id);
      } else {
        setActiveFileId(null);
      }
    }
  };

  /**
   * Met à jour le code d'un fichier
   */
  const updateFileCode = (fileId: string, code: string) => {
    setFiles(files.map(f =>
      f.id === fileId
        ? { ...f, code, isDirty: true }
        : f
    ));
  };

  /**
   * Marque un fichier comme sauvegardé
   */
  const markFileSaved = (fileId: string, path: string) => {
    setFiles(files.map(f =>
      f.id === fileId
        ? { ...f, path, isDirty: false, name: path.split('/').pop() || path.split('\\').pop() || f.name }
        : f
    ));
  };

  /**
   * Renomme un fichier
   */
  const renameFile = (fileId: string, newName: string) => {
    setFiles(files.map(f =>
      f.id === fileId
        ? { ...f, name: newName, isDirty: true }
        : f
    ));
  };

  /**
   * Obtient le fichier actif
   */
  const getActiveFile = (): EditorFile | null => {
    return files.find(f => f.id === activeFileId) || null;
  };

  return (
    <EditorContext.Provider value={{
      files,
      activeFileId,
      createNewFile,
      openFile,
      closeFile,
      setActiveFile: setActiveFileId,
      renameFile,
      updateFileCode,
      markFileSaved,
      isMonacoReady,
      setMonacoReady,
      getActiveFile,
    }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
