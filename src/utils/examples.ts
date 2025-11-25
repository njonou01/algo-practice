/**
 * Bibliothèque d'exemples d'algorithmes
 *
 * Collection d'algorithmes d'exemple organisés par niveau de difficulté
 */

export interface AlgorithmExample {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  code: string;
  input: string[];
  category: string;
}

export const examples: AlgorithmExample[] = [
  // ========== DÉBUTANT ==========
  {
    id: 'hello',
    name: 'Bonjour',
    description: 'Premier algorithme - Lecture et affichage',
    difficulty: 'beginner',
    category: 'Entrées/Sorties',
    code: `Algorithme Bonjour
Variables nom : Chaine

DebutAlgorithme
  Ecrire("Comment vous appelez-vous?\\n")
  Lire(nom)
  Ecrire("Bonjour ", nom, "!\\n")
FinAlgorithme`,
    input: ['Alice']
  },
  {
    id: 'double',
    name: 'Double d\'un nombre',
    description: 'Calcul simple avec multiplication',
    difficulty: 'beginner',
    category: 'Calculs',
    code: `Algorithme Double
Variables x, y : Entier

DebutAlgorithme
  Ecrire("Entrez un nombre:\\n")
  Lire(x)
  y <- x * 2
  Ecrire("Le double de ", x, " est ", y, "\\n")
FinAlgorithme`,
    input: ['15']
  },
  {
    id: 'max-two',
    name: 'Maximum de deux nombres',
    description: 'Condition Si/Alors/Sinon simple',
    difficulty: 'beginner',
    category: 'Conditions',
    code: `Algorithme Maximum
Variables num1, num2 : Entier

DebutAlgorithme
  Ecrire("Premier nombre:\\n")
  Lire(num1)
  Ecrire("Deuxième nombre:\\n")
  Lire(num2)

  Si num1 > num2 Alors
    Ecrire("Le maximum est: ", num1, "\\n")
  Sinon
    Ecrire("Le maximum est: ", num2, "\\n")
  FinSi
FinAlgorithme`,
    input: ['15', '23']
  },
  {
    id: 'sum',
    name: 'Somme de deux nombres',
    description: 'Addition simple avec deux variables',
    difficulty: 'beginner',
    category: 'Calculs',
    code: `Algorithme Somme
Variables num1, num2, resultat : Entier

DebutAlgorithme
  Ecrire("Premier nombre:\\n")
  Lire(num1)
  Ecrire("Deuxième nombre:\\n")
  Lire(num2)
  resultat <- num1 + num2
  Ecrire(num1, " + ", num2, " = ", resultat, "\\n")
FinAlgorithme`,
    input: ['10', '25']
  },

  // ========== INTERMÉDIAIRE ==========
  {
    id: 'factorial',
    name: 'Factorielle',
    description: 'Boucle Pour avec multiplication',
    difficulty: 'intermediate',
    category: 'Boucles',
    code: `Algorithme Factorielle
Variables n, i, fact : Entier

DebutAlgorithme
  Ecrire("Entrez un nombre:\\n")
  Lire(n)
  fact <- 1
  Pour i De 1 À n Faire
    fact <- fact * i
  FinPour
  Ecrire("Factorielle de ", n, " = ", fact, "\\n")
FinAlgorithme`,
    input: ['5']
  },
  {
    id: 'fibonacci',
    name: 'Suite de Fibonacci',
    description: 'Boucle avec séquence mathématique',
    difficulty: 'intermediate',
    category: 'Boucles',
    code: `Algorithme Fibonacci
Variables n, i, fib1, fib2, temp : Entier

DebutAlgorithme
  Ecrire("Combien de termes?\\n")
  Lire(n)
  fib1 <- 0
  fib2 <- 1
  Ecrire("Suite de Fibonacci:\\n")
  Ecrire(fib1, "\\n")
  Ecrire(fib2, "\\n")
  Pour i De 3 À n Faire
    temp <- fib1 + fib2
    Ecrire(temp, "\\n")
    fib1 <- fib2
    fib2 <- temp
  FinPour
FinAlgorithme`,
    input: ['8']
  },
  {
    id: 'prime',
    name: 'Nombre premier',
    description: 'Test de primalité avec boucles imbriquées',
    difficulty: 'intermediate',
    category: 'Algorithmes',
    code: `Algorithme NombrePremier
Variables n, i, estPremier : Entier

DebutAlgorithme
  Ecrire("Entrez un nombre:\\n")
  Lire(n)
  estPremier <- 1

  Si n < 2 Alors
    estPremier <- 0
  Sinon
    Pour i De 2 À n - 1 Faire
      Si n % i = 0 Alors
        estPremier <- 0
      FinSi
    FinPour
  FinSi

  Si estPremier = 1 Alors
    Ecrire(n, " est premier\\n")
  Sinon
    Ecrire(n, " n'est pas premier\\n")
  FinSi
FinAlgorithme`,
    input: ['17']
  },
  {
    id: 'array-avg',
    name: 'Moyenne d\'un tableau',
    description: 'Parcours et calcul sur tableau 1D',
    difficulty: 'intermediate',
    category: 'Tableaux',
    code: `Algorithme MoyenneNotes
Variables
  notes : Tableau[5] de Reel
  i : Entier
  somme, moyenne : Reel

DebutAlgorithme
  Ecrire("Entrez 5 notes:\\n")

  Pour i De 0 À 4 Faire
    Lire(notes[i])
  FinPour

  somme <- 0
  Pour i De 0 À 4 Faire
    somme <- somme + notes[i]
  FinPour

  moyenne <- somme / 5
  Ecrire("Moyenne: ", moyenne, "\\n")
FinAlgorithme`,
    input: ['15', '12', '18', '14', '16']
  },
  {
    id: 'match-day',
    name: 'Jour de la semaine',
    description: 'Structure Selon/Cas avec multiples valeurs',
    difficulty: 'intermediate',
    category: 'Conditions',
    code: `Algorithme JourSemaine
Variables jour : Entier

DebutAlgorithme
  Ecrire("Entrez un numéro (1-7):\\n")
  Lire(jour)

  Selon jour
    Cas 1:
      Ecrire("Lundi\\n")
    Cas 2:
      Ecrire("Mardi\\n")
    Cas 3:
      Ecrire("Mercredi\\n")
    Cas 4:
      Ecrire("Jeudi\\n")
    Cas 5:
      Ecrire("Vendredi\\n")
    Cas 6, 7:
      Ecrire("Week-end!\\n")
    Defaut:
      Ecrire("Jour invalide\\n")
  FinSelon
FinAlgorithme`,
    input: ['3']
  },

  // ========== AVANCÉ ==========
  {
    id: 'matrix',
    name: 'Matrice 2D',
    description: 'Tableau à 2 dimensions avec boucles imbriquées',
    difficulty: 'advanced',
    category: 'Tableaux',
    code: `Algorithme Matrice
Variables
  matrice : Tableau[3, 3] de Entier
  i, j, somme : Entier

DebutAlgorithme
  Ecrire("Remplissage matrice 3x3\\n")

  Pour i De 0 À 2 Faire
    Pour j De 0 À 2 Faire
      matrice[i, j] <- i * 3 + j + 1
    FinPour
  FinPour

  Ecrire("Matrice:\\n")
  Pour i De 0 À 2 Faire
    Pour j De 0 À 2 Faire
      Ecrire(matrice[i, j], " ")
    FinPour
    Ecrire("\\n")
  FinPour

  somme <- 0
  Pour i De 0 À 2 Faire
    Pour j De 0 À 2 Faire
      somme <- somme + matrice[i, j]
    FinPour
  FinPour

  Ecrire("Somme totale: ", somme, "\\n")
FinAlgorithme`,
    input: []
  },
  {
    id: 'function-square',
    name: 'Fonction Carré',
    description: 'Définition et utilisation de fonction',
    difficulty: 'advanced',
    category: 'Fonctions',
    code: `Algorithme AvecFonction

Fonction Carre(n : Entier) : Entier
Variables resultat : Entier
DebutAlgorithme
  resultat <- n * n
  Retourner resultat
Fin

Variables x, y : Entier

DebutAlgorithme
  Ecrire("Entrez un nombre:\\n")
  Lire(x)
  y <- Carre(x)
  Ecrire("Le carré de ", x, " est ", y, "\\n")
  Ecrire("Le carré de 5 est ", Carre(5), "\\n")
FinAlgorithme`,
    input: ['7']
  },
  {
    id: 'procedure-greet',
    name: 'Procédure Saluer',
    description: 'Procédure avec plusieurs paramètres',
    difficulty: 'advanced',
    category: 'Fonctions',
    code: `Algorithme AvecProcedure

Procedure Saluer(nom : Chaine, fois : Entier)
Variables i : Entier
DebutAlgorithme
  Pour i De 1 À fois Faire
    Ecrire("Bonjour ", nom, "!\\n")
  FinPour
Fin

Variables
  prenom : Chaine
  nombre : Entier

DebutAlgorithme
  Ecrire("Votre prénom:\\n")
  Lire(prenom)
  Ecrire("Nombre de salutations:\\n")
  Lire(nombre)
  Saluer(prenom, nombre)
  Ecrire("Terminé!\\n")
FinAlgorithme`,
    input: ['Alice', '3']
  },
  {
    id: 'bubble-sort',
    name: 'Tri à bulles',
    description: 'Algorithme de tri classique',
    difficulty: 'advanced',
    category: 'Algorithmes',
    code: `Algorithme TriBulles
Variables
  tab : Tableau[5] de Entier
  i, j, temp : Entier

DebutAlgorithme
  Ecrire("Entrez 5 nombres:\\n")
  Pour i De 0 À 4 Faire
    Lire(tab[i])
  FinPour

  Pour i De 0 À 3 Faire
    Pour j De 0 À 3 - i Faire
      Si tab[j] > tab[j + 1] Alors
        temp <- tab[j]
        tab[j] <- tab[j + 1]
        tab[j + 1] <- temp
      FinSi
    FinPour
  FinPour

  Ecrire("Tableau trié:\\n")
  Pour i De 0 À 4 Faire
    Ecrire(tab[i], " ")
  FinPour
  Ecrire("\\n")
FinAlgorithme`,
    input: ['42', '17', '88', '5', '31']
  },
  {
    id: 'maze-explorer-game',
    name: '🗺️ Explorateur de Labyrinthe',
    description: 'Exploration d\'un labyrinthe avec trésors, monstres et sortie',
    difficulty: 'advanced',
    category: 'Jeux',
    code: `Structure Joueur
  x : Entier
  y : Entier
  tresor : Entier
  vies : Entier
  cles : Entier
FinStructure

Structure Case
  type : Entier
  visite : Entier
FinStructure

Algorithme ExplorateurLabyrinthe

// ════════════════════════════════════
// PROCÉDURE: Afficher la carte
// ════════════════════════════════════
Procedure AfficherCarte(carte : Tableau[8, 8] de Case, joueur : Joueur)
Variables i, j : Entier
DebutProcedure
  Ecrire("\\n╔════════════════════════╗\\n")
  Ecrire("║    🗺️  LABYRINTHE    ║\\n")
  Ecrire("╠════════════════════════╣\\n")

  Pour i De 0 À 7 Faire
    Ecrire("║ ")
    Pour j De 0 À 7 Faire
      // Position du joueur
      Si i = joueur.x ET j = joueur.y Alors
        Ecrire("🧙")
      Sinon
        // Case non visitée
        Si carte[i, j].visite = 0 Alors
          Ecrire("▓▓")
        Sinon
          // Case visitée - afficher contenu
          Selon carte[i, j].type
            Cas 0:
              Ecrire("  ")  // Vide
            Cas 1:
              Ecrire("██")  // Mur
            Cas 2:
              Ecrire("💎")  // Trésor
            Cas 3:
              Ecrire("👹")  // Monstre
            Cas 4:
              Ecrire("🚪")  // Sortie
            Cas 5:
              Ecrire("🔑")  // Clé
            Defaut:
              Ecrire("??")
          FinSelon
        FinSi
      FinSi
    FinPour
    Ecrire(" ║\\n")
  FinPour

  Ecrire("╚════════════════════════╝\\n")
  Ecrire("💰 Trésors: ", joueur.tresor, " | ❤️  Vies: ", joueur.vies, " | 🔑 Clés: ", joueur.cles, "\\n")
FinProcedure

// ════════════════════════════════════
// FONCTION: Générer le labyrinthe
// ════════════════════════════════════
Fonction GenererLabyrinthe() : Tableau[8, 8] de Case
Variables
  carte : Tableau[8, 8] de Case
  i, j, alea : Entier
  c : Case
DebutFonction
  // Initialiser toutes les cases
  Pour i De 0 À 7 Faire
    Pour j De 0 À 7 Faire
      c.visite <- 0

      // Bordures = murs
      Si i = 0 OU i = 7 OU j = 0 OU j = 7 Alors
        c.type <- 1
      Sinon
        // Génération aléatoire du contenu
        alea <- Aleatoire(1, 100)

        Si alea <= 20 Alors
          c.type <- 1  // 20% murs
        Sinon
          Si alea <= 35 Alors
            c.type <- 2  // 15% trésors
          Sinon
            Si alea <= 50 Alors
              c.type <- 3  // 15% monstres
            Sinon
              Si alea <= 60 Alors
                c.type <- 5  // 10% clés
              Sinon
                c.type <- 0  // 40% vide
              FinSi
            FinSi
          FinSi
        FinSi
      FinSi

      carte[i, j] <- c
    FinPour
  FinPour

  // Position de départ (en haut à gauche)
  c.type <- 0
  c.visite <- 1
  carte[1, 1] <- c

  // Sortie (en bas à droite)
  c.type <- 4
  c.visite <- 0
  carte[6, 6] <- c

  Retourner carte
FinFonction

// ════════════════════════════════════
// FONCTION: Combat contre monstre
// ════════════════════════════════════
Fonction Combat() : Entier
Variables chance : Entier
DebutFonction
  Ecrire("\\n⚔️  ═══════════════════════ ⚔️\\n")
  Ecrire("   UN MONSTRE VOUS ATTAQUE!\\n")
  Ecrire("⚔️  ═══════════════════════ ⚔️\\n\\n")

  chance <- Aleatoire(1, 100)

  Si chance <= 60 Alors
    Ecrire("💪 Vous battez le monstre!\\n")
    Retourner 1  // Victoire
  Sinon
    Ecrire("💔 Le monstre vous blesse! -1 vie\\n")
    Retourner 0  // Défaite
  FinSi
FinFonction

// ════════════════════════════════════
// PROGRAMME PRINCIPAL
// ════════════════════════════════════
Variables
  carte : Tableau[8, 8] de Case
  hero : Joueur
  direction : Entier
  continuer, victoire : Entier
  nouveauX, nouveauY : Entier
  caseActuelle : Case

DebutAlgorithme
  // ═══════════════════════════════════
  // INTRODUCTION
  // ═══════════════════════════════════
  Ecrire("╔══════════════════════════════════════╗\\n")
  Ecrire("║   🗺️  EXPLORATEUR DE LABYRINTHE   ║\\n")
  Ecrire("╚══════════════════════════════════════╝\\n\\n")

  Ecrire("🏰 Vous êtes prisonnier d'un labyrinthe!\\n")
  Ecrire("\\n🎯 OBJECTIF: Trouvez la sortie 🚪\\n")
  Ecrire("\\n📜 LÉGENDE:\\n")
  Ecrire("   🧙 = Vous\\n")
  Ecrire("   ██ = Mur\\n")
  Ecrire("   💎 = Trésor (+10 points)\\n")
  Ecrire("   👹 = Monstre (combat!)\\n")
  Ecrire("   🔑 = Clé (ouvre la sortie)\\n")
  Ecrire("   🚪 = Sortie\\n")
  Ecrire("   ▓▓ = Zone inexplorée\\n")
  Ecrire("\\n💡 Vous devez trouver une clé 🔑\\n")
  Ecrire("    pour ouvrir la sortie!\\n\\n")

  Ecrire("Appuyez sur 1 pour commencer: ")
  Lire(direction)

  // ═══════════════════════════════════
  // INITIALISATION
  // ═══════════════════════════════════
  carte <- GenererLabyrinthe()

  hero.x <- 1
  hero.y <- 1
  hero.tresor <- 0
  hero.vies <- 3
  hero.cles <- 0

  continuer <- 1
  victoire <- 0

  // Marquer case de départ comme visitée
  carte[hero.x, hero.y].visite <- 1

  // ═══════════════════════════════════
  // BOUCLE PRINCIPALE
  // ═══════════════════════════════════
  TantQue continuer = 1 ET hero.vies > 0 Faire
    AfficherCarte(carte, hero)

    Ecrire("\\n🧭 DÉPLACEMENTS:\\n")
    Ecrire("   8 = ⬆️  Haut\\n")
    Ecrire("   2 = ⬇️  Bas\\n")
    Ecrire("   4 = ⬅️  Gauche\\n")
    Ecrire("   6 = ➡️  Droite\\n")
    Ecrire("   0 = 🚪 Quitter\\n")
    Ecrire("\\nVotre choix: ")
    Lire(direction)
    Ecrire("\\n")

    // Calculer nouvelle position
    nouveauX <- hero.x
    nouveauY <- hero.y

    Selon direction
      Cas 8:  // Haut
        nouveauX <- hero.x - 1
      Cas 2:  // Bas
        nouveauX <- hero.x + 1
      Cas 4:  // Gauche
        nouveauY <- hero.y - 1
      Cas 6:  // Droite
        nouveauY <- hero.y + 1
      Cas 0:  // Quitter
        continuer <- 0
      Defaut:
        Ecrire("[ERROR] Direction invalide!\\n")
    FinSelon

    // Vérifier si déplacement valide
    Si direction >= 2 ET direction <= 8 Alors
      caseActuelle <- carte[nouveauX, nouveauY]

      // Vérifier si c'est un mur
      Si caseActuelle.type = 1 Alors
        Ecrire("🚫 Il y a un mur!\\n")
      Sinon
        // Déplacement valide
        hero.x <- nouveauX
        hero.y <- nouveauY

        // Marquer comme visité
        carte[hero.x, hero.y].visite <- 1

        // Gérer le contenu de la case
        Selon caseActuelle.type
          Cas 0:  // Vide
            Ecrire("👣 Vous avancez...\\n")

          Cas 2:  // Trésor
            Ecrire("\\n[CREATE] ════════════════════ [CREATE]\\n")
            Ecrire("   TRÉSOR TROUVÉ!\\n")
            Ecrire("[CREATE] ════════════════════ [CREATE]\\n")
            hero.tresor <- hero.tresor + 10
            Ecrire("💰 +10 points! Total: ", hero.tresor, "\\n")
            // Vider la case
            caseActuelle.type <- 0
            carte[hero.x, hero.y] <- caseActuelle

          Cas 3:  // Monstre
            Si Combat() = 0 Alors
              hero.vies <- hero.vies - 1
            FinSi
            // Vider la case
            caseActuelle.type <- 0
            carte[hero.x, hero.y] <- caseActuelle

          Cas 4:  // Sortie
            Si hero.cles > 0 Alors
              Ecrire("\\n🎉 ══════════════════════════ 🎉\\n")
              Ecrire("   VOUS AVEZ TROUVÉ LA SORTIE!\\n")
              Ecrire("   LE LABYRINTHE EST VAINCU!\\n")
              Ecrire("🎉 ══════════════════════════ 🎉\\n\\n")
              Ecrire("📊 SCORE FINAL:\\n")
              Ecrire("   💰 Trésors: ", hero.tresor, " points\\n")
              Ecrire("   ❤️  Vies restantes: ", hero.vies, "\\n")
              continuer <- 0
              victoire <- 1
            Sinon
              Ecrire("\\n🔒 La sortie est verrouillée!\\n")
              Ecrire("🔑 Trouvez une clé pour sortir!\\n")
            FinSi

          Cas 5:  // Clé
            Ecrire("\\n🔑 ════════════════════ 🔑\\n")
            Ecrire("   CLÉ TROUVÉE!\\n")
            Ecrire("🔑 ════════════════════ 🔑\\n")
            hero.cles <- hero.cles + 1
            Ecrire("Vous pouvez maintenant ouvrir la sortie!\\n")
            // Vider la case
            caseActuelle.type <- 0
            carte[hero.x, hero.y] <- caseActuelle
        FinSelon
      FinSi
    FinSi
  FinTantQue

  // ═══════════════════════════════════
  // FIN DU JEU
  // ═══════════════════════════════════
  Si hero.vies <= 0 Alors
    Ecrire("\\n💀 ═══════════════════════ 💀\\n")
    Ecrire("      GAME OVER\\n")
    Ecrire("   Vous êtes mort...\\n")
    Ecrire("💀 ═══════════════════════ 💀\\n\\n")
    Ecrire("Score final: ", hero.tresor, " points\\n")
  FinSi

  Si victoire = 0 ET hero.vies > 0 Alors
    Ecrire("\\nÀ bientôt, explorateur! 🗺️\\n")
  FinSi
FinAlgorithme`,
    input: ['1', '6', '6', '2', '2', '6', '2', '2', '6', '6', '2']
  },
  {
    id: 'rpg-combat-game',
    name: '⚔️ Aventure RPG',
    description: 'Jeu de rôle complet avec combats, inventaire et boss',
    difficulty: 'advanced',
    category: 'Jeux',
    code: `Algorithme AventureRPG

Variables
  // Stats du joueur
  vie, vieMax, mana, manaMax, niveau : Entier
  experience, gold, potions, superPotions : Entier
  attaque, defense, esquive : Entier

  // Stats ennemis
  enemyVie, enemyVieMax, enemyAttaque : Entier
  enemyNom : Chaine
  enemyGold, enemyXP : Entier

  // Variables de jeu
  choix, tour, degats, combat : Entier
  continuer, victoire : Entier
  ennemyID, boss : Entier

DebutAlgorithme
  // ═══════════════════════════════════
  // INITIALISATION DU HÉROS
  // ═══════════════════════════════════
  Ecrire("╔══════════════════════════════════════╗\\n")
  Ecrire("║     ⚔️  AVENTURE RPG  ⚔️            ║\\n")
  Ecrire("║   Le Donjon des Ombres Éternelles   ║\\n")
  Ecrire("╚══════════════════════════════════════╝\\n\\n")

  Ecrire("🏰 Bienvenue, brave aventurier!\\n\\n")
  Ecrire("Vous entrez dans un donjon mystérieux...\\n")
  Ecrire("Votre quête: vaincre le Boss final!\\n\\n")

  // Stats initiales
  vieMax <- 100
  vie <- vieMax
  manaMax <- 50
  mana <- manaMax
  attaque <- 15
  defense <- 5
  esquive <- 10
  niveau <- 1
  experience <- 0
  gold <- 50
  potions <- 2
  superPotions <- 1

  continuer <- 1
  victoire <- 0
  ennemyID <- 1

  Ecrire("📊 VOS STATISTIQUES:\\n")
  Ecrire("   ❤️  Vie: ", vie, "/", vieMax, "\\n")
  Ecrire("   💙 Mana: ", mana, "/", manaMax, "\\n")
  Ecrire("   ⚔️  Attaque: ", attaque, "\\n")
  Ecrire("   🛡️  Défense: ", defense, "\\n")
  Ecrire("   💰 Gold: ", gold, "\\n")
  Ecrire("   🧪 Potions: ", potions, "\\n")
  Ecrire("   ⭐ Super Potions: ", superPotions, "\\n\\n")

  Ecrire("Appuyez sur 1 pour commencer l'aventure: ")
  Lire(choix)
  Ecrire("\\n")

  // ═══════════════════════════════════
  // BOUCLE PRINCIPALE DU JEU
  // ═══════════════════════════════════
  TantQue continuer = 1 ET vie > 0 Faire
    Ecrire("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n")
    Ecrire("🏰 SALLE ", ennemyID, " - Niveau ", niveau, " | XP: ", experience, "\\n")
    Ecrire("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n")

    // Génération de l'ennemi selon la salle
    Selon ennemyID
      Cas 1:
        enemyNom <- "Gobelin"
        enemyVieMax <- 30
        enemyAttaque <- 8
        enemyGold <- 15
        enemyXP <- 20
      Cas 2:
        enemyNom <- "Squelette"
        enemyVieMax <- 45
        enemyAttaque <- 12
        enemyGold <- 25
        enemyXP <- 35
      Cas 3:
        enemyNom <- "Orc Guerrier"
        enemyVieMax <- 60
        enemyAttaque <- 15
        enemyGold <- 40
        enemyXP <- 50
      Cas 4:
        enemyNom <- "BOSS: Dragon"
        enemyVieMax <- 150
        enemyAttaque <- 25
        enemyGold <- 200
        enemyXP <- 200
        boss <- 1
      Defaut:
        enemyNom <- "Inconnu"
        enemyVieMax <- 50
        enemyAttaque <- 10
        enemyGold <- 20
        enemyXP <- 30
    FinSelon

    enemyVie <- enemyVieMax

    Si boss = 1 Alors
      Ecrire("🐉 ════════════════════════════════ 🐉\\n")
      Ecrire("     LE DRAGON APPARAÎT!\\n")
      Ecrire("     COMBAT FINAL!\\n")
      Ecrire("🐉 ════════════════════════════════ 🐉\\n\\n")
    Sinon
      Ecrire("[WARN]  Un ", enemyNom, " apparaît!\\n\\n")
    FinSi

    // ═══════════════════════════════════
    // COMBAT
    // ═══════════════════════════════════
    combat <- 1
    tour <- 1

    TantQue combat = 1 ET vie > 0 ET enemyVie > 0 Faire
      Ecrire("┌─────────────── TOUR ", tour, " ───────────────┐\\n")
      Ecrire("│ ❤️  VOUS: ", vie, "/", vieMax, " | 💙 Mana: ", mana, "/", manaMax, "  │\\n")
      Ecrire("│ 👹 ", enemyNom, ": ", enemyVie, "/", enemyVieMax, "          │\\n")
      Ecrire("└───────────────────────────────────────┘\\n\\n")

      Ecrire("⚡ ACTIONS:\\n")
      Ecrire("  1 - ⚔️  Attaque normale\\n")
      Ecrire("  2 - 🔥 Attaque magique (20 mana, x2 dégâts)\\n")
      Ecrire("  3 - 🛡️  Se défendre (+50%% défense ce tour)\\n")
      Ecrire("  4 - 🧪 Potion de soin (+30 PV)\\n")
      Ecrire("  5 - ⭐ Super Potion (+60 PV)\\n")
      Ecrire("\\nVotre choix: ")
      Lire(choix)
      Ecrire("\\n")

      // Tour du joueur
      Selon choix
        Cas 1:
          // Attaque normale
          degats <- attaque - (defense / 2)
          Si degats < 5 Alors
            degats <- 5
          FinSi
          enemyVie <- enemyVie - degats
          Ecrire("⚔️  Vous attaquez! -", degats, " PV\\n")

        Cas 2:
          // Attaque magique
          Si mana >= 20 Alors
            mana <- mana - 20
            degats <- attaque * 2
            enemyVie <- enemyVie - degats
            Ecrire("🔥 ATTAQUE MAGIQUE! -", degats, " PV\\n")
          Sinon
            Ecrire("[ERROR] Pas assez de mana!\\n")
          FinSi

        Cas 3:
          // Défense
          defense <- defense + 5
          Ecrire("🛡️  Vous vous préparez à encaisser!\\n")

        Cas 4:
          // Potion
          Si potions > 0 Alors
            potions <- potions - 1
            vie <- vie + 30
            Si vie > vieMax Alors
              vie <- vieMax
            FinSi
            Ecrire("🧪 Potion utilisée! +30 PV\\n")
          Sinon
            Ecrire("[ERROR] Plus de potions!\\n")
          FinSi

        Cas 5:
          // Super Potion
          Si superPotions > 0 Alors
            superPotions <- superPotions - 1
            vie <- vie + 60
            Si vie > vieMax Alors
              vie <- vieMax
            FinSi
            mana <- mana + 30
            Si mana > manaMax Alors
              mana <- manaMax
            FinSi
            Ecrire("⭐ SUPER POTION! +60 PV, +30 Mana\\n")
          Sinon
            Ecrire("[ERROR] Plus de super potions!\\n")
          FinSi

        Defaut:
          Ecrire("[ERROR] Action invalide!\\n")
      FinSelon

      // Tour de l'ennemi (s'il est vivant)
      Si enemyVie > 0 Alors
        Ecrire("\\n")
        degats <- enemyAttaque - defense
        Si degats < 3 Alors
          degats <- 3
        FinSi
        vie <- vie - degats
        Ecrire("💥 ", enemyNom, " attaque! -", degats, " PV\\n")

        // Reset défense
        Si defense > 5 Alors
          defense <- 5
        FinSi
      FinSi

      // Régénération de mana
      mana <- mana + 5
      Si mana > manaMax Alors
        mana <- manaMax
      FinSi

      Ecrire("\\n")
      tour <- tour + 1

      // Vérifier fin du combat
      Si enemyVie <= 0 Alors
        combat <- 0
      FinSi
    FinTantQue

    // ═══════════════════════════════════
    // FIN DU COMBAT
    // ═══════════════════════════════════
    Si vie > 0 Alors
      Ecrire("\\n[CREATE] ══════════════════════════════ [CREATE]\\n")
      Ecrire("      VICTOIRE!\\n")
      Ecrire("[CREATE] ══════════════════════════════ [CREATE]\\n\\n")

      // Récompenses
      gold <- gold + enemyGold
      experience <- experience + enemyXP
      Ecrire("💰 +", enemyGold, " gold (Total: ", gold, ")\\n")
      Ecrire("⭐ +", enemyXP, " XP (Total: ", experience, ")\\n")

      // Level up
      Si experience >= 100 Alors
        niveau <- niveau + 1
        experience <- experience - 100
        vieMax <- vieMax + 20
        vie <- vieMax
        manaMax <- manaMax + 10
        mana <- manaMax
        attaque <- attaque + 5
        defense <- defense + 2
        Ecrire("\\n🎉 NIVEAU SUPÉRIEUR! Niveau ", niveau, "\\n")
        Ecrire("   ❤️  Vie Max: ", vieMax, "\\n")
        Ecrire("   ⚔️  Attaque: ", attaque, "\\n")
        Ecrire("   🛡️  Défense: ", defense, "\\n")
      FinSi

      // Passer à la salle suivante ou finir
      Si boss = 1 Alors
        Ecrire("\\n")
        Ecrire("👑 ══════════════════════════════════ 👑\\n")
        Ecrire("   FÉLICITATIONS!\\n")
        Ecrire("   VOUS AVEZ VAINCU LE DRAGON!\\n")
        Ecrire("   LE DONJON EST LIBÉRÉ!\\n")
        Ecrire("👑 ══════════════════════════════════ 👑\\n\\n")
        Ecrire("📊 STATISTIQUES FINALES:\\n")
        Ecrire("   Niveau: ", niveau, "\\n")
        Ecrire("   Gold: ", gold, "\\n")
        Ecrire("   Vie: ", vie, "/", vieMax, "\\n")
        continuer <- 0
        victoire <- 1
      Sinon
        ennemyID <- ennemyID + 1
        Ecrire("\\n➡️  Continuer vers la salle suivante? (1=Oui, 0=Quitter): ")
        Lire(continuer)
        Ecrire("\\n")

        // Repos entre les salles
        Si continuer = 1 Alors
          vie <- vie + 20
          Si vie > vieMax Alors
            vie <- vieMax
          FinSi
          Ecrire("😌 Vous vous reposez... +20 PV\\n\\n")
        FinSi
      FinSi
    FinSi
  FinTantQue

  // ═══════════════════════════════════
  // FIN DU JEU
  // ═══════════════════════════════════
  Si vie <= 0 Alors
    Ecrire("\\n💀 ══════════════════════════════ 💀\\n")
    Ecrire("      GAME OVER\\n")
    Ecrire("      Vous êtes tombé au combat...\\n")
    Ecrire("💀 ══════════════════════════════ 💀\\n\\n")
    Ecrire("Niveau atteint: ", niveau, "\\n")
    Ecrire("Gold accumulé: ", gold, "\\n")
  FinSi

  Ecrire("\\nMerci d'avoir joué! ⚔️\\n")
FinAlgorithme`,
    input: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1']
  },
  {
    id: 'guess-number-game',
    name: '🎮 Devine le nombre',
    description: 'Jeu interactif avec tentatives limitées et score',
    difficulty: 'intermediate',
    category: 'Jeux',
    code: `Algorithme DevineLeNombre

Variables
  nombreSecret, tentative, essais, maxEssais : Entier
  score, difficulte : Entier
  continuer : Entier

DebutAlgorithme
  Ecrire("╔════════════════════════════════╗\\n")
  Ecrire("║   🎮 DEVINE LE NOMBRE 🎮      ║\\n")
  Ecrire("╚════════════════════════════════╝\\n\\n")

  Ecrire("Choisissez la difficulté:\\n")
  Ecrire("1 - Facile (1-50, 10 essais)\\n")
  Ecrire("2 - Moyen (1-100, 7 essais)\\n")
  Ecrire("3 - Difficile (1-200, 5 essais)\\n")
  Lire(difficulte)

  // Configuration selon difficulté
  Selon difficulte
    Cas 1:
      nombreSecret <- 25
      maxEssais <- 10
      Ecrire("\\n🟢 Mode FACILE: Devinez entre 1 et 50\\n\\n")
    Cas 2:
      nombreSecret <- 67
      maxEssais <- 7
      Ecrire("\\n🟡 Mode MOYEN: Devinez entre 1 et 100\\n\\n")
    Cas 3:
      nombreSecret <- 142
      maxEssais <- 5
      Ecrire("\\n🔴 Mode DIFFICILE: Devinez entre 1 et 200\\n\\n")
    Defaut:
      nombreSecret <- 67
      maxEssais <- 7
      Ecrire("\\n🟡 Mode MOYEN par défaut\\n\\n")
  FinSelon

  essais <- 0
  score <- 100
  continuer <- 1

  // Boucle de jeu
  TantQue continuer = 1 ET essais < maxEssais Faire
    essais <- essais + 1
    Ecrire("┌─────────────────────────────┐\\n")
    Ecrire("│ Essai ", essais, "/", maxEssais, " - Score: ", score, " pts │\\n")
    Ecrire("└─────────────────────────────┘\\n")
    Ecrire("Votre nombre: ")
    Lire(tentative)

    Si tentative = nombreSecret Alors
      // Victoire !
      Ecrire("\\n🎉 ════════════════════════ 🎉\\n")
      Ecrire("   BRAVO! Vous avez trouvé!\\n")
      Ecrire("🎉 ════════════════════════ 🎉\\n\\n")
      Ecrire("📊 Résultat:\\n")
      Ecrire("   • Nombre: ", nombreSecret, "\\n")
      Ecrire("   • Essais: ", essais, "/", maxEssais, "\\n")
      Ecrire("   • Score final: ", score, " points\\n\\n")

      Si score >= 90 Alors
        Ecrire("🏆 Performance EXCEPTIONNELLE! 🏆\\n")
      Sinon
        Si score >= 70 Alors
          Ecrire("⭐ Très bien joué! ⭐\\n")
        Sinon
          Ecrire("[SUCCESS] Bon travail! [SUCCESS]\\n")
        FinSi
      FinSi

      continuer <- 0
    Sinon
      // Mauvaise réponse
      Si tentative < nombreSecret Alors
        Ecrire("📈 Trop petit! Essayez plus grand\\n\\n")
      Sinon
        Ecrire("📉 Trop grand! Essayez plus petit\\n\\n")
      FinSi

      // Pénalité de score
      score <- score - 10
      Si score < 0 Alors
        score <- 0
      FinSi
    FinSi
  FinTantQue

  // Défaite
  Si continuer = 1 Alors
    Ecrire("\\n💀 ════════════════════════ 💀\\n")
    Ecrire("   GAME OVER - Plus d'essais!\\n")
    Ecrire("💀 ════════════════════════ 💀\\n\\n")
    Ecrire("Le nombre était: ", nombreSecret, "\\n")
    Ecrire("Réessayez pour faire mieux!\\n")
  FinSi

  Ecrire("\\nMerci d'avoir joué! 🎮\\n")
FinAlgorithme`,
    input: ['2', '50', '75', '60', '65', '67']
  },
  {
    id: 'structures',
    name: 'Structures/Enregistrements',
    description: 'Types de données composites avec champs',
    difficulty: 'advanced',
    category: 'Structures',
    code: `Algorithme GestionEtudiants

Structure Etudiant
  nom : Chaine
  age : Entier
  moyenne : Reel
FinStructure

Variables
  etudiant1, etudiant2 : Etudiant
  meilleur : Chaine

DebutAlgorithme
  // Initialisation du premier étudiant
  Ecrire("Premier étudiant\\n")
  Ecrire("Nom:\\n")
  Lire(etudiant1.nom)
  Ecrire("Age:\\n")
  Lire(etudiant1.age)
  Ecrire("Moyenne:\\n")
  Lire(etudiant1.moyenne)

  // Initialisation du deuxième étudiant
  Ecrire("\\nDeuxième étudiant\\n")
  Ecrire("Nom:\\n")
  Lire(etudiant2.nom)
  Ecrire("Age:\\n")
  Lire(etudiant2.age)
  Ecrire("Moyenne:\\n")
  Lire(etudiant2.moyenne)

  // Affichage des informations
  Ecrire("\\nInformations:\\n")
  Ecrire("Etudiant 1: ", etudiant1.nom, ", ", etudiant1.age, " ans, moyenne: ", etudiant1.moyenne, "\\n")
  Ecrire("Etudiant 2: ", etudiant2.nom, ", ", etudiant2.age, " ans, moyenne: ", etudiant2.moyenne, "\\n")

  // Comparaison
  Si etudiant1.moyenne > etudiant2.moyenne Alors
    meilleur <- etudiant1.nom
  Sinon
    meilleur <- etudiant2.nom
  FinSi

  Ecrire("\\nMeilleure moyenne: ", meilleur, "\\n")
FinAlgorithme`,
    input: ['Alice', '20', '15.5', 'Bob', '22', '14.2']
  },
  {
    id: 'linked-list',
    name: 'Liste Chaînée avec Pointeurs',
    description: 'Structure de données récursive utilisant des pointeurs',
    difficulty: 'advanced',
    category: 'Structures',
    code: `Algorithme ListeChainee

// Structure récursive maintenant possible avec les pointeurs !
Structure Noeud
  valeur : Entier
  suivant : Pointeur<Noeud>
FinStructure

Variables
  tete : Pointeur<Noeud>
  courant : Pointeur<Noeud>
  nouveau : Pointeur<Noeud>
  i : Entier

DebutAlgorithme
  Ecrire("=== Liste Chaînée avec Pointeurs ===\\n")

  // Créer le premier noeud
  Ecrire("Création du premier noeud (10)...\\n")
  tete <- Allouer(Noeud)
  tete^.valeur <- 10
  tete^.suivant <- Nil

  // Ajouter un deuxième noeud
  Ecrire("Ajout d'un deuxième noeud (20)...\\n")
  nouveau <- Allouer(Noeud)
  nouveau^.valeur <- 20
  nouveau^.suivant <- Nil
  tete^.suivant <- nouveau

  // Ajouter un troisième noeud
  Ecrire("Ajout d'un troisième noeud (30)...\\n")
  nouveau <- Allouer(Noeud)
  nouveau^.valeur <- 30
  nouveau^.suivant <- Nil
  tete^.suivant^.suivant <- nouveau

  // Parcourir et afficher la liste
  Ecrire("\\nContenu de la liste : ")
  courant <- tete
  i <- 1
  TantQue courant <> Nil Faire
    Ecrire(courant^.valeur)
    courant <- courant^.suivant
    Si courant <> Nil Alors
      Ecrire(" -> ")
    FinSi
  FinTantQue
  Ecrire("\\n")

  // Libérer la mémoire (dans l'ordre)
  Ecrire("\\nLibération de la mémoire...\\n")
  Liberer(tete^.suivant^.suivant)
  Liberer(tete^.suivant)
  Liberer(tete)

  Ecrire("Terminé !\\n")
FinAlgorithme`,
    input: []
  }
];

/**
 * Récupère un exemple par son ID
 */
export function getExampleById(id: string): AlgorithmExample | undefined {
  return examples.find(ex => ex.id === id);
}

/**
 * Récupère les exemples par niveau de difficulté
 */
export function getExamplesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): AlgorithmExample[] {
  return examples.filter(ex => ex.difficulty === difficulty);
}

/**
 * Récupère les exemples par catégorie
 */
export function getExamplesByCategory(category: string): AlgorithmExample[] {
  return examples.filter(ex => ex.category === category);
}
