/**
 * AlgoGénie - Composant de mise en page principal
 *
 * Ce fichier définit la structure globale de l'application avec :
 * - En-tête fixe contenant le logo et la navigation
 * - Zone de contenu dynamique via React Router Outlet
 * - Navigation entre les pages Interpréteur et Guide
 */

import { Link, Outlet, useLocation } from "react-router-dom";

/**
 * Composant Layout - Structure principale de l'application
 *
 * Fournit une mise en page cohérente avec un en-tête de navigation
 * et une zone de contenu pour les routes enfants.
 *
 * @returns L'interface de mise en page avec en-tête et contenu
 */
function Layout() {
  const location = useLocation();

  /**
   * Vérifie si une route est actuellement active
   *
   * @param path - Le chemin de la route à vérifier
   * @returns true si la route est active, false sinon
   */
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* En-tête avec navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et titre */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">💡</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AlgoGénie</h1>
                <p className="text-xs text-gray-500">Interpréteur d'algorithmes en français</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex gap-2">
              <Link
                to="/"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative ${
                  isActive("/")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Interpréteur</span>
                </span>
              </Link>
              <Link
                to="/guide"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative ${
                  isActive("/guide")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>📖</span>
                  <span>Guide</span>
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <Outlet />
    </div>
  );
}

export default Layout;
