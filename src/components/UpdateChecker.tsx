import { Download, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

export function UpdateChecker({ isDarkTheme }: { isDarkTheme: boolean }) {
  const [checking, setChecking] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState('');
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<any>(null);

  const checkForUpdates = async () => {
    setChecking(true);
    setMessage('');
    setUpdateAvailable(false);

    try {
      const update = await check();

      if (update) {
        setUpdateAvailable(true);
        setUpdateInfo(update);
        setMessage(`Nouvelle version disponible : ${update.version}`);
      } else {
        setMessage('Vous utilisez la dernière version');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      setMessage('Erreur lors de la vérification des mises à jour');
    } finally {
      setChecking(false);
    }
  };

  const installUpdate = async () => {
    if (!updateInfo) return;

    setDownloading(true);
    setMessage('Téléchargement de la mise à jour...');

    try {
      await updateInfo.downloadAndInstall();
      setMessage('Mise à jour installée, redémarrage...');
      setTimeout(async () => {
        await relaunch();
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de l\'installation:', error);
      setMessage('Erreur lors de l\'installation de la mise à jour');
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
            Mises à jour automatiques
          </h3>
          <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
            Vérifier et installer les mises à jour d'AlgoGénie
          </p>
        </div>

        <button
          onClick={checkForUpdates}
          disabled={checking || downloading}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            isDarkTheme
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-700 disabled:text-gray-500'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-300 disabled:text-gray-500'
          }`}
        >
          {checking ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Vérification...
            </>
          ) : (
            <>
              <Download size={16} />
              Vérifier les mises à jour
            </>
          )}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${
          updateAvailable
            ? (isDarkTheme ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200')
            : message.includes('Erreur')
            ? (isDarkTheme ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200')
            : (isDarkTheme ? 'bg-green-900/30 border border-green-700' : 'bg-green-50 border border-green-200')
        }`}>
          {message.includes('Erreur') ? (
            <XCircle size={20} className={isDarkTheme ? 'text-red-400' : 'text-red-600'} />
          ) : updateAvailable ? (
            <Download size={20} className={isDarkTheme ? 'text-blue-400' : 'text-blue-600'} />
          ) : (
            <CheckCircle size={20} className={isDarkTheme ? 'text-green-400' : 'text-green-600'} />
          )}

          <div className="flex-1">
            <p className={`text-sm font-medium ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            }`}>
              {message}
            </p>

            {updateAvailable && updateInfo && (
              <div className="mt-3">
                <button
                  onClick={installUpdate}
                  disabled={downloading}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    downloading
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {downloading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Installation en cours...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Installer maintenant
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
