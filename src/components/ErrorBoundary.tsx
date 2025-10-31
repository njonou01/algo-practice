import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-red-600 px-6 py-5 flex items-center gap-3">
              <AlertTriangle size={32} className="text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Une erreur s'est produite
                </h1>
                <p className="text-red-100 text-sm mt-1">
                  L'application a rencontré un problème inattendu
                </p>
              </div>
            </div>

            {/* Error details */}
            <div className="px-6 py-6 space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm font-semibold text-red-900 mb-2">
                  Message d'erreur :
                </p>
                <p className="text-sm text-red-800 font-mono">
                  {this.state.error?.toString() || 'Erreur inconnue'}
                </p>
              </div>

              {/* Stack trace (collapsible) */}
              {this.state.errorInfo && (
                <details className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    Détails techniques (pour les développeurs)
                  </summary>
                  <pre className="mt-3 text-xs text-gray-600 overflow-auto max-h-64 font-mono">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={this.handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                >
                  <RefreshCw size={18} />
                  Réessayer
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  <Home size={18} />
                  Retour à l'accueil
                </button>
              </div>

              {/* Help text */}
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-sm text-blue-900">
                  <strong>Que faire ?</strong>
                </p>
                <ul className="mt-2 space-y-1 text-sm text-blue-800 list-disc list-inside">
                  <li>Essayez de recharger la page</li>
                  <li>Vérifiez votre connexion internet</li>
                  <li>Si le problème persiste, signalez-le aux développeurs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
