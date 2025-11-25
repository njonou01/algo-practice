/**
 * AlgoGénie - Composant de mise en page principal
 *
 * Ce fichier définit la structure globale de l'application avec :
 * - En-tête fixe contenant le logo et la navigation
 * - Zone de contenu dynamique via React Router Outlet
 */

import { BookMarked, BookOpen, GraduationCap, Settings, Zap, ChevronDown } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";
import { useState } from "react";

function Layout() {
  const location = useLocation();
  const { settings } = useSettings();
  const [isLearnMenuOpen, setLearnMenuOpen] = useState(false);

  const isDarkTheme = settings.theme === 'dark';

  const isActive = (path: string) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  const navLinkClasses = (path: string, isDropdown: boolean = false) => `
    flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors
    ${(isActive(path) || (isDropdown && (isActive("/guide") || isActive("/cours"))))
      ? (isDarkTheme ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800")
      : (isDarkTheme ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800")
    }
  `;

  const dropdownLinkClasses = (path: string) => `
    flex items-center gap-2 w-full px-3 py-2 text-sm text-left rounded-md
    ${isActive(path)
      ? (isDarkTheme ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700')
      : (isDarkTheme ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
    }
  `;

  return (
    <div className={`flex flex-col h-screen font-sans ${isDarkTheme ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
      <header className={`border-b ${isDarkTheme ? 'bg-gray-800/50 border-gray-700/50 backdrop-blur-sm' : 'bg-white/50 border-gray-200/50 backdrop-blur-sm'}`}>
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-lg ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
                A
              </div>
              <h1 className={`text-md font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>AlgoGénie</h1>
            </Link>
          </div>

          <nav className="flex items-center gap-2">
            <Link to="/" className={navLinkClasses("/")}>
              <Zap size={16} />
              <span>Interpréteur</span>
            </Link>
            <Link to="/examples" className={navLinkClasses("/examples")}>
              <BookOpen size={16} />
              <span>Exemples</span>
            </Link>
            <div className="relative" onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setLearnMenuOpen(false);
              }
            }}>
              <button
                onClick={() => setLearnMenuOpen(!isLearnMenuOpen)}
                className={navLinkClasses("/apprendre", true)}
              >
                <BookMarked size={16} />
                <span>Apprendre</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isLearnMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLearnMenuOpen && (
                <div
                  className={`absolute top-full right-0 mt-2 w-48 p-1 rounded-md shadow-lg z-10
                  ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                >
                    <Link to="/guide" className={dropdownLinkClasses("/guide")} onClick={() => setLearnMenuOpen(false)}>
                      <BookMarked size={16} />
                      <span>Guide</span>
                    </Link>
                    <Link to="/cours" className={dropdownLinkClasses("/cours")} onClick={() => setLearnMenuOpen(false)}>
                      <GraduationCap size={16} />
                      <span>Cours</span>
                    </Link>
                </div>
              )}
            </div>
            <Link to="/settings" className={navLinkClasses("/settings")}>
              <Settings size={16} />
              <span>Paramètres</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
