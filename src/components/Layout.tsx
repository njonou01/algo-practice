/**
 * AlgoGénie - Composant de mise en page principal
 *
 * Ce fichier définit la structure globale de l'application avec :
 * - En-tête fixe contenant le logo et la navigation
 * - Zone de contenu dynamique via React Router Outlet
 * - Navigation entre les pages Interpréteur et Guide
 */

import { BookMarked, BookOpen, GraduationCap, Settings, Zap } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";

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
  const { settings } = useSettings();

  const isDarkTheme = settings.theme === 'dark';

  /**
   * Vérifie si une route est actuellement active
   *
   * @param path - Le chemin de la route à vérifier
   * @returns true si la route est active, false sinon
   */
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`flex flex-col h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* En-tête avec navigation */}
      <header className={`border-b shadow-sm ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et titre */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-linear-to-br from-indigo-500 to-purple-600 font-black text-white flex items-center justify-center shadow-md">
                AG.
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>AlgoGénie</h1>
                <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Interpréteur d'algorithmes en français</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex gap-2">
              <Link
                to="/"
                className={`px-4 py-2 text-sm font-medium transition-all relative ${isActive("/")
                  ? (isDarkTheme ? "bg-indigo-900 text-indigo-300" : "bg-indigo-50 text-indigo-700")
                  : (isDarkTheme ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900")
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Zap size={16} />
                  <span>Interpréteur</span>
                </span>
              </Link>
              <Link
                to="/examples"
                className={`px-4 py-2 text-sm font-medium transition-all relative ${isActive("/examples")
                  ? (isDarkTheme ? "bg-indigo-900 text-indigo-300" : "bg-indigo-50 text-indigo-700")
                  : (isDarkTheme ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900")
                  }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>Exemples</span>
                </span>
              </Link>
              <Link
                to="/guide"
                className={`px-4 py-2 text-sm font-medium transition-all relative ${isActive("/guide")
                  ? (isDarkTheme ? "bg-indigo-900 text-indigo-300" : "bg-indigo-50 text-indigo-700")
                  : (isDarkTheme ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900")
                  }`}
              >
                <span className="flex items-center gap-2">
                  <BookMarked size={16} />
                  <span>Guide</span>
                </span>
              </Link>
              <Link
                to="/cours"
                className={`px-4 py-2 text-sm font-medium transition-all relative ${isActive("/cours")
                  ? (isDarkTheme ? "bg-indigo-900 text-indigo-300" : "bg-indigo-50 text-indigo-700")
                  : (isDarkTheme ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900")
                  }`}
              >
                <span className="flex items-center gap-2">
                  <GraduationCap size={16} />
                  <span>Cours</span>
                </span>
              </Link>
              <Link
                to="/settings"
                className={`px-4 py-2 text-sm font-medium transition-all relative ${isActive("/settings")
                  ? (isDarkTheme ? "bg-indigo-900 text-indigo-300" : "bg-indigo-50 text-indigo-700")
                  : (isDarkTheme ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900")
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Settings size={16} />
                  <span>Paramètres</span>
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
