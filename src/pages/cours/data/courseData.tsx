import { Target, GitBranch, RotateCcw, Settings2, Lightbulb, BookMarked, Code, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { CollapsibleSection } from '../../../components/CollapsibleSection';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: React.ReactElement;
  example?: {
    code: string;
    input: string[];
  };
}

export const chapters = [
  { id: 'partie1', title: 'Partie 1: Les Bases', Icon: Target, lessons: ['partie1-1', 'partie1-2', 'partie1-3', 'partie1-4', 'partie1-5'], color: 'text-blue-500', bg: 'bg-blue-500' },
  { id: 'partie2', title: 'Partie 2: Conditions', Icon: GitBranch, lessons: ['partie2-1', 'partie2-2'], color: 'text-green-500', bg: 'bg-green-500' },
  { id: 'partie3', title: 'Partie 3: Boucles', Icon: RotateCcw, lessons: ['partie3-1', 'partie3-2'], color: 'text-yellow-500', bg: 'bg-yellow-500' },
  { id: 'partie4', title: 'Partie 4: Fonctions', Icon: Settings2, lessons: ['partie4-1'], color: 'text-purple-500', bg: 'bg-purple-500' },
];

export const lessons: { [key: string]: Lesson } = {
  'partie1-1': {
    id: 'partie1-1',
    title: '1.1 - Qu\'est-ce qu\'un algorithme ?',
    description: 'Introduction aux algorithmes',
    content: (
      <div className="space-y-8">
        <div className="p-6 rounded-xl border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <Lightbulb size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Concept clé</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Un <strong>algorithme</strong> est une <strong>recette de cuisine</strong> pour l\'ordinateur :
                une suite d\'instructions précises qui permettent de résoudre un problème étape par étape.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <BookMarked className="text-indigo-500" size={20} />
            Pourquoi apprendre les algorithmes ?
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Imaginez que vous voulez expliquer à un ami comment faire un gâteau au chocolat.
              Vous ne pouvez pas juste dire "fais un gâteau" ! Vous devez donner des instructions précises :
            </p>
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
              <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-200">Recette du gâteau (= Algorithme)</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Préchauffer le four à 180°C</li>
                <li>Casser 3 œufs dans un saladier</li>
                <li>Ajouter 150g de sucre et mélanger</li>
                <li>Incorporer 200g de farine</li>
                <li>Ajouter 50g de chocolat fondu</li>
                <li>Verser dans un moule beurré</li>
                <li>Cuire 30 minutes</li>
              </ol>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              C\'est <strong>exactement pareil</strong> en programmation ! L\'ordinateur a besoin d\'instructions claires et ordonnées.
            </p>
          </div>
        </div>

        <CollapsibleSection title="Structure d\'un algorithme" icon={<Code className="text-green-500" size={20} />}>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">Tout algorithme en langage naturel (français) suit cette structure simple :</p>
            <div className="p-6 rounded-lg font-mono text-sm overflow-x-auto bg-gray-900 text-gray-300 dark:bg-[#1e1e1e]">
              <div className="space-y-1">
                <div><span className="text-purple-400">Algorithme</span> <span className="text-yellow-300">NomDeLAlgorithme</span></div>
                <div className="text-gray-500 italic">// Le nom doit être clair et décrit ce que fait l\'algorithme</div>
                <div className="mt-3"><span className="text-purple-400">Variables</span></div>
                <div className="ml-4 text-gray-500 italic">// Ici on déclare les "boîtes" pour stocker nos données</div>
                <div className="ml-4">age : <span className="text-blue-400">Entier</span></div>
                <div className="ml-4">nom : <span className="text-blue-400">Chaine</span></div>
                <div className="mt-3"><span className="text-purple-400">Debut</span></div>
                <div className="ml-4 text-gray-500 italic">// Les instructions vont ici</div>
                <div className="ml-4">Ecrire(<span className="text-green-400">"Hello World!"</span>)</div>
                <div><span className="text-purple-400">Fin</span></div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-orange-500" size={20} />
              <h4 className="font-bold text-gray-900 dark:text-white">Pièges à éviter</h4>
            </div>
            <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
              <li>• Oublier <span className="font-mono bg-orange-500/20 px-1 rounded">Debut</span> ou <span className="font-mono bg-orange-500/20 px-1 rounded">Fin</span></li>
              <li>• Mettre des instructions avant <span className="font-mono bg-orange-500/20 px-1 rounded">Debut</span></li>
              <li>• Utiliser des espaces dans le nom de l\'algorithme</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="text-green-500" size={20} />
              <h4 className="font-bold text-gray-900 dark:text-white">À retenir</h4>
            </div>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
              <li>• Un algorithme = une suite d\'instructions ordonnées</li>
              <li>• Structure : Algorithme → Variables → Debut → Instructions → Fin</li>
              <li>• Chaque instruction fait UNE chose précise</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    example: {
      code: "Algorithme MonPremierAlgo\n// Ceci est mon tout premier algorithme !\n\nDebut\n  Ecrire(\"Bonjour, je suis un algorithme !\\n\")\n  Ecrire(\"Je peux afficher du texte.\\n\")\nFin",
      input: [],
    },
  },
  'partie1-2': {
    id: 'partie1-2',
    title: '1.2 - Les variables',
    description: 'Comprendre et utiliser les variables',
    content: (
      <div className="space-y-8">
        <div className="p-6 rounded-xl border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
              <Lightbulb size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Concept clé</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Une <strong>variable</strong> est comme une <strong>boîte étiquetée</strong> dans laquelle on peut mettre une information. Le nom de la boîte permet de retrouver son contenu plus tard.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Les types de variables</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold rounded bg-blue-100 text-blue-800">Entier</span>
                <span className="text-gray-600 dark:text-gray-400">Nombres sans virgule</span>
              </div>
              <p className="text-sm font-mono text-gray-500">Ex: 0, 42, -17</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold rounded bg-green-100 text-green-800">Reel</span>
                <span className="text-gray-600 dark:text-gray-400">Nombres décimaux</span>
              </div>
              <p className="text-sm font-mono text-gray-500">Ex: 3.14, -2.5</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold rounded bg-purple-100 text-purple-800">Chaine</span>
                <span className="text-gray-600 dark:text-gray-400">Texte</span>
              </div>
              <p className="text-sm font-mono text-gray-500">Ex: "Bonjour", "Alice"</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold rounded bg-orange-100 text-orange-800">Booleen</span>
                <span className="text-gray-600 dark:text-gray-400">Logique</span>
              </div>
              <p className="text-sm font-mono text-gray-500">Ex: Vrai, Faux</p>
            </div>
          </div>
        </div>

        <CollapsibleSection title="Déclaration" icon={<Code className="text-indigo-500" size={20} />}>
          <div className="p-6 rounded-lg font-mono text-sm overflow-x-auto bg-gray-900 text-gray-300 dark:bg-[#1e1e1e]">
            <div className="mb-4 text-gray-500 italic">// Syntaxe : nom_variable : Type</div>
            <div>age : <span className="text-blue-400">Entier</span></div>
            <div>prenom : <span className="text-blue-400">Chaine</span></div>
            <div>taille : <span className="text-blue-400">Reel</span></div>
            <div>estMajeur : <span className="text-blue-400">Booleen</span></div>
          </div>
        </CollapsibleSection>
      </div>
    ),
    example: {
      code: "Algorithme DeclarationVariables\nVariables nom : Chaine\nVariables age : Entier\n\nDebut\n  Ecrire(\"Variables déclarées avec succès !\\n\")\nFin",
      input: [],
    },
  },
  'partie1-3': {
    id: 'partie1-3',
    title: '1.3 - L\'affectation',
    description: 'Donner une valeur à une variable',
    content: (
      <div className="space-y-8">
        <div className="p-6 rounded-xl border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
              <Lightbulb size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Concept clé</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Affecter</strong> signifie mettre une valeur dans une variable. On utilise la flèche <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300">←</code> (tapez <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300">&lt;-</code>).
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Syntaxe et Calculs</h3>
          <div className="p-6 rounded-lg font-mono text-sm overflow-x-auto bg-gray-900 text-gray-300 dark:bg-[#1e1e1e]">
            <div>age <span className="text-pink-400">←</span> 20</div>
            <div>prenom <span className="text-pink-400">←</span> <span className="text-green-400">"Alice"</span></div>
            <div className="mt-4 text-gray-500 italic">// Avec calculs</div>
            <div>somme <span className="text-pink-400">←</span> a + b</div>
            <div>produit <span className="text-pink-400">←</span> a * b</div>
          </div>
        </div>
      </div>
    ),
    example: {
      code: "Algorithme Affectation\nVariables age : Entier\nDebut\n  age ← 25\n  Ecrire(\"Age: \", age, \" ans\\n\")\nFin",
      input: [],
    },
  },
  'partie1-4': {
      id: 'partie1-4',
      title: '1.4 - Afficher avec Ecrire()',
      description: 'Communiquer avec l\'utilisateur',
      content: (
          <div className="space-y-8">
              <p className="text-gray-600 dark:text-gray-300">La fonction <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300">Ecrire()</code> permet d\'afficher du texte ou le contenu de variables.</p>
              <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
                  <div className="p-6 rounded-lg font-mono text-sm overflow-x-auto bg-gray-900 text-gray-300 dark:bg-[#1e1e1e]">
                      <div>Ecrire(<span className="text-green-400">"Bonjour"</span>)</div>
                      <div>Ecrire(age)</div>
                      <div>Ecrire(<span className="text-green-400">"J\'ai "</span>, age, <span className="text-green-400">" ans"</span>)</div>
                      <div className="text-gray-500 italic mt-2">// Utiliser \n pour aller à la ligne</div>
                      <div>Ecrire(<span className="text-green-400">"Ligne 1\nLigne 2"</span>)</div>
                  </div>
              </div>
          </div>
      ),
      example: { code: "Algorithme Affichage\nDebut\n  Ecrire(\"Hello World\\n\")\nFin", input: [] }
  },
  'partie1-5': {
      id: 'partie1-5',
      title: '1.5 - Lire avec Lire()',
      description: 'Recevoir des données',
      content: (
          <div className="space-y-8">
              <p className="text-gray-600 dark:text-gray-300">La fonction <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300">Lire()</code> met le programme en pause pour attendre une saisie de l\'utilisateur.</p>
              <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
                  <div className="p-6 rounded-lg font-mono text-sm overflow-x-auto bg-gray-900 text-gray-300 dark:bg-[#1e1e1e]">
                      <div>Ecrire(<span className="text-green-400">"Votre nom ?"</span>)</div>
                      <div>Lire(nom)</div>
                      <div>Ecrire(<span className="text-green-400">"Bonjour "</span>, nom)</div>
                  </div>
              </div>
          </div>
      ),
      example: { code: "Algorithme Lecture\nVariables nom : Chaine\nDebut\n  Ecrire(\"Nom ?\\n\")\n  Lire(nom)\n  Ecrire(\"Bonjour \", nom)\nFin", input: ["Alex"] }
  },
  'partie2-1': {
      id: 'partie2-1',
      title: '2.1 - Si...Alors...Sinon',
      description: 'Prendre des décisions',
      content: (
          <div className="space-y-8">
              <div className="p-6 rounded-xl border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Concept clé</h3>
                  <p className="text-gray-700 dark:text-gray-300">Permet d\'exécuter des instructions différentes selon une condition.</p>
              </div>
              <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
                  <div className="p-6 rounded-lg font-mono text-sm overflow-x-auto bg-gray-900 text-gray-300 dark:bg-[#1e1e1e]">
                      <div><span className="text-purple-400">Si</span> (age {'>='} 18) <span className="text-purple-400">Alors</span></div>
                      <div className="ml-4">Ecrire(<span className="text-green-400">"Majeur"</span>)</div>
                      <div><span className="text-purple-400">Sinon</span></div>
                      <div className="ml-4">Ecrire(<span className="text-green-400">"Mineur"</span>)</div>
                      <div><span className="text-purple-400">FinSi</span></div>
                  </div>
              </div>
          </div>
      ),
      example: { code: "Algorithme Majeur\nVariables age : Entier\nDebut\n  age ← 18\n  Si (age >= 18) Alors\n    Ecrire(\"Majeur\")\n  FinSi\nFin", input: [] }
  },
  'partie2-2': {
      id: 'partie2-2',
      title: '2.2 - Conditions composées',
      description: 'ET, OU, NON',
      content: (
          <div className="space-y-8">
              <p className="text-gray-600 dark:text-gray-300">Combinez plusieurs conditions.</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li><code className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300">ET</code> : Tout doit être vrai</li>
                  <li><code className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300">OU</code> : Au moins un doit être vrai</li>
                  <li><code className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300">NON</code> : Inverse le résultat</li>
              </ul>
          </div>
      ),
      example: { code: "Algorithme Logique\nVariables a, b : Booleen\nDebut\n  a ← Vrai\n  b ← Faux\n  Si (a ET NON b) Alors\n    Ecrire(\"OK\")\n  FinSi\nFin", input: [] }
  },
  'partie3-1': {
      id: 'partie3-1',
      title: '3.1 - Boucle Pour',
      description: 'Répétition contrôlée',
      content: (
          <div className="space-y-8">
              <p className="text-gray-600 dark:text-gray-300">Utilisée quand on connaît le nombre de répétitions.</p>
              <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
                  <div className="p-6 rounded-lg font-mono text-sm overflow-x-auto bg-gray-900 text-gray-300 dark:bg-[#1e1e1e]">
                      <div><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 1 <span className="text-purple-400">A</span> 5 <span className="text-purple-400">Faire</span></div>
                      <div className="ml-4">Ecrire(i)</div>
                      <div><span className="text-purple-400">FinPour</span></div>
                  </div>
              </div>
          </div>
      ),
      example: { code: "Algorithme Compte\nVariables i : Entier\nDebut\n  Pour i De 1 A 5 Faire\n    Ecrire(i, \"\\n\")\n  FinPour\nFin", input: [] }
  },
  'partie3-2': {
      id: 'partie3-2',
      title: '3.2 - Boucle TantQue',
      description: 'Répétition conditionnelle',
      content: (
          <div className="space-y-8">
              <p className="text-gray-600 dark:text-gray-300">Répète tant qu\'une condition est vraie.</p>
              <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
                  <div className="p-6 rounded-lg font-mono text-sm overflow-x-auto bg-gray-900 text-gray-300 dark:bg-[#1e1e1e]">
                      <div><span className="text-purple-400">TantQue</span> (x {'<'} 10) <span className="text-purple-400">Faire</span></div>
                      <div className="ml-4">x <span className="text-pink-400">←</span> x + 1</div>
                      <div><span className="text-purple-400">FinTantQue</span></div>
                  </div>
              </div>
          </div>
      ),
      example: { code: "Algorithme TantQueExemple\nVariables x : Entier\nDebut\n  x ← 0\n  TantQue (x < 3) Faire\n    Ecrire(x, \"\\n\")\n    x ← x + 1\n  FinTantQue\nFin", input: [] }
  },
  'partie4-1': {
      id: 'partie4-1',
      title: '4.1 - Fonctions',
      description: 'Sous-programmes avec retour',
      content: (
          <div className="space-y-8">
              <p className="text-gray-600 dark:text-gray-300">Une fonction effectue un calcul et retourne un résultat.</p>
              <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
                  <div className="p-6 rounded-lg font-mono text-sm overflow-x-auto bg-gray-900 text-gray-300 dark:bg-[#1e1e1e]">
                      <div><span className="text-purple-400">Fonction</span> Carre(x : <span className="text-blue-400">Entier</span>) : <span className="text-blue-400">Entier</span></div>
                      <div className="ml-4"><span className="text-purple-400">Debut</span></div>
                      <div className="ml-8"><span className="text-yellow-400">Retourner</span> x * x</div>
                      <div className="ml-4"><span className="text-purple-400">Fin</span></div>
                  </div>
              </div>
          </div>
      ),
      example: { code: "Fonction Carre(x : Entier) : Entier\nDebut\n  Retourner x * x\nFin\n\nAlgorithme Test\nDebut\n  Ecrire(Carre(5))\nFin", input: [] }
  }
};