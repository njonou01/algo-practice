import { Store } from '@tauri-apps/plugin-store';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

/**
 * Représente un fichier dans l'éditeur
 */
export interface EditorFile {
  id: string;           // UUID unique
  name: string;         // Nom affiché dans l'onglet
  path: string | null;  // Chemin du fichier (null si pas encore sauvegardé)
  code: string;         // Contenu du fichier
  isDirty: boolean;     // Modifié depuis la dernière sauvegarde
  modelUri?: string;    // URI du modèle Monaco (pour éviter les collisions)
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

  // Sauvegarder automatiquement les fichiers dans le store avec debounce
  useEffect(() => {
    if (!store || files.length === 0) return;

    const timer = setTimeout(async () => {
      try {
        await store.set('editorFiles', files);
        await store.set('activeFileId', activeFileId);
        await store.save();
      } catch (e) {
        console.error('Erreur lors de la sauvegarde des fichiers:', e);
      }
    }, 1000); // Debounce de 1 seconde

    return () => clearTimeout(timer);
  }, [files, activeFileId, store]);

  /**
   * Crée un nouveau fichier
   */
  const createNewFile = () => {
    const newId = generateId();
    const newFile: EditorFile = {
      id: newId,
      name: 'Sans titre.algo',
      path: null,
      modelUri: `file:///untitled-${newId}.algo`,
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
//   Ecrire(message, "\\n")
// FinProcedure

Constantes
  // PI <- 3.14159

Variables
  // x, y : Entier
  // resultat : Reel

Debut
  // Votre code ici
  Ecrire("Bonjour !\\n")

Fin`,
      isDirty: false,
    };
    setFiles([...files, newFile]);
    setActiveFileId(newFile.id);
  };

  /**
   * Ouvre un fichier existant avec gestion des collisions
   */
  const openFile = (path: string, code: string, name: string) => {
    try {
      // Validation du chemin
      if (!path || path.trim() === '') {
        console.warn('[WARN] Chemin de fichier vide, création d\'un fichier temporaire');
        path = `temp-${Date.now()}.algo`;
      }

      // Vérifier si le fichier est déjà ouvert par chemin
      const existingFileByPath = files.find(f => f.path === path);
      if (existingFileByPath) {
        console.log(`[INFO] Fichier déjà ouvert: ${name}, activation de l'onglet`);
        setActiveFileId(existingFileByPath.id);

        // Demander si l'utilisateur veut recharger le contenu
        if (existingFileByPath.code !== code && existingFileByPath.isDirty) {
          console.warn(`[WARN] Le fichier ${name} a des modifications non sauvegardées`);
          // TODO: Implémenter une modal de confirmation pour recharger
        } else if (existingFileByPath.code !== code) {
          // Recharger silencieusement si pas de modifications
          setFiles(files.map(f =>
            f.id === existingFileByPath.id
              ? { ...f, code, isDirty: false }
              : f
          ));
        }
        return;
      }

      // Vérifier collision de nom (même nom mais chemin différent)
      const existingFileByName = files.find(f => f.name === name && f.path !== path);
      if (existingFileByName) {
        console.log(`[WARN] Fichier avec le même nom déjà ouvert: ${name}, ajout d'un suffixe`);
        // Ajouter un suffixe pour éviter la confusion
        const baseName = name.replace(/\.algo$/, '');
        const newName = `${baseName} (2).algo`;
        name = newName;
      }

      // Générer un URI unique pour le modèle Monaco
      const modelUri = `file:///${path.replace(/\\/g, '/')}`;

      const newFile: EditorFile = {
        id: generateId(),
        name,
        path,
        code,
        isDirty: false,
        modelUri,
      };

      console.log(`[SUCCESS] Ouverture du fichier: ${name}`);
      setFiles([...files, newFile]);
      setActiveFileId(newFile.id);
    } catch (error) {
      console.error('[ERROR] Erreur lors de l\'ouverture du fichier:', error);
      // En cas d'erreur, on peut quand même essayer de créer un fichier avec le contenu
      const fallbackFile: EditorFile = {
        id: generateId(),
        name: 'Erreur-' + name,
        path: null,
        code: code || '',
        isDirty: true,
        modelUri: `file:///error-${Date.now()}.algo`,
      };
      setFiles([...files, fallbackFile]);
      setActiveFileId(fallbackFile.id);
    }
  };

  /**
   * Ferme un fichier et nettoie ses ressources
   */
  const closeFile = (fileId: string) => {
    const fileToClose = files.find(f => f.id === fileId);
    if (fileToClose) {
      console.log(`[CLOSE] Fermeture du fichier: ${fileToClose.name}`);

      // Note: Le nettoyage du modèle Monaco sera fait par le gestionnaire
      // quand le composant se démonte ou change de fichier
    }

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
