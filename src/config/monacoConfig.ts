/**
 * Configuration Monaco Editor pour le langage algorithmique français
 */

import type { editor, languages } from 'monaco-editor';

/**
 * Définition du langage algorithmique
 */
export const algorithmLanguageDefinition: languages.IMonarchLanguage = {
  defaultToken: '',
  tokenPostfix: '.algo',

  keywords: [
    'Algorithme', 'Variables', 'Constantes', 'Debut', 'Fin',
    'DebutAlgorithme', 'FinAlgorithme',
    'DebutFonction', 'FinFonction',
    'DebutProcedure', 'FinProcedure',
    'Si', 'Alors', 'Sinon', 'FinSi',
    'Pour', 'De', 'À', 'a', 'Faire', 'FinPour',
    'TantQue', 'FinTantQue', 'Repeter', 'Jusqua',
    'Selon', 'Cas', 'Defaut', 'FinSelon',
    'Fonction', 'Procedure', 'Retourner',
    'Structure', 'Enregistrement', 'FinStructure', 'FinEnregistrement',
    'Lire', 'Ecrire', 'ET', 'OU', 'NON'
  ],

  typeKeywords: [
    'Entier', 'Reel', 'Chaine', 'Caractere', 'Booleen', 'Tableau'
  ],

  booleans: [
    'Vrai', 'Faux'
  ],

  operators: [
    '←', '<-', '+', '-', '*', '/', '%', '=', '≠', '!=', '<', '>', '≤', '<=', '≥', '>='
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
    provideCompletionItems: (model: any, position: any) => {
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
  },
  themeName: string
): editor.IStandaloneThemeData {
  const isDark = settings.theme === 'dark';

  // Fonction pour convertir #rrggbb en rrggbb (sans #)
  const stripHash = (color: string) => color.replace('#', '');

  return {
    base: isDark ? 'vs-dark' : 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: stripHash(settings.colorComments), fontStyle: 'italic' },
      { token: 'keyword', foreground: stripHash(settings.colorKeywords), fontStyle: 'bold' },
      { token: 'type', foreground: stripHash(settings.colorTypes), fontStyle: 'bold' },
      { token: 'number', foreground: stripHash(settings.colorNumbers) },
      { token: 'number.float', foreground: stripHash(settings.colorNumbers) },
      { token: 'string', foreground: stripHash(settings.colorStrings) },
      { token: 'constant.boolean', foreground: stripHash(settings.colorBooleans), fontStyle: 'bold' },
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
}): editor.IStandaloneEditorConstructionOptions {
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
