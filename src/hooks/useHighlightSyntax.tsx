/**
 * Hook personnalisé pour la coloration syntaxique du langage algorithmique
 *
 * Transforme le code source en JSX avec coloration syntaxique
 * OPTIMISÉ pour de meilleures performances
 */

import { useCallback, useMemo } from 'react';
import type { AppSettings } from '../contexts/SettingsContext';

/**
 * Hook pour colorer le code de l'algorithme
 *
 * @param settings - Paramètres de l'application incluant la coloration syntaxique
 * @returns Fonction de coloration syntaxique
 */
export function useHighlightSyntax(settings: AppSettings) {
  // Créer une regex optimisée pour tous les mots-clés
  const keywordPattern = useMemo(() => {
    const keywords = [
      'Algorithme', 'Variables', 'Constantes', 'Debut', 'Fin',
      'DebutAlgorithme', 'FinAlgorithme',
      'DebutFonction', 'FinFonction',
      'DebutProcedure', 'FinProcedure',
      'Si', 'Alors', 'Sinon', 'FinSi',
      'Pour', 'De', 'À', 'Faire', 'FinPour',
      'TantQue', 'FinTantQue', 'Repeter', 'Jusqua',
      'Selon', 'Cas', 'Defaut', 'FinSelon',
      'Fonction', 'Procedure', 'Retourner',
      'Structure', 'Enregistrement', 'FinStructure', 'FinEnregistrement',
      'Lire', 'Ecrire', 'ET', 'OU', 'NON'
    ];
    return new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
  }, []);

  const typePattern = useMemo(() => {
    const types = ['Entier', 'Reel', 'Chaine', 'Caractere', 'Booleen', 'Tableau'];
    return new RegExp(`\\b(${types.join('|')})\\b`, 'gi');
  }, []);

  const valuePattern = useMemo(() => {
    return /\b(Vrai|Faux)\b/gi;
  }, []);

  const highlightSyntax = useCallback((code: string) => {
    // Si la coloration est désactivée, retourner le code tel quel
    if (!settings.syntaxHighlighting) {
      return <span>{code}</span>;
    }

    // Adapter les couleurs selon le thème
    const isDarkTheme = settings.theme === 'dark';

    // Fonction pour assombrir une couleur hexadécimale en mode light
    const adjustColor = (hexColor: string): string => {
      if (isDarkTheme) return hexColor;

      // Convertir hex en RGB
      const hex = hexColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      // Assombrir (multiplier par 0.6)
      const newR = Math.floor(r * 0.6);
      const newG = Math.floor(g * 0.6);
      const newB = Math.floor(b * 0.6);

      // Retourner en hex
      return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    };

    // Mots-clés du langage
    const keywords = [
      'Algorithme', 'Variables', 'Constantes', 'Debut', 'Fin',
      'DebutAlgorithme', 'FinAlgorithme',
      'DebutFonction', 'FinFonction',
      'DebutProcedure', 'FinProcedure',
      'Si', 'Alors', 'Sinon', 'FinSi',
      'Pour', 'De', 'À', 'Faire', 'FinPour',
      'TantQue', 'FinTantQue', 'Repeter', 'Jusqua',
      'Selon', 'Cas', 'Defaut', 'FinSelon',
      'Fonction', 'Procedure', 'Retourner',
      'Structure', 'Enregistrement', 'FinStructure', 'FinEnregistrement',
      'Lire', 'Ecrire', 'ET', 'OU', 'NON'
    ];

    const types = ['Entier', 'Reel', 'Chaine', 'Caractere', 'Booleen', 'Tableau'];
    const values = ['Vrai', 'Faux'];

    // Remplacer <- par ← et != par ≠
    let highlighted = code.replace(/<-/g, '←').replace(/!=/g, '≠');

    // Découper le code en segments (tokens)
    const tokens: { type: string; value: string }[] = [];
    let currentPos = 0;

    while (currentPos < highlighted.length) {
      let matched = false;

      // Vérifier les commentaires
      if (highlighted.substring(currentPos).startsWith('//')) {
        const lineEnd = highlighted.indexOf('\n', currentPos);
        const commentEnd = lineEnd === -1 ? highlighted.length : lineEnd;
        tokens.push({ type: 'comment', value: highlighted.substring(currentPos, commentEnd) });
        currentPos = commentEnd;
        matched = true;
        continue;
      }

      // Vérifier les chaînes de caractères
      if (highlighted[currentPos] === '"') {
        const stringEnd = highlighted.indexOf('"', currentPos + 1);
        if (stringEnd !== -1) {
          tokens.push({ type: 'string', value: highlighted.substring(currentPos, stringEnd + 1) });
          currentPos = stringEnd + 1;
          matched = true;
          continue;
        }
      }

      // Vérifier les mots-clés
      for (const keyword of keywords) {
        if (highlighted.substring(currentPos).toLowerCase().startsWith(keyword.toLowerCase())) {
          const prevChar = currentPos > 0 ? highlighted[currentPos - 1] : '';
          const nextChar = highlighted[currentPos + keyword.length] ?? '';
          const isPrevAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(prevChar);
          const isNextAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(nextChar);

          if (!isPrevAlpha && !isNextAlpha) {
            // Cas spécial pour "Algorithme" : doit être en début de ligne
            if (keyword === 'Algorithme') {
              let lineStart = currentPos;
              while (lineStart > 0 && highlighted[lineStart - 1] !== '\n') {
                lineStart--;
              }
              const beforeAlgo = highlighted.substring(lineStart, currentPos).trim();
              if (beforeAlgo === '') {
                tokens.push({ type: 'keyword', value: highlighted.substring(currentPos, currentPos + keyword.length) });
                currentPos += keyword.length;
                matched = true;
                break;
              }
            } else {
              tokens.push({ type: 'keyword', value: highlighted.substring(currentPos, currentPos + keyword.length) });
              currentPos += keyword.length;
              matched = true;
              break;
            }
          }
        }
      }
      if (matched) continue;

      // Vérifier les types
      for (const type of types) {
        if (highlighted.substring(currentPos).toLowerCase().startsWith(type.toLowerCase())) {
          const prevChar = currentPos > 0 ? highlighted[currentPos - 1] : '';
          const nextChar = highlighted[currentPos + type.length] ?? '';
          const isPrevAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(prevChar);
          const isNextAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(nextChar);

          if (!isPrevAlpha && !isNextAlpha) {
            tokens.push({ type: 'type', value: highlighted.substring(currentPos, currentPos + type.length) });
            currentPos += type.length;
            matched = true;
            break;
          }
        }
      }
      if (matched) continue;

      // Vérifier les valeurs booléennes
      for (const value of values) {
        if (highlighted.substring(currentPos).toLowerCase().startsWith(value.toLowerCase())) {
          const prevChar = currentPos > 0 ? highlighted[currentPos - 1] : '';
          const nextChar = highlighted[currentPos + value.length] ?? '';
          const isPrevAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(prevChar);
          const isNextAlpha = /[a-zA-Z0-9_éèêàâùûôîïç]/.test(nextChar);

          if (!isPrevAlpha && !isNextAlpha) {
            tokens.push({ type: 'boolean', value: highlighted.substring(currentPos, currentPos + value.length) });
            currentPos += value.length;
            matched = true;
            break;
          }
        }
      }
      if (matched) continue;

      // Vérifier les nombres
      const numberMatch = highlighted.substring(currentPos).match(/^(\d+\.?\d*)/);
      if (numberMatch) {
        const prevChar = currentPos > 0 ? highlighted[currentPos - 1] : '';
        const nextChar = highlighted[currentPos + numberMatch[1].length] || '';
        const isPrevAlpha = /[a-zA-Z_éèêàâùûôîïç]/.test(prevChar);
        const isNextAlpha = /[a-zA-Z_éèêàâùûôîïç]/.test(nextChar);

        if (!isPrevAlpha && !isNextAlpha) {
          tokens.push({ type: 'number', value: numberMatch[1] });
          currentPos += numberMatch[1].length;
          continue;
        }
      }

      // Vérifier la flèche d'affectation
      if (highlighted[currentPos] === '←') {
        tokens.push({ type: 'arrow', value: '←' });
        currentPos++;
        continue;
      }

      // Autres caractères
      tokens.push({ type: 'other', value: highlighted[currentPos] });
      currentPos++;
    }

    // Convertir les tokens en JSX coloré avec les couleurs personnalisées des settings
    return (
      <span>
        {tokens.map((token, i) => {
          let style: React.CSSProperties = {};

          // Appliquer les couleurs personnalisées si la coloration est activée pour ce type
          if (token.type === 'keyword' && settings.highlightKeywords) {
            style.color = adjustColor(settings.colorKeywords);
            style.fontWeight = 'bold';
          } else if (token.type === 'type' && settings.highlightTypes) {
            style.color = adjustColor(settings.colorTypes);
            style.fontWeight = 'bold';
          } else if (token.type === 'number' && settings.highlightNumbers) {
            style.color = adjustColor(settings.colorNumbers);
          } else if (token.type === 'string' && settings.highlightStrings) {
            style.color = adjustColor(settings.colorStrings);
          } else if (token.type === 'comment' && settings.highlightComments) {
            style.color = adjustColor(settings.colorComments);
            style.fontStyle = 'italic';
          } else if (token.type === 'boolean' && settings.highlightKeywords) {
            style.color = adjustColor(settings.colorBooleans);
            style.fontWeight = 'bold';
          } else if (token.type === 'arrow') {
            style.color = adjustColor(settings.colorArrow);
            style.fontWeight = 'bold';
          }

          return (
            <span key={i} style={style}>
              {token.value}
            </span>
          );
        })}
      </span>
    );
  }, [settings, keywordPattern, typePattern, valuePattern]);

  return highlightSyntax;
}
