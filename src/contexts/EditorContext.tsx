import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Store } from '@tauri-apps/plugin-store';

interface EditorContextType {
  code: string;
  setCode: (code: string) => void;
  isMonacoReady: boolean;
  setMonacoReady: (ready: boolean) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const defaultCode = `Algorithme DemonstrationCompleteAlgoGenie
// Démonstration de toutes les fonctionnalités d'AlgoGénie

Enregistrement Joueur
  nom : Chaine
  score : Entier
  niveau : Reel
 FinEnregistrement

Fonction CalculerExperience(score : Entier) : Reel
DebutFonction
  Retourner Log(score + 1) * 100
 FinFonction

Procedure AfficherJoueur(j : Joueur)
DebutProcedure
  Ecrire("Joueur: ", j.nom, " - Score: ", j.score, " - Niveau: ", j.niveau, "\n")
 FinProcedure

Constantes
  PI <- 3.14159
  VERSION <- "1.0"
  MAX_JOUEURS <- 5

Variables
  joueur : Joueur
  nom : Chaine
  resultatDe, score, i, choix, styleJeu : Entier
  angle, experience : Reel
  chars : Tableau[100] de Caractere
  date, jour : Chaine
  continuer : Booleen

DebutAlgorithme
  Ecrire("========================================\n")
  Ecrire("  Bienvenue dans AlgoGénie v", VERSION, "\n")
  Ecrire("========================================\n\n")

  // 1. Fonctions Date/Temps natives
  date <- DateActuelle()
  jour <- JourSemaine()
  Ecrire("Nous sommes ", jour, ", le ", date, "\n")
  Ecrire("Heure: ", HeureActuelle(), "\n\n")

  // 2. Entrée utilisateur + Conversion
  Ecrire("Quel est votre nom ?\n")
  Lire(nom)
  joueur.nom <- nom

  // 3. Fonction aléatoire
  Ecrire("\nLancer de dé pour le score initial...\n")
  resultatDe <- Aleatoire(1, 6)
  score <- resultatDe * 10
  joueur.score <- score
  Ecrire("Résultat: ", resultatDe, " -> Score de départ: ", score, "\n")

  // 4. Fonctions mathématiques natives
  Ecrire("\nCalculs mathématiques:\n")
  angle <- PI / 4
  Ecrire("• Sin(PI/4) = ", Sin(angle), "\n")
  Ecrire("• Racine(score) = ", Racine(score), "\n")
  Ecrire("• Puissance(2, 5) = ", Puissance(2, 5), "\n")

  experience <- CalculerExperience(score)
  joueur.niveau <- experience / 100
  Ecrire("• Expérience (Log) = ", experience, "\n")

  // 5. Structure conditionnelle
  Ecrire("\nÉvaluation du niveau:\n")
  Si joueur.niveau < 1.5 Alors
    Ecrire("-> Débutant\n")
  Sinon
    Si joueur.niveau < 2.5 Alors
      Ecrire("-> Intermédiaire\n")
    Sinon
      Ecrire("-> Expert\n")
    FinSi
  FinSi

  // 6. Boucle Pour + Tableau
  Ecrire("\nGénération de bonus aléatoires:\n")
  Pour i De 1 À 3 Faire
    resultatDe <- Aleatoire(5, 15)
    joueur.score <- joueur.score + resultatDe
    Ecrire("  Bonus ", i, ": +", resultatDe, " points\n")
  FinPour
  Ecrire("Score final: ", joueur.score, "\n")

  // 7. Manipulation de chaînes - Conversion en tableau de caractères
  Ecrire("\nManipulation du nom:\n")
  chars <- EnTableauCaracteres(joueur.nom)
  Ecrire("Nom converti en tableau de caractères\n")

  // 8. Boucle TantQue
  Ecrire("\nMini-jeu: Devinez le nombre (1-10)\n")
  resultatDe <- Aleatoire(1, 10)
  continuer <- Vrai
  i <- 0

  TantQue continuer ET i < 3 Faire
    Ecrire("Tentative ", i + 1, "/3 - Votre choix:\n")
    Lire(choix)

    Si choix = resultatDe Alors
      Ecrire("Bravo! Vous avez trouvé!\n")
      joueur.score <- joueur.score + 50
      continuer <- Faux
    Sinon
      Si choix < resultatDe Alors
        Ecrire("Plus grand!\n")
      Sinon
        Ecrire("Plus petit!\n")
      FinSi
      i <- i + 1
    FinSi
  FinTantQue

  Si continuer Alors
    Ecrire("Perdu! C'était: ", resultatDe, "\n")
  FinSi

  // 9. Appel de procédure + Structure
  Ecrire("\nRécapitulatif final:\n")
  AfficherJoueur(joueur)

  // 10. Switch/Selon
  Ecrire("\nStyle de jeu:\n")
  styleJeu <- (joueur.score / 10) MOD 3
  Selon styleJeu
    Cas 0 :
      Ecrire("-> Stratégique\n")
    Cas 1 :
      Ecrire("-> Agressif\n")
    Cas 2 :
      Ecrire("-> Défensif\n")
  FinSelon

  Ecrire("\nMerci d'avoir testé AlgoGénie!\n")
  Ecrire("Essayez le bouton Formater pour un code propre!\n")
 FinAlgorithme
`;

export function EditorProvider({ children }: { children: ReactNode }) {
  // Code de l'éditeur (persisté entre les navigations et les sessions)
  const [code, setCodeState] = useState(defaultCode);
  const [store, setStore] = useState<Store | null>(null);

  // Monaco est prêt (une seule fois dans toute la session)
  const [isMonacoReady, setMonacoReady] = useState(false);

  // Initialiser le store et charger le code sauvegardé
  useEffect(() => {
    async function initStore() {
      try {
        const storeInstance = await Store.load('settings.json');
        setStore(storeInstance);

        // Charger le code depuis le store
        const savedCode = await storeInstance.get('editorCode');
        if (savedCode && typeof savedCode === 'string') {
          setCodeState(savedCode);
        }
      } catch (e) {
        console.error('Erreur lors du chargement du code:', e);
      }
    }

    initStore();
  }, []);

  // Fonction pour mettre à jour le code avec sauvegarde automatique
  const setCode = async (newCode: string) => {
    setCodeState(newCode);

    if (store) {
      try {
        await store.set('editorCode', newCode);
        await store.save();
      } catch (e) {
        console.error('Erreur lors de la sauvegarde du code:', e);
      }
    }
  };

  return (
    <EditorContext.Provider value={{ code, setCode, isMonacoReady, setMonacoReady }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
