/**
 * Composant SplitPane - Panel divisé redimensionnable
 *
 * Permet de diviser l'écran en deux panneaux avec un diviseur draggable
 * pour ajuster la taille selon les préférences de l'utilisateur.
 */

import { useState, useRef, useEffect, ReactNode } from 'react';

interface SplitPaneProps {
  left: ReactNode;
  right: ReactNode;
  defaultSplit?: number; // Position initiale en % (0-100)
  minSize?: number;      // Taille minimale en %
}

/**
 * Composant SplitPane
 *
 * @param left - Contenu du panneau gauche (éditeur)
 * @param right - Contenu du panneau droit (console)
 * @param defaultSplit - Position initiale du diviseur (défaut: 50%)
 * @param minSize - Taille minimale de chaque panneau (défaut: 20%)
 */
function SplitPane({ left, right, defaultSplit = 50, minSize = 20 }: SplitPaneProps) {
  const [splitPosition, setSplitPosition] = useState(defaultSplit);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Gère le début du drag du diviseur
   */
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  /**
   * Gère le mouvement de la souris pendant le drag
   */
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;

    // Limiter la position entre minSize et (100 - minSize)
    const clampedPosition = Math.max(minSize, Math.min(100 - minSize, newPosition));
    setSplitPosition(clampedPosition);
  };

  /**
   * Gère la fin du drag
   */
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Écouteurs d'événements pour le drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Empêcher la sélection de texte pendant le drag
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="flex h-full w-full overflow-hidden">
      {/* Panneau gauche */}
      <div
        style={{ width: `${splitPosition}%` }}
        className="overflow-hidden"
      >
        {left}
      </div>

      {/* Diviseur draggable */}
      <div
        onMouseDown={handleMouseDown}
        className={`
          w-1 bg-gray-300 cursor-col-resize hover:bg-indigo-500
          transition-colors shrink-0
          ${isDragging ? 'bg-indigo-500' : ''}
        `}
        title="Glisser pour redimensionner"
      />

      {/* Panneau droit */}
      <div
        style={{ width: `${100 - splitPosition}%` }}
        className="overflow-hidden"
      >
        {right}
      </div>
    </div>
  );
}

export default SplitPane;
