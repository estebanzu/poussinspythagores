// =============================================
// FEATURES — Badges, Companion, Quest, Multiplayer, Scoreboard, Accessibility, Parental Controls
// =============================================

import {
  state,
  streakState,
  accessibilityState,
  multiplayerState,
  questState,
  adaptiveStats,
  totalSessionsPlayed,
  perfectSessions,
} from './state.js';
import { CATEGORIES, BADGES, COMPANION_STAGES } from './constants.js';
import {
  updateStarsUI,
  updateBadgeCountUI,
  showToast,
  updateFooterMessage,
  updateDifficultyUI,
  updateMultiplayerScoreboardUI,
  updateQuestObjectiveUI,
  updateSessionStarsUI,
} from './ui.js';
import { playAudioTone } from './audio.js';
import { getRandomInt, getGameName } from './utils.js';
import { hideAllScreens } from './navigation.js';

// ---- Forward refs to games.js ----
let generateExercise = () => {};
export function setFeaturesCallbacks(fns) {
  if (fns.generateExercise) generateExercise = fns.generateExercise;
}

// =============================================
// BADGE SYSTEM
// =============================================

function getBadgeReqText(badge) {
  const c = badge.cond;
  switch (c.type) {
    case 'stars':
      return `${c.value} 🌟`;
    case 'streak':
      return `Série ${c.value}j`;
    case 'accuracy':
      return `${Math.round(c.value * 100)}%`;
    case 'speed':
      return `<${c.value / 1000}s`;
    case 'game_total':
      return `${c.value} rep.`;
    case 'game_total_any':
      return `${c.value} rep.`;
    case 'game_correct':
      return `${c.value} ✓`;
    case 'category_correct':
      return `${c.value} ✓`;
    case 'difficulty':
      return c.value === 'normal' ? 'Niv. Normal' : 'Niv. Défi';
    case 'challenge_mastered':
      return `${c.value} ✓ Défi`;
    case 'sessions':
      return `${c.value} sessions`;
    case 'perfect_session':
      return `${c.value} parfaites`;
    case 'all_games_played':
      return 'Tous les jeux';
    case 'session_stars':
      return `${c.value} ⭐/session`;
    case 'consecutive':
      return `${c.value} d'affilée`;
    case 'time_of_day':
      return c.value === 20 ? 'Après 20h' : 'Avant 8h';
    default:
      return '';
  }
}

export function isBadgeConditionMet(cond) {
  switch (cond.type) {
    case 'stars':
      return state.stars >= cond.value;
    case 'streak':
      return streakState.current >= cond.value;
    case 'accuracy': {
      let totalCorrect = 0,
        totalAttempts = 0;
      for (const stats of Object.values(adaptiveStats)) {
        totalCorrect += stats.correct;
        totalAttempts += stats.total;
      }
      if (totalAttempts < 20) return false;
      return totalCorrect / totalAttempts >= cond.value;
    }
    case 'speed': {
      let allTimes = [];
      for (const stats of Object.values(adaptiveStats))
        allTimes = allTimes.concat(stats.recentTimes);
      if (allTimes.length < 10) return false;
      return (
        allTimes.reduce((a, b) => a + b, 0) / allTimes.length <= cond.value
      );
    }
    case 'game_total': {
      const stats = adaptiveStats[cond.game];
      return stats && stats.total >= cond.value;
    }
    case 'game_total_any': {
      for (const stats of Object.values(adaptiveStats)) {
        if (stats.total >= cond.value) return true;
      }
      return false;
    }
    case 'game_correct': {
      const stats = adaptiveStats[cond.game];
      return stats && stats.correct >= cond.value;
    }
    case 'category_correct': {
      const cat = CATEGORIES[cond.category];
      if (!cat) return false;
      let total = 0;
      for (const g of cat.games) {
        const s = adaptiveStats[g.id];
        if (s) total += s.correct;
      }
      return total >= cond.value;
    }
    case 'difficulty':
      return state.difficulty === cond.value;
    case 'challenge_mastered': {
      let totalChallenge = 0;
      for (const stats of Object.values(adaptiveStats)) {
        if (stats.difficulty === 'challenge') totalChallenge += stats.correct;
      }
      return totalChallenge >= cond.value;
    }
    case 'sessions':
      return totalSessionsPlayed >= cond.value;
    case 'perfect_session':
      return perfectSessions >= cond.value;
    case 'all_games_played': {
      const allGameIds = [];
      for (const cat of Object.values(CATEGORIES))
        for (const g of cat.games) allGameIds.push(g.id);
      return allGameIds.every((id) => {
        const s = adaptiveStats[id];
        return s && s.total > 0;
      });
    }
    case 'session_stars':
      return state.sessionStars >= cond.value;
    case 'consecutive':
      return state.consecutiveCorrect >= cond.value;
    case 'time_of_day': {
      const hour = new Date().getHours();
      return cond.value === 20 ? hour >= 20 : hour < 8;
    }
    default:
      return false;
  }
}

export function checkBadgeUnlocks() {
  let newlyUnlocked = [];
  BADGES.forEach((badge) => {
    if (
      !state.unlockedBadges.includes(badge.id) &&
      isBadgeConditionMet(badge.cond)
    ) {
      state.unlockedBadges.push(badge.id);
      newlyUnlocked.push(badge);
    }
  });
  if (newlyUnlocked.length > 0) {
    localStorage.setItem(
      'mathscp_unlocked_badges',
      JSON.stringify(state.unlockedBadges)
    );
    updateBadgeCountUI();
    triggerBadgeUnlockPopup(newlyUnlocked[newlyUnlocked.length - 1]);
  }
}

function triggerBadgeUnlockPopup(badge) {
  playAudioTone('trophy');
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  const svgContainer = document.getElementById('unlocked-badge-svg-container');
  const titleEl = document.getElementById('unlocked-badge-title');
  const descEl = document.getElementById('unlocked-badge-desc');
  if (svgContainer) svgContainer.innerHTML = badge.svg(false);
  if (titleEl) titleEl.innerText = badge.name;
  if (descEl)
    descEl.innerText = `Félicitations ! Tu as débloqué le badge "${badge.name}" ! ${badge.desc} 🏆`;
  const popup = document.getElementById('popup-badge-unlock');
  if (popup) popup.classList.remove('hidden');
}

export function closeUnlockPopup() {
  playAudioTone('click');
  document.getElementById('popup-badge-unlock').classList.add('hidden');
}

export function openBadgesModal() {
  playAudioTone('click');
  const grid = document.getElementById('badges-grid-container');
  if (!grid) return;
  grid.innerHTML = '';
  BADGES.forEach((badge) => {
    const isLocked = !state.unlockedBadges.includes(badge.id);
    const card = document.createElement('div');
    card.className = `flex flex-col items-center p-3 rounded-2xl border-2 bg-slate-50 transition-all w-full max-w-[130px] ${isLocked ? 'border-slate-200 opacity-80' : 'border-brand-purple bg-white hover:scale-105 shadow-md'}`;
    card.innerHTML = `<div class="w-16 h-16 mb-2 flex items-center justify-center">${badge.svg(isLocked)}</div><span class="text-[11px] font-bold font-title text-slate-800 text-center leading-tight h-8 flex items-center justify-center">${badge.name}</span><span class="text-[9px] text-slate-500 mt-1 font-medium bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">${isLocked ? getBadgeReqText(badge) : 'Débloqué !'}</span>`;
    grid.appendChild(card);
  });
  document.getElementById('modal-badges').classList.remove('hidden');
}

export function closeBadgesModal() {
  playAudioTone('click');
  document.getElementById('modal-badges').classList.add('hidden');
}

// =============================================
// COMPANION
// =============================================

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

// =============================================
// QUEST
// =============================================

export function launchQuest(questId) {
  playAudioTone('click');
  questState.isActive = true;
  questState.currentQuest = questId;
  questState.progress = 0;
  questState.currentSequenceIndex = 0;
  questState.consecutiveCorrect = 0;
  if (questId === 1) {
    questState.materialEmoji = '🪵';
    questState.materialName = 'Brindilles';
    questState.gameSequence = [
      'a_complements_10',
      'a_nombres_100',
      'a_blocs_dizaines',
      'a_additions',
      'a_fractions_interact',
    ];
  } else if (questId === 2) {
    questState.materialEmoji = '🔑';
    questState.materialName = 'Clés';
    questState.gameSequence = [
      'b_vocabulaire_spatial',
      'b_figures',
      'b_formes_tri',
      'b_vocabulaire_spatial',
      'b_formes_tri',
    ];
  } else {
    questState.materialEmoji = '⚙️';
    questState.materialName = 'Engrenages';
    questState.gameSequence = [
      'c_heure',
      'c_mesures',
      'c_monnaie',
      'c_mesures',
      'c_monnaie',
    ];
  }
  state.currentGame = questState.gameSequence[0];
  updateQuestObjectiveUI();
  showQuestStoryIntro();
}

function showQuestStoryIntro() {
  const modal = document.getElementById('modal-quest-story');
  const avatar = document.getElementById('quest-story-avatar');
  const title = document.getElementById('quest-story-title');
  const text = document.getElementById('quest-story-text');
  if (!modal) return;
  if (questState.currentQuest === 1) {
    avatar.innerText = '🦉🪺';
    title.innerText = 'Le Nid de Pytha';
    text.innerHTML =
      "<b>Pytha l'Hibou</b> : <br/>\"Salut jeune mathématicien ! L'hiver approche et je dois réparer mon nid douillet. Peux-tu m'aider à ramasser <b>5 brindilles</b> en résolvant mes énigmes de nombres ? C'est parti !\"";
  } else if (questState.currentQuest === 2) {
    avatar.innerText = '🦉🔑';
    title.innerText = 'Le Temple Perdu';
    text.innerHTML =
      '<b>Pytha l\'Hibou</b> : <br/>"Regarde ces ruines mystérieuses ! La porte du temple est fermée. Trouve les <b>5 clés de pierre</b> cachées derrière les formes géométriques pour l\'ouvrir ! En route !"';
  } else {
    avatar.innerText = '🦉⚙️';
    title.innerText = 'Le Trésor du Temps';
    text.innerHTML =
      "<b>Pytha l'Hibou</b> : <br/>\"Oh non ! L'horloge magique s'est arrêtée, le temps est figé ! Récolte <b>5 engrenages dorés</b> en lisant l'heure et en mesurant des objets pour la relancer ! Vite !\"";
  }
  modal.classList.remove('hidden');
}

export function closeQuestStoryModal() {
  playAudioTone('click');
  document.getElementById('modal-quest-story').classList.add('hidden');
  state.sessionStars = 0;
  state.consecutiveCorrect = 0;
  state.consecutiveWrong = 0;
  state.difficulty = 'normal';
  const gameName = getGameName(state.currentGame);
  document.getElementById('game-title').innerText = `Quête : ${gameName}`;
  document.getElementById('multiplayer-turn-banner').classList.add('hidden');
  document.getElementById('difficulty-badge').classList.remove('hidden');
  document
    .getElementById('star-dots-container')
    .parentNode.classList.remove('hidden');
  updateSessionStarsUI();
  updateDifficultyUI();
  hideAllScreens();
  document.getElementById('screen-game').classList.remove('hidden');
  generateExercise();
  updateFooterMessage('game_start');
}

export function nextQuestStep() {
  if (questState.consecutiveCorrect >= 2) {
    questState.currentSequenceIndex = Math.min(
      questState.gameSequence.length - 1,
      questState.currentSequenceIndex + 2
    );
    questState.consecutiveCorrect = 0;
    showToast(true, 'Super rapide ! Saut de niveau ! 🚀');
  } else {
    questState.currentSequenceIndex =
      (questState.currentSequenceIndex + 1) % questState.gameSequence.length;
  }
  state.currentGame = questState.gameSequence[questState.currentSequenceIndex];
  document.getElementById('game-title').innerText =
    `Quête : ${getGameName(state.currentGame)}`;
  generateExercise();
}

export function triggerQuestVictory() {
  playAudioTone('trophy');
  const badgeNames = [
    '',
    'Protecteur du Nid 🪺',
    'Clé du Savoir 🔑',
    'Maître du Temps ⏳',
  ];
  const badgeName = badgeNames[questState.currentQuest];
  document.getElementById('quest-victory-badge-name').innerText = badgeName;
  if (!state.unlockedBadges.includes(badgeName)) {
    state.unlockedBadges.push(badgeName);
    localStorage.setItem(
      'mathscp_unlocked_badges',
      JSON.stringify(state.unlockedBadges)
    );
    updateBadgeCountUI();
  }
  state.stars += 10;
  localStorage.setItem('mathscp_stars', state.stars);
  updateStarsUI();
  hideAllScreens();
  document.getElementById('screen-quest-victory').classList.remove('hidden');
  confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
}

// =============================================
// MULTIPLAYER
// =============================================

export function startMultiplayerMatch() {
  playAudioTone('click');
  const p1Input = document.getElementById('multi-p1-name');
  const p2Input = document.getElementById('multi-p2-name');
  multiplayerState.player1.name = p1Input.value.trim() || 'Joueur 1';
  multiplayerState.player2.name = p2Input.value.trim() || 'Joueur 2';
  multiplayerState.player1.stars = 0;
  multiplayerState.player2.stars = 0;
  multiplayerState.currentPlayer = 1;
  multiplayerState.currentTurn = 1;
  const gameName = getGameName(state.currentGame);
  document.getElementById('game-title').innerText = `${gameName} (Défi)`;
  document.getElementById('difficulty-badge').classList.add('hidden');
  document
    .getElementById('star-dots-container')
    .parentNode.classList.add('hidden');
  document.getElementById('quest-progress-banner').classList.add('hidden');
  document.getElementById('multiplayer-turn-banner').classList.remove('hidden');
  updateMultiplayerScoreboardUI();
  hideAllScreens();
  document.getElementById('screen-game').classList.remove('hidden');
  generateExercise();
  updateFooterMessage('game_start');
}

export function nextMultiplayerTurn() {
  multiplayerState.currentPlayer = multiplayerState.currentPlayer === 1 ? 2 : 1;
  multiplayerState.currentTurn++;
  updateMultiplayerScoreboardUI();
  generateExercise();
}

export function handleNextExerciseClick() {
  if (multiplayerState.isActive) {
    if (multiplayerState.currentTurn >= multiplayerState.maxTurns) {
      triggerMultiplayerMatchOver();
    } else {
      nextMultiplayerTurn();
    }
  } else if (questState.isActive) {
    if (questState.progress >= 5) {
      triggerQuestVictory();
    } else {
      nextQuestStep();
    }
  } else {
    generateExercise();
  }
}

export function triggerMultiplayerMatchOver() {
  playAudioTone('trophy');
  const p1 = multiplayerState.player1;
  const p2 = multiplayerState.player2;
  document.getElementById('recap-p1-name').innerText = p1.name;
  document.getElementById('recap-p1-stars').innerText = `${p1.stars} ⭐`;
  document.getElementById('recap-p2-name').innerText = p2.name;
  document.getElementById('recap-p2-stars').innerText = `${p2.stars} ⭐`;
  const titleEl = document.getElementById('multi-victory-title');
  const descEl = document.getElementById('multi-victory-desc');
  let winner = '';
  if (p1.stars > p2.stars) {
    titleEl.innerText = `${p1.name} a gagné ! 🏆`;
    descEl.innerText = `Félicitations ${p1.name} ! Tu remportes le match avec ${p1.stars} ⭐ contre ${p2.stars} ⭐.`;
    winner = p1.name;
  } else if (p2.stars > p1.stars) {
    titleEl.innerText = `${p2.name} a gagné ! 🏆`;
    descEl.innerText = `Félicitations ${p2.name} ! Tu remportes le match avec ${p2.stars} ⭐ contre ${p1.stars} ⭐.`;
    winner = p2.name;
  } else {
    titleEl.innerText = 'Égalité ! 🤝';
    descEl.innerText = `Quel beau match ! Vous avez obtenu tous les deux ${p1.stars} ⭐.`;
    winner = 'Égalité';
  }
  saveMatchResult(p1.name, p1.stars, p2.name, p2.stars, winner);
  hideAllScreens();
  document
    .getElementById('screen-multiplayer-victory')
    .classList.remove('hidden');
  confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
}

export function restartMultiplayerMatch() {
  startMultiplayerMatch();
}

function saveMatchResult(p1Name, p1Stars, p2Name, p2Stars, winnerName) {
  let history = JSON.parse(
    localStorage.getItem('mathscp_multiplayer_history') || '[]'
  );
  history.unshift({
    date: new Date().toLocaleDateString('fr-FR'),
    p1: { name: p1Name, stars: p1Stars },
    p2: { name: p2Name, stars: p2Stars },
    winner: winnerName,
  });
  if (history.length > 10) history.pop();
  localStorage.setItem('mathscp_multiplayer_history', JSON.stringify(history));
}

// =============================================
// SCOREBOARD
// =============================================

export function openScoreboardModal() {
  playAudioTone('click');
  const container = document.getElementById('scoreboard-list-container');
  if (!container) return;
  container.innerHTML = '';
  const history = JSON.parse(
    localStorage.getItem('mathscp_multiplayer_history') || '[]'
  );
  if (history.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-slate-400 font-medium"><span class="text-4xl block mb-2">🎮</span>Aucun match joué pour le moment.</div>`;
  } else {
    history.forEach((match) => {
      const card = document.createElement('div');
      card.className =
        'bg-slate-50 p-4 rounded-2xl border-2 border-slate-200/60 flex flex-col gap-2 font-title';
      const winnerLabel =
        match.winner === 'Égalité'
          ? `<span class="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">🤝 Égalité</span>`
          : `<span class="bg-brand-purple-light text-brand-purple-dark text-[10px] font-bold px-2 py-0.5 rounded-full">🏆 Gagnant : ${match.winner}</span>`;
      card.innerHTML = `<div class="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider"><span>Match du ${match.date}</span>${winnerLabel}</div><div class="flex justify-between items-center text-sm"><span class="font-bold text-slate-600">${match.p1.name} : ${match.p1.stars} ⭐</span><span class="text-slate-400 font-black">vs</span><span class="font-bold text-slate-600">${match.p2.name} : ${match.p2.stars} ⭐</span></div>`;
      container.appendChild(card);
    });
  }
  document.getElementById('modal-scoreboard').classList.remove('hidden');
}

export function closeScoreboardModal() {
  playAudioTone('click');
  document.getElementById('modal-scoreboard').classList.add('hidden');
}

export function clearScoreboardHistory() {
  playAudioTone('click');
  if (confirm("Voulez-vous vraiment effacer l'historique des scores ?")) {
    localStorage.removeItem('mathscp_multiplayer_history');
    openScoreboardModal();
  }
}

// =============================================
// ACCESSIBILITY
// =============================================

export function initAccessibility() {
  applyAccessibilitySettings();
}

export function openAccessibilityModal() {
  playAudioTone('click');
  updateAccessibilityUI();
  document.getElementById('modal-accessibility').classList.remove('hidden');
}

export function closeAccessibilityModal() {
  playAudioTone('click');
  document.getElementById('modal-accessibility').classList.add('hidden');
}

export function updateAccessibilityUI() {
  const voiceBtn = document.getElementById('toggle-acc-voice');
  const contrastBtn = document.getElementById('toggle-acc-contrast');
  if (!voiceBtn || !contrastBtn) return;
  if (accessibilityState.autoplayVoice) {
    voiceBtn.className =
      'w-12 h-6 rounded-full bg-brand-green p-0.5 transition-all relative';
    voiceBtn.querySelector('div').className =
      'w-5 h-5 rounded-full bg-white shadow-md transform transition-all translate-x-6';
  } else {
    voiceBtn.className =
      'w-12 h-6 rounded-full bg-slate-200 p-0.5 transition-all relative';
    voiceBtn.querySelector('div').className =
      'w-5 h-5 rounded-full bg-white shadow-md transform transition-all translate-x-0';
  }
  if (accessibilityState.highContrast) {
    contrastBtn.className =
      'w-12 h-6 rounded-full bg-brand-green p-0.5 transition-all relative';
    contrastBtn.querySelector('div').className =
      'w-5 h-5 rounded-full bg-white shadow-md transform transition-all translate-x-6';
  } else {
    contrastBtn.className =
      'w-12 h-6 rounded-full bg-slate-200 p-0.5 transition-all relative';
    contrastBtn.querySelector('div').className =
      'w-5 h-5 rounded-full bg-white shadow-md transform transition-all translate-x-0';
  }
  document.querySelectorAll('#question-count-options button').forEach((btn) => {
    const count = parseInt(btn.dataset.count);
    if (count === state.questionCount) {
      btn.className =
        'flex-1 py-2 px-3 rounded-xl text-sm font-bold border-2 bg-brand-purple text-white border-brand-purple shadow transition-all';
    } else {
      btn.className =
        'flex-1 py-2 px-3 rounded-xl text-sm font-bold border-2 border-slate-200 text-slate-500 bg-white hover:border-brand-purple-light hover:text-brand-purple transition-all';
    }
  });
  const streakEl = document.getElementById('streak-display-text');
  if (streakEl) streakEl.innerText = getStreakText();
}

export function toggleAccVoice() {
  playAudioTone('click');
  accessibilityState.autoplayVoice = !accessibilityState.autoplayVoice;
  localStorage.setItem(
    'mathscp_autoplay_voice',
    accessibilityState.autoplayVoice.toString()
  );
  updateAccessibilityUI();
}

export function toggleAccContrast() {
  playAudioTone('click');
  accessibilityState.highContrast = !accessibilityState.highContrast;
  localStorage.setItem(
    'mathscp_high_contrast',
    accessibilityState.highContrast.toString()
  );
  updateAccessibilityUI();
  applyAccessibilitySettings();
}

export function setQuestionCount(count) {
  playAudioTone('click');
  state.questionCount = count;
  localStorage.setItem('mathscp_question_count', count.toString());
  updateAccessibilityUI();
}

export function applyAccessibilitySettings() {
  if (accessibilityState.highContrast) {
    document.body.classList.add('dark-contrast');
  } else {
    document.body.classList.remove('dark-contrast');
  }
}

// =============================================
// STREAK & RANDOM FACTS
// =============================================

export function updateStreak() {
  const today = new Date().toLocaleDateString('fr-FR');
  if (streakState.lastPlayDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString(
      'fr-FR'
    );
    if (streakState.lastPlayDate === yesterday) {
      streakState.current++;
    } else {
      streakState.current = 1;
    }
    streakState.lastPlayDate = today;
    if (streakState.current > streakState.best)
      streakState.best = streakState.current;
    localStorage.setItem(
      'mathscp_streak_current',
      streakState.current.toString()
    );
    localStorage.setItem('mathscp_streak_best', streakState.best.toString());
    localStorage.setItem('mathscp_streak_last_date', today);
  }
}

export function getStreakText() {
  if (streakState.current === 0) return 'Nouveau départ !';
  if (streakState.current <= 2)
    return `${streakState.current} jour${streakState.current > 1 ? 's' : ''} 🔥`;
  if (streakState.current <= 5) return `${streakState.current} jours 🔥🔥`;
  return `${streakState.current} jours 🔥🔥🔥`;
}

export function checkStreakBonus() {
  if (streakState.current >= 3 && streakState.current % 3 === 0) {
    const bonusStars = Math.floor(streakState.current / 3);
    state.stars += bonusStars;
    localStorage.setItem('mathscp_stars', state.stars);
    updateStarsUI();
    setTimeout(
      () =>
        showToast(
          true,
          `Série de ${streakState.current} jours ! ${bonusStars} étoiles bonus ! 🌟🔥`
        ),
      600
    );
  }
}

const MATH_FACTS = [
  'Savais-tu que le zéro a été inventé en Inde il y a 1500 ans ?',
  'Un triangle a toujours 3 côtés et 3 angles !',
  "Le nombre 100 s'appelle aussi une centaine.",
  'Une année a 365 jours... sauf les années bissextiles !',
  'Le papillon a une symétrie parfaite : les deux ailes sont identiques !',
  'Le cube a 6 faces, 8 sommets et 12 arêtes.',
  "Notre système de nombres s'appelle le système décimal (base 10) !",
  "Les chiffres 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 viennent d'Inde via les Arabes.",
  "Le mot 'mathématiques' vient du grec 'mathêma' qui signifie 'science'.",
  "Une pièce de 1 euro a 7 faces (c'est un heptagone) !",
];

let shownFacts = JSON.parse(
  localStorage.getItem('mathscp_shown_facts') || '[]'
);

export function showRandomFact() {
  const container = document.getElementById('fun-fact-container');
  if (!container) return;
  const factEl = document.getElementById('fun-fact-text');
  if (!factEl) return;
  container.classList.remove('hidden');
  const available = MATH_FACTS.filter((f) => !shownFacts.includes(f));
  if (available.length === 0) {
    shownFacts = [];
  }
  const pool = available.length > 0 ? available : MATH_FACTS;
  const fact = pool[Math.floor(Math.random() * pool.length)];
  if (!shownFacts.includes(fact)) shownFacts.push(fact);
  localStorage.setItem('mathscp_shown_facts', JSON.stringify(shownFacts));
  factEl.innerText = '💡 ' + fact;
}

// =============================================
// PARENTAL CONTROLS
// =============================================

import { playtimeState, parentGateAnswer } from './state.js';

const PLAYTIME_LIMIT = 60 * 60 * 1000;
const LOCKOUT_DURATION = 30 * 60 * 1000;
const DECAY_BREAK_DURATION = 30 * 60 * 1000;

export function initParentalControls() {
  const now = Date.now();
  if (playtimeState.lockoutStart > 0) {
    if (now - playtimeState.lockoutStart >= LOCKOUT_DURATION) {
      clearLockout();
    } else {
      triggerLockout();
    }
  }
  if (
    playtimeState.lockoutStart === 0 &&
    playtimeState.lastActive > 0 &&
    now - playtimeState.lastActive >= DECAY_BREAK_DURATION
  ) {
    playtimeState.accumulated = 0;
    localStorage.setItem('mathscp_playtime_accumulated', '0');
  }
  setInterval(tickPlaytime, 1000);
}

function tickPlaytime() {
  const now = Date.now();
  if (playtimeState.lockoutStart > 0) {
    updateCountdownUI();
    if (now - playtimeState.lockoutStart >= LOCKOUT_DURATION) clearLockout();
    return;
  }
  const timePassed = now - playtimeState.sessionStart;
  playtimeState.sessionStart = now;
  playtimeState.accumulated += timePassed;
  playtimeState.lastActive = now;
  localStorage.setItem(
    'mathscp_playtime_accumulated',
    playtimeState.accumulated.toString()
  );
  localStorage.setItem(
    'mathscp_last_active_time',
    playtimeState.lastActive.toString()
  );
  if (playtimeState.accumulated >= PLAYTIME_LIMIT) {
    playtimeState.lockoutStart = now;
    localStorage.setItem(
      'mathscp_lockout_start_time',
      playtimeState.lockoutStart.toString()
    );
    triggerLockout();
  }
}

function triggerLockout() {
  const modal = document.getElementById('modal-parental-lock');
  if (modal) modal.classList.remove('hidden');
  hideParentGate();
  updateCountdownUI();
}

function clearLockout() {
  playtimeState.lockoutStart = 0;
  playtimeState.accumulated = 0;
  playtimeState.sessionStart = Date.now();
  localStorage.removeItem('mathscp_lockout_start_time');
  localStorage.setItem('mathscp_playtime_accumulated', '0');
  const modal = document.getElementById('modal-parental-lock');
  if (modal) modal.classList.add('hidden');
}

function updateCountdownUI() {
  const textEl = document.getElementById('lock-countdown-text');
  if (!textEl || playtimeState.lockoutStart === 0) return;
  const remaining =
    LOCKOUT_DURATION - (Date.now() - playtimeState.lockoutStart);
  if (remaining <= 0) {
    textEl.innerText = '00:00';
    return;
  }
  const totalSecs = Math.floor(remaining / 1000);
  textEl.innerText = `${Math.floor(totalSecs / 60)
    .toString()
    .padStart(2, '0')}:${(totalSecs % 60).toString().padStart(2, '0')}`;
}

export function showParentGate() {
  const container = document.getElementById('parent-gate-container');
  const questionEl = document.getElementById('parent-gate-question');
  const inputEl = document.getElementById('parent-gate-input');
  const errorEl = document.getElementById('parent-gate-error');
  if (!container || !questionEl || !inputEl) return;
  const a = getRandomInt(15, 45);
  const b = getRandomInt(15, 45);
  parentGateAnswer.value = a + b;
  questionEl.innerText = `${a} + ${b} = ?`;
  inputEl.value = '';
  if (errorEl) errorEl.classList.add('hidden');
  container.classList.remove('hidden');
  inputEl.focus();
}

export function hideParentGate() {
  const container = document.getElementById('parent-gate-container');
  if (container) container.classList.add('hidden');
  parentGateAnswer.value = null;
}

export function verifyParentGate() {
  const input = document.getElementById('parent-gate-input');
  const error = document.getElementById('parent-gate-error');
  if (!input) return;
  if (parseInt(input.value) === parentGateAnswer.value) {
    playAudioTone('trophy');
    document.getElementById('modal-parental-lock').classList.add('hidden');
    clearLockout();
    hideParentGate();
  } else {
    if (error) error.classList.remove('hidden');
  }
}

// =============================================
// GAME MODE SELECTOR
// =============================================

export function setGameMode(mode) {
  playAudioTone('click');
  const btnSolo = document.getElementById('btn-mode-solo');
  const btnMulti = document.getElementById('btn-mode-multi');
  const btnQuest = document.getElementById('btn-mode-quest');
  if (!btnSolo || !btnMulti || !btnQuest) return;
  multiplayerState.isActive = false;
  questState.isActive = false;
  btnSolo.className =
    'px-4 py-2 rounded-xl font-title font-bold text-sm transition-all text-slate-600';
  btnMulti.className =
    'px-4 py-2 rounded-xl font-title font-bold text-sm transition-all text-slate-600';
  btnQuest.className =
    'px-4 py-2 rounded-xl font-title font-bold text-sm transition-all text-slate-600';
  if (mode === 'multi') {
    multiplayerState.isActive = true;
    btnMulti.className =
      'px-4 py-2 rounded-xl font-title font-bold text-sm transition-all shadow bg-white text-brand-purple';
  } else if (mode === 'quest') {
    questState.isActive = true;
    btnQuest.className =
      'px-4 py-2 rounded-xl font-title font-bold text-sm transition-all shadow bg-white text-brand-purple';
    setTimeout(() => {
      hideAllScreens();
      document.getElementById('screen-quests').classList.remove('hidden');
    }, 200);
  } else {
    btnSolo.className =
      'px-4 py-2 rounded-xl font-title font-bold text-sm transition-all shadow bg-white text-brand-purple';
  }
}
