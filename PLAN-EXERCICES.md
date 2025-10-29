# 📝 Plan des Exercices - AlgoGénie

## Principe pédagogique

**Les exercices sont des ÉNONCÉS SEULEMENT** (pas de solutions fournies).
L'objectif est que l'élève apprenne en **pratiquant**, pas en copiant.

## Structure

Chaque exercice contient :
- ✅ Un titre clair
- ✅ Un objectif pédagogique précis
- ✅ Une description du problème
- ✅ Des indices/astuces si nécessaire
- ✅ Éventuellement des exemples d'entrées/sorties attendues
- ❌ **PAS de code solution**
- ❌ **PAS de bouton "Essayer dans l'éditeur"**

## Format d'un exercice

```typescript
'partieX-exY': {
  id: 'partieX-exY',
  title: 'Exercice Y - Titre court',
  description: 'Courte description (1 ligne)',
  content: (
    <div className="space-y-6">
      {/* En-tête avec objectif */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Exercice Y : Titre complet
        </h2>
        <p className="text-lg text-gray-700">
          <strong>🎯 Objectif :</strong> Ce que l'élève va apprendre
        </p>
      </div>

      {/* Énoncé du problème */}
      <CollapsibleSection
        title="📋 Énoncé"
        defaultOpen={true}
        icon={<FileText className="text-blue-600" size={20} />}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Description claire du problème à résoudre...
          </p>

          {/* Exemples si nécessaire */}
          <div className="bg-gray-50 border border-gray-200 p-4">
            <p className="font-semibold text-gray-900 mb-2">Exemple :</p>
            <div className="font-mono text-sm">
              <div className="text-gray-600">Entrée : 5, 10</div>
              <div className="text-green-700">Sortie : 15</div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Indices (optionnel) */}
      <CollapsibleSection
        title="💡 Indices"
        icon={<Lightbulb className="text-yellow-600" size={20} />}
      >
        <div className="space-y-2">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-900">
              <strong>Indice 1 :</strong> Premier indice discret...
            </p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-900">
              <strong>Indice 2 :</strong> Indice plus précis...
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Ce qu'on attend */}
      <div className="bg-green-50 border-l-4 border-green-500 p-6">
        <h3 className="font-bold text-green-900 mb-2">✅ Ce que votre algorithme doit faire :</h3>
        <ul className="space-y-1 text-green-800 text-sm">
          <li>• Point 1</li>
          <li>• Point 2</li>
          <li>• Point 3</li>
        </ul>
      </div>
    </div>
  ),
  // PAS DE CHAMP example !
},
```

## Répartition des exercices

### Partie 1 : Les Bases (10 exercices)
1. Hello World
2. Afficher plusieurs lignes
3. Variables et affichage
4. Calculs simples (addition, soustraction)
5. Lire une entrée utilisateur
6. Calculatrice simple (2 nombres)
7. Moyenne de 3 notes
8. Périmètre rectangle
9. Surface d'un cercle
10. Conversion température (Celsius → Fahrenheit)

### Partie 2 : Structures Conditionnelles (10 exercices)
1. Nombre positif ou négatif
2. Pair ou impair
3. Maximum de 2 nombres
4. Minimum de 3 nombres
5. Année bissextile
6. Calcul de mention (notes)
7. Tarif selon l'âge
8. Triangle valide (3 côtés)
9. Calculatrice avec choix d'opération
10. Jeu : deviner un nombre

### Partie 3 : Boucles et Tableaux (10 exercices)
1. Afficher 1 à 10
2. Table de multiplication
3. Somme de 1 à N
4. Factorielle
5. Remplir et afficher un tableau
6. Somme d'un tableau
7. Maximum dans un tableau
8. Recherche dans un tableau
9. Inverser un tableau
10. Tri à bulles (défi)

### Partie 4 : Fonctions et Procédures (10 exercices)
1. Fonction carré
2. Fonction maximum
3. Fonction estPair (booléen)
4. Fonction puissance
5. Fonction factorielle
6. Procédure afficherEtoiles
7. Fonction somme (1 à N)
8. Fonction valeur absolue
9. Procédure dessinerRectangle
10. Fibonacci (défi)

## Notes importantes

- ⚠️ Les exercices doivent être **progressifs en difficulté**
- ⚠️ Chaque exercice consolide les notions de la leçon correspondante
- ⚠️ Les "défis" (exos 10) combinent plusieurs notions
- ⚠️ Toujours donner des **exemples concrets** d'entrée/sortie
- ⚠️ Les indices sont **collapsibles** pour ne pas spoiler
