// =============================================
// I18N — Internationalization module
// Bilingual system: French (fr) / Spanish (es)
// =============================================

const STORAGE_KEY = 'mathscp_language';
const DEFAULT_LANG = 'fr';

let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
let listeners = [];

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (lang !== 'fr' && lang !== 'es') return;
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'es';
  listeners.forEach((fn) => fn(lang));
}

export function onLangChange(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

export function t(key, params = {}) {
  const entry = CATALOG[key];
  if (!entry) {
    console.warn(`i18n: missing key "${key}"`);
    return key;
  }
  let text = entry[currentLang] || entry.fr || key;
  Object.keys(params).forEach((k) => {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
  });
  return text;
}

export function tArray(key) {
  const entry = CATALOG[key];
  if (!entry) return [];
  return entry[currentLang] || entry.fr || [];
}

const CATALOG = {
  // ─── UI LABELS ───────────────────────────────────────
  'ui.listen': {
    fr: 'Écouter la question',
    es: 'Escuchar la pregunta',
  },
  'ui.question': {
    fr: 'Question',
    es: 'Pregunta',
  },
  'ui.validate': {
    fr: 'Valider ma réponse',
    es: 'Validar mi respuesta',
  },
  'ui.validate_selection': {
    fr: 'Valider ma sélection',
    es: 'Validar mi selección',
  },
  'ui.clear': {
    fr: 'Effacer',
    es: 'Borrar',
  },
  'ui.back': {
    fr: 'Retour',
    es: 'Volver',
  },
  'ui.dashboard': {
    fr: 'Tableau de bord',
    es: 'Panel de control',
  },
  'ui.penalty_tasks': {
    fr: 'Tâches pénalité',
    es: 'Tareas de penalización',
  },
  'ui.play': {
    fr: 'Jouer',
    es: 'Jugar',
  },
  'ui.solo': {
    fr: 'Solo',
    es: 'Solo',
  },
  'ui.multiplayer': {
    fr: 'Multijoueur',
    es: 'Multijugador',
  },
  'ui.quests': {
    fr: 'Quêtes',
    es: 'Misiones',
  },
  'ui.badges': {
    fr: 'Badges',
    es: 'Insignias',
  },
  'ui.companion': {
    fr: 'Mon Compagnon',
    es: 'Mi Compañero',
  },
  'ui.companion_desc': {
    fr: "Choisis ton compagnon d'aventure ! Il évolue avec tes étoiles.",
    es: '¡Elige tu compañero de aventura! Evoluciona con tus estrellas.',
  },
  'ui.close': {
    fr: 'Fermer',
    es: 'Cerrar',
  },
  'ui.yes': {
    fr: 'Oui',
    es: 'Sí',
  },
  'ui.no': {
    fr: 'Non',
    es: 'No',
  },
  'ui.cancel': {
    fr: 'Annuler',
    es: 'Cancelar',
  },
  'ui.confirm': {
    fr: 'Confirmer',
    es: 'Confirmar',
  },
  'ui.continue': {
    fr: 'Continuer',
    es: 'Continuar',
  },
  'ui.restart': {
    fr: 'Rejouer',
    es: 'Volver a jugar',
  },
  'ui.choose_other': {
    fr: 'Choisir un autre jeu',
    es: 'Elegir otro juego',
  },
  'ui.congrats': {
    fr: 'Tu as gagné !',
    es: '¡Ganaste!',
  },
  'ui.congrats_desc': {
    fr: 'Félicitations ! Tu as complété la série de 5 étoiles. Tu es un champion des mathématiques !',
    es: '¡Felicidades! Completaste la serie de 5 estrellas. ¡Eres un campeón de las matemáticas!',
  },
  'ui.terminate_quest': {
    fr: 'Terminer la quête ! 🏆',
    es: '¡Terminar la misión! 🏆',
  },
  'ui.continue_adventure': {
    fr: "Continuer l'aventure 🚀",
    es: 'Continuar la aventura 🚀',
  },

  // ─── DIFFICULTY LEVELS ───────────────────────────────
  'difficulty.easy': {
    fr: 'Facile',
    es: 'Fácil',
  },
  'difficulty.normal': {
    fr: 'Normal',
    es: 'Normal',
  },
  'difficulty.challenge': {
    fr: 'Défi',
    es: 'Reto',
  },

  // ─── FEEDBACK PHRASES ────────────────────────────────
  'feedback.correct': {
    fr: [
      "Super ! C'est correct !",
      'Bravo ! Tu as trouvé !',
      'Magnifique ! Tu es fort !',
      'Excellent travail ! Continues !',
      'Génial ! Une étoile pour toi !',
    ],
    es: [
      '¡Súper! ¡Es correcto!',
      '¡Bravo! ¡Lo encontraste!',
      '¡Magnífico! ¡Eres muy bueno!',
      '¡Excelente trabajo! ¡Continúa!',
      '¡Genial! ¡Una estrella para ti!',
    ],
  },
  'feedback.wrong': {
    fr: [
      'Aïe ! Réessaie, tu vas y arriver !',
      'Pas tout à fait ! Regarde bien le dessin.',
      'Presque ! Essaie encore un coup !',
      "Ne t'inquiète pas, réessaie !",
      'Oups ! Essaye un autre nombre !',
    ],
    es: [
      '¡Ay! ¡Inténtalo otra vez, lo lograrás!',
      '¡No del todo! Mira bien el dibujo.',
      '¡Casi! ¡Inténtalo otra vez!',
      'No te preocupes, ¡inténtalo de nuevo!',
      '¡Ups! ¡Prueba con otro número!',
    ],
  },
  'feedback.level_up_normal': {
    fr: 'Super ! Difficulté : Normal !',
    es: '¡Súper! ¡Dificultad: Normal!',
  },
  'feedback.level_up_challenge': {
    fr: 'Incroyable ! Niveau Défi débloqué !',
    es: '¡Increíble! ¡Nivel Reto desbloqueado!',
  },
  'feedback.retry_hint': {
    fr: 'Hmm, essaie encore !',
    es: '¡Hmm, inténtalo otra vez!',
  },
  'feedback.back_to_normal': {
    fr: 'Retour au niveau Normal',
    es: 'Vuelta al nivel Normal',
  },
  'feedback.easy_mode': {
    fr: "Mode Facile activé pour t'aider !",
    es: '¡Modo Fácil activado para ayudarte!',
  },
  'feedback.time_up': {
    fr: 'Temps écoulé !',
    es: '¡Se acabó el tiempo!',
  },
  'feedback.super_fast': {
    fr: 'Super rapide ! Saut de niveau !',
    es: '¡Súper rápido! ¡Salto de nivel!',
  },
  'feedback.streak_bonus': {
    fr: 'Série de {streak} jours ! {stars} étoiles bonus !',
    es: '¡Racha de {streak} días! ¡{stars} estrellas de bonificación!',
  },
  'feedback.badge_unlock': {
    fr: 'Félicitations ! Tu as débloqué le badge "{name}" ! {desc} 🏆',
    es: '¡Felicidades! ¡Desbloqueaste la insignia "{name}"! {desc} 🏆',
  },
  'feedback.multiplayer_winner': {
    fr: 'Félicitations {name} ! Tu remportes le match avec {stars1} ⭐ contre {stars2} ⭐.',
    es: '¡Felicidades {name}! ¡Ganaste el partido con {stars1} ⭐ contra {stars2} ⭐.',
  },

  // ─── FOOTER PHRASES ──────────────────────────────────
  'footer.dit': {
    fr: 'dit',
    es: 'dice',
  },
  'footer.progress_1': {
    fr: 'Waouh ! Tu as déjà accumulé {stars} étoile(s) !{badge} 🏅',
    es: '¡Guau! ¡Ya acumulaste {stars} estrella(s)!{badge} 🏅',
  },
  'footer.progress_2': {
    fr: 'Félicitations pour tes {stars} étoile(s) ! Tu travailles comme un vrai champion ! 🏆',
    es: '¡Felicidades por tus {stars} estrella(s)! ¡Trabajas como un verdadero campeón! 🏆',
  },
  'footer.progress_3': {
    fr: 'Tu as {stars} étoile(s) ! Es-tu prêt à remporter le prochain badge ?{badge} ⭐',
    es: '¡Tienes {stars} estrella(s)! ¿Estás listo para ganar la próxima insignia?{badge} ⭐',
  },
  'footer.progress_4': {
    fr: "Les mathématiques sont un jeu d'enfant avec toi ! Déjà {stars} étoile(s) ! 🎈",
    es: '¡Las matemáticas son un juego de niños contigo! ¡Ya {stars} estrella(s)! 🎈',
  },
  'footer.idle': {
    fr: [
      'Bonjour champion ! Choisis un jeu et amuse-toi !',
      "Tu es très fort en mathématiques ! Continue à t'entraîner !",
      "Chaque bonne réponse te rapproche d'un nouveau badge !",
      "Les mathématiques sont un jeu d'enfant avec toi !",
      "Tu as déjà gagné plein d'étoiles, c'est formidable !",
    ],
    es: [
      '¡Hola campeón! ¡Elige un juego y diviértete!',
      '¡Eres muy bueno en matemáticas! ¡Sigue practicando!',
      '¡Cada respuesta correcta te acerca a una nueva insignia!',
      '¡Las matemáticas son un juego de niños contigo!',
      '¡Ya ganaste muchas estrellas, es genial!',
    ],
  },
  'footer.success': {
    fr: [
      'Incroyable ! Tu as trouvé la bonne réponse !',
      'Bravo ! Ta réponse est tout à fait correcte !',
      'Magnifique ! Tu es le roi des calculs !',
      'Génial ! Une étoile de plus dans ta collection !',
      "Quel talent ! C'est un sans-faute !",
    ],
    es: [
      '¡Increíble! ¡Encontraste la respuesta correcta!',
      '¡Bravo! ¡Tu respuesta es completamente correcta!',
      '¡Magnífico! ¡Eres el rey de los cálculos!',
      '¡Genial! ¡Una estrella más en tu colección!',
      '¡Qué talento! ¡Es impecable!',
    ],
  },
  'footer.retry': {
    fr: [
      "Ne t'inquiète pas ! Essaye encore, tu vas y arriver !",
      'Presque ! Prends ton temps et regarde bien le dessin.',
      "L'erreur fait partie du jeu. Réessaie tranquillement !",
      'Une autre tentative ? Tu es tout près de trouver !',
      'On apprend tous de nos erreurs. Tu vas réussir !',
    ],
    es: [
      '¡No te preocupes! ¡Inténtalo otra vez, lo lograrás!',
      '¡Casi! Tómate tu tiempo y mira bien el dibujo.',
      'El error es parte del juego. ¡Inténtalo con calma!',
      '¿Otro intento? ¡Estás muy cerca de encontrarlo!',
      'Todos aprendemos de nuestros errores. ¡Lo lograrás!',
    ],
  },
  'footer.game_start': {
    fr: [
      "Regarde bien l'image et réfléchis. Quelle est la bonne carte ?",
      'Un nouvel exercice ! Concentre-toi et choisis ta réponse.',
      "Tu as toutes les clés pour réussir cet exercice ! C'est parti !",
      'Observe bien les indices visuels à gauche.',
    ],
    es: [
      'Mira bien la imagen y piensa. ¿Cuál es la carta correcta?',
      '¡Un nuevo ejercicio! Concéntrate y elige tu respuesta.',
      '¡Tienes todas las claves para resolver este ejercicio! ¡Vamos!',
      'Observa bien las pistas visuales a la izquierda.',
    ],
  },

  // ─── QUESTION TEXTS ──────────────────────────────────
  'question.blocs': {
    fr: 'Quel est ce nombre représenté par les blocs ?',
    es: '¿Qué número representan los bloques?',
  },
  'question.ecriture': {
    fr: "Trouve le nombre correspondant à l'écriture :",
    es: 'Encuentra el número correspondiente a la escritura:',
  },
  'question.compte_elements': {
    fr: 'Compte les éléments et trouve le bon nombre :',
    es: 'Cuenta los elementos y encuentra el número correcto:',
  },
  'question.compte': {
    fr: 'Compte les éléments :',
    es: 'Cuenta los elementos:',
  },
  'question.addition_ligne': {
    fr: 'Trouve le résultat de cette addition en ligne :',
    es: 'Encuentra el resultado de esta suma en línea:',
  },
  'question.addition_colonne': {
    fr: 'Calcule cette addition posée en colonne :',
    es: 'Calcula esta suma en columna:',
  },
  'question.soustraction': {
    fr: 'Trouve le résultat de la soustraction : {a} - {b}',
    es: 'Encuentra el resultado de la resta: {a} - {b}',
  },
  'question.calcule_add': {
    fr: 'Calcule vite : {a} + {b} = ?',
    es: 'Calcula rápido: {a} + {b} = ?',
  },
  'question.calcule_sous': {
    fr: 'Calcule vite : {a} - {b} = ?',
    es: 'Calcula rápido: {a} - {b} = ?',
  },
  'question.calcule_mult': {
    fr: 'Calcule vite : {a} × {b} = ?',
    es: 'Calcula rápido: {a} × {b} = ?',
  },
  'question.double': {
    fr: 'Quel est le double de {x} ? ({x} + {x})',
    es: '¿Cuál es el doble de {x}? ({x} + {x})',
  },
  'question.moitie': {
    fr: 'Quelle est la moitié de {y} ?',
    es: '¿Cuál es la mitad de {y}?',
  },
  'question.complement_20': {
    fr: 'Combien de jetons manque-t-il pour faire 20 ? ({x} + ? = 20)',
    es: '¿Cuántos fichas faltan para hacer 20? ({x} + ? = 20)',
  },
  'question.complement_10': {
    fr: 'Combien de jetons manque-t-il pour faire 10 ? ({x} + ? = 10)',
    es: '¿Cuántas fichas faltan para hacer 10? ({x} + ? = 10)',
  },
  'question.figure': {
    fr: "Comment s'appelle cette figure géométrique ?",
    es: '¿Cómo se llama esta figura geométrica?',
  },
  'question.oiseau': {
    fr: 'Où est le petit oiseau bleu ?',
    es: '¿Dónde está el pajarito azul?',
  },
  'question.monnaie': {
    fr: "Combien d'argent y a-t-il dans le porte-monnaie ?",
    es: '¿Cuánto dinero hay en la alcancía?',
  },
  'question.heure': {
    fr: 'Quelle heure indique cette horloge ?',
    es: '¿Qué hora marca este reloj?',
  },
  'question.mesure': {
    fr: 'Combien mesure ce crayon de couleur ?',
    es: '¿Cuánto mide este lápiz de colores?',
  },
  'question.fraction_quelle': {
    fr: 'Quelle fraction de cette barre est coloriée ?',
    es: '¿Qué fracción de esta barra está coloreada?',
  },
  'question.fraction_colorie': {
    fr: 'Colorie la fraction {fraction} de cette barre :',
    es: 'Colorea la fracción {fraction} de esta barra:',
  },
  'question.base_ten': {
    fr: 'Représente le nombre {n} en plaçant des dizaines (10) et des unités (1) :',
    es: 'Representa el número {n} colocando decenas (10) y unidades (1):',
  },
  'question.sequence': {
    fr: "Trouve l'élément manquant dans cette séquence de {family} :",
    es: 'Encuentra el elemento faltante en esta secuencia de {family}:',
  },
  'question.analogie': {
    fr: 'Quel élément complète cette analogie ? {left} est à {right1} comme {right2} est à :',
    es: '¿Qué elemento completa esta analogía? {left} es a {right1} como {right2} es a:',
  },
  'question.shapes': {
    fr: 'Trouve et clique sur tous les {shape} dans le dessin :',
    es: 'Encuentra y haz clic en todos los {shape} del dibujo:',
  },

  // ─── SHAPE NAMES ─────────────────────────────────────
  'shape.carre': { fr: 'carrés', es: 'cuadrados' },
  'shape.rectangle': { fr: 'rectangles', es: 'rectángulos' },
  'shape.triangle': { fr: 'triangles', es: 'triángulos' },
  'shape.cercle': { fr: 'cercles', es: 'círculos' },
  'shape.losange': { fr: 'losanges', es: 'rombos' },
  'shape.hexagone': { fr: 'hexagones', es: 'hexágonos' },
  'shape.octogone': { fr: 'octogones', es: 'octógonos' },
  'shape.etoile': { fr: 'étoiles', es: 'estrellas' },
  'shape.coeur': { fr: 'cœurs', es: 'corazones' },
  'shape.fleche': { fr: 'flèches', es: 'flechas' },

  // ─── CATEGORIES ──────────────────────────────────────
  'cat.A': {
    fr: 'Nombres et Calculs',
    es: 'Números y Cálculos',
  },
  'cat.A.desc': {
    fr: 'Additions, soustractions, multiplications et plus.',
    es: 'Sumas, restas, multiplicaciones y más.',
  },
  'cat.B': {
    fr: 'Espace et Géométrie',
    es: 'Espacio y Geometría',
  },
  'cat.B.desc': {
    fr: 'Figures, formes et vocabulaire spatial.',
    es: 'Figuras, formas y vocabulario espacial.',
  },
  'cat.C': {
    fr: 'Grandeurs et Mesures',
    es: 'Magnitudes y Medidas',
  },
  'cat.C.desc': {
    fr: 'Monnaie, heure et mesures.',
    es: 'Dinero, hora y medidas.',
  },
  'cat.D': {
    fr: 'Logique',
    es: 'Lógica',
  },
  'cat.D.desc': {
    fr: 'Séquences et analogies.',
    es: 'Secuencias y analogías.',
  },

  // ─── GAME NAMES ──────────────────────────────────────
  'game.a_nombres_100': {
    fr: "Les nombres jusqu'à 100",
    es: 'Los números hasta 100',
  },
  'game.a_nombres_100.desc': {
    fr: 'Dizaines, unités et décompositions.',
    es: 'Decenas, unidades y descomposiciones.',
  },
  'game.a_doubles_moities': {
    fr: 'Doubles et moitiés',
    es: 'Dobles y mitades',
  },
  'game.a_doubles_moities.desc': {
    fr: 'Calculer le double ou diviser par deux.',
    es: 'Calcular el doble o dividir por dos.',
  },
  'game.a_complements_10': {
    fr: 'Compléments à 10',
    es: 'Complementos a 10',
  },
  'game.a_complements_10.desc': {
    fr: 'Trouver le nombre qui manque pour faire 10.',
    es: 'Encontrar el número que falta para hacer 10.',
  },
  'game.a_additions': {
    fr: 'Les additions',
    es: 'Las sumas',
  },
  'game.a_additions.desc': {
    fr: 'Opérations en ligne et posées en colonne.',
    es: 'Operaciones en línea y en columna.',
  },
  'game.a_soustractions': {
    fr: 'Les soustractions',
    es: 'Las restas',
  },
  'game.a_soustractions.desc': {
    fr: 'Retirer des objets et calculer la différence.',
    es: 'Quitar objetos y calcular la diferencia.',
  },
  'game.a_add_rapide': {
    fr: 'Addition rapide',
    es: 'Suma rápida',
  },
  'game.a_add_rapide.desc': {
    fr: 'Calcul mental rapide : additionne deux nombres.',
    es: 'Cálculo mental rápido: suma dos números.',
  },
  'game.a_sous_rapide': {
    fr: 'Soustraction rapide',
    es: 'Resta rápida',
  },
  'game.a_sous_rapide.desc': {
    fr: 'Calcul mental rapide : soustrais deux nombres.',
    es: 'Cálculo mental rápido: resta dos números.',
  },
  'game.a_add_sous_rapide': {
    fr: 'Addition / Soustraction rapide',
    es: 'Suma / Resta rápida',
  },
  'game.a_add_sous_rapide.desc': {
    fr: "Mélange aléatoire d'additions et soustractions rapides.",
    es: 'Mezcla aleatoria de sumas y restas rápidas.',
  },
  'game.a_tables_rapides': {
    fr: 'Tables de multiplication rapides',
    es: 'Tablas de multiplicar rápidas',
  },
  'game.a_tables_rapides.desc': {
    fr: 'Répondre vite à des multiplications simples.',
    es: 'Responder rápido a multiplicaciones simples.',
  },
  'game.a_fractions': {
    fr: 'Découvrir les fractions',
    es: 'Descubrir las fracciones',
  },
  'game.a_fractions.desc': {
    fr: 'Représenter des moitiés, tiers et quarts.',
    es: 'Representar mitades, tercios y cuartos.',
  },
  'game.a_compter_100': {
    fr: "Compter jusqu'à 100",
    es: 'Contar hasta 100',
  },
  'game.a_compter_100.desc': {
    fr: 'Compter des objets et retrouver le bon nombre.',
    es: 'Contar objetos y encontrar el número correcto.',
  },
  'game.b_figures': {
    fr: 'Reconnaître les figures',
    es: 'Reconocer las figuras',
  },
  'game.b_figures.desc': {
    fr: 'Carré, rectangle, triangle et cercle.',
    es: 'Cuadrado, rectángulo, triángulo y círculo.',
  },
  'game.b_vocabulaire_spatial': {
    fr: 'Vocabulaire spatial',
    es: 'Vocabulario espacial',
  },
  'game.b_vocabulaire_spatial.desc': {
    fr: 'Au-dessus, en dessous, à gauche, à droite.',
    es: 'Arriba, abajo, a la izquierda, a la derecha.',
  },
  'game.d_sequences': {
    fr: 'Séquences logiques',
    es: 'Secuencias lógicas',
  },
  'game.d_sequences.desc': {
    fr: "Trouver l'élément manquant dans une série.",
    es: 'Encontrar el elemento faltante en una serie.',
  },
  'game.d_analogies': {
    fr: 'Analogies simples',
    es: 'Analogías simples',
  },
  'game.d_analogies.desc': {
    fr: 'Compléter des paires logiques du quotidien.',
    es: 'Completar pares lógicos del día a día.',
  },
  'game.c_monnaie': {
    fr: 'La monnaie',
    es: 'El dinero',
  },
  'game.c_monnaie.desc': {
    fr: 'Sommer des pièces et billets de 1€, 2€, 5€ et 10€.',
    es: 'Sumar monedas y billetes de 1€, 2€, 5€ y 10€.',
  },
  'game.c_heure': {
    fr: "Lire l'heure",
    es: 'Leer la hora',
  },
  'game.c_heure.desc': {
    fr: 'Apprendre à lire les heures piles.',
    es: 'Aprender a leer las horas en punto.',
  },
  'game.c_mesures': {
    fr: 'Mesurer avec une règle',
    es: 'Medir con regla',
  },
  'game.c_mesures.desc': {
    fr: "Lire la longueur d'un objet en centimètres.",
    es: 'Leer la longitud de un objeto en centímetros.',
  },

  // ─── COMPANION STAGES ────────────────────────────────
  'companion.stage.baby': { fr: 'Bébé', es: 'Bebé' },
  'companion.stage.young': { fr: 'Jeune', es: 'Joven' },
  'companion.stage.adult': { fr: 'Adulte', es: 'Adulto' },
  'companion.stage.master': { fr: 'Maître', es: 'Maestro' },
  'companion.stage.legend': { fr: 'Légende', es: 'Leyenda' },

  // ─── COMPANION DESCRIPTIONS ──────────────────────────
  'companion.owl.desc': {
    fr: 'Sage et curieux, Pytha adore les maths !',
    es: '¡Sabio y curioso, Pytha adora las matemáticas!',
  },
  'companion.squirrel.desc': {
    fr: 'Noisette est toujours en mouvement !',
    es: '¡Noisette siempre está en movimiento!',
  },
  'companion.lion.desc': {
    fr: 'Mufasa est courageux et généreux !',
    es: '¡Mufasa es valiente y generoso!',
  },
  'companion.dolphin.desc': {
    fr: 'Splash adore plonger dans les nombres !',
    es: '¡A Splash le encanta sumergirse en los números!',
  },
  'companion.unicorn.desc': {
    fr: 'Stella transforme les maths en magie !',
    es: '¡Stella transforma las matemáticas en magia!',
  },

  // ─── MATH FACTS ──────────────────────────────────────
  mathfacts: {
    fr: [
      "Le zéro n'existe pas dans les nombres naturels ! Les Grecs ne l'avaient pas trouvé.",
      'Les Romains utilisaient des lettres comme chiffres : I = 1, V = 5, X = 10, L = 50.',
      'Un triangle a toujours 3 angles dont la somme fait exactement 180 degrés.',
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
    ],
    es: [
      '¡El cero no existe en los números naturales! Los griegos no lo habían encontrado.',
      'Los romanos usaban letras como números: I = 1, V = 5, X = 10, L = 50.',
      'Un triángulo siempre tiene 3 ángulos cuya suma es exactamente 180 grados.',
      'La pirámide de Keops tiene unos 4500 años y sus lados son casi perfectos.',
      'El número π (pi) empieza por 3,14 ¡pero sus decimales continúan al infinito!',
      'Un círculo tiene 360 grados porque los babilonios usaban un calendario de 360 días.',
      'La multiplicación es una suma que se repite: 3×4 es 3+3+3+3.',
      'El número más jugado en la lotería es el 7, porque mucha gente lo elige.',
      'En matemáticas, un par es divisible por 2, un impar nunca.',
      '¡El número primo más grande conocido tiene más de 24 millones de cifras!',
      'Un cuadrado es un rectángulo especial: todos sus lados son iguales.',
      'La mitad de 1 es 0,5: se puede partir en dos partes iguales.',
      'El número 11 se lee igual de izquierda a derecha que de derecha a izquierda.',
      'Un hexágono tiene 6 lados: las abejas construyen sus panales en hexágonos.',
      'Si das la vuelta al número 6, ¡sale un 9!',
      'La suma de todos los números del 1 al 9 es 45.',
      'Un semicírculo tiene 180 grados: la mitad de un círculo completo.',
      'El número primo más pequeño es 2, también es el único par primo.',
      '1 metro = 100 centímetros = 1000 milímetros.',
      'Una hora tiene 60 minutos, y un minuto tiene 60 segundos.',
      'El triángulo más sólido es el triángulo: se usa en puentes y techos.',
      'Los dedos de nuestras manos suman 10 unidades, por eso contamos en base 10.',
      'El número más pequeño que no es primo ni compuesto es 1.',
      'Un rombo tiene 4 lados iguales, como un cuadrado inclinado.',
      'La división es como repartir caramelos entre amigos.',
      '5×5 = 25, ¡es el mismo número al revés!',
      'Los colores del arcoíris siguen el orden: ROJO, NARANJA, AMARILLO, VERDE, AZUL, ÍNDIGO, VIOLETA.',
      'Un milímetro es tan pequeño como una línea de lápiz.',
      'Un cubo tiene 6 caras idénticas, 12 aristas y 8 vértices.',
      'Cuando sumamos todos los números pares del 2 al 8, obtenemos 20.',
    ],
  },

  // ─── ACCESSIBILITY ───────────────────────────────────
  'accessibility.autoplay': {
    fr: 'Lecture Vocale Automatique',
    es: 'Lectura de Voz Automática',
  },
  'accessibility.autoplay_desc': {
    fr: 'Lit les questions à haute voix au chargement.',
    es: 'Lee las preguntas en voz alta al cargar.',
  },
  'accessibility.contrast': {
    fr: 'Mode Contraste Élevé',
    es: 'Modo Alto Contraste',
  },

  // ─── PARENT DASHBOARD ────────────────────────────────
  'dashboard.title': {
    fr: 'Tableau de bord',
    es: 'Panel de control',
  },
  'dashboard.subtitle': {
    fr: "Rapport d'apprentissage et tendances de progression.",
    es: 'Informe de aprendizaje y tendencias de progreso.',
  },
  'dashboard.overview': {
    fr: "Vue d'ensemble",
    es: 'Vista general',
  },
  'dashboard.total_stars': {
    fr: 'Étoiles totales',
    es: 'Estrellas totales',
  },
  'dashboard.exercises': {
    fr: 'Exercices',
    es: 'Ejercicios',
  },
  'dashboard.accuracy': {
    fr: 'Réussite',
    es: 'Aciertos',
  },
  'dashboard.sessions': {
    fr: 'Sessions',
    es: 'Sesiones',
  },
  'dashboard.category_progress': {
    fr: 'Progression par catégorie',
    es: 'Progreso por categoría',
  },
  'dashboard.game_detail': {
    fr: 'Détail par jeu',
    es: 'Detalle por juego',
  },
  'dashboard.errors': {
    fr: 'Points à améliorer',
    es: 'Puntos a mejorar',
  },
  'dashboard.history': {
    fr: 'Historique des sessions',
    es: 'Historial de sesiones',
  },
  'dashboard.no_data': {
    fr: 'Pas encore de données. Joue pour commencer !',
    es: 'Aún no hay datos. ¡Juega para empezar!',
  },

  // ─── QUEST NARRATIVES ────────────────────────────────
  'quest.intro': {
    fr: '<b>Pytha l\'Hibou</b> : <br/>"Salut jeune mathématicien ! L\'hiver approche..."',
    es: '<b>Pytha el Búho</b> : <br/>"¡Hola joven matemático! El invierno se acerca..."',
  },

  // ─── MULTIPLAYER ─────────────────────────────────────
  'multiplayer.no_matches': {
    fr: 'Aucun match joué pour le moment.',
    es: 'Ningún partido jugado por el momento.',
  },
  'multiplayer.match_of': {
    fr: 'Match du',
    es: 'Partido del',
  },
  'multiplayer.vs': {
    fr: 'vs',
    es: 'vs',
  },

  // ─── BADGES ──────────────────────────────────────────
  'badge.unlocked': {
    fr: 'Débloqué !',
    es: '¡Desbloqueado!',
  },
  'badge.new_unlocked': {
    fr: 'Nouveau Badge Débloqué !',
    es: '¡Nueva Insignia Desbloqueada!',
  },
  'badge.stars': {
    fr: 'étoiles',
    es: 'estrellas',
  },
  'badge.days_streak': {
    fr: 'Série de {n} jours',
    es: 'Racha de {n} días',
  },
  'badge.accuracy': {
    fr: 'de précision',
    es: 'de precisión',
  },
  'badge.speed': {
    fr: 'Répondre en <{n}s en moyenne',
    es: 'Responder en <{n}s en promedio',
  },
  'badge.game_50': {
    fr: '50 réponses en {game}',
    es: '50 respuestas en {game}',
  },
  'badge.total_100': {
    fr: '100 réponses en un seul jeu',
    es: '100 respuestas en un solo juego',
  },
  'badge.category_100': {
    fr: '100 bonnes réponses en {cat}',
    es: '100 respuestas correctas en {cat}',
  },
  'badge.difficulty_reached': {
    fr: 'Atteindre le niveau {diff}',
    es: 'Alcanzar el nivel {diff}',
  },
  'badge.challenge_mastered': {
    fr: 'Réussir 50 questions en Défi',
    es: 'Resolver 50 preguntas en Reto',
  },
  'badge.sessions_played': {
    fr: '{n} sessions jouées',
    es: '{n} sesiones jugadas',
  },
  'badge.perfect_sessions': {
    fr: '{n} sessions sans erreur',
    es: '{n} sesiones sin error',
  },
  'badge.first_star': {
    fr: 'Gagner sa première étoile',
    es: 'Ganar su primera estrella',
  },
  'badge.all_games': {
    fr: 'Jouer à tous les jeux',
    es: 'Jugar a todos los juegos',
  },
  'badge.session_stars': {
    fr: 'Gagner {n} étoiles en une session',
    es: 'Ganar {n} estrellas en una sesión',
  },
  'badge.consecutive': {
    fr: "{n} bonnes réponses d'affilée",
    es: '{n} respuestas correctas seguidas',
  },
  'badge.time_of_day_early': {
    fr: 'Jouer avant 8h',
    es: 'Jugar antes de las 8h',
  },
  'badge.time_of_day_late': {
    fr: 'Jouer après 20h',
    es: 'Jugar después de las 20h',
  },

  // ─── LANGUAGE SELECTOR ───────────────────────────────
  'lang.fr': {
    fr: 'Français',
    es: 'Francés',
  },
  'lang.es': {
    fr: 'Espagnol',
    es: 'Español',
  },
};

export { CATALOG };
