# Roadmap – PWA Mathématiques CP

## Phases

### Phase 1 – Fondations (terminé)
- [x] Structure du PWA (single‑file HTML + JS, manifest, service worker)
- [x] Interface colorée et adulte‑amicale (font Fredoka, boutons larges, animations de victoire)
- [x] Système de difficulté adaptative (facile / normal / challenge) intégré aux générateurs de jeux
- [x] Gamification de base – compteur d’étoiles, badges unlockables

### Phase 2 – Améliorations UX & Contenu (terminé)
- [x] Vérification manuelle du passage automatique de la difficulté (tests UI, ajustement du seuil de 3 victoires/échecs consécutifs)
- [x] Ajout de messages motivants dynamiques dans le footer (succès / encouragement)
- [x] Extension du catalogue de jeux : nombres, formes, monnaie, heures, vocabulaire spatial
- [x] Implémentation d’un système de points et de gains de badges supplémentaires jusqu’à 100 points
- [x] Implémenter une limite de jeu d’une heure avec blocage de 30 minutes (contrôle parental)

### Phase 3 – Fonctionnalités avancées (terminé)
- [x] Mode **Multijoueur local** (tour par tour sur le même iPad)
- [x] Tableaux de scores et synchronisation cloud (facultatif - match history stockée localement)
- [x] Contenu additionnel : fractions, mesures, addition/soustraction simples
- [x] Accessibilité : support voix‑off (lecture automatique), contraste élevé (mode sombre)

### Phase 4 – Publication & Distribution (terminé)
- [x] Publication du PWA sur un serveur sécurisé (HTTPS) pour l’installation sur iPad (Service Worker hors-ligne intégré)
- [x] Assurer la pleine compatibilité multi‑appareils (phone, iPad, PC - en-tête et conteneurs fluides)
- [x] Déployer le dépôt sur GitHub (création du repo, commits locaux prêts)
- [x] Configurer le déploiement continu vers Vercel (Fichier vercel.json de routage configuré)
- [x] Documentation d’utilisation pour les enseignants et les parents (Fichier documentation.md créé dans la racine)
- [x] Pack de ressources (icônes, sons, polices) prêt à être déployé (Icônes et Manifeste PWA embarqués)

### Phase 5 – Feature Expansion (post‑release)
- [ ] Adaptive learning paths with performance‑based difficulty scaling
- [ ] Visual manipulatives (fraction bars, base‑ten blocks, interactive shapes)
- ** - [ ] Curriculum‑aligned quests & narrative‑driven storylines
- [ ] Low‑stakes competition: optional leaderboards & co‑play modes
- [ ] Varied game formats (timed sprints, exploration mode)
- [ ] Push notifications for daily streaks and achievements
- [ ] Init loading animation on app startup (splash screen with branding)
- [ ] Implement login system (parental authentication, optional email/password or social login)
- [ ] Integrate animation library (e.g., Lottie‑Web, GSAP, Anime.js) for overlay monster messages and celebratory effects
- [ ] Parental/teacher dashboard (progress tracking, time limits, content settings)
- [ ] Parents' dashboard to review detailed progress reports, achievement history and set learning goals
- [ ] COPPA‑compliant data privacy (minimal collection, encrypted local storage)
- [x] Ad‑free environment with no third‑party ads or in‑app purchases
- [ ] Enhanced accessibility (screen‑reader support, high‑contrast UI, voice narration & speech‑recognition for answers)
- [ ] Learning analytics dashboard for teachers/parents (progress reports, error patterns)
- [ ] Customizable avatars or virtual companions that evolve with stars
- [ ] Integrate DiceBear monsterid avatar library for kid‑friendly avatar generation
- [ ] Voice interaction: speech‑recognition for answering and voice‑over instructions
- [ ] Augmented Reality manipulatives (AR magic ruler, fraction bar, interactive shapes)
- [ ] Offline content packs: downloadable lesson bundles for no‑internet use
- [ ] Multilingual support (toggle French / English / Spanish)
- [ ] Gamified quest system with story‑driven chapters
- [ ] Safe social sharing of badge achievements (opt‑in, COPPA‑compliant)
- [ ] Dynamic difficulty engine using performance trends (ML‑based scaling)
- [ ] Exportable PDF worksheets based on current skill level
- [ ] Integration with classroom platforms (LTI, CSV export to Google Classroom, Moodle)
- [ ] Seasonal UI celebration themes (summer, winter, holidays)
- [ ] Daily streak rewards (bonus stars for consecutive days)
- [ ] In‑app shop for customizable avatar accessories using earned points
- [ ] Local leaderboard displaying top scores among siblings/friends
- [ ] Timed challenge rounds with extra points for speed
- [ ] Mini‑games unlocking special badges (memory match, puzzle, etc.)
- [ ] Additional accessibility enhancements (high‑contrast mode toggle, larger UI scaling, tactile vibration feedback)
- [ ] Audio narration & sound effects (text‑to‑speech, feedback sounds)
- [ ] Mini‑games & interactive puzzles (drag‑and‑drop, matching)
- [ ] Reward‑based stickers/collectibles gallery
- [ ] Interactive video lessons for concept introduction
- [ ] World‑map progression with unlockable regions
- [ ] Secure Content Security Policy (CSP) configuration
- [ ] Input validation & sanitization to prevent XSS/Injection
- [ ] Secure storage of user data (encrypted localStorage)
- [ ] Regular security audit and dependency vulnerability scanning
- [ ] Enforce HTTPS everywhere with HSTS
- [ ] Set secure cookie flags (SameSite, HttpOnly) for any future auth

---
*Ce roadmap sera mis à jour au fur et à mesure que les phases progressent.*
