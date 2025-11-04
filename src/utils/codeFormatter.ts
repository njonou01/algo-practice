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
 * Type de bloc pour la pile d'indentation
 */
type BlockType =
  | 'algorithm'      // DebutAlgorithme...FinAlgorithme
  | 'struct'         // Enregistrement...FinEnregistrement
  | 'function'       // DebutFonction...FinFonction
  | 'procedure'      // DebutProcedure...FinProcedure
  | 'variables'      // Variables/Constantes
  | 'if'             // Si...Alors...FinSi
  | 'else'           // Sinon
  | 'loop'           // Pour/TantQue...Faire...FinPour/FinTantQue
  | 'match';         // Selon...FinSelon

interface Block {
  type: BlockType;
  indent: number;  // Niveau d'indentation du bloc
}

/**
 * Formate le code algorithmique avec indentation correcte
 * Utilise une pile (stack) pour tracker les blocs ouverts
 *
 * @param code - Le code source à formater
 * @param tabSize - Taille de l'indentation (nombre d'espaces)
 * @returns Le code formaté
 */
export function formatCode(code: string, tabSize: number = 2): string {
  const lines = code.split('\n');
  const formattedLines: string[] = [];
  const blockStack: Block[] = []; // Pile des blocs ouverts

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Ignorer les lignes vides
    if (trimmed === '') {
      formattedLines.push('');
      continue;
    }

    // Ignorer les commentaires seuls (au niveau actuel)
    if (trimmed.startsWith('//')) {
      formattedLines.push(' '.repeat(blockStack.length * tabSize) + trimmed);
      continue;
    }

    // === GESTION DES FERMETURES (pop de la pile) ===

    if (trimmed.match(/^FinAlgorithme\b/i)) {
      if (blockStack.length > 0) blockStack.pop();
    }
    else if (trimmed.match(/^FinFonction\b/i)) {
      if (blockStack.length > 0) blockStack.pop();
    }
    else if (trimmed.match(/^FinProcedure\b/i)) {
      if (blockStack.length > 0) blockStack.pop();
    }
    else if (trimmed.match(/^Fin(Si|Pour|TantQue|Selon|Enregistrement|Structure)\b/i)) {
      if (blockStack.length > 0) blockStack.pop();
    }
    // Sinon/SinonSi : ferme le bloc 'if'
    else if (trimmed.match(/^(Sinon|SinonSi)\b/i)) {
      if (blockStack.length > 0 && blockStack[blockStack.length - 1].type === 'if') {
        blockStack.pop();
      }
    }

    // === CALCULER INDENTATION ===
    let indentLevel = blockStack.length;

    // Forcer niveau 0 pour structures principales au niveau global
    if (trimmed.match(/^(Algorithme|Algo)\b/i)) {
      blockStack.length = 0; // Reset complet
      indentLevel = 0;
    }
    // Niveau 0 si on est au niveau global (pile vide ou juste algorithm)
    else if (blockStack.length === 0 || (blockStack.length === 1 && blockStack[0].type === 'algorithm')) {
      if (trimmed.match(/^(Enregistrement|Structure|Fonction|Procedure|Variables|Constantes|DebutAlgorithme)\b/i)) {
        indentLevel = 0;
      }
    }

    // === AFFICHAGE ===
    const indent = ' '.repeat(indentLevel * tabSize);
    formattedLines.push(indent + trimmed);

    // === GESTION DES OUVERTURES (push sur la pile) ===

    if (trimmed.match(/^(Algorithme|Algo)\b/i)) {
      blockStack.push({ type: 'algorithm', indent: 0 });
    }
    else if (trimmed.match(/^(Enregistrement|Structure)\b/i)) {
      blockStack.push({ type: 'struct', indent: indentLevel });
    }
    else if (trimmed.match(/^Fonction\b/i)) {
      blockStack.push({ type: 'function', indent: indentLevel });
    }
    else if (trimmed.match(/^Procedure\b/i)) {
      blockStack.push({ type: 'procedure', indent: indentLevel });
    }
    else if (trimmed.match(/^(Variables|Constantes)\b/i)) {
      blockStack.push({ type: 'variables', indent: indentLevel });
    }
    else if (trimmed.match(/^(DebutAlgorithme|DebutFonction|DebutProcedure)\b/i)) {
      // Ferme le bloc variables si présent
      if (blockStack.length > 0 && blockStack[blockStack.length - 1].type === 'variables') {
        blockStack.pop();
      }
      // On n'ajoute rien à la pile, le bloc est déjà sur la pile (algorithm, function ou procedure)
    }
    else if (trimmed.match(/^Si\b/i) || trimmed.match(/^Alors\b/i)) {
      // Si...Alors
      const hasIfAtThisLevel = blockStack.some(b => b.type === 'if' && b.indent === indentLevel);
      if (!hasIfAtThisLevel) {
        blockStack.push({ type: 'if', indent: indentLevel });
      }
    }
    else if (trimmed.match(/^(Sinon|SinonSi)\b/i)) {
      blockStack.push({ type: 'else', indent: indentLevel });
    }
    else if (trimmed.match(/^(Pour|TantQue)\b/i) || trimmed.match(/^Faire\b/i)) {
      // Pour...Faire ou TantQue...Faire
      const hasLoopAtThisLevel = blockStack.some(b => b.type === 'loop' && b.indent === indentLevel);
      if (!hasLoopAtThisLevel) {
        blockStack.push({ type: 'loop', indent: indentLevel });
      }
    }
    else if (trimmed.match(/^Selon\b/i)) {
      blockStack.push({ type: 'match', indent: indentLevel });
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
