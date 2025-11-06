# Tests Frontend - Guide & Cours

> **Fichiers testés:** `/src/pages/Guide.tsx`, `/src/pages/Cours.tsx`
>
> **Composants:** Pages de documentation et d'apprentissage
>
> **Priorité:** 🟠 HAUTE (documentation essentielle pour les utilisateurs)

---

## Vue d'ensemble

Les pages Guide et Cours fournissent la documentation complète du langage algorithmique français. Le Guide contient 14 sections détaillées avec exemples de code, tableaux et explications.

---

## FE-GC-001 : Chargement de la page Guide

**Priorité:** 🔴 Critique
**Prérequis:** Application démarrée

### Étapes
1. Cliquer sur "Guide" dans la navigation
2. Observer le chargement de la page

### Résultat attendu
- ✅ Page se charge sans erreur
- ✅ Titre "Guide du langage algorithmique" visible
- ✅ Toutes les sections sont affichées
- ✅ Sections sont dans des CollapsibleSection
- ✅ Navigation fonctionne
- ✅ Pas de lag lors du rendu

**Statut:** ⏸️ Non testé

---

## FE-GC-002 : Section "Structure d'un algorithme"

**Priorité:** 🔴 Critique
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section "Structure d'un algorithme"
2. Observer le contenu
3. Vérifier l'exemple de code

### Résultat attendu
- ✅ Titre de section visible
- ✅ Explication de la structure de base
- ✅ Exemple de code présent avec:
  - Algorithme NomAlgo
  - Variables (optionnel)
  - Constantes (optionnel)
  - Debut
  - Fin
- ✅ Coloration syntaxique appliquée
- ✅ Mots-clés en violet

**Statut:** ⏸️ Non testé

---

## FE-GC-003 : Section "Types de données" - Tableau

**Priorité:** 🟠 Haute
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section "Types de données"
2. Trouver le tableau des types
3. Vérifier chaque ligne

### Résultat attendu
- ✅ Tableau avec colonnes: Type, Description, Exemple
- ✅ 5 types listés:
  - Entier (nombres entiers, ex: 42)
  - Reel (nombres décimaux, ex: 3.14)
  - Chaine (texte, ex: "Bonjour")
  - Booleen (Vrai/Faux)
  - Caractere (1 caractère, ex: 'A')
- ✅ Tableau bien formaté et lisible
- ✅ Exemples clairs

**Statut:** ⏸️ Non testé

---

## FE-GC-004 : Section "Affectation" - Opérateur ←

**Priorité:** 🟠 Haute
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section "Affectation"
2. Lire l'explication
3. Vérifier les exemples

### Résultat attendu
- ✅ Explication de l'opérateur ←
- ✅ Mention de l'alternative `<-`
- ✅ Exemples d'affectation:
  - `x ← 5`
  - `nom ← "Alice"`
  - `resultat ← a + b`
- ✅ Opérateur ← coloré en orange dans les exemples

**Statut:** ⏸️ Non testé

---

## FE-GC-005 : Section "Constantes" - Nouvelle syntaxe

**Priorité:** 🔴 Critique
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section "Constantes"
2. Vérifier l'explication de la nouvelle syntaxe
3. Lire les exemples

### Résultat attendu
- ✅ Explication de l'initialisation directe
- ✅ Note sur l'inférence de type automatique
- ✅ Exemples:
  - `PI : Reel ← 3.14159`
  - `MAX : Entier ← 100`
  - Sans type: `PI ← 3.14` (inféré comme Reel)
- ✅ Mention que les constantes sont immutables
- ✅ Warning sur l'ancienne syntaxe (si présent)

**Statut:** ⏸️ Non testé

---

## FE-GC-006 : Section "Entrées/Sorties" - Lire et Ecrire

**Priorité:** 🔴 Critique
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section "Entrées/Sorties"
2. Vérifier les deux sous-sections

### Résultat attendu
- ✅ **Lire()** expliqué:
  - Syntaxe: `Lire(variable)`
  - Peut lire plusieurs variables: `Lire(a, b, c)`
- ✅ **Ecrire()** expliqué:
  - Syntaxe: `Ecrire("texte")`
  - Peut afficher variables: `Ecrire(x)`
  - Peut mélanger: `Ecrire("x = ", x)`
  - `\n` pour nouvelle ligne
- ✅ Exemples de code complets
- ✅ Coloration syntaxique

**Statut:** ⏸️ Non testé

---

## FE-GC-007 : Section "Si/Alors/Sinon"

**Priorité:** 🟠 Haute
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section sur les conditionnels
2. Vérifier la syntaxe expliquée

### Résultat attendu
- ✅ Structure Si/Alors/Sinon/FinSi claire
- ✅ Exemples avec conditions:
  - Si x > 5 Alors
  - Si age >= 18 Alors
- ✅ Mention que Sinon est optionnel
- ✅ Exemple avec Si imbriqués (si présent)
- ✅ Mots-clés Si, Alors, Sinon, FinSi colorés

**Statut:** ⏸️ Non testé

---

## FE-GC-008 : Section "Boucles" - Pour

**Priorité:** 🟠 Haute
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section Boucles
2. Trouver la sous-section "Boucle Pour"

### Résultat attendu
- ✅ Syntaxe: `Pour i De debut À fin Faire ... FinPour`
- ✅ Exemple concret (ex: Pour i De 1 À 10)
- ✅ Note sur "À" vs "a" si présente
- ✅ Explication de l'incrémentation automatique
- ✅ Mots-clés colorés: Pour, De, À, Faire, FinPour

**Statut:** ⏸️ Non testé

---

## FE-GC-009 : Section "Boucles" - TantQue

**Priorité:** 🟠 Haute
**Prérequis:** Page Guide ouverte

### Étapes
1. Dans la section Boucles
2. Trouver "Boucle TantQue"

### Résultat attendu
- ✅ Syntaxe: `TantQue condition Faire ... FinTantQue`
- ✅ Exemple avec condition (ex: TantQue x < 100)
- ✅ Explication: exécute tant que condition vraie
- ✅ Warning sur boucles infinies possibles

**Statut:** ⏸️ Non testé

---

## FE-GC-010 : Section "Boucles" - Repeter/Jusqua

**Priorité:** 🟡 Moyenne
**Prérequis:** Page Guide ouverte

### Étapes
1. Dans la section Boucles
2. Trouver "Boucle Repeter/Jusqua"

### Résultat attendu
- ✅ Syntaxe: `Repeter ... Jusqua condition`
- ✅ Explication: exécute AU MOINS une fois
- ✅ Différence avec TantQue expliquée
- ✅ Exemple concret

**Statut:** ⏸️ Non testé

---

## FE-GC-011 : Section "Selon/Cas" (Switch)

**Priorité:** 🟡 Moyenne
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section "Structure Selon/Cas"
2. Vérifier la syntaxe

### Résultat attendu
- ✅ Structure Selon/Cas/Defaut/FinSelon expliquée
- ✅ Exemple avec plusieurs cas:
  - Selon variable
  - Cas 1, 2: ...
  - Cas 3: ...
  - Defaut: ...
- ✅ Support de valeurs multiples par cas mentionné
- ✅ Mots-clés colorés

**Statut:** ⏸️ Non testé

---

## FE-GC-012 : Section "Tableaux" - 1D

**Priorité:** 🟠 Haute
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section Tableaux
2. Vérifier sous-section Tableaux 1D

### Résultat attendu
- ✅ Syntaxe de déclaration: `tab : Tableau[taille] de Type`
- ✅ Exemple: `nombres : Tableau[10] de Entier`
- ✅ Accès aux éléments: `tab[i]`
- ✅ Indices commencent à 0 (si mentionné)
- ✅ Exemple de parcours avec Pour

**Statut:** ⏸️ Non testé

---

## FE-GC-013 : Section "Tableaux" - 2D (Matrices)

**Priorité:** 🟡 Moyenne
**Prérequis:** Page Guide ouverte

### Étapes
1. Dans la section Tableaux
2. Trouver Tableaux 2D

### Résultat attendu
- ✅ Syntaxe: `matrice : Tableau[lignes, colonnes] de Type`
- ✅ Exemple: `grille : Tableau[3, 3] de Entier`
- ✅ Accès: `matrice[i, j]`
- ✅ Exemple de double boucle Pour parcourir

**Statut:** ⏸️ Non testé

---

## FE-GC-014 : Section "Structures/Enregistrements"

**Priorité:** 🟡 Moyenne
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section Structures
2. Vérifier définition et utilisation

### Résultat attendu
- ✅ Syntaxe de définition:
  ```
  Structure NomStructure
      champ1 : Type1
      champ2 : Type2
  FinStructure
  ```
- ✅ Déclaration variable: `personne : NomStructure`
- ✅ Accès aux champs: `personne.champ1`
- ✅ Exemple complet (ex: Structure Personne avec nom, age)

**Statut:** ⏸️ Non testé

---

## FE-GC-015 : Section "Fonctions"

**Priorité:** 🟠 Haute
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section Fonctions
2. Vérifier syntaxe et exemples

### Résultat attendu
- ✅ Syntaxe:
  ```
  Fonction NomFonction(params) : TypeRetour
  Variables locales
  Debut
      ...
      Retourner valeur
  Fin
  ```
- ✅ Exemple concret (ex: Fonction Carre(x: Entier): Entier)
- ✅ Appel de fonction: `resultat ← NomFonction(args)`
- ✅ Mot-clé Retourner coloré

**Statut:** ⏸️ Non testé

---

## FE-GC-016 : Section "Procédures"

**Priorité:** 🟡 Moyenne
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section Procédures
2. Vérifier différence avec Fonctions

### Résultat attendu
- ✅ Syntaxe similaire à Fonction mais sans type de retour
- ✅ Pas de Retourner (ou Retourner sans valeur)
- ✅ Appel direct: `NomProcedure(args)`
- ✅ Exemple concret (ex: Procedure Afficher(texte))
- ✅ Différence Fonction/Procédure expliquée

**Statut:** ⏸️ Non testé

---

## FE-GC-017 : Section "Opérateurs" - Tableau complet

**Priorité:** 🟠 Haute
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section Opérateurs
2. Vérifier les 3 tableaux

### Résultat attendu
- ✅ **Tableau 1 - Arithmétiques:** +, -, *, /, %
- ✅ **Tableau 2 - Comparaison:** =, ≠ (!=), <, >, ≤ (<=), ≥ (>=)
- ✅ **Tableau 3 - Logiques:** ET, OU, NON
- ✅ Symboles Unicode ET équivalents ASCII mentionnés
- ✅ Exemples d'utilisation pour chaque type
- ✅ Tableaux bien formatés et lisibles

**Statut:** ⏸️ Non testé

---

## FE-GC-018 : Section "Mots-clés réservés"

**Priorité:** 🟡 Moyenne
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser la section des mots-clés réservés
2. Compter les mots-clés listés

### Résultat attendu
- ✅ Liste complète des mots-clés (40+):
  - Algorithme, Variables, Constantes, Debut, Fin
  - Types: Entier, Reel, Chaine, Booleen, Caractere, Tableau
  - Contrôle: Si, Alors, Sinon, FinSi, Pour, TantQue, Repeter, Jusqua, Selon, Cas, Defaut
  - Fonctions: Fonction, Procedure, Retourner
  - E/S: Lire, Ecrire
  - Logique: ET, OU, NON, Vrai, Faux
  - Structures: Structure, Enregistrement
- ✅ Note: ces mots ne peuvent pas être utilisés comme noms de variables
- ✅ Présentation claire (liste ou tableau)

**Statut:** ⏸️ Non testé

---

## FE-GC-019 : Section "Exemple complet"

**Priorité:** 🔴 Critique
**Prérequis:** Page Guide ouverte

### Étapes
1. Faire défiler jusqu'à la fin
2. Localiser l'exemple complet
3. Vérifier qu'il utilise plusieurs concepts

### Résultat attendu
- ✅ Algorithme complet de plusieurs lignes
- ✅ Utilise plusieurs concepts:
  - Variables
  - Entrée/Sortie (Lire/Ecrire)
  - Structure de contrôle (Si/Pour/TantQue)
  - Au moins une fonction ou boucle
- ✅ Code bien indenté
- ✅ Coloration syntaxique appliquée
- ✅ Commentaires explicatifs (optionnel)
- ✅ Code exécutable dans l'éditeur

**Statut:** ⏸️ Non testé

---

## FE-GC-020 : Note spéciale "À vs a"

**Priorité:** 🟡 Moyenne
**Prérequis:** Page Guide ouverte, section Boucles

### Étapes
1. Chercher une note ou warning sur "À" vs "a"
2. Vérifier la présence de cette information

### Résultat attendu
- ✅ Note visible mentionnant que "À" (avec accent) et "a" (sans accent) sont acceptés
- ✅ Recommandation d'utiliser "À" avec accent
- ✅ Explication que "a" fonctionne pour compatibilité
- ✅ Style de note distinct (encadré, couleur différente)

**Statut:** ⏸️ Non testé

---

## FE-GC-021 : Coloration syntaxique dans les exemples

**Priorité:** 🟠 Haute
**Prérequis:** Page Guide ouverte

### Étapes
1. Observer plusieurs exemples de code dans différentes sections
2. Vérifier que la coloration est cohérente

### Résultat attendu
- ✅ Tous les exemples de code ont la coloration syntaxique
- ✅ Cohérence des couleurs:
  - Keywords (Algorithme, Si, Pour, etc.) : violet
  - Types (Entier, Reel, etc.) : bleu
  - Nombres : jaune
  - Strings : vert
  - Opérateurs : rose/orange
- ✅ Même rendu que dans l'éditeur
- ✅ Police JetBrains Mono utilisée

**Statut:** ⏸️ Non testé

---

## FE-GC-022 : CollapsibleSection - Ouverture/Fermeture

**Priorité:** 🟡 Moyenne
**Prérequis:** Page Guide ouverte

### Étapes
1. Localiser une section avec CollapsibleSection
2. Cliquer sur le titre pour fermer
3. Recliquer pour ouvrir

### Résultat attendu
- ✅ Section se ferme avec animation fluide
- ✅ Icône change d'orientation (chevron)
- ✅ Contenu disparaît complètement
- ✅ Section se rouvre au clic
- ✅ Animation d'ouverture fluide
- ✅ Pas de saut brusque de page

**Statut:** ⏸️ Non testé

---

## FE-GC-023 : Thème Dark - Guide

**Priorité:** 🟡 Moyenne
**Prérequis:** Thème = Dark, Page Guide ouverte

### Étapes
1. Observer les couleurs de la page Guide en mode dark
2. Vérifier le contraste

### Résultat attendu
- ✅ Fond de page : gris foncé
- ✅ Texte : blanc/gris clair
- ✅ Titres : couleur claire visible
- ✅ Tableaux : bordures grises foncées
- ✅ Code blocks : fond gris foncé avec texte coloré
- ✅ Bon contraste partout (lisible)
- ✅ CollapsibleSection : fond gris foncé

**Statut:** ⏸️ Non testé

---

## FE-GC-024 : Thème Light - Guide

**Priorité:** 🟡 Moyenne
**Prérequis:** Thème = Light, Page Guide ouverte

### Étapes
1. Changer le thème à Light dans Paramètres
2. Retourner au Guide
3. Observer les couleurs

### Résultat attendu
- ✅ Fond de page : blanc/gris très clair
- ✅ Texte : noir/gris foncé
- ✅ Tableaux : bordures grises claires
- ✅ Code blocks : fond gris clair
- ✅ Bon contraste
- ✅ Changement instantané après modification du thème

**Statut:** ⏸️ Non testé

---

## FE-GC-025 : Scroll et navigation

**Priorité:** 🟡 Moyenne
**Prérequis:** Page Guide ouverte

### Étapes
1. Faire défiler la page de haut en bas
2. Observer le comportement du scroll

### Résultat attendu
- ✅ Scroll fluide sans lag
- ✅ Toutes les sections accessibles
- ✅ Navigation reste visible en haut
- ✅ Pas de contenu coupé ou caché
- ✅ Scrollbar personnalisée (violette, si implémentée)

**Statut:** ⏸️ Non testé

---

## FE-GC-026 : Lien de navigation vers Guide

**Priorité:** 🟠 Haute
**Prérequis:** Depuis une autre page

### Étapes
1. Depuis la page CodeEditor ou Examples
2. Cliquer sur "Guide" dans la navigation
3. Observer le chargement

### Résultat attendu
- ✅ Navigation vers /guide
- ✅ Page se charge correctement
- ✅ "Guide" est surligné dans la nav
- ✅ Transition fluide
- ✅ URL change vers /guide

**Statut:** ⏸️ Non testé

---

## FE-GC-027 : Page Cours (si implémentée)

**Priorité:** 🔵 Basse
**Prérequis:** Page Cours accessible

### Étapes
1. Cliquer sur "Cours" dans la navigation
2. Observer le contenu

### Résultat attendu
- ✅ Page se charge sans erreur
- ✅ Contenu de cours visible
- ✅ Structure similaire au Guide
- ✅ Thème appliqué correctement
- ✅ Navigation fonctionne

**Statut:** ⏸️ Non testé

---

## FE-GC-028 : Responsive - Mobile

**Priorité:** 🔵 Basse
**Prérequis:** Page Guide, viewport mobile (<640px)

### Étapes
1. Réduire la fenêtre à taille mobile
2. Observer la mise en page

### Résultat attendu
- ✅ Contenu s'adapte à la largeur
- ✅ Tableaux scrollables horizontalement si nécessaires
- ✅ Code blocks lisibles
- ✅ Texte ne déborde pas
- ✅ Navigation adaptée (burger menu si implémenté)

**Statut:** ⏸️ Non testé

---

## FE-GC-029 : Performance - Chargement

**Priorité:** 🔵 Basse
**Prérequis:** Application démarrée

### Étapes
1. Mesurer le temps de chargement initial du Guide
2. Utiliser DevTools > Network

### Résultat attendu
- ✅ Chargement < 2 secondes
- ✅ Pas de freeze de l'UI
- ✅ Contenu s'affiche progressivement
- ✅ Pas de requêtes réseau inutiles

**Statut:** ⏸️ Non testé

---

## FE-GC-030 : Copier-coller des exemples de code

**Priorité:** 🟡 Moyenne
**Prérequis:** Page Guide avec exemples

### Étapes
1. Sélectionner un exemple de code complet
2. Copier (Ctrl+C)
3. Aller dans l'éditeur
4. Coller (Ctrl+V)
5. Exécuter

### Résultat attendu
- ✅ Code se copie correctement
- ✅ Pas de caractères parasites
- ✅ Indentation préservée
- ✅ Code collé dans l'éditeur fonctionne
- ✅ Peut être exécuté sans modification

**Statut:** ⏸️ Non testé

---

## Résumé des tests Guide & Cours

| Priorité | Total | ⏸️ Non testé | ✅ Passé | ❌ Échoué | ⚠️ Bloqué |
|----------|-------|--------------|----------|-----------|-----------|
| 🔴 Critique | 4 | 4 | 0 | 0 | 0 |
| 🟠 Haute | 8 | 8 | 0 | 0 | 0 |
| 🟡 Moyenne | 14 | 14 | 0 | 0 | 0 |
| 🔵 Basse | 4 | 4 | 0 | 0 | 0 |
| **TOTAL** | **30** | **30** | **0** | **0** | **0** |

---

**Testeur:** _____________________
**Date:** _____________________
**Version:** _____________________
