/**
 * Formateur de code algorithmique en français
 *
 * Formate automatiquement le code avec indentation correcte
 */

// Note: Les types et fonctions suivants sont conservés pour référence future
// mais ne sont pas utilisés dans l'implémentation actuelle du formateur.
// L'algorithme de formatage a été simplifié pour être plus robuste.

/**
 * Formate le code algorithmique avec indentation correcte
 * Utilise une pile (stack) pour tracker les blocs ouverts
 *
 * @param code - Le code source à formater
 * @param tabSize - Taille de l'indentation (nombre d'espaces)
 * @returns Le code formaté
 */
export function formatCode(code: string, tabSize: number = 2): string {
  // Première passe : fusionner tous les appels de fonctions multi-lignes
  let processedCode = code;

  // Fusionner tous les appels de fonctions sur une seule ligne
  // Recherche : NomFonction( ... contenu sur plusieurs lignes ... )
  let inFunctionCall = false;
  let functionBuffer = '';
  let parenDepth = 0;
  let result = '';

  for (let i = 0; i < processedCode.length; i++) {
    const char = processedCode[i];
    const nextChars = processedCode.substring(i, i + 10);

    // Détecter le début d'un appel de fonction (identifiant suivi de '(')
    if (!inFunctionCall && /^[a-zA-Zéèêàâùûôîïç_][a-zA-Zéèêàâùûôîïç0-9_]*\s*\(/.test(nextChars)) {
      inFunctionCall = true;
      parenDepth = 0;
      functionBuffer = '';
    }

    if (inFunctionCall) {
      if (char === '(') parenDepth++;
      if (char === ')') parenDepth--;

      // Remplacer les retours à la ligne par des espaces, mais garder le contenu
      if (char === '\n' || char === '\r') {
        functionBuffer += ' ';
      } else {
        functionBuffer += char;
      }

      // Fin de l'appel de fonction
      if (parenDepth === 0 && char === ')') {
        // Nettoyer les espaces multiples
        const cleaned = functionBuffer.replace(/\s+/g, ' ').trim();
        result += cleaned;
        inFunctionCall = false;
        functionBuffer = '';
      }
    } else {
      result += char;
    }
  }

  processedCode = result;

  const lines = processedCode.split('\n');
  const formattedLines: string[] = [];
  let currentIndent = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Ignorer les lignes vides
    if (trimmed === '') {
      formattedLines.push('');
      continue;
    }

    // Gestion des commentaires (conserver indentation actuelle)
    if (trimmed.startsWith('//')) {
      formattedLines.push(' '.repeat(currentIndent * tabSize) + trimmed);
      continue;
    }

    // === Niveau 0 : structures principales et leurs fermetures ===
    if (trimmed.match(/^(Algorithme|Algo|Enregistrement|Structure|Fonction|Procedure|Constantes|Variables|DebutAlgorithme|DebutFonction|DebutProcedure|FinAlgorithme|FinFonction|FinProcedure|FinEnregistrement|FinStructure)\b/i)) {
      currentIndent = 0;
    }

    // === FERMETURES : revenir au niveau du début correspondant ===
    // FinSi doit être au même niveau que Si
    else if (trimmed.match(/^(FinSi|FinPour|FinTantQue|FinSelon)\b/i)) {
      currentIndent = Math.max(0, currentIndent - 1);
    }
    // Sinon : même niveau que Si
    else if (trimmed.match(/^Sinon\b/i)) {
      currentIndent = Math.max(0, currentIndent - 1);
    }
    // Jusqua : même niveau que Repeter
    else if (trimmed.match(/^Jusqua\b/i)) {
      currentIndent = Math.max(0, currentIndent - 1);
    }
    // Cas/Defaut : revenir au niveau de Selon (diminuer d'abord si on était dans un cas précédent)
    else if (trimmed.match(/^(Cas|Defaut)\b/i)) {
      // Si on était dans un cas précédent (currentIndent > niveau du Selon)
      // On revient au niveau du Selon
      currentIndent = Math.max(0, currentIndent - 1);
    }

    // === AFFICHAGE ===
    const indent = ' '.repeat(currentIndent * tabSize);
    formattedLines.push(indent + trimmed);

    // === OUVERTURES : augmenter l'indentation APRÈS affichage pour le contenu ===

    // Structures de niveau 0 qui indent leur contenu
    if (trimmed.match(/^(Enregistrement|Structure|Constantes|Variables)\b/i)) {
      currentIndent += 1;
    }
    // Fonction/Procedure : indent leur contenu
    else if (trimmed.match(/^(Fonction|Procedure)\b/i)) {
      currentIndent += 1;
    }
    // DebutAlgorithme/DebutFonction/DebutProcedure : indent le corps
    else if (trimmed.match(/^(DebutAlgorithme|DebutFonction|DebutProcedure)\b/i)) {
      currentIndent += 1;
    }
    // Si...Alors : indent le contenu
    else if (trimmed.match(/^Si\b.*Alors\b/i)) {
      currentIndent += 1;
    }
    // Sinon : indent le contenu (déjà décrémenté avant, on ré-incrémente)
    else if (trimmed.match(/^Sinon\b/i)) {
      currentIndent += 1;
    }
    // Pour...Faire : indent le contenu
    else if (trimmed.match(/^Pour\b.*Faire\b/i)) {
      currentIndent += 1;
    }
    // TantQue...Faire : indent le contenu
    else if (trimmed.match(/^TantQue\b.*Faire\b/i)) {
      currentIndent += 1;
    }
    // Repeter : indent le contenu
    else if (trimmed.match(/^Repeter\b/i)) {
      currentIndent += 1;
    }
    // Selon : indent le contenu
    else if (trimmed.match(/^Selon\b/i)) {
      currentIndent += 1;
    }
    // Cas : indent le contenu du cas
    else if (trimmed.match(/^Cas\b.*:/)) {
      currentIndent += 1;
    }
    // Defaut : indent le contenu
    else if (trimmed.match(/^Defaut\b.*:/i)) {
      currentIndent += 1;
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
