# Contexte du projet – Poussins Pythagorés

## Objectif général

Progressive Web App (PWA) éducative, entièrement en **français**, destinée aux enfants de 6‑7 ans (niveau CP). Conçue pour fonctionner sur **iPad** en tant qu'application native (installable, hors-ligne).

## Stack technique

| Couche      | Technologie                                                   |
| ----------- | ------------------------------------------------------------- |
| Frontend    | HTML + JavaScript vanilla (single-file), Tailwind CSS via CDN |
| Serveur     | Node.js + Express (`server.js`)                               |
| Déploiement | Vercel (déploiement continu via `make deploy`)                |
| Stockage    | `localStorage` (données persistantes côté client)             |
| PWA         | Service Worker (`public/service-worker.js`), manifest JSON    |
| Audio       | Web Audio API (effets sonores), SpeechSynthesis API (TTS)     |
| Design      | Typographie Fredoka, palette de couleurs brand, SVG inline    |

## Fichiers du projet

| Fichier                    | Rôle                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `index.html`               | Application complète (~4500 lignes) : UI, logique, générateurs d'exercices, gamification |
| `server.js`                | Serveur Express servant les fichiers statiques + API routes                              |
| `public/service-worker.js` | Service Worker pour le mode hors-ligne                                                   |
| `public/manifest.json`     | Manifest PWA (nom, icônes, couleurs)                                                     |
| `public/logo.png`          | Icône de l'application                                                                   |
| `Makefile`                 | Automatisation : `dev`, `deploy`, `stop`, `build`, `clean`                               |
| `vercel.json`              | Configuration de routage Vercel                                                          |
| `.env`                     | Variables d'environnement (SUPABASE_ANON_KEY, VERCEL_TOKEN) — gitignoré                  |

## Système de données (localStorage)

| Clé                            | Type   | Description                                             |
| ------------------------------ | ------ | ------------------------------------------------------- |
| `mathscp_stars`                | int    | Total cumulé d'étoiles                                  |
| `mathscp_muted`                | bool   | État du son (muet/actif)                                |
| `mathscp_unlocked_badges`      | array  | IDs des badges débloqués                                |
| `mathscp_autoplay_voice`       | bool   | Lecture vocale automatique                              |
| `mathscp_high_contrast`        | bool   | Mode contraste élevé                                    |
| `mathscp_adaptive_stats`       | object | Statistiques par jeu (précision, temps, difficulté)     |
| `mathscp_session_history`      | array  | 20 dernières sessions (date, précision, durée, étoiles) |
| `mathscp_multiplayer_history`  | array  | 10 derniers matchs multijoueur                          |
| `mathscp_playtime_accumulated` | int    | Temps de jeu cumulé (ms)                                |
| `mathscp_last_active_time`     | int    | Dernière activité (timestamp)                           |
| `mathscp_lockout_start_time`   | int    | Début de verrouillage (timestamp)                       |
| `mathscp_companion`            | object | Compagnon sélectionné (type, nom)                       |

## État actuel (27 juillet 2026)

- **Déploiement** : https://poussinspythagores.vercel.app
- **Modes de jeu** : Solo, Multijoueur local (tour par tour), Quêtes narratives (3 aventures)
- **11 jeux** : 8 dans le catalogue + 3 interactifs (quêtes)
- **3 catégories** : Nombres et Calculs, Espace et Géométrie, Grandeurs et Mesures
- **Gamification** : étoiles, 7 badges, 5 niveaux de difficulté, compagnon évolutif
- **Accessibilité** : TTS, mode contraste élevé, lecture automatique
- **Analytics** : tableau de bord parental (précision, tendances, erreurs, historique)

## Équipe

Projet personnel — un seul développeur.
