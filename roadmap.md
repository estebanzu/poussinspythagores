# Roadmap – Poussins Pythagorés

> Dernière mise à jour : 27 juillet 2026
> Application déployée : https://poussinspythagores.vercel.app

---

## Phase 1 – Fondations ✅
- [x] Structure PWA (single-file HTML + JS, manifest, service worker)
- [x] Interface colorée et adulte-amicale (font Fredoka, boutons larges, animations de victoire)
- [x] Système de difficulté adaptative (facile / normal / challenge) intégré aux générateurs
- [x] Gamification de base — compteur d'étoiles, badges unlockables

## Phase 2 – Améliorations UX & Contenu ✅
- [x] Vérification du passage automatique de la difficulté (tests UI, seuil de 3 victoires/échecs)
- [x] Messages motivants dynamiques dans le footer
- [x] Extension du catalogue de jeux : nombres, formes, monnaie, heures, vocabulaire spatial
- [x] Système de points et de gains de badges jusqu'à 100 points
- [x] Limite de jeu d'une heure avec blocage de 30 minutes (contrôle parental)

## Phase 3 – Fonctionnalités avancées ✅
- [x] Mode multijoueur local (tour par tour sur le même iPad)
- [x] Tableaux de scores et match history stockée localement
- [x] Contenu additionnel : fractions, mesures, addition/soustraction simples
- [x] Accessibilité : support voix-off (lecture automatique), contraste élevé

## Phase 4 – Publication & Distribution ✅
- [x] Publication du PWA sur serveur sécurisé (HTTPS)
- [x] Compatibilité multi-appareils (phone, iPad, PC)
- [x] Déploiement continu vers Vercel (Fichier vercel.json configuré)
- [x] Documentation d'utilisation pour les enseignants et parents
- [x] Pack de ressources (icônes, manifeste PWA)

## Phase 5 – Feature Expansion ✅
- [x] Adaptive learning paths (per-game stats, response-time-aware thresholds, persistent difficulty)
- [x] Visual manipulatives (fraction bars, base-ten blocks, interactive shapes)
- [x] Curriculum-aligned quests & narrative-driven storylines (3 aventures)
- [x] Low-stakes competition : local multiplayer with match history
- [x] Init loading animation (splash screen with branding)
- [x] Ad-free environment
- [x] Enhanced accessibility (screen-reader, high-contrast, voice narration)
- [x] Learning analytics dashboard for parents/teachers
- [x] Customizable avatars / virtual companions that evolve with stars (5 animaux × 5 étapes)
- [x] Gamified quest system with story-driven chapters
- [x] Dynamic difficulty engine using performance trends
- [x] Audio narration & sound effects (TTS, feedback sounds)
- [x] Mini-games & interactive puzzles (drag-and-drop, matching)

---

## Phase 6 – Refonte technique 🔜 (en cours)
- [ ] Découper index.html en modules JS séparés
- [ ] Ajouter un build step (Vite) avec Tree-shaking
- [ ] Tests unitaires (Vitest) pour game engine et adaptive learning
- [ ] ESLint + Prettier pour la cohérence de code

## Phase 7 – Contenu éducatif élargi ⬜
- [ ] 4 jeux de calcul mental supplémentaires
- [ ] 3 jeux de numération (compter jusqu'à 100, decomposer dizaines/unités)
- [ ] 2 jeux de logique (séquences, analogies)
- [ ] 2 nouvelles quêtes narratives
- [ ] Système de « leçon » interactive avant les quiz

## Phase 8 – Gamification avancée ⬜
- [ ] Streaks quotidiens (jours consécutifs de jeu)
- [ ] Bonus streak : trésor offert tous les 3 jours consécutifs de jeu
- [ ] Tableau de bord local top scores
- [ ] Défis du jour et défis hebdomadaires
- [ ] Boutique d'accessoires pour compagnon
- [ ] Niveaux globaux (barre XP au-delà des étoiles)
- [ ] Minuteur par question (15-30s selon difficulté, visuel animé)
- [ ] Système de vies (3 cœurs, perte par erreur ou timeout)
- [ ] Score de performance composite (70% précision + 30% rapidité, rang 1-5)
- [ ] Récompenses classées par rang (CRUD parent, 5 niveaux de performance)
- [ ] Tâches pénalité amusantes (CRUD parent : jumping jacks, chant, danse...)
- [ ] Carnet de stickers permanent (1 sticker thémé par bonne réponse, collection visible)
- [ ] Trésors nommés pour fin de quête (Clé Dorée, Gemme Arc-en-ciel, Couronne Royale... 18 trésors uniques)
- [ ] Vue « Ma Collection » (stickers par thème + trésors nommés, page dédiée)
- [ ] Détection de plafond/plancher de difficulté par compétence (compétence la plus faible fixe le plafond pour tout le contenu)

## Phase 9 – Accessibilité et UX ⬜
- [ ] Reconnaissance vocale pour répondre aux exercices
- [ ] Mode daltonien (patterns en plus des couleurs)
- [ ] Ajustement de la taille du texte
- [ ] Audit WCAG 2.1 AA complet
- [ ] Bouton « Annuler » pendant une partie en cours
- [ ] Compte à rebours de passation multijoueur (5s, animation « Passe l'appareil ! »)
- [ ] Nombre configurable de questions par manche (5/10/15/20)
- [ ] Barre de progression pendant le jeu (« Question 3/10 »)
- [ ] Adaptation des animations selon les performances de l'appareil
- [ ] Système de secondes chances (indice après 1ère erreur, révélation après 2ème échec uniquement)
- [ ] Faits « Le savais-tu ? » après chaque bonne réponse (sciences, animaux, géographie... 1 niveau au-dessus, jamais répétés)
- [ ] Déduplication des faits affichés (localStorage, même fait jamais revoir)
- [ ] Sélection de thème par session (licornes, dinosaures, espace, chats, dauphins... visuel + pool de stickers)
- [ ] Carte d'îles de compétences / Parcours d'apprentissage visuel (Terre des Nombres, Monde des Mots, Grand Monde — statut : nouveau/appris/maitrisé)

## Phase 10 – Sécurité et confidentialité ⬜
- [ ] Chiffrement des données localStorage (Web Crypto API)
- [ ] Politique de confidentialité affichée dans l'app
- [ ] Consentement parental avant collecte de données
- [ ] Content Security Policy (CSP) stricte
- [ ] Validation/sanitisation des entrées (XSS)
- [ ] Audit de dépendances (npm audit) en CI

## Phase 11 – Multilingue ⬜
- [ ] Système de traduction (clés i18n, JSON par langue)
- [ ] Langues : français, anglais, espagnol
- [ ] Localisation des nombres et formats

## Phase 12 – Infrastructure ⬜
- [ ] Migration vers Supabase (auth + DB) pour persistance cross-device
- [ ] Système de login enfant (avatar + prénom)
- [ ] Sync cloud des scores et badges
- [ ] CI/CD GitHub Actions (lint, test, deploy)

---

*Ce roadmap est vivant — les phases avancent au rythme du développement.*
