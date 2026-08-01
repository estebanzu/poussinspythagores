// =============================================
// UI — All visual DOM updates
// =============================================

import {
  state,
  companionData,
  multiplayerState,
  questState,
  windowToastTimeout,
  setWindowToastTimeout,
} from './state.js';
import {
  BADGES,
  CATEGORIES,
  FOOTER_PHRASES,
  COMPANIONS,
  COMPANION_STAGES,
} from './constants.js';
import { getGameStats, getAvgResponseTime } from './storage.js';
import { shuffleArray } from './utils.js';

export function updateStarsUI() {
  document.getElementById('global-stars-text').innerText = state.stars;
  checkBadgeUnlocks();
  updateBadgeCountUI();
  updateFooterCompanion();
  const headerIcon = document.getElementById('header-companion-icon');
  if (headerIcon) headerIcon.innerText = getCompanion().emoji;
}

export function updateSessionStarsUI() {
  const container = document.getElementById('star-dots-container');
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= state.sessionStars) {
      starsHtml += `<svg class="w-7 h-7 fill-brand-yellow text-brand-orange animate-bounce-slow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>`;
    } else {
      starsHtml += `<svg class="w-7 h-7 text-slate-300 fill-slate-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>`;
    }
  }
  if (container) container.innerHTML = starsHtml;
}

export function showToast(isSuccess, message) {
  const toast = document.getElementById('feedback-toast');
  const card = document.getElementById('feedback-toast-card');
  const text = document.getElementById('feedback-toast-text');
  const emoji = document.getElementById('feedback-toast-emoji');
  if (!toast || !card || !text || !emoji) return;

  if (isSuccess) {
    card.className =
      'px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border-4 bg-brand-green-light border-brand-green text-brand-green-dark animate-pop-in' +
      (message.length > 40 ? ' max-w-lg' : '');
    emoji.innerText = '🎉';
  } else {
    card.className =
      'px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border-4 bg-brand-pink-light border-brand-pink text-brand-pink-dark animate-pop-in';
    emoji.innerText = '💡';
  }
  text.innerText = message;
  toast.classList.remove('translate-y-32', 'opacity-0');

  if (windowToastTimeout) clearTimeout(windowToastTimeout);
  setWindowToastTimeout(
    setTimeout(
      () => {
        toast.classList.add('translate-y-32', 'opacity-0');
      },
      message.length > 40 ? 6000 : 3000
    )
  );
}

export function updateProgressBar() {
  const container = document.getElementById('game-progress-container');
  const bar = document.getElementById('game-progress-bar');
  const label = document.getElementById('game-progress-label');
  const pct = document.getElementById('game-progress-pct');
  if (!container || !bar || !label || !pct) return;

  container.classList.remove('hidden');
  const progText = document.getElementById('game-progress-text');
  if (progText) progText.classList.remove('hidden');
  const total = state.questionCount;
  const current = Math.min(state.questionNumber, total);
  const percent = Math.round((current / total) * 100);

  bar.style.width = percent + '%';
  label.innerText = `Question ${current}/${total}`;
  pct.innerText = percent + '%';
}

export function hideProgressBar() {
  const container = document.getElementById('game-progress-container');
  const progText = document.getElementById('game-progress-text');
  if (container) container.classList.add('hidden');
  if (progText) progText.classList.add('hidden');
}

export function updateDifficultyUI() {
  const badge = document.getElementById('difficulty-badge');
  if (!badge) return;
  if (state.difficulty === 'easy') {
    badge.className =
      'px-4 py-2 rounded-full font-title text-xs font-bold shadow-sm border-2 bg-emerald-50 border-emerald-300 text-emerald-700 animate-pulse';
    badge.innerHTML = '🟢 Facile';
  } else if (state.difficulty === 'challenge') {
    badge.className =
      'px-4 py-2 rounded-full font-title text-xs font-bold shadow-sm border-2 bg-rose-50 border-rose-400 text-rose-600 animate-pulse';
    badge.innerHTML = '🔥 Défi !';
  } else {
    badge.className =
      'px-4 py-2 rounded-full font-title text-xs font-bold shadow-sm border-2 bg-sky-50 border-sky-300 text-sky-700';
    badge.innerHTML = '🔵 Normal';
  }
}

export function renderOptions(correct, distractors, container) {
  const allChoices = shuffleArray([correct, ...distractors]);
  container.innerHTML = '';
  allChoices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className =
      'w-full min-h-[64px] bg-white hover:bg-slate-50 border-4 border-slate-200 active:border-brand-blue rounded-2xl shadow-md text-xl font-bold font-title flex items-center justify-center p-3 transform active:translate-y-1 active:shadow-sm transition-all';
    btn.innerText = choice;
    btn.onclick = () => checkAnswer(choice, btn);
    container.appendChild(btn);
  });
}

export function updateFooterMessage(type) {
  const textEl = document.getElementById('footer-motivational-text');
  const avatarEl = document.getElementById('footer-helper-avatar');
  if (!textEl || !avatarEl) return;
  const comp = getCompanion();
  let msg = '';
  if (type === 'idle' && state.stars > 0) {
    const starBadges = BADGES.filter((b) => b.cond.type === 'stars').sort(
      (a, b) => a.cond.value - b.cond.value
    );
    const nextBadge = starBadges.find((b) => state.stars < b.cond.value);
    const remaining = nextBadge ? nextBadge.cond.value - state.stars : 0;
    const progressPhrases = [
      `Waouh ! Tu as déjà accumulé ${state.stars} étoile${state.stars > 1 ? 's' : ''} !${nextBadge ? ` Encore ${remaining} pour le badge "${nextBadge.name}" ! 🏅` : ''}`,
      `Félicitations pour tes ${state.stars} étoile${state.stars > 1 ? 's' : ''} ! Tu travailles comme un vrai champion ! 🏆`,
      `Tu as ${state.stars} étoile${state.stars > 1 ? 's' : ''} ! Es-tu prêt à remporter le prochain badge ? ${nextBadge ? `Plus que ${remaining} !` : ''} ⭐`,
      `Les mathématiques sont un jeu d'enfant avec toi ! Déjà ${state.stars} étoile${state.stars > 1 ? 's' : ''} ! 🎈`,
    ];
    msg = progressPhrases[Math.floor(Math.random() * progressPhrases.length)];
  } else {
    const list = FOOTER_PHRASES[type] || FOOTER_PHRASES['idle'];
    msg = list[Math.floor(Math.random() * list.length)];
  }
  textEl.innerText = `"${comp.name} dit : ${msg}"`;
  if (type === 'success') {
    avatarEl.classList.add('scale-110');
    setTimeout(() => avatarEl.classList.remove('scale-110'), 300);
  }
  updateFooterCompanion();
}

export function updateMultiplayerScoreboardUI() {
  const banner = document.getElementById('multiplayer-turn-banner');
  if (!banner) return;
  const p1 = multiplayerState.player1;
  const p2 = multiplayerState.player2;
  const activePlayerName =
    multiplayerState.currentPlayer === 1 ? p1.name : p2.name;
  const activeMascot = multiplayerState.currentPlayer === 1 ? '🐣' : '🦁';
  document.getElementById('multi-turn-avatar').innerText = activeMascot;
  document.getElementById('multi-turn-title').innerText =
    `Tour de ${activePlayerName}`;
  document.getElementById('multi-turn-subtitle').innerText =
    `Tour ${multiplayerState.currentTurn} / ${multiplayerState.maxTurns}`;
  document.getElementById('p1-score-name').innerText = p1.name;
  document.getElementById('p1-score-val').innerText = `${p1.stars} ⭐`;
  document.getElementById('p2-score-name').innerText = p2.name;
  document.getElementById('p2-score-val').innerText = `${p2.stars} ⭐`;
}

export function updateQuestObjectiveUI() {
  const banner = document.getElementById('quest-progress-banner');
  const tracker = document.getElementById('quest-material-tracker');
  if (!banner || !tracker) return;
  banner.classList.remove('hidden');
  document.getElementById('multiplayer-turn-banner').classList.add('hidden');
  const emoji = questState.materialEmoji;
  const count = questState.progress;
  tracker.innerText = `${count} / 5 ${emoji}`;
  const bannerTitle = document.getElementById('quest-banner-title');
  const bannerSubtitle = document.getElementById('quest-banner-subtitle');
  const names = [
    '',
    'Nid de Pytha 🪺',
    'Temple Perdu 🔑',
    'Trésor du Temps ⏳',
  ];
  bannerTitle.innerText = names[questState.currentQuest];
  bannerSubtitle.innerText = `Récolte 5 ${questState.materialName} pour réussir`;
}

export function updateBadgeCountUI() {
  const unlockedCount = state.unlockedBadges.length;
  const btnText = document.getElementById('badge-count-text');
  if (btnText) btnText.innerText = `Badges (${unlockedCount}/${BADGES.length})`;
}

export function renderRecommendations() {
  const recs = getRecommendations();
  const container = document.getElementById('home-recommendations');
  const list = document.getElementById('home-recommendations-list');
  if (recs.length === 0) {
    container.classList.add('hidden');
    return;
  }
  container.classList.remove('hidden');
  list.innerHTML = '';
  const colors = { A: 'brand-purple', B: 'brand-green', C: 'brand-orange' };
  recs.forEach((r) => {
    const c = colors[r.catId] || 'brand-purple';
    const card = document.createElement('div');
    card.className = `bg-white rounded-2xl p-4 border-2 border-${c}/30 cursor-pointer hover:shadow-md transition-all active:scale-95`;
    card.onclick = () => {
      setGameMode('solo');
      launchGame(r.id);
    };
    card.innerHTML = `
      <p class="text-xs font-bold text-${c} uppercase tracking-wide mb-1">${r.catName}</p>
      <p class="font-bold font-title text-slate-800 text-sm">${r.name}</p>
      <p class="text-slate-400 text-xs mt-1">${r.reason}</p>
    `;
    list.appendChild(card);
  });
}

// ---- Helper functions needed by renderRecommendations ----

export function computeLearningProfile() {
  const profile = {};
  for (const [catId, cat] of Object.entries(CATEGORIES)) {
    let totalCorrect = 0,
      totalAttempts = 0;
    const gameDetails = [];
    for (const g of cat.games) {
      const stats = getGameStats(g.id);
      totalCorrect += stats.correct;
      totalAttempts += stats.total;
      gameDetails.push({
        id: g.id,
        name: g.name,
        accuracy: stats.total > 0 ? stats.correct / stats.total : null,
        difficulty: stats.difficulty,
        attempts: stats.total,
      });
    }
    profile[catId] = {
      name: cat.name,
      color: cat.color,
      accuracy: totalAttempts > 0 ? totalCorrect / totalAttempts : null,
      totalAttempts,
      games: gameDetails,
    };
  }
  return profile;
}

export function getAdaptiveThreshold(gameId) {
  const stats = getGameStats(gameId);
  const accuracy = stats.total > 0 ? stats.correct / stats.total : 0.5;
  const avgTime = getAvgResponseTime(gameId);
  let baseThreshold = 3;
  if (accuracy >= 0.8 && avgTime < 8000) baseThreshold = 2;
  if (accuracy < 0.5) baseThreshold = 4;
  return baseThreshold;
}

function getRecommendations() {
  const profile = computeLearningProfile();
  const recs = [];
  for (const [catId, data] of Object.entries(profile)) {
    for (const g of data.games) {
      if (g.attempts === 0) {
        recs.push({
          id: g.id,
          name: g.name,
          catId,
          catName: data.name,
          reason: 'Nouveau ! A essayer',
          priority: 1,
        });
      } else if (g.accuracy !== null && g.accuracy < 0.6) {
        recs.push({
          id: g.id,
          name: g.name,
          catId,
          catName: data.name,
          reason: "A besoin d'entraînement",
          priority: 2,
        });
      }
    }
  }
  recs.sort((a, b) => a.priority - b.priority);
  return recs.slice(0, 3);
}

// ---- Companion helpers needed here ----

export function getCompanion() {
  return COMPANIONS[companionData.type] || COMPANIONS.owl;
}

export function getCompanionStage() {
  let stage = 0;
  for (let i = COMPANION_STAGES.length - 1; i >= 0; i--) {
    if (state.stars >= COMPANION_STAGES[i].minStars) {
      stage = i;
      break;
    }
  }
  return stage;
}

export function updateFooterCompanion() {
  const el = document.getElementById('footer-helper-avatar');
  if (!el) return;
  const comp = getCompanion();
  const stage = getCompanionStage();
  el.innerHTML = comp.stages[stage]();
  el.className = `w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 border-white animate-bounce-slow bg-${comp.color}-light`;
}

// Circular dependency workaround — these four functions are defined here but
// will be overridden by the real implementations in features.js via window.
// They serve as stubs so ui.js can reference them without errors.
let checkBadgeUnlocks = () => {};
let setGameMode = () => {};
let launchGame = () => {};
let checkAnswer = () => {};

export function setUICallbacks(fns) {
  if (fns.checkBadgeUnlocks) checkBadgeUnlocks = fns.checkBadgeUnlocks;
  if (fns.setGameMode) setGameMode = fns.setGameMode;
  if (fns.launchGame) launchGame = fns.launchGame;
  if (fns.checkAnswer) checkAnswer = fns.checkAnswer;
}
