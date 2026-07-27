# Architecture technique – Poussins Pythagorés

## Vue d'ensemble
Application single-page monolithique (~4500 lignes) dans `index.html`, servie par un serveur Express minimal. Toute la logique côté client (UI, game engine, analytics) est dans un seul fichier `<script>`.

## Schéma d'architecture

```
┌─────────────────────────────────────────────────┐
│                  index.html                      │
│                                                  │
│  ┌──────────┐  ┌────────────┐  ┌──────────────┐ │
│  │   HTML   │  │   CSS      │  │  JavaScript  │ │
│  │  (UI     │  │ (Tailwind  │  │  (~3000 L)   │ │
│  │  screens │  │  + custom) │  │              │ │
│  │  modals) │  │            │  │ ┌──────────┐ │ │
│  └──────────┘  └────────────┘  │ │ State    │ │ │
│                                │ │ Manager  │ │ │
│                                │ ├──────────┤ │ │
│                                │ │ Game     │ │ │
│                                │ │ Engine   │ │ │
│                                │ ├──────────┤ │ │
│                                │ │ Adaptive │ │ │
│                                │ │ Learning │ │ │
│                                │ ├──────────┤ │ │
│                                │ │Analytics │ │ │
│                                │ │Dashboard │ │ │
│                                │ ├──────────┤ │ │
│                                │ │Companion │ │ │
│                                │ │System    │ │ │
│                                │ ├──────────┤ │ │
│                                │ │ Parental │ │ │
│                                │ │ Controls │ │ │
│                                │ ├──────────┤ │ │
│                                │ │ PWA/SW   │ │ │
│                                │ └──────────┘ │ │
│                                └──────────────┘ │
└─────────────────────────────────────────────────┘
           │                        │
    ┌──────┴──────┐         ┌──────┴──────┐
    │ localStorage│         │  Web APIs   │
    │ (persistant)│         │  (Audio,    │
    └─────────────┘         │   TTS, SW)  │
                            └─────────────┘
```

## Modules internes (dans index.html)

### 1. State Manager (lignes ~830–940)
Gestion centralisée de l'état applicatif via objets JS :
- `state` — état global (étoiles, jeu courant, difficulté, badges)
- `multiplayerState` — session multijoueur
- `questState` — session quête
- `accessibilityState` — paramètres d'accessibilité
- `adaptiveStats` — statistiques adaptatives par jeu
- `sessionHistory` — historique des sessions (20 max)
- `companionData` — compagnon sélectionné
- `playtimeState` — contrôle parental (temps)

### 2. Game Engine (lignes ~1500–2000)
- `generateExercise()` — dispatcher central vers les générateurs
- `renderOptions()` — rendu des choix multiples
- `checkAnswer()` — vérification + scoring + difficulté adaptative
- 14 générateurs de jeux (un par type d'exercice)
- 3 jeux interactifs (fractions, blocs dizaines, tri de formes)

### 3. Adaptive Learning (lignes ~870–1010)
- `recordAnswer()` — enregistre chaque réponse (correct/temps)
- `getAdaptiveThreshold()` — seuil dynamique basé sur précision + vitesse
- `computeLearningProfile()` — analyse forces/faiblesses par catégorie
- `getRecommendations()` — suggestions de jeux basées sur les performances

### 4. Companion System (lignes ~1365–1480)
- `COMPANIONS` — données de 5 compagnons × 5 étapes d'évolution (SVG inline)
- `COMPANION_STAGES` — seuils d'évolution (0, 10, 25, 50, 100 étoiles)
- `getCompanionStage()` — calcule l'étape actuelle
- `updateFooterCompanion()` — met à jour l'avatar dans le footer

### 5. Analytics Dashboard (lignes ~1140–1280)
- `renderDashboard()` — orchestre les 5 sections du tableau de bord
- `renderDashboardOverview()` — 4 cartes de stats
- `renderCategoryBreakdown()` — barres de progression par catégorie
- `renderDashboardGames()` — tableau détaillé par jeu
- `renderDashboardErrors()` — patterns d'erreurs (<60% précision)
- `renderDashboardSessions()` — historique des 10 dernières sessions

### 6. Parental Controls (lignes ~3830–3925)
- Limite de 60 minutes de jeu cumulées
- Verrouillage de 30 minutes avec compte à rebours
- Reset automatique après 30 minutes d'inactivité
- Porte parentale (addition à 2 chiffres) pour déverrouillage

### 7. Gamification (lignes ~3480–3650)
- 7 badges (seuils : 5, 10, 20, 35, 50, 75, 100 étoiles)
- Badges de quête (3 quêtes narratives)
- Système d'étoiles persistant
- Phrases de feedback en français

## Serveur (server.js)
```
Express
├── express.static('public')     → fichiers statiques
├── Helmet                       → headers sécurité
├── CORS                         → cross-origin
├── Rate Limiter                 → protection abuse
└── Routes                       → API placeholder (Supabase)
```

## Flux de données

```
Utilisateur clique réponse
  → checkAnswer()
    → recordAnswer()         → adaptiveStats (localStorage)
    → updateStarsUI()        → stars (localStorage) + checkBadgeUnlocks()
    → updateFooterCompanion()→ SVG compagnon (si étape changée)
    → renderRecommendations()→ suggestions (basées sur adaptiveStats)
```

## Déploiement

```
git push → GitHub
       → Vercel (build automatique)
       → https://poussinspythagores.vercel.app
```

Commande locale : `make deploy` (charge `.env`, utilise le token Vercel).

## Contraintes de performance
- **Single-file** : toute l'app dans index.html (~230 Ko)
- **Pas de build step** : Tailwind via CDN, pas de bundler
- **localStorage seul** : pas de base de données distante pour les données joueur
- **SVG inline** : les 5 compagnons × 5 étapes = ~250 lignes de SVG
- **Service Worker** : cache des assets pour utilisation hors-ligne
