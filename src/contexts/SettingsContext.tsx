import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Store } from '@tauri-apps/plugin-store';

export interface AppSettings {
  // Apparence
  theme: 'dark' | 'light';

  // Éditeur
  fontSize: number;
  tabSize: number;
  autoIndent: boolean;

  // Coloration syntaxique
  syntaxHighlighting: boolean;
  highlightKeywords: boolean;
  highlightTypes: boolean;
  highlightNumbers: boolean;
  highlightStrings: boolean;
  highlightComments: boolean;

  // Couleurs personnalisées
  colorKeywords: string;
  colorTypes: string;
  colorNumbers: string;
  colorStrings: string;
  colorComments: string;
  colorBooleans: string;
  colorArrow: string;
  colorFunctions: string;

  // Exécution
  autoSave: boolean;
  confirmBeforeRun: boolean;
  inputMode: 'modal' | 'console';
}

export const defaultSettings: AppSettings = {
  theme: 'dark',
  fontSize: 14,
  tabSize: 2,
  autoIndent: true,
  syntaxHighlighting: true,
  highlightKeywords: true,
  highlightTypes: true,
  highlightNumbers: true,
  highlightStrings: true,
  highlightComments: true,
  colorKeywords: '#a855f7',      // Violet
  colorTypes: '#3b82f6',          // Bleu
  colorNumbers: '#eab308',        // Jaune
  colorStrings: '#22c55e',        // Vert
  colorComments: '#6b7280',       // Gris
  colorBooleans: '#ec4899',       // Rose
  colorArrow: '#f97316',          // Orange
  colorFunctions: '#DCDCAA',      // Jaune doré (mode dark par défaut)
  autoSave: false,
  confirmBeforeRun: false,
  inputMode: 'console',
};

interface SettingsContextType {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  updateAllSettings: (newSettings: AppSettings) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [store, setStore] = useState<Store | null>(null);

  // Initialiser le store et charger les paramètres au démarrage
  useEffect(() => {
    async function initStore() {
      try {
        const storeInstance = await Store.load('settings.json');
        setStore(storeInstance);

        // Migrer depuis localStorage si nécessaire (première migration)
        const oldSettings = localStorage.getItem('appSettings');
        if (oldSettings) {
          try {
            const parsed = JSON.parse(oldSettings);
            // Sauvegarder dans le store
            for (const [key, value] of Object.entries(parsed)) {
              await storeInstance.set(key, value);
            }
            await storeInstance.save();
            // Supprimer de localStorage après migration
            localStorage.removeItem('appSettings');
            console.log('✅ Migration de localStorage vers tauri-plugin-store terminée');
          } catch (e) {
            console.error('Erreur lors de la migration:', e);
          }
        }

        // Charger tous les settings depuis le store
        const loadedSettings: Partial<AppSettings> = {};
        for (const key of Object.keys(defaultSettings)) {
          const value = await storeInstance.get(key);
          if (value !== null) {
            loadedSettings[key as keyof AppSettings] = value as any;
          }
        }

        // Fusionner avec les defaults
        setSettings({ ...defaultSettings, ...loadedSettings });
      } catch (e) {
        console.error('Erreur lors de l\'initialisation du store:', e);
      }
    }

    initStore();
  }, []);

  const updateSetting = async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    if (store) {
      try {
        await store.set(key, value);
        await store.save();
      } catch (e) {
        console.error('Erreur lors de la sauvegarde:', e);
      }
    }
  };

  const updateAllSettings = async (newSettings: AppSettings) => {
    setSettings(newSettings);

    if (store) {
      try {
        for (const [key, value] of Object.entries(newSettings)) {
          await store.set(key, value);
        }
        await store.save();
      } catch (e) {
        console.error('Erreur lors de la sauvegarde:', e);
      }
    }
  };

  const resetSettings = async () => {
    setSettings(defaultSettings);

    if (store) {
      try {
        for (const [key, value] of Object.entries(defaultSettings)) {
          await store.set(key, value);
        }
        await store.save();
      } catch (e) {
        console.error('Erreur lors de la réinitialisation:', e);
      }
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, updateAllSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
