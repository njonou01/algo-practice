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

Debut
  Ecrire("Comment vous appelez-vous?\\n")
  Lire(nom)
  Ecrire("Bonjour ", nom, "!\\n")
Fin`,
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

Debut
  Ecrire("Entrez un nombre:\\n")
  Lire(x)
  y <- x * 2
  Ecrire("Le double de ", x, " est ", y, "\\n")
Fin`,
    input: ['15']
  },
  {
    id: 'max-two',
    name: 'Maximum de deux nombres',
    description: 'Condition Si/Alors/Sinon simple',
    difficulty: 'beginner',
    category: 'Conditions',
    code: `Algorithme Maximum
Variables a, b : Entier

Debut
  Ecrire("Premier nombre:\\n")
  Lire(a)
  Ecrire("Deuxième nombre:\\n")
  Lire(b)

  Si a > b Alors
    Ecrire("Le maximum est: ", a, "\\n")
  Sinon
    Ecrire("Le maximum est: ", b, "\\n")
  FinSi
Fin`,
    input: ['15', '23']
  },
  {
    id: 'sum',
    name: 'Somme de deux nombres',
    description: 'Addition simple avec deux variables',
    difficulty: 'beginner',
    category: 'Calculs',
    code: `Algorithme Somme
Variables a, b, resultat : Entier

Debut
  Ecrire("Premier nombre:\\n")
  Lire(a)
  Ecrire("Deuxième nombre:\\n")
  Lire(b)
  resultat <- a + b
  Ecrire(a, " + ", b, " = ", resultat, "\\n")
Fin`,
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

Debut
  Ecrire("Entrez un nombre:\\n")
  Lire(n)
  fact <- 1
  Pour i De 1 A n Faire
    fact <- fact * i
  FinPour
  Ecrire("Factorielle de ", n, " = ", fact, "\\n")
Fin`,
    input: ['5']
  },
  {
    id: 'fibonacci',
    name: 'Suite de Fibonacci',
    description: 'Boucle avec séquence mathématique',
    difficulty: 'intermediate',
    category: 'Boucles',
    code: `Algorithme Fibonacci
Variables n, i, a, b, temp : Entier

Debut
  Ecrire("Combien de termes?\\n")
  Lire(n)
  a <- 0
  b <- 1
  Ecrire("Suite de Fibonacci:\\n")
  Ecrire(a, "\\n")
  Ecrire(b, "\\n")
  Pour i De 3 A n Faire
    temp <- a + b
    Ecrire(temp, "\\n")
    a <- b
    b <- temp
  FinPour
Fin`,
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

Debut
  Ecrire("Entrez un nombre:\\n")
  Lire(n)
  estPremier <- 1

  Si n < 2 Alors
    estPremier <- 0
  Sinon
    Pour i De 2 A n - 1 Faire
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
Fin`,
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

Debut
  Ecrire("Entrez 5 notes:\\n")

  Pour i De 0 A 4 Faire
    Lire(notes[i])
  FinPour

  somme <- 0
  Pour i De 0 A 4 Faire
    somme <- somme + notes[i]
  FinPour

  moyenne <- somme / 5
  Ecrire("Moyenne: ", moyenne, "\\n")
Fin`,
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

Debut
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
Fin`,
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

Debut
  Ecrire("Remplissage matrice 3x3\\n")

  Pour i De 0 A 2 Faire
    Pour j De 0 A 2 Faire
      matrice[i, j] <- i * 3 + j + 1
    FinPour
  FinPour

  Ecrire("Matrice:\\n")
  Pour i De 0 A 2 Faire
    Pour j De 0 A 2 Faire
      Ecrire(matrice[i, j], " ")
    FinPour
    Ecrire("\\n")
  FinPour

  somme <- 0
  Pour i De 0 A 2 Faire
    Pour j De 0 A 2 Faire
      somme <- somme + matrice[i, j]
    FinPour
  FinPour

  Ecrire("Somme totale: ", somme, "\\n")
Fin`,
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
Debut
  resultat <- n * n
  Retourner resultat
Fin

Variables x, y : Entier

Debut
  Ecrire("Entrez un nombre:\\n")
  Lire(x)
  y <- Carre(x)
  Ecrire("Le carré de ", x, " est ", y, "\\n")
  Ecrire("Le carré de 5 est ", Carre(5), "\\n")
Fin`,
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
Debut
  Pour i De 1 A fois Faire
    Ecrire("Bonjour ", nom, "!\\n")
  FinPour
Fin

Variables
  prenom : Chaine
  nombre : Entier

Debut
  Ecrire("Votre prénom:\\n")
  Lire(prenom)
  Ecrire("Nombre de salutations:\\n")
  Lire(nombre)
  Saluer(prenom, nombre)
  Ecrire("Terminé!\\n")
Fin`,
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

Debut
  Ecrire("Entrez 5 nombres:\\n")
  Pour i De 0 A 4 Faire
    Lire(tab[i])
  FinPour

  Pour i De 0 A 3 Faire
    Pour j De 0 A 3 - i Faire
      Si tab[j] > tab[j + 1] Alors
        temp <- tab[j]
        tab[j] <- tab[j + 1]
        tab[j + 1] <- temp
      FinSi
    FinPour
  FinPour

  Ecrire("Tableau trié:\\n")
  Pour i De 0 A 4 Faire
    Ecrire(tab[i], " ")
  FinPour
  Ecrire("\\n")
Fin`,
    input: ['42', '17', '88', '5', '31']
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

Debut
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
Fin`,
    input: ['Alice', '20', '15.5', 'Bob', '22', '14.2']
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
