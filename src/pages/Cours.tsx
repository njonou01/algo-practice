import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, GitBranch, RotateCcw, Settings2, Code, Lightbulb, BookMarked, AlertTriangle, CheckCircle2, ChevronDown, ChevronRight } from 'lucide-react';
import { CollapsibleSection } from '../components/CollapsibleSection';

/**
 * Page Cours - Apprentissage progressif de l'algorithmique
 *
 * Un cours complet en 4 parties pour apprendre l'algorithmique depuis zéro
 */

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: React.ReactElement;
  example?: {
    code: string;
    input: string[];
  };
}

function Cours() {
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState<string>('partie1-1');
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['partie1']); // Partie 1 ouverte par défaut

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const lessons: { [key: string]: Lesson } = {
    // ==================== PARTIE 1: LES BASES ====================

    'partie1-1': {
      id: 'partie1-1',
      title: '1.1 - Qu\'est-ce qu\'un algorithme ?',
      description: 'Introduction aux algorithmes',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Un <strong>algorithme</strong> est une <strong>recette de cuisine</strong> pour l'ordinateur :
                  une suite d'instructions précises qui permettent de résoudre un problème étape par étape.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Pourquoi apprendre les algorithmes ?"
            defaultOpen={true}
            icon={<BookMarked className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Imaginez que vous voulez expliquer à un ami comment faire un gâteau au chocolat.
                Vous ne pouvez pas juste dire "fais un gâteau" ! Vous devez donner des instructions précises :
              </p>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Recette du gâteau (= Algorithme)</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2">
                  <li>Préchauffer le four à 180°C</li>
                  <li>Casser 3 œufs dans un saladier</li>
                  <li>Ajouter 150g de sucre et mélanger</li>
                  <li>Incorporer 200g de farine</li>
                  <li>Ajouter 50g de chocolat fondu</li>
                  <li>Verser dans un moule beurré</li>
                  <li>Cuire 30 minutes</li>
                </ol>
              </div>

              <p className="text-gray-700">
                C'est <strong>exactement pareil</strong> en programmation ! L'ordinateur a besoin d'instructions
                claires et ordonnées pour accomplir une tâche.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Structure d'un algorithme"
            defaultOpen={true}
            icon={<Code className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Tout algorithme en langage naturel (français) suit cette structure simple :
              </p>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="space-y-1">
                  <div><span className="text-purple-400">Algorithme</span> <span className="text-yellow-300">NomDeLAlgorithme</span></div>
                  <div className="text-gray-500">// Le nom doit être clair et décrit ce que fait l'algorithme</div>
                  <div className="mt-3"><span className="text-purple-400">Variables</span></div>
                  <div className="ml-4 text-gray-500">// Ici on déclare les "boîtes" pour stocker nos données</div>
                  <div className="ml-4">age : <span className="text-blue-400">Entier</span></div>
                  <div className="ml-4">nom : <span className="text-blue-400">Chaine</span></div>
                  <div className="mt-3"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-4 text-gray-500">// Les instructions vont ici</div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Hello World!"</span>)</div>
                  <div><span className="text-purple-400">Fin</span></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Astuce :</strong> Pensez à l'algorithme comme à une pièce de théâtre :
                  il y a une introduction (Variables), une action (Debut...Fin), et une conclusion.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter pour les débutants"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                <h5 className="font-semibold text-orange-900 mb-2">❌ Erreur courante #1</h5>
                <p className="text-sm text-orange-800">
                  Oublier le mot-clé <code className="bg-orange-100 px-2 py-1">Debut</code> ou <code className="bg-orange-100 px-2 py-1">Fin</code>
                </p>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                <h5 className="font-semibold text-orange-900 mb-2">❌ Erreur courante #2</h5>
                <p className="text-sm text-orange-800">
                  Mettre des instructions avant <code className="bg-orange-100 px-2 py-1">Debut</code>
                </p>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                <h5 className="font-semibold text-orange-900 mb-2">❌ Erreur courante #3</h5>
                <p className="text-sm text-orange-800">
                  Donner un nom d'algorithme avec des espaces (utilisez MonAlgo, pas "Mon Algo")
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Un algorithme = une suite d'instructions dans l'ordre</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Structure : Algorithme → Variables → Debut → Instructions → Fin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Chaque instruction fait UNE chose précise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>L'ordre des instructions est CRUCIAL</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme MonPremierAlgo
// Ceci est mon tout premier algorithme !

Debut
  Ecrire("Bonjour, je suis un algorithme !\\n")
  Ecrire("Je peux afficher du texte.\\n")
Fin`,
        input: [],
      },
    },

    'partie1-2': {
      id: 'partie1-2',
      title: '1.2 - Les variables : des boîtes pour stocker',
      description: 'Comprendre et utiliser les variables',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Une <strong>variable</strong> est comme une <strong>boîte étiquetée</strong> dans laquelle
                  on peut mettre une information. Le nom de la boîte permet de retrouver son contenu plus tard.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Comprendre les variables avec une métaphore"
            defaultOpen={true}
            icon={<BookMarked className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez votre chambre avec plusieurs boîtes de rangement :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-purple-200 p-4">
                  <div className="font-bold text-purple-700 mb-2">📦 Boîte "age"</div>
                  <div className="text-gray-600 text-sm">Type : Nombre entier</div>
                  <div className="mt-2 bg-purple-50 p-2 text-center font-mono text-lg">25</div>
                </div>
                <div className="bg-white border-2 border-blue-200 p-4">
                  <div className="font-bold text-blue-700 mb-2">📦 Boîte "prenom"</div>
                  <div className="text-gray-600 text-sm">Type : Texte (Chaine)</div>
                  <div className="mt-2 bg-blue-50 p-2 text-center font-mono">"Alice"</div>
                </div>
                <div className="bg-white border-2 border-green-200 p-4">
                  <div className="font-bold text-green-700 mb-2">📦 Boîte "taille"</div>
                  <div className="text-gray-600 text-sm">Type : Nombre décimal</div>
                  <div className="mt-2 bg-green-50 p-2 text-center font-mono">1.65</div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-4">
                <p className="text-sm text-purple-900">
                  <strong>💡 Point important :</strong> Chaque boîte (variable) a :
                </p>
                <ul className="mt-2 ml-4 space-y-1 text-sm text-purple-800">
                  <li>• Un <strong>nom</strong> (age, prenom, taille)</li>
                  <li>• Un <strong>type</strong> (quel genre de chose peut-on mettre dedans ?)</li>
                  <li>• Une <strong>valeur</strong> (ce qu'elle contient actuellement)</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Les types de variables"
            defaultOpen={true}
            icon={<Code className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700 mb-4">
                Il existe 4 types principaux de variables. Chaque type indique quel genre d'information
                on peut stocker :
              </p>

              <div className="space-y-3">
                <div className="bg-white border-l-4 border-blue-500 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-blue-100 text-blue-800 px-3 py-1 font-bold">Entier</code>
                    <span className="text-gray-600">→</span>
                    <span className="text-gray-700">Nombres sans virgule</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-4">
                    Exemples : <code className="bg-gray-100 px-2 py-1">0</code>,
                    <code className="bg-gray-100 px-2 py-1 ml-2">42</code>,
                    <code className="bg-gray-100 px-2 py-1 ml-2">-17</code>,
                    <code className="bg-gray-100 px-2 py-1 ml-2">1000</code>
                  </p>
                  <p className="text-sm text-gray-600 ml-4 mt-2">
                    <strong>Utilisation :</strong> Pour compter des choses (nombre d'élèves, âge, score...)
                  </p>
                </div>

                <div className="bg-white border-l-4 border-green-500 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-green-100 text-green-800 px-3 py-1 font-bold">Reel</code>
                    <span className="text-gray-600">→</span>
                    <span className="text-gray-700">Nombres avec virgule (décimaux)</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-4">
                    Exemples : <code className="bg-gray-100 px-2 py-1">3.14</code>,
                    <code className="bg-gray-100 px-2 py-1 ml-2">1.75</code>,
                    <code className="bg-gray-100 px-2 py-1 ml-2">-2.5</code>,
                    <code className="bg-gray-100 px-2 py-1 ml-2">0.99</code>
                  </p>
                  <p className="text-sm text-gray-600 ml-4 mt-2">
                    <strong>Utilisation :</strong> Pour les mesures (taille, poids, prix, température...)
                  </p>
                </div>

                <div className="bg-white border-l-4 border-purple-500 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-purple-100 text-purple-800 px-3 py-1 font-bold">Chaine</code>
                    <span className="text-gray-600">→</span>
                    <span className="text-gray-700">Texte (entre guillemets)</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-4">
                    Exemples : <code className="bg-gray-100 px-2 py-1">"Bonjour"</code>,
                    <code className="bg-gray-100 px-2 py-1 ml-2">"Alice"</code>,
                    <code className="bg-gray-100 px-2 py-1 ml-2">"Paris"</code>
                  </p>
                  <p className="text-sm text-gray-600 ml-4 mt-2">
                    <strong>Utilisation :</strong> Pour les noms, messages, adresses...
                  </p>
                </div>

                <div className="bg-white border-l-4 border-orange-500 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-orange-100 text-orange-800 px-3 py-1 font-bold">Booleen</code>
                    <span className="text-gray-600">→</span>
                    <span className="text-gray-700">Vrai ou Faux uniquement</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-4">
                    Exemples : <code className="bg-gray-100 px-2 py-1">Vrai</code>,
                    <code className="bg-gray-100 px-2 py-1 ml-2">Faux</code>
                  </p>
                  <p className="text-sm text-gray-600 ml-4 mt-2">
                    <strong>Utilisation :</strong> Pour les réponses oui/non (est majeur ?, a réussi ?...)
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Comment déclarer une variable ?"
            defaultOpen={true}
            icon={<Code className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Pour créer une variable, on utilise cette syntaxe simple :
              </p>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="mb-4 text-gray-400">// Syntaxe générale</div>
                <div className="mb-6">
                  <span className="text-yellow-300">nom_variable</span> :
                  <span className="text-blue-400"> Type</span>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="mb-4 text-gray-400">// Exemples concrets</div>
                  <div className="space-y-1">
                    <div>age : <span className="text-blue-400">Entier</span></div>
                    <div>prenom : <span className="text-blue-400">Chaine</span></div>
                    <div>taille : <span className="text-blue-400">Reel</span></div>
                    <div>estMajeur : <span className="text-blue-400">Booleen</span></div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="mb-4 text-gray-400">// On peut déclarer plusieurs variables du même type</div>
                  <div>note1, note2, note3 : <span className="text-blue-400">Reel</span></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Règles pour nommer une variable :</strong>
                </p>
                <ul className="mt-2 ml-4 space-y-1 text-sm text-blue-800">
                  <li>✅ Commence par une lettre (pas un chiffre)</li>
                  <li>✅ Pas d'espaces (utilisez noteEtudiant ou note_etudiant)</li>
                  <li>✅ Pas d'accents (évitez prénom, utilisez prenom)</li>
                  <li>✅ Nom clair et compréhensible (age plutôt que a)</li>
                  <li>❌ Pas de mots réservés (Entier, Debut, Fin...)</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Utiliser une variable sans la déclarer</h5>
                <pre className="text-sm text-red-800 bg-red-100 p-2 mt-2">
{`age ← 25  // ERREUR ! age n'existe pas encore`}
                </pre>
                <pre className="text-sm text-green-800 bg-green-100 p-2 mt-2">
{`Variables age : Entier  // ✅ D'abord déclarer
Debut
  age ← 25  // ✅ Ensuite utiliser`}
                </pre>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Mettre du texte dans une variable Entier</h5>
                <pre className="text-sm text-red-800 bg-red-100 p-2 mt-2">
{`Variables age : Entier
Debut
  age ← "vingt"  // ERREUR ! "vingt" n'est pas un nombre`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Une variable = une boîte avec un nom, un type et une valeur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>4 types principaux : Entier, Reel, Chaine, Booleen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Déclarer AVANT d'utiliser (dans la section Variables)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Le type détermine ce qu'on peut mettre dans la variable</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme DeclarationVariables
Variables nom, ville : Chaine
Variables age : Entier
Variables taille, poids : Reel
Variables estEtudiant : Booleen

Debut
  // On verra dans la prochaine leçon comment mettre des valeurs
  Ecrire("Variables déclarées avec succès !\\n")
Fin`,
        input: [],
      },
    },

    // Leçon 3 : L'affectation
    'partie1-3': {
      id: 'partie1-3',
      title: '1.3 - L\'affectation : remplir les boîtes',
      description: 'Donner une valeur à une variable',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-indigo-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  <strong>Affecter</strong> signifie <strong>mettre une valeur dans une variable</strong>.
                  C'est comme remplir une boîte avec un objet. On utilise la flèche <code className="bg-indigo-100 px-2 py-1">←</code>
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Comment ça marche ?"
            defaultOpen={true}
            icon={<BookMarked className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez que vous avez une boîte vide étiquetée "age". Pour mettre le nombre 20 dedans :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-gray-300 p-4">
                  <div className="text-center text-gray-500 mb-2">AVANT l'affectation</div>
                  <div className="border-2 border-dashed border-gray-300 p-4 text-center">
                    <div className="font-bold text-gray-700 mb-2">📦 age</div>
                    <div className="text-gray-400 italic">vide</div>
                  </div>
                </div>
                <div className="bg-white border-2 border-indigo-300 p-4">
                  <div className="text-center text-indigo-700 mb-2">APRÈS : age ← 20</div>
                  <div className="border-2 border-indigo-500 bg-indigo-50 p-4 text-center">
                    <div className="font-bold text-indigo-700 mb-2">📦 age</div>
                    <div className="text-2xl font-mono font-bold text-indigo-900">20</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="text-gray-400 mb-2">// Syntaxe générale</div>
                <div className="text-xl mb-4">
                  <span className="text-yellow-300">variable</span>
                  <span className="text-pink-400"> ← </span>
                  <span className="text-green-300">valeur</span>
                </div>
                <div className="border-t border-gray-700 pt-4 space-y-2">
                  <div className="text-gray-400">// Exemples</div>
                  <div>age <span className="text-pink-400">←</span> 20</div>
                  <div>prenom <span className="text-pink-400">←</span> <span className="text-green-400">"Alice"</span></div>
                  <div>taille <span className="text-pink-400">←</span> 1.65</div>
                  <div>estMajeur <span className="text-pink-400">←</span> Vrai</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm text-yellow-900">
                  <strong>💡 Comment taper la flèche ←</strong> dans l'éditeur AlgoGénie :
                </p>
                <p className="text-sm text-yellow-800 mt-2 ml-4">
                  Tapez simplement <code className="bg-yellow-100 px-2 py-1 font-mono">{"<-"}</code> (signe inférieur + tiret)
                  et ça se transforme automatiquement en <code className="bg-yellow-100 px-2 py-1 font-mono">←</code> !
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Affectation avec calculs"
            defaultOpen={true}
            icon={<Code className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                On peut affecter le résultat d'un calcul à une variable :
              </p>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-3">
                <div className="text-gray-400">// Calculs mathématiques de base</div>
                <div>a <span className="text-pink-400">←</span> 10</div>
                <div>b <span className="text-pink-400">←</span> 5</div>
                <div className="mt-3">somme <span className="text-pink-400">←</span> a + b
                  <span className="text-gray-500 ml-4">// somme vaut 15</span>
                </div>
                <div>difference <span className="text-pink-400">←</span> a - b
                  <span className="text-gray-500 ml-4">// difference vaut 5</span>
                </div>
                <div>produit <span className="text-pink-400">←</span> a * b
                  <span className="text-gray-500 ml-4">// produit vaut 50</span>
                </div>
                <div>quotient <span className="text-pink-400">←</span> a / b
                  <span className="text-gray-500 ml-4">// quotient vaut 2</span>
                </div>
                <div className="mt-4">double <span className="text-pink-400">←</span> a * 2
                  <span className="text-gray-500 ml-4">// double vaut 20</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900">
                  <strong>Opérateurs mathématiques disponibles :</strong>
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div><code className="bg-blue-100 px-2 py-1">+</code> Addition</div>
                  <div><code className="bg-blue-100 px-2 py-1">-</code> Soustraction</div>
                  <div><code className="bg-blue-100 px-2 py-1">*</code> Multiplication</div>
                  <div><code className="bg-blue-100 px-2 py-1">/</code> Division</div>
                  <div><code className="bg-blue-100 px-2 py-1">%</code> Modulo (reste)</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Confondre = et ←</h5>
                <p className="text-sm text-red-800">
                  En algorithmique français, on utilise <code className="bg-red-100 px-2 py-1">←</code> et PAS <code className="bg-red-100 px-2 py-1">=</code>
                </p>
                <pre className="text-sm bg-red-100 p-2 mt-2">age = 20  // ❌ FAUX en algo français</pre>
                <pre className="text-sm bg-green-100 p-2 mt-1">age ← 20  // ✅ CORRECT</pre>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier de déclarer la variable d'abord</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`Debut
  age ← 20  // ❌ age n'existe pas encore !`}
                </pre>
                <pre className="text-sm bg-green-100 p-2 mt-1">
{`Variables age : Entier
Debut
  age ← 20  // ✅ OK`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Affecter = mettre une valeur dans une variable avec ←</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Tapez {"<-"} pour obtenir ←</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>On peut affecter le résultat d'un calcul</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Toujours déclarer la variable AVANT de l'utiliser</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme Affectation
Variables age, anneeNaissance : Entier
Variables prenom : Chaine

Debut
  prenom ← "Alice"
  age ← 25
  anneeNaissance ← 2025 - age

  Ecrire("Prénom: ", prenom, "\\n")
  Ecrire("Age: ", age, " ans\\n")
  Ecrire("Année de naissance: ", anneeNaissance, "\\n")
Fin`,
        input: [],
      },
    },

    // Leçon 1.4 : Afficher avec Ecrire()
    'partie1-4': {
      id: 'partie1-4',
      title: '1.4 - Afficher avec Ecrire()',
      description: 'Communiquer avec l\'utilisateur',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  <strong>Ecrire()</strong> permet d'afficher du texte ou des valeurs à l'écran.
                  C'est comme parler à l'utilisateur : vous lui montrez des informations.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Syntaxe de base"
            defaultOpen={true}
            icon={<Code className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="text-gray-400 mb-3">// Afficher du texte simple</div>
                <div className="mb-4">
                  Ecrire(<span className="text-green-400">"Bonjour !"</span>)
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="text-gray-400 mb-3">// Afficher une variable</div>
                  <div className="mb-4">
                    <div>age <span className="text-pink-400">←</span> 25</div>
                    <div>Ecrire(age)  <span className="text-gray-500">// Affiche: 25</span></div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="text-gray-400 mb-3">// Afficher plusieurs choses (séparées par des virgules)</div>
                  <div>
                    Ecrire(<span className="text-green-400">"J'ai "</span>, age, <span className="text-green-400">" ans"</span>)
                  </div>
                  <div className="text-gray-500 mt-1">// Affiche: J'ai 25 ans</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm font-semibold text-yellow-900 mb-2">⚠️ Le caractère spécial \n</p>
                <p className="text-sm text-yellow-800">
                  <code className="bg-yellow-100 px-2 py-1">\n</code> signifie "aller à la ligne".
                  C'est comme appuyer sur Entrée.
                </p>
                <div className="mt-3 bg-gray-900 text-gray-100 p-3 font-mono text-sm">
                  Ecrire(<span className="text-green-400">"Ligne 1\nLigne 2"</span>)
                </div>
                <div className="mt-2 text-sm text-yellow-800">
                  Affiche :<br/>
                  Ligne 1<br/>
                  Ligne 2
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Exemples pratiques"
            defaultOpen={true}
            icon={<BookMarked className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 1 : Message de bienvenue</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm">
                  <div>Ecrire(<span className="text-green-400">"=== Bienvenue dans AlgoGénie ===\n"</span>)</div>
                  <div>Ecrire(<span className="text-green-400">"Commençons à programmer !\n"</span>)</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 2 : Afficher un calcul</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>a <span className="text-pink-400">←</span> 10</div>
                  <div>b <span className="text-pink-400">←</span> 5</div>
                  <div>resultat <span className="text-pink-400">←</span> a + b</div>
                  <div className="mt-2">Ecrire(<span className="text-green-400">"Le résultat est: "</span>, resultat, <span className="text-green-400">"\n"</span>)</div>
                  <div className="text-gray-500">// Affiche: Le résultat est: 15</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier les guillemets pour le texte</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">Ecrire(Bonjour)  // ❌ Bonjour n'est pas une variable</pre>
                <pre className="text-sm bg-green-100 p-2 mt-1">Ecrire("Bonjour")  // ✅ CORRECT</pre>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier \n pour aller à la ligne</h5>
                <p className="text-sm text-red-800">
                  Sans \n, tout s'affiche sur la même ligne. N'oubliez pas d'ajouter \n à la fin !
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Ecrire() affiche du texte ou des variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Le texte doit être entre guillemets "..."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>On peut afficher plusieurs choses séparées par des virgules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>\n permet d'aller à la ligne</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme AffichageComplet
Variables nom : Chaine
Variables age : Entier

Debut
  nom ← "Alice"
  age ← 20

  Ecrire("=== Profil Utilisateur ===\n")
  Ecrire("Nom: ", nom, "\n")
  Ecrire("Age: ", age, " ans\n")
  Ecrire("========================\n")
Fin`,
        input: [],
      },
    },

    // Leçon 1.5 : Lire avec Lire()
    'partie1-5': {
      id: 'partie1-5',
      title: '1.5 - Lire les entrées avec Lire()',
      description: 'Recevoir des données de l\'utilisateur',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  <strong>Lire()</strong> permet de demander une information à l'utilisateur.
                  C'est comme poser une question et attendre la réponse.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Comment ça fonctionne ?"
            defaultOpen={true}
            icon={<BookMarked className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez un dialogue :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border-2 border-blue-200 p-4">
                  <div className="font-bold text-blue-700 mb-2">💻 L'algorithme demande :</div>
                  <div className="bg-white p-3 font-mono text-sm">
                    Ecrire("Votre âge ?\n")<br/>
                    Lire(age)
                  </div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 p-4">
                  <div className="font-bold text-green-700 mb-2">👤 L'utilisateur répond :</div>
                  <div className="bg-white p-3 font-mono text-sm text-center">
                    25
                  </div>
                  <div className="text-sm text-green-700 mt-2">→ La valeur 25 est stockée dans age</div>
                </div>
              </div>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="text-gray-400 mb-3">// Syntaxe générale</div>
                <div className="mb-4">
                  Lire(<span className="text-yellow-300">nom_variable</span>)
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="text-gray-400 mb-3">// Exemple complet</div>
                  <div className="space-y-1">
                    <div>Ecrire(<span className="text-green-400">"Entrez votre prénom:\n"</span>)</div>
                    <div>Lire(prenom)</div>
                    <div className="mt-3">Ecrire(<span className="text-green-400">"Bonjour "</span>, prenom, <span className="text-green-400">"!\n"</span>)</div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Lire différents types de données"
            defaultOpen={true}
            icon={<Code className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-4">
                <div>
                  <div className="text-gray-400 mb-2">// Lire un nombre entier</div>
                  <div>Variables age : <span className="text-blue-400">Entier</span></div>
                  <div>Ecrire(<span className="text-green-400">"Votre âge ?\n"</span>)</div>
                  <div>Lire(age)</div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="text-gray-400 mb-2">// Lire un nombre décimal</div>
                  <div>Variables taille : <span className="text-blue-400">Reel</span></div>
                  <div>Ecrire(<span className="text-green-400">"Votre taille (m) ?\n"</span>)</div>
                  <div>Lire(taille)</div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="text-gray-400 mb-2">// Lire du texte</div>
                  <div>Variables ville : <span className="text-blue-400">Chaine</span></div>
                  <div>Ecrire(<span className="text-green-400">"Votre ville ?\n"</span>)</div>
                  <div>Lire(ville)</div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Astuce :</strong> Dans AlgoGénie, vous préparez les valeurs d'entrée
                  dans l'onglet "Entrées" de la console avant d'exécuter l'algorithme.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges courants"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Utiliser une variable non déclarée</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`Debut
  Lire(age)  // ❌ age n'est pas déclaré !`}
                </pre>
                <pre className="text-sm bg-green-100 p-2 mt-1">
{`Variables age : Entier
Debut
  Lire(age)  // ✅ OK`}
                </pre>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier d'afficher une question</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">Lire(nom)  // ❌ L'utilisateur ne sait pas quoi entrer</pre>
                <pre className="text-sm bg-green-100 p-2 mt-1">
{`Ecrire("Votre nom ?\n")
Lire(nom)  // ✅ MIEUX`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Lire() attend une valeur de l'utilisateur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>La variable doit être déclarée AVANT Lire()</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Toujours afficher une question avec Ecrire() avant Lire()</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Le type de la variable détermine quel type de donnée on peut lire</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme Presentation
Variables nom, ville : Chaine
Variables age : Entier

Debut
  Ecrire("=== Présentez-vous ===\n")

  Ecrire("Votre nom ?\n")
  Lire(nom)

  Ecrire("Votre âge ?\n")
  Lire(age)

  Ecrire("Votre ville ?\n")
  Lire(ville)

  Ecrire("\n=== Résumé ===\n")
  Ecrire("Bonjour ", nom, " !\n")
  Ecrire("Vous avez ", age, " ans\n")
  Ecrire("Vous habitez à ", ville, "\n")
Fin`,
        input: ["Alice", "25", "Paris"],
      },
    },

    // Leçon 1.6 : Les opérations
    'partie1-6': {
      id: 'partie1-6',
      title: '1.6 - Les opérations et expressions',
      description: 'Calculer et manipuler des données',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-orange-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Les <strong>opérations</strong> permettent de faire des calculs et de manipuler les données.
                  On peut additionner, comparer, combiner... C'est la base de la programmation !
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Opérations arithmétiques"
            defaultOpen={true}
            icon={<Code className="text-orange-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Opérateurs de base</h4>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span><code className="bg-blue-100 px-2 py-1">+</code> Addition</span>
                      <span className="text-gray-600">5 + 3 = 8</span>
                    </div>
                    <div className="flex justify-between">
                      <span><code className="bg-blue-100 px-2 py-1">-</code> Soustraction</span>
                      <span className="text-gray-600">5 - 3 = 2</span>
                    </div>
                    <div className="flex justify-between">
                      <span><code className="bg-blue-100 px-2 py-1">*</code> Multiplication</span>
                      <span className="text-gray-600">5 * 3 = 15</span>
                    </div>
                    <div className="flex justify-between">
                      <span><code className="bg-blue-100 px-2 py-1">/</code> Division</span>
                      <span className="text-gray-600">6 / 3 = 2</span>
                    </div>
                    <div className="flex justify-between">
                      <span><code className="bg-blue-100 px-2 py-1">%</code> Modulo (reste)</span>
                      <span className="text-gray-600">7 % 3 = 1</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Priorités des opérations</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>1️⃣ Parenthèses <code className="bg-gray-100 px-1">()</code></div>
                    <div>2️⃣ Multiplication <code className="bg-gray-100 px-1">*</code> et Division <code className="bg-gray-100 px-1">/</code></div>
                    <div>3️⃣ Addition <code className="bg-gray-100 px-1">+</code> et Soustraction <code className="bg-gray-100 px-1">-</code></div>
                  </div>
                  <div className="mt-3 bg-gray-900 text-gray-100 p-2 font-mono text-sm">
                    <div>2 + 3 * 4 = 14  <span className="text-gray-500">// pas 20 !</span></div>
                    <div>(2 + 3) * 4 = 20</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-3">
                <div className="text-gray-400">// Exemples pratiques</div>
                <div>moyenne ← (note1 + note2 + note3) / 3</div>
                <div>aire ← longueur * largeur</div>
                <div>reste ← nombre % 2  <span className="text-gray-500">// Pour savoir si pair/impair</span></div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Opérations sur les chaînes"
            defaultOpen={true}
            icon={<Code className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                On peut aussi manipuler du texte avec l'opérateur <code className="bg-gray-100 px-2 py-1">+</code>
                pour <strong>concaténer</strong> (coller ensemble) :
              </p>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-3">
                <div>prenom ← <span className="text-green-400">"Alice"</span></div>
                <div>nom ← <span className="text-green-400">"Martin"</span></div>
                <div className="mt-2">nomComplet ← prenom + <span className="text-green-400">" "</span> + nom</div>
                <div className="text-gray-500">// nomComplet vaut "Alice Martin"</div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Opérateurs de comparaison"
            defaultOpen={true}
            icon={<Code className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Ces opérateurs permettent de comparer des valeurs. Ils donnent un résultat <strong>Vrai</strong> ou <strong>Faux</strong> :
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 font-mono text-sm">
                  <div><code className="bg-blue-100 px-2 py-1">=</code> égal à</div>
                  <div><code className="bg-blue-100 px-2 py-1">≠</code> différent de</div>
                  <div><code className="bg-blue-100 px-2 py-1">&lt;</code> inférieur à</div>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div><code className="bg-blue-100 px-2 py-1">&gt;</code> supérieur à</div>
                  <div><code className="bg-blue-100 px-2 py-1">≤</code> inférieur ou égal</div>
                  <div><code className="bg-blue-100 px-2 py-1">≥</code> supérieur ou égal</div>
                </div>
              </div>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-2">
                <div>age = 18  <span className="text-gray-500">// Vrai si age vaut exactement 18</span></div>
                <div>age &gt; 18  <span className="text-gray-500">// Vrai si age est plus grand que 18</span></div>
                <div>age ≥ 18  <span className="text-gray-500">// Vrai si age est 18 ou plus</span></div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm text-yellow-900">
                  <strong>💡 Note :</strong> Nous utiliserons ces comparaisons dans la prochaine partie
                  sur les <strong>conditions</strong> (Si...Alors...Sinon) !
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Division par zéro</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">resultat ← 10 / 0  // ❌ ERREUR !</pre>
                <p className="text-sm text-red-800 mt-2">Vérifiez toujours que le diviseur n'est pas zéro</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier les parenthèses</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">moyenne ← note1 + note2 + note3 / 3  // ❌ FAUX !</pre>
                <pre className="text-sm bg-green-100 p-2 mt-1">moyenne ← (note1 + note2 + note3) / 3  // ✅ CORRECT</pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>5 opérateurs arithmétiques : + - * / %</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Priorité : () puis */ puis +-</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>+ permet aussi de concaténer du texte</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Les comparaisons (=, &lt;, &gt;, ≤, ≥, ≠) donnent Vrai ou Faux</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme CalculsMathematiques
Variables a, b, somme, produit, moyenne : Entier
Variables message : Chaine

Debut
  a ← 15
  b ← 10

  somme ← a + b
  produit ← a * b
  moyenne ← (a + b) / 2

  message ← "Résultats pour " + "a="

  Ecrire("Somme: ", somme, "\\n")
  Ecrire("Produit: ", produit, "\\n")
  Ecrire("Moyenne: ", moyenne, "\\n")
  Ecrire("a est plus grand que b: ", a > b, "\\n")
Fin`,
        input: [],
      },
    },

    // ==================== PARTIE 2: STRUCTURES CONDITIONNELLES ====================

    // Leçon 2.1 : Le Si...Alors...Sinon
    'partie2-1': {
      id: 'partie2-1',
      title: '2.1 - Le Si...Alors...Sinon',
      description: 'Faire des choix dans un algorithme',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  La structure <strong>Si...Alors...Sinon</strong> permet à l'algorithme de <strong>prendre des décisions</strong>.
                  C'est comme un carrefour : selon une condition, on prend un chemin différent.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="La métaphore du feu tricolore"
            defaultOpen={true}
            icon={<BookMarked className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez que vous arrivez à un feu de circulation :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 border-2 border-red-300 p-4">
                  <div className="font-bold text-red-700 mb-2">🔴 SI le feu est rouge</div>
                  <div className="text-gray-700">→ ALORS je m'arrête</div>
                </div>
                <div className="bg-green-50 border-2 border-green-300 p-4">
                  <div className="font-bold text-green-700 mb-2">🟢 SINON (le feu est vert)</div>
                  <div className="text-gray-700">→ Je passe</div>
                </div>
              </div>

              <p className="text-gray-700 mt-4">
                En algorithmique, c'est <strong>exactement pareil</strong> : on teste une condition,
                et selon le résultat (Vrai ou Faux), on exécute des instructions différentes.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Syntaxe complète"
            defaultOpen={true}
            icon={<Code className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="text-gray-400 mb-3">// Structure générale</div>
                <div className="space-y-1">
                  <div><span className="text-purple-400">Si</span> (<span className="text-yellow-300">condition</span>) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-4 text-gray-500">// Instructions si la condition est Vraie</div>
                  <div className="ml-4">instruction1</div>
                  <div className="ml-4">instruction2</div>
                  <div><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-4 text-gray-500">// Instructions si la condition est Fausse</div>
                  <div className="ml-4">instruction3</div>
                  <div className="ml-4">instruction4</div>
                  <div><span className="text-purple-400">FinSi</span></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900 mb-2">
                  <strong>💡 Forme simplifiée (sans Sinon) :</strong>
                </p>
                <p className="text-sm text-blue-800">
                  Si vous n'avez rien à faire dans le cas Faux, vous pouvez omettre le <code className="bg-blue-100 px-2 py-1">Sinon</code> :
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 font-mono text-sm mt-2">
                  <div><span className="text-purple-400">Si</span> (age {'>='} 18) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Vous êtes majeur\n"</span>)</div>
                  <div><span className="text-purple-400">FinSi</span></div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Exemples concrets"
            defaultOpen={true}
            icon={<BookMarked className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 1 : Vérifier la majorité</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>age ← 20</div>
                  <div className="mt-2"><span className="text-purple-400">Si</span> (age {'>='} 18) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Vous êtes majeur\n"</span>)</div>
                  <div><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Vous êtes mineur\n"</span>)</div>
                  <div><span className="text-purple-400">FinSi</span></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 2 : Nombre positif ou négatif</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>nombre ← -5</div>
                  <div className="mt-2"><span className="text-purple-400">Si</span> (nombre {'>='} 0) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Le nombre est positif\n"</span>)</div>
                  <div><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Le nombre est négatif\n"</span>)</div>
                  <div><span className="text-purple-400">FinSi</span></div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier le FinSi</h5>
                <p className="text-sm text-red-800">
                  Chaque <code className="bg-red-100 px-2 py-1">Si</code> doit avoir son <code className="bg-red-100 px-2 py-1">FinSi</code> correspondant !
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Mettre des instructions entre Sinon et FinSi sans bloc</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`Si (age >= 18) Alors
  Ecrire("Majeur\\n")
instruction_erreur  // ❌ Pas à cet endroit !
Sinon
  Ecrire("Mineur\\n")
FinSi`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Si...Alors...Sinon permet de faire des choix</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>La condition est évaluée : si Vrai → bloc Alors, si Faux → bloc Sinon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Le Sinon est optionnel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Toujours terminer par FinSi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme TestMajorite
Variables age : Entier

Debut
  Ecrire("Entrez votre âge:\\n")
  Lire(age)

  Si (age >= 18) Alors
    Ecrire("Vous êtes majeur.\\n")
    Ecrire("Vous pouvez voter.\\n")
  Sinon
    Ecrire("Vous êtes mineur.\\n")
    Ecrire("Vous ne pouvez pas encore voter.\\n")
  FinSi

  Ecrire("Programme terminé.\\n")
Fin`,
        input: ["20"],
      },
    },

    // Leçon 2.2 : Les conditions composées
    'partie2-2': {
      id: 'partie2-2',
      title: '2.2 - Les conditions composées (ET, OU, NON)',
      description: 'Combiner plusieurs conditions',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Les <strong>opérateurs logiques</strong> permettent de combiner plusieurs conditions.
                  On peut vérifier si <strong>plusieurs choses sont vraies en même temps</strong> (ET),
                  si <strong>au moins une est vraie</strong> (OU), ou <strong>inverser</strong> une condition (NON).
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Les trois opérateurs logiques"
            defaultOpen={true}
            icon={<Code className="text-blue-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="bg-white border-l-4 border-blue-500 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-blue-100 text-blue-800 px-3 py-1 font-bold">ET</code>
                    <span className="text-gray-700">→ Les deux conditions doivent être vraies</span>
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-3 font-mono text-sm">
                    <div>(age {'>='} 18) <span className="text-yellow-400">ET</span> (permis = Vrai)</div>
                    <div className="text-gray-500 mt-1">// Vrai seulement si les DEUX sont vrais</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-4">
                    <strong>Exemple :</strong> Pour conduire, il faut être majeur ET avoir le permis.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-green-500 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-green-100 text-green-800 px-3 py-1 font-bold">OU</code>
                    <span className="text-gray-700">→ Au moins une des conditions doit être vraie</span>
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-3 font-mono text-sm">
                    <div>(jour = <span className="text-green-400">"Samedi"</span>) <span className="text-yellow-400">OU</span> (jour = <span className="text-green-400">"Dimanche"</span>)</div>
                    <div className="text-gray-500 mt-1">// Vrai si c'est samedi OU dimanche (ou les deux)</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-4">
                    <strong>Exemple :</strong> Le magasin est fermé le samedi OU le dimanche.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-orange-500 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-orange-100 text-orange-800 px-3 py-1 font-bold">NON</code>
                    <span className="text-gray-700">→ Inverse la condition</span>
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-3 font-mono text-sm">
                    <div><span className="text-yellow-400">NON</span> (estPluie)</div>
                    <div className="text-gray-500 mt-1">// Vrai si estPluie est Faux (s'il ne pleut PAS)</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-4">
                    <strong>Exemple :</strong> Je sors s'il ne pleut pas.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Table de vérité"
            defaultOpen={true}
            icon={<BookMarked className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Voici comment se comportent les opérateurs selon les valeurs :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-4">
                  <h4 className="font-semibold text-blue-700 mb-3">ET (les deux doivent être Vrai)</h4>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">A</th>
                        <th className="p-2 text-left">B</th>
                        <th className="p-2 text-left">A ET B</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      <tr className="border-t">
                        <td className="p-2">Vrai</td>
                        <td className="p-2">Vrai</td>
                        <td className="p-2 font-bold text-green-700">Vrai</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">Vrai</td>
                        <td className="p-2">Faux</td>
                        <td className="p-2 text-red-700">Faux</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">Faux</td>
                        <td className="p-2">Vrai</td>
                        <td className="p-2 text-red-700">Faux</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">Faux</td>
                        <td className="p-2">Faux</td>
                        <td className="p-2 text-red-700">Faux</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white border border-gray-200 p-4">
                  <h4 className="font-semibold text-green-700 mb-3">OU (au moins un Vrai)</h4>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">A</th>
                        <th className="p-2 text-left">B</th>
                        <th className="p-2 text-left">A OU B</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      <tr className="border-t">
                        <td className="p-2">Vrai</td>
                        <td className="p-2">Vrai</td>
                        <td className="p-2 text-green-700">Vrai</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">Vrai</td>
                        <td className="p-2">Faux</td>
                        <td className="p-2 text-green-700">Vrai</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">Faux</td>
                        <td className="p-2">Vrai</td>
                        <td className="p-2 text-green-700">Vrai</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">Faux</td>
                        <td className="p-2">Faux</td>
                        <td className="p-2 font-bold text-red-700">Faux</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Exemples pratiques"
            defaultOpen={true}
            icon={<BookMarked className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple avec ET</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>age ← 20</div>
                  <div>aPermis ← Vrai</div>
                  <div className="mt-2"><span className="text-purple-400">Si</span> (age {'>='} 18) <span className="text-yellow-400">ET</span> (aPermis = Vrai) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Vous pouvez conduire\\n"</span>)</div>
                  <div><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Vous ne pouvez pas conduire\\n"</span>)</div>
                  <div><span className="text-purple-400">FinSi</span></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple avec OU</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>note ← 15</div>
                  <div className="mt-2"><span className="text-purple-400">Si</span> (note {'>='} 16) <span className="text-yellow-400">OU</span> (note = 15) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Mention Bien ou Très Bien\\n"</span>)</div>
                  <div><span className="text-purple-400">FinSi</span></div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Confondre ET et OU</h5>
                <p className="text-sm text-red-800">
                  ET est plus restrictif (les deux doivent être vrais), OU est plus permissif (un seul suffit).
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier les parenthèses</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
Si age {'>'} 18 ET note {'>'} 10 Alors  {`// ❌ Ambigu !`}
                </pre>
                <pre className="text-sm bg-green-100 p-2 mt-1">
Si (age {'>'} 18) ET (note {'>'} 10) Alors  {`// ✅ Clair`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>ET : toutes les conditions doivent être vraies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>OU : au moins une condition doit être vraie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>NON : inverse le résultat d'une condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Toujours utiliser des parenthèses pour clarifier</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme AdmissionUniversite
Variables note : Reel
Variables aRecommandation : Booleen

Debut
  Ecrire("Entrez votre note (sur 20):\\n")
  Lire(note)

  Ecrire("Avez-vous une recommandation ? (Vrai/Faux):\\n")
  Lire(aRecommandation)

  Si (note >= 12) ET (aRecommandation = Vrai) Alors
    Ecrire("Admission ACCEPTÉE (note + recommandation)\\n")
  Sinon
    Si (note >= 14) Alors
      Ecrire("Admission ACCEPTÉE (excellente note)\\n")
    Sinon
      Ecrire("Admission REFUSÉE\\n")
    FinSi
  FinSi
Fin`,
        input: ["13", "Vrai"],
      },
    },

    // Leçon 2.3 : Les conditions imbriquées
    'partie2-3': {
      id: 'partie2-3',
      title: '2.3 - Les conditions imbriquées',
      description: 'Mettre des Si à l\'intérieur d\'autres Si',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Les <strong>conditions imbriquées</strong> permettent de placer un <code className="bg-purple-100 px-2 py-1">Si</code> à l'intérieur
                  d'un autre <code className="bg-purple-100 px-2 py-1">Si</code>. C'est utile pour tester des conditions <strong>de plus en plus précises</strong>.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="La métaphore des poupées russes"
            defaultOpen={true}
            icon={<BookMarked className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez des <strong>poupées russes</strong> (matriochkas) : une petite poupée dans une moyenne, dans une grande.
                Les conditions imbriquées fonctionnent pareil : un test à l'intérieur d'un autre test.
              </p>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple : Attribution de mention</h4>
                <div className="space-y-2 text-gray-700 text-sm">
                  <div className="pl-0">🔹 SI note {'>='} 10 (admis)</div>
                  <div className="pl-8">→ SI note {'>='} 16 (très bien)</div>
                  <div className="pl-16">→ SI note {'>='} 18 (excellent !)</div>
                  <div className="pl-16">→ SINON (très bien)</div>
                  <div className="pl-8">→ SINON SI note {'>='} 14 (bien)</div>
                  <div className="pl-8">→ SINON (passable)</div>
                  <div className="pl-0">🔹 SINON (recalé)</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Syntaxe et structure"
            defaultOpen={true}
            icon={<Code className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="space-y-1">
                  <div><span className="text-purple-400">Si</span> (condition1) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-4"><span className="text-gray-500">// Premier niveau</span></div>
                  <div className="ml-4"><span className="text-purple-400">Si</span> (condition2) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-8"><span className="text-gray-500">// Deuxième niveau (imbriqué)</span></div>
                  <div className="ml-8">instruction1</div>
                  <div className="ml-4"><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-8">instruction2</div>
                  <div className="ml-4"><span className="text-purple-400">FinSi</span></div>
                  <div><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-4">instruction3</div>
                  <div><span className="text-purple-400">FinSi</span></div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ Astuce indentation :</strong> Décalez chaque niveau vers la droite pour mieux voir la structure !
                  Chaque <code className="bg-yellow-100 px-2 py-1">FinSi</code> correspond au <code className="bg-yellow-100 px-2 py-1">Si</code> du même niveau d'indentation.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Exemple complet : Mention selon la note"
            defaultOpen={true}
            icon={<BookMarked className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-1">
                <div>note ← 17</div>
                <div className="mt-3"><span className="text-purple-400">Si</span> (note {'>='} 10) <span className="text-purple-400">Alors</span></div>
                <div className="ml-4">Ecrire(<span className="text-green-400">"Admis - "</span>)</div>
                <div className="ml-4 mt-2"><span className="text-purple-400">Si</span> (note {'>='} 16) <span className="text-purple-400">Alors</span></div>
                <div className="ml-8">Ecrire(<span className="text-green-400">"Mention Très Bien\\n"</span>)</div>
                <div className="ml-4"><span className="text-purple-400">Sinon</span></div>
                <div className="ml-8"><span className="text-purple-400">Si</span> (note {'>='} 14) <span className="text-purple-400">Alors</span></div>
                <div className="ml-12">Ecrire(<span className="text-green-400">"Mention Bien\\n"</span>)</div>
                <div className="ml-8"><span className="text-purple-400">Sinon</span></div>
                <div className="ml-12"><span className="text-purple-400">Si</span> (note {'>='} 12) <span className="text-purple-400">Alors</span></div>
                <div className="ml-16">Ecrire(<span className="text-green-400">"Mention Assez Bien\\n"</span>)</div>
                <div className="ml-12"><span className="text-purple-400">Sinon</span></div>
                <div className="ml-16">Ecrire(<span className="text-green-400">"Mention Passable\\n"</span>)</div>
                <div className="ml-12"><span className="text-purple-400">FinSi</span></div>
                <div className="ml-8"><span className="text-purple-400">FinSi</span></div>
                <div className="ml-4"><span className="text-purple-400">FinSi</span></div>
                <div><span className="text-purple-400">Sinon</span></div>
                <div className="ml-4">Ecrire(<span className="text-green-400">"Recalé\\n"</span>)</div>
                <div><span className="text-purple-400">FinSi</span></div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Perdre le compte des FinSi</h5>
                <p className="text-sm text-red-800">
                  Chaque <code className="bg-red-100 px-2 py-1">Si</code> doit avoir SON <code className="bg-red-100 px-2 py-1">FinSi</code>.
                  Si vous en oubliez un, l'algorithme ne compilera pas.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Mauvaise indentation</h5>
                <p className="text-sm text-red-800">
                  Sans indentation claire, impossible de savoir quel FinSi correspond à quel Si.
                  Décalez TOUJOURS vos blocs !
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Trop d'imbrications (plus de 3 niveaux)</h5>
                <p className="text-sm text-red-800">
                  Au-delà de 3 niveaux, envisagez d'utiliser des opérateurs logiques (ET/OU) ou un Selon.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>On peut imbriquer des Si les uns dans les autres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Chaque Si a son propre FinSi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>L'indentation est CRUCIALE pour la lisibilité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Au-delà de 3 niveaux, cherchez une autre solution</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme CalculMention
Variables note : Reel

Debut
  Ecrire("Entrez votre note sur 20:\\n")
  Lire(note)

  Si (note >= 10) Alors
    Ecrire("🎉 ADMIS - ")

    Si (note >= 16) Alors
      Ecrire("Mention Très Bien\\n")
    Sinon
      Si (note >= 14) Alors
        Ecrire("Mention Bien\\n")
      Sinon
        Si (note >= 12) Alors
          Ecrire("Mention Assez Bien\\n")
        Sinon
          Ecrire("Mention Passable\\n")
        FinSi
      FinSi
    FinSi
  Sinon
    Ecrire("❌ RECALÉ (note < 10)\\n")
  FinSi
Fin`,
        input: ["15"],
      },
    },

    // Leçon 2.4 : Le Selon (switch/case)
    'partie2-4': {
      id: 'partie2-4',
      title: '2.4 - Le Selon (choix multiples)',
      description: 'Une alternative élégante aux Si imbriqués',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  La structure <strong>Selon</strong> (équivalent du switch/case dans d'autres langages)
                  permet de <strong>tester une variable contre plusieurs valeurs</strong> de façon claire et lisible.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Pourquoi utiliser Selon ?"
            defaultOpen={true}
            icon={<BookMarked className="text-yellow-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez que vous voulez afficher un message selon le jour de la semaine (Lundi, Mardi, etc.).
                Avec des Si imbriqués, ça devient <strong>très long et répétitif</strong> :
              </p>

              <div className="bg-red-50 border border-red-200 p-4">
                <h4 className="font-semibold text-red-700 mb-2">❌ Avec Si imbriqués (long et répétitif)</h4>
                <div className="bg-gray-900 text-gray-100 p-3 font-mono text-xs space-y-1">
                  <div><span className="text-purple-400">Si</span> (jour = <span className="text-green-400">"Lundi"</span>) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Début de semaine"</span>)</div>
                  <div><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-4"><span className="text-purple-400">Si</span> (jour = <span className="text-green-400">"Mardi"</span>) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-8">Ecrire(<span className="text-green-400">"Mardi"</span>)</div>
                  <div className="ml-4"><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-8"><span className="text-gray-500">// Et ainsi de suite... 😫</span></div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 p-4">
                <h4 className="font-semibold text-green-700 mb-2">✅ Avec Selon (clair et concis)</h4>
                <div className="bg-gray-900 text-gray-100 p-3 font-mono text-xs space-y-1">
                  <div><span className="text-purple-400">Selon</span> jour <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4"><span className="text-green-400">"Lundi"</span> : Ecrire(<span className="text-green-400">"Début de semaine"</span>)</div>
                  <div className="ml-4"><span className="text-green-400">"Mardi"</span> : Ecrire(<span className="text-green-400">"Mardi"</span>)</div>
                  <div className="ml-4"><span className="text-gray-500">// Plus simple ! 🎉</span></div>
                  <div><span className="text-purple-400">FinSelon</span></div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Syntaxe complète"
            defaultOpen={true}
            icon={<Code className="text-orange-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="space-y-1">
                  <div><span className="text-purple-400">Selon</span> <span className="text-yellow-300">variable</span> <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4"><span className="text-green-400">valeur1</span> : instruction1</div>
                  <div className="ml-4"><span className="text-green-400">valeur2</span> : instruction2</div>
                  <div className="ml-4"><span className="text-green-400">valeur3</span> : instruction3</div>
                  <div className="ml-4"><span className="text-purple-400">Defaut</span> : instruction_par_defaut</div>
                  <div><span className="text-purple-400">FinSelon</span></div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900 mb-2">
                  <strong>💡 Le bloc Defaut</strong> est optionnel :
                </p>
                <p className="text-sm text-blue-800">
                  Si aucune valeur ne correspond, le bloc <code className="bg-blue-100 px-2 py-1">Defaut</code> est exécuté.
                  C'est comme le <code className="bg-blue-100 px-2 py-1">Sinon</code> final dans les Si imbriqués.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Exemples pratiques"
            defaultOpen={true}
            icon={<BookMarked className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 1 : Jour de la semaine</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>jour ← <span className="text-green-400">"Mercredi"</span></div>
                  <div className="mt-2"><span className="text-purple-400">Selon</span> jour <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4"><span className="text-green-400">"Lundi"</span> : Ecrire(<span className="text-green-400">"Début de semaine\\n"</span>)</div>
                  <div className="ml-4"><span className="text-green-400">"Mercredi"</span> : Ecrire(<span className="text-green-400">"Milieu de semaine\\n"</span>)</div>
                  <div className="ml-4"><span className="text-green-400">"Vendredi"</span> : Ecrire(<span className="text-green-400">"Presque le weekend !\\n"</span>)</div>
                  <div className="ml-4"><span className="text-purple-400">Defaut</span> : Ecrire(<span className="text-green-400">"Autre jour\\n"</span>)</div>
                  <div><span className="text-purple-400">FinSelon</span></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 2 : Menu interactif</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>choix ← 2</div>
                  <div className="mt-2"><span className="text-purple-400">Selon</span> choix <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4">1 : Ecrire(<span className="text-green-400">"Nouveau fichier\\n"</span>)</div>
                  <div className="ml-4">2 : Ecrire(<span className="text-green-400">"Ouvrir fichier\\n"</span>)</div>
                  <div className="ml-4">3 : Ecrire(<span className="text-green-400">"Sauvegarder\\n"</span>)</div>
                  <div className="ml-4">4 : Ecrire(<span className="text-green-400">"Quitter\\n"</span>)</div>
                  <div className="ml-4"><span className="text-purple-400">Defaut</span> : Ecrire(<span className="text-green-400">"Choix invalide\\n"</span>)</div>
                  <div><span className="text-purple-400">FinSelon</span></div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier le FinSelon</h5>
                <p className="text-sm text-red-800">
                  Comme pour Si, il faut toujours fermer avec <code className="bg-red-100 px-2 py-1">FinSelon</code>.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Utiliser Selon avec des intervalles</h5>
                <p className="text-sm text-red-800">
                  <strong>Selon</strong> ne fonctionne qu'avec des valeurs <strong>exactes</strong> (pas de {'>='}, {'<'}, etc.).
                  Pour des intervalles, utilisez des Si imbriqués.
                </p>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`Selon note Faire
  >= 16 : Ecrire("Très bien")  // ❌ IMPOSSIBLE`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Selon teste une variable contre plusieurs valeurs exactes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Plus clair que des Si imbriqués pour les choix multiples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Le bloc Defaut gère les cas non prévus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Ne fonctionne PAS avec des intervalles ({'>='}, {'<'}, etc.)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme MenuCalculatrice
Variables choix : Entier
Variables a, b, resultat : Reel

Debut
  a ← 10
  b ← 5

  Ecrire("=== CALCULATRICE ===\\n")
  Ecrire("1. Addition\\n")
  Ecrire("2. Soustraction\\n")
  Ecrire("3. Multiplication\\n")
  Ecrire("4. Division\\n")
  Ecrire("Votre choix ?\\n")
  Lire(choix)

  Selon choix Faire
    1 :
      resultat ← a + b
      Ecrire("Résultat: ", resultat, "\\n")
    2 :
      resultat ← a - b
      Ecrire("Résultat: ", resultat, "\\n")
    3 :
      resultat ← a * b
      Ecrire("Résultat: ", resultat, "\\n")
    4 :
      Si (b ≠ 0) Alors
        resultat ← a / b
        Ecrire("Résultat: ", resultat, "\\n")
      Sinon
        Ecrire("Erreur: division par zéro\\n")
      FinSi
    Defaut :
      Ecrire("Choix invalide\\n")
  FinSelon
Fin`,
        input: ["3"],
      },
    },

    // ==================== PARTIE 3: BOUCLES ET TABLEAUX ====================

    // Leçon 3.1 : La boucle Pour
    'partie3-1': {
      id: 'partie3-1',
      title: '3.1 - La boucle Pour...De...A',
      description: 'Répéter des instructions un nombre de fois connu',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  La boucle <strong>Pour</strong> permet de <strong>répéter des instructions un nombre de fois précis</strong>.
                  C'est parfait quand on sait à l'avance combien de fois on veut répéter (ex : afficher les nombres de 1 à 10).
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="La métaphore de l'escalier"
            defaultOpen={true}
            icon={<BookMarked className="text-yellow-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez que vous montez un escalier de 10 marches. À chaque marche, vous comptez : 1, 2, 3... jusqu'à 10.
                La boucle Pour fonctionne exactement pareil !
              </p>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple : Compter les marches</h4>
                <div className="space-y-2 text-gray-700 text-sm">
                  <div>Marche 1 : "Je suis à la marche 1"</div>
                  <div>Marche 2 : "Je suis à la marche 2"</div>
                  <div>Marche 3 : "Je suis à la marche 3"</div>
                  <div className="text-gray-500">...</div>
                  <div>Marche 10 : "Je suis à la marche 10"</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Syntaxe de la boucle Pour"
            defaultOpen={true}
            icon={<Code className="text-orange-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="text-gray-400 mb-3">// Structure générale</div>
                <div className="space-y-1">
                  <div><span className="text-purple-400">Pour</span> <span className="text-yellow-300">compteur</span> <span className="text-purple-400">De</span> <span className="text-green-400">valeur_debut</span> <span className="text-purple-400">A</span> <span className="text-green-400">valeur_fin</span> <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4 text-gray-500">// Instructions à répéter</div>
                  <div className="ml-4">instruction1</div>
                  <div className="ml-4">instruction2</div>
                  <div><span className="text-purple-400">FinPour</span></div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="text-gray-400 mb-3">// Exemple concret : afficher de 1 à 5</div>
                  <div className="space-y-1">
                    <div><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 1 <span className="text-purple-400">A</span> 5 <span className="text-purple-400">Faire</span></div>
                    <div className="ml-4">Ecrire(<span className="text-green-400">"Nombre: "</span>, i, <span className="text-green-400">"\n"</span>)</div>
                    <div><span className="text-purple-400">FinPour</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900 mb-2">
                  <strong>💡 Comment ça marche :</strong>
                </p>
                <ul className="text-sm text-blue-800 space-y-1 ml-4">
                  <li>1. Le compteur prend la valeur de départ (1)</li>
                  <li>2. On exécute les instructions</li>
                  <li>3. Le compteur augmente de 1 (devient 2)</li>
                  <li>4. Si le compteur {'<='} valeur_fin, on recommence à l'étape 2</li>
                  <li>5. Sinon, on sort de la boucle</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Exemples pratiques"
            defaultOpen={true}
            icon={<BookMarked className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 1 : Table de multiplication</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>nombre ← 7</div>
                  <div className="mt-2"><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 1 <span className="text-purple-400">A</span> 10 <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4">Ecrire(nombre, <span className="text-green-400">" x "</span>, i, <span className="text-green-400">" = "</span>, nombre * i, <span className="text-green-400">"\n"</span>)</div>
                  <div><span className="text-purple-400">FinPour</span></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 2 : Somme de 1 à N</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>n ← 100</div>
                  <div>somme ← 0</div>
                  <div className="mt-2"><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 1 <span className="text-purple-400">A</span> n <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4">somme ← somme + i</div>
                  <div><span className="text-purple-400">FinPour</span></div>
                  <div className="mt-2">Ecrire(<span className="text-green-400">"Somme = "</span>, somme, <span className="text-green-400">"\n"</span>)</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Modifier le compteur dans la boucle</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`Pour i De 1 À 10 Faire
  i ← i + 5  // ❌ NE JAMAIS FAIRE ÇA !
FinPour`}
                </pre>
                <p className="text-sm text-red-800 mt-2">Le compteur est géré automatiquement par la boucle.</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier FinPour</h5>
                <p className="text-sm text-red-800">
                  Chaque <code className="bg-red-100 px-2 py-1">Pour</code> doit avoir son <code className="bg-red-100 px-2 py-1">FinPour</code> !
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Pour est idéal quand on connaît le nombre de répétitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Le compteur augmente automatiquement de 1 à chaque tour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Ne JAMAIS modifier le compteur manuellement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Toujours terminer par FinPour</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme TableMultiplication
Variables nombre, i, resultat : Entier

Debut
  Ecrire("Table de multiplication de quel nombre ?\\n")
  Lire(nombre)

  Ecrire("\\n=== Table de ", nombre, " ===\\n")
  Pour i De 1 À 10 Faire
    resultat ← nombre * i
    Ecrire(nombre, " x ", i, " = ", resultat, "\\n")
  FinPour
Fin`,
        input: ["7"],
      },
    },

    // Leçon 3.2 : La boucle TantQue
    'partie3-2': {
      id: 'partie3-2',
      title: '3.2 - La boucle TantQue',
      description: 'Répéter tant qu\'une condition est vraie',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  La boucle <strong>TantQue</strong> répète des instructions <strong>tant qu'une condition est vraie</strong>.
                  Contrairement à Pour, on ne connaît pas forcément le nombre de répétitions à l'avance.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="La métaphore du remplissage de verre"
            defaultOpen={true}
            icon={<BookMarked className="text-blue-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez que vous remplissez un verre d'eau au robinet.
                Vous continuez <strong>tant que</strong> le verre n'est pas plein.
                Vous ne savez pas exactement combien de secondes ça prendra, mais vous savez quand arrêter.
              </p>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple mental</h4>
                <div className="space-y-2 text-gray-700 text-sm">
                  <div>🚰 <strong>TantQue</strong> le verre n'est pas plein</div>
                  <div className="ml-8">→ Continuer à verser de l'eau</div>
                  <div>🔴 Quand le verre est plein : STOP</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Syntaxe de la boucle TantQue"
            defaultOpen={true}
            icon={<Code className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="text-gray-400 mb-3">// Structure générale</div>
                <div className="space-y-1">
                  <div><span className="text-purple-400">TantQue</span> (<span className="text-yellow-300">condition</span>) <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4 text-gray-500">// Instructions à répéter</div>
                  <div className="ml-4">instruction1</div>
                  <div className="ml-4">instruction2</div>
                  <div><span className="text-purple-400">FinTantQue</span></div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="text-gray-400 mb-3">// Exemple : compter jusqu'à 5</div>
                  <div className="space-y-1">
                    <div>compteur ← 1</div>
                    <div className="mt-2"><span className="text-purple-400">TantQue</span> (compteur {'<='} 5) <span className="text-purple-400">Faire</span></div>
                    <div className="ml-4">Ecrire(<span className="text-green-400">"Compteur: "</span>, compteur, <span className="text-green-400">"\n"</span>)</div>
                    <div className="ml-4">compteur ← compteur + 1</div>
                    <div><span className="text-purple-400">FinTantQue</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ TRÈS IMPORTANT :</strong> Il faut <strong>modifier la condition</strong> dans la boucle,
                  sinon elle ne s'arrêtera JAMAIS (boucle infinie) !
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Différence avec Pour"
            defaultOpen={true}
            icon={<BookMarked className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 border border-yellow-200 p-4">
                  <h4 className="font-semibold text-yellow-700 mb-2">🔢 Pour</h4>
                  <p className="text-sm text-gray-700">Nombre d'itérations <strong>connu</strong> à l'avance</p>
                  <div className="bg-gray-900 text-gray-100 p-2 font-mono text-xs mt-2">
                    <div>Pour i De 1 À 10 Faire</div>
                    <div className="ml-2">...</div>
                    <div>FinPour</div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">→ Exactement 10 répétitions</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4">
                  <h4 className="font-semibold text-blue-700 mb-2">🔄 TantQue</h4>
                  <p className="text-sm text-gray-700">Nombre d'itérations <strong>inconnu</strong>, dépend d'une condition</p>
                  <div className="bg-gray-900 text-gray-100 p-2 font-mono text-xs mt-2">
                    <div>TantQue (x {'<'} 100) Faire</div>
                    <div className="ml-2">x ← x * 2</div>
                    <div>FinTantQue</div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">→ On ne sait pas combien de tours</p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Exemples pratiques"
            defaultOpen={true}
            icon={<BookMarked className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple : Deviner un nombre</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>secret ← 42</div>
                  <div>devine ← 0</div>
                  <div className="mt-2"><span className="text-purple-400">TantQue</span> (devine ≠ secret) <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Devinez le nombre:\n"</span>)</div>
                  <div className="ml-4">Lire(devine)</div>
                  <div className="ml-4 mt-2"><span className="text-purple-400">Si</span> (devine {'<'} secret) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-8">Ecrire(<span className="text-green-400">"Trop petit!\n"</span>)</div>
                  <div className="ml-4"><span className="text-purple-400">Sinon Si</span> (devine {'>'} secret) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-8">Ecrire(<span className="text-green-400">"Trop grand!\n"</span>)</div>
                  <div className="ml-4"><span className="text-purple-400">FinSi</span></div>
                  <div><span className="text-purple-400">FinTantQue</span></div>
                  <div className="mt-2">Ecrire(<span className="text-green-400">"Bravo!\n"</span>)</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Boucle infinie</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`x ← 0
TantQue (x < 10) Faire
  Ecrire(x)
  // ❌ OUPS ! On n'augmente jamais x !
FinTantQue  // Boucle INFINIE`}
                </pre>
                <p className="text-sm text-red-800 mt-2">Toujours modifier la variable de la condition !</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Condition toujours fausse</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`x ← 10
TantQue (x < 5) Faire  // ❌ Faux dès le début !
  ...
FinTantQue  // Ne s'exécute JAMAIS`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>TantQue répète tant que la condition est Vraie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>La condition est testée AVANT chaque tour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>TOUJOURS modifier la condition dans la boucle pour éviter les boucles infinies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Utile quand on ne connaît pas le nombre de répétitions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme DevineNombre
Variables secret, devine, tentatives : Entier

Debut
  secret ← 42
  devine ← 0
  tentatives ← 0

  Ecrire("=== Jeu : Devinez le nombre ===\\n")

  TantQue (devine ≠ secret) Faire
    Ecrire("Entrez un nombre:\\n")
    Lire(devine)
    tentatives ← tentatives + 1

    Si (devine < secret) Alors
      Ecrire("Trop petit ! Réessayez.\\n")
    Sinon Si (devine > secret) Alors
      Ecrire("Trop grand ! Réessayez.\\n")
    FinSi
  FinTantQue

  Ecrire("🎉 Bravo ! Trouvé en ", tentatives, " tentatives\\n")
Fin`,
        input: ["30", "50", "42"],
      },
    },

    // Leçon 3.3 : La boucle Répéter...Jusqu'à
    'partie3-3': {
      id: 'partie3-3',
      title: '3.3 - La boucle Répéter...Jusqu\'à',
      description: 'Exécuter au moins une fois, puis répéter',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  La boucle <strong>Répéter...Jusqu'à</strong> <strong>exécute d'abord</strong> les instructions,
                  puis teste la condition. Elle garantit <strong>au moins une exécution</strong>.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Différence avec TantQue"
            defaultOpen={true}
            icon={<BookMarked className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 p-4">
                  <h4 className="font-semibold text-blue-700 mb-2">TantQue</h4>
                  <p className="text-sm text-gray-700 mb-2">Test <strong>AVANT</strong> l'exécution</p>
                  <div className="bg-gray-900 text-gray-100 p-2 font-mono text-xs space-y-1">
                    <div><span className="text-purple-400">TantQue</span> (condition) <span className="text-purple-400">Faire</span></div>
                    <div className="ml-2">instructions</div>
                    <div><span className="text-purple-400">FinTantQue</span></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">→ Peut ne JAMAIS s'exécuter</p>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-4">
                  <h4 className="font-semibold text-purple-700 mb-2">Répéter...Jusqu'à</h4>
                  <p className="text-sm text-gray-700 mb-2">Test <strong>APRÈS</strong> l'exécution</p>
                  <div className="bg-gray-900 text-gray-100 p-2 font-mono text-xs space-y-1">
                    <div><span className="text-purple-400">Repeter</span></div>
                    <div className="ml-2">instructions</div>
                    <div><span className="text-purple-400">JusquA</span> (condition)</div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">→ S'exécute AU MOINS 1 fois</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ Attention :</strong> La condition dans <code className="bg-yellow-100 px-2 py-1">JusquA</code> est <strong>inversée</strong> :
                  on répète <strong>jusqu'à ce que</strong> la condition devienne Vraie (alors on s'arrête).
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Syntaxe"
            defaultOpen={true}
            icon={<Code className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="text-gray-400 mb-3">// Structure générale</div>
                <div className="space-y-1">
                  <div><span className="text-purple-400">Repeter</span></div>
                  <div className="ml-4 text-gray-500">// Instructions (exécutées AU MOINS 1 fois)</div>
                  <div className="ml-4">instruction1</div>
                  <div className="ml-4">instruction2</div>
                  <div><span className="text-purple-400">JusquA</span> (<span className="text-yellow-300">condition_arret</span>)</div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="text-gray-400 mb-3">// Exemple : Saisie valide</div>
                  <div className="space-y-1">
                    <div><span className="text-purple-400">Repeter</span></div>
                    <div className="ml-4">Ecrire(<span className="text-green-400">"Entrez un nombre positif:\n"</span>)</div>
                    <div className="ml-4">Lire(nombre)</div>
                    <div><span className="text-purple-400">JusquA</span> (nombre {'>='} 0)</div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Cas d'usage typique : Validation de saisie"
            defaultOpen={true}
            icon={<BookMarked className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Répéter...Jusqu'à est parfait pour demander une saisie utilisateur et la redemander tant qu'elle est invalide.
              </p>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple : Menu avec validation</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>choix ← 0</div>
                  <div className="mt-2"><span className="text-purple-400">Repeter</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"=== MENU ===\n"</span>)</div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"1. Option A\n"</span>)</div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"2. Option B\n"</span>)</div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"3. Quitter\n"</span>)</div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Votre choix?\n"</span>)</div>
                  <div className="ml-4">Lire(choix)</div>
                  <div className="ml-4 mt-2"><span className="text-purple-400">Si</span> (choix {'<'} 1) <span className="text-yellow-400">OU</span> (choix {'>'} 3) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-8">Ecrire(<span className="text-green-400">"Choix invalide!\n"</span>)</div>
                  <div className="ml-4"><span className="text-purple-400">FinSi</span></div>
                  <div><span className="text-purple-400">JusquA</span> (choix {'>='} 1) <span className="text-yellow-400">ET</span> (choix {'<='} 3)</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Confondre la logique de la condition</h5>
                <p className="text-sm text-red-800 mb-2">
                  JusquA s'arrête QUAND la condition devient Vraie (inverse de TantQue).
                </p>
                <pre className="text-sm bg-red-100 p-2">
{`// TantQue : continue TANT QUE x < 10
// JusquA : continue JUSQU'À CE QUE x >= 10`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Répéter...Jusqu'à exécute AU MOINS 1 fois</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>La condition est testée APRÈS l'exécution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>On s'arrête QUAND la condition devient Vraie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Parfait pour les validations de saisie</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme SaisieValide
Variables age : Entier

Debut
  Ecrire("=== Validation de saisie ===\\n")

  Repeter
    Ecrire("Entrez votre âge (entre 0 et 120):\\n")
    Lire(age)

    Si (age < 0) OU (age > 120) Alors
      Ecrire("❌ Âge invalide ! Réessayez.\\n\\n")
    FinSi
  JusquA (age >= 0) ET (age <= 120)

  Ecrire("\\n✅ Âge valide: ", age, " ans\\n")
Fin`,
        input: ["-5", "150", "25"],
      },
    },

    // Leçon 3.4 : Les tableaux (declaration)
    'partie3-4': {
      id: 'partie3-4',
      title: '3.4 - Les tableaux : déclaration et manipulation',
      description: 'Stocker plusieurs valeurs dans une seule variable',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-orange-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Un <strong>tableau</strong> est comme une <strong>étagère avec plusieurs casiers numérotés</strong>.
                  Il permet de stocker <strong>plusieurs valeurs du même type</strong> sous un seul nom.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="La métaphore de l'armoire à tiroirs"
            defaultOpen={true}
            icon={<BookMarked className="text-orange-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez une armoire avec 10 tiroirs numérotés de 0 à 9.
                Chaque tiroir peut contenir une valeur. C'est exactement un tableau !
              </p>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple : notes[10]</h4>
                <div className="grid grid-cols-10 gap-1 font-mono text-xs">
                  <div className="bg-gray-100 border p-2 text-center">
                    <div className="text-gray-500">notes[0]</div>
                    <div className="font-bold">15</div>
                  </div>
                  <div className="bg-gray-100 border p-2 text-center">
                    <div className="text-gray-500">notes[1]</div>
                    <div className="font-bold">18</div>
                  </div>
                  <div className="bg-gray-100 border p-2 text-center">
                    <div className="text-gray-500">notes[2]</div>
                    <div className="font-bold">12</div>
                  </div>
                  <div className="bg-gray-100 border p-2 text-center">
                    <div className="text-gray-500">notes[3]</div>
                    <div className="font-bold">16</div>
                  </div>
                  <div className="bg-gray-100 border p-2 text-center">
                    <div className="text-gray-500">notes[4]</div>
                    <div className="font-bold">14</div>
                  </div>
                  <div className="bg-gray-100 border p-2 text-center">
                    <div className="text-gray-500">notes[5]</div>
                    <div className="font-bold">13</div>
                  </div>
                  <div className="bg-gray-100 border p-2 text-center">
                    <div className="text-gray-500">notes[6]</div>
                    <div className="font-bold">17</div>
                  </div>
                  <div className="bg-gray-100 border p-2 text-center">
                    <div className="text-gray-500">notes[7]</div>
                    <div className="font-bold">11</div>
                  </div>
                  <div className="bg-gray-100 border p-2 text-center">
                    <div className="text-gray-500">notes[8]</div>
                    <div className="font-bold">19</div>
                  </div>
                  <div className="bg-gray-100 border p-2 text-center">
                    <div className="text-gray-500">notes[9]</div>
                    <div className="font-bold">15</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  ⚠️ <strong>Important :</strong> Les indices commencent à <strong>0</strong>, pas à 1 !
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Déclaration d'un tableau"
            defaultOpen={true}
            icon={<Code className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="text-gray-400 mb-3">// Syntaxe générale</div>
                <div className="mb-4">
                  <span className="text-yellow-300">nom_tableau</span> :
                  <span className="text-blue-400"> Tableau</span>[<span className="text-green-400">taille</span>]
                  <span className="text-blue-400"> de Type</span>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="text-gray-400 mb-3">// Exemples</div>
                  <div className="space-y-1">
                    <div>notes : <span className="text-blue-400">Tableau</span>[10] <span className="text-blue-400">de Reel</span></div>
                    <div>prenoms : <span className="text-blue-400">Tableau</span>[5] <span className="text-blue-400">de Chaine</span></div>
                    <div>ages : <span className="text-blue-400">Tableau</span>[20] <span className="text-blue-400">de Entier</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Lecture :</strong> "notes est un tableau de 10 cases contenant des Réels"
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Accéder aux éléments"
            defaultOpen={true}
            icon={<Code className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-3">
                <div className="text-gray-400">// Affecter une valeur à une case</div>
                <div>notes[0] ← 15</div>
                <div>notes[1] ← 18</div>
                <div>notes[2] ← 12</div>

                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="text-gray-400">// Lire une valeur depuis une case</div>
                  <div>Ecrire(<span className="text-green-400">"Première note: "</span>, notes[0], <span className="text-green-400">"\n"</span>)</div>
                </div>

                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="text-gray-400">// Utiliser une boucle pour parcourir le tableau</div>
                  <div><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 0 <span className="text-purple-400">A</span> 9 <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Note "</span>, i, <span className="text-green-400">": "</span>, notes[i], <span className="text-green-400">"\n"</span>)</div>
                  <div><span className="text-purple-400">FinPour</span></div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ IMPORTANT :</strong> Si le tableau a 10 cases, les indices vont de <strong>0 à 9</strong> (pas de 0 à 10) !
                  Accéder à notes[10] provoquera une erreur.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Remplir un tableau"
            defaultOpen={true}
            icon={<BookMarked className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Méthode 1 : Avec une boucle Pour</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>nombres : <span className="text-blue-400">Tableau</span>[5] <span className="text-blue-400">de Entier</span></div>
                  <div className="mt-2"><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 0 <span className="text-purple-400">A</span> 4 <span className="text-purple-400">Faire</span></div>
                  <div className="ml-4">Ecrire(<span className="text-green-400">"Entrez le nombre "</span>, i + 1, <span className="text-green-400">": \n"</span>)</div>
                  <div className="ml-4">Lire(nombres[i])</div>
                  <div><span className="text-purple-400">FinPour</span></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Méthode 2 : Affectation directe</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div>jours : <span className="text-blue-400">Tableau</span>[7] <span className="text-blue-400">de Chaine</span></div>
                  <div>jours[0] ← <span className="text-green-400">"Lundi"</span></div>
                  <div>jours[1] ← <span className="text-green-400">"Mardi"</span></div>
                  <div>jours[2] ← <span className="text-green-400">"Mercredi"</span></div>
                  <div className="text-gray-500">// ...</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Dépasser les limites du tableau</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`notes : Tableau[5] de Entier
notes[5] ← 20  // ❌ ERREUR ! Indice 5 n'existe pas (max: 4)`}
                </pre>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier que les indices commencent à 0</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`Pour i De 1 À 10 Faire  // ❌ On saute notes[0] !
  Ecrire(notes[i])
FinPour`}
                </pre>
                <pre className="text-sm bg-green-100 p-2 mt-1">
{`Pour i De 0 À 9 Faire  // ✅ CORRECT
  Ecrire(notes[i])
FinPour`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Un tableau stocke plusieurs valeurs du même type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Les indices commencent à 0 et vont jusqu'à taille-1</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Accès : tableau[indice]</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Parcourir avec une boucle Pour est très courant</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme GestionNotes
Variables notes : Tableau[5] de Reel
Variables i : Entier
Variables somme, moyenne : Reel

Debut
  somme ← 0

  Ecrire("=== Saisie des notes ===\\n")
  Pour i De 0 À 4 Faire
    Ecrire("Note ", i + 1, ": ")
    Lire(notes[i])
    somme ← somme + notes[i]
  FinPour

  moyenne ← somme / 5

  Ecrire("\\n=== Résultats ===\\n")
  Pour i De 0 À 4 Faire
    Ecrire("Note ", i + 1, ": ", notes[i], "\\n")
  FinPour

  Ecrire("\\nMoyenne: ", moyenne, "\\n")
Fin`,
        input: ["15", "18", "12", "16", "14"],
      },
    },

    // Leçon 3.5 : Algorithmes sur les tableaux
    'partie3-5': {
      id: 'partie3-5',
      title: '3.5 - Algorithmes sur les tableaux',
      description: 'Rechercher, trier et manipuler des données',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-pink-50 to-red-50 border-l-4 border-pink-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-pink-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Les tableaux deviennent vraiment puissants quand on applique des <strong>algorithmes classiques</strong> dessus :
                  recherche, calcul du maximum/minimum, tri, etc.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Algorithme 1 : Rechercher un élément"
            defaultOpen={true}
            icon={<Code className="text-blue-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Objectif :</strong> Vérifier si une valeur existe dans le tableau.
              </p>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-1">
                <div>valeurRecherchee ← 15</div>
                <div>trouve ← Faux</div>
                <div>i ← 0</div>
                <div className="mt-2"><span className="text-purple-400">TantQue</span> (i {'<'} taille) <span className="text-yellow-400">ET</span> (trouve = Faux) <span className="text-purple-400">Faire</span></div>
                <div className="ml-4"><span className="text-purple-400">Si</span> (tableau[i] = valeurRecherchee) <span className="text-purple-400">Alors</span></div>
                <div className="ml-8">trouve ← Vrai</div>
                <div className="ml-4"><span className="text-purple-400">FinSi</span></div>
                <div className="ml-4">i ← i + 1</div>
                <div><span className="text-purple-400">FinTantQue</span></div>
                <div className="mt-2"><span className="text-purple-400">Si</span> (trouve = Vrai) <span className="text-purple-400">Alors</span></div>
                <div className="ml-4">Ecrire(<span className="text-green-400">"Valeur trouvée\\n"</span>)</div>
                <div><span className="text-purple-400">Sinon</span></div>
                <div className="ml-4">Ecrire(<span className="text-green-400">"Valeur non trouvée\\n"</span>)</div>
                <div><span className="text-purple-400">FinSi</span></div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Algorithme 2 : Trouver le maximum"
            defaultOpen={true}
            icon={<Code className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Objectif :</strong> Trouver la plus grande valeur du tableau.
              </p>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-1">
                <div>max ← tableau[0]  <span className="text-gray-500">// On suppose que le 1er est le max</span></div>
                <div className="mt-2"><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 1 <span className="text-purple-400">A</span> taille - 1 <span className="text-purple-400">Faire</span></div>
                <div className="ml-4"><span className="text-purple-400">Si</span> (tableau[i] {'>'} max) <span className="text-purple-400">Alors</span></div>
                <div className="ml-8">max ← tableau[i]  <span className="text-gray-500">// Nouveau max trouvé</span></div>
                <div className="ml-4"><span className="text-purple-400">FinSi</span></div>
                <div><span className="text-purple-400">FinPour</span></div>
                <div className="mt-2">Ecrire(<span className="text-green-400">"Maximum: "</span>, max, <span className="text-green-400">"\n"</span>)</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Astuce :</strong> Pour le minimum, même logique mais avec <code className="bg-blue-100 px-2 py-1">{'<'}</code> au lieu de <code className="bg-blue-100 px-2 py-1">{'>'}</code>.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Algorithme 3 : Inverser un tableau"
            defaultOpen={true}
            icon={<Code className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Objectif :</strong> Inverser l'ordre des éléments (le premier devient le dernier, etc.).
              </p>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-1">
                <div>debut ← 0</div>
                <div>fin ← taille - 1</div>
                <div className="mt-2"><span className="text-purple-400">TantQue</span> (debut {'<'} fin) <span className="text-purple-400">Faire</span></div>
                <div className="ml-4 text-gray-500">// Échanger tableau[debut] et tableau[fin]</div>
                <div className="ml-4">temp ← tableau[debut]</div>
                <div className="ml-4">tableau[debut] ← tableau[fin]</div>
                <div className="ml-4">tableau[fin] ← temp</div>
                <div className="ml-4 mt-2">debut ← debut + 1</div>
                <div className="ml-4">fin ← fin - 1</div>
                <div><span className="text-purple-400">FinTantQue</span></div>
              </div>

              <div className="bg-white border border-gray-200 p-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Exemple d'exécution</h4>
                <div className="text-sm space-y-1">
                  <div>Tableau initial : [1, 2, 3, 4, 5]</div>
                  <div className="text-gray-600">→ Échange 1 {'<->'} 5 : [5, 2, 3, 4, 1]</div>
                  <div className="text-gray-600">→ Échange 2 {'<->'} 4 : [5, 4, 3, 2, 1]</div>
                  <div>Tableau inversé : [5, 4, 3, 2, 1]</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Algorithme 4 : Tri à bulles (Bubble Sort)"
            defaultOpen={true}
            icon={<Code className="text-orange-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Objectif :</strong> Trier le tableau par ordre croissant.
              </p>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-1">
                <div><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 0 <span className="text-purple-400">A</span> taille - 2 <span className="text-purple-400">Faire</span></div>
                <div className="ml-4"><span className="text-purple-400">Pour</span> j <span className="text-purple-400">De</span> 0 <span className="text-purple-400">A</span> taille - 2 - i <span className="text-purple-400">Faire</span></div>
                <div className="ml-8"><span className="text-purple-400">Si</span> (tableau[j] {'>'} tableau[j + 1]) <span className="text-purple-400">Alors</span></div>
                <div className="ml-12 text-gray-500">// Échanger</div>
                <div className="ml-12">temp ← tableau[j]</div>
                <div className="ml-12">tableau[j] ← tableau[j + 1]</div>
                <div className="ml-12">tableau[j + 1] ← temp</div>
                <div className="ml-8"><span className="text-purple-400">FinSi</span></div>
                <div className="ml-4"><span className="text-purple-400">FinPour</span></div>
                <div><span className="text-purple-400">FinPour</span></div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm text-yellow-900">
                  <strong>💡 Principe :</strong> On compare chaque paire d'éléments adjacents et on les échange s'ils sont dans le mauvais ordre.
                  Les plus grandes valeurs "remontent" comme des bulles.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier de gérer le cas du tableau vide</h5>
                <p className="text-sm text-red-800">
                  Avant de chercher le maximum, vérifiez que le tableau n'est pas vide !
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Mauvais calcul d'indices dans les boucles</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`Pour i De 0 À taille Faire  // ❌ Dépassement !
  tableau[i]...
FinPour`}
                </pre>
                <pre className="text-sm bg-green-100 p-2 mt-1">
{`Pour i De 0 À taille - 1 Faire  // ✅ CORRECT
  tableau[i]...
FinPour`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Parcourir un tableau : boucle Pour de 0 à taille-1</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Recherche : TantQue avec un booléen "trouvé"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Max/Min : comparer chaque élément avec le max actuel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Tri à bulles : 2 boucles imbriquées pour comparer et échanger</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme MaxMinTableau
Variables nombres : Tableau[8] de Entier
Variables i, max, min : Entier

Debut
  Ecrire("=== Saisie de 8 nombres ===\\n")
  Pour i De 0 À 7 Faire
    Ecrire("Nombre ", i + 1, ": ")
    Lire(nombres[i])
  FinPour

  // Recherche du maximum et minimum
  max ← nombres[0]
  min ← nombres[0]

  Pour i De 1 À 7 Faire
    Si (nombres[i] > max) Alors
      max ← nombres[i]
    FinSi
    Si (nombres[i] < min) Alors
      min ← nombres[i]
    FinSi
  FinPour

  Ecrire("\\n=== Résultats ===\\n")
  Ecrire("Maximum: ", max, "\\n")
  Ecrire("Minimum: ", min, "\\n")
Fin`,
        input: ["12", "5", "23", "8", "15", "3", "19", "11"],
      },
    },

    // ==================== PARTIE 4: FONCTIONS ET PROCÉDURES ====================

    // Leçon 4.1 : Les fonctions
    'partie4-1': {
      id: 'partie4-1',
      title: '4.1 - Les fonctions (avec retour)',
      description: 'Créer des blocs de code réutilisables qui retournent une valeur',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Une <strong>fonction</strong> est un <strong>sous-programme réutilisable</strong> qui effectue une tâche
                  et <strong>retourne une valeur</strong>. C'est comme une mini-machine qui prend des ingrédients (paramètres)
                  et produit un résultat.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="La métaphore de la machine à café"
            defaultOpen={true}
            icon={<BookMarked className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez une machine à café :
              </p>

              <div className="bg-white border border-gray-200 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 border-2 border-blue-300">
                      <strong>Entrée :</strong> Capsule + Eau
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="bg-purple-100 p-3 border-2 border-purple-300">
                      <strong>Machine (fonction)</strong>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="bg-green-100 p-3 border-2 border-green-300">
                      <strong>Sortie :</strong> Café chaud
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mt-4">
                En algorithmique, c'est pareil : la fonction prend des <strong>paramètres en entrée</strong>,
                effectue un traitement, et <strong>retourne un résultat</strong>.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Syntaxe d'une fonction"
            defaultOpen={true}
            icon={<Code className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="text-gray-400 mb-3">// Structure générale</div>
                <div className="space-y-1">
                  <div><span className="text-purple-400">Fonction</span> <span className="text-yellow-300">NomFonction</span>(<span className="text-blue-400">param1 : Type1, param2 : Type2</span>) : <span className="text-green-400">TypeRetour</span></div>
                  <div className="ml-4"><span className="text-purple-400">Variables</span> <span className="text-gray-500">// Variables locales (optionnel)</span></div>
                  <div className="ml-8">resultat : <span className="text-blue-400">TypeRetour</span></div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8 text-gray-500">// Instructions</div>
                  <div className="ml-8">resultat ← calcul...</div>
                  <div className="ml-8"><span className="text-yellow-400">Retourner</span> resultat</div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="text-gray-400 mb-3">// Exemple concret : calculer le carré d'un nombre</div>
                  <div className="space-y-1">
                    <div><span className="text-purple-400">Fonction</span> <span className="text-yellow-300">Carre</span>(n : <span className="text-blue-400">Entier</span>) : <span className="text-green-400">Entier</span></div>
                    <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                    <div className="ml-8"><span className="text-yellow-400">Retourner</span> n * n</div>
                    <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900 mb-2">
                  <strong>💡 Appeler une fonction :</strong>
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 font-mono text-sm">
                  <div>resultat ← Carre(5)  <span className="text-gray-500">// resultat vaut 25</span></div>
                  <div>Ecrire(<span className="text-green-400">"Le carré de 5 est: "</span>, Carre(5), <span className="text-green-400">"\n"</span>)</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Exemples pratiques"
            defaultOpen={true}
            icon={<BookMarked className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 1 : Maximum de deux nombres</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div><span className="text-purple-400">Fonction</span> <span className="text-yellow-300">Max</span>(a : <span className="text-blue-400">Entier</span>, b : <span className="text-blue-400">Entier</span>) : <span className="text-green-400">Entier</span></div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8"><span className="text-purple-400">Si</span> (a {'>'} b) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-12"><span className="text-yellow-400">Retourner</span> a</div>
                  <div className="ml-8"><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-12"><span className="text-yellow-400">Retourner</span> b</div>
                  <div className="ml-8"><span className="text-purple-400">FinSi</span></div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 2 : Calculer une moyenne</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div><span className="text-purple-400">Fonction</span> <span className="text-yellow-300">Moyenne</span>(a : <span className="text-blue-400">Reel</span>, b : <span className="text-blue-400">Reel</span>, c : <span className="text-blue-400">Reel</span>) : <span className="text-green-400">Reel</span></div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8"><span className="text-yellow-400">Retourner</span> (a + b + c) / 3</div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier le Retourner</h5>
                <p className="text-sm text-red-800">
                  Une fonction DOIT retourner une valeur du type indiqué !
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Type de retour incorrect</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`Fonction Carre(n : Entier) : Entier
Debut
  Retourner "résultat"  // ❌ On retourne une Chaine, pas un Entier !
Fin`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Une fonction retourne TOUJOURS une valeur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Utilisez Retourner pour renvoyer le résultat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Le type de retour doit correspondre à la valeur retournée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Les fonctions évitent la duplication de code</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Fonction Puissance(base : Entier, exposant : Entier) : Entier
Variables resultat, i : Entier
Debut
  resultat ← 1
  Pour i De 1 À exposant Faire
    resultat ← resultat * base
  FinPour
  Retourner resultat
Fin

Algorithme TestFonctions
Variables x, y, res : Entier

Debut
  Ecrire("Entrez la base:\\n")
  Lire(x)
  Ecrire("Entrez l'exposant:\\n")
  Lire(y)

  res ← Puissance(x, y)
  Ecrire(x, " puissance ", y, " = ", res, "\\n")
Fin`,
        input: ["2", "5"],
      },
    },

    // Leçon 4.2 : Les procédures
    'partie4-2': {
      id: 'partie4-2',
      title: '4.2 - Les procédures (sans retour)',
      description: 'Créer des blocs de code réutilisables sans valeur de retour',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Une <strong>procédure</strong> est similaire à une fonction, mais elle <strong>ne retourne pas de valeur</strong>.
                  Elle effectue une action (afficher, modifier des données) sans calculer de résultat.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Différence Fonction vs Procédure"
            defaultOpen={true}
            icon={<BookMarked className="text-green-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 border border-purple-200 p-4">
                  <h4 className="font-semibold text-purple-700 mb-2">Fonction</h4>
                  <p className="text-sm text-gray-700">→ <strong>Retourne</strong> une valeur</p>
                  <p className="text-sm text-gray-700">→ Utilisée dans une expression</p>
                  <div className="bg-gray-900 text-gray-100 p-2 font-mono text-xs mt-2">
                    <div>resultat ← Carre(5)</div>
                    <div>Ecrire(Max(a, b))</div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 p-4">
                  <h4 className="font-semibold text-green-700 mb-2">Procédure</h4>
                  <p className="text-sm text-gray-700">→ <strong>Ne retourne rien</strong></p>
                  <p className="text-sm text-gray-700">→ Appelée seule (pas dans une expression)</p>
                  <div className="bg-gray-900 text-gray-100 p-2 font-mono text-xs mt-2">
                    <div>AfficherMenu()</div>
                    <div>DessinerLigne(20)</div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Syntaxe d'une procédure"
            defaultOpen={true}
            icon={<Code className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm">
                <div className="text-gray-400 mb-3">// Structure générale (PAS de type de retour)</div>
                <div className="space-y-1">
                  <div><span className="text-purple-400">Procedure</span> <span className="text-yellow-300">NomProcedure</span>(<span className="text-blue-400">param1 : Type1, param2 : Type2</span>)</div>
                  <div className="ml-4"><span className="text-purple-400">Variables</span> <span className="text-gray-500">// Optionnel</span></div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8 text-gray-500">// Instructions (affichage, modifications...)</div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="text-gray-400 mb-3">// Exemple : afficher une ligne de séparation</div>
                  <div className="space-y-1">
                    <div><span className="text-purple-400">Procedure</span> <span className="text-yellow-300">AfficherLigne</span>(longueur : <span className="text-blue-400">Entier</span>)</div>
                    <div className="ml-4"><span className="text-purple-400">Variables</span> i : <span className="text-blue-400">Entier</span></div>
                    <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                    <div className="ml-8"><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 1 <span className="text-purple-400">A</span> longueur <span className="text-purple-400">Faire</span></div>
                    <div className="ml-12">Ecrire(<span className="text-green-400">"-"</span>)</div>
                    <div className="ml-8"><span className="text-purple-400">FinPour</span></div>
                    <div className="ml-8">Ecrire(<span className="text-green-400">"\n"</span>)</div>
                    <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900 mb-2">
                  <strong>💡 Appeler une procédure :</strong>
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 font-mono text-sm">
                  <div>AfficherLigne(30)  <span className="text-gray-500">// Pas d'affectation !</span></div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Exemples pratiques"
            defaultOpen={true}
            icon={<BookMarked className="text-purple-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 1 : Afficher un menu</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div><span className="text-purple-400">Procedure</span> <span className="text-yellow-300">AfficherMenu</span>()</div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8">Ecrire(<span className="text-green-400">"=== MENU PRINCIPAL ===\n"</span>)</div>
                  <div className="ml-8">Ecrire(<span className="text-green-400">"1. Jouer\n"</span>)</div>
                  <div className="ml-8">Ecrire(<span className="text-green-400">"2. Options\n"</span>)</div>
                  <div className="ml-8">Ecrire(<span className="text-green-400">"3. Quitter\n"</span>)</div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 2 : Afficher un tableau</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div><span className="text-purple-400">Procedure</span> <span className="text-yellow-300">AfficherTableau</span>(tab : <span className="text-blue-400">Tableau[10] de Entier</span>)</div>
                  <div className="ml-4"><span className="text-purple-400">Variables</span> i : <span className="text-blue-400">Entier</span></div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8"><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 0 <span className="text-purple-400">A</span> 9 <span className="text-purple-400">Faire</span></div>
                  <div className="ml-12">Ecrire(<span className="text-green-400">"["</span>, i, <span className="text-green-400">"] = "</span>, tab[i], <span className="text-green-400">"\n"</span>)</div>
                  <div className="ml-8"><span className="text-purple-400">FinPour</span></div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Essayer d'utiliser une procédure comme une fonction</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`resultat ← AfficherMenu()  // ❌ Une procédure ne retourne rien !`}
                </pre>
                <pre className="text-sm bg-green-100 p-2 mt-1">
{`AfficherMenu()  // ✅ Appel simple`}
                </pre>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Une procédure ne retourne PAS de valeur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Utilisée pour afficher, organiser le code, effectuer des actions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Pas de type de retour dans la déclaration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Appelée seule (pas dans une affectation)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Procedure AfficherCadre(texte : Chaine, largeur : Entier)
Variables i : Entier
Debut
  // Ligne du haut
  Pour i De 1 À largeur Faire
    Ecrire("=")
  FinPour
  Ecrire("\\n")

  // Texte au centre
  Ecrire("  ", texte, "\\n")

  // Ligne du bas
  Pour i De 1 À largeur Faire
    Ecrire("=")
  FinPour
  Ecrire("\\n")
Fin

Algorithme TestProcedures
Debut
  AfficherCadre("Bienvenue dans AlgoGénie", 30)
  Ecrire("\\n")
  AfficherCadre("Module 4 : Fonctions", 30)
Fin`,
        input: [],
      },
    },

    // Leçon 4.3 : Paramètres et portée
    'partie4-3': {
      id: 'partie4-3',
      title: '4.3 - Paramètres et portée des variables',
      description: 'Comprendre comment les données circulent',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  La <strong>portée</strong> (ou scope) d'une variable détermine <strong>où elle est accessible</strong>.
                  Les variables locales n'existent que dans leur fonction/procédure, tandis que les paramètres permettent
                  de <strong>transmettre des données</strong>.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="Variables locales vs variables globales"
            defaultOpen={true}
            icon={<BookMarked className="text-blue-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Variable locale (dans une fonction)</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div><span className="text-purple-400">Fonction</span> <span className="text-yellow-300">Calculer</span>() : <span className="text-green-400">Entier</span></div>
                  <div className="ml-4"><span className="text-purple-400">Variables</span> x : <span className="text-blue-400">Entier</span>  <span className="text-gray-500">// Variable LOCALE</span></div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8">x ← 10  <span className="text-gray-500">// x n'existe QUE dans cette fonction</span></div>
                  <div className="ml-8"><span className="text-yellow-400">Retourner</span> x * 2</div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                  <div className="mt-3"><span className="text-purple-400">Algorithme</span> Principal</div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8">Ecrire(x)  <span className="text-red-400">// ❌ ERREUR ! x n'existe pas ici</span></div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm text-yellow-900">
                  <strong>💡 Règle d'or :</strong> Une variable locale est créée quand la fonction commence,
                  et <strong>détruite quand elle se termine</strong>. Elle n'est pas accessible depuis l'extérieur.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Passage de paramètres"
            defaultOpen={true}
            icon={<Code className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Les paramètres permettent de <strong>transmettre des valeurs</strong> de l'algorithme principal
                vers une fonction/procédure.
              </p>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-3">
                <div><span className="text-purple-400">Fonction</span> <span className="text-yellow-300">Somme</span>(a : <span className="text-blue-400">Entier</span>, b : <span className="text-blue-400">Entier</span>) : <span className="text-green-400">Entier</span></div>
                <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                <div className="ml-8"><span className="text-yellow-400">Retourner</span> a + b</div>
                <div className="ml-4"><span className="text-purple-400">Fin</span></div>

                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div><span className="text-purple-400">Algorithme</span> Principal</div>
                  <div className="ml-4"><span className="text-purple-400">Variables</span> x, y, resultat : <span className="text-blue-400">Entier</span></div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8">x ← 10</div>
                  <div className="ml-8">y ← 20</div>
                  <div className="ml-8">resultat ← Somme(x, y)  <span className="text-gray-500">// On passe x et y en paramètres</span></div>
                  <div className="ml-8">Ecrire(<span className="text-green-400">"Résultat: "</span>, resultat, <span className="text-green-400">"\n"</span>)</div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Ce qui se passe :</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>1. x vaut 10, y vaut 20 dans le programme principal</div>
                  <div>2. On appelle Somme(x, y)</div>
                  <div>3. Dans Somme, a reçoit la valeur de x (10), b reçoit la valeur de y (20)</div>
                  <div>4. Somme retourne 30</div>
                  <div>5. resultat reçoit 30</div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Confondre le nom du paramètre et de la variable</h5>
                <p className="text-sm text-red-800">
                  Les noms peuvent être différents ! Ce qui compte, c'est l'ordre.
                </p>
                <pre className="text-sm bg-gray-100 p-2 mt-2">
{`Fonction Double(n : Entier) : Entier
...
x ← 5
resultat ← Double(x)  // x est copié dans n`}
                </pre>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Utiliser une variable locale en dehors de sa portée</h5>
                <p className="text-sm text-red-800">
                  Une variable déclarée dans une fonction n'existe PAS en dehors.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Variable locale : n'existe que dans sa fonction/procédure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Paramètres : permettent de transmettre des valeurs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Les valeurs sont COPIÉES lors du passage de paramètres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Portée = zone où la variable est accessible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Fonction EstPair(nombre : Entier) : Booleen
Debut
  Si (nombre % 2 = 0) Alors
    Retourner Vrai
  Sinon
    Retourner Faux
  FinSi
Fin

Algorithme TestPortee
Variables n : Entier
Variables pair : Booleen

Debut
  Ecrire("Entrez un nombre:\\n")
  Lire(n)

  pair ← EstPair(n)

  Si (pair = Vrai) Alors
    Ecrire(n, " est pair\\n")
  Sinon
    Ecrire(n, " est impair\\n")
  FinSi
Fin`,
        input: ["42"],
      },
    },

    // Leçon 4.4 : La récursivité
    'partie4-4': {
      id: 'partie4-4',
      title: '4.4 - La récursivité (notion avancée)',
      description: 'Une fonction qui s\'appelle elle-même',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-red-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Concept clé</h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  La <strong>récursivité</strong> est une technique où une fonction <strong>s'appelle elle-même</strong>
                  pour résoudre un problème en le décomposant en sous-problèmes plus petits.
                </p>
              </div>
            </div>
          </div>

          <CollapsibleSection
            title="La métaphore des poupées russes"
            defaultOpen={true}
            icon={<BookMarked className="text-red-600" size={20} />}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Imaginez des poupées russes : pour ouvrir la grande poupée, vous devez ouvrir celle à l'intérieur,
                puis celle encore à l'intérieur... jusqu'à la plus petite (le <strong>cas de base</strong>).
              </p>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple : Factorielle</h4>
                <p className="text-sm text-gray-700 mb-2">5! = 5 × 4 × 3 × 2 × 1 = 120</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <div>Factorielle(5) = 5 × Factorielle(4)</div>
                  <div className="ml-4">Factorielle(4) = 4 × Factorielle(3)</div>
                  <div className="ml-8">Factorielle(3) = 3 × Factorielle(2)</div>
                  <div className="ml-12">Factorielle(2) = 2 × Factorielle(1)</div>
                  <div className="ml-16">Factorielle(1) = 1  <strong>(cas de base)</strong></div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Structure d'une fonction récursive"
            defaultOpen={true}
            icon={<Code className="text-orange-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ Deux éléments OBLIGATOIRES :</strong>
                </p>
                <ul className="text-sm text-yellow-800 mt-2 ml-4 space-y-1">
                  <li>1. <strong>Cas de base</strong> : condition d'arrêt (sinon boucle infinie !)</li>
                  <li>2. <strong>Appel récursif</strong> : la fonction s'appelle avec un problème plus petit</li>
                </ul>
              </div>

              <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm space-y-1">
                <div><span className="text-purple-400">Fonction</span> <span className="text-yellow-300">Factorielle</span>(n : <span className="text-blue-400">Entier</span>) : <span className="text-green-400">Entier</span></div>
                <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                <div className="ml-8 text-gray-500">// CAS DE BASE</div>
                <div className="ml-8"><span className="text-purple-400">Si</span> (n = 1) <span className="text-purple-400">Alors</span></div>
                <div className="ml-12"><span className="text-yellow-400">Retourner</span> 1</div>
                <div className="ml-8"><span className="text-purple-400">Sinon</span></div>
                <div className="ml-12 text-gray-500">// APPEL RÉCURSIF</div>
                <div className="ml-12"><span className="text-yellow-400">Retourner</span> n * Factorielle(n - 1)</div>
                <div className="ml-8"><span className="text-purple-400">FinSi</span></div>
                <div className="ml-4"><span className="text-purple-400">Fin</span></div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Exemples classiques"
            defaultOpen={true}
            icon={<BookMarked className="text-indigo-600" size={20} />}
          >
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 1 : Suite de Fibonacci</h4>
                <p className="text-sm text-gray-700 mb-2">Fib(n) = Fib(n-1) + Fib(n-2)</p>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div><span className="text-purple-400">Fonction</span> <span className="text-yellow-300">Fibonacci</span>(n : <span className="text-blue-400">Entier</span>) : <span className="text-green-400">Entier</span></div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8"><span className="text-purple-400">Si</span> (n = 0) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-12"><span className="text-yellow-400">Retourner</span> 0</div>
                  <div className="ml-8"><span className="text-purple-400">Sinon Si</span> (n = 1) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-12"><span className="text-yellow-400">Retourner</span> 1</div>
                  <div className="ml-8"><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-12"><span className="text-yellow-400">Retourner</span> Fibonacci(n - 1) + Fibonacci(n - 2)</div>
                  <div className="ml-8"><span className="text-purple-400">FinSi</span></div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Exemple 2 : Puissance</h4>
                <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-1">
                  <div><span className="text-purple-400">Fonction</span> <span className="text-yellow-300">Puissance</span>(base : <span className="text-blue-400">Entier</span>, exp : <span className="text-blue-400">Entier</span>) : <span className="text-green-400">Entier</span></div>
                  <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                  <div className="ml-8"><span className="text-purple-400">Si</span> (exp = 0) <span className="text-purple-400">Alors</span></div>
                  <div className="ml-12"><span className="text-yellow-400">Retourner</span> 1</div>
                  <div className="ml-8"><span className="text-purple-400">Sinon</span></div>
                  <div className="ml-12"><span className="text-yellow-400">Retourner</span> base * Puissance(base, exp - 1)</div>
                  <div className="ml-8"><span className="text-purple-400">FinSi</span></div>
                  <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Pièges à éviter"
            icon={<AlertTriangle className="text-orange-600" size={20} />}
          >
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Oublier le cas de base → Boucle infinie !</h5>
                <pre className="text-sm bg-red-100 p-2 mt-2">
{`Fonction Factorielle(n : Entier) : Entier
Debut
  Retourner n * Factorielle(n - 1)  // ❌ Jamais d'arrêt !
Fin`}
                </pre>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h5 className="font-semibold text-red-900 mb-2">❌ Cas de base mal défini</h5>
                <p className="text-sm text-red-800">
                  Vérifiez que le cas de base est bien atteignable !
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-3">🎯 À retenir absolument</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Récursivité = fonction qui s'appelle elle-même</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>TOUJOURS avoir un cas de base (condition d'arrêt)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>L'appel récursif doit se rapprocher du cas de base</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Plus élégant mais parfois moins performant qu'une boucle</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      example: {
        code: `Fonction Factorielle(n : Entier) : Entier
Debut
  Si (n = 0) OU (n = 1) Alors
    Retourner 1
  Sinon
    Retourner n * Factorielle(n - 1)
  FinSi
Fin

Algorithme TestRecursivite
Variables nombre, resultat : Entier

Debut
  Ecrire("Calcul de factorielle (récursif)\\n")
  Ecrire("Entrez un nombre:\\n")
  Lire(nombre)

  resultat ← Factorielle(nombre)
  Ecrire(nombre, "! = ", resultat, "\\n")
Fin`,
        input: ["5"],
      },
    },
  };

  // Les chapitres pour la sidebar
  const chapters = [
    {
      id: 'partie1',
      title: 'Partie 1: Les Bases',
      Icon: Target,
      lessons: ['partie1-1', 'partie1-2', 'partie1-3', 'partie1-4', 'partie1-5', 'partie1-6'],
      color: 'bg-blue-500',
    },
    {
      id: 'partie2',
      title: 'Partie 2: Structures Conditionnelles',
      Icon: GitBranch,
      lessons: ['partie2-1', 'partie2-2', 'partie2-3', 'partie2-4'],
      color: 'bg-green-500',
    },
    {
      id: 'partie3',
      title: 'Partie 3: Boucles et Tableaux',
      Icon: RotateCcw,
      lessons: ['partie3-1', 'partie3-2', 'partie3-3', 'partie3-4', 'partie3-5'],
      color: 'bg-yellow-500',
    },
    {
      id: 'partie4',
      title: 'Partie 4: Fonctions et Procédures',
      Icon: Settings2,
      lessons: ['partie4-1', 'partie4-2', 'partie4-3', 'partie4-4'],
      color: 'bg-purple-500',
    },
  ];

  const handleTryExample = (example: { code: string; input: string[] }) => {
    localStorage.setItem('loadedExample', JSON.stringify({
      code: example.code,
      input: example.input,
    }));
    navigate('/');
  };

  const currentLesson = lessons[activeLesson];

  return (
    <div className="flex h-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen size={28} />
            <span>Cours Complet</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">Apprentissage progressif de l'algorithmique</p>
        </div>

        <div className="p-4 space-y-2">
          {chapters.map((chapter) => {
            const ChapterIcon = chapter.Icon;
            const isExpanded = expandedChapters.includes(chapter.id);
            const hasLessons = chapter.lessons.length > 0;

            return (
              <div key={chapter.id} className="mb-2">
                <button
                  onClick={() => hasLessons && toggleChapter(chapter.id)}
                  className={`w-full ${chapter.color} text-white px-4 py-3 font-semibold flex items-center justify-between hover:opacity-90 transition-opacity ${!hasLessons && 'opacity-50 cursor-not-allowed'}`}
                >
                  <div className="flex items-center gap-2">
                    <ChapterIcon size={16} />
                    <span className="text-sm">{chapter.title}</span>
                  </div>
                  {hasLessons && (
                    isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                  )}
                </button>

                {isExpanded && hasLessons && (
                  <div className="mt-1 ml-2 space-y-1 border-l-2 border-gray-200">
                    {chapter.lessons.map((lessonId) => (
                      <button
                        key={lessonId}
                        onClick={() => setActiveLesson(lessonId)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          activeLesson === lessonId
                            ? 'bg-indigo-100 text-indigo-900 font-medium border-l-2 border-indigo-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {lessons[lessonId]?.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {currentLesson ? (
            <>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{currentLesson.title}</h2>
                <p className="text-gray-600 mt-2">{currentLesson.description}</p>
              </div>

              {currentLesson.content}

              {currentLesson.example && (
                <div className="mt-8 bg-white border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Code size={20} className="text-indigo-600" />
                    <span>Exemple à tester</span>
                  </h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm font-mono">
                    {currentLesson.example.code}
                  </pre>
                  <button
                    onClick={() => handleTryExample(currentLesson.example!)}
                    className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors flex items-center gap-2"
                  >
                    <Code size={16} />
                    <span>Essayer dans l'éditeur →</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Sélectionnez une leçon dans le menu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cours;
