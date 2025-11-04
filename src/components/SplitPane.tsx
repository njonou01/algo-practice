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
  direction?: 'horizontal' | 'vertical'; // Direction du split
  theme?: 'dark' | 'light'; // Thème de couleur
}

/**
 * Composant SplitPane
 *
 * @param left - Contenu du premier panneau (éditeur)
 * @param right - Contenu du second panneau (console)
 * @param defaultSplit - Position initiale du diviseur (défaut: 50%)
 * @param minSize - Taille minimale de chaque panneau (défaut: 20%)
 * @param direction - Direction du split: 'horizontal' (gauche/droite) ou 'vertical' (haut/bas)
 */
function SplitPane({ left, right, defaultSplit = 50, minSize = 20, direction = 'horizontal', theme = 'dark' }: SplitPaneProps) {
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

    // Calculer la position selon la direction
    let newPosition: number;
    if (direction === 'horizontal') {
      newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    } else {
      newPosition = ((e.clientY - containerRect.top) / containerRect.height) * 100;
    }

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
      document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, direction]);

  const isHorizontal = direction === 'horizontal';
  const isDarkTheme = theme === 'dark';

  // Classes de couleur pour le diviseur selon le thème
  const dividerBaseColor = isDarkTheme ? 'bg-gray-600' : 'bg-gray-300';
  const dividerHoverColor = isDarkTheme ? 'hover:bg-indigo-400' : 'hover:bg-indigo-500';
  const dividerActiveColor = isDarkTheme ? 'bg-indigo-400' : 'bg-indigo-500';

  return (
    <div ref={containerRef} className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} h-full w-full overflow-hidden`}>
      {/* Premier panneau */}
      <div
        style={isHorizontal ? { width: `${splitPosition}%` } : { height: `${splitPosition}%` }}
        className="overflow-hidden"
      >
        {left}
      </div>

      {/* Diviseur draggable */}
      <div
        onMouseDown={handleMouseDown}
        className={`
          ${isHorizontal ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'}
          ${isDragging ? dividerActiveColor : dividerBaseColor}
          ${dividerHoverColor}
          transition-colors shrink-0
        `}
        title="Glisser pour redimensionner"
      />

      {/* Second panneau */}
      <div
        style={isHorizontal ? { width: `${100 - splitPosition}%` } : { height: `${100 - splitPosition}%` }}
        className="overflow-hidden"
      >
        {right}
      </div>
    </div>
  );
}

export default SplitPane;
