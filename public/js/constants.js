// =============================================
// CONSTANTS — All data definitions
// =============================================

import { t, tArray, getLang } from './i18n.js';

export function getSuccessPhrase() {
  const arr = tArray('feedback.correct');
  return arr[Math.floor(Math.random() * arr.length)] || 'Super !';
}

export function getFailPhrase() {
  const arr = tArray('feedback.wrong');
  return arr[Math.floor(Math.random() * arr.length)] || 'Réessaie !';
}

export function getFooterPhrase(category) {
  const arr = tArray(`footer.${category}`);
  if (!arr || arr.length === 0) return '';
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getMathFact() {
  const arr = tArray('mathfacts');
  return arr[Math.floor(Math.random() * arr.length)] || '';
}

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getCategories() {
  const lang = getLang();
  return {
    A: {
      name: t('cat.A'),
      color: 'brand-purple',
      games: [
        {
          id: 'a_nombres_100',
          name: t('game.a_nombres_100'),
          desc: t('game.a_nombres_100.desc'),
        },
        {
          id: 'a_doubles_moities',
          name: t('game.a_doubles_moities'),
          desc: t('game.a_doubles_moities.desc'),
        },
        {
          id: 'a_complements_10',
          name: t('game.a_complements_10'),
          desc: t('game.a_complements_10.desc'),
        },
        {
          id: 'a_additions',
          name: t('game.a_additions'),
          desc: t('game.a_additions.desc'),
        },
        {
          id: 'a_soustractions',
          name: t('game.a_soustractions'),
          desc: t('game.a_soustractions.desc'),
        },
        {
          id: 'a_add_rapide',
          name: t('game.a_add_rapide'),
          desc: t('game.a_add_rapide.desc'),
        },
        {
          id: 'a_sous_rapide',
          name: t('game.a_sous_rapide'),
          desc: t('game.a_sous_rapide.desc'),
        },
        {
          id: 'a_add_sous_rapide',
          name: t('game.a_add_sous_rapide'),
          desc: t('game.a_add_sous_rapide.desc'),
        },
        {
          id: 'a_tables_rapides',
          name: t('game.a_tables_rapides'),
          desc: t('game.a_tables_rapides.desc'),
        },
        {
          id: 'a_fractions',
          name: t('game.a_fractions'),
          desc: t('game.a_fractions.desc'),
        },
        {
          id: 'a_compter_100',
          name: t('game.a_compter_100'),
          desc: t('game.a_compter_100.desc'),
        },
      ],
    },
    B: {
      name: t('cat.B'),
      color: 'brand-green',
      games: [
        {
          id: 'b_figures',
          name: t('game.b_figures'),
          desc: t('game.b_figures.desc'),
        },
        {
          id: 'b_vocabulaire_spatial',
          name: t('game.b_vocabulaire_spatial'),
          desc: t('game.b_vocabulaire_spatial.desc'),
        },
      ],
    },
    D: {
      name: t('cat.D'),
      color: 'brand-pink',
      games: [
        {
          id: 'd_sequences',
          name: t('game.d_sequences'),
          desc: t('game.d_sequences.desc'),
        },
        {
          id: 'd_analogies',
          name: t('game.d_analogies'),
          desc: t('game.d_analogies.desc'),
        },
      ],
    },
    C: {
      name: t('cat.C'),
      color: 'brand-orange',
      games: [
        {
          id: 'c_monnaie',
          name: t('game.c_monnaie'),
          desc: t('game.c_monnaie.desc'),
        },
        {
          id: 'c_heure',
          name: t('game.c_heure'),
          desc: t('game.c_heure.desc'),
        },
        {
          id: 'c_mesures',
          name: t('game.c_mesures'),
          desc: t('game.c_mesures.desc'),
        },
      ],
    },
  };
}

export const COMPANION_STAGES = [
  { labelKey: 'companion.stage.baby', minStars: 0 },
  { labelKey: 'companion.stage.young', minStars: 10 },
  { labelKey: 'companion.stage.adult', minStars: 25 },
  { labelKey: 'companion.stage.master', minStars: 50 },
  { labelKey: 'companion.stage.legend', minStars: 100 },
];

export function getCompanionStageLabel(stage) {
  return t(stage.labelKey);
}

export const COMPANIONS = {
  owl: {
    name: 'Pytha',
    emoji: '🦉',
    color: 'brand-purple',
    colorHex: '#6C5DD3',
    lightHex: '#F3F0FF',
    descKey: 'companion.owl.desc',
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
    descKey: 'companion.squirrel.desc',
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
    descKey: 'companion.lion.desc',
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
    descKey: 'companion.dolphin.desc',
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
    descKey: 'companion.unicorn.desc',
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
    descKey: 'badge.stars',
    descParams: { n: 5 },
    cond: { type: 'stars', value: 5 },
    svg: (l) => badgeSvg('shield', '#D38B5D', '#A0522D', '🐿️', '#8B4513', l),
  },
  {
    id: 'badge_rabbit',
    name: 'Le Lapin Rapide',
    descKey: 'badge.stars',
    descParams: { n: 10 },
    cond: { type: 'stars', value: 10 },
    svg: (l) => badgeSvg('circle', '#E2E8F0', '#94A3B8', '🐇', '#64748B', l),
  },
  {
    id: 'badge_owl',
    name: 'Le Hibou Sage',
    descKey: 'badge.stars',
    descParams: { n: 20 },
    cond: { type: 'stars', value: 20 },
    svg: (l) => badgeSvg('circle', '#FEF08A', '#EAB308', '🦉', '#92400E', l),
  },
  {
    id: 'badge_dolphin',
    name: 'Le Dauphin Malin',
    descKey: 'badge.stars',
    descParams: { n: 35 },
    cond: { type: 'stars', value: 35 },
    svg: (l) => badgeSvg('circle', '#E0F2FE', '#0EA5E9', '🐬', '#0369A1', l),
  },
  {
    id: 'badge_lion',
    name: 'Le Lion Champion',
    descKey: 'badge.stars',
    descParams: { n: 50 },
    cond: { type: 'stars', value: 50 },
    svg: (l) => badgeSvg('shield', '#FEE2E2', '#EF4444', '🦁', '#B91C1C', l),
  },
  {
    id: 'badge_unicorn',
    name: 'La Licorne Magique',
    descKey: 'badge.stars',
    descParams: { n: 75 },
    cond: { type: 'stars', value: 75 },
    svg: (l) => badgeSvg('shield', '#F5F3FF', '#D946EF', '🦄', '#7C3AED', l),
  },
  {
    id: 'badge_dragon',
    name: 'Le Dragon de Légende',
    descKey: 'badge.stars',
    descParams: { n: 100 },
    cond: { type: 'stars', value: 100 },
    svg: (l) => badgeSvg('shield', '#FFFBEB', '#F59E0B', '🐉', '#92400E', l),
  },
  {
    id: 'badge_phoenix',
    name: 'Le Phénix Ardent',
    descKey: 'badge.stars',
    descParams: { n: 150 },
    cond: { type: 'stars', value: 150 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#F97316', '🔥', '#9A3412', l),
  },
  {
    id: 'badge_griffin',
    name: 'Le Griffe Royal',
    descKey: 'badge.stars',
    descParams: { n: 200 },
    cond: { type: 'stars', value: 200 },
    svg: (l) => badgeSvg('shield', '#FEE2E2', '#DC2626', '👑', '#7F1D1D', l),
  },
  {
    id: 'badge_kraken',
    name: 'Le Kraken des Océans',
    descKey: 'badge.stars',
    descParams: { n: 250 },
    cond: { type: 'stars', value: 250 },
    svg: (l) => badgeSvg('circle', '#E0F2FE', '#0284C7', '🐙', '#0C4A6E', l),
  },
  {
    id: 'badge_pegasus',
    name: 'Le Pégase Céleste',
    descKey: 'badge.stars',
    descParams: { n: 300 },
    cond: { type: 'stars', value: 300 },
    svg: (l) => badgeSvg('shield', '#F0F9FF', '#0EA5E9', '🐴', '#0C4A6E', l),
  },
  {
    id: 'badge_phoenix2',
    name: 'Le Simurgh Antique',
    descKey: 'badge.stars',
    descParams: { n: 400 },
    cond: { type: 'stars', value: 400 },
    svg: (l) => badgeSvg('shield', '#ECFDF5', '#10B981', '🦅', '#064E3B', l),
  },
  {
    id: 'badge_titan',
    name: "Le Titan de l'Olympe",
    descKey: 'badge.stars',
    descParams: { n: 500 },
    cond: { type: 'stars', value: 500 },
    svg: (l) => badgeSvg('shield', '#FEF9C3', '#EAB308', '⚡', '#713F12', l),
  },
  {
    id: 'badge_void',
    name: 'Le Gardien du Cosmos',
    descKey: 'badge.stars',
    descParams: { n: 750 },
    cond: { type: 'stars', value: 750 },
    svg: (l) => badgeSvg('circle', '#1E1B4B', '#6366F1', '🌌', '#A5B4FC', l),
  },
  {
    id: 'badge_immortal',
    name: "L'Immortel Mathématique",
    descKey: 'badge.stars',
    descParams: { n: 1000 },
    cond: { type: 'stars', value: 1000 },
    svg: (l) => badgeSvg('shield', '#FFFBEB', '#F59E0B', '✨', '#78350F', l),
  },
  {
    id: 'badge_streak3',
    name: 'Flamme naissante',
    descKey: 'badge.days_streak',
    descParams: { n: 3 },
    cond: { type: 'streak', value: 3 },
    svg: (l) => badgeSvg('circle', '#FEF3C7', '#FB923C', '🔥', '#9A3412', l),
  },
  {
    id: 'badge_streak7',
    name: 'Braise Ardente',
    descKey: 'badge.days_streak',
    descParams: { n: 7 },
    cond: { type: 'streak', value: 7 },
    svg: (l) => badgeSvg('circle', '#FEE2E2', '#EF4444', '🔥', '#991B1B', l),
  },
  {
    id: 'badge_streak14',
    name: 'Feu de Joie',
    descKey: 'badge.days_streak',
    descParams: { n: 14 },
    cond: { type: 'streak', value: 14 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#F97316', '🔥', '#7C2D12', l),
  },
  {
    id: 'badge_streak30',
    name: 'Incendie Céleste',
    descKey: 'badge.days_streak',
    descParams: { n: 30 },
    cond: { type: 'streak', value: 30 },
    svg: (l) => badgeSvg('shield', '#FEE2E2', '#DC2626', '🔥', '#7F1D1D', l),
  },
  {
    id: 'badge_streak60',
    name: 'Légende de la Flamme',
    descKey: 'badge.days_streak',
    descParams: { n: 60 },
    cond: { type: 'streak', value: 60 },
    svg: (l) => badgeSvg('shield', '#FDE68A', '#D97706', '🔥', '#451A03', l),
  },
  {
    id: 'badge_acc60',
    name: 'Bon Début',
    descKey: 'badge.accuracy',
    descParams: { n: '60%' },
    cond: { type: 'accuracy', value: 0.6 },
    svg: (l) => badgeSvg('circle', '#D1FAE5', '#34D399', '🎯', '#065F46', l),
  },
  {
    id: 'badge_acc70',
    name: "Tireur d'Élite",
    descKey: 'badge.accuracy',
    descParams: { n: '70%' },
    cond: { type: 'accuracy', value: 0.7 },
    svg: (l) => badgeSvg('circle', '#D1FAE5', '#10B981', '🎯', '#064E3B', l),
  },
  {
    id: 'badge_acc80',
    name: 'Précision Parfaite',
    descKey: 'badge.accuracy',
    descParams: { n: '80%' },
    cond: { type: 'accuracy', value: 0.8 },
    svg: (l) => badgeSvg('shield', '#D1FAE5', '#059669', '🎯', '#064E3B', l),
  },
  {
    id: 'badge_acc90',
    name: 'Maître de la Vise',
    descKey: 'badge.accuracy',
    descParams: { n: '90%' },
    cond: { type: 'accuracy', value: 0.9 },
    svg: (l) => badgeSvg('shield', '#ECFDF5', '#047857', '🎯', '#022C22', l),
  },
  {
    id: 'badge_acc100',
    name: 'Infaillible',
    descKey: 'badge.accuracy',
    descParams: { n: '100%' },
    cond: { type: 'accuracy', value: 1.0 },
    svg: (l) => badgeSvg('shield', '#F0FDF4', '#16A34A', '💎', '#14532D', l),
  },
  {
    id: 'badge_speed8',
    name: 'Éclair',
    descKey: 'badge.speed',
    descParams: { n: 8 },
    cond: { type: 'speed', value: 8000 },
    svg: (l) => badgeSvg('circle', '#FEF3C7', '#FBBF24', '⚡', '#78350F', l),
  },
  {
    id: 'badge_speed6',
    name: 'Foudre',
    descKey: 'badge.speed',
    descParams: { n: 6 },
    cond: { type: 'speed', value: 6000 },
    svg: (l) => badgeSvg('circle', '#FEF9C3', '#F59E0B', '⚡', '#713F12', l),
  },
  {
    id: 'badge_speed5',
    name: 'Supersonique',
    descKey: 'badge.speed',
    descParams: { n: 5 },
    cond: { type: 'speed', value: 5000 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#D97706', '⚡', '#451A03', l),
  },
  {
    id: 'badge_speed4',
    name: 'Flash Mathématique',
    descKey: 'badge.speed',
    descParams: { n: 4 },
    cond: { type: 'speed', value: 4000 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#B45309', '⚡', '#451A03', l),
  },
  {
    id: 'badge_speed3',
    name: 'Vitesse de la Pensée',
    descKey: 'badge.speed',
    descParams: { n: 3 },
    cond: { type: 'speed', value: 3000 },
    svg: (l) => badgeSvg('shield', '#FEF9C3', '#92400E', '⚡', '#451A03', l),
  },
  {
    id: 'badge_nombres50',
    name: 'Explorateur des Nombres',
    descKey: 'badge.game_50',
    descParams: { game: 'Nombres' },
    cond: { type: 'game_total', game: 'a_nombres_100', value: 50 },
    svg: (l) => badgeSvg('circle', '#F3E8FF', '#A855F7', '🔢', '#6B21A8', l),
  },
  {
    id: 'badge_additions50',
    name: 'Roi des Additions',
    descKey: 'badge.game_50',
    descParams: { game: 'Additions' },
    cond: { type: 'game_total', game: 'a_additions', value: 50 },
    svg: (l) => badgeSvg('circle', '#DBEAFE', '#3B82F6', '➕', '#1E3A5F', l),
  },
  {
    id: 'badge_sous50',
    name: 'Maître des Soustractions',
    descKey: 'badge.game_50',
    descParams: { game: 'Soustractions' },
    cond: { type: 'game_total', game: 'a_soustractions', value: 50 },
    svg: (l) => badgeSvg('circle', '#FEE2E2', '#EF4444', '➖', '#7F1D1D', l),
  },
  {
    id: 'badge_doubles50',
    name: 'Le Doubleur',
    descKey: 'badge.game_50',
    descParams: { game: 'Doubles' },
    cond: { type: 'game_total', game: 'a_doubles_moities', value: 50 },
    svg: (l) => badgeSvg('circle', '#FEF3C7', '#F59E0B', '✖️', '#713F12', l),
  },
  {
    id: 'badge_comp1050',
    name: 'Complémentiste',
    descKey: 'badge.game_50',
    descParams: { game: 'Compléments' },
    cond: { type: 'game_total', game: 'a_complements_10', value: 50 },
    svg: (l) => badgeSvg('circle', '#D1FAE5', '#10B981', '🔟', '#064E3B', l),
  },
  {
    id: 'badge_figures50',
    name: 'Architecte des Formes',
    descKey: 'badge.game_50',
    descParams: { game: 'Figures' },
    cond: { type: 'game_total', game: 'b_figures', value: 50 },
    svg: (l) => badgeSvg('circle', '#E0E7FF', '#6366F1', '🔷', '#3730A3', l),
  },
  {
    id: 'badge_spatial50',
    name: 'Navigateur Spatial',
    descKey: 'badge.game_50',
    descParams: { game: 'Vocabulaire' },
    cond: { type: 'game_total', game: 'b_vocabulaire_spatial', value: 50 },
    svg: (l) => badgeSvg('circle', '#FCE7F3', '#EC4899', '🧭', '#831843', l),
  },
  {
    id: 'badge_monnaie50',
    name: 'Le Banquier',
    descKey: 'badge.game_50',
    descParams: { game: 'Monnaie' },
    cond: { type: 'game_total', game: 'c_monnaie', value: 50 },
    svg: (l) => badgeSvg('circle', '#FEF9C3', '#EAB308', '💰', '#713F12', l),
  },
  {
    id: 'badge_heure50',
    name: 'Maître du Temps',
    descKey: 'badge.game_50',
    descParams: { game: 'Heure' },
    cond: { type: 'game_total', game: 'c_heure', value: 50 },
    svg: (l) => badgeSvg('circle', '#F3E8FF', '#C084FC', '⏰', '#581C87', l),
  },
  {
    id: 'badge_mesures50',
    name: 'Le Mesureur',
    descKey: 'badge.game_50',
    descParams: { game: 'Mesures' },
    cond: { type: 'game_total', game: 'c_mesures', value: 50 },
    svg: (l) => badgeSvg('circle', '#DBEAFE', '#93C5FD', '📏', '#1E3A5F', l),
  },
  {
    id: 'badge_fractions50',
    name: 'Découpeur de Parts',
    descKey: 'badge.game_50',
    descParams: { game: 'Fractions' },
    cond: { type: 'game_total', game: 'a_fractions', value: 50 },
    svg: (l) => badgeSvg('circle', '#EDE9FE', '#A78BFA', '🍕', '#4C1D95', l),
  },
  {
    id: 'badge_100total',
    name: 'Centurion',
    descKey: 'badge.total_100',
    descParams: {},
    cond: { type: 'game_total_any', value: 100 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#F59E0B', '💯', '#713F12', l),
  },
  {
    id: 'badge_catA',
    name: 'Maître des Nombres',
    descKey: 'badge.category_100',
    descParams: { cat: 'Nombres' },
    cond: { type: 'category_correct', category: 'A', value: 100 },
    svg: (l) => badgeSvg('shield', '#F3E8FF', '#9333EA', '📐', '#581C87', l),
  },
  {
    id: 'badge_catB',
    name: 'Géomètre en Chef',
    descKey: 'badge.category_100',
    descParams: { cat: 'Géométrie' },
    cond: { type: 'category_correct', category: 'B', value: 100 },
    svg: (l) => badgeSvg('shield', '#D1FAE5', '#059669', '📐', '#022C22', l),
  },
  {
    id: 'badge_catC',
    name: 'Mesureur Expert',
    descKey: 'badge.category_100',
    descParams: { cat: 'Mesures' },
    cond: { type: 'category_correct', category: 'C', value: 100 },
    svg: (l) => badgeSvg('shield', '#FFF7ED', '#EA580C', '📐', '#7C2D12', l),
  },
  {
    id: 'badge_diff_normal',
    name: 'Niveau Normal',
    descKey: 'badge.difficulty_reached',
    descParams: { diff: 'Normal' },
    cond: { type: 'difficulty', value: 'normal' },
    svg: (l) => badgeSvg('circle', '#DBEAFE', '#3B82F6', '🔵', '#1E3A5F', l),
  },
  {
    id: 'badge_diff_challenge',
    name: 'Défi Relevé',
    descKey: 'badge.difficulty_reached',
    descParams: { diff: 'Défi' },
    cond: { type: 'difficulty', value: 'challenge' },
    svg: (l) => badgeSvg('circle', '#FEE2E2', '#EF4444', '🔥', '#991B1B', l),
  },
  {
    id: 'badge_diff_legend',
    name: 'Légende du Défi',
    descKey: 'badge.challenge_mastered',
    descParams: {},
    cond: { type: 'challenge_mastered', value: 50 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#D97706', '🏆', '#451A03', l),
  },
  {
    id: 'badge_sessions10',
    name: 'Habitué',
    descKey: 'badge.sessions_played',
    descParams: { n: 10 },
    cond: { type: 'sessions', value: 10 },
    svg: (l) => badgeSvg('circle', '#F0F9FF', '#0EA5E9', '📚', '#0C4A6E', l),
  },
  {
    id: 'badge_sessions25',
    name: 'Assidu',
    descKey: 'badge.sessions_played',
    descParams: { n: 25 },
    cond: { type: 'sessions', value: 25 },
    svg: (l) => badgeSvg('circle', '#EDE9FE', '#8B5CF6', '📚', '#4C1D95', l),
  },
  {
    id: 'badge_sessions50',
    name: 'Infatigable',
    descKey: 'badge.sessions_played',
    descParams: { n: 50 },
    cond: { type: 'sessions', value: 50 },
    svg: (l) => badgeSvg('shield', '#F3E8FF', '#7C3AED', '📚', '#4C1D95', l),
  },
  {
    id: 'badge_perfect5',
    name: 'Session Parfaite',
    descKey: 'badge.perfect_sessions',
    descParams: { n: 5 },
    cond: { type: 'perfect_session', value: 5 },
    svg: (l) => badgeSvg('circle', '#ECFDF5', '#10B981', '💎', '#064E3B', l),
  },
  {
    id: 'badge_perfect15',
    name: 'Perfection Absolue',
    descKey: 'badge.perfect_sessions',
    descParams: { n: 15 },
    cond: { type: 'perfect_session', value: 15 },
    svg: (l) => badgeSvg('shield', '#F0FDF4', '#16A34A', '💎', '#14532D', l),
  },
  {
    id: 'badge_first_star',
    name: 'Premier Pas',
    descKey: 'badge.first_star',
    descParams: {},
    cond: { type: 'stars', value: 1 },
    svg: (l) => badgeSvg('circle', '#FEF9C3', '#FBBF24', '⭐', '#78350F', l),
  },
  {
    id: 'badge_all_games',
    name: 'Explorateur Complet',
    descKey: 'badge.all_games',
    descParams: {},
    cond: { type: 'all_games_played' },
    svg: (l) => badgeSvg('shield', '#E0E7FF', '#6366F1', '🗺️', '#3730A3', l),
  },
  {
    id: 'badge_5_stars_session',
    name: 'Session Dorée',
    descKey: 'badge.session_stars',
    descParams: { n: 5 },
    cond: { type: 'session_stars', value: 5 },
    svg: (l) => badgeSvg('circle', '#FEF3C7', '#F59E0B', '🌟', '#713F12', l),
  },
  {
    id: 'badge_10_stars_session',
    name: 'Session Légendaire',
    descKey: 'badge.session_stars',
    descParams: { n: 10 },
    cond: { type: 'session_stars', value: 10 },
    svg: (l) => badgeSvg('shield', '#FEF3C7', '#D97706', '🌟', '#451A03', l),
  },
  {
    id: 'badge_consecutive5',
    name: 'Enchaînement',
    descKey: 'badge.consecutive',
    descParams: { n: 5 },
    cond: { type: 'consecutive', value: 5 },
    svg: (l) => badgeSvg('circle', '#D1FAE5', '#34D399', '🔗', '#065F46', l),
  },
  {
    id: 'badge_consecutive10',
    name: 'Combo Dévastateur',
    descKey: 'badge.consecutive',
    descParams: { n: 10 },
    cond: { type: 'consecutive', value: 10 },
    svg: (l) => badgeSvg('circle', '#D1FAE5', '#10B981', '🔗', '#064E3B', l),
  },
  {
    id: 'badge_consecutive20',
    name: 'Invincible',
    descKey: 'badge.consecutive',
    descParams: { n: 20 },
    cond: { type: 'consecutive', value: 20 },
    svg: (l) => badgeSvg('shield', '#ECFDF5', '#059669', '🔗', '#022C22', l),
  },
  {
    id: 'badge_night_owl',
    name: 'Choucheur Nocturne',
    descKey: 'badge.time_of_day_late',
    descParams: {},
    cond: { type: 'time_of_day', value: 20 },
    svg: (l) => badgeSvg('circle', '#1E1B4B', '#6366F1', '🌙', '#A5B4FC', l),
  },
  {
    id: 'badge_early_bird',
    name: 'Petit Matin',
    descKey: 'badge.time_of_day_early',
    descParams: {},
    cond: { type: 'time_of_day', value: 8 },
    svg: (l) => badgeSvg('circle', '#FEF9C3', '#FBBF24', '🌅', '#78350F', l),
  },
];

export const QUESTION_TIME_LIMIT = 15;

export const PLAYTIME_LIMIT = 60 * 60 * 1000;
export const LOCKOUT_DURATION = 30 * 60 * 1000;
export const DECAY_BREAK_DURATION = 30 * 60 * 1000;

export const RECENTLY_SEEN_SIZE = 8;
export let recentlySeen = {};

export function FOOTER_PHRASES(type) {
  return tArray(`footer.${type}`);
}

export function CATEGORIES() {
  return getCategories();
}
