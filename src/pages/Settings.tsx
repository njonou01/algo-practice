import { CheckCircle, Code2, Palette, Play, RotateCw, Save, Settings as SettingsIcon, Sun, Moon, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { AppSettings } from '../contexts/SettingsContext';
import { defaultSettings, useSettings } from '../contexts/SettingsContext';
import { UpdateChecker } from '../components/UpdateChecker';

const SettingRow = ({ label, description, children }: { label: string, description: string, children: React.ReactNode }) => {
  const { settings } = useSettings();
  const isDarkTheme = settings.theme === 'dark';
  return (
    <div className={`flex items-center justify-between py-5 border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="w-2/3 pr-8">
        <label className={`block text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{label}</label>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
      </div>
      <div className="w-1/3 flex justify-end">{children}</div>
    </div>
  );
};

const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => {
  const { settings } = useSettings();
  const isDarkTheme = settings.theme === 'dark';
  return (
    <section>
      <h2 className={`text-xl font-semibold mb-4 flex items-center gap-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
        <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>{icon}</div>
        {title}
      </h2>
      <div className={`rounded-xl border ${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6">{children}</div>
      </div>
    </section>
  );
};

const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => {
    return (
        <button onClick={onChange} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    );
};

function Settings() {
  const { settings, updateSetting, updateAllSettings, resetSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const isDarkTheme = localSettings.theme === 'dark';

  useEffect(() => { setLocalSettings(settings); }, [settings]);
  useEffect(() => { setHasChanges(JSON.stringify(localSettings) !== JSON.stringify(settings)); }, [localSettings, settings]);

  const handleReset = () => {
    resetSettings();
    setLocalSettings(defaultSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleUpdateLocalSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    if (key === 'theme') {
      updateSetting(key, value as any);
    }
  };

  const handleSave = () => {
    updateAllSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => setLocalSettings(settings);

  return (
    <div className={`h-full overflow-y-auto ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {saved && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-green-600 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3">
            <CheckCircle size={20} />
            <p className="font-semibold text-sm">Paramètres enregistrés !</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
            <div className={`inline-flex p-4 rounded-2xl mb-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-indigo-50'}`}>
                <SettingsIcon size={32} className={isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'} strokeWidth={1.5} />
            </div>
            <h1 className={`text-4xl font-extrabold mb-4 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Paramètres</h1>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Personnalisez votre expérience AlgoGénie.</p>
        </div>

        <div className="space-y-12">
          <Section title="Apparence" icon={<Palette size={20} className="text-indigo-500" />}>
            <SettingRow label="Thème" description="Choisissez entre le mode sombre et le mode clair.">
              <div className={`p-1 rounded-lg flex gap-1 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button onClick={() => handleUpdateLocalSetting('theme', 'dark')} className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 ${localSettings.theme === 'dark' ? 'bg-indigo-600 text-white' : ''}`}>
                  <Moon size={14} /> Sombre
                </button>
                <button onClick={() => handleUpdateLocalSetting('theme', 'light')} className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 ${localSettings.theme === 'light' ? 'bg-white text-gray-800 shadow-sm' : ''}`}>
                  <Sun size={14} /> Clair
                </button>
              </div>
            </SettingRow>
          </Section>

          <Section title="Éditeur" icon={<Code2 size={20} className="text-indigo-500" />}>
            <SettingRow label="Taille de la police" description="Ajustez la taille du texte dans l'éditeur.">
              <div className="flex items-center gap-3">
                <input type="range" min="10" max="24" value={localSettings.fontSize} onChange={e => handleUpdateLocalSetting('fontSize', parseInt(e.target.value))} className="w-32 accent-indigo-600" />
                <span className={`font-mono text-sm p-2 rounded-md ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'}`}>{localSettings.fontSize}px</span>
              </div>
            </SettingRow>
            <SettingRow label="Taille de l'indentation" description="Choisissez le nombre d'espaces pour une tabulation.">
                <select value={localSettings.tabSize} onChange={e => handleUpdateLocalSetting('tabSize', parseInt(e.target.value))} className={`px-3 py-2 text-sm border rounded-md transition-colors ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                    <option value={2}>2 espaces</option>
                    <option value={4}>4 espaces</option>
                    <option value={8}>8 espaces</option>
                </select>
            </SettingRow>
             <SettingRow label="Auto-indentation" description="Indenter automatiquement le code lors de l'écriture.">
                <ToggleSwitch checked={localSettings.autoIndent} onChange={() => handleUpdateLocalSetting('autoIndent', !localSettings.autoIndent)} />
            </SettingRow>
          </Section>

          <Section title="Exécution" icon={<Play size={20} className="text-indigo-500" />}>
            <SettingRow label="Sauvegarde automatique" description="Sauvegarder le fichier actif avant chaque exécution.">
                <ToggleSwitch checked={localSettings.autoSave} onChange={() => handleUpdateLocalSetting('autoSave', !localSettings.autoSave)} />
            </SettingRow>
          </Section>

          <Section title="Mises à jour" icon={<Download size={20} className="text-indigo-500" />}>
            <UpdateChecker isDarkTheme={isDarkTheme} />
          </Section>

          {hasChanges && (
            <div className={`sticky bottom-6 p-3 rounded-xl shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-5 fade-in duration-300 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-800'}`}>
                <p className="text-sm font-medium text-white">Vous avez des modifications non enregistrées.</p>
                <div className="flex gap-3">
                    <button onClick={handleCancel} className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-600 rounded-md">Annuler</button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md flex items-center gap-2"><Save size={16}/> Enregistrer</button>
                </div>
            </div>
          )}

          <div className={`pt-8 border-t flex justify-center ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
            <button onClick={handleReset} className={`px-5 py-2 text-sm font-medium flex items-center gap-2 rounded-md transition-colors ${isDarkTheme ? 'border border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border text-red-600 hover:bg-red-50'}`}>
                <RotateCw size={16}/> Réinitialiser tous les paramètres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;