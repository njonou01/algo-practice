/**
 * Formateur de code algorithmique en français
 *
 * Formate automatiquement le code avec indentation correcte
 */

interface FormatRule {
  // Mots-clés qui augmentent l'indentation sur la ligne suivante
  increaseIndent: string[];
  // Mots-clés qui diminuent l'indentation sur la ligne courante
  decreaseIndent: string[];
  // Mots-clés qui diminuent puis augmentent (comme Sinon)
  decreaseThenIncrease: string[];
  // Mots-clés de début de structure (pas d'indentation, niveau 0)
  structureStart: string[];
  // Mots-clés au niveau 0 qui augmentent l'indentation suivante
  zeroLevelIncrease: string[];
}

const formatRules: FormatRule = {
  increaseIndent: [
    'Debut', 'Alors', 'Sinon', 'Faire',
    'Fonction', 'Procedure',
    'Enregistrement', 'Structure'
  ],
  decreaseIndent: [
    'FinSi', 'FinPour', 'FinTantQue', 'FinSelon',
    'FinFonction', 'FinProcedure',
    'FinEnregistrement', 'FinStructure'
  ],
  decreaseThenIncrease: [
    'Sinon', 'SinonSi'
  ],
  structureStart: [
    'Algorithme', 'Algo'
  ],
  zeroLevelIncrease: [
    'Variables', 'Constantes', 'Debut', 'Fin'
  ]
};

/**
 * Vérifie si une ligne commence par un mot-clé donné
 */
function startsWithKeyword(line: string, keywords: string[]): boolean {
  const trimmed = line.trim();
  return keywords.some(keyword => {
    const regex = new RegExp(`^${keyword}\\b`, 'i');
    return regex.test(trimmed);
  });
}

/**
 * Formate le code algorithmique avec indentation correcte
 *
 * @param code - Le code source à formater
 * @param tabSize - Taille de l'indentation (nombre d'espaces)
 * @returns Le code formaté
 */
export function formatCode(code: string, tabSize: number = 2): string {
  const lines = code.split('\n');
  const formattedLines: string[] = [];
  let indentLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Ignorer les lignes vides
    if (trimmed === '') {
      formattedLines.push('');
      continue;
    }

    // Ignorer les commentaires seuls
    if (trimmed.startsWith('//')) {
      formattedLines.push(' '.repeat(indentLevel * tabSize) + trimmed);
      continue;
    }

    // Vérifier si c'est un début de structure (Algorithme)
    if (startsWithKeyword(trimmed, formatRules.structureStart)) {
      indentLevel = 0;
      formattedLines.push(trimmed);
      continue;
    }

    // Vérifier si c'est un mot-clé au niveau 0 (Variables, Constantes, Debut, Fin)
    const isZeroLevel = startsWithKeyword(trimmed, formatRules.zeroLevelIncrease);
    if (isZeroLevel) {
      indentLevel = 0;
      formattedLines.push(trimmed);
      // Variables, Constantes et Debut augmentent l'indentation pour les lignes suivantes
      // Fin reste au niveau 0 sans augmenter
      if (!trimmed.match(/^Fin\b/i)) {
        indentLevel = 1;
      }
      continue;
    }

    // Vérifier si on doit diminuer l'indentation
    if (startsWithKeyword(trimmed, formatRules.decreaseIndent)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Vérifier si on doit diminuer puis augmenter (Sinon, SinonSi)
    const isDTA = startsWithKeyword(trimmed, formatRules.decreaseThenIncrease);
    if (isDTA) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Ajouter la ligne avec l'indentation courante
    const indent = ' '.repeat(indentLevel * tabSize);
    formattedLines.push(indent + trimmed);

    // Vérifier si on doit augmenter l'indentation pour la prochaine ligne
    if (startsWithKeyword(trimmed, formatRules.increaseIndent) || isDTA) {
      indentLevel++;
    }
  }

  return formattedLines.join('\n');
}

/**
 * Vérifie si le code contient des structures algorithmiques valides
 */
export function isValidAlgorithmStructure(code: string): boolean {
  const trimmed = code.trim();
  if (!trimmed) return false;

  // Vérifier qu'il commence par Algorithme ou Algo
  const firstLine = trimmed.split('\n')[0].trim();
  return /^(Algorithme|Algo)\b/i.test(firstLine);
}
