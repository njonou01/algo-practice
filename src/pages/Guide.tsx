import { useSettings } from '../contexts/SettingsContext';
import { Book, FileText, List, Code, Database, FunctionSquare, Calendar, Hash, ChevronRight } from 'lucide-react';

function Guide() {
  const { settings } = useSettings();
  const isDarkTheme = settings.theme === 'dark';

  // Styles communs
  const sectionClasses = "mb-16 scroll-mt-20";
  const headingClasses = `text-2xl font-bold mb-6 flex items-center gap-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`;
  const subHeadingClasses = `text-lg font-semibold mb-3 mt-8 ${isDarkTheme ? 'text-indigo-300' : 'text-indigo-700'}`;
  const paragraphClasses = `leading-relaxed mb-4 text-base ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`;
  
  // Styles Code & Tableaux
  const codeBlockClasses = `p-5 rounded-xl font-mono text-sm mb-6 overflow-x-auto border shadow-sm ${isDarkTheme ? 'bg-[#1e1e1e] border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-800'}`;
  const inlineCodeClasses = `px-1.5 py-0.5 rounded-md text-sm font-mono font-medium ${isDarkTheme ? 'bg-gray-800 text-indigo-300 border border-gray-700' : 'bg-gray-100 text-indigo-700 border border-gray-200'}`;
  const tableClasses = `w-full border-collapse mb-6 text-sm rounded-lg overflow-hidden border ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`;
  const thClasses = `py-3 px-4 text-left font-semibold ${isDarkTheme ? 'bg-gray-800 text-gray-200 border-b border-gray-700' : 'bg-gray-100 text-gray-700 border-b border-gray-200'}`;
  const tdClasses = `py-3 px-4 border-b last:border-0 ${isDarkTheme ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'}`;

  // Composants utilitaires pour la coloration syntaxique
  const K = ({ children }: { children: string }) => <span className={isDarkTheme ? 'text-purple-400' : 'text-purple-700'}>{children}</span>; // Keyword
  const T = ({ children }: { children: string }) => <span className={isDarkTheme ? 'text-yellow-400' : 'text-yellow-700'}>{children}</span>; // Type
  const S = ({ children }: { children: string }) => <span className={isDarkTheme ? 'text-green-400' : 'text-green-700'}>{children}</span>; // String
  const C = ({ children }: { children: string }) => <span className={isDarkTheme ? 'text-gray-500 italic' : 'text-gray-500 italic'}>// {children}</span>; // Comment
  const F = ({ children }: { children: string }) => <span className={isDarkTheme ? 'text-blue-400' : 'text-blue-600'}>{children}</span>; // Function
  const V = ({ children }: { children: string }) => <span className={isDarkTheme ? 'text-red-300' : 'text-red-600'}>{children}</span>; // Variable/Value

  return (
    <div className={`flex-1 overflow-auto ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-6 py-16"> 
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className={`inline-flex p-4 rounded-2xl mb-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-indigo-50'}`}>
            <Book size={40} className={isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'} strokeWidth={1.5} />
          </div>
          <h1 className={`text-4xl font-extrabold mb-4 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Documentation AlgoGénie
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
            Le guide complet pour maîtriser la syntaxe, les structures de données et les algorithmes.
          </p>
        </div>

        {/* 1. Structure */}
        <section id="structure" className={sectionClasses}>
          <h2 className={headingClasses}>
            <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-indigo-100'}`}>
              <FileText size={20} className="text-indigo-500" />
            </div>
            Structure d'un algorithme
          </h2>
          <p className={paragraphClasses}>
            Tout algorithme commence par le mot-clé <code className={inlineCodeClasses}>Algorithme</code> suivi de son nom. 
            Les variables sont déclarées dans la section <code className={inlineCodeClasses}>Variables</code>, et le corps de l'algorithme est délimité par <code className={inlineCodeClasses}>Debut</code> et <code className={inlineCodeClasses}>Fin</code>.
          </p>
          
          <div className={codeBlockClasses}>
            <div><K>Algorithme</K> <F>MonPremierAlgo</F></div>
            <div className="mt-2"><K>Variables</K></div>
            <div className="pl-4">nom : <T>Chaine</T></div>
            <div className="pl-4">age : <T>Entier</T></div>
            <div className="mt-2"><K>Debut</K></div>
            <div className="pl-4"><C>Votre code commence ici</C></div>
            <div className="pl-4"><F>Ecrire</F>(<S>"Bonjour"</S>)</div>
            <div><K>Fin</K></div>
          </div>
        </section>

        {/* 2. Types de données */}
        <section id="types" className={sectionClasses}>
          <h2 className={headingClasses}>
            <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-indigo-100'}`}>
              <Database size={20} className="text-indigo-500" />
            </div>
            Types de données
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <table className={tableClasses + " mb-0 border-0"}>
              <thead>
                <tr>
                  <th className={thClasses}>Type</th>
                  <th className={thClasses}>Description</th>
                  <th className={thClasses}>Exemple</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tdClasses}><code className={inlineCodeClasses}>Entier</code></td>
                  <td className={tdClasses}>Nombres sans virgule</td>
                  <td className={tdClasses}><V>42</V>, <V>-10</V>, <V>0</V></td>
                </tr>
                <tr>
                  <td className={tdClasses}><code className={inlineCodeClasses}>Reel</code></td>
                  <td className={tdClasses}>Nombres à virgule</td>
                  <td className={tdClasses}><V>3.14</V>, <V>-2.5</V></td>
                </tr>
                <tr>
                  <td className={tdClasses}><code className={inlineCodeClasses}>Chaine</code></td>
                  <td className={tdClasses}>Texte (entre guillemets)</td>
                  <td className={tdClasses}><S>"Bonjour"</S></td>
                </tr>
                <tr>
                  <td className={tdClasses}><code className={inlineCodeClasses}>Booleen</code></td>
                  <td className={tdClasses}>Valeur logique</td>
                  <td className={tdClasses}><K>Vrai</K>, <K>Faux</K></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Affectation */}
        <section id="affectation" className={sectionClasses}>
          <h2 className={headingClasses}>
            <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-indigo-100'}`}>
              <Code size={20} className="text-indigo-500" />
            </div>
            Affectation
          </h2>
          <p className={paragraphClasses}>
            L'opérateur d'affectation est la flèche <code className={inlineCodeClasses}>←</code>. 
            Dans l'éditeur, vous pouvez simplement taper <code className={inlineCodeClasses}>&lt;-</code> pour la générer.
          </p>
          <div className={codeBlockClasses}>
            <div>score <span className="text-gray-400">←</span> <V>100</V></div>
            <div>joueur <span className="text-gray-400">←</span> <S>"Alice"</S></div>
            <div>gameOver <span className="text-gray-400">←</span> <K>Faux</K></div>
          </div>
        </section>

        {/* 4. Constantes */}
        <section id="constantes" className={sectionClasses}>
          <h2 className={headingClasses}>
            <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-indigo-100'}`}>
              <Hash size={20} className="text-indigo-500" />
            </div>
            Constantes
          </h2>
          <p className={paragraphClasses}>
            Les constantes sont des valeurs qui ne changent jamais. Elles sont déclarées dans la section <code className={inlineCodeClasses}>Constantes</code>.
            Le type est déduit automatiquement.
          </p>
          <div className={codeBlockClasses}>
            <div><K>Constantes</K></div>
            <div className="pl-4">PI <span className="text-gray-400">←</span> <V>3.14159</V></div>
            <div className="pl-4">MAX_VIES <span className="text-gray-400">←</span> <V>3</V></div>
          </div>
        </section>

        {/* 5. Entrées / Sorties */}
        <section id="io" className={sectionClasses}>
          <h2 className={headingClasses}>
            <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-indigo-100'}`}>
              <List size={20} className="text-indigo-500" />
            </div>
            Entrées et Sorties
          </h2>
          
          <h3 className={subHeadingClasses}>Afficher (Ecrire)</h3>
          <p className={paragraphClasses}>Affiche du texte ou le contenu de variables à l'écran. Utilisez <code className={inlineCodeClasses}>
</code> pour sauter une ligne.</p>
          <div className={codeBlockClasses}>
            <div><F>Ecrire</F>(<S>"Le score est : "</S>, score, <S>"\n"</S>)</div>
          </div>

          <h3 className={subHeadingClasses}>Saisir (Lire)</h3>
          <p className={paragraphClasses}>Met en pause le programme pour permettre à l'utilisateur d'entrer une valeur.</p>
          <div className={codeBlockClasses}>
            <div><F>Ecrire</F>(<S>"Entrez votre nom :"</S>)</div>
            <div><F>Lire</F>(nom)</div>
          </div>
        </section>

        {/* 6. Conditions */}
        <section id="conditions" className={sectionClasses}>
          <h2 className={headingClasses}>
            <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-indigo-100'}`}>
              <FunctionSquare size={20} className="text-indigo-500" />
            </div>
            Conditions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className={subHeadingClasses}>Si ... Sinon</h3>
              <div className={codeBlockClasses}>
                <div><K>Si</K> age &gt;= <V>18</V> <K>Alors</K></div>
                <div className="pl-4"><F>Ecrire</F>(<S>"Majeur"</S>)</div>
                <div><K>Sinon</K></div>
                <div className="pl-4"><F>Ecrire</F>(<S>"Mineur"</S>)</div>
                <div><K>FinSi</K></div>
              </div>
            </div>
            
            <div>
              <h3 className={subHeadingClasses}>Selon ... Cas</h3>
              <div className={codeBlockClasses}>
                <div><K>Selon</K> jour</div>
                <div className="pl-4"><K>Cas</K> <V>6</V>, <V>7</V>:</div>
                <div className="pl-8"><F>Ecrire</F>(<S>"Week-end"</S>)</div>
                <div className="pl-4"><K>Defaut</K>:</div>
                <div className="pl-8"><F>Ecrire</F>(<S>"Travail"</S>)</div>
                <div><K>FinSelon</K></div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Boucles */}
        <section id="boucles" className={sectionClasses}>
          <h2 className={headingClasses}>
            <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-indigo-100'}`}>
              <FunctionSquare size={20} className="text-indigo-500" />
            </div>
            Boucles
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className={subHeadingClasses}>Pour (Nombre d'itérations connu)</h3>
              <div className={codeBlockClasses}>
                <div><K>Pour</K> i <K>De</K> <V>1</V> <K>A</K> <V>10</V> <K>Faire</K></div>
                <div className="pl-4"><F>Ecrire</F>(<S>"Tour n°"</S>, i)</div>
                <div><K>FinPour</K></div>
              </div>
            </div>

            <div>
              <h3 className={subHeadingClasses}>TantQue (Conditionnelle)</h3>
              <div className={codeBlockClasses}>
                <div><K>TantQue</K> vie &gt; <V>0</V> <K>Faire</K></div>
                <div className="pl-4"><F>JouerTour</F>()</div>
                <div className="pl-4">vie <span className="text-gray-400">←</span> vie - <V>1</V></div>
                <div><K>FinTantQue</K></div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Fonctions Natives */}
        <section id="fonctions" className={sectionClasses}>
          <h2 className={headingClasses}>
            <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-indigo-100'}`}>
              <Calendar size={20} className="text-indigo-500" />
            </div>
            Fonctions Utiles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={subHeadingClasses}>Mathématiques</h3>
              <ul className={`space-y-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start gap-2">
                  <ChevronRight size={16} className="mt-1 text-indigo-500" />
                  <div><code className={inlineCodeClasses}>Racine(x)</code> : Racine carrée</div>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight size={16} className="mt-1 text-indigo-500" />
                  <div><code className={inlineCodeClasses}>Puissance(x, n)</code> : x puissance n</div>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight size={16} className="mt-1 text-indigo-500" />
                  <div><code className={inlineCodeClasses}>Aleatoire(min, max)</code> : Entier au hasard</div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={subHeadingClasses}>Date et Heure</h3>
              <ul className={`space-y-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start gap-2">
                  <ChevronRight size={16} className="mt-1 text-indigo-500" />
                  <div><code className={inlineCodeClasses}>DateActuelle()</code> : Retourne la date</div>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight size={16} className="mt-1 text-indigo-500" />
                  <div><code className={inlineCodeClasses}>HeureActuelle()</code> : Retourne l'heure</div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className={`mt-20 pt-10 border-t text-center ${isDarkTheme ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
          <p>AlgoGénie © 2025 - Documentation Officielle</p>
        </div>

      </div>
    </div>
  );
}

export default Guide;