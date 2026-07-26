# Contexte du projet – PWA Mathématiques CP

## Objectif général
Créer une Progressive Web App (PWA) éducative, complètement en **français**, destinée aux enfants de 6‑7 ans (niveau CP du système français). L’application doit fonctionner dans un **fichier unique** (HTML avec JavaScript et Tailwind via CDN) afin d’être facilement installable sur un iPad.

## État actuel (au 26 juillet 2026)
- **Fichier principal** : `index.html` contenant toute la logique du jeu, les générateurs de questions et le système de difficulté adaptative (`facile`, `normal`, `challenge`).
- **Interface** : design coloré, typographie Fredoka, boutons larges, animations de victoire (confettis) et système de badges/étoiles.
- **Gamification** : compteur d’étoiles, 7 types de badges avec persistance via `localStorage`.
- **Difficulté adaptative** : le niveau passe automatiquement après trois victoires ou échecs consécutifs.
- **PWA** : manifest et service worker déjà inclus dans le fichier unique.

## Fonctionnalités implémentées
- **Jeux** : formes, nombres, monnaie, heures, vocabulaire spatial.
- **Feedback** : messages doux en français, animations de succès, encouragements dans le pied de page.
- **Stockage** : sauvegarde du score et des badges dans le navigateur.

## Prochaines étapes (voir `roadmap.md`)
1. Vérifier manuellement le passage de difficulté et ajuster les seuils.
2. Ajouter des messages motivants dynamiques dans le footer.
3. Étendre le catalogue de jeux et implémenter le système de points jusqu’à 100 points.
4. Préparer la publication du PWA (HTTPS, documentation).

## Ressources externes consultées
- Plusieurs applications PWA éducatives pour enfants afin d’inspirer le design et les mécanismes de gamification.
- Directives d’accessibilité et bonnes pratiques UX pour les jeunes utilisateurs.

---
*Ce fichier résume la situation du projet pour permettre une reprise fluide demain.*
