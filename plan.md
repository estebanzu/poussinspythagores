# Plan de développement – Poussins Pythagorés

## Phase 6 – Refonte technique et modularisation
> Objectif : rendre le codebase maintenable et extensible

| # | Tâche | Priorité | Effort |
|---|-------|----------|--------|
| 6.1 | Découper index.html en modules JS séparés (game engine, analytics, companions, accessibility) | Haute | Gros |
| 6.2 | Ajouter un build step (Vite) avec Tree-shaking et minification | Haute | Moyen |
| 6.3 | Migrer le CSS inline vers Tailwind JIT + CSS custom | Moyenne | Moyen |
| 6.4 | Écrire des tests unitaires (Vitest) pour game engine et adaptive learning | Haute | Moyen |
| 6.5 | Ajouter ESLint + Prettier pour la cohérence de code | Basse | Petit |
| 6.6 | Ajouter TypeScript (types partiels) pour les états et générateurs | Basse | Gros |

## Phase 7 – Contenu éducatif élargi
> Objectif : couvrir le programme complet de CP + anticiper le CE1

| # | Tâche | Priorité | Effort |
|---|-------|----------|--------|
| 7.1 | Ajouter 4 jeux de calcul mental (addition rapide, soustraction rapide) | Haute | Moyen |
| 7.2 | Ajouter 3 jeux de numération (compter jusqu'à 100, decomposer en dizaines/unities) | Haute | Moyen |
| 7.3 | Ajouter 2 jeux de logique (séquences, analogies simples) | Moyenne | Moyen |
| 7.4 | Créer 2 nouvelles quêtes narratives (règle de 3, résolution de problèmes) | Moyenne | Gros |
| 7.5 | Ajouter des images/illustrations pour chaque type d'exercice | Basse | Gros |
| 7.6 | Implémenter un système de « leçon » avant les quiz (explication interactive) | Basse | Gros |

## Phase 8 – Gamification avancée
> Objectif : motiver la progression à long terme

| # | Tâche | Priorité | Effort |
|---|-------|----------|--------|
| 8.1 | Système de streaks quotidiens (jours consécutifs de jeu) | Haute | Moyen |
| 8.2 | Tableau de bord local top scores (frères/sœurs/amis) | Moyenne | Moyen |
| 8.3 | Système de récompenses temporelles (défis du jour, défis hebdo) | Moyenne | Moyen |
| 8.4 | Boutique d'accessoires pour compagnon (achats avec étoiles) | Basse | Gros |
| 8.5 | Quêtes secondaires (mini-défis bonus hors parcours principal) | Basse | Moyen |
| 8.6 | Système de niveaux global (barre XP au-delà des étoiles) | Basse | Moyen |

## Phase 9 – Accessibilité et expérience utilisateur
> Objectif : rendre l'app accessible à tous les enfants

| # | Tâche | Priorité | Effort |
|---|-------|----------|--------|
| 9.1 | Reconnaissance vocale pour répondre aux exercices | Haute | Gros |
| 9.2 | Mode daltonien (patterns en plus des couleurs) | Moyenne | Moyen |
| 9.3 | Ajustement de la taille du texte (3 niveaux) | Moyenne | Petit |
| 9.4 | Support tactile amélioré (haptique, drag-and-drop sur tactile) | Basse | Moyen |
| 9.5 | Mode paysage forcé pour iPad | Basse | Petit |
| 9.6 | Audit WCAG 2.1 AA complet + corrections | Moyenne | Gros |

## Phase 10 – Sécurité et confidentialité
> Objectif : protéger les données des enfants (COPPA)

| # | Tâche | Priorité | Effort |
|---|-------|----------|--------|
| 10.1 | Chiffrer les données localStorage (AES via Web Crypto API) | Haute | Moyen |
| 10.2 | Politique de confidentialité affichée dans l'app | Haute | Petit |
| 10.3 | Consentement parental avant collecte de données | Moyenne | Moyen |
| 10.4 | Content Security Policy (CSP) stricte dans vercel.json | Haute | Petit |
| 10.5 | Validation/sanitisation des entrées pour prévenir XSS | Haute | Moyen |
| 10.6 | Audit de dépendances (npm audit) automatique en CI | Basse | Petit |

## Phase 11 – Multilingue et internationalisation
> Objectif : ouvrir l'app à d'autres pays francophones et anglophones

| # | Tâche | Priorité | Effort |
|---|-------|----------|--------|
| 11.1 | Système de traduction (clés i18n, fichiers JSON par langue) | Haute | Gros |
| 11.2 | Langues : français (défaut), anglais, espagnol | Moyenne | Moyen |
| 11.3 | Localisation des nombres et formats (virgule vs point) | Basse | Moyen |
| 11.4 | Drapeau sélecteur de langue dans l'interface | Basse | Petit |

## Phase 12 – Déploiement et infrastructure
> Objectif : production fiable et scalable

| # | Tâche | Priorité | Effort |
|---|-------|----------|--------|
| 12.1 | Migration vers Supabase (auth + DB) pour persistance cross-device | Haute | Gros |
| 12.2 | Système de login enfant (avatar + prénom, pas de mot de passe) | Moyenne | Moyen |
| 12.3 | Sync cloud des scores et badges | Moyenne | Moyen |
| 12.4 | Dashboard enseignant en ligne (plusieurs classes) | Basse | Gros |
| 12.5 | Analytics avancés (ML, recommandations IA) | Basse | Très gros |
| 12.6 | CI/CD GitHub Actions (lint, test, deploy automatique) | Moyenne | Moyen |

---

## Ordre de priorité recommandé

```
Phase 6 (modularisation)     ← maintenant
Phase 7 (contenu)            ← ensuite
Phase 10 (sécurité)          ← parallèle
Phase 8 (gamification)       ← après contenu
Phase 9 (accessibilité)      ← après gamification
Phase 11 (i18n)              ← quand le contenu est stable
Phase 12 (infrastructure)    ← quand l'app est prête pour plusieurs utilisateurs
```
