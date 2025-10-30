# Tests de Robustesse - AlgoGénie

Ce document explique comment tester les fonctionnalités de robustesse implémentées dans AlgoGénie.

## 1. Timeout d'Exécution (30 secondes)

### Fonctionnalité
L'interpréteur arrête automatiquement l'exécution après 30 secondes pour éviter que l'application freeze avec des boucles infinies.

### Comment tester

1. Ouvrir l'application AlgoGénie
2. Charger le fichier `TEST_TIMEOUT.algo` (ou copier ce code) :

```
Algorithme TestBoucleInfinie
Variables i : Entier

Debut
  i <- 0

  // Cette boucle va tourner infiniment
  // Le timeout devrait l'arrêter après 30 secondes
  TantQue Vrai Faire
    i <- i + 1
  FinTantQue

  Ecrire("Ce message ne s'affichera jamais\n")
Fin
```

3. Cliquer sur "Exécuter" (ou Ctrl+Enter)
4. Attendre environ 30 secondes
5. **Résultat attendu** : Un message d'erreur apparaît :
   ```
   Erreur ligne X: Temps d'exécution maximal dépassé (30s). Boucle infinie possible ?
   ```

### Autres algorithmes à tester

**Boucle Pour excessive :**
```
Algorithme BoucleTresLongue
Variables i : Entier

Debut
  Pour i De 1 A 999999999 Faire
    // Rien
  FinPour
Fin
```

**Boucles imbriquées :**
```
Algorithme BouclesImbriqueesInfinies
Variables i, j : Entier

Debut
  i <- 0
  TantQue i < 1000000 Faire
    j <- 0
    TantQue j < 1000000 Faire
      j <- j + 1
    FinTantQue
    i <- i + 1
  FinTantQue
Fin
```

---

## 2. Error Boundary React

### Fonctionnalité
L'Error Boundary capture toutes les erreurs React non gérées et affiche une page d'erreur élégante au lieu d'un écran blanc.

### Comment tester

**Note :** Les Error Boundaries ne capturent PAS :
- Les erreurs dans les gestionnaires d'événements
- Les erreurs asynchrones (async/await)
- Les erreurs côté serveur (Rust/Tauri)

Elles capturent :
- Les erreurs de rendu des composants
- Les erreurs dans les lifecycle methods
- Les erreurs dans les constructeurs

### Test manuel (pour développeurs)

Pour forcer une erreur React et tester l'Error Boundary :

1. Modifier temporairement un composant pour qu'il lance une erreur :

```tsx
// Dans src/pages/Interpreter.tsx (ou n'importe quel composant)
export default function Interpreter() {
  // Ajouter cette ligne pour forcer une erreur
  throw new Error("Test de l'Error Boundary");

  return (
    // ... reste du composant
  );
}
```

2. Recharger la page
3. **Résultat attendu** : Au lieu d'un écran blanc, une page d'erreur s'affiche avec :
   - Un message explicatif
   - Le message d'erreur
   - Un bouton "Réessayer"
   - Un bouton "Retour à l'accueil"
   - Les détails techniques (stack trace) en mode repliable

4. Cliquer sur "Réessayer" ou "Retour à l'accueil" pour récupérer

5. **Ne pas oublier de retirer le `throw` de test après !**

---

## 3. Vérification Automatique

### Tests Rust (à implémenter)

```bash
# Dans le dossier src-tauri
cargo test
```

### Tests Frontend (à implémenter)

```bash
# Dans le dossier racine
pnpm test
```

---

## 4. Performances du Timeout

### Détails techniques

- Le timeout vérifie le temps écoulé **tous les 1000 opérations**
- Cela évite un overhead de performance tout en détectant rapidement les boucles infinies
- Le compteur d'opérations est incrémenté à chaque `execute_statement()`

### Configuration

Le timeout est défini dans `src-tauri/src/interpreter.rs` :

```rust
max_execution_time: Duration::from_secs(30)
```

Pour modifier la durée, changer la valeur `30` par le nombre de secondes souhaité.

---

## 5. Résumé des Protections

| Protection | Détecte | Action |
|-----------|---------|--------|
| **Timeout** | Boucles infinies, algorithmes très longs | Arrête l'exécution après 30s |
| **Error Boundary** | Erreurs React non gérées | Affiche page d'erreur + option récupération |
| **Validation fichiers** | Fichiers malformés (à implémenter) | Refuse le chargement |
| **Sandbox Tauri** | Accès système non autorisé | Limite les permissions |

---

## 6. Prochaines Améliorations

- [ ] Ajouter un indicateur de progression pendant l'exécution
- [ ] Permettre à l'utilisateur d'annuler l'exécution manuellement
- [ ] Configurer le timeout dans les paramètres
- [ ] Ajouter des tests automatisés
- [ ] Logger les erreurs pour diagnostic
- [ ] Ajouter validation des fichiers .algo avant parsing

---

## Contact

Si vous rencontrez des problèmes de robustesse non couverts, veuillez créer un issue sur le repo GitHub avec :
- Le code de l'algorithme
- Les étapes pour reproduire
- Le message d'erreur exact
- Votre système d'exploitation
