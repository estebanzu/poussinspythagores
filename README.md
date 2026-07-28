# Poussins Pythagorés 🌟

!Licence : MIT
!Déploiement Vercel

**Poussins Pythagorés** est une Progressive Web App (PWA) éducative, en français, conçue pour les enfants de 6 à 7 ans (niveau CP). Elle vise à rendre l'apprentissage des mathématiques amusant et engageant à travers une série de jeux, de quêtes et de défis adaptatifs. L'application est optimisée pour **iPad** et est entièrement fonctionnelle **hors ligne**.

---

## ✨ Démo en direct

Vous pouvez essayer l'application en direct à l'adresse suivante :
**https://poussinspythagores.vercel.app**

*(N'hésitez pas à l'ajouter à votre écran d'accueil sur n'importe quel appareil !)*

---

## 🚀 Fonctionnalités clés

- **📚 Contenu aligné sur le programme scolaire** : Couvre le programme de CP en mathématiques, incluant :
  - **Nombres & Calculs** : Compter jusqu'à 100, additions, soustractions, doubles/moitiés, compléments à 10 et une introduction aux fractions.
  - **Espace & Géométrie** : Reconnaître les formes et comprendre le vocabulaire spatial.
  - **Grandeurs & Mesures** : Utiliser la monnaie (€), lire l'heure et mesurer avec une règle.
- **🧠 Difficulté adaptative** : Un moteur dynamique qui ajuste la difficulté des exercices (Facile 🟢, Normal 🔵, Défi 🔥) en fonction des performances de l'enfant pour le garder engagé et motivé.
- **🎮 Plusieurs modes de jeu** :
  - **Mode Solo** : S'entraîner sur n'importe quel jeu à son propre rythme.
  - **Mode Défis** : Un défi local en tour par tour pour deux joueurs sur le même appareil.
  - **Mode Quêtes** : Des aventures narratives où l'enfant aide un compagnon en résolvant des problèmes de maths.
- **🏆 Gamification & Récompenses** :
  - Collectionner des étoiles pour les bonnes réponses.
  - Débloquer 7 badges de réussite à différents paliers d'étoiles.
  - Choisir un adorable **Compagnon** (🦉, 🐿️, 🦁, 🐬, 🦄) qui évolue en même temps que le nombre d'étoiles collectées.
- **📊 Tableau de bord parental** : Un tableau de bord analytique pour les parents et enseignants afin de suivre les progrès, identifier les points à améliorer et voir l'historique des sessions.
- **⏱️ Contrôle parental** : Une limite de temps de jeu intégrée (60 minutes) suivie d'une pause obligatoire (30 minutes) pour encourager de saines habitudes, avec une option de déverrouillage pour les parents.
- **🌐 PWA & Hors-ligne** : Installable sur n'importe quel appareil (en particulier l'iPad) pour une expérience d'application native. Fonctionne entièrement hors ligne grâce à un Service Worker dédié.
- **♿ Accessibilité** : Fonctionnalités comme la lecture automatique des questions (synthèse vocale) et un mode sombre à contraste élevé.

---

## 🛠️ Stack technique

| Couche | Technologie | Description |
|---|---|---|
| **Frontend** | HTML, JavaScript Vanilla | Une application single-page (`index.html`) contenant toute l'interface, la logique et les moteurs de jeu. |
| **Style** | Tailwind CSS (via CDN) | Pour un développement d'interface rapide et utilitaire. |
| **Backend** | Node.js + Express | Un serveur minimal pour servir les fichiers statiques et fournir une simple route d'API. |
| **Stockage** | `localStorage` | Toutes les données utilisateur (progrès, paramètres, stats) sont persistées côté client. |
| **PWA** | Service Worker, Manifest | Permet la fonctionnalité hors ligne et l'installation sur l'écran d'accueil. |
| **Audio** | Web Audio API, SpeechSynthesis | Pour les effets sonores et la narration par synthèse vocale. |
| **Déploiement** | Vercel | Déploiement continu depuis la branche `main`. |

---

## 📂 Structure du projet

Le projet est actuellement un monolithe, avec la majorité de la logique contenue dans `index.html`.

```
poussins-pythagores/
├── public/
│   ├── logo.png              # Icône de l'application
│   └── service-worker.js     # Logique hors-ligne de la PWA
├── src/
│   └── supabase.js           # Client Supabase (pour la télémétrie)
├── test/
│   └── server.test.js        # Tests de base pour le serveur
├── .env                      # Variables d'environnement (ignoré par git)
├── .gitignore
├── architecture.md           # Vue d'ensemble de l'architecture technique
├── documentation.md          # Guide utilisateur pour parents/enseignants
├── index.html                # L'application single-page complète
├── package.json              # Dépendances et scripts du projet
├── plan.md                   # Plan de développement pour les phases futures
├── README.md                 # Ce fichier
└── server.js                 # Serveur Express.js
```

---

## ⚙️ Développement local

Pour lancer le projet sur votre machine locale :

1.  **Clonez le dépôt :**
    ```bash
    git clone https://github.com/votre-pseudo/poussins-pythagores.git
    cd poussins-pythagores
    ```

2.  **Installez les dépendances :**
    ```bash
    npm install
    ```

3.  **(Optionnel) Créez un fichier d'environnement :**
    Créez un fichier `.env` à la racine et ajoutez vos identifiants Supabase si vous souhaitez utiliser la télémétrie.
    ```
    SUPABASE_URL=votre_url_supabase
    SUPABASE_ANON_KEY=votre_cle_anon_supabase
    ```

4.  **Lancez le serveur de développement :**
    ```bash
    npm run dev
    ```
    L'application sera disponible à l'adresse `http://localhost:3000`.

---

## 📲 Installation PWA (iPad/Mobile)

L'application est conçue pour être installée sur l'écran d'accueil d'un appareil pour une expérience plein écran et hors ligne.

**Sur un iPad ou iPhone (avec Safari) :**
1.  Naviguez vers l'URL de l'application : `https://poussinspythagores.vercel.app`.
2.  Appuyez sur l'icône "Partager" (un carré avec une flèche vers le haut).
3.  Faites défiler vers le bas et sélectionnez **"Sur l'écran d'accueil"**.
4.  Confirmez le nom et appuyez sur "Ajouter".

L'icône de l'application apparaîtra sur votre écran d'accueil et pourra être lancée comme une application native, même sans connexion internet.

---

## 🗺️ Feuille de route (Roadmap)

Ce projet est en développement actif. La prochaine phase majeure (**Phase 6**) est une refonte technique visant à améliorer la maintenabilité et l'évolutivité.

-   [ ] **Modulariser `index.html`** : Découper le script massif en modules JS séparés (ex: `gameEngine.js`, `ui.js`, `state.js`).
-   [ ] **Introduire une étape de build** : Intégrer Vite pour le bundling, le tree-shaking et la minification.
-   [ ] **Ajouter des tests unitaires** : Écrire des tests pour le moteur de jeu et la logique d'apprentissage adaptatif avec Vitest.
-   [ ] **Étendre le contenu** : Ajouter plus de jeux pour le calcul mental, la logique et la numération.

Pour un plan détaillé, consultez le fichier plan.md.

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier LICENSE pour plus de détails.
