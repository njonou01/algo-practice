import { useState } from 'react';
import { Settings as SettingsIcon, Code2, Palette, Play, CheckCircle, RotateCw, Info } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

/**
 * Page Paramètres - Configuration de l'application
 */

function Settings() {
  const { settings, updateSetting, resetSettings } = useSettings();
  const [saved, setSaved] = useState(false);

  const handleReset = () => {
    resetSettings();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleUpdateSetting = <K extends keyof typeof settings>(key: K, value: typeof settings[K]) => {
    updateSetting(key, value);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <SettingsIcon size={32} />
            <span>Paramètres</span>
          </h1>
          <p className="text-gray-600">Personnalisez votre expérience AlgoGénie</p>
        </div>

        {/* Message de sauvegarde */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Paramètres sauvegardés avec succès !</span>
          </div>
        )}

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
                    value={settings.fontSize}
                    onChange={(e) => handleUpdateSetting('fontSize', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-gray-700 font-mono w-12 text-right">{settings.fontSize}px</span>
                </div>
              </div>

              {/* Taille de tabulation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taille de l'indentation (espaces)
                </label>
                <select
                  value={settings.tabSize}
                  onChange={(e) => handleUpdateSetting('tabSize', parseInt(e.target.value))}
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
                  onClick={() => handleUpdateSetting('autoIndent', !settings.autoIndent)}
                  className={`relative inline-flex h-6 w-11 items-center transition-colors ${
                    settings.autoIndent ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white transition-transform ${
                      settings.autoIndent ? 'translate-x-6' : 'translate-x-1'
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
                  onClick={() => handleUpdateSetting('syntaxHighlighting', !settings.syntaxHighlighting)}
                  className={`relative inline-flex h-6 w-11 items-center transition-colors ${
                    settings.syntaxHighlighting ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white transition-transform ${
                      settings.syntaxHighlighting ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {settings.syntaxHighlighting && (
                <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
                  {/* Mots-clés */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: settings.colorKeywords }} className="font-semibold">Algorithme</span>
                      <span className="text-sm text-gray-600">Mots-clés</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settings.colorKeywords}
                        onChange={(e) => handleUpdateSetting('colorKeywords', e.target.value)}
                        className="w-10 h-8 border border-gray-300 cursor-pointer"
                        title="Choisir la couleur"
                      />
                      <button
                        onClick={() => handleUpdateSetting('highlightKeywords', !settings.highlightKeywords)}
                        className={`relative inline-flex h-6 w-11 items-center transition-colors ${
                          settings.highlightKeywords ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition-transform ${
                            settings.highlightKeywords ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Types */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: settings.colorTypes }} className="font-semibold">Entier</span>
                      <span className="text-sm text-gray-600">Types de données</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settings.colorTypes}
                        onChange={(e) => handleUpdateSetting('colorTypes', e.target.value)}
                        className="w-10 h-8 border border-gray-300 cursor-pointer"
                        title="Choisir la couleur"
                      />
                      <button
                        onClick={() => handleUpdateSetting('highlightTypes', !settings.highlightTypes)}
                        className={`relative inline-flex h-6 w-11 items-center transition-colors ${
                          settings.highlightTypes ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition-transform ${
                            settings.highlightTypes ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Nombres */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: settings.colorNumbers }} className="font-semibold">42</span>
                      <span className="text-sm text-gray-600">Nombres</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settings.colorNumbers}
                        onChange={(e) => handleUpdateSetting('colorNumbers', e.target.value)}
                        className="w-10 h-8 border border-gray-300 cursor-pointer"
                        title="Choisir la couleur"
                      />
                      <button
                        onClick={() => handleUpdateSetting('highlightNumbers', !settings.highlightNumbers)}
                        className={`relative inline-flex h-6 w-11 items-center transition-colors ${
                          settings.highlightNumbers ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition-transform ${
                            settings.highlightNumbers ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Chaînes */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: settings.colorStrings }} className="font-semibold">"texte"</span>
                      <span className="text-sm text-gray-600">Chaînes de caractères</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settings.colorStrings}
                        onChange={(e) => handleUpdateSetting('colorStrings', e.target.value)}
                        className="w-10 h-8 border border-gray-300 cursor-pointer"
                        title="Choisir la couleur"
                      />
                      <button
                        onClick={() => handleUpdateSetting('highlightStrings', !settings.highlightStrings)}
                        className={`relative inline-flex h-6 w-11 items-center transition-colors ${
                          settings.highlightStrings ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition-transform ${
                            settings.highlightStrings ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Commentaires */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span style={{ color: settings.colorComments }} className="font-semibold">// commentaire</span>
                      <span className="text-sm text-gray-600">Commentaires</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settings.colorComments}
                        onChange={(e) => handleUpdateSetting('colorComments', e.target.value)}
                        className="w-10 h-8 border border-gray-300 cursor-pointer"
                        title="Choisir la couleur"
                      />
                      <button
                        onClick={() => handleUpdateSetting('highlightComments', !settings.highlightComments)}
                        className={`relative inline-flex h-6 w-11 items-center transition-colors ${
                          settings.highlightComments ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform bg-white transition-transform ${
                            settings.highlightComments ? 'translate-x-6' : 'translate-x-1'
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
                  onClick={() => handleUpdateSetting('autoSave', !settings.autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center transition-colors ${
                    settings.autoSave ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white transition-transform ${
                      settings.autoSave ? 'translate-x-6' : 'translate-x-1'
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
                  onClick={() => handleUpdateSetting('confirmBeforeRun', !settings.confirmBeforeRun)}
                  className={`relative inline-flex h-6 w-11 items-center transition-colors ${
                    settings.confirmBeforeRun ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform bg-white transition-transform ${
                      settings.confirmBeforeRun ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Bouton de réinitialisation */}
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium transition-colors flex items-center gap-2"
            >
              <RotateCw size={18} />
              <span>Réinitialiser les paramètres</span>
            </button>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 p-4 flex items-start gap-2">
            <Info size={16} className="text-blue-900 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-900">
              <strong>Astuce :</strong> Les paramètres sont sauvegardés automatiquement et localement dans votre navigateur.
              Ils seront conservés même après la fermeture de l'application.
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
