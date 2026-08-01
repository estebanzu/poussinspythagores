# Guide de Contribution pour Poussins Pythagorés

Bonjour et merci de votre intérêt pour Poussins Pythagorés ! 🎉

Toute contribution, qu'elle soit grande ou petite, est la bienvenue. Ce guide a pour but de vous aider à démarrer et de vous présenter les domaines où votre aide serait la plus précieuse.

## 🎯 Contexte du projet

Poussins Pythagorés est une application éducative pour les enfants de 6-7 ans. Actuellement, le projet est un **monolithe** : la quasi-totalité du code (UI, logique de jeu, état) se trouve dans un unique fichier `index.html`.

Nous entrons dans une **phase de refonte technique (Phase 6)** cruciale pour rendre le projet plus maintenable, testable et évolutif. C'est le meilleur endroit pour commencer à contribuer !

---

## 🚀 Axes de Contribution Prioritaires (Phase 6)

Si vous cherchez où aider, voici les tâches les plus importantes sur lesquelles nous nous concentrons. Elles sont tirées de notre plan de développement.

### 1. Modularisation du code JavaScript (Priorité Haute)

**Objectif :** Découper le script massif de `index.html` en modules ES6 plus petits et logiques.

- **Tâche :** Extraire des fonctionnalités spécifiques dans leurs propres fichiers.
- **Exemples de modules à créer :**
  - `src/gameEngine.js` : pour les fonctions `generateExercise`, `checkAnswer`, etc.
  - `src/state.js` : pour la gestion des objets `state`, `multiplayerState`, `questState`.
  - `src/ui.js` : pour les fonctions qui manipulent le DOM (ex: `updateStarsUI`, `showToast`).
  - `src/analytics.js` : pour la logique du tableau de bord parental.
  - `src/companion.js` : pour le système de compagnons.

### 2. Mise en place d'un processus de build (Priorité Haute)

**Objectif :** Intégrer Vite pour gérer les modules, optimiser les assets et améliorer l'expérience de développement.

- **Tâche :** Configurer `vite.config.js`, ajuster les chemins dans `index.html` et mettre à jour les scripts `package.json` (`dev`, `build`, `preview`).

### 3. Écriture de tests unitaires (Priorité Haute)

**Objectif :** Assurer la stabilité du code et prévenir les régressions.

- **Tâche :** Ajouter des tests avec Vitest pour les parties critiques de la logique.
- **Cibles prioritaires :**
  - Le moteur de difficulté adaptative (`getAdaptiveThreshold`, `recordAnswer`).
  - Les générateurs d'exercices (tester si les réponses correctes sont bien générées).
  - La logique de scoring et de déblocage des badges.

---

## 📝 Processus de Contribution

1.  **Forkez** le dépôt sur votre compte GitHub.
2.  **Clonez** votre fork sur votre machine locale.
3.  **Créez une branche** pour votre modification : `git checkout -b feature/ma-super-feature`.
4.  **Effectuez vos modifications**. Essayez de garder les commits atomiques et clairs.
5.  **Poussez** votre branche vers votre fork : `git push origin feature/ma-super-feature`.
6.  **Ouvrez une Pull Request** depuis votre fork vers la branche `main` du dépôt principal.

Décrivez clairement les changements que vous avez apportés dans la PR. Si elle résout une tâche du `plan.md`, n'hésitez pas à le mentionner !

## 🎨 Style de Code

Le projet utilise **JavaScript Vanilla** et **Tailwind CSS**. Une configuration **ESLint + Prettier** sera bientôt ajoutée (Tâche 6.5). En attendant, merci de respecter le style de code existant pour la cohérence.

---

Merci encore pour votre aide ! Ensemble, nous pouvons faire de Poussins Pythagorés un outil d'apprentissage encore meilleur.
