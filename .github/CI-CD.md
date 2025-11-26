# CI/CD - AlgoGenie

Ce projet utilise GitHub Actions pour automatiser les builds et releases pour Linux et Windows.

## Workflows Disponibles

### 1. Build automatique (build.yml)

Se declenche sur:
- Push sur main ou develop
- Pull Request vers main
- Creation d'une release

Ce qu'il fait:
- Compile le frontend (React + Vite)
- Compile le backend (Rust + Tauri)
- Genere les installateurs:
  - Linux: .deb (Debian/Ubuntu)
  - Windows: .msi (installateur)
- Lance les tests
- Upload les artifacts

Temps d'execution estime: 15-20 minutes

### 2. Release automatique (release.yml)

Se declenche sur:
- Push d'un tag version (ex: v1.0.0)

Ce qu'il fait:
- Cree une branche release orpheline (vide)
- Cree automatiquement une release GitHub sur cette branche
- Compile pour Linux et Windows
- Upload les installateurs dans la release
- Met a jour le tag latest pour pointer vers cette release
- Genere les notes de version

Temps d'execution estime: 20-25 minutes

Architecture:
- Branche main: Code source
- Branche release: Contient uniquement les releases (branche orpheline)
- Tag latest: Pointe toujours vers la derniere version
- Tags vX.X.X: Pointent vers chaque version specifique

## Comment utiliser

### Build automatique (a chaque commit)

Simplement push ton code:

```bash
git add .
git commit -m "Nouvelle fonctionnalite"
git push origin main
```

GitHub Actions demarre automatiquement le build.
Tu peux voir la progression dans l'onglet Actions de ton repo.

### Creer une nouvelle release

Etape 1: Mettre a jour la version

```bash
# Dans package.json
{
  "version": "1.2.0"
}

# Dans src-tauri/Cargo.toml
[package]
version = "1.2.0"

# Dans src-tauri/tauri.conf.json
{
  "package": {
    "version": "1.2.0"
  }
}
```

Etape 2: Commit et tag

```bash
git add .
git commit -m "Release v1.2.0"
git tag v1.2.0
git push origin main
git push origin v1.2.0
```

GitHub Actions cree automatiquement:
- La branche release avec un README minimal
- La release GitHub avec les binaries
- Le tag latest qui pointe vers cette version

---

## 📦 Artifacts générés

### **Linux**
- **Format**: `.deb` (Debian package)
- **Architecture**: x86_64 (AMD64)
- **Installation**: `sudo dpkg -i algogenie_*.deb`

### **Windows**
- **Format**: `.msi` (Windows Installer)
- **Architecture**: x86_64 (64-bit)
- **Installation**: Double-clic sur le fichier

---

## 🔍 Voir les builds

1. Va sur ton repo GitHub
2. Clique sur l'onglet **"Actions"**
3. Tu verras tous les workflows en cours ou terminés
4. Clique sur un workflow pour voir les détails et télécharger les artifacts

---

## ⚙️ Configuration requise

### **Secrets GitHub** (déjà configurés automatiquement)
- `GITHUB_TOKEN` : Token automatique fourni par GitHub

### **Prérequis pour Linux** (installés automatiquement)
```bash
libgtk-3-dev
libwebkit2gtk-4.0-dev
libappindicator3-dev
librsvg2-dev
patchelf
```

### **Prérequis pour Windows** (inclus dans runner)
- Visual Studio Build Tools
- Windows SDK

---

## 🐛 Déboguer un build échoué

### Si le build Linux échoue :

1. Vérifie les dépendances système dans `build.yml`
2. Assure-toi que Tauri compile en local : `pnpm tauri build`
3. Regarde les logs dans l'onglet Actions

### Si le build Windows échoue :

1. Vérifie la version de Rust : `rustc --version`
2. Assure-toi que le target est installé : `rustup target add x86_64-pc-windows-msvc`
3. Teste localement avec : `pnpm tauri build --target x86_64-pc-windows-msvc`

---

## 📊 Statut du build

Tu peux ajouter un badge dans ton README :

```markdown
![Build Status](https://github.com/TON_USERNAME/algo-practice/actions/workflows/build.yml/badge.svg)
```

---

## 🚀 Améliorations futures possibles

- [ ] Build pour **macOS** (nécessite un runner macOS)
- [ ] Build pour **Linux AppImage** (portable)
- [ ] Tests automatisés plus complets
- [ ] Signature des binaires (code signing)
- [ ] Upload automatique vers un site web
- [ ] Notifications Discord/Slack en cas d'échec

---

## 📝 Notes importantes

1. **Première fois** : Le premier build peut prendre 30-40 min (téléchargement des dépendances)
2. **Builds suivants** : Plus rapides grâce au cache (~15-20 min)
3. **Quotas GitHub Actions** :
   - Gratuit : 2000 minutes/mois pour repos publics
   - Privé : 2000 minutes/mois pour comptes gratuits

4. **Taille des artifacts** :
   - Linux .deb : ~80-100 MB
   - Windows .msi : ~100-120 MB

---

## 🤝 Contribution

Si tu veux améliorer les workflows CI/CD :

1. Édite les fichiers dans `.github/workflows/`
2. Teste en créant une branche : `git checkout -b test-ci`
3. Push et regarde le résultat dans Actions
4. Si ça marche, merge dans main

---

## 📞 Support

En cas de problème avec les workflows :
1. Vérifie les logs dans l'onglet Actions
2. Consulte la [documentation Tauri](https://tauri.app/v1/guides/building/)
3. Consulte la [documentation GitHub Actions](https://docs.github.com/en/actions)
