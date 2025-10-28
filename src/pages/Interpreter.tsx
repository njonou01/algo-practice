import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Editor from 'react-simple-code-editor';

interface ExecutionResult {
  success: boolean;
  output: string[];
  error: string | null;
}

// Fonction pour colorer la syntaxe
function highlightSyntax(code: string) {
  const keywords = [
    'Algorithme', 'Variables', 'Constantes', 'Debut', 'Fin',
    'Si', 'Alors', 'Sinon', 'FinSi',
    'Pour', 'De', 'A', 'Faire', 'FinPour',
    'TantQue', 'FinTantQue', 'Repeter', 'Jusqua',
    'Selon', 'Cas', 'Defaut', 'FinSelon',
    'Fonction', 'Procedure', 'Retourner',
    'Lire', 'Ecrire', 'ET', 'OU', 'NON'
  ];

  const types = ['Entier', 'Reel', 'Chaine', 'Caractere', 'Booleen', 'Tableau'];
  const values = ['Vrai', 'Faux'];

  // Remplacer <- par ←
  let highlighted = code.replace(/<-/g, '←');

  // Tokenize the code into segments
  const tokens: { type: string; value: string }[] = [];
  let currentPos = 0;

  while (currentPos < highlighted.length) {
    let matched = false;

    // Check for comments
    if (highlighted.substring(currentPos).startsWith('//')) {
      const lineEnd = highlighted.indexOf('\n', currentPos);
      const commentEnd = lineEnd === -1 ? highlighted.length : lineEnd;
      tokens.push({ type: 'comment', value: highlighted.substring(currentPos, commentEnd) });
      currentPos = commentEnd;
      matched = true;
      continue;
    }

    // Check for strings
    if (highlighted[currentPos] === '"') {
      const stringEnd = highlighted.indexOf('"', currentPos + 1);
      if (stringEnd !== -1) {
        tokens.push({ type: 'string', value: highlighted.substring(currentPos, stringEnd + 1) });
        currentPos = stringEnd + 1;
        matched = true;
        continue;
      }
    }

    // Check for keywords, types, values
    for (const keyword of keywords) {
      if (highlighted.substring(currentPos).toLowerCase().startsWith(keyword.toLowerCase())) {
        const nextChar = highlighted[currentPos + keyword.length];
        if (!nextChar || !/[a-zA-Z0-9]/.test(nextChar)) {
          tokens.push({ type: 'keyword', value: highlighted.substring(currentPos, currentPos + keyword.length) });
          currentPos += keyword.length;
          matched = true;
          break;
        }
      }
    }
    if (matched) continue;

    for (const type of types) {
      if (highlighted.substring(currentPos).toLowerCase().startsWith(type.toLowerCase())) {
        const nextChar = highlighted[currentPos + type.length];
        if (!nextChar || !/[a-zA-Z0-9]/.test(nextChar)) {
          tokens.push({ type: 'type', value: highlighted.substring(currentPos, currentPos + type.length) });
          currentPos += type.length;
          matched = true;
          break;
        }
      }
    }
    if (matched) continue;

    for (const value of values) {
      if (highlighted.substring(currentPos).toLowerCase().startsWith(value.toLowerCase())) {
        const nextChar = highlighted[currentPos + value.length];
        if (!nextChar || !/[a-zA-Z0-9]/.test(nextChar)) {
          tokens.push({ type: 'boolean', value: highlighted.substring(currentPos, currentPos + value.length) });
          currentPos += value.length;
          matched = true;
          break;
        }
      }
    }
    if (matched) continue;

    // Check for numbers
    const numberMatch = highlighted.substring(currentPos).match(/^(\d+\.?\d*)/);
    if (numberMatch) {
      tokens.push({ type: 'number', value: numberMatch[1] });
      currentPos += numberMatch[1].length;
      continue;
    }

    // Check for arrow
    if (highlighted[currentPos] === '←') {
      tokens.push({ type: 'arrow', value: '←' });
      currentPos++;
      continue;
    }

    // Check for operators
    if (/[+\-*/%=!<>]/.test(highlighted[currentPos])) {
      tokens.push({ type: 'operator', value: highlighted[currentPos] });
      currentPos++;
      continue;
    }

    // Default: regular text
    tokens.push({ type: 'text', value: highlighted[currentPos] });
    currentPos++;
  }

  // Convert tokens to JSX
  return (
    <span>
      {tokens.map((token, i) => (
        <span key={i} className={token.type}>
          {token.value}
        </span>
      ))}
    </span>
  );
}

function Interpreter() {
  const [code, setCode] = useState(`Algorithme MonAlgorithme
Variables x, y : Entier

Debut
  Ecrire("Entrez un nombre:\n")
  Lire(x)
  y <- x * 2
  Ecrire("Le double de ", x, " est ", y, "\n")
Fin`);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const executeAlgorithm = async () => {
    setIsRunning(true);
    setOutput([]);
    setError(null);

    try {
      const inputValues = input
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const result = await invoke<ExecutionResult>("execute_algorithm", {
        code: code,
        inputValues: inputValues,
      });

      if (result.success) {
        setOutput(result.output);
        setError(null);
      } else {
        setError(result.error || "Erreur inconnue");
        setOutput([]);
      }
    } catch (err) {
      setError(`Erreur: ${err}`);
      setOutput([]);
    } finally {
      setIsRunning(false);
    }
  };

  const loadExample = (exampleName: string) => {
    const examples: { [key: string]: { code: string; input: string } } = {
      hello: {
        code: `Algorithme Bonjour
Variables nom : Chaine

Debut
  Ecrire("Comment vous appelez-vous?\n")
  Lire(nom)
  Ecrire("Bonjour ", nom, "!\n")
Fin`,
        input: "Alice",
      },
      factorial: {
        code: `Algorithme Factorielle
Variables n, i, fact : Entier

Debut
  Ecrire("Entrez un nombre:\n")
  Lire(n)
  fact <- 1
  Pour i De 1 A n Faire
    fact <- fact * i
  FinPour
  Ecrire("Factorielle de ", n, " = ", fact, "\n")
Fin`,
        input: "5",
      },
      fibonacci: {
        code: `Algorithme Fibonacci
Variables n, i, a, b, temp : Entier

Debut
  Ecrire("Combien de termes?\n")
  Lire(n)
  a <- 0
  b <- 1
  Ecrire("Suite de Fibonacci:\n")
  Ecrire(a, "\n")
  Ecrire(b, "\n")
  Pour i De 3 A n Faire
    temp <- a + b
    Ecrire(temp, "\n")
    a <- b
    b <- temp
  FinPour
Fin`,
        input: "10",
      },
      prime: {
        code: `Algorithme NombrePremier
Variables n, i, estPremier : Entier

Debut
  Ecrire("Entrez un nombre:\n")
  Lire(n)
  estPremier <- 1

  Si n < 2 Alors
    estPremier <- 0
  Sinon
    Pour i De 2 A n - 1 Faire
      Si n % i = 0 Alors
        estPremier <- 0
      FinSi
    FinPour
  FinSi

  Si estPremier = 1 Alors
    Ecrire(n, " est premier\n")
  Sinon
    Ecrire(n, " n'est pas premier\n")
  FinSi
Fin`,
        input: "17",
      },
      array1d: {
        code: `Algorithme TableauNotes
Variables
  notes : Tableau[5] de Reel
  i : Entier
  somme, moyenne : Reel

Debut
  Ecrire("Entrez 5 notes:\n")

  Pour i De 0 A 4 Faire
    Lire(notes[i])
  FinPour

  somme <- 0
  Pour i De 0 A 4 Faire
    somme <- somme + notes[i]
  FinPour

  moyenne <- somme / 5
  Ecrire("Moyenne: ", moyenne, "\n")
Fin`,
        input: "15\n12\n18\n14\n16",
      },
      array2d: {
        code: `Algorithme Matrice
Variables
  matrice : Tableau[3, 3] de Entier
  i, j, somme : Entier

Debut
  Ecrire("Remplissage matrice 3x3\n")

  Pour i De 0 A 2 Faire
    Pour j De 0 A 2 Faire
      matrice[i, j] <- i * 3 + j + 1
    FinPour
  FinPour

  Ecrire("Matrice:\n")
  Pour i De 0 A 2 Faire
    Pour j De 0 A 2 Faire
      Ecrire(matrice[i, j], " ")
    FinPour
    Ecrire("\n")
  FinPour

  somme <- 0
  Pour i De 0 A 2 Faire
    Pour j De 0 A 2 Faire
      somme <- somme + matrice[i, j]
    FinPour
  FinPour

  Ecrire("Somme totale: ", somme, "\n")
Fin`,
        input: "",
      },
      functionSquare: {
        code: `Algorithme AvecFonction

Fonction Carre(n : Entier) : Entier
Variables resultat : Entier
Debut
  resultat <- n * n
  Retourner resultat
Fin

Variables x, y : Entier

Debut
  Ecrire("Entrez un nombre:\n")
  Lire(x)
  y <- Carre(x)
  Ecrire("Le carré de ", x, " est ", y, "\n")
  Ecrire("Le carré de 5 est ", Carre(5), "\n")
Fin`,
        input: "7",
      },
      procedureGreet: {
        code: `Algorithme AvecProcedure

Procedure Saluer(nom : Chaine, fois : Entier)
Variables i : Entier
Debut
  Pour i De 1 A fois Faire
    Ecrire("Bonjour ", nom, "!\n")
  FinPour
Fin

Variables
  prenom : Chaine
  nombre : Entier

Debut
  Ecrire("Votre prénom:\n")
  Lire(prenom)
  Ecrire("Nombre de salutations:\n")
  Lire(nombre)
  Saluer(prenom, nombre)
  Ecrire("Terminé!\n")
Fin`,
        input: "Alice\n3",
      },
      matchDay: {
        code: `Algorithme JourSemaine
Variables jour : Entier

Debut
  Ecrire("Entrez un numéro (1-7):\n")
  Lire(jour)

  Selon jour
    Cas 1:
      Ecrire("Lundi\n")
    Cas 2:
      Ecrire("Mardi\n")
    Cas 3:
      Ecrire("Mercredi\n")
    Cas 4:
      Ecrire("Jeudi\n")
    Cas 5:
      Ecrire("Vendredi\n")
    Cas 6, 7:
      Ecrire("Week-end!\n")
    Defaut:
      Ecrire("Jour invalide\n")
  FinSelon
Fin`,
        input: "3",
      },
      matchGrade: {
        code: `Algorithme MentionExamen
Variables note : Entier

Debut
  Ecrire("Entrez votre note /20:\n")
  Lire(note)

  Selon note
    Cas 18, 19, 20:
      Ecrire("Mention: Excellent\n")
    Cas 16, 17:
      Ecrire("Mention: Très Bien\n")
    Cas 14, 15:
      Ecrire("Mention: Bien\n")
    Cas 12, 13:
      Ecrire("Mention: Assez Bien\n")
    Cas 10, 11:
      Ecrire("Mention: Passable\n")
    Defaut:
      Ecrire("Mention: Insuffisant\n")
  FinSelon
Fin`,
        input: "16",
      },
    };

    const example = examples[exampleName];
    if (example) {
      setCode(example.code);
      setInput(example.input);
      setOutput([]);
      setError(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Examples Bar */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => loadExample("hello")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-300 hover:border-gray-400 transition-all"
            >
              Bonjour
            </button>
            <button
              onClick={() => loadExample("factorial")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-300 hover:border-gray-400 transition-all"
            >
              Factorielle
            </button>
            <button
              onClick={() => loadExample("fibonacci")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-300 hover:border-gray-400 transition-all"
            >
              Fibonacci
            </button>
            <button
              onClick={() => loadExample("prime")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-300 hover:border-gray-400 transition-all"
            >
              Nombre Premier
            </button>
            <button
              onClick={() => loadExample("array1d")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-300 hover:border-gray-400 transition-all"
            >
              Tableau 1D
            </button>
            <button
              onClick={() => loadExample("array2d")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-300 hover:border-gray-400 transition-all"
            >
              Matrice 2D
            </button>
            <button
              onClick={() => loadExample("functionSquare")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-300 hover:border-gray-400 transition-all"
            >
              Fonction
            </button>
            <button
              onClick={() => loadExample("procedureGreet")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-300 hover:border-gray-400 transition-all"
            >
              Procédure
            </button>
            <button
              onClick={() => loadExample("matchDay")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-300 hover:border-gray-400 transition-all"
            >
              Selon (Jour)
            </button>
            <button
              onClick={() => loadExample("matchGrade")}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-300 hover:border-gray-400 transition-all"
            >
              Selon (Note)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Code Editor */}
              <div className="border border-gray-200">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">Algorithme</h2>
                  <span className="text-xs text-gray-500">Tapez &lt;- pour ←</span>
                </div>
                <div className="bg-gray-900 min-h-[480px]">
                  <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlightSyntax(code)}
                    padding={20}
                    tabSize={2}
                    insertSpaces={true}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                      lineHeight: 1.5,
                      backgroundColor: '#111827',
                      color: '#e5e7eb',
                      minHeight: '480px',
                      caretColor: 'white'
                    }}
                  />
                </div>
              </div>

              {/* Input Section */}
              <div className="border border-gray-200">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">Entrées</h2>
                  <span className="text-xs text-gray-500">Une valeur par ligne</span>
                </div>
                <textarea
                  className="w-full bg-white text-gray-900 font-mono text-sm p-5 outline-none resize-none min-h-[160px] border-0 focus:ring-2 focus:ring-inset focus:ring-gray-900"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Valeurs d'entrée..."
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Output Section */}
              <div className="border border-gray-200">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">Sortie</h2>
                  <button
                    onClick={executeAlgorithm}
                    disabled={isRunning}
                    className="px-5 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white disabled:text-gray-500 text-sm font-medium transition-colors disabled:cursor-not-allowed"
                  >
                    {isRunning ? "Exécution..." : "Exécuter"}
                  </button>
                </div>
                <div className="bg-gray-900 text-gray-100 font-mono text-sm p-6 min-h-[480px]">
                  {error ? (
                    <div className="bg-red-50 border border-red-200 text-red-900 p-4 font-sans">
                      <div className="font-semibold mb-2">Erreur</div>
                      <div className="text-sm">{error}</div>
                    </div>
                  ) : output.length > 0 ? (
                    <div className="space-y-1">
                      {output.map((line, index) => (
                        <div key={index} className="text-green-400">
                          {line}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-600 text-sm font-sans">
                      Aucune sortie
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interpreter;
