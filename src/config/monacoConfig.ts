/**
 * Configuration Monaco Editor pour le langage algorithmique français
 */

/**
 * Définition du langage algorithmique
 */
export const algorithmLanguageDefinition: any = {
  defaultToken: '',
  tokenPostfix: '.algo',

  keywords: [
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
    'Lire', 'Ecrire', 'ET', 'OU', 'NON', 'MOD'
  ],

  typeKeywords: [
    'Entier', 'Reel', 'Chaine', 'Caractere', 'Booleen', 'Tableau'
  ],

  booleans: [
    'Vrai', 'Faux'
  ],

  operators: [
    '←', '<-', '+', '-', '*', '/', '%', 'MOD', '=', '≠', '!=', '<', '>', '≤', '<=', '≥', '>='
  ],

  // Définition des règles de tokenisation
  tokenizer: {
    root: [
      // Commentaires
      [/\/\/.*$/, 'comment'],

      // Chaînes de caractères
      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/"/, 'string', '@string'],

      // Nombres
      [/\d+\.\d+/, 'number.float'],
      [/\d+/, 'number'],

      // Opérateurs spéciaux
      [/←|<-/, 'operator.arrow'],
      [/[≠≤≥]/, 'operator.special'],

      // Appels de fonctions (identifiant suivi de '(')
      [/[a-zA-Zéèêàâùûôîïç_][a-zA-Zéèêàâùûôîïç0-9_]*(?=\s*\()/, {
        cases: {
          '@keywords': 'keyword',
          '@default': 'function.call'
        }
      }],

      // Identifiants et mots-clés
      [/[a-zA-Zéèêàâùûôîïç_][a-zA-Zéèêàâùûôîïç0-9_]*/, {
        cases: {
          '@keywords': 'keyword',
          '@typeKeywords': 'type',
          '@booleans': 'constant.boolean',
          '@default': 'identifier'
        }
      }],

      // Délimiteurs
      [/[{}()\[\]]/, '@brackets'],
      [/[,;:.]/, 'delimiter'],

      // Opérateurs standards
      [/[+\-*/%=<>!]/, 'operator'],

      // Espaces blancs
      [/[ \t\r\n]+/, 'white'],
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/\\./, 'string.escape'],
      [/"/, 'string', '@pop']
    ],
  },
};

/**
 * Configuration de l'autocomplétion
 */
export function setupCompletionProvider(monaco: any): void {
  monaco.languages.registerCompletionItemProvider('algorithmique', {
    provideCompletionItems: () => {
      const suggestions = [
        // Structure de base
        {
          label: 'Algorithme',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'Algorithme ${1:NomAlgo}\nVariables\n    ${2:variable} : ${3:Type}\nDebut\n    $0\nFin',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Structure de base d\'un algorithme'
        },
        {
          label: 'Si',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'Si ${1:condition} Alors\n    ${2:instructions}\nFinSi',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Structure conditionnelle Si/Alors'
        },
        {
          label: 'SiSinon',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'Si ${1:condition} Alors\n    ${2:instructions1}\nSinon\n    ${3:instructions2}\nFinSi',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Structure conditionnelle Si/Alors/Sinon'
        },
        {
          label: 'Pour',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'Pour ${1:i} De ${2:debut} À ${3:fin} Faire\n    ${4:instructions}\nFinPour',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Boucle Pour'
        },
        {
          label: 'TantQue',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'TantQue ${1:condition} Faire\n    ${2:instructions}\nFinTantQue',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Boucle TantQue'
        },
        {
          label: 'Repeter',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'Repeter\n    ${1:instructions}\nJusqua ${2:condition}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Boucle Repeter/Jusqua'
        },
        {
          label: 'Fonction',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'Fonction ${1:NomFonction}(${2:params}) : ${3:Type}\nVariables\n    ${4:variables}\nDebut\n    ${5:instructions}\n    Retourner ${6:valeur}\nFin',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Déclaration de fonction'
        },
        {
          label: 'Procedure',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'Procedure ${1:NomProcedure}(${2:params})\nVariables\n    ${3:variables}\nDebut\n    ${4:instructions}\nFin',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Déclaration de procédure'
        },
        {
          label: 'Selon',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'Selon ${1:variable}\n    Cas ${2:valeur1} :\n        ${3:instructions1}\n    Cas ${4:valeur2} :\n        ${5:instructions2}\n    Defaut :\n        ${6:instructions_defaut}\nFinSelon',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Structure Selon/Cas'
        },
        {
          label: 'Structure',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'Structure ${1:NomStructure}\n    ${2:champ1} : ${3:Type1}\n    ${4:champ2} : ${5:Type2}\nFinStructure',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Définition de structure'
        },
        // Fonctions natives - Mathématiques
        {
          label: 'Racine',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'Racine(${1:x})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Racine(x: Reel) : Reel\nCalcule la racine carrée de x'
        },
        {
          label: 'Puissance',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'Puissance(${1:base}, ${2:exposant})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Puissance(base: Reel, exposant: Reel) : Reel\nCalcule base^exposant'
        },
        {
          label: 'Sin',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'Sin(${1:angle})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Sin(angle: Reel) : Reel\nCalcule le sinus (angle en radians)'
        },
        {
          label: 'Cos',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'Cos(${1:angle})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Cos(angle: Reel) : Reel\nCalcule le cosinus (angle en radians)'
        },
        {
          label: 'Tan',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'Tan(${1:angle})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Tan(angle: Reel) : Reel\nCalcule la tangente (angle en radians)'
        },
        {
          label: 'Log',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'Log(${1:x})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Log(x: Reel) : Reel\nCalcule le logarithme naturel (base e)'
        },
        {
          label: 'Exp',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'Exp(${1:x})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Exp(x: Reel) : Reel\nCalcule e^x (exponentielle)'
        },
        // Fonctions natives - Aléatoire
        {
          label: 'Aleatoire',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'Aleatoire(${1:min}, ${2:max})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Aleatoire(min: Entier, max: Entier) : Entier\nGénère un nombre aléatoire entre min et max (inclus)'
        },
        {
          label: 'AleatoireReel',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'AleatoireReel()',
          documentation: 'AleatoireReel() : Reel\nGénère un nombre réel aléatoire entre 0.0 et 1.0'
        },
        // Fonctions natives - Date/Temps
        {
          label: 'DateActuelle',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'DateActuelle()',
          documentation: 'DateActuelle() : Chaine\nRetourne la date actuelle au format "JJ/MM/AAAA"'
        },
        {
          label: 'HeureActuelle',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'HeureActuelle()',
          documentation: 'HeureActuelle() : Chaine\nRetourne l\'heure actuelle au format "HH:MM:SS"'
        },
        {
          label: 'TimestampActuel',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'TimestampActuel()',
          documentation: 'TimestampActuel() : Entier\nRetourne le timestamp Unix actuel (secondes depuis 1970)'
        },
        {
          label: 'JourSemaine',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'JourSemaine()',
          documentation: 'JourSemaine() : Chaine\nRetourne le jour de la semaine en français'
        },
        // Fonctions natives - Conversion
        {
          label: 'EnTexte',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'EnTexte(${1:valeur})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'EnTexte(valeur: Type) : Chaine\nConvertit n\'importe quelle valeur en chaîne de caractères'
        },
        {
          label: 'EnEntier',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'EnEntier(${1:chaine})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'EnEntier(chaine: Chaine) : Entier\nConvertit une chaîne en nombre entier'
        },
        {
          label: 'EnReel',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'EnReel(${1:chaine})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'EnReel(chaine: Chaine) : Reel\nConvertit une chaîne en nombre réel'
        },
        {
          label: 'EnTableauCaracteres',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'EnTableauCaracteres(${1:texte})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'EnTableauCaracteres(texte: Chaine) : Tableau de Caractere\nConvertit une chaîne en tableau de caractères\nExemple: "Bonjour" → [\'B\', \'o\', \'n\', \'j\', \'o\', \'u\', \'r\']'
        },
        {
          label: 'EnChaineCaracteres',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'EnChaineCaracteres(${1:tableau})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'EnChaineCaracteres(tableau: Tableau de Caractere) : Chaine\nConvertit un tableau de caractères en chaîne\nExemple: [\'H\', \'i\'] → "Hi"'
        },
        // Mots-clés simples
        ...algorithmLanguageDefinition.keywords.map((keyword: string) => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
        })),
        // Types
        ...algorithmLanguageDefinition.typeKeywords.map((type: string) => ({
          label: type,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: type,
        })),
      ];

      return { suggestions };
    }
  });
}

/**
 * Créer un thème Monaco dynamique basé sur les settings
 */
export function createDynamicTheme(
  settings: {
    theme: 'dark' | 'light';
    colorKeywords: string;
    colorTypes: string;
    colorNumbers: string;
    colorStrings: string;
    colorComments: string;
    colorBooleans: string;
    colorArrow: string;
    colorFunctions: string;
  },
  themeName: 'dark' | 'light'
): any {
  const isDark = themeName === 'dark';

  // Fonction pour convertir #rrggbb en rrggbb (sans #)
  const stripHash = (color: string) => color.replace('#', '');

  return {
    base: isDark ? 'vs-dark' : 'vs',
    inherit: false,
    rules: [
      { token: 'comment', foreground: stripHash(settings.colorComments), fontStyle: 'italic' },
      { token: 'keyword', foreground: stripHash(settings.colorKeywords), fontStyle: 'bold' },
      { token: 'type', foreground: stripHash(settings.colorTypes), fontStyle: 'bold' },
      { token: 'number', foreground: stripHash(settings.colorNumbers) },
      { token: 'number.float', foreground: stripHash(settings.colorNumbers) },
      { token: 'string', foreground: stripHash(settings.colorStrings) },
      { token: 'constant.boolean', foreground: stripHash(settings.colorBooleans), fontStyle: 'bold' },
      { token: 'function.call', foreground: stripHash(settings.colorFunctions), fontStyle: 'italic' },
      { token: 'operator.arrow', foreground: stripHash(settings.colorArrow), fontStyle: 'bold' },
      { token: 'operator.special', foreground: 'f472b6' },
      { token: 'operator', foreground: 'f472b6' },
    ],
    colors: isDark ? {
      'editor.background': '#111827',
      'editor.foreground': '#d4d4d4',
      'editorLineNumber.foreground': '#858585',
      'editor.lineHighlightBackground': '#1f2937',
      'editorCursor.foreground': '#ffffff',
      'editor.selectionBackground': '#374151',
      'editor.inactiveSelectionBackground': '#1f2937',
    } : {
      'editor.background': '#ffffff',
      'editor.foreground': '#000000',
      'editorLineNumber.foreground': '#858585',
      'editor.lineHighlightBackground': '#f9fafb',
      'editorCursor.foreground': '#000000',
      'editor.selectionBackground': '#dbeafe',
      'editor.inactiveSelectionBackground': '#f3f4f6',
    }
  };
}

/**
 * Options de l'éditeur Monaco
 */
export function getMonacoOptions(settings: {
  fontSize: number;
  tabSize: number;
  theme: 'dark' | 'light';
}): any {
  return {
    fontSize: settings.fontSize,
    tabSize: settings.tabSize,
    insertSpaces: true,
    detectIndentation: false,
    automaticLayout: true,
    minimap: {
      enabled: true,
      scale: 1,
      showSlider: 'mouseover'
    },
    scrollBeyondLastLine: false,
    lineNumbers: 'on',
    renderLineHighlight: 'all',
    folding: true,
    renderWhitespace: 'selection',
    renderIndentGuides: true,
    guides: {
      indentation: true,
      bracketPairs: true,
      highlightActiveIndentation: true
    },
    foldingStrategy: 'indentation',
    bracketPairColorization: {
      enabled: true
    },
    suggest: {
      snippetsPreventQuickSuggestions: false,
      showKeywords: true,
      showSnippets: true,
    },
    quickSuggestions: {
      other: true,
      comments: false,
      strings: false
    },
    wordWrap: 'off',
    fontFamily: '"JetBrains Mono", "Fira Code", "Fira Mono", monospace',
    fontLigatures: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    smoothScrolling: true,
    contextmenu: true,
    mouseWheelZoom: false,
  };
}
