function Guide() {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
            Guide de l'algorithmique en français
          </h1>

          {/* Structure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              1. Structure d'un algorithme
            </h2>
            <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
              <div className="text-gray-700">
                <div><span className="text-indigo-600 font-semibold">Algorithme</span> NomDeLAlgorithme</div>
                <div><span className="text-indigo-600 font-semibold">Variables</span></div>
                <div className="ml-4">variable1, variable2 : Type</div>
                <div className="mt-2"><span className="text-indigo-600 font-semibold">DebutAlgorithme</span></div>
                <div className="ml-4 text-gray-500">// Instructions ici</div>
                <div><span className="text-indigo-600 font-semibold">FinAlgorithme</span></div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Tout algorithme commence par le mot-clé <code className="bg-gray-100 px-2 py-1 text-indigo-600">Algorithme</code> suivi du nom.
              Les variables sont déclarées dans la section <code className="bg-gray-100 px-2 py-1 text-indigo-600">Variables</code>.
              Le corps de l'algorithme se trouve entre <code className="bg-gray-100 px-2 py-1 text-indigo-600">DebutAlgorithme</code> et <code className="bg-gray-100 px-2 py-1 text-indigo-600">FinAlgorithme</code>.
            </p>
          </section>

          {/* Types */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              2. Types de données
            </h2>
            <table className="w-full border border-gray-200 mb-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Type</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Exemple</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3"><code className="text-indigo-600">Entier</code></td>
                  <td className="border border-gray-200 px-4 py-3">Nombre entier</td>
                  <td className="border border-gray-200 px-4 py-3 font-mono text-sm">42, -17, 0</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3"><code className="text-indigo-600">Reel</code></td>
                  <td className="border border-gray-200 px-4 py-3">Nombre décimal</td>
                  <td className="border border-gray-200 px-4 py-3 font-mono text-sm">3.14, -2.5, 0.0</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3"><code className="text-indigo-600">Chaine</code></td>
                  <td className="border border-gray-200 px-4 py-3">Chaîne de caractères</td>
                  <td className="border border-gray-200 px-4 py-3 font-mono text-sm">"Bonjour", "123"</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3"><code className="text-indigo-600">Booleen</code></td>
                  <td className="border border-gray-200 px-4 py-3">Valeur logique</td>
                  <td className="border border-gray-200 px-4 py-3 font-mono text-sm">Vrai, Faux</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3"><code className="text-indigo-600">Caractere</code></td>
                  <td className="border border-gray-200 px-4 py-3">Un seul caractère</td>
                  <td className="border border-gray-200 px-4 py-3 font-mono text-sm">"A", "z", "5"</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Affectation */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              3. Affectation
            </h2>
            <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
              <div className="text-gray-700">variable <span className="text-pink-600">←</span> valeur</div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-2">
              L'opérateur d'affectation est <code className="bg-gray-100 px-2 py-1 text-pink-600">←</code> (flèche gauche).
              Pour le saisir, tapez <code className="bg-gray-100 px-2 py-1">&lt;-</code>
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Exemple :</strong> <code className="bg-gray-100 px-2 py-1 font-mono">x ← 10</code> assigne la valeur 10 à la variable x.
            </p>
          </section>

          {/* Constantes */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              4. Constantes
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-gray-900">
                Les <strong>constantes</strong> sont des valeurs qui ne peuvent pas être modifiées après leur initialisation.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-gray-900 font-semibold mb-2">✨ Nouvelle syntaxe simplifiée !</p>
              <p className="text-gray-700">
                Vous pouvez maintenant <strong>initialiser directement</strong> les constantes avec <strong>inférence de type automatique</strong> !
              </p>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">Syntaxe recommandée (avec initialisation directe)</h3>
            <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
              <div className="text-gray-700">
                <div><span className="text-indigo-600 font-semibold">Algorithme</span> ExempleConstantes</div>
                <div><span className="text-indigo-600 font-semibold">Constantes</span></div>
                <div className="ml-4">PI <span className="text-pink-600">←</span> 3.14159 <span className="text-gray-500">// Type Reel inféré</span></div>
                <div className="ml-4">MAX_VALUE <span className="text-pink-600">←</span> 100 <span className="text-gray-500">// Type Entier inféré</span></div>
                <div className="ml-4">APP_NAME <span className="text-pink-600">←</span> "AlgoGénie" <span className="text-gray-500">// Type Chaine inféré</span></div>
                <div className="ml-4">EST_ACTIF <span className="text-pink-600">←</span> Vrai <span className="text-gray-500">// Type Booleen inféré</span></div>
                <div className="mt-2"><span className="text-indigo-600 font-semibold">Variables</span></div>
                <div className="ml-4">rayon, surface : Reel</div>
                <div className="mt-2"><span className="text-indigo-600 font-semibold">DebutAlgorithme</span></div>
                <div className="ml-4 text-gray-500">// Les constantes sont déjà initialisées !</div>
                <div className="ml-4">rayon <span className="text-pink-600">←</span> 5</div>
                <div className="ml-4">surface <span className="text-pink-600">←</span> PI * rayon * rayon</div>
                <div className="ml-4">Ecrire("Surface: ", surface, "\\n")</div>
                <div><span className="text-indigo-600 font-semibold">FinAlgorithme</span></div>
              </div>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
              <p className="text-gray-900 font-semibold mb-2">💡 Avantages :</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Déclaration ET initialisation en une seule ligne</li>
                <li>Type inféré automatiquement (pas besoin de spécifier)</li>
                <li>Code plus concis et lisible</li>
                <li>Constantes déjà initialisées avant le <code className="bg-white px-2 py-1">DebutAlgorithme</code></li>
              </ul>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">Ancienne syntaxe (toujours supportée)</h3>
            <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
              <div className="text-gray-700">
                <div><span className="text-indigo-600 font-semibold">Constantes</span></div>
                <div className="ml-4">PI : Reel</div>
                <div className="ml-4">MAX_VALUE : Entier</div>
                <div className="mt-2"><span className="text-indigo-600 font-semibold">DebutAlgorithme</span></div>
                <div className="ml-4">PI <span className="text-pink-600">←</span> 3.14159</div>
                <div className="ml-4">MAX_VALUE <span className="text-pink-600">←</span> 100</div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <p className="text-gray-900 font-semibold mb-2">⚠️ Restrictions :</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>L'initialisation directe fonctionne uniquement avec des <strong>valeurs littérales</strong> (nombres, chaînes, booléens)</li>
                <li>Pour des expressions complexes (ex: <code className="bg-white px-2 py-1">2 + 2</code>), utilisez l'ancienne syntaxe avec type explicite</li>
                <li>Une fois initialisées, les constantes <strong>ne peuvent pas être modifiées</strong></li>
                <li>Toute tentative de modification génère une erreur</li>
              </ul>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">Exemple d'erreur</h3>
            <div className="bg-red-50 border border-red-200 p-6 font-mono text-sm mb-2">
              <div className="text-gray-700">
                <div>PI <span className="text-pink-600">←</span> 3.14159</div>
                <div className="text-red-600">PI <span className="text-pink-600">←</span> 3.14 <span className="ml-2">// ❌ Erreur !</span></div>
              </div>
            </div>
            <p className="text-gray-700 text-sm italic">
              Erreur : "Impossible de modifier la constante 'PI'"
            </p>
          </section>

          {/* Entrées/Sorties */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              5. Entrées et sorties
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Lire()</h3>
                <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-2">
                  <div className="text-gray-700">
                    <div>Lire(variable)</div>
                    <div className="mt-2">Lire(x, y, z)</div>
                    <div className="mt-2">Lire(tableau[i])</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Permet de saisir une ou plusieurs valeurs depuis l'entrée standard.
                  Peut aussi lire directement dans des éléments de tableaux.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Ecrire()</h3>
                <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-2">
                  <div className="text-gray-700">
                    <div>Ecrire("Message")</div>
                    <div className="mt-2">Ecrire("Resultat:", variable)</div>
                    <div className="mt-2">Ecrire("Ligne 1\n")</div>
                    <div>Ecrire("Ligne 2\n")</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Affiche du texte et/ou des variables à l'écran.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-red-600">Important :</strong> Pour aller à la ligne, il faut utiliser <code className="bg-gray-100 px-2 py-1">\n</code> explicitement.
                  Sans <code className="bg-gray-100 px-2 py-1">\n</code>, le texte reste sur la même ligne.
                </p>
              </div>
            </div>
          </section>

          {/* Structures conditionnelles */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              6. Structures conditionnelles
            </h2>
            <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
              <div className="text-gray-700">
                <div><span className="text-indigo-600">Si</span> condition <span className="text-indigo-600">Alors</span></div>
                <div className="ml-4 text-gray-500">// Instructions si vrai</div>
                <div><span className="text-indigo-600">Sinon</span></div>
                <div className="ml-4 text-gray-500">// Instructions si faux</div>
                <div><span className="text-indigo-600">FinSi</span></div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              La clause <code className="bg-gray-100 px-2 py-1 text-indigo-600">Sinon</code> est optionnelle.
            </p>
          </section>

          {/* Boucles */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              7. Boucles
            </h2>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Boucle Pour</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-2">
                <div className="text-gray-700">
                  <div><span className="text-indigo-600">Pour</span> i <span className="text-indigo-600">De</span> 1 <span className="text-indigo-600">A</span> 10 <span className="text-indigo-600">Faire</span></div>
                  <div className="ml-4 text-gray-500">// Instructions</div>
                  <div><span className="text-indigo-600">FinPour</span></div>
                </div>
              </div>
              <p className="text-gray-700">Répète les instructions un nombre déterminé de fois.</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Boucle TantQue</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-2">
                <div className="text-gray-700">
                  <div><span className="text-indigo-600">TantQue</span> condition <span className="text-indigo-600">Faire</span></div>
                  <div className="ml-4 text-gray-500">// Instructions</div>
                  <div><span className="text-indigo-600">FinTantQue</span></div>
                </div>
              </div>
              <p className="text-gray-700">Répète les instructions tant que la condition est vraie.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Boucle Repeter</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-2">
                <div className="text-gray-700">
                  <div><span className="text-indigo-600">Repeter</span></div>
                  <div className="ml-4 text-gray-500">// Instructions</div>
                  <div><span className="text-indigo-600">Jusqua</span> condition</div>
                </div>
              </div>
              <p className="text-gray-700">Répète les instructions jusqu'à ce que la condition soit vraie (au moins une exécution).</p>
            </div>
          </section>

          {/* Structure Selon */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              8. Structure Selon/Cas
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La structure <code className="bg-gray-100 px-2 py-1 text-indigo-600">Selon</code> permet de tester une valeur
              contre plusieurs cas possibles. C'est l'équivalent du <code className="bg-gray-100 px-2 py-1">switch/case</code> dans d'autres langages.
            </p>

            <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
              <div className="text-gray-700">
                <div><span className="text-indigo-600">Selon</span> variable</div>
                <div className="ml-4"><span className="text-indigo-600">Cas</span> valeur1:</div>
                <div className="ml-8 text-gray-500">// Instructions pour valeur1</div>
                <div className="ml-4"><span className="text-indigo-600">Cas</span> valeur2, valeur3:</div>
                <div className="ml-8 text-gray-500">// Instructions pour valeur2 ou valeur3</div>
                <div className="ml-4"><span className="text-indigo-600">Defaut</span>:</div>
                <div className="ml-8 text-gray-500">// Instructions si aucun cas ne correspond</div>
                <div><span className="text-indigo-600">FinSelon</span></div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Caractéristiques</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Chaque cas peut contenir <strong>plusieurs valeurs</strong> séparées par des virgules</li>
                <li>Le bloc <code className="bg-gray-100 px-2 py-1 text-indigo-600">Defaut</code> est optionnel</li>
                <li>Seul le premier cas correspondant est exécuté (pas de <em>fall-through</em>)</li>
                <li>Chaque cas doit se terminer par <code className="bg-gray-100 px-2 py-1">:</code></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Exemple : Jour de la semaine</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm">
                <div className="text-gray-700">
                  <div><span className="text-indigo-600">Variables</span> jour : Entier</div>
                  <div className="mt-2"><span className="text-indigo-600">DebutAlgorithme</span></div>
                  <div className="ml-4">Ecrire("Entrez un numéro (1-7):\n")</div>
                  <div className="ml-4">Lire(jour)</div>
                  <div className="ml-4 mt-2"><span className="text-indigo-600">Selon</span> jour</div>
                  <div className="ml-8"><span className="text-indigo-600">Cas</span> 1:</div>
                  <div className="ml-12">Ecrire("Lundi\n")</div>
                  <div className="ml-8"><span className="text-indigo-600">Cas</span> 2:</div>
                  <div className="ml-12">Ecrire("Mardi\n")</div>
                  <div className="ml-8"><span className="text-indigo-600">Cas</span> 3:</div>
                  <div className="ml-12">Ecrire("Mercredi\n")</div>
                  <div className="ml-8"><span className="text-indigo-600">Cas</span> 6, 7:</div>
                  <div className="ml-12">Ecrire("Week-end!\n")</div>
                  <div className="ml-8"><span className="text-indigo-600">Defaut</span>:</div>
                  <div className="ml-12">Ecrire("Jour invalide\n")</div>
                  <div className="ml-4"><span className="text-indigo-600">FinSelon</span></div>
                  <div><span className="text-indigo-600">FinAlgorithme</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* Tableaux */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              9. Tableaux
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Les tableaux permettent de stocker plusieurs valeurs du même type.
            </p>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Tableaux à 1 dimension</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
                <div className="text-gray-700">
                  <div className="mb-2 text-gray-500">// Déclaration</div>
                  <div>notes : <span className="text-indigo-600">Tableau[5]</span> <span className="text-indigo-600">de</span> Reel</div>
                  <div className="mt-4 mb-2 text-gray-500">// Accès et modification</div>
                  <div>notes[0] <span className="text-pink-600">←</span> 15.5</div>
                  <div>notes[1] <span className="text-pink-600">←</span> 12.0</div>
                  <div>moyenne <span className="text-pink-600">←</span> (notes[0] + notes[1]) / 2</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm mb-2">
                <strong>Note :</strong> Les indices commencent à 0. Un tableau de taille 5 a des indices de 0 à 4.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Tableaux à 2 dimensions (matrices)</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
                <div className="text-gray-700">
                  <div className="mb-2 text-gray-500">// Déclaration (3 lignes, 4 colonnes)</div>
                  <div>matrice : <span className="text-indigo-600">Tableau[3, 4]</span> <span className="text-indigo-600">de</span> Entier</div>
                  <div className="mt-4 mb-2 text-gray-500">// Accès et modification</div>
                  <div>matrice[0, 0] <span className="text-pink-600">←</span> 10</div>
                  <div>matrice[1, 2] <span className="text-pink-600">←</span> 25</div>
                  <div>val <span className="text-pink-600">←</span> matrice[2, 3]</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Exemple avec boucle</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm">
                <div className="text-gray-700">
                  <div><span className="text-indigo-600">Variables</span></div>
                  <div className="ml-4">tab : <span className="text-indigo-600">Tableau[10]</span> <span className="text-indigo-600">de</span> Entier</div>
                  <div className="ml-4">i, somme : Entier</div>
                  <div className="mt-2"><span className="text-indigo-600">DebutAlgorithme</span></div>
                  <div className="ml-4 mb-2 text-gray-500">// Remplir le tableau</div>
                  <div className="ml-4"><span className="text-indigo-600">Pour</span> i <span className="text-indigo-600">De</span> 0 <span className="text-indigo-600">A</span> 9 <span className="text-indigo-600">Faire</span></div>
                  <div className="ml-8">tab[i] <span className="text-pink-600">←</span> i * 2</div>
                  <div className="ml-4"><span className="text-indigo-600">FinPour</span></div>
                  <div className="ml-4 mt-4 mb-2 text-gray-500">// Calculer la somme</div>
                  <div className="ml-4">somme <span className="text-pink-600">←</span> 0</div>
                  <div className="ml-4"><span className="text-indigo-600">Pour</span> i <span className="text-indigo-600">De</span> 0 <span className="text-indigo-600">A</span> 9 <span className="text-indigo-600">Faire</span></div>
                  <div className="ml-8">somme <span className="text-pink-600">←</span> somme + tab[i]</div>
                  <div className="ml-4"><span className="text-indigo-600">FinPour</span></div>
                  <div className="ml-4 mt-2">Ecrire("Somme:", somme)</div>
                  <div><span className="text-indigo-600">FinAlgorithme</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* Structures */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              10. Structures/Enregistrements
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Les structures (aussi appelées enregistrements) permettent de regrouper plusieurs données
              de types différents sous un seul nom. C'est idéal pour représenter des entités complexes
              comme des personnes, des points géométriques, etc.
            </p>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Déclaration d'une structure</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
                <div className="text-gray-700">
                  <div><span className="text-indigo-600 font-semibold">Structure</span> Point</div>
                  <div className="ml-4">x : Entier</div>
                  <div className="ml-4">y : Entier</div>
                  <div><span className="text-indigo-600 font-semibold">FinStructure</span></div>
                  <div className="mt-4"><span className="text-indigo-600 font-semibold">Structure</span> Personne</div>
                  <div className="ml-4">nom : Chaine</div>
                  <div className="ml-4">age : Entier</div>
                  <div className="ml-4">taille : Reel</div>
                  <div><span className="text-indigo-600 font-semibold">FinStructure</span></div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm mb-2">
                <strong>Note :</strong> Les structures doivent être déclarées <strong>avant</strong> les variables.
                Vous pouvez aussi utiliser <code className="bg-gray-100 px-2 py-1">Enregistrement</code> / <code className="bg-gray-100 px-2 py-1">FinEnregistrement</code> à la place de Structure / FinStructure.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Utilisation des structures</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
                <div className="text-gray-700">
                  <div className="mb-2 text-gray-500">// Déclarer des variables de type structure</div>
                  <div><span className="text-indigo-600">Variables</span></div>
                  <div className="ml-4">p1, p2 : Point</div>
                  <div className="ml-4">etudiant : Personne</div>
                  <div className="mt-4 mb-2 text-gray-500">// Accéder et modifier les champs</div>
                  <div>p1.x <span className="text-pink-600">←</span> 10</div>
                  <div>p1.y <span className="text-pink-600">←</span> 20</div>
                  <div className="mt-2">etudiant.nom <span className="text-pink-600">←</span> "Alice"</div>
                  <div>etudiant.age <span className="text-pink-600">←</span> 20</div>
                  <div>etudiant.taille <span className="text-pink-600">←</span> 1.65</div>
                  <div className="mt-4 mb-2 text-gray-500">// Lire des valeurs dans les champs</div>
                  <div>Lire(p2.x, p2.y)</div>
                  <div>Lire(etudiant.nom)</div>
                  <div className="mt-4 mb-2 text-gray-500">// Utiliser les champs dans des expressions</div>
                  <div>distance <span className="text-pink-600">←</span> p1.x + p2.x</div>
                  <div>Ecrire("Age: ", etudiant.age, "\n")</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Exemple complet avec structures</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm">
                <div className="text-gray-700">
                  <div><span className="text-indigo-600 font-semibold">Algorithme</span> GestionEtudiants</div>
                  <div className="mt-2"><span className="text-indigo-600 font-semibold">Structure</span> Etudiant</div>
                  <div className="ml-4">nom : Chaine</div>
                  <div className="ml-4">moyenne : Reel</div>
                  <div><span className="text-indigo-600 font-semibold">FinStructure</span></div>
                  <div className="mt-2"><span className="text-indigo-600 font-semibold">Variables</span></div>
                  <div className="ml-4">e1, e2 : Etudiant</div>
                  <div className="ml-4">meilleur : Chaine</div>
                  <div className="mt-2"><span className="text-indigo-600 font-semibold">DebutAlgorithme</span></div>
                  <div className="ml-4">Ecrire("Nom étudiant 1:\n")</div>
                  <div className="ml-4">Lire(e1.nom)</div>
                  <div className="ml-4">Ecrire("Moyenne:\n")</div>
                  <div className="ml-4">Lire(e1.moyenne)</div>
                  <div className="ml-4 mt-2">Ecrire("Nom étudiant 2:\n")</div>
                  <div className="ml-4">Lire(e2.nom)</div>
                  <div className="ml-4">Ecrire("Moyenne:\n")</div>
                  <div className="ml-4">Lire(e2.moyenne)</div>
                  <div className="ml-4 mt-2"><span className="text-indigo-600">Si</span> e1.moyenne &gt; e2.moyenne <span className="text-indigo-600">Alors</span></div>
                  <div className="ml-8">meilleur <span className="text-pink-600">←</span> e1.nom</div>
                  <div className="ml-4"><span className="text-indigo-600">Sinon</span></div>
                  <div className="ml-8">meilleur <span className="text-pink-600">←</span> e2.nom</div>
                  <div className="ml-4"><span className="text-indigo-600">FinSi</span></div>
                  <div className="ml-4 mt-2">Ecrire("Meilleure moyenne: ", meilleur, "\n")</div>
                  <div><span className="text-indigo-600 font-semibold">FinAlgorithme</span></div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-blue-900">
                <strong>Possibilités avancées :</strong> Les structures peuvent contenir d'autres structures,
                être utilisées dans des tableaux (<code className="bg-gray-100 px-2 py-1">Tableau[10] de Personne</code>),
                et être passées en paramètres de fonctions.
              </p>
            </div>
          </section>

          {/* Fonctions et Procédures */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              11. Fonctions et Procédures
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Les fonctions et procédures permettent de décomposer un programme en sous-programmes réutilisables.
              Une <strong>fonction</strong> retourne une valeur, tandis qu'une <strong>procédure</strong> effectue des actions sans retourner de valeur.
            </p>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Fonctions</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
                <div className="text-gray-700">
                  <div><span className="text-indigo-600 font-semibold">Fonction</span> Carre(n : Entier) : Entier</div>
                  <div><span className="text-indigo-600">Variables</span> resultat : Entier</div>
                  <div><span className="text-indigo-600">DebutAlgorithme</span></div>
                  <div className="ml-4">resultat <span className="text-pink-600">←</span> n * n</div>
                  <div className="ml-4"><span className="text-indigo-600">Retourner</span> resultat</div>
                  <div><span className="text-indigo-600">FinAlgorithme</span></div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-2">
                Une fonction peut avoir des <strong>paramètres</strong> (ici <code className="bg-gray-100 px-2 py-1">n</code>)
                et doit spécifier son <strong>type de retour</strong> (ici <code className="bg-gray-100 px-2 py-1">Entier</code>).
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Elle peut déclarer ses propres <strong>variables locales</strong> et doit utiliser
                <code className="bg-gray-100 px-2 py-1 text-indigo-600 mx-1">Retourner</code> pour renvoyer une valeur.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Appel d'une fonction</h4>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-2">
                <div className="text-gray-700">
                  <div>y <span className="text-pink-600">←</span> Carre(5)</div>
                  <div>Ecrire("Résultat:", Carre(10), "\n")</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                Les fonctions peuvent être appelées dans des expressions ou des affectations.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Procédures</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-4">
                <div className="text-gray-700">
                  <div><span className="text-indigo-600 font-semibold">Procedure</span> Saluer(nom : Chaine, fois : Entier)</div>
                  <div><span className="text-indigo-600">Variables</span> i : Entier</div>
                  <div><span className="text-indigo-600">DebutAlgorithme</span></div>
                  <div className="ml-4"><span className="text-indigo-600">Pour</span> i <span className="text-indigo-600">De</span> 1 <span className="text-indigo-600">A</span> fois <span className="text-indigo-600">Faire</span></div>
                  <div className="ml-8">Ecrire("Bonjour ", nom, "!\n")</div>
                  <div className="ml-4"><span className="text-indigo-600">FinPour</span></div>
                  <div><span className="text-indigo-600">FinAlgorithme</span></div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Une procédure ne retourne pas de valeur. Elle s'utilise pour effectuer des actions (affichage, modifications, etc.).
              </p>

              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Appel d'une procédure</h4>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm mb-2">
                <div className="text-gray-700">
                  <div>Saluer("Alice", 3)</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                Les procédures sont appelées comme des instructions, pas dans des expressions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Exemple complet avec fonction</h3>
              <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm">
                <div className="text-gray-700">
                  <div><span className="text-indigo-600 font-semibold">Algorithme</span> TestFonction</div>
                  <div className="mt-2"><span className="text-indigo-600 font-semibold">Fonction</span> Maximum(a : Entier, b : Entier) : Entier</div>
                  <div><span className="text-indigo-600">DebutAlgorithme</span></div>
                  <div className="ml-4"><span className="text-indigo-600">Si</span> a &gt; b <span className="text-indigo-600">Alors</span></div>
                  <div className="ml-8"><span className="text-indigo-600">Retourner</span> a</div>
                  <div className="ml-4"><span className="text-indigo-600">Sinon</span></div>
                  <div className="ml-8"><span className="text-indigo-600">Retourner</span> b</div>
                  <div className="ml-4"><span className="text-indigo-600">FinSi</span></div>
                  <div><span className="text-indigo-600">FinAlgorithme</span></div>
                  <div className="mt-2"><span className="text-indigo-600">Variables</span></div>
                  <div className="ml-4">x, y, max : Entier</div>
                  <div className="mt-2"><span className="text-indigo-600">DebutAlgorithme</span></div>
                  <div className="ml-4">x <span className="text-pink-600">←</span> 15</div>
                  <div className="ml-4">y <span className="text-pink-600">←</span> 23</div>
                  <div className="ml-4">max <span className="text-pink-600">←</span> Maximum(x, y)</div>
                  <div className="ml-4">Ecrire("Le maximum est:", max, "\n")</div>
                  <div><span className="text-indigo-600">FinAlgorithme</span></div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-blue-900">
                <strong>Note :</strong> Les fonctions et procédures doivent être déclarées <strong>avant</strong> la section Variables de l'algorithme principal.
                Les variables déclarées dans une fonction/procédure sont <strong>locales</strong> et n'existent que pendant l'exécution de celle-ci.
              </p>
            </div>
          </section>

          {/* Opérateurs */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              12. Opérateurs
            </h2>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Opérateurs arithmétiques</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">+</div>
                  <div className="text-sm text-gray-600">Addition</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">-</div>
                  <div className="text-sm text-gray-600">Soustraction</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">*</div>
                  <div className="text-sm text-gray-600">Multiplication</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">/</div>
                  <div className="text-sm text-gray-600">Division</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">%</div>
                  <div className="text-sm text-gray-600">Modulo</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Opérateurs de comparaison</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">=</div>
                  <div className="text-sm text-gray-600">Égal</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">≠</div>
                  <div className="text-sm text-gray-600">Différent</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">&lt;</div>
                  <div className="text-sm text-gray-600">Inférieur</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">&gt;</div>
                  <div className="text-sm text-gray-600">Supérieur</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">≤</div>
                  <div className="text-sm text-gray-600">Inférieur/Égal</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-xl text-indigo-600">≥</div>
                  <div className="text-sm text-gray-600">Supérieur/Égal</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Opérateurs logiques</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-lg text-indigo-600">ET</div>
                  <div className="text-sm text-gray-600">Conjonction</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-lg text-indigo-600">OU</div>
                  <div className="text-sm text-gray-600">Disjonction</div>
                </div>
                <div className="border border-gray-200 p-3 text-center">
                  <div className="font-mono text-lg text-indigo-600">NON</div>
                  <div className="text-sm text-gray-600">Négation</div>
                </div>
              </div>
            </div>
          </section>

          {/* Mots-clés réservés */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              13. Mots-clés réservés
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <p className="text-gray-900 font-semibold mb-2">⚠️ Attention !</p>
              <p className="text-gray-700">
                Les mots suivants sont <strong>réservés par le langage</strong> et ne peuvent pas être utilisés comme noms de variables.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Structure */}
              <div className="bg-gray-50 border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Structure</h3>
                <div className="flex flex-wrap gap-2">
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Algorithme</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Variables</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Constantes</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">DebutAlgorithme</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">FinAlgorithme</code>
                </div>
              </div>

              {/* Conditions */}
              <div className="bg-gray-50 border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Conditions</h3>
                <div className="flex flex-wrap gap-2">
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Si</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Alors</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Sinon</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">FinSi</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Selon</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Cas</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Defaut</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">FinSelon</code>
                </div>
              </div>

              {/* Boucles */}
              <div className="bg-gray-50 border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Boucles</h3>
                <div className="flex flex-wrap gap-2">
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Pour</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">De</code>
                  <code className="bg-red-100 text-red-700 px-2 py-1 text-sm font-bold">A</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Faire</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">FinPour</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">TantQue</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">FinTantQue</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Repeter</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Jusqua</code>
                </div>
              </div>

              {/* Types */}
              <div className="bg-gray-50 border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Types de données</h3>
                <div className="flex flex-wrap gap-2">
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Entier</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Reel</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Caractere</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Chaine</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Booleen</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Tableau</code>
                </div>
              </div>

              {/* Fonctions */}
              <div className="bg-gray-50 border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Fonctions/Procédures</h3>
                <div className="flex flex-wrap gap-2">
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Fonction</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Procedure</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Retourner</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Type</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Enregistrement</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">FinEnregistrement</code>
                </div>
              </div>

              {/* Opérateurs et I/O */}
              <div className="bg-gray-50 border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Opérateurs & Entrées/Sorties</h3>
                <div className="flex flex-wrap gap-2">
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Et</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Ou</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Non</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Lire</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Ecrire</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Vrai</code>
                  <code className="bg-indigo-100 text-indigo-700 px-2 py-1 text-sm">Faux</code>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-gray-900 font-semibold mb-2">⚠️ Cas particulier : le mot "À"</p>
              <p className="text-gray-700 mb-2">
                Seul le mot <code className="bg-red-100 text-red-700 px-2 py-1 font-bold">À</code> (avec accent)
                est réservé car utilisé dans les boucles <code className="bg-gray-100 px-2 py-1">Pour</code>.
                Le mot <code className="bg-green-100 text-green-700 px-2 py-1">a</code> (sans accent) peut être utilisé comme nom de variable.
              </p>
              <div className="bg-white border border-red-200 p-3 font-mono text-sm text-gray-700">
                <span className="text-indigo-600">Pour</span> i <span className="text-indigo-600">De</span> 1 <span className="text-red-600 font-bold">À</span> 10 <span className="text-indigo-600">Faire</span>
              </div>
              <p className="text-gray-700 mt-3">
                <strong>Exemples valides :</strong> <code className="bg-green-100 text-green-700 px-2 py-1">a</code>,
                <code className="bg-green-100 text-green-700 px-2 py-1 ml-1">a1</code>,
                <code className="bg-green-100 text-green-700 px-2 py-1 ml-1">valA</code>,
                <code className="bg-green-100 text-green-700 px-2 py-1 ml-1">x</code>,
                <code className="bg-green-100 text-green-700 px-2 py-1 ml-1">n</code>, etc.
              </p>
            </div>
          </section>

          {/* Exemple complet */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              14. Exemple complet
            </h2>
            <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm">
              <div className="text-gray-700">
                <div><span className="text-indigo-600 font-semibold">Algorithme</span> CalculMoyenne</div>
                <div><span className="text-indigo-600 font-semibold">Variables</span></div>
                <div className="ml-4">note1, note2, note3, moyenne : Reel</div>
                <div className="mt-2"><span className="text-indigo-600 font-semibold">DebutAlgorithme</span></div>
                <div className="ml-4">Ecrire("Entrez la première note:\n")</div>
                <div className="ml-4">Lire(note1)</div>
                <div className="ml-4">Ecrire("Entrez la deuxième note:\n")</div>
                <div className="ml-4">Lire(note2)</div>
                <div className="ml-4">Ecrire("Entrez la troisième note:\n")</div>
                <div className="ml-4">Lire(note3)</div>
                <div className="ml-4 mt-2">moyenne <span className="text-pink-600">←</span> (note1 + note2 + note3) / 3</div>
                <div className="ml-4 mt-2">Ecrire("La moyenne est: ", moyenne, "\n")</div>
                <div className="ml-4 mt-2"><span className="text-indigo-600">Si</span> moyenne &gt;= 10 <span className="text-indigo-600">Alors</span></div>
                <div className="ml-8">Ecrire("Admis\n")</div>
                <div className="ml-4"><span className="text-indigo-600">Sinon</span></div>
                <div className="ml-8">Ecrire("Recalé\n")</div>
                <div className="ml-4"><span className="text-indigo-600">FinSi</span></div>
                <div><span className="text-indigo-600 font-semibold">FinAlgorithme</span></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Guide;
