import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, GitBranch, RotateCcw, Settings2, Rocket, Code } from 'lucide-react';

/**
 * Page Cours - Apprentissage progressif de l'algorithmique
 *
 * Divisé en 5 parties progressives pour accompagner les débutants
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

  const lessons: { [key: string]: Lesson } = {
    // ==================== PARTIE 1: LES BASES ====================
    'partie1-1': {
      id: 'partie1-1',
      title: '1.1 - Qu\'est-ce qu\'un algorithme ?',
      description: 'Comprendre les bases',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Qu'est-ce qu'un algorithme ?</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              Un <strong>algorithme</strong>, c'est simplement une <strong>suite d'instructions</strong> qui permettent
              de résoudre un problème ou d'effectuer une tâche.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">💡 Exemple de la vie quotidienne</h3>
            <p className="text-gray-700">Imaginez que vous voulez faire un gâteau. Voici l'algorithme :</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
              <li>Préchauffer le four à 180°C</li>
              <li>Mélanger 3 œufs et 100g de sucre</li>
              <li>Ajouter 150g de farine</li>
              <li>Verser dans un moule</li>
              <li>Cuire pendant 30 minutes</li>
            </ol>
            <p className="text-gray-700 mt-4">
              C'est exactement comme ça qu'on écrit un algorithme en informatique ! Une liste d'étapes à suivre.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📘 Structure de base</h3>
            <p className="text-gray-700 mb-4">Tout algorithme en français suit cette structure :</p>
            <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm">
              <div><span className="text-purple-400">Algorithme</span> <span className="text-yellow-300">NomDeLAlgorithme</span></div>
              <div className="mt-2"><span className="text-purple-400">Variables</span></div>
              <div className="ml-4 text-gray-400">// Déclaration des variables ici</div>
              <div className="mt-2"><span className="text-purple-400">Debut</span></div>
              <div className="ml-4 text-gray-400">// Instructions ici</div>
              <div><span className="text-purple-400">Fin</span></div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <p className="text-gray-800 font-semibold">✅ À retenir :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Un algorithme = une suite d'instructions</li>
              <li>On commence toujours par "Algorithme" puis le nom</li>
              <li>Le code se trouve entre "Debut" et "Fin"</li>
            </ul>
          </div>
        </div>
      ),
    },

    'partie1-2': {
      id: 'partie1-2',
      title: '1.2 - Les variables',
      description: 'Stocker des informations',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Les variables</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              Une <strong>variable</strong>, c'est comme une <strong>boîte</strong> dans laquelle on peut mettre une information.
              Cette boîte a un <strong>nom</strong> et peut contenir différents types de données.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">📦 Analogie de la boîte</h3>
            <p className="text-gray-700">
              Imaginez que vous avez des boîtes étiquetées dans votre chambre :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>age</strong> : une boîte qui contient votre âge (un nombre entier)</li>
              <li><strong>prenom</strong> : une boîte qui contient votre prénom (du texte)</li>
              <li><strong>taille</strong> : une boîte qui contient votre taille en mètres (un nombre décimal)</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📘 Les types de variables</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Qu'est-ce que c'est ?</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Exemples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-indigo-600">Entier</td>
                  <td className="border border-gray-300 px-4 py-2">Un nombre sans virgule</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">0, 42, -17</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-mono text-indigo-600">Reel</td>
                  <td className="border border-gray-300 px-4 py-2">Un nombre avec virgule</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">3.14, 1.75, -2.5</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-indigo-600">Chaine</td>
                  <td className="border border-gray-300 px-4 py-2">Du texte (entre guillemets)</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">"Bonjour", "Alice"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-mono text-indigo-600">Booleen</td>
                  <td className="border border-gray-300 px-4 py-2">Vrai ou Faux</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">Vrai, Faux</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">✍️ Comment déclarer une variable ?</h3>
            <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm">
              <div><span className="text-purple-400">Variables</span></div>
              <div className="ml-4">age : <span className="text-blue-400">Entier</span></div>
              <div className="ml-4">prenom : <span className="text-blue-400">Chaine</span></div>
              <div className="ml-4">taille : <span className="text-blue-400">Reel</span></div>
            </div>
            <p className="text-gray-700 mt-4">
              On écrit : <code className="bg-gray-200 px-2 py-1">nom_variable : Type</code>
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <p className="text-gray-800 font-semibold">✅ À retenir :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Une variable = une boîte pour stocker une information</li>
              <li>Chaque variable a un nom et un type</li>
              <li>On déclare les variables après le mot "Variables"</li>
            </ul>
          </div>
        </div>
      ),
    },

    'partie1-3': {
      id: 'partie1-3',
      title: '1.3 - L\'affectation',
      description: 'Donner une valeur à une variable',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">L'affectation</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              <strong>Affecter</strong>, c'est mettre une valeur dans une variable (remplir la boîte).
              On utilise la flèche <code className="bg-white px-2 py-1">←</code>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">📦 Comment ça marche ?</h3>
            <p className="text-gray-700">
              Imaginez que vous voulez mettre le nombre 20 dans la boîte "age" :
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm">
              <div>age <span className="text-pink-400">←</span> 20</div>
            </div>
            <p className="text-gray-700 mt-2">
              Cela signifie : "age <strong>reçoit</strong> la valeur 20" ou "on met 20 dans age"
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">✍️ Exemples d'affectation</h3>
            <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm space-y-2">
              <div><span className="text-gray-400">// Mettre un nombre entier</span></div>
              <div>age <span className="text-pink-400">←</span> 20</div>
              <div className="mt-2"><span className="text-gray-400">// Mettre du texte</span></div>
              <div>prenom <span className="text-pink-400">←</span> <span className="text-green-400">"Alice"</span></div>
              <div className="mt-2"><span className="text-gray-400">// Mettre un nombre décimal</span></div>
              <div>taille <span className="text-pink-400">←</span> 1.65</div>
              <div className="mt-2"><span className="text-gray-400">// Faire un calcul</span></div>
              <div>double <span className="text-pink-400">←</span> age * 2</div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <p className="text-gray-800 font-semibold">⚠️ Important :</p>
            <p className="text-gray-700 mt-2">
              Pour taper la flèche <code className="bg-white px-2 py-1">←</code>,
              tapez simplement <code className="bg-white px-2 py-1">&lt;-</code>
              (le signe "inférieur" suivi d'un tiret), ça se transforme automatiquement !
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6">
            <p className="text-gray-800 font-semibold">✅ À retenir :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Pour mettre une valeur dans une variable : <code className="bg-white px-2 py-1">variable ← valeur</code></li>
              <li>Tapez <code className="bg-white px-2 py-1">&lt;-</code> pour obtenir <code className="bg-white px-2 py-1">←</code></li>
              <li>On peut mettre des nombres, du texte, ou le résultat d'un calcul</li>
            </ul>
          </div>
        </div>
      ),
      example: {
        code: `Algorithme Affectation
Variables age, double : Entier

Debut
  age ← 20
  double ← age * 2
  Ecrire("Age: ", age, "\\n")
  Ecrire("Double: ", double, "\\n")
Fin`,
        input: [],
      },
    },

    // EXERCICES PARTIE 1
    'partie1-ex1': {
      id: 'partie1-ex1',
      title: 'Exercice 1 - Hello World',
      description: 'Premier programme',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 1 : Hello World</h2><p className="text-gray-700"><strong>Objectif :</strong> Écrire votre premier algorithme qui affiche "Hello World!"</p><div className="bg-blue-50 border-l-4 border-blue-500 p-4"><p className="text-sm"><strong>Consigne :</strong> Créez un algorithme qui utilise Ecrire() pour afficher le message.</p></div></div>),
    },
    'partie1-ex2': {
      id: 'partie1-ex2',
      title: 'Exercice 2 - Variables',
      description: 'Déclarer et afficher',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 2 : Variables</h2><p className="text-gray-700"><strong>Objectif :</strong> Déclarez deux variables (nom de type Chaine et age de type Entier), donnez-leur des valeurs, puis affichez-les.</p></div>),
    },
    'partie1-ex3': {
      id: 'partie1-ex3',
      title: 'Exercice 3 - Addition',
      description: 'Calcul simple',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 3 : Addition</h2><p className="text-gray-700"><strong>Objectif :</strong> Déclarez deux variables entières a et b, donnez-leur des valeurs, calculez leur somme et affichez le résultat.</p></div>),
    },
    'partie1-ex4': {
      id: 'partie1-ex4',
      title: 'Exercice 4 - Lire entrée',
      description: 'Interaction utilisateur',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 4 : Salutation</h2><p className="text-gray-700"><strong>Objectif :</strong> Demandez le prénom de l'utilisateur avec Lire(), puis saluez-le avec un message personnalisé.</p></div>),
    },
    'partie1-ex5': {
      id: 'partie1-ex5',
      title: 'Exercice 5 - Multiplication',
      description: 'Calcul avec entrées',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 5 : Multiplication</h2><p className="text-gray-700"><strong>Objectif :</strong> Demandez deux nombres à l'utilisateur et affichez leur produit.</p></div>),
    },
    'partie1-ex6': {
      id: 'partie1-ex6',
      title: 'Exercice 6 - Moyenne',
      description: 'Calcul de moyenne',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 6 : Moyenne de 3 nombres</h2><p className="text-gray-700"><strong>Objectif :</strong> Demandez 3 nombres réels et calculez leur moyenne.</p><p className="text-sm text-gray-600">Formule : moyenne = (n1 + n2 + n3) / 3</p></div>),
    },
    'partie1-ex7': {
      id: 'partie1-ex7',
      title: 'Exercice 7 - Périmètre',
      description: 'Géométrie',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 7 : Périmètre d'un rectangle</h2><p className="text-gray-700"><strong>Objectif :</strong> Calculez le périmètre d'un rectangle à partir de sa longueur et sa largeur.</p><p className="text-sm text-gray-600">Formule : P = 2 × (longueur + largeur)</p></div>),
    },
    'partie1-ex8': {
      id: 'partie1-ex8',
      title: 'Exercice 8 - Surface cercle',
      description: 'Formule cercle',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 8 : Surface d'un cercle</h2><p className="text-gray-700"><strong>Objectif :</strong> Calculez la surface d'un cercle à partir de son rayon.</p><p className="text-sm text-gray-600">Formule : S = π × r² (utilisez 3.14 pour π)</p></div>),
    },
    'partie1-ex9': {
      id: 'partie1-ex9',
      title: 'Exercice 9 - Conversion temp',
      description: 'Celsius → Fahrenheit',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 9 : Conversion de température</h2><p className="text-gray-700"><strong>Objectif :</strong> Convertissez une température de Celsius en Fahrenheit.</p><p className="text-sm text-gray-600">Formule : F = C × 9/5 + 32</p></div>),
    },
    'partie1-ex10': {
      id: 'partie1-ex10',
      title: 'Exercice 10 - Échange',
      description: 'Permutation',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 10 : Échange de variables</h2><p className="text-gray-700"><strong>Objectif :</strong> Échangez les valeurs de deux variables a et b en utilisant une variable temporaire.</p><p className="text-sm text-gray-600">Astuce : Vous aurez besoin d'une 3ème variable temporaire.</p></div>),
    },

    // PARTIE 2: STRUCTURES CONDITIONNELLES
    'partie2-1': {
      id: 'partie2-1',
      title: '2.1 - Le Si...Alors...Sinon',
      description: 'Conditions simples',
      content: (<div className="space-y-6"><h2 className="text-3xl font-bold">Le Si...Alors...Sinon</h2><div className="bg-blue-50 border-l-4 border-blue-500 p-6"><p className="text-lg">Les <strong>structures conditionnelles</strong> permettent d'exécuter du code seulement si une condition est vraie.</p></div><div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm"><div><span className="text-purple-400">Si</span> condition <span className="text-purple-400">Alors</span></div><div className="ml-4 text-gray-400">// Code si vrai</div><div><span className="text-purple-400">Sinon</span></div><div className="ml-4 text-gray-400">// Code si faux</div><div><span className="text-purple-400">FinSi</span></div></div></div>),
      example: { code: `Algorithme TestAge\nVariables age : Entier\n\nDebut\n  Ecrire("Votre âge:\\\\n")\n  Lire(age)\n  Si age >= 18 Alors\n    Ecrire("Majeur\\\\n")\n  Sinon\n    Ecrire("Mineur\\\\n")\n  FinSi\nFin`, input: ["20"] },
    },

    // EXERCICES PARTIE 2
    'partie2-ex1': {
      id: 'partie2-ex1',
      title: 'Exercice 1 - Nombre positif',
      description: 'Test simple',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 1 : Positif ou négatif ?</h2><p>Testez si un nombre est positif ou négatif.</p></div>),
    },
    'partie2-ex2': {
      id: 'partie2-ex2',
      title: 'Exercice 2 - Pair ou impair',
      description: 'Test modulo',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 2 : Pair ou impair</h2><p>Utilisez le modulo (%) pour tester.</p></div>),
    },
    'partie2-ex3': {
      id: 'partie2-ex3',
      title: 'Exercice 3 - Maximum de 2',
      description: 'Comparer deux nombres',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 3 : Maximum</h2><p>Trouvez le plus grand de 2 nombres.</p></div>),
    },
    'partie2-ex4': {
      id: 'partie2-ex4',
      title: 'Exercice 4 - Admis/Recalé',
      description: 'Test note',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 4 : Examen</h2><p>Admis si note {'>='} 10.</p></div>),
    },
    'partie2-ex5': {
      id: 'partie2-ex5',
      title: 'Exercice 5 - Année bissextile',
      description: 'Condition composée',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 5 : Bissextile</h2><p>Testez si divisible par 4.</p></div>),
    },
    'partie2-ex6': {
      id: 'partie2-ex6',
      title: 'Exercice 6 - Valeur absolue',
      description: 'Calcul avec condition',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 6 : Valeur absolue</h2><p>Calculez |x|.</p></div>),
    },
    'partie2-ex7': {
      id: 'partie2-ex7',
      title: 'Exercice 7 - Tarif cinéma',
      description: 'Prix selon âge',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 7 : Tarif</h2><p>5€ si {'<'} 12 ans, 8€ sinon.</p></div>),
    },
    'partie2-ex8': {
      id: 'partie2-ex8',
      title: 'Exercice 8 - Maximum de 3',
      description: 'Conditions imbriquées',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 8 : Maximum de 3</h2><p>Trouvez le plus grand.</p></div>),
    },
    'partie2-ex9': {
      id: 'partie2-ex9',
      title: 'Exercice 9 - Mention',
      description: 'Plusieurs conditions',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 9 : Mention</h2><p>Calculez la mention.</p></div>),
    },
    'partie2-ex10': {
      id: 'partie2-ex10',
      title: 'Exercice 10 - Triangle',
      description: 'Validité triangle',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 10 : Triangle</h2><p>Testez si 3 côtés forment un triangle.</p></div>),
    },

    // PARTIE 3: STRUCTURES ITÉRATIVES
    'partie3-1': {
      id: 'partie3-1',
      title: '3.1 - La boucle Pour',
      description: 'Répétition avec compteur',
      content: (<div className="space-y-6"><h2 className="text-3xl font-bold">La boucle Pour</h2><div className="bg-blue-50 border-l-4 border-blue-500 p-6"><p className="text-lg">La boucle <strong>Pour</strong> répète un bloc de code un nombre de fois déterminé.</p></div><div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm"><div><span className="text-purple-400">Pour</span> i <span className="text-purple-400">De</span> 1 <span className="text-purple-400">A</span> 10 <span className="text-purple-400">Faire</span></div><div className="ml-4 text-gray-400">// Code répété 10 fois</div><div><span className="text-purple-400">FinPour</span></div></div></div>),
      example: { code: `Algorithme BouclePour\nVariables i : Entier\n\nDebut\n  Pour i De 1 A 5 Faire\n    Ecrire("i = ", i, "\\\\n")\n  FinPour\nFin`, input: [] },
    },

    // EXERCICES PARTIE 3
    'partie3-ex1': {
      id: 'partie3-ex1',
      title: 'Exercice 1 - Afficher 1 à 10',
      description: 'Boucle simple',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 1 : 1 à 10</h2><p>Affichez les nombres de 1 à 10.</p></div>),
    },
    'partie3-ex2': {
      id: 'partie3-ex2',
      title: 'Exercice 2 - Table de multiplication',
      description: 'Table de 7',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 2 : Table de 7</h2><p>Affichez la table de 7.</p></div>),
    },
    'partie3-ex3': {
      id: 'partie3-ex3',
      title: 'Exercice 3 - Somme 1 à N',
      description: 'Calcul avec boucle',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 3 : Somme</h2><p>Sommez les nombres de 1 à N.</p></div>),
    },
    'partie3-ex4': {
      id: 'partie3-ex4',
      title: 'Exercice 4 - Factorielle',
      description: 'n!',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 4 : Factorielle</h2><p>Calculez n! = 1×2×3×...×n</p></div>),
    },
    'partie3-ex5': {
      id: 'partie3-ex5',
      title: 'Exercice 5 - Compter pairs',
      description: 'Compteur conditionnel',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 5 : Pairs</h2><p>Comptez les nombres pairs de 1 à N.</p></div>),
    },
    'partie3-ex6': {
      id: 'partie3-ex6',
      title: 'Exercice 6 - Puissance',
      description: 'x^n avec boucle',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 6 : Puissance</h2><p>Calculez x^n.</p></div>),
    },
    'partie3-ex7': {
      id: 'partie3-ex7',
      title: 'Exercice 7 - Moyenne de N notes',
      description: 'Accumulation et moyenne',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 7 : Moyenne</h2><p>Calculez la moyenne de N notes.</p></div>),
    },
    'partie3-ex8': {
      id: 'partie3-ex8',
      title: 'Exercice 8 - TantQue simple',
      description: 'Boucle conditionnelle',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 8 : TantQue</h2><p>Divisez un nombre par 2 tant que {'>'} 1.</p></div>),
    },
    'partie3-ex9': {
      id: 'partie3-ex9',
      title: 'Exercice 9 - Nombres premiers',
      description: 'Test de primalité',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 9 : Premier ?</h2><p>Testez si N est premier.</p></div>),
    },
    'partie3-ex10': {
      id: 'partie3-ex10',
      title: 'Exercice 10 - PGCD',
      description: 'Algorithme d\'Euclide',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 10 : PGCD</h2><p>Plus Grand Commun Diviseur.</p></div>),
    },

    // PARTIE 4: FONCTIONS ET PROCÉDURES
    'partie4-1': {
      id: 'partie4-1',
      title: '4.1 - Les Fonctions',
      description: 'Fonctions qui retournent une valeur',
      content: (<div className="space-y-6"><h2 className="text-3xl font-bold">Les Fonctions</h2><div className="bg-blue-50 border-l-4 border-blue-500 p-6"><p className="text-lg">Une <strong>fonction</strong> est un bloc de code réutilisable qui <strong>retourne une valeur</strong>.</p></div><div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm"><div><span className="text-purple-400">Fonction</span> <span className="text-yellow-300">Carre</span>(x : <span className="text-blue-400">Entier</span>) : <span className="text-blue-400">Entier</span></div><div><span className="text-purple-400">Debut</span></div><div className="ml-4"><span className="text-purple-400">Retourner</span> x * x</div><div><span className="text-purple-400">Fin</span></div></div></div>),
      example: { code: `Algorithme TestFonction\nVariables n, res : Entier\n\nFonction Carre(x : Entier) : Entier\nDebut\n  Retourner x * x\nFin\n\nDebut\n  Lire(n)\n  res ← Carre(n)\n  Ecrire(n, "² = ", res, "\\\\n")\nFin`, input: ["5"] },
    },

    // EXERCICES PARTIE 4
    'partie4-ex1': {
      id: 'partie4-ex1',
      title: 'Exercice 1 - Fonction double',
      description: 'Simple fonction',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 1 : Double</h2><p>Fonction qui double un nombre.</p></div>),
    },
    'partie4-ex2': {
      id: 'partie4-ex2',
      title: 'Exercice 2 - Maximum fonction',
      description: 'Fonction avec 2 paramètres',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 2 : Max</h2><p>Fonction max de 2 nombres.</p></div>),
    },
    'partie4-ex3': {
      id: 'partie4-ex3',
      title: 'Exercice 3 - Fonction pair',
      description: 'Fonction booléenne',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 3 : EstPair</h2><p>Fonction qui teste si pair.</p></div>),
    },
    'partie4-ex4': {
      id: 'partie4-ex4',
      title: 'Exercice 4 - Fonction puissance',
      description: 'x^n récursif ou itératif',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 4 : Puissance</h2><p>Fonction puissance(x, n).</p></div>),
    },
    'partie4-ex5': {
      id: 'partie4-ex5',
      title: 'Exercice 5 - Fonction factorielle',
      description: 'Fact(n)',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 5 : Factorielle</h2><p>Fonction factorielle(n).</p></div>),
    },
    'partie4-ex6': {
      id: 'partie4-ex6',
      title: 'Exercice 6 - Procédure affichage',
      description: 'Proc sans retour',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 6 : Procédure</h2><p>Procédure qui affiche N étoiles.</p></div>),
    },
    'partie4-ex7': {
      id: 'partie4-ex7',
      title: 'Exercice 7 - Somme fonction',
      description: 'Somme 1 à N',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 7 : Somme</h2><p>Fonction somme(n).</p></div>),
    },
    'partie4-ex8': {
      id: 'partie4-ex8',
      title: 'Exercice 8 - Fonction minimum',
      description: 'Min de 3 nombres',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 8 : Minimum</h2><p>Fonction min(a, b, c).</p></div>),
    },
    'partie4-ex9': {
      id: 'partie4-ex9',
      title: 'Exercice 9 - Fonction valeur absolue',
      description: 'Abs(x)',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 9 : Valeur absolue</h2><p>Fonction abs(x).</p></div>),
    },
    'partie4-ex10': {
      id: 'partie4-ex10',
      title: 'Exercice 10 - Fibonacci',
      description: 'Suite de Fibonacci',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 10 : Fibonacci</h2><p>Fonction fib(n) itérative.</p></div>),
    },

    // PARTIE 5: NOTIONS AVANCÉES
    'partie5-1': {
      id: 'partie5-1',
      title: '5.1 - Les Tableaux',
      description: 'Collections de données',
      content: (<div className="space-y-6"><h2 className="text-3xl font-bold">Les Tableaux</h2><div className="bg-blue-50 border-l-4 border-blue-500 p-6"><p className="text-lg">Un <strong>tableau</strong> est une structure qui permet de stocker plusieurs valeurs du même type sous un seul nom.</p></div><div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm"><div><span className="text-purple-400">Variables</span></div><div className="ml-4">notes : <span className="text-blue-400">Tableau</span>[1..10] <span className="text-purple-400">De</span> <span className="text-blue-400">Reel</span></div><div className="mt-2"><span className="text-purple-400">Debut</span></div><div className="ml-4">notes[1] <span className="text-pink-400">←</span> 15.5</div><div className="ml-4">notes[2] <span className="text-pink-400">←</span> 12.0</div><div><span className="text-purple-400">Fin</span></div></div><div className="bg-green-50 border-l-4 border-green-500 p-6"><p className="text-gray-800 font-semibold">À retenir :</p><ul className="list-disc list-inside mt-2 space-y-1 text-gray-700"><li>Les indices commencent à 1</li><li>Tous les éléments ont le même type</li><li>On accède aux éléments avec tableau[indice]</li></ul></div></div>),
    },

    // EXERCICES PARTIE 5
    'partie5-ex1': {
      id: 'partie5-ex1',
      title: 'Exercice 1 - Remplir un tableau',
      description: 'Saisie et affichage',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 1 : Remplir un tableau</h2><p className="text-gray-700"><strong>Objectif :</strong> Demandez 5 nombres à l'utilisateur, stockez-les dans un tableau, puis affichez-les.</p><div className="bg-blue-50 border-l-4 border-blue-500 p-4"><p className="text-sm"><strong>Astuce :</strong> Utilisez une boucle Pour pour remplir et afficher le tableau.</p></div></div>),
    },
    'partie5-ex2': {
      id: 'partie5-ex2',
      title: 'Exercice 2 - Somme tableau',
      description: 'Calcul sur tableau',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 2 : Somme d'un tableau</h2><p className="text-gray-700"><strong>Objectif :</strong> Calculez la somme de tous les éléments d'un tableau de 10 entiers.</p></div>),
    },
    'partie5-ex3': {
      id: 'partie5-ex3',
      title: 'Exercice 3 - Maximum tableau',
      description: 'Recherche du maximum',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 3 : Maximum</h2><p className="text-gray-700"><strong>Objectif :</strong> Trouvez la valeur maximale dans un tableau de 10 nombres.</p></div>),
    },
    'partie5-ex4': {
      id: 'partie5-ex4',
      title: 'Exercice 4 - Moyenne tableau',
      description: 'Moyenne des éléments',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 4 : Moyenne</h2><p className="text-gray-700"><strong>Objectif :</strong> Calculez la moyenne des valeurs d'un tableau.</p></div>),
    },
    'partie5-ex5': {
      id: 'partie5-ex5',
      title: 'Exercice 5 - Inverser tableau',
      description: 'Inversion',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 5 : Inverser</h2><p className="text-gray-700"><strong>Objectif :</strong> Inversez l'ordre des éléments d'un tableau.</p><p className="text-sm text-gray-600">Exemple : [1,2,3,4,5] devient [5,4,3,2,1]</p></div>),
    },
    'partie5-ex6': {
      id: 'partie5-ex6',
      title: 'Exercice 6 - Recherche valeur',
      description: 'Recherche dans tableau',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 6 : Recherche</h2><p className="text-gray-700"><strong>Objectif :</strong> Cherchez si une valeur existe dans un tableau et affichez sa position.</p></div>),
    },
    'partie5-ex7': {
      id: 'partie5-ex7',
      title: 'Exercice 7 - Compter occurrences',
      description: 'Comptage',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 7 : Occurrences</h2><p className="text-gray-700"><strong>Objectif :</strong> Comptez combien de fois une valeur apparaît dans un tableau.</p></div>),
    },
    'partie5-ex8': {
      id: 'partie5-ex8',
      title: 'Exercice 8 - Tri à bulles',
      description: 'Tri simple',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 8 : Tri à bulles</h2><p className="text-gray-700"><strong>Objectif :</strong> Triez un tableau par ordre croissant avec l'algorithme du tri à bulles.</p><p className="text-sm text-gray-600">Principe : Comparez les éléments adjacents et échangez-les si nécessaire.</p></div>),
    },
    'partie5-ex9': {
      id: 'partie5-ex9',
      title: 'Exercice 9 - Fusion tableaux',
      description: 'Fusionner deux tableaux',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 9 : Fusion</h2><p className="text-gray-700"><strong>Objectif :</strong> Fusionnez deux tableaux de 5 éléments en un tableau de 10 éléments.</p></div>),
    },
    'partie5-ex10': {
      id: 'partie5-ex10',
      title: 'Exercice 10 - Enregistrements',
      description: 'Structures de données',
      content: (<div className="space-y-4"><h2 className="text-2xl font-bold">Exercice 10 : Enregistrements</h2><p className="text-gray-700"><strong>Objectif :</strong> Créez une structure Etudiant avec nom, prenom, age. Déclarez un tableau de 3 étudiants, remplissez-le et affichez les informations.</p><div className="bg-yellow-50 border-l-4 border-yellow-500 p-4"><p className="text-sm"><strong>Syntaxe :</strong></p><pre className="text-xs mt-2 font-mono">Structure Etudiant\n  nom : Chaine\n  prenom : Chaine\n  age : Entier\nFinStructure</pre></div></div>),
    },
  };

  const chapters = [
    {
      id: 'partie1',
      title: 'Partie 1: Les Bases',
      Icon: Target,
      lessons: ['partie1-1', 'partie1-2', 'partie1-3', 'partie1-ex1', 'partie1-ex2', 'partie1-ex3', 'partie1-ex4', 'partie1-ex5', 'partie1-ex6', 'partie1-ex7', 'partie1-ex8', 'partie1-ex9', 'partie1-ex10'],
      color: 'bg-blue-500',
    },
    {
      id: 'partie2',
      title: 'Partie 2: Structures Conditionnelles',
      Icon: GitBranch,
      lessons: ['partie2-1', 'partie2-ex1', 'partie2-ex2', 'partie2-ex3', 'partie2-ex4', 'partie2-ex5', 'partie2-ex6', 'partie2-ex7', 'partie2-ex8', 'partie2-ex9', 'partie2-ex10'],
      color: 'bg-green-500',
    },
    {
      id: 'partie3',
      title: 'Partie 3: Structures Itératives',
      Icon: RotateCcw,
      lessons: ['partie3-1', 'partie3-ex1', 'partie3-ex2', 'partie3-ex3', 'partie3-ex4', 'partie3-ex5', 'partie3-ex6', 'partie3-ex7', 'partie3-ex8', 'partie3-ex9', 'partie3-ex10'],
      color: 'bg-yellow-500',
    },
    {
      id: 'partie4',
      title: 'Partie 4: Fonctions et Procédures',
      Icon: Settings2,
      lessons: ['partie4-1', 'partie4-ex1', 'partie4-ex2', 'partie4-ex3', 'partie4-ex4', 'partie4-ex5', 'partie4-ex6', 'partie4-ex7', 'partie4-ex8', 'partie4-ex9', 'partie4-ex10'],
      color: 'bg-purple-500',
    },
    {
      id: 'partie5',
      title: 'Partie 5: Notions Avancées',
      Icon: Rocket,
      lessons: ['partie5-1', 'partie5-ex1', 'partie5-ex2', 'partie5-ex3', 'partie5-ex4', 'partie5-ex5', 'partie5-ex6', 'partie5-ex7', 'partie5-ex8', 'partie5-ex9', 'partie5-ex10'],
      color: 'bg-red-500',
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
            <span>Cours</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">Apprentissage progressif</p>
        </div>

        <div className="p-4 space-y-2">
          {chapters.map((chapter) => {
            const ChapterIcon = chapter.Icon;
            return (
              <div key={chapter.id} className="mb-4">
                <div className={`${chapter.color} text-white px-4 py-2 font-semibold flex items-center gap-2`}>
                  <ChapterIcon size={16} />
                  <span className="text-sm">{chapter.title}</span>
                </div>
                <div className="ml-2 mt-2 space-y-1">
                  {chapter.lessons.map((lessonId) => (
                    <button
                      key={lessonId}
                      onClick={() => setActiveLesson(lessonId)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        activeLesson === lessonId
                          ? 'bg-indigo-100 text-indigo-900 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {lessons[lessonId]?.title}
                    </button>
                  ))}
                </div>
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
              {currentLesson.content}

              {currentLesson.example && (
                <div className="mt-8 bg-white border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <code className="text-indigo-600"><Code size={20} /></code>
                    <span>Essayez cet exemple</span>
                  </h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm">
                    {currentLesson.example.code}
                  </pre>
                  <button
                    onClick={() => handleTryExample(currentLesson.example!)}
                    className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                  >
                    Essayer dans l'éditeur →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Sélectionnez une leçon dans le menu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cours;
