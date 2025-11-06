import { CheckCircle, Code2, Info, Moon, Palette, Play, RotateCw, Save, Settings as SettingsIcon, Sun, X } from 'lucide-react';
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

  const isDarkTheme = localSettings.theme === 'dark';

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

    // Appliquer immédiatement certains changements
    if (key === 'theme') {
      updateSetting('theme', value as 'dark' | 'light');
    }
    if (key === 'inputMode') {
      updateSetting('inputMode', value as 'modal' | 'console');
    }
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
    <div className={`h-full overflow-y-auto relative ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
          <h1 className={`text-3xl font-bold mb-2 flex items-center gap-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            <SettingsIcon size={32} />
            <span>Paramètres</span>
          </h1>
          <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Personnalisez votre expérience AlgoGénie</p>
        </div>

        <div className="space-y-6">
          {/* Section Apparence */}
          <section className={`border p-6 ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              <Palette size={20} />
              <span>Apparence</span>
            </h2>

            <div className="space-y-4">
              {/* Thème */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                  Thème
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleUpdateLocalSetting('theme', 'dark')}
                    className={`
                      p-4 border-2 rounded-lg transition-all flex items-center gap-3
                      ${localSettings.theme === 'dark'
                        ? (isDarkTheme ? 'border-indigo-500 bg-indigo-900 shadow-md' : 'border-indigo-600 bg-indigo-50 shadow-md')
                        : (isDarkTheme ? 'border-gray-600 bg-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400 bg-white')
                      }
                    `}
                  >
                    <Moon size={20} className={localSettings.theme === 'dark' ? (isDarkTheme ? 'text-indigo-300' : 'text-indigo-600') : (isDarkTheme ? 'text-gray-400' : 'text-gray-600')} />
                    <div className="text-left">
                      <div className={`font-semibold ${localSettings.theme === 'dark' ? (isDarkTheme ? 'text-indigo-300' : 'text-indigo-900') : (isDarkTheme ? 'text-gray-300' : 'text-gray-900')}`}>
                        Mode sombre
                      </div>
                      <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Recommandé pour les yeux</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleUpdateLocalSetting('theme', 'light')}
                    className={`
                      p-4 border-2 rounded-lg transition-all flex items-center gap-3
                      ${localSettings.theme === 'light'
                        ? (isDarkTheme ? 'border-indigo-500 bg-indigo-900 shadow-md' : 'border-indigo-600 bg-indigo-50 shadow-md')
                        : (isDarkTheme ? 'border-gray-600 bg-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400 bg-white')
                      }
                    `}
                  >
                    <Sun size={20} className={localSettings.theme === 'light' ? (isDarkTheme ? 'text-indigo-300' : 'text-indigo-600') : (isDarkTheme ? 'text-gray-400' : 'text-gray-600')} />
                    <div className="text-left">
                      <div className={`font-semibold ${localSettings.theme === 'light' ? (isDarkTheme ? 'text-indigo-300' : 'text-indigo-900') : (isDarkTheme ? 'text-gray-300' : 'text-gray-900')}`}>
                        Mode clair
                      </div>
                      <div className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Plus de luminosité</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section Éditeur */}
          <section className={`border p-6 ${isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDarkTheme ? "text-white" : "text-gray-900"}`}>
              <Code2 size={20} />
              <span>Éditeur de code</span>
            </h2>

            <div className="space-y-4">
              {/* Taille de police */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
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
                  <span className={`font-mono w-12 text-right ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>{localSettings.fontSize}px</span>
                </div>
              </div>

              {/* Taille de tabulation */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
                  Taille de l'indentation (espaces)
                </label>
                <select
                  value={localSettings.tabSize}
                  onChange={(e) => handleUpdateLocalSetting('tabSize', parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border rounded transition-colors ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={isDarkTheme ? { colorScheme: 'dark' } : {}}
                >
                  <option value={2} style={isDarkTheme ? { backgroundColor: '#374151', color: 'white' } : {}}>2 espaces</option>
                  <option value={4} style={isDarkTheme ? { backgroundColor: '#374151', color: 'white' } : {}}>4 espaces</option>
                  <option value={8} style={isDarkTheme ? { backgroundColor: '#374151', color: 'white' } : {}}>8 espaces</option>
                </select>
              </div>

              {/* Auto-indentation */}
              <div className="flex items-center justify-between">
                <div>
                  <label className={`block text-sm font-medium ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>Auto-indentation</label>
                  <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Indenter automatiquement le code</p>
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
          <section className={`border p-6 ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              <Palette size={20} />
              <span>Coloration syntaxique</span>
            </h2>

            <div className="space-y-4">
              {/* Activer/Désactiver */}
              <div className={`flex items-center justify-between p-4 rounded ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div>
                  <label className={`block text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Activer la coloration syntaxique</label>
                  <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Colorer automatiquement le code</p>
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
                <div className={`ml-4 space-y-3 border-l-2 pl-4 ${isDarkTheme ? 'border-gray-600' : 'border-gray-200'}`}>
                  {/* Mots-clés */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: localSettings.colorKeywords }} className="font-semibold">Algorithme</span>
                      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Mots-clés</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorKeywords}
                        onChange={(e) => handleUpdateLocalSetting('colorKeywords', e.target.value)}
                        className={`w-10 h-8 border cursor-pointer rounded ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
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
                      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Types de données</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorTypes}
                        onChange={(e) => handleUpdateLocalSetting('colorTypes', e.target.value)}
                        className={`w-10 h-8 border cursor-pointer rounded ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
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
                      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Nombres</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorNumbers}
                        onChange={(e) => handleUpdateLocalSetting('colorNumbers', e.target.value)}
                        className={`w-10 h-8 border cursor-pointer rounded ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
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
                      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Chaînes de caractères</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorStrings}
                        onChange={(e) => handleUpdateLocalSetting('colorStrings', e.target.value)}
                        className={`w-10 h-8 border cursor-pointer rounded ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
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
                      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Commentaires</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorComments}
                        onChange={(e) => handleUpdateLocalSetting('colorComments', e.target.value)}
                        className={`w-10 h-8 border cursor-pointer rounded ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
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

                  {/* Fonctions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: localSettings.colorFunctions }} className="font-semibold italic">MaFonction()</span>
                      <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Appels de fonctions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localSettings.colorFunctions}
                        onChange={(e) => handleUpdateLocalSetting('colorFunctions', e.target.value)}
                        className={`w-10 h-8 border cursor-pointer rounded ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                        title="Choisir la couleur"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section Exécution */}
          <section className={`border p-6 ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              <Play size={20} />
              <span>Exécution</span>
            </h2>

            <div className="space-y-4">
              {/* Sauvegarde automatique */}
              <div className="flex items-center justify-between">
                <div>
                  <label className={`block text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Sauvegarde automatique</label>
                  <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Sauvegarder automatiquement avant l'exécution</p>
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
                  <label className={`block text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Confirmation avant exécution</label>
                  <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Demander confirmation avant de lancer l'algorithme</p>
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

              {/* Mode d'entrée */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                  Mode d'entrée (Lire/Écrire)
                </label>
                <p className={`text-xs mb-3 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                  Choisissez comment afficher les entrées utilisateur
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleUpdateLocalSetting('inputMode', 'modal')}
                    className={`
                      p-4 border-2 rounded-lg transition-all
                      ${localSettings.inputMode === 'modal'
                        ? (isDarkTheme ? 'border-indigo-500 bg-indigo-900 shadow-md' : 'border-indigo-600 bg-indigo-50 shadow-md')
                        : (isDarkTheme ? 'border-gray-600 bg-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400 bg-white')
                      }
                    `}
                  >
                    <div className="text-left">
                      <div className={`font-semibold ${localSettings.inputMode === 'modal' ? (isDarkTheme ? 'text-indigo-300' : 'text-indigo-900') : (isDarkTheme ? 'text-gray-300' : 'text-gray-900')}`}>
                        Fenêtre popup
                      </div>
                      <div className={`text-xs mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Afficher dans une modal</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleUpdateLocalSetting('inputMode', 'console')}
                    className={`
                      p-4 border-2 rounded-lg transition-all
                      ${localSettings.inputMode === 'console'
                        ? (isDarkTheme ? 'border-indigo-500 bg-indigo-900 shadow-md' : 'border-indigo-600 bg-indigo-50 shadow-md')
                        : (isDarkTheme ? 'border-gray-600 bg-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400 bg-white')
                      }
                    `}
                  >
                    <div className="text-left">
                      <div className={`font-semibold ${localSettings.inputMode === 'console' ? (isDarkTheme ? 'text-indigo-300' : 'text-indigo-900') : (isDarkTheme ? 'text-gray-300' : 'text-gray-900')}`}>
                        Dans la console
                      </div>
                      <div className={`text-xs mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Comme un vrai langage</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Indicateur de modifications */}
          {hasChanges && (
            <div className={`border-l-4 p-4 ${isDarkTheme ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-400'}`}>
              <div className="flex items-center gap-2">
                <Info size={20} className={isDarkTheme ? 'text-yellow-500' : 'text-yellow-700'} />
                <div>
                  <p className={`font-semibold ${isDarkTheme ? 'text-yellow-400' : 'text-yellow-900'}`}>Modifications non sauvegardées</p>
                  <p className={`text-sm ${isDarkTheme ? 'text-yellow-300' : 'text-yellow-700'}`}>N'oubliez pas d'enregistrer vos changements</p>
                </div>
              </div>
            </div>
          )}

          {/* Boutons de contrôle */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleCancel}
              disabled={!hasChanges}
              className={`px-6 py-3 border-2 font-medium transition-colors flex items-center gap-2 disabled:cursor-not-allowed ${isDarkTheme ? 'border-gray-600 hover:border-gray-500 disabled:border-gray-700 text-gray-300 disabled:text-gray-500' : 'border-gray-300 hover:border-gray-400 disabled:border-gray-200 text-gray-700 disabled:text-gray-400'}`}
            >
              <X size={18} />
              <span>Annuler</span>
            </button>

            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`px-6 py-3 text-white font-medium transition-colors flex items-center gap-2 disabled:cursor-not-allowed ${isDarkTheme ? 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:text-gray-500' : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500'}`}
            >
              <Save size={18} />
              <span>Enregistrer</span>
            </button>

            <button
              onClick={handleReset}
              className={`px-6 py-3 border-2 font-medium transition-colors flex items-center gap-2 ${isDarkTheme ? 'border-gray-600 hover:border-gray-500 text-gray-300' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
            >
              <RotateCw size={18} />
              <span>Réinitialiser</span>
            </button>
          </div>

          {/* Info */}
          <div className={`border p-4 flex items-start gap-2 ${isDarkTheme ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
            <Info size={16} className={`mt-0.5 shrink-0 ${isDarkTheme ? 'text-blue-400' : 'text-blue-900'}`} />
            <p className={`text-sm ${isDarkTheme ? 'text-blue-300' : 'text-blue-900'}`}>
              <strong>Astuce :</strong> Modifiez les paramètres puis cliquez sur "Enregistrer" pour appliquer les changements.
            </p>
          </div>

          {/* Copyright */}
          <div className={`text-center pt-8 pb-4 border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 <span className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Gaby Njonou</span> - AlgoGénie
            </p>
            <p className={`text-xs mt-1 ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>Tous droits réservés</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
