// =============================================
// CONSTANTS — All data definitions
// =============================================

export const MATH_FACTS = [
  "Le zéro n'existe pas dans les nombres naturels ! Les Grecs ne l'avaient pas trouvé.",
  'Les Romains utilisaient des lettres comme chiffres : I = 1, V = 5, X = 10, L = 50.',
  'Un triangles a toujours 3 angles dont la somme fait exactement 180 degrés.',
  'La pyramide de Khéops a environ 4500 ans et ses côtés sont presque parfaits.',
  "Le nombre π (pi) commence par 3,14 mais ses décimales continuent à l'infini !",
  'Un cercle a 360 degrés parce que les Babyloniens utilisaient un calendrier de 360 jours.',
  "La multiplication, c'est une addition qui se répète : 3×4, c'est 3+3+3+3.",
  'Le chiffre le plus joué au loto est le 7, car beaucoup de gens le choisissent.',
  "En maths, un pair est divisible par 2, un impair ne l'est jamais.",
  'Le plus grand nombre premier connu fait plus de 24 millions de chiffres !',
  'Un carré est un rectangle spécial : tous ses côtés sont égaux.',
  "La moitié de 1, c'est 0,5 : il est possible de partager en deux parts égales.",
  'Le nombre 11 se lit pareil de gauche à droite et de droite à gauche.',
  'Un hexagone a 6 côtés : les abeilles construisent leurs rayons en hexagones.',
  'Si tu retournes le chiffre 6, ça fait un 9 !',
  'La somme de tous les chiffres de 1 à 9 est 45.',
  "Un demi-cercle a 180 degrés : la moitié d'un cercle complet.",
  "Le plus petit nombre premier est 2, c'est aussi le seul pair premier.",
  '1 mètre = 100 centimètres = 1000 millimètres.',
  'Une heure a 60 minutes, et une minute a 60 secondes.',
  "Le triangle le plus solide est le triangle : on l'utilise dans les ponts et les toits.",
  "Les doigts de nos mains font 10 unités, c'est pour ça qu'on compte en base 10.",
  "Le plus petit nombre qui n'est ni premier ni composé, c'est 1.",
  'Un losange a 4 côtés égaux, comme un carré incliné.',
  "La division, c'est comme partager des bonbons entre des amis.",
  "5×5 = 25, c'est le même nombre en sens inverse !",
  "Les couleurs de l'arc-en-ciel suivent l'ordre : ROUGE, ORANGE, JAUNE, VERT, BLEU, INDIGO, VIOLET.",
  "Un millimètre, c'est aussi petit qu'un trait de crayon.",
  'Un cube a 6 faces identiques, 12 arêtes et 8 sommets.',
  'Quand on additionne tous les chiffres pairs de 2 à 8, on obtient 20.',
];

export const SUCCESS_PHRASES = [
  "Super ! C'est correct !",
  'Bravo ! Tu as trouvé !',
  'Magnifique ! Tu es fort !',
  'Excellent travail ! Continues !',
  'Génial ! Une étoile pour toi !',
];

export const FAIL_PHRASES = [
  'Aïe ! Réessaie, tu vas y arriver ! 🌟',
  'Pas tout à fait ! Regarde bien le dessin.',
  'Presque ! Essaie encore un coup !',
  "Ne t'inquiète pas, réessaie !",
  'Oups ! Essaye un autre nombre !',
];

export const CATEGORIES = {
  A: {
    name: 'Nombres et Calculs',
    color: 'brand-purple',
    games: [
      {
        id: 'a_nombres_100',
        name: "Les nombres jusqu'à 100",
        desc: 'Dizaines, unités et décompositions.',
      },
      {
        id: 'a_doubles_moities',
        name: 'Doubles et moitiés',
        desc: 'Calculer le double ou diviser par deux.',
      },
      {
        id: 'a_complements_10',
        name: 'Compléments à 10',
        desc: 'Trouver le nombre qui manque pour faire 10.',
      },
      {
        id: 'a_additions',
        name: 'Les additions',
        desc: 'Opérations en ligne et posées en colonne.',
      },
      {
        id: 'a_soustractions',
        name: 'Les soustractions',
        desc: 'Retirer des objets et calculer la différence.',
      },
      {
        id: 'a_add_rapide',
        name: 'Addition rapide',
        desc: 'Calcul mental rapide : additionne deux nombres.',
      },
      {
        id: 'a_sous_rapide',
        name: 'Soustraction rapide',
        desc: 'Calcul mental rapide : soustrais deux nombres.',
      },
      {
        id: 'a_add_sous_rapide',
        name: 'Addition / Soustraction rapide',
        desc: 'Mélange aléatoire d’additions et soustractions rapides.',
      },
      {
        id: 'a_tables_rapides',
        name: 'Tables de multiplication rapides',
        desc: 'Répondre vite à des multiplications simples.',
      },
      {
        id: 'a_fractions',
        name: 'Découvrir les fractions',
        desc: 'Représenter des moitiés, tiers et quarts.',
      },
    ],
  },
  B: {
    name: 'Espace et Géométrie',
    color: 'brand-green',
    games: [
      {
        id: 'b_figures',
        name: 'Reconnaître les figures',
        desc: 'Carré, rectangle, triangle et cercle.',
      },
      {
        id: 'b_vocabulaire_spatial',
        name: 'Vocabulaire spatial',
        desc: 'Au-dessus, en dessous, à gauche, à droite.',
      },
    ],
  },
  C: {
    name: 'Grandeurs et Mesures',
    color: 'brand-orange',
    games: [
      {
        id: 'c_monnaie',
        name: 'La monnaie',
        desc: 'Sommer des pièces et billets de 1€, 2€, 5€ et 10€.',
      },
      {
        id: 'c_heure',
        name: "Lire l'heure",
        desc: 'Apprendre à lire les heures piles.',
      },
      {
        id: 'c_mesures',
        name: 'Mesurer avec une règle',
        desc: "Lire la longueur d'un objet en centimètres.",
      },
    ],
  },
};

export const COMPANION_STAGES = [
  { label: 'Bébé', minStars: 0 },
  { label: 'Jeune', minStars: 10 },
  { label: 'Adulte', minStars: 25 },
  { label: 'Maître', minStars: 50 },
  { label: 'Légende', minStars: 100 },
];

export const COMPANIONS = {
  owl: {
    name: 'Pytha',
    emoji: '🦉',
    color: 'brand-purple',
    colorHex: '#6C5DD3',
    lightHex: '#F3F0FF',
    desc: 'Sage et curieux, Pytha adore les maths !',
    stages: [
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="42" r="28" fill="#E8DEFF"/><circle cx="40" cy="42" r="24" fill="#6C5DD3"/><circle cx="32" cy="38" r="7" fill="white"/><circle cx="48" cy="38" r="7" fill="white"/><circle cx="33" cy="38" r="3.5" fill="#1e1b4b"/><circle cx="49" cy="38" r="3.5" fill="#1e1b4b"/><circle cx="34" cy="37" r="1.2" fill="white"/><circle cx="50" cy="37" r="1.2" fill="white"/><polygon points="40,44 36,50 44,50" fill="#FF8E53"/><ellipse cx="24" cy="30" rx="6" ry="8" fill="#6C5DD3"/><ellipse cx="56" cy="30" rx="6" ry="8" fill="#6C5DD3"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="42" r="28" fill="#E8DEFF"/><circle cx="40" cy="42" r="24" fill="#6C5DD3"/><circle cx="32" cy="38" r="7" fill="white"/><circle cx="48" cy="38" r="7" fill="white"/><circle cx="33" cy="38" r="3.5" fill="#1e1b4b"/><circle cx="49" cy="38" r="3.5" fill="#1e1b4b"/><circle cx="34" cy="37" r="1.2" fill="white"/><circle cx="50" cy="37" r="1.2" fill="white"/><polygon points="40,44 36,50 44,50" fill="#FF8E53"/><ellipse cx="24" cy="30" rx="6" ry="8" fill="#6C5DD3"/><ellipse cx="56" cy="30" rx="6" ry="8" fill="#6C5DD3"/><rect x="33" y="16" width="14" height="8" rx="2" fill="#FFD93D"/><rect x="36" y="14" width="8" height="4" rx="1" fill="#FFD93D"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="42" r="28" fill="#E8DEFF"/><circle cx="40" cy="42" r="24" fill="#6C5DD3"/><circle cx="32" cy="38" r="7" fill="white"/><circle cx="48" cy="38" r="7" fill="white"/><circle cx="33" cy="38" r="3.5" fill="#1e1b4b"/><circle cx="49" cy="38" r="3.5" fill="#1e1b4b"/><circle cx="34" cy="37" r="1.2" fill="white"/><circle cx="50" cy="37" r="1.2" fill="white"/><polygon points="40,44 36,50 44,50" fill="#FF8E53"/><ellipse cx="24" cy="30" rx="6" ry="8" fill="#6C5DD3"/><ellipse cx="56" cy="30" rx="6" ry="8" fill="#6C5DD3"/><rect x="33" y="16" width="14" height="8" rx="2" fill="#FFD93D"/><rect x="36" y="14" width="8" height="4" rx="1" fill="#FFD93D"/><path d="M16 52 Q10 48 14 40" stroke="#6C5DD3" stroke-width="3" fill="none"/><path d="M64 52 Q70 48 66 40" stroke="#6C5DD3" stroke-width="3" fill="none"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="42" r="30" fill="#E8DEFF" opacity="0.5"/><circle cx="40" cy="42" r="28" fill="#E8DEFF"/><circle cx="40" cy="42" r="24" fill="#6C5DD3"/><circle cx="32" cy="38" r="7" fill="white"/><circle cx="48" cy="38" r="7" fill="white"/><circle cx="33" cy="38" r="3.5" fill="#1e1b4b"/><circle cx="49" cy="38" r="3.5" fill="#1e1b4b"/><circle cx="34" cy="37" r="1.2" fill="white"/><circle cx="50" cy="37" r="1.2" fill="white"/><polygon points="40,44 36,50 44,50" fill="#FF8E53"/><ellipse cx="24" cy="30" rx="6" ry="8" fill="#6C5DD3"/><ellipse cx="56" cy="30" rx="6" ry="8" fill="#6C5DD3"/><rect x="33" y="16" width="14" height="8" rx="2" fill="#FFD93D"/><rect x="36" y="14" width="8" height="4" rx="1" fill="#FFD93D"/><path d="M16 52 Q10 48 14 40" stroke="#6C5DD3" stroke-width="3" fill="none"/><path d="M64 52 Q70 48 66 40" stroke="#6C5DD3" stroke-width="3" fill="none"/><circle cx="40" cy="42" r="34" fill="none" stroke="#FFD93D" stroke-width="1.5" stroke-dasharray="4 3"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="42" r="32" fill="#E8DEFF" opacity="0.3"/><circle cx="40" cy="42" r="30" fill="#E8DEFF" opacity="0.5"/><circle cx="40" cy="42" r="28" fill="#E8DEFF"/><circle cx="40" cy="42" r="24" fill="#6C5DD3"/><circle cx="32" cy="38" r="7" fill="white"/><circle cx="48" cy="38" r="7" fill="white"/><circle cx="33" cy="38" r="3.5" fill="#1e1b4b"/><circle cx="49" cy="38" r="3.5" fill="#1e1b4b"/><circle cx="34" cy="37" r="1.2" fill="white"/><circle cx="50" cy="37" r="1.2" fill="white"/><polygon points="40,44 36,50 44,50" fill="#FF8E53"/><ellipse cx="24" cy="30" rx="6" ry="8" fill="#6C5DD3"/><ellipse cx="56" cy="30" rx="6" ry="8" fill="#6C5DD3"/><rect x="33" y="16" width="14" height="8" rx="2" fill="#FFD93D"/><rect x="36" y="14" width="8" height="4" rx="1" fill="#FFD93D"/><path d="M16 52 Q10 48 14 40" stroke="#6C5DD3" stroke-width="3" fill="none"/><path d="M64 52 Q70 48 66 40" stroke="#6C5DD3" stroke-width="3" fill="none"/><circle cx="40" cy="42" r="34" fill="none" stroke="#FFD93D" stroke-width="1.5" stroke-dasharray="4 3"/><polygon points="40,4 37,10 43,10" fill="#FFD93D"/><circle cx="28" cy="14" r="2" fill="#FFD93D" opacity="0.6"/><circle cx="52" cy="14" r="2" fill="#FFD93D" opacity="0.6"/></svg>`,
    ],
  },
  squirrel: {
    name: 'Noisette',
    emoji: '🐿️',
    color: 'brand-orange',
    colorHex: '#FF8E53',
    lightHex: '#FFF5F0',
    desc: 'Noisette est toujours en mouvement !',
    stages: [
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="44" r="26" fill="#FFF0E6"/><circle cx="40" cy="44" r="22" fill="#FF8E53"/><circle cx="34" cy="40" r="5" fill="white"/><circle cx="46" cy="40" r="5" fill="white"/><circle cx="35" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="40" r="2.5" fill="#1e1b4b"/><ellipse cx="40" cy="47" rx="3" ry="2" fill="#1e1b4b"/><circle cx="30" cy="24" r="6" fill="#FF8E53"/><circle cx="50" cy="24" r="6" fill="#FF8E53"/><circle cx="30" cy="24" r="3" fill="#FFB088"/><circle cx="50" cy="24" r="3" fill="#FFB088"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="44" r="26" fill="#FFF0E6"/><circle cx="40" cy="44" r="22" fill="#FF8E53"/><circle cx="34" cy="40" r="5" fill="white"/><circle cx="46" cy="40" r="5" fill="white"/><circle cx="35" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="40" r="2.5" fill="#1e1b4b"/><ellipse cx="40" cy="47" rx="3" ry="2" fill="#1e1b4b"/><circle cx="30" cy="24" r="6" fill="#FF8E53"/><circle cx="50" cy="24" r="6" fill="#FF8E53"/><circle cx="30" cy="24" r="3" fill="#FFB088"/><circle cx="50" cy="24" r="3" fill="#FFB088"/><ellipse cx="40" cy="14" rx="8" ry="5" fill="#8B4513"/><ellipse cx="40" cy="13" rx="5" ry="3" fill="#A0522D"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="44" r="26" fill="#FFF0E6"/><circle cx="40" cy="44" r="22" fill="#FF8E53"/><circle cx="34" cy="40" r="5" fill="white"/><circle cx="46" cy="40" r="5" fill="white"/><circle cx="35" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="40" r="2.5" fill="#1e1b4b"/><ellipse cx="40" cy="47" rx="3" ry="2" fill="#1e1b4b"/><circle cx="30" cy="24" r="6" fill="#FF8E53"/><circle cx="50" cy="24" r="6" fill="#FF8E53"/><circle cx="30" cy="24" r="3" fill="#FFB088"/><circle cx="50" cy="24" r="3" fill="#FFB088"/><ellipse cx="40" cy="14" rx="8" ry="5" fill="#8B4513"/><ellipse cx="40" cy="13" rx="5" ry="3" fill="#A0522D"/><ellipse cx="62" cy="54" rx="10" ry="8" fill="#8B4513" transform="rotate(-30 62 54)"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="44" r="28" fill="#FFF0E6" opacity="0.5"/><circle cx="40" cy="44" r="26" fill="#FFF0E6"/><circle cx="40" cy="44" r="22" fill="#FF8E53"/><circle cx="34" cy="40" r="5" fill="white"/><circle cx="46" cy="40" r="5" fill="white"/><circle cx="35" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="40" r="2.5" fill="#1e1b4b"/><ellipse cx="40" cy="47" rx="3" ry="2" fill="#1e1b4b"/><circle cx="30" cy="24" r="6" fill="#FF8E53"/><circle cx="50" cy="24" r="6" fill="#FF8E53"/><circle cx="30" cy="24" r="3" fill="#FFB088"/><circle cx="50" cy="24" r="3" fill="#FFB088"/><ellipse cx="40" cy="14" rx="8" ry="5" fill="#8B4513"/><ellipse cx="40" cy="13" rx="5" ry="3" fill="#A0522D"/><ellipse cx="62" cy="54" rx="10" ry="8" fill="#8B4513" transform="rotate(-30 62 54)"/><circle cx="40" cy="44" r="30" fill="none" stroke="#FF8E53" stroke-width="1.5" stroke-dasharray="4 3"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="44" r="30" fill="#FFF0E6" opacity="0.3"/><circle cx="40" cy="44" r="28" fill="#FFF0E6" opacity="0.5"/><circle cx="40" cy="44" r="26" fill="#FFF0E6"/><circle cx="40" cy="44" r="22" fill="#FF8E53"/><circle cx="34" cy="40" r="5" fill="white"/><circle cx="46" cy="40" r="5" fill="white"/><circle cx="35" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="40" r="2.5" fill="#1e1b4b"/><ellipse cx="40" cy="47" rx="3" ry="2" fill="#1e1b4b"/><circle cx="30" cy="24" r="6" fill="#FF8E53"/><circle cx="50" cy="24" r="6" fill="#FF8E53"/><circle cx="30" cy="24" r="3" fill="#FFB088"/><circle cx="50" cy="24" r="3" fill="#FFB088"/><ellipse cx="40" cy="14" rx="8" ry="5" fill="#8B4513"/><ellipse cx="40" cy="13" rx="5" ry="3" fill="#A0522D"/><ellipse cx="62" cy="54" rx="10" ry="8" fill="#8B4513" transform="rotate(-30 62 54)"/><circle cx="40" cy="44" r="32" fill="none" stroke="#FFD93D" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="24" cy="16" r="2" fill="#FFD93D" opacity="0.6"/><circle cx="56" cy="16" r="2" fill="#FFD93D" opacity="0.6"/></svg>`,
    ],
  },
  lion: {
    name: 'Mufasa',
    emoji: '🦁',
    color: 'brand-yellow',
    colorHex: '#FFD93D',
    lightHex: '#FFFDF0',
    desc: 'Mufasa est courageux et généreux !',
    stages: [
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="42" r="30" fill="#FFF3D6"/><circle cx="40" cy="42" r="24" fill="#FFD93D"/><circle cx="34" cy="38" r="5" fill="white"/><circle cx="46" cy="38" r="5" fill="white"/><circle cx="35" cy="38" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="38" r="2.5" fill="#1e1b4b"/><ellipse cx="40" cy="45" rx="4" ry="3" fill="#E0753A"/><line x1="30" y1="44" x2="22" y2="42" stroke="#E0753A" stroke-width="1.5"/><line x1="30" y1="46" x2="22" y2="46" stroke="#E0753A" stroke-width="1.5"/><line x1="50" y1="44" x2="58" y2="42" stroke="#E0753A" stroke-width="1.5"/><line x1="50" y1="46" x2="58" y2="46" stroke="#E0753A" stroke-width="1.5"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="42" r="34" fill="#E0753A" opacity="0.3"/><circle cx="40" cy="42" r="30" fill="#FFF3D6"/><circle cx="40" cy="42" r="24" fill="#FFD93D"/><circle cx="34" cy="38" r="5" fill="white"/><circle cx="46" cy="38" r="5" fill="white"/><circle cx="35" cy="38" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="38" r="2.5" fill="#1e1b4b"/><ellipse cx="40" cy="45" rx="4" ry="3" fill="#E0753A"/><line x1="30" y1="44" x2="22" y2="42" stroke="#E0753A" stroke-width="1.5"/><line x1="30" y1="46" x2="22" y2="46" stroke="#E0753A" stroke-width="1.5"/><line x1="50" y1="44" x2="58" y2="42" stroke="#E0753A" stroke-width="1.5"/><line x1="50" y1="46" x2="58" y2="46" stroke="#E0753A" stroke-width="1.5"/><rect x="35" y="14" width="10" height="6" rx="2" fill="#FF6B8B"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="42" r="34" fill="#E0753A" opacity="0.3"/><circle cx="40" cy="42" r="30" fill="#FFF3D6"/><circle cx="40" cy="42" r="24" fill="#FFD93D"/><circle cx="34" cy="38" r="5" fill="white"/><circle cx="46" cy="38" r="5" fill="white"/><circle cx="35" cy="38" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="38" r="2.5" fill="#1e1b4b"/><ellipse cx="40" cy="45" rx="4" ry="3" fill="#E0753A"/><line x1="30" y1="44" x2="22" y2="42" stroke="#E0753A" stroke-width="1.5"/><line x1="30" y1="46" x2="22" y2="46" stroke="#E0753A" stroke-width="1.5"/><line x1="50" y1="44" x2="58" y2="42" stroke="#E0753A" stroke-width="1.5"/><line x1="50" y1="46" x2="58" y2="46" stroke="#E0753A" stroke-width="1.5"/><rect x="35" y="14" width="10" height="6" rx="2" fill="#FF6B8B"/><path d="M16 54 Q10 48 16 42" stroke="#E0753A" stroke-width="2" fill="none"/><path d="M64 54 Q70 48 64 42" stroke="#E0753A" stroke-width="2" fill="none"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="42" r="36" fill="#FFD93D" opacity="0.3"/><circle cx="40" cy="42" r="34" fill="#E0753A" opacity="0.3"/><circle cx="40" cy="42" r="30" fill="#FFF3D6"/><circle cx="40" cy="42" r="24" fill="#FFD93D"/><circle cx="34" cy="38" r="5" fill="white"/><circle cx="46" cy="38" r="5" fill="white"/><circle cx="35" cy="38" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="38" r="2.5" fill="#1e1b4b"/><ellipse cx="40" cy="45" rx="4" ry="3" fill="#E0753A"/><line x1="30" y1="44" x2="22" y2="42" stroke="#E0753A" stroke-width="1.5"/><line x1="30" y1="46" x2="22" y2="46" stroke="#E0753A" stroke-width="1.5"/><line x1="50" y1="44" x2="58" y2="42" stroke="#E0753A" stroke-width="1.5"/><line x1="50" y1="46" x2="58" y2="46" stroke="#E0753A" stroke-width="1.5"/><rect x="35" y="14" width="10" height="6" rx="2" fill="#FF6B8B"/><path d="M16 54 Q10 48 16 42" stroke="#E0753A" stroke-width="2" fill="none"/><path d="M64 54 Q70 48 64 42" stroke="#E0753A" stroke-width="2" fill="none"/><circle cx="40" cy="42" r="38" fill="none" stroke="#FFD93D" stroke-width="1.5" stroke-dasharray="4 3"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="42" r="38" fill="#FFD93D" opacity="0.2"/><circle cx="40" cy="42" r="36" fill="#FFD93D" opacity="0.3"/><circle cx="40" cy="42" r="34" fill="#E0753A" opacity="0.3"/><circle cx="40" cy="42" r="30" fill="#FFF3D6"/><circle cx="40" cy="42" r="24" fill="#FFD93D"/><circle cx="34" cy="38" r="5" fill="white"/><circle cx="46" cy="38" r="5" fill="white"/><circle cx="35" cy="38" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="38" r="2.5" fill="#1e1b4b"/><ellipse cx="40" cy="45" rx="4" ry="3" fill="#E0753A"/><line x1="30" y1="44" x2="22" y2="42" stroke="#E0753A" stroke-width="1.5"/><line x1="30" y1="46" x2="22" y2="46" stroke="#E0753A" stroke-width="1.5"/><line x1="50" y1="44" x2="58" y2="42" stroke="#E0753A" stroke-width="1.5"/><line x1="50" y1="46" x2="58" y2="46" stroke="#E0753A" stroke-width="1.5"/><rect x="35" y="14" width="10" height="6" rx="2" fill="#FF6B8B"/><path d="M16 54 Q10 48 16 42" stroke="#E0753A" stroke-width="2" fill="none"/><path d="M64 54 Q70 48 64 42" stroke="#E0753A" stroke-width="2" fill="none"/><circle cx="40" cy="42" r="38" fill="none" stroke="#FFD93D" stroke-width="1.5" stroke-dasharray="4 3"/><polygon points="40,2 38,7 42,7" fill="#FFD93D"/><circle cx="26" cy="12" r="1.5" fill="#FFD93D" opacity="0.6"/><circle cx="54" cy="12" r="1.5" fill="#FFD93D" opacity="0.6"/></svg>`,
    ],
  },
  dolphin: {
    name: 'Splash',
    emoji: '🐬',
    color: 'brand-blue',
    colorHex: '#3B82F6',
    lightHex: '#EFF6FF',
    desc: 'Splash adore plonger dans les nombres !',
    stages: [
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><ellipse cx="40" cy="42" rx="26" ry="20" fill="#DBEAFE"/><ellipse cx="40" cy="42" rx="22" ry="17" fill="#3B82F6"/><circle cx="32" cy="38" r="4" fill="white"/><circle cx="33" cy="38" r="2" fill="#1e1b4b"/><circle cx="34" cy="37" r="0.8" fill="white"/><path d="M38 46 Q42 50 48 46" stroke="white" stroke-width="1.5" fill="none"/><ellipse cx="16" cy="42" rx="8" ry="5" fill="#3B82F6" transform="rotate(-15 16 42)"/><path d="M40 26 Q38 20 34 22" stroke="#3B82F6" stroke-width="3" fill="none"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><ellipse cx="40" cy="42" rx="26" ry="20" fill="#DBEAFE"/><ellipse cx="40" cy="42" rx="22" ry="17" fill="#3B82F6"/><circle cx="32" cy="38" r="4" fill="white"/><circle cx="33" cy="38" r="2" fill="#1e1b4b"/><circle cx="34" cy="37" r="0.8" fill="white"/><path d="M38 46 Q42 50 48 46" stroke="white" stroke-width="1.5" fill="none"/><ellipse cx="16" cy="42" rx="8" ry="5" fill="#3B82F6" transform="rotate(-15 16 42)"/><path d="M40 26 Q38 20 34 22" stroke="#3B82F6" stroke-width="3" fill="none"/><rect x="34" y="20" width="8" height="5" rx="1.5" fill="#FFD93D"/><rect x="36" y="18" width="4" height="3" rx="1" fill="#FFD93D"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><ellipse cx="40" cy="42" rx="26" ry="20" fill="#DBEAFE"/><ellipse cx="40" cy="42" rx="22" ry="17" fill="#3B82F6"/><circle cx="32" cy="38" r="4" fill="white"/><circle cx="33" cy="38" r="2" fill="#1e1b4b"/><circle cx="34" cy="37" r="0.8" fill="white"/><path d="M38 46 Q42 50 48 46" stroke="white" stroke-width="1.5" fill="none"/><ellipse cx="16" cy="42" rx="8" ry="5" fill="#3B82F6" transform="rotate(-15 16 42)"/><path d="M40 26 Q38 20 34 22" stroke="#3B82F6" stroke-width="3" fill="none"/><rect x="34" y="20" width="8" height="5" rx="1.5" fill="#FFD93D"/><rect x="36" y="18" width="4" height="3" rx="1" fill="#FFD93D"/><circle cx="60" cy="34" r="3" fill="white" opacity="0.5"/><circle cx="64" cy="38" r="2" fill="white" opacity="0.4"/><circle cx="58" cy="30" r="2" fill="white" opacity="0.3"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><ellipse cx="40" cy="42" r="28" fill="#DBEAFE" opacity="0.5"/><ellipse cx="40" cy="42" r="26" fill="#DBEAFE"/><ellipse cx="40" cy="42" r="22" ry="17" fill="#3B82F6"/><circle cx="32" cy="38" r="4" fill="white"/><circle cx="33" cy="38" r="2" fill="#1e1b4b"/><circle cx="34" cy="37" r="0.8" fill="white"/><path d="M38 46 Q42 50 48 46" stroke="white" stroke-width="1.5" fill="none"/><ellipse cx="16" cy="42" rx="8" ry="5" fill="#3B82F6" transform="rotate(-15 16 42)"/><path d="M40 26 Q38 20 34 22" stroke="#3B82F6" stroke-width="3" fill="none"/><rect x="34" y="20" width="8" height="5" rx="1.5" fill="#FFD93D"/><rect x="36" y="18" width="4" height="3" rx="1" fill="#FFD93D"/><circle cx="60" cy="34" r="3" fill="white" opacity="0.5"/><circle cx="64" cy="38" r="2" fill="white" opacity="0.4"/><circle cx="58" cy="30" r="2" fill="white" opacity="0.3"/><ellipse cx="40" cy="42" r="30" fill="none" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4 3"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><ellipse cx="40" cy="42" r="32" fill="#DBEAFE" opacity="0.2"/><ellipse cx="40" cy="42" r="28" fill="#DBEAFE" opacity="0.5"/><ellipse cx="40" cy="42" rx="26" ry="20" fill="#DBEAFE"/><ellipse cx="40" cy="42" rx="22" ry="17" fill="#3B82F6"/><circle cx="32" cy="38" r="4" fill="white"/><circle cx="33" cy="38" r="2" fill="#1e1b4b"/><circle cx="34" cy="37" r="0.8" fill="white"/><path d="M38 46 Q42 50 48 46" stroke="white" stroke-width="1.5" fill="none"/><ellipse cx="16" cy="42" rx="8" ry="5" fill="#3B82F6" transform="rotate(-15 16 42)"/><path d="M40 26 Q38 20 34 22" stroke="#3B82F6" stroke-width="3" fill="none"/><rect x="34" y="20" width="8" height="5" rx="1.5" fill="#FFD93D"/><rect x="36" y="18" width="4" height="3" rx="1" fill="#FFD93D"/><circle cx="60" cy="34" r="3" fill="white" opacity="0.5"/><circle cx="64" cy="38" r="2" fill="white" opacity="0.4"/><circle cx="58" cy="30" r="2" fill="white" opacity="0.3"/><ellipse cx="40" cy="42" r="32" fill="none" stroke="#FFD93D" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="24" cy="14" r="1.5" fill="#FFD93D" opacity="0.6"/><circle cx="56" cy="14" r="1.5" fill="#FFD93D" opacity="0.6"/></svg>`,
    ],
  },
  unicorn: {
    name: 'Stella',
    emoji: '🦄',
    color: 'brand-pink',
    colorHex: '#FF6B8B',
    lightHex: '#FFF0F3',
    desc: 'Stella transforme les maths en magie !',
    stages: [
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="44" r="26" fill="#FFF0F3"/><circle cx="40" cy="44" r="22" fill="#FF6B8B"/><circle cx="34" cy="40" r="5" fill="white"/><circle cx="46" cy="40" r="5" fill="white"/><circle cx="35" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="36" cy="39" r="1" fill="white"/><circle cx="48" cy="39" r="1" fill="white"/><ellipse cx="40" cy="47" rx="3" ry="2" fill="#E05270"/><circle cx="30" cy="24" r="5" fill="#FF6B8B"/><circle cx="50" cy="24" r="5" fill="#FF6B8B"/><polygon points="40,10 38,18 42,18" fill="#FFD93D"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="44" r="26" fill="#FFF0F3"/><circle cx="40" cy="44" r="22" fill="#FF6B8B"/><circle cx="34" cy="40" r="5" fill="white"/><circle cx="46" cy="40" r="5" fill="white"/><circle cx="35" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="36" cy="39" r="1" fill="white"/><circle cx="48" cy="39" r="1" fill="white"/><ellipse cx="40" cy="47" rx="3" ry="2" fill="#E05270"/><circle cx="30" cy="24" r="5" fill="#FF6B8B"/><circle cx="50" cy="24" r="5" fill="#FF6B8B"/><polygon points="40,10 38,18 42,18" fill="#FFD93D"/><path d="M22 34 Q18 30 20 24" stroke="#FF6B8B" stroke-width="2" fill="none"/><path d="M58 34 Q62 30 60 24" stroke="#FF6B8B" stroke-width="2" fill="none"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="44" r="26" fill="#FFF0F3"/><circle cx="40" cy="44" r="22" fill="#FF6B8B"/><circle cx="34" cy="40" r="5" fill="white"/><circle cx="46" cy="40" r="5" fill="white"/><circle cx="35" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="36" cy="39" r="1" fill="white"/><circle cx="48" cy="39" r="1" fill="white"/><ellipse cx="40" cy="47" rx="3" ry="2" fill="#E05270"/><circle cx="30" cy="24" r="5" fill="#FF6B8B"/><circle cx="50" cy="24" r="5" fill="#FF6B8B"/><polygon points="40,10 38,18 42,18" fill="#FFD93D"/><path d="M22 34 Q18 30 20 24" stroke="#FF6B8B" stroke-width="2" fill="none"/><path d="M58 34 Q62 30 60 24" stroke="#FF6B8B" stroke-width="2" fill="none"/><path d="M18 54 Q12 48 16 42" stroke="#C084FC" stroke-width="2" fill="none"/><path d="M62 54 Q68 48 64 42" stroke="#C084FC" stroke-width="2" fill="none"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="44" r="28" fill="#FFF0F3" opacity="0.5"/><circle cx="40" cy="44" r="26" fill="#FFF0F3"/><circle cx="40" cy="44" r="22" fill="#FF6B8B"/><circle cx="34" cy="40" r="5" fill="white"/><circle cx="46" cy="40" r="5" fill="white"/><circle cx="35" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="36" cy="39" r="1" fill="white"/><circle cx="48" cy="39" r="1" fill="white"/><ellipse cx="40" cy="47" rx="3" ry="2" fill="#E05270"/><circle cx="30" cy="24" r="5" fill="#FF6B8B"/><circle cx="50" cy="24" r="5" fill="#FF6B8B"/><polygon points="40,10 38,18 42,18" fill="#FFD93D"/><path d="M22 34 Q18 30 20 24" stroke="#FF6B8B" stroke-width="2" fill="none"/><path d="M58 34 Q62 30 60 24" stroke="#FF6B8B" stroke-width="2" fill="none"/><path d="M18 54 Q12 48 16 42" stroke="#C084FC" stroke-width="2" fill="none"/><path d="M62 54 Q68 48 64 42" stroke="#C084FC" stroke-width="2" fill="none"/><circle cx="40" cy="44" r="32" fill="none" stroke="#FF6B8B" stroke-width="1.5" stroke-dasharray="4 3"/></svg>`,
      () =>
        `<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="44" r="30" fill="#FFF0F3" opacity="0.2"/><circle cx="40" cy="44" r="28" fill="#FFF0F3" opacity="0.5"/><circle cx="40" cy="44" r="26" fill="#FFF0F3"/><circle cx="40" cy="44" r="22" fill="#FF6B8B"/><circle cx="34" cy="40" r="5" fill="white"/><circle cx="46" cy="40" r="5" fill="white"/><circle cx="35" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="47" cy="40" r="2.5" fill="#1e1b4b"/><circle cx="36" cy="39" r="1" fill="white"/><circle cx="48" cy="39" r="1" fill="white"/><ellipse cx="40" cy="47" rx="3" ry="2" fill="#E05270"/><circle cx="30" cy="24" r="5" fill="#FF6B8B"/><circle cx="50" cy="24" r="5" fill="#FF6B8B"/><polygon points="40,10 38,18 42,18" fill="#FFD93D"/><path d="M22 34 Q18 30 20 24" stroke="#FF6B8B" stroke-width="2" fill="none"/><path d="M58 34 Q62 30 60 24" stroke="#FF6B8B" stroke-width="2" fill="none"/><path d="M18 54 Q12 48 16 42" stroke="#C084FC" stroke-width="2" fill="none"/><path d="M62 54 Q68 48 64 42" stroke="#C084FC" stroke-width="2" fill="none"/><circle cx="40" cy="44" r="34" fill="none" stroke="#FFD93D" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="26" cy="14" r="1.5" fill="#FFD93D" opacity="0.6"/><circle cx="54" cy="14" r="1.5" fill="#FFD93D" opacity="0.6"/><circle cx="40" cy="4" r="1.5" fill="#FFD93D" opacity="0.6"/></svg>`,
    ],
  },
};

export const FOOTER_PHRASES = {
  idle: [
    'Bonjour champion ! Choisis un jeu et amuse-toi ! 🌟',
    "Tu es très fort en mathématiques ! Continue à t'entraîner ! 🚀",
    "Chaque bonne réponse te rapproche d'un nouveau badge ! 🏅",
    "Les mathématiques sont un jeu d'enfant avec toi ! 🎈",
    "Tu as déjà gagné plein d'étoiles, c'est formidable ! 🌟",
  ],
  success: [
    'Incroyable ! Tu as trouvé la bonne réponse ! 🥳',
    'Bravo ! Ta réponse est tout à fait correcte ! 🦖',
    'Magnifique ! Tu es le roi des calculs ! 👑',
    'Génial ! Une étoile de plus dans ta collection ! ⭐',
    "Quel talent ! C'est un sans-faute ! 🎯",
  ],
  retry: [
    "Ne t'inquiète pas ! Essaye encore, tu vas y arriver ! 💪",
    'Presque ! Prends ton temps et regarde bien le dessin. 🔍',
    "L'erreur fait partie du jeu. Réessaie tranquillement ! 🌻",
    'Une autre tentative ? Tu es tout près de trouver ! 💡',
    'On apprend tous de nos erreurs. Tu vas réussir ! 🌟',
  ],
  game_start: [
    "Regarde bien l'image et réfléchis. Quelle est la bonne carte ? 🤔",
    'Un nouvel exercice ! Concentre-toi et choisis ta réponse. 🎯',
    "Tu as toutes les clés pour réussir cet exercice ! C'est parti ! 🚀",
    'Observe bien les indices visuels à gauche. 🔍',
  ],
};

export const QUESTION_TIME_LIMIT = 15;

export const PLAYTIME_LIMIT = 60 * 60 * 1000;
export const LOCKOUT_DURATION = 30 * 60 * 1000;
export const DECAY_BREAK_DURATION = 30 * 60 * 1000;

export const RECENTLY_SEEN_SIZE = 8;
export let recentlySeen = {};

function badgeSvg(shape, bgColor, borderColor, icon, iconColor, isLocked) {
  const lock = isLocked ? 'grayscale opacity-40' : '';
  const bg =
    shape === 'shield'
      ? `<path d="M50 5 L88 27 V55 C88 78 50 95 50 95 C50 95 12 78 12 55 V27 L50 5 Z" fill="${bgColor}" stroke="${borderColor}" stroke-width="4"/>
       <path d="M50 12 L82 30 V52 C82 72 50 86 50 86 C50 86 18 72 18 52 V30 L50 12 Z" fill="white" stroke="${borderColor}" stroke-width="1.5" opacity="0.85"/>`
      : `<circle cx="50" cy="50" r="45" fill="${bgColor}" stroke="${borderColor}" stroke-width="4"/>
       <circle cx="50" cy="50" r="39" fill="white" stroke="${borderColor}" stroke-width="1.5" opacity="0.85"/>`;
  return `<svg class="w-full h-full ${lock}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    ${bg}
    <text x="50" y="58" text-anchor="middle" font-size="36" fill="${iconColor}" font-family="serif">${icon}</text>
  </svg>`;
}

export const BADGES = [
  {
    id: 'badge_squirrel',
    name: "L'Écureuil Calculateur",
    desc: '5 étoiles',
    cond: { type: 'stars', value: 5 },
    svg: (l) => badgeSvg('shield', '#D38B5D', '#A0522D', '🐿️', '#8B4513', l),
  },
  {
    id: 'badge_rabbit',
    name: 'Le Lapin Rapide',
    desc: '10 étoiles',
    cond: { type: 'stars', value: 10 },
    svg: (l) => badgeSvg('circle', '#E2E8F0', '#94A3B8', '🐇', '#64748B', l),
  },
  {
    id: 'badge_owl',
    name: 'Le Hibou Sage',
    desc: '20 étoiles',
    cond: { type: 'stars', value: 20 },
    svg: (l) => badgeSvg('circle', '#FEF08A', '#EAB308', '🦉', '#92400E', l),
  },
  {
    id: 'badge_dolphin',
    name: 'Le Dauphin Malin',
    desc: '35 étoiles',
    cond: { type: 'stars', value: 35 },
    svg: (l) => badgeSvg('circle', '#E0F2FE', '#0EA5E9', '🐬', '#0369A1', l),
  },
  {
    id: 'badge_lion',
    name: 'Le Lion Champion',
    desc: '50 étoiles',
    cond: { type: 'stars', value: 50 },
    svg: (l) => badgeSvg('shield', '#FEE2E2', '#EF4444', '🦁', '#B91C1C', l),
  },
  {
    id: 'badge_unicorn',
    name: 'La Licorne Magique',
    desc: '75 étoiles',
    cond: { type: 'stars', value: 75 },
    svg: (l) => badgeSvg('shield', '#F5F3FF', '#D946EF', '🦄', '#7C3AED', l),
  },
  {
    id: 'badge_dragon',
    name: 'Le Dragon de Légende',
    desc: '100 étoiles',
    cond: { type: 'stars', value: 100 },
    svg: (l) => badgeSvg('shield', '#FFFBEB', '#F59E0B', '🐉', '#92400E', l),
  },
  {
    id: 'badge_phoenix',
    name: 'Le Phénix Ardent',
    desc: '150 étoiles',
    cond: { type: 'stars', value: 150 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#F97316', '🔥', '#9A3412', l),
  },
  {
    id: 'badge_griffin',
    name: 'Le Griffe Royal',
    desc: '200 étoiles',
    cond: { type: 'stars', value: 200 },
    svg: (l) => badgeSvg('shield', '#FEE2E2', '#DC2626', '👑', '#7F1D1D', l),
  },
  {
    id: 'badge_kraken',
    name: 'Le Kraken des Océans',
    desc: '250 étoiles',
    cond: { type: 'stars', value: 250 },
    svg: (l) => badgeSvg('circle', '#E0F2FE', '#0284C7', '🐙', '#0C4A6E', l),
  },
  {
    id: 'badge_pegasus',
    name: 'Le Pégase Céleste',
    desc: '300 étoiles',
    cond: { type: 'stars', value: 300 },
    svg: (l) => badgeSvg('shield', '#F0F9FF', '#0EA5E9', '🐴', '#0C4A6E', l),
  },
  {
    id: 'badge_phoenix2',
    name: 'Le Simurgh Antique',
    desc: '400 étoiles',
    cond: { type: 'stars', value: 400 },
    svg: (l) => badgeSvg('shield', '#ECFDF5', '#10B981', '🦅', '#064E3B', l),
  },
  {
    id: 'badge_titan',
    name: "Le Titan de l'Olympe",
    desc: '500 étoiles',
    cond: { type: 'stars', value: 500 },
    svg: (l) => badgeSvg('shield', '#FEF9C3', '#EAB308', '⚡', '#713F12', l),
  },
  {
    id: 'badge_void',
    name: 'Le Gardien du Cosmos',
    desc: '750 étoiles',
    cond: { type: 'stars', value: 750 },
    svg: (l) => badgeSvg('circle', '#1E1B4B', '#6366F1', '🌌', '#A5B4FC', l),
  },
  {
    id: 'badge_immortal',
    name: "L'Immortel Mathématique",
    desc: '1000 étoiles',
    cond: { type: 'stars', value: 1000 },
    svg: (l) => badgeSvg('shield', '#FFFBEB', '#F59E0B', '✨', '#78350F', l),
  },
  {
    id: 'badge_streak3',
    name: 'Flamme naissante',
    desc: 'Série de 3 jours',
    cond: { type: 'streak', value: 3 },
    svg: (l) => badgeSvg('circle', '#FEF3C7', '#FB923C', '🔥', '#9A3412', l),
  },
  {
    id: 'badge_streak7',
    name: 'Braise Ardente',
    desc: 'Série de 7 jours',
    cond: { type: 'streak', value: 7 },
    svg: (l) => badgeSvg('circle', '#FEE2E2', '#EF4444', '🔥', '#991B1B', l),
  },
  {
    id: 'badge_streak14',
    name: 'Feu de Joie',
    desc: 'Série de 14 jours',
    cond: { type: 'streak', value: 14 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#F97316', '🔥', '#7C2D12', l),
  },
  {
    id: 'badge_streak30',
    name: 'Incendie Céleste',
    desc: 'Série de 30 jours',
    cond: { type: 'streak', value: 30 },
    svg: (l) => badgeSvg('shield', '#FEE2E2', '#DC2626', '🔥', '#7F1D1D', l),
  },
  {
    id: 'badge_streak60',
    name: 'Légende de la Flamme',
    desc: 'Série de 60 jours',
    cond: { type: 'streak', value: 60 },
    svg: (l) => badgeSvg('shield', '#FDE68A', '#D97706', '🔥', '#451A03', l),
  },
  {
    id: 'badge_acc60',
    name: 'Bon Début',
    desc: '60% de précision',
    cond: { type: 'accuracy', value: 0.6 },
    svg: (l) => badgeSvg('circle', '#D1FAE5', '#34D399', '🎯', '#065F46', l),
  },
  {
    id: 'badge_acc70',
    name: "Tireur d'Élite",
    desc: '70% de précision',
    cond: { type: 'accuracy', value: 0.7 },
    svg: (l) => badgeSvg('circle', '#D1FAE5', '#10B981', '🎯', '#064E3B', l),
  },
  {
    id: 'badge_acc80',
    name: 'Précision Parfaite',
    desc: '80% de précision',
    cond: { type: 'accuracy', value: 0.8 },
    svg: (l) => badgeSvg('shield', '#D1FAE5', '#059669', '🎯', '#064E3B', l),
  },
  {
    id: 'badge_acc90',
    name: 'Maître de la Vise',
    desc: '90% de précision',
    cond: { type: 'accuracy', value: 0.9 },
    svg: (l) => badgeSvg('shield', '#ECFDF5', '#047857', '🎯', '#022C22', l),
  },
  {
    id: 'badge_acc100',
    name: 'Infaillible',
    desc: '100% de précision (20+ questions)',
    cond: { type: 'accuracy', value: 1.0 },
    svg: (l) => badgeSvg('shield', '#F0FDF4', '#16A34A', '💎', '#14532D', l),
  },
  {
    id: 'badge_speed8',
    name: 'Éclair',
    desc: 'Répondre en <8s en moyenne',
    cond: { type: 'speed', value: 8000 },
    svg: (l) => badgeSvg('circle', '#FEF3C7', '#FBBF24', '⚡', '#78350F', l),
  },
  {
    id: 'badge_speed6',
    name: 'Foudre',
    desc: 'Répondre en <6s en moyenne',
    cond: { type: 'speed', value: 6000 },
    svg: (l) => badgeSvg('circle', '#FEF9C3', '#F59E0B', '⚡', '#713F12', l),
  },
  {
    id: 'badge_speed5',
    name: 'Supersonique',
    desc: 'Répondre en <5s en moyenne',
    cond: { type: 'speed', value: 5000 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#D97706', '⚡', '#451A03', l),
  },
  {
    id: 'badge_speed4',
    name: 'Flash Mathématique',
    desc: 'Répondre en <4s en moyenne',
    cond: { type: 'speed', value: 4000 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#B45309', '⚡', '#451A03', l),
  },
  {
    id: 'badge_speed3',
    name: 'Vitesse de la Pensée',
    desc: 'Répondre en <3s en moyenne',
    cond: { type: 'speed', value: 3000 },
    svg: (l) => badgeSvg('shield', '#FEF9C3', '#92400E', '⚡', '#451A03', l),
  },
  {
    id: 'badge_nombres50',
    name: 'Explorateur des Nombres',
    desc: '50 réponses en Nombres',
    cond: { type: 'game_total', game: 'a_nombres_100', value: 50 },
    svg: (l) => badgeSvg('circle', '#F3E8FF', '#A855F7', '🔢', '#6B21A8', l),
  },
  {
    id: 'badge_additions50',
    name: 'Roi des Additions',
    desc: '50 réponses en Additions',
    cond: { type: 'game_total', game: 'a_additions', value: 50 },
    svg: (l) => badgeSvg('circle', '#DBEAFE', '#3B82F6', '➕', '#1E3A5F', l),
  },
  {
    id: 'badge_sous50',
    name: 'Maître des Soustractions',
    desc: '50 réponses en Soustractions',
    cond: { type: 'game_total', game: 'a_soustractions', value: 50 },
    svg: (l) => badgeSvg('circle', '#FEE2E2', '#EF4444', '➖', '#7F1D1D', l),
  },
  {
    id: 'badge_doubles50',
    name: 'Le Doubleur',
    desc: '50 réponses en Doubles',
    cond: { type: 'game_total', game: 'a_doubles_moities', value: 50 },
    svg: (l) => badgeSvg('circle', '#FEF3C7', '#F59E0B', '✖️', '#713F12', l),
  },
  {
    id: 'badge_comp1050',
    name: 'Complémentiste',
    desc: '50 réponses en Compléments',
    cond: { type: 'game_total', game: 'a_complements_10', value: 50 },
    svg: (l) => badgeSvg('circle', '#D1FAE5', '#10B981', '🔟', '#064E3B', l),
  },
  {
    id: 'badge_figures50',
    name: 'Architecte des Formes',
    desc: '50 réponses en Figures',
    cond: { type: 'game_total', game: 'b_figures', value: 50 },
    svg: (l) => badgeSvg('circle', '#E0E7FF', '#6366F1', '🔷', '#3730A3', l),
  },
  {
    id: 'badge_spatial50',
    name: 'Navigateur Spatial',
    desc: '50 réponses en Vocabulaire',
    cond: { type: 'game_total', game: 'b_vocabulaire_spatial', value: 50 },
    svg: (l) => badgeSvg('circle', '#FCE7F3', '#EC4899', '🧭', '#831843', l),
  },
  {
    id: 'badge_monnaie50',
    name: 'Le Banquier',
    desc: '50 réponses en Monnaie',
    cond: { type: 'game_total', game: 'c_monnaie', value: 50 },
    svg: (l) => badgeSvg('circle', '#FEF9C3', '#EAB308', '💰', '#713F12', l),
  },
  {
    id: 'badge_heure50',
    name: 'Maître du Temps',
    desc: '50 réponses en Heure',
    cond: { type: 'game_total', game: 'c_heure', value: 50 },
    svg: (l) => badgeSvg('circle', '#F3E8FF', '#C084FC', '⏰', '#581C87', l),
  },
  {
    id: 'badge_mesures50',
    name: 'Le Mesureur',
    desc: '50 réponses en Mesures',
    cond: { type: 'game_total', game: 'c_mesures', value: 50 },
    svg: (l) => badgeSvg('circle', '#DBEAFE', '#93C5FD', '📏', '#1E3A5F', l),
  },
  {
    id: 'badge_fractions50',
    name: 'Découpeur de Parts',
    desc: '50 réponses en Fractions',
    cond: { type: 'game_total', game: 'a_fractions', value: 50 },
    svg: (l) => badgeSvg('circle', '#EDE9FE', '#A78BFA', '🍕', '#4C1D95', l),
  },
  {
    id: 'badge_100total',
    name: 'Centurion',
    desc: '100 réponses en un seul jeu',
    cond: { type: 'game_total_any', value: 100 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#F59E0B', '💯', '#713F12', l),
  },
  {
    id: 'badge_catA',
    name: 'Maître des Nombres',
    desc: '100 bonnes réponses en Nombres et Calculs',
    cond: { type: 'category_correct', category: 'A', value: 100 },
    svg: (l) => badgeSvg('shield', '#F3E8FF', '#9333EA', '📐', '#581C87', l),
  },
  {
    id: 'badge_catB',
    name: 'Géomètre en Chef',
    desc: '100 bonnes réponses en Espace et Géométrie',
    cond: { type: 'category_correct', category: 'B', value: 100 },
    svg: (l) => badgeSvg('shield', '#D1FAE5', '#059669', '📐', '#022C22', l),
  },
  {
    id: 'badge_catC',
    name: 'Mesureur Expert',
    desc: '100 bonnes réponses en Grandeurs et Mesures',
    cond: { type: 'category_correct', category: 'C', value: 100 },
    svg: (l) => badgeSvg('shield', '#FFF7ED', '#EA580C', '📐', '#7C2D12', l),
  },
  {
    id: 'badge_diff_normal',
    name: 'Niveau Normal',
    desc: 'Atteindre le niveau Normal',
    cond: { type: 'difficulty', value: 'normal' },
    svg: (l) => badgeSvg('circle', '#DBEAFE', '#3B82F6', '🔵', '#1E3A5F', l),
  },
  {
    id: 'badge_diff_challenge',
    name: 'Défi Relevé',
    desc: 'Atteindre le niveau Défi',
    cond: { type: 'difficulty', value: 'challenge' },
    svg: (l) => badgeSvg('circle', '#FEE2E2', '#EF4444', '🔥', '#991B1B', l),
  },
  {
    id: 'badge_diff_legend',
    name: 'Légende du Défi',
    desc: 'Réussir 50 questions en Défi',
    cond: { type: 'challenge_mastered', value: 50 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#D97706', '🏆', '#451A03', l),
  },
  {
    id: 'badge_sessions10',
    name: 'Habitué',
    desc: '10 sessions jouées',
    cond: { type: 'sessions', value: 10 },
    svg: (l) => badgeSvg('circle', '#F0F9FF', '#0EA5E9', '📚', '#0C4A6E', l),
  },
  {
    id: 'badge_sessions25',
    name: 'Assidu',
    desc: '25 sessions jouées',
    cond: { type: 'sessions', value: 25 },
    svg: (l) => badgeSvg('circle', '#EDE9FE', '#8B5CF6', '📚', '#4C1D95', l),
  },
  {
    id: 'badge_sessions50',
    name: 'Infatigable',
    desc: '50 sessions jouées',
    cond: { type: 'sessions', value: 50 },
    svg: (l) => badgeSvg('shield', '#F3E8FF', '#7C3AED', '📚', '#4C1D95', l),
  },
  {
    id: 'badge_perfect5',
    name: 'Session Parfaite',
    desc: '5 sessions sans erreur',
    cond: { type: 'perfect_session', value: 5 },
    svg: (l) => badgeSvg('circle', '#ECFDF5', '#10B981', '💎', '#064E3B', l),
  },
  {
    id: 'badge_perfect15',
    name: 'Perfection Absolue',
    desc: '15 sessions sans erreur',
    cond: { type: 'perfect_session', value: 15 },
    svg: (l) => badgeSvg('shield', '#F0FDF4', '#16A34A', '💎', '#14532D', l),
  },
  {
    id: 'badge_first_star',
    name: 'Premier Pas',
    desc: 'Gagner sa première étoile',
    cond: { type: 'stars', value: 1 },
    svg: (l) => badgeSvg('circle', '#FEF9C3', '#FBBF24', '⭐', '#78350F', l),
  },
  {
    id: 'badge_all_games',
    name: 'Explorateur Complet',
    desc: 'Jouer à tous les jeux',
    cond: { type: 'all_games_played' },
    svg: (l) => badgeSvg('shield', '#E0E7FF', '#6366F1', '🗺️', '#3730A3', l),
  },
  {
    id: 'badge_5_stars_session',
    name: 'Session Dorée',
    desc: 'Gagner 5 étoiles en une session',
    cond: { type: 'session_stars', value: 5 },
    svg: (l) => badgeSvg('circle', '#FEF3C7', '#F59E0B', '🌟', '#713F12', l),
  },
  {
    id: 'badge_10_stars_session',
    name: 'Session Légendaire',
    desc: 'Gagner 10 étoiles en une session',
    cond: { type: 'session_stars', value: 10 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#D97706', '🌟', '#451A03', l),
  },
  {
    id: 'badge_consecutive5',
    name: 'Enchaînement',
    desc: "5 bonnes réponses d'affilée",
    cond: { type: 'consecutive', value: 5 },
    svg: (l) => badgeSvg('circle', '#D1FAE5', '#34D399', '🔗', '#065F46', l),
  },
  {
    id: 'badge_consecutive10',
    name: 'Combo Dévastateur',
    desc: "10 bonnes réponses d'affilée",
    cond: { type: 'consecutive', value: 10 },
    svg: (l) => badgeSvg('circle', '#D1FAE5', '#10B981', '🔗', '#064E3B', l),
  },
  {
    id: 'badge_consecutive20',
    name: 'Invincible',
    desc: "20 bonnes réponses d'affilée",
    cond: { type: 'consecutive', value: 20 },
    svg: (l) => badgeSvg('shield', '#ECFDF5', '#059669', '🔗', '#022C22', l),
  },
  {
    id: 'badge_night_owl',
    name: 'Choucheur Nocturne',
    desc: 'Jouer après 20h',
    cond: { type: 'time_of_day', value: 20 },
    svg: (l) => badgeSvg('circle', '#1E1B4B', '#6366F1', '🌙', '#A5B4FC', l),
  },
  {
    id: 'badge_early_bird',
    name: 'Petit Matin',
    desc: 'Jouer avant 8h',
    cond: { type: 'time_of_day', value: 8 },
    svg: (l) => badgeSvg('circle', '#FEF9C3', '#FBBF24', '🌅', '#78350F', l),
  },
];
