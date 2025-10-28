import { Link, Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header with Navigation */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              AlgoInterprète
            </h1>
            <nav className="flex gap-8">
              <Link
                to="/"
                className={`py-2 text-sm font-medium transition-colors relative ${
                  isActive("/")
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Interpréteur
                {isActive("/") && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></span>
                )}
              </Link>
              <Link
                to="/guide"
                className={`py-2 text-sm font-medium transition-colors relative ${
                  isActive("/guide")
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Guide
                {isActive("/guide") && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Outlet />
    </div>
  );
}

export default Layout;
