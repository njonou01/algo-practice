import { CheckCircle, Code2, Info, Palette, Play, RotateCw, Save, Settings as SettingsIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { AppSettings } from '../contexts/SettingsContext';
import { defaultSettings, useSettings } from '../contexts/SettingsContext';

/**
 * Page Paramètres - Configuration de l'application
 */

function Settings() {
  const { settings, updateSetting, updateAllSettings, resetSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Mettre à jour les paramètres locaux quand les paramètres globaux changent
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Détecter les changements
  useEffect(() => {
    const changed = JSON.stringify(localSettings) !== JSON.stringify(settings);
    setHasChanges(changed);
  }, [localSettings, settings]);

  const handleReset = () => {
    resetSettings();
    setLocalSettings(defaultSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleUpdateLocalSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Sauvegarder tous les paramètres en une seule fois
    updateAllSettings(localSettings);
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto relative">
      {/* Toast de confirmation */}
      {saved && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-green-600 text-white px-6 py-4 shadow-lg flex items-center gap-3 min-w-[300px]">
            <CheckCircle size={24} className="shrink-0" />
            <div>
              <p className="font-semibold">Paramètres enregistrés !</p>
              <p className="text-sm text-green-100">Vos modifications ont été sauvegardées</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <SettingsIcon size={32} />
            <span>Paramètres</span>
          </h1>
          <p className="text-gray-600">Personnalisez votre expérience AlgoGénie</p>
        </div>

        <div className="space-y-6">
          {/* Section Éditeur */}
          <section className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Code2 size={20} />
              <span>Éditeur de code</span>
            </h2>

            <div className="space-y-4">
              {/* Taille de police */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taille de la police
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="10"
                    max="24"
                    value={localSettings.fontSize}
                    onChange={(e) => handleUpdateLocalSetting('fontSize', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-gray-700 font-mono w-12 text-right">{localSettings.fontSize}px</span>
                </div>
              </div>

              {/* Taille de tabulation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taille de l'indentation (espaces)
                </label>
                <select
                  value={localSettings.tabSize}
                  onChange={(e) => handleUpdateLocalSetting('tabSize', parseInt(e.target.value))}
                  className="w-full border border-gray-300 px-3 py-2"
                >
                  <option value={2}>2 espaces</option>
                  <option value={4}>4 espaces</option>
                  <option value={8}>8 espaces</option>
                </select>
              </div>

              {/* Auto-indentation */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Auto-indentation</label>
                  <p className="text-xs text-gray-500">Indenter automatiquement le code</p>
                </div>
                <button
                  onClick={() => handleUpdateLocalSetting('autoIndent', !localSettings.autoIndent)}
                  className={`relative inline-flex h-6 w-11 items-center transition-colors ${localSettings.autoIndent ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white transition-transform ${localSettings.autoIndent ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Section Coloration syntaxique */}
          <section className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Palette size={20} />
              <span>Coloration syntaxique</span>
            </h2>

            <div className="space-y-4">
              {/* Activer/Désactiver */}
              <div className="flex items-center justify-between p-4 bg-gray-50">
                <div>
                  <label className="block text-sm font-medium text-gray-900">Activer la coloration syntaxique</label>
                  <p className="text-xs text-gray-500">Colorer automatiquement le code</p>
                </div>
                <button
                  onClick={() => handleUpdateLocalSetting('syntaxHighlighting', !localSettings.syntaxHighlighting)}
                  className={`relative inline-flex h-6 w-11 items-center transition-colors ${localSettings.syntaxHighlighting ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white transition-transform ${localSettings.syntaxHighlighting ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              {localSettings.syntaxHighlighting && (
                <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
                  {/* Mots-clés */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: localSettings.colorKeywords }} className="font-semibold">Algorithme</span>
                      <span className="text-sm text-gray-600">Mots-clés</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorKeywords}
                        onChange={(e) => handleUpdateLocalSetting('colorKeywords', e.target.value)}
                        className="w-10 h-8 border border-gray-300 cursor-pointer"
                        title="Choisir la couleur"
                      />
                      <button
                        onClick={() => handleUpdateLocalSetting('highlightKeywords', !localSettings.highlightKeywords)}
                        className={`relative inline-flex h-6 w-11 items-center transition-colors ${localSettings.highlightKeywords ? 'bg-indigo-600' : 'bg-gray-300'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition-transform ${localSettings.highlightKeywords ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Types */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: localSettings.colorTypes }} className="font-semibold">Entier</span>
                      <span className="text-sm text-gray-600">Types de données</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorTypes}
                        onChange={(e) => handleUpdateLocalSetting('colorTypes', e.target.value)}
                        className="w-10 h-8 border border-gray-300 cursor-pointer"
                        title="Choisir la couleur"
                      />
                      <button
                        onClick={() => handleUpdateLocalSetting('highlightTypes', !localSettings.highlightTypes)}
                        className={`relative inline-flex h-6 w-11 items-center transition-colors ${localSettings.highlightTypes ? 'bg-indigo-600' : 'bg-gray-300'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition-transform ${localSettings.highlightTypes ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Nombres */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: localSettings.colorNumbers }} className="font-semibold">42</span>
                      <span className="text-sm text-gray-600">Nombres</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorNumbers}
                        onChange={(e) => handleUpdateLocalSetting('colorNumbers', e.target.value)}
                        className="w-10 h-8 border border-gray-300 cursor-pointer"
                        title="Choisir la couleur"
                      />
                      <button
                        onClick={() => handleUpdateLocalSetting('highlightNumbers', !localSettings.highlightNumbers)}
                        className={`relative inline-flex h-6 w-11 items-center transition-colors ${localSettings.highlightNumbers ? 'bg-indigo-600' : 'bg-gray-300'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition-transform ${localSettings.highlightNumbers ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Chaînes */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: localSettings.colorStrings }} className="font-semibold">"texte"</span>
                      <span className="text-sm text-gray-600">Chaînes de caractères</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorStrings}
                        onChange={(e) => handleUpdateLocalSetting('colorStrings', e.target.value)}
                        className="w-10 h-8 border border-gray-300 cursor-pointer"
                        title="Choisir la couleur"
                      />
                      <button
                        onClick={() => handleUpdateLocalSetting('highlightStrings', !localSettings.highlightStrings)}
                        className={`relative inline-flex h-6 w-11 items-center transition-colors ${localSettings.highlightStrings ? 'bg-indigo-600' : 'bg-gray-300'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition-transform ${localSettings.highlightStrings ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Commentaires */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: localSettings.colorComments }} className="font-semibold">// commentaire</span>
                      <span className="text-sm text-gray-600">Commentaires</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorComments}
                        onChange={(e) => handleUpdateLocalSetting('colorComments', e.target.value)}
                        className="w-10 h-8 border border-gray-300 cursor-pointer"
                        title="Choisir la couleur"
                      />
                      <button
                        onClick={() => handleUpdateLocalSetting('highlightComments', !localSettings.highlightComments)}
                        className={`relative inline-flex h-6 w-11 items-center transition-colors ${localSettings.highlightComments ? 'bg-indigo-600' : 'bg-gray-300'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition-transform ${localSettings.highlightComments ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section Exécution */}
          <section className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Play size={20} />
              <span>Exécution</span>
            </h2>

            <div className="space-y-4">
              {/* Sauvegarde automatique */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sauvegarde automatique</label>
                  <p className="text-xs text-gray-500">Sauvegarder automatiquement avant l'exécution</p>
                </div>
                <button
                  onClick={() => handleUpdateLocalSetting('autoSave', !localSettings.autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center transition-colors ${localSettings.autoSave ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white transition-transform ${localSettings.autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              {/* Confirmation avant exécution */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirmation avant exécution</label>
                  <p className="text-xs text-gray-500">Demander confirmation avant de lancer l'algorithme</p>
                </div>
                <button
                  onClick={() => handleUpdateLocalSetting('confirmBeforeRun', !localSettings.confirmBeforeRun)}
                  className={`relative inline-flex h-6 w-11 items-center transition-colors ${localSettings.confirmBeforeRun ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white transition-transform ${localSettings.confirmBeforeRun ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Indicateur de modifications */}
          {hasChanges && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center gap-2">
                <Info size={20} className="text-yellow-700" />
                <div>
                  <p className="font-semibold text-yellow-900">Modifications non sauvegardées</p>
                  <p className="text-sm text-yellow-700">N'oubliez pas d'enregistrer vos changements</p>
                </div>
              </div>
            </div>
          )}

          {/* Boutons de contrôle */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleCancel}
              disabled={!hasChanges}
              className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 disabled:border-gray-200 text-gray-700 disabled:text-gray-400 font-medium transition-colors flex items-center gap-2 disabled:cursor-not-allowed"
            >
              <X size={18} />
              <span>Annuler</span>
            </button>

            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white disabled:text-gray-500 font-medium transition-colors flex items-center gap-2 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>Enregistrer</span>
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium transition-colors flex items-center gap-2"
            >
              <RotateCw size={18} />
              <span>Réinitialiser</span>
            </button>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 p-4 flex items-start gap-2">
            <Info size={16} className="text-blue-900 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-900">
              <strong>Astuce :</strong> Modifiez les paramètres puis cliquez sur "Enregistrer" pour appliquer les changements.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 pb-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              © 2025 <span className="font-semibold text-gray-900">Gaby Njonou</span> - AlgoGénie
            </p>
            <p className="text-xs text-gray-500 mt-1">Tous droits réservés</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
