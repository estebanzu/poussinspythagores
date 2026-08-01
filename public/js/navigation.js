// =============================================
// NAVIGATION — Screen routing & category selection
// =============================================

import {
  state,
  questState,
  multiplayerState,
  currentSessionTotal,
} from './state.js';
import { CATEGORIES } from './constants.js';
import { updateFooterMessage, renderRecommendations } from './ui.js';
import { getGameStats } from './storage.js';
import { playAudioTone } from './audio.js';
import { recordSession, resetSessionTracking } from './storage.js';

export function hideAllScreens() {
  document.getElementById('screen-home').classList.add('hidden');
  document.getElementById('screen-submenu').classList.add('hidden');
  document.getElementById('screen-game').classList.add('hidden');
  document.getElementById('screen-victory').classList.add('hidden');
  const setup = document.getElementById('screen-multiplayer-setup');
  if (setup) setup.classList.add('hidden');
  const victory = document.getElementById('screen-multiplayer-victory');
  if (victory) victory.classList.add('hidden');
  const quests = document.getElementById('screen-quests');
  if (quests) quests.classList.add('hidden');
  const qvictory = document.getElementById('screen-quest-victory');
  if (qvictory) qvictory.classList.add('hidden');
}

export function goHome() {
  playAudioTone('click');
  hideAllScreens();
  document.getElementById('screen-home').classList.remove('hidden');
  state.currentCategory = null;
  state.currentGame = null;
  questState.isActive = false;
  multiplayerState.isActive = false;
  const qpb = document.getElementById('quest-progress-banner');
  if (qpb) qpb.classList.add('hidden');
  const mtb = document.getElementById('multiplayer-turn-banner');
  if (mtb) mtb.classList.add('hidden');
  const btnSolo = document.getElementById('btn-mode-solo');
  const btnMulti = document.getElementById('btn-mode-multi');
  const btnQuest = document.getElementById('btn-mode-quest');
  if (btnSolo && btnMulti && btnQuest) {
    btnSolo.className =
      'px-4 py-2 rounded-xl font-title font-bold text-sm transition-all shadow bg-white text-brand-purple';
    btnMulti.className =
      'px-4 py-2 rounded-xl font-title font-bold text-sm transition-all text-slate-600';
    btnQuest.className =
      'px-4 py-2 rounded-xl font-title font-bold text-sm transition-all text-slate-600';
  }
  updateFooterMessage('idle');
  renderRecommendations();
  if (currentSessionTotal > 0) recordSession();
  resetSessionTracking();
}

export function selectCategory(catId) {
  playAudioTone('click');
  state.currentCategory = catId;
  const cat = CATEGORIES[catId];
  document.getElementById('submenu-title').innerText = cat.name;
  const listEl = document.getElementById('submenu-list');
  listEl.innerHTML = '';
  cat.games.forEach((g) => {
    const stats = getGameStats(g.id);
    const acc =
      stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null;
    const diffLabel =
      stats.difficulty === 'easy'
        ? '🟢'
        : stats.difficulty === 'challenge'
          ? '🔥'
          : '🔵';
    const accBadge =
      acc !== null
        ? `<span class="ml-2 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">${diffLabel} ${acc}%</span>`
        : '';
    const item = document.createElement('div');
    item.className = `bg-white rounded-3xl p-5 border-4 border-${cat.color} shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col justify-between cursor-pointer`;
    item.onclick = () => launchGame(g.id);
    item.innerHTML = `
      <div class="mb-4">
        <h3 class="text-xl font-bold text-slate-800 font-title mb-1">${g.name}${accBadge}</h3>
        <p class="text-slate-500 text-xs">${g.desc}</p>
      </div>
      <div class="flex items-center justify-between text-${cat.color} font-bold font-title">
        <span class="text-xs tracking-wider uppercase">Commencer</span>
        <div class="w-8 h-8 rounded-full bg-${cat.color}/10 flex items-center justify-center">
          <svg class="w-5 h-5 stroke-current" fill="none" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
      </div>
    `;
    listEl.appendChild(item);
  });
  hideAllScreens();
  document.getElementById('screen-submenu').classList.remove('hidden');
}

// --- forward refs set by setNavCallbacks ---
let startSoloGameImpl = () => {};

export function setNavCallbacks(fns) {
  if (fns.startSoloGame) startSoloGameImpl = fns.startSoloGame;
}

export function launchGame(gameId) {
  playAudioTone('click');
  state.currentGame = gameId;
  if (multiplayerState.isActive) {
    hideAllScreens();
    document
      .getElementById('screen-multiplayer-setup')
      .classList.remove('hidden');
  } else {
    startSoloGameImpl();
  }
}

export function backToSubmenu() {
  if (questState.isActive) {
    hideAllScreens();
    document.getElementById('screen-quests').classList.remove('hidden');
  } else if (state.currentCategory) {
    selectCategory(state.currentCategory);
  } else {
    goHome();
  }
}

export function restartCurrentGame() {
  if (state.currentGame) {
    launchGame(state.currentGame);
  } else {
    goHome();
  }
}
