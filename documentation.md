# Poussins Pythagorés - Guide d'utilisation (Parents & Enseignants)

Bienvenue dans **Poussins Pythagorés**, une application d'apprentissage des mathématiques conçue spécifiquement pour les enfants en classe de **CP (6 - 7 ans)**. 

Ce guide vous présente la structure pédagogique de l'application, ses fonctionnalités de personnalisation et les instructions pour une installation hors-ligne optimale.

---

## 1. Alignement Pédagogique (Programme de CP)

L'application couvre l'ensemble des compétences clés du programme officiel de l'Éducation Nationale :

* **Nombres et Calculs** :
  * *Nombres jusqu'à 100* : Structurer la numération en dizaines et unités (décomposition).
  * *Additions* : Résoudre des additions simples en ligne et s'entraîner à poser des additions en colonnes avec le quadrillage Seyès de type cahier d'école.
  * *Soustractions* : Résoudre des soustractions à l'aide de représentations visuelles (billes à barrer).
  * *Doubles et Moitiés* : Automatiser les calculs mentaux essentiels.
  * *Compléments à 10* : Maîtriser les bases du calcul rapide.
  * *Découvrir les fractions* : Première initiation visuelle à la notion de moitié ($1/2$), tiers ($1/3$), et quart ($1/4$) à l'aide d'une tablette de chocolat virtuelle fractionnable.
* **Espace et Géométrie** :
  * *Figures géométriques* : Reconnaître le carré, le rectangle, le triangle et le cercle.
  * *Vocabulaire spatial* : S'orienter (au-dessus, en dessous, à gauche, à droite) par rapport à un personnage ou un objet.
* **Grandeurs et Mesures** :
  * *La monnaie* : Composer des sommes en euros à l'aide de pièces ($1€$, $2€$) et de billets ($5€$, $10€$).
  * *Lire l'heure* : Apprendre à lire les heures piles sur une horloge à aiguilles.
  * *Mesurer avec une règle* : Apprendre à aligner un crayon de couleur sur le point zéro ($0$) d'une règle graduée en centimètres et lire sa longueur exacte.

---

## 2. Système d'Adaptabilité (Difficulté Dynamique)

L'application intègre un moteur de difficulté adaptatif qui ajuste les exercices en temps réel pour maintenir l'enfant dans sa zone proximale de développement (ni trop facile, ni trop décourageant) :

* **Niveau Facile (🟢)** : Nombres plus petits, guides visuels simplifiés.
* **Niveau Normal (🔵)** : Difficulté standard correspondant aux exigences de milieu d'année de CP.
* **Niveau Défi (🔥)** : Nombres plus grands, opérations complexes.

### Règles de transition :
* **Montée de niveau** : Après **3 bonnes réponses consécutives**, la difficulté augmente automatiquement.
* **Descente de niveau** : Après **3 mauvaises réponses consécutives**, la difficulté diminue pour proposer un exercice adapté et rassurant.

*Note : Les transitions de niveau automatiques sont désactivées en mode multijoueur pour préserver l'équité du match.*

---

## 3. Contrôle Parental & Limite de Temps

Pour préserver la santé visuelle des enfants et encourager des sessions de jeu raisonnables, un limitateur de temps est actif en arrière-plan :

* **Limite de temps** : Après **60 minutes** de temps de jeu cumulé, l'application se verrouille.
* **Pause requise** : Un écran de veille invite l'enfant à faire une pause de **30 minutes** (avec un compte à rebours en direct).
* **Reset automatique** : Si l'enfant quitte l'application et fait une pause d'au moins **30 minutes**, son compteur de temps de jeu cumulé se réinitialise à zéro.
* **Bypass Parents (Déverrouillage instantané)** : Les parents ou enseignants peuvent déverrouiller l'écran à tout moment. Cliquez sur **"Espace Parents (Déverrouiller)"** et résolvez l'addition mentale à deux chiffres proposée (ex: $26 + 18 = ?$) pour lever le blocage.

---

## 4. Mode Multijoueur Local (Tour par Tour)

Idéal pour une utilisation à la maison ou sur les iPads de la classe :
1. Sur la page d'accueil, basculez le **"Mode de Jeu"** de *Solo* à *Multijoueur*.
2. Choisissez une catégorie et un exercice.
3. Saisissez les prénoms des deux joueurs (ex: *Hugo* et *Léa*) et commencez la partie.
4. L'application alterne les questions tour par tour pour un total de **10 questions** (5 questions chacun).
5. Un tableau récapitulatif affiche les résultats finaux et décerne une couronne au vainqueur ou scelle une égalité amicale.
6. L'historique des 10 derniers matchs est sauvegardé localement et consultable en cliquant sur **📊 Scores** dans le menu principal.

---

## 5. Fonctionnalités d'Accessibilité

Cliquez sur le bouton **⚙️ Accessibilité** dans le coin supérieur droit pour configurer :
* **Lecture Vocale Automatique** : La synthèse vocale lit automatiquement les questions à haute voix lors du chargement de chaque nouvel exercice.
* **Contraste Élevé** : Un thème sombre à fort contraste est appliqué, optimisant la lisibilité pour les enfants malvoyants.

---

## 6. Installation PWA et Utilisation Hors-Ligne (iPad & Tablettes)

Grâce au fichier de configuration manifest et au Service Worker embarqué, l'application s'installe sur iPad comme une application native et fonctionne **sans aucune connexion Internet**.

### Comment l'installer sur iPad (Safari) :
1. Ouvrez l'adresse de votre application (ex: `https://poussinspythagores.vercel.app`) sur le navigateur Safari de l'iPad.
2. Cliquez sur l'icône de partage (le rectangle avec la flèche vers le haut dans la barre d'outils de Safari).
3. Faites défiler les options et cliquez sur **"Sur l'écran d'accueil"**.
4. Validez. L'icône de l'application apparaît sur l'écran d'accueil de l'iPad.
5. Ouvrez-la : elle s'exécute désormais en plein écran (sans les barres de navigation du navigateur) et reste entièrement fonctionnelle même si la tablette n'est pas connectée au Wi-Fi.
