import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  autoSave: false,
  confirmBeforeRun: false,
  inputMode: 'modal',
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

  // Charger les paramètres au démarrage
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (e) {
        console.error('Erreur lors du chargement des paramètres:', e);
      }
    }
  }, []);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  const updateAllSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
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
