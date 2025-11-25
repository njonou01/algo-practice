import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

/**
 * Composant pour créer des sections repliables dans le cours
 */
export function CollapsibleSection({ title, children, defaultOpen = false, icon }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { settings } = useSettings();
  const isDarkTheme = settings.theme === 'dark';

  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-200 ${isDarkTheme ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
      >
        <div className="flex items-center gap-3">
          {icon && <div className={isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'}>{icon}</div>}
          <h3 className={`text-base font-semibold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>{title}</h3>
        </div>
        {isOpen ? 
          <ChevronDown size={20} className={isDarkTheme ? 'text-gray-500' : 'text-gray-400'} /> : 
          <ChevronRight size={20} className={isDarkTheme ? 'text-gray-500' : 'text-gray-400'} />
        }
      </button>

      {isOpen && (
        <div className={`px-6 py-4 border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-100'}`}>
          {children}
        </div>
      )}
    </div>
  );
}
