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
                <div className="mt-2"><span className="text-indigo-600 font-semibold">Debut</span></div>
                <div className="ml-4 text-gray-500">// Instructions ici</div>
                <div><span className="text-indigo-600 font-semibold">Fin</span></div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Tout algorithme commence par le mot-clé <code className="bg-gray-100 px-2 py-1 text-indigo-600">Algorithme</code> suivi du nom.
              Les variables sont déclarées dans la section <code className="bg-gray-100 px-2 py-1 text-indigo-600">Variables</code>.
              Le corps de l'algorithme se trouve entre <code className="bg-gray-100 px-2 py-1 text-indigo-600">Debut</code> et <code className="bg-gray-100 px-2 py-1 text-indigo-600">Fin</code>.
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

          {/* Entrées/Sorties */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              4. Entrées et sorties
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Lire()</h3>
                <div className="bg-gray-50 border border-gray-200 p-4 font-mono text-sm mb-2">
                  Lire(variable)
                </div>
                <p className="text-gray-700">Permet de saisir une valeur depuis l'entrée standard.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Ecrire()</h3>
                <div className="bg-gray-50 border border-gray-200 p-4 font-mono text-sm mb-2">
                  Ecrire("Message", variable)
                </div>
                <p className="text-gray-700">Affiche du texte et/ou des variables à l'écran.</p>
              </div>
            </div>
          </section>

          {/* Structures conditionnelles */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              5. Structures conditionnelles
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
              6. Boucles
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

          {/* Tableaux */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              7. Tableaux
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
                  <div className="mt-2"><span className="text-indigo-600">Debut</span></div>
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
                  <div><span className="text-indigo-600">Fin</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* Opérateurs */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              8. Opérateurs
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

          {/* Exemple complet */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              9. Exemple complet
            </h2>
            <div className="bg-gray-50 border border-gray-200 p-6 font-mono text-sm">
              <div className="text-gray-700">
                <div><span className="text-indigo-600 font-semibold">Algorithme</span> CalculMoyenne</div>
                <div><span className="text-indigo-600 font-semibold">Variables</span></div>
                <div className="ml-4">note1, note2, note3, moyenne : Reel</div>
                <div className="mt-2"><span className="text-indigo-600 font-semibold">Debut</span></div>
                <div className="ml-4">Ecrire("Entrez la première note:")</div>
                <div className="ml-4">Lire(note1)</div>
                <div className="ml-4">Ecrire("Entrez la deuxième note:")</div>
                <div className="ml-4">Lire(note2)</div>
                <div className="ml-4">Ecrire("Entrez la troisième note:")</div>
                <div className="ml-4">Lire(note3)</div>
                <div className="ml-4 mt-2">moyenne <span className="text-pink-600">←</span> (note1 + note2 + note3) / 3</div>
                <div className="ml-4 mt-2">Ecrire("La moyenne est:", moyenne)</div>
                <div className="ml-4 mt-2"><span className="text-indigo-600">Si</span> moyenne &gt;= 10 <span className="text-indigo-600">Alors</span></div>
                <div className="ml-8">Ecrire("Admis")</div>
                <div className="ml-4"><span className="text-indigo-600">Sinon</span></div>
                <div className="ml-8">Ecrire("Recalé")</div>
                <div className="ml-4"><span className="text-indigo-600">FinSi</span></div>
                <div><span className="text-indigo-600 font-semibold">Fin</span></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Guide;
