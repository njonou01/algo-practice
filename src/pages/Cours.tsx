import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Play, CheckCircle2, GraduationCap, ArrowRight, Code } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { chapters, lessons } from './cours/data/courseData';

function Cours() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const isDarkTheme = settings.theme === 'dark';
  
  // Gestion de l'état : leçon active ou null (dashboard)
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Effet pour remonter en haut de page lors du changement de leçon
  useEffect(() => {
    const mainContent = document.getElementById('course-content');
    if (mainContent) mainContent.scrollTop = 0;
  }, [activeLessonId]);

  const handleTryExample = (example: { code: string; input: string[] }) => {
    localStorage.setItem('loadedExample', JSON.stringify({ code: example.code, input: example.input }));
    navigate('/');
  };

  const currentLesson = activeLessonId ? lessons[activeLessonId] : null;

  // Trouver la leçon précédente et suivante pour la navigation
  const allLessonIds = chapters.flatMap(c => c.lessons);
  const currentIndex = activeLessonId ? allLessonIds.indexOf(activeLessonId) : -1;
  const prevLessonId = currentIndex > 0 ? allLessonIds[currentIndex - 1] : null;
  const nextLessonId = currentIndex >= 0 && currentIndex < allLessonIds.length - 1 ? allLessonIds[currentIndex + 1] : null;

  // --- VUE LEÇON ---
  if (activeLessonId && currentLesson) {
    return (
      <div className={`h-full flex flex-col ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Barre de navigation supérieure */}
        <div className={`flex-shrink-0 h-16 border-b flex items-center px-6 justify-between ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <button 
            onClick={() => setActiveLessonId(null)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ArrowLeft size={18} />
            Retour au sommaire
          </button>
          
          <div className={`text-sm font-semibold ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>
            {currentLesson.title}
          </div>

          <div className="w-24"></div> {/* Spacer pour centrer le titre */}
        </div>

        {/* Contenu de la leçon */}
        <div id="course-content" className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-12">
            <div className="mb-8">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${isDarkTheme ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}>
                {chapters.find(c => c.lessons.includes(activeLessonId))?.title.split(':')[0]}
              </span>
              <h1 className={`text-3xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{currentLesson.title}</h1>
              <p className={`text-lg leading-relaxed ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>{currentLesson.description}</p>
            </div>

            <div className="space-y-12">
              {currentLesson.content}
            </div>

            {/* Zone Exemple Interactif */}
            {currentLesson.example && (
              <div className={`mt-12 p-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500`}>
                <div className={`p-6 rounded-lg ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                      <Code size={20} className="text-indigo-500" />
                      À vous de jouer !
                    </h3>
                    <button
                      onClick={() => handleTryExample(currentLesson.example!)}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-indigo-500/30"
                    >
                      <Play size={16} fill="currentColor" />
                      Lancer dans l'éditeur
                    </button>
                  </div>
                  <div className={`p-4 rounded-lg font-mono text-sm overflow-x-auto border ${isDarkTheme ? 'bg-[#1e1e1e] border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                    <pre>{currentLesson.example.code}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation bas de page */}
            <div className="mt-16 flex items-center justify-between border-t pt-8 border-gray-200 dark:border-gray-700">
              {prevLessonId ? (
                <button
                  onClick={() => setActiveLessonId(prevLessonId)}
                  className={`flex flex-col items-start gap-1 group ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Leçon précédente</span>
                  <span className="flex items-center gap-2 text-lg font-medium">
                    <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                    {lessons[prevLessonId].title.split(' - ')[1]}
                  </span>
                </button>
              ) : (
                <div></div>
              )}

              {nextLessonId ? (
                <button
                  onClick={() => setActiveLessonId(nextLessonId)}
                  className={`flex flex-col items-end gap-1 group ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Leçon suivante</span>
                  <span className="flex items-center gap-2 text-lg font-medium">
                    {lessons[nextLessonId].title.split(' - ')[1]}
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveLessonId(null)}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <CheckCircle2 size={20} />
                  Terminer le cours
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VUE DASHBOARD (SOMMAIRE) ---
  return (
    <div className={`flex-1 overflow-y-auto ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className={`inline-flex p-4 rounded-2xl mb-6 shadow-lg ${isDarkTheme ? 'bg-gray-800 shadow-indigo-900/20' : 'bg-white shadow-indigo-100'}`}>
            <GraduationCap size={48} className="text-indigo-500" strokeWidth={1.5} />
          </div>
          <h1 className={`text-4xl font-extrabold mb-4 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Parcours d'apprentissage
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            Maîtrisez l'algorithmique étape par étape. Choisissez un module pour commencer ou reprendre votre progression.
          </p>
        </div>

        <div className="grid gap-8">
          {chapters.map((chapter) => (
            <div 
              key={chapter.id} 
              className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${isDarkTheme ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-indigo-100'}`}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <chapter.Icon size={32} className={chapter.color} />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{chapter.title}</h2>
                      <p className={`mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{chapter.lessons.length} leçons</p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chapter.lessons.map((lessonId, index) => {
                    const lesson = lessons[lessonId];
                    return (
                      <button
                        key={lessonId}
                        onClick={() => setActiveLessonId(lessonId)}
                        className={`group text-left p-4 rounded-xl border transition-all ${isDarkTheme ? 'border-gray-700 hover:bg-gray-700 hover:border-gray-600' : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-indigo-200 hover:shadow-md'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-bold uppercase tracking-wider ${chapter.color.replace('text-', 'text-').replace('500', '600')}`}>
                            Leçon {index + 1}
                          </span>
                          <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDarkTheme ? 'text-gray-400' : 'text-gray-400'}`} />
                        </div>
                        <h3 className={`font-semibold line-clamp-2 ${isDarkTheme ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-indigo-700'}`}>
                          {lesson.title.split(' - ')[1]}
                        </h3>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cours;