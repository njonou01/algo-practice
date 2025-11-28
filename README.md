<div align="center">

# AlgoGénie

**Un interpréteur d'algorithmes en français pour l'apprentissage de la programmation**

[![Release](https://img.shields.io/github/v/release/njonou01/algo-practice?style=for-the-badge&logo=github)](https://github.com/njonou01/algo-practice/releases/latest)
[![Build](https://img.shields.io/github/actions/workflow/status/njonou01/algo-practice/release.yml?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/njonou01/algo-practice/actions)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows-lightgrey?style=for-the-badge)](https://github.com/njonou01/algo-practice/releases)

[Télécharger](https://github.com/njonou01/algo-practice/releases/latest) · [Documentation](#utilisation) · [Signaler un bug](https://github.com/njonou01/algo-practice/issues)

</div>

---

## Fonctionnalités

### Syntaxe 100% Française
Apprenez l'algorithmique avec une syntaxe entièrement en français :
- `Algorithme`, `Variables`, `DebutAlgorithme`, `FinAlgorithme`
- `Lire()`, `Ecrire()`
- `Si...Alors...Sinon`, `Pour...De...À`, `TantQue...Faire`
- `Fonction`, `Procédure`, `Structure`

### Éditeur Moderne
- **Monaco Editor** : Le même éditeur que VS Code
- **Coloration syntaxique** adaptée à la syntaxe algorithmique
- **Auto-complétion** et indentation intelligente
- **Multi-fichiers** : Gérez plusieurs algorithmes en parallèle
- **Thèmes** : Modes clair et sombre

### Exécution Interactive
- **Console en temps réel** : Visualisez les sorties instantanément
- **Entrées utilisateur** : Interagissez avec vos algorithmes via `Lire()`
- **Arrêt d'urgence** : Stoppez l'exécution à tout moment
- **Gestion d'erreurs** : Messages d'erreur clairs et précis

### Types de Données Complets
- **Primitifs** : Entier, Réel, Chaîne, Booléen, Caractère
- **Tableaux** : Mono et multidimensionnels
- **Structures** : Créez vos propres types de données
- **Enregistrements** : Structures imbriquées

### Fonctions Natives
- **Math** : `abs()`, `racine()`, `puissance()`, `min()`, `max()`
- **Random** : `aleatoire()`, `aleaEntier()`
- **DateTime** : `dateActuelle()`, `heureActuelle()`
- **Conversion** : `versEntier()`, `versReel()`, `versChaine()`

### Mises à Jour Automatiques
- Vérification automatique des nouvelles versions
- Installation en un clic depuis l'application
- Signatures cryptographiques pour la sécurité

---

## Installation

### Linux

**Debian/Ubuntu (.deb)** :
```bash
# Téléchargez le fichier .deb
wget https://github.com/njonou01/algo-practice/releases/latest/download/AlgoGenie-0.1.0-linux-amd64.deb

# Installez
sudo dpkg -i AlgoGenie-0.1.0-linux-amd64.deb
```

**Fedora/RHEL (.rpm)** :
```bash
# Téléchargez le fichier .rpm
wget https://github.com/njonou01/algo-practice/releases/latest/download/AlgoGenie-0.1.0-linux-x86_64.rpm

# Installez
sudo rpm -i AlgoGenie-0.1.0-linux-x86_64.rpm
```

**AppImage (portable)** :
```bash
# Téléchargez
wget https://github.com/njonou01/algo-practice/releases/latest/download/AlgoGenie-0.1.0-linux-amd64.AppImage

# Rendez exécutable
chmod +x AlgoGenie-0.1.0-linux-amd64.AppImage

# Lancez
./AlgoGenie-0.1.0-linux-amd64.AppImage
```

### Windows

Téléchargez l'installateur **MSI** ou **NSIS** depuis les [releases](https://github.com/njonou01/algo-practice/releases/latest) et double-cliquez pour installer.

---

## Utilisation

### Exemple Basique

```
Algorithme Bonjour
DebutAlgorithme
    Ecrire("Bonjour le monde !")
FinAlgorithme
```

### Avec Variables et Entrées

```
Algorithme CalculMoyenne
Variables
    note1, note2, moyenne : Réel
DebutAlgorithme
    Ecrire("Entrez la première note : ")
    Lire(note1)
    Ecrire("Entrez la deuxième note : ")
    Lire(note2)

    moyenne ← (note1 + note2) / 2

    Ecrire("La moyenne est : ", moyenne)
FinAlgorithme
```

### Avec Conditions

```
Algorithme Admission
Variables
    moyenne : Réel
DebutAlgorithme
    Ecrire("Entrez votre moyenne : ")
    Lire(moyenne)

    Si moyenne >= 10 Alors
        Ecrire("Admis !")
    Sinon
        Ecrire("Refusé")
    FinSi
FinAlgorithme
```

### Avec Boucles

```
Algorithme TableMultiplication
Variables
    i, nombre : Entier
DebutAlgorithme
    Ecrire("Table de multiplication de : ")
    Lire(nombre)

    Pour i De 1 À 10 Faire
        Ecrire(nombre, " x ", i, " = ", nombre * i)
    FinPour
FinAlgorithme
```

### Avec Tableaux

```
Algorithme MoyenneTableau
Variables
    notes : Tableau[5] de Réel
    i : Entier
    somme, moyenne : Réel
DebutAlgorithme
    somme ← 0

    Pour i De 0 À 4 Faire
        Ecrire("Note ", i+1, " : ")
        Lire(notes[i])
        somme ← somme + notes[i]
    FinPour

    moyenne ← somme / 5
    Ecrire("Moyenne : ", moyenne)
FinAlgorithme
```

### Avec Fonctions

```
Algorithme TestFonction
Variables
    resultat : Entier

Fonction Carre(n : Entier) : Entier
Variables
    res : Entier
DebutFonction
    res ← n * n
    Retourner res
FinFonction

DebutAlgorithme
    resultat ← Carre(5)
    Ecrire("Le carré de 5 est : ", resultat)
FinAlgorithme
```

### Avec Structures

```
Algorithme GestionEtudiant

Structure Etudiant
    nom : Chaîne
    age : Entier
    moyenne : Réel
FinStructure

Variables
    etud : Etudiant

DebutAlgorithme
    Ecrire("Nom : ")
    Lire(etud.nom)
    Ecrire("Âge : ")
    Lire(etud.age)
    Ecrire("Moyenne : ")
    Lire(etud.moyenne)

    Ecrire("Étudiant : ", etud.nom)
    Ecrire("Âge : ", etud.age, " ans")
    Ecrire("Moyenne : ", etud.moyenne, "/20")
FinAlgorithme
```

---

## Développement

### Prérequis

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 10+
- [Rust](https://www.rust-lang.org/) (dernière stable)

**Linux uniquement** :
```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file \
    libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

### Installation

```bash
# Cloner le repository
git clone https://github.com/njonou01/algo-practice.git
cd algo-practice

# Installer les dépendances
pnpm install
```

### Commandes

```bash
# Développement (mode dev avec hot-reload)
pnpm tauri dev

# Build de production
pnpm tauri build

# Linting
pnpm lint

# Tests Rust
cd src-tauri && cargo test
```

### Structure du Projet

```
algo-practice/
├── src/                      # Frontend React + TypeScript
│   ├── components/          # Composants réutilisables
│   ├── contexts/            # Contexts React (Settings, Editor)
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Pages (Editor, Settings, Guide, etc.)
│   └── utils/               # Utilitaires
├── src-tauri/               # Backend Rust
│   ├── src/
│   │   ├── lexer.rs        # Analyse lexicale
│   │   ├── parser.rs       # Analyse syntaxique
│   │   ├── interpreter.rs  # Interpréteur
│   │   └── native_functions/ # Fonctions natives
│   └── tauri.conf.json     # Configuration Tauri
└── .github/workflows/       # CI/CD GitHub Actions
```

---

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. Créez une **branche** (`git checkout -b feature/AmazingFeature`)
3. **Commitez** vos changements (`git commit -m 'Add: AmazingFeature'`)
4. **Pushez** vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une **Pull Request**

### Guidelines

- Utilisez des messages de commit clairs (préfixes : `Add:`, `Fix:`, `Update:`, `Remove:`)
- Testez votre code avant de soumettre
- Documentez les nouvelles fonctionnalités

---

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">

**Fait avec passion pour l'apprentissage de l'algorithmique**

[Retour en haut](#algogénie)

</div>
