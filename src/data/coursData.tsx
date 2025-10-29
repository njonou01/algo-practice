/**
 * Données des cours - Toutes les leçons et exercices
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

export const lessons: { [key: string]: Lesson } = {
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
    description: 'Premier programme simple',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Exercice 1 : Hello World</h2>
        <p className="text-gray-700">Écrivez un algorithme qui affiche "Hello World!"</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-sm text-blue-900"><strong>Objectif :</strong> Utiliser Ecrire() pour afficher du texte</p>
        </div>
      </div>
    ),
    example: {
      code: `Algorithme HelloWorld

Debut
  Ecrire("Hello World!\\n")
Fin`,
      input: [],
    },
  },

  'partie1-ex2': {
    id: 'partie1-ex2',
    title: 'Exercice 2 - Affichage de variables',
    description: 'Déclarer et afficher',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Exercice 2 : Affichage de variables</h2>
        <p className="text-gray-700">Déclarez deux variables (nom et age) et affichez-les.</p>
      </div>
    ),
    example: {
      code: `Algorithme AffichageVariables
Variables nom : Chaine
Variables age : Entier

Debut
  nom ← "Alice"
  age ← 25
  Ecrire("Nom: ", nom, "\\n")
  Ecrire("Age: ", age, " ans\\n")
Fin`,
      input: [],
    },
  },

  'partie1-ex3': {
    id: 'partie1-ex3',
    title: 'Exercice 3 - Calcul simple',
    description: 'Addition de deux nombres',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Exercice 3 : Addition</h2>
        <p className="text-gray-700">Additionnez deux nombres et affichez le résultat.</p>
      </div>
    ),
    example: {
      code: `Algorithme Addition
Variables a, b, somme : Entier

Debut
  a ← 15
  b ← 27
  somme ← a + b
  Ecrire("La somme de ", a, " et ", b, " est ", somme, "\\n")
Fin`,
      input: [],
    },
  },

  'partie1-ex4': {
    id: 'partie1-ex4',
    title: 'Exercice 4 - Lire une entrée',
    description: 'Interaction avec l\'utilisateur',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Exercice 4 : Lire une entrée</h2>
        <p className="text-gray-700">Demandez le prénom de l'utilisateur et saluez-le.</p>
      </div>
    ),
    example: {
      code: `Algorithme Salutation
Variables prenom : Chaine

Debut
  Ecrire("Entrez votre prénom:\\n")
  Lire(prenom)
  Ecrire("Bonjour ", prenom, " !\\n")
Fin`,
      input: ["Marie"],
    },
  },

  'partie1-ex5': {
    id: 'partie1-ex5',
    title: 'Exercice 5 - Calcul avec entrées',
    description: 'Calcul à partir des données utilisateur',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Exercice 5 : Multiplication</h2>
        <p className="text-gray-700">Demandez deux nombres et affichez leur produit.</p>
      </div>
    ),
    example: {
      code: `Algorithme Multiplication
Variables a, b, produit : Entier

Debut
  Ecrire("Premier nombre:\\n")
  Lire(a)
  Ecrire("Deuxième nombre:\\n")
  Lire(b)
  produit ← a * b
  Ecrire("Produit: ", produit, "\\n")
Fin`,
      input: ["6", "7"],
    },
  },

  'partie1-ex6': {
    id: 'partie1-ex6',
    title: 'Exercice 6 - Moyenne de 3 nombres',
    description: 'Calcul de moyenne',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Exercice 6 : Moyenne</h2>
        <p className="text-gray-700">Calculez la moyenne de 3 nombres réels.</p>
      </div>
    ),
    example: {
      code: `Algorithme Moyenne
Variables n1, n2, n3, moyenne : Reel

Debut
  Ecrire("Note 1:\\n")
  Lire(n1)
  Ecrire("Note 2:\\n")
  Lire(n2)
  Ecrire("Note 3:\\n")
  Lire(n3)
  moyenne ← (n1 + n2 + n3) / 3
  Ecrire("Moyenne: ", moyenne, "\\n")
Fin`,
      input: ["15.5", "14.0", "16.5"],
    },
  },

  'partie1-ex7': {
    id: 'partie1-ex7',
    title: 'Exercice 7 - Périmètre rectangle',
    description: 'Géométrie simple',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Exercice 7 : Périmètre d'un rectangle</h2>
        <p className="text-gray-700">Calculez le périmètre d'un rectangle (P = 2 × (L + l)).</p>
      </div>
    ),
    example: {
      code: `Algorithme PerimetreRectangle
Variables longueur, largeur, perimetre : Reel

Debut
  Ecrire("Longueur:\\n")
  Lire(longueur)
  Ecrire("Largeur:\\n")
  Lire(largeur)
  perimetre ← 2 * (longueur + largeur)
  Ecrire("Périmètre: ", perimetre, "\\n")
Fin`,
      input: ["5.5", "3.2"],
    },
  },

  'partie1-ex8': {
    id: 'partie1-ex8',
    title: 'Exercice 8 - Surface cercle',
    description: 'Formule du cercle',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Exercice 8 : Surface d'un cercle</h2>
        <p className="text-gray-700">Calculez la surface d'un cercle (S = π × r²). Utilisez 3.14 pour π.</p>
      </div>
    ),
    example: {
      code: `Algorithme SurfaceCercle
Variables rayon, surface : Reel
Variables pi : Reel

Debut
  pi ← 3.14
  Ecrire("Rayon du cercle:\\n")
  Lire(rayon)
  surface ← pi * rayon * rayon
  Ecrire("Surface: ", surface, "\\n")
Fin`,
      input: ["5.0"],
    },
  },

  'partie1-ex9': {
    id: 'partie1-ex9',
    title: 'Exercice 9 - Conversion températures',
    description: 'Celsius vers Fahrenheit',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Exercice 9 : Conversion Celsius → Fahrenheit</h2>
        <p className="text-gray-700">Convertissez une température de Celsius en Fahrenheit (F = C × 9/5 + 32).</p>
      </div>
    ),
    example: {
      code: `Algorithme ConversionTemperature
Variables celsius, fahrenheit : Reel

Debut
  Ecrire("Température en Celsius:\\n")
  Lire(celsius)
  fahrenheit ← celsius * 9 / 5 + 32
  Ecrire(celsius, "°C = ", fahrenheit, "°F\\n")
Fin`,
      input: ["25.0"],
    },
  },

  'partie1-ex10': {
    id: 'partie1-ex10',
    title: 'Exercice 10 - Échange de variables',
    description: 'Permutation de valeurs',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Exercice 10 : Échange de variables</h2>
        <p className="text-gray-700">Échangez les valeurs de deux variables en utilisant une variable temporaire.</p>
      </div>
    ),
    example: {
      code: `Algorithme EchangeVariables
Variables a, b, temp : Entier

Debut
  a ← 5
  b ← 10
  Ecrire("Avant: a=", a, " b=", b, "\\n")

  temp ← a
  a ← b
  b ← temp

  Ecrire("Après: a=", a, " b=", b, "\\n")
Fin`,
      input: [],
    },
  },
};
