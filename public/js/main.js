// =============================================
// MAIN — Entry point, window exports, initialization
// =============================================

import { state, accessibilityState, cachedFrenchVoice, questState, multiplayerState } from './state.js';
import { updateStarsUI, updateFooterCompanion, setUICallbacks, updateSessionStarsUI, updateDifficultyUI, updateFooterMessage } from './ui.js';
import { setNavCallbacks, goHome, hideAllScreens, selectCategory, launchGame, backToSubmenu, restartCurrentGame } from './navigation.js';
import { playAudioTone, applySoundIcons, toggleMute } from './audio.js';
import { generateExercise, setGamesCallbacks, toggleFractionBlock, validateInteractiveFraction, addBaseTen, resetBaseTen, validateBaseTen, toggleShapeSelected, validateFormesTri, triggerVictorySession, checkAnswer } from './games.js';
import {
  initParentalControls, initAccessibility, applyAccessibilitySettings, updateAccessibilityUI,
  openAccessibilityModal, closeAccessibilityModal, toggleAccVoice, toggleAccContrast, setQuestionCount,
  checkBadgeUnlocks, openBadgesModal, closeBadgesModal, closeUnlockPopup,
  updateStreak, getStreakText, checkStreakBonus, showRandomFact,
  launchQuest, closeQuestStoryModal, nextQuestStep, triggerQuestVictory,
  startMultiplayerMatch, nextMultiplayerTurn, handleNextExerciseClick, triggerMultiplayerMatchOver, restartMultiplayerMatch,
  openScoreboardModal, closeScoreboardModal, clearScoreboardHistory,
  setGameMode, showParentGate, hideParentGate, verifyParentGate,
  setFeaturesCallbacks,
} from './features.js';
import { getGameStats } from './storage.js';
import { getGameName } from './utils.js';

// =============================================
// Wire cross-module callbacks
// =============================================

setUICallbacks({
  checkBadgeUnlocks,
  setGameMode,
  launchGame,
  checkAnswer,
});

setNavCallbacks({
  startSoloGame,
});

setGamesCallbacks({
  checkBadgeUnlocks,
  checkStreakBonus,
  showRandomFact,
});

setFeaturesCallbacks({
  generateExercise,
});

// =============================================
// START SOLO GAME (from navigation.js callback)
// =============================================

function startSoloGame() {
  state.sessionStars = 0;
  state.questionNumber = 0;
  state.consecutiveCorrect = 0;
  state.consecutiveWrong = 0;
  state.secondChancesLeft = 1;
  const savedStats = getGameStats(state.currentGame);
  state.difficulty = savedStats.total > 0 ? savedStats.difficulty : 'normal';
  const gameName = getGameName(state.currentGame);
  document.getElementById('game-title').innerText = gameName;
  document.getElementById('multiplayer-turn-banner').classList.add('hidden');
  document.getElementById('quest-progress-banner').classList.add('hidden');
  document.getElementById('difficulty-badge').classList.remove('hidden');
  document.getElementById('star-dots-container').parentNode.classList.remove('hidden');
  updateSessionStarsUI();
  updateDifficultyUI();
  updateStreak();
  checkBadgeUnlocks();
  hideAllScreens();
  document.getElementById('screen-game').classList.remove('hidden');
  generateExercise();
  updateFooterMessage('game_start');
}

// =============================================
// DOMContentLoaded — Application boot
// =============================================

window.addEventListener('DOMContentLoaded', () => {
  updateStarsUI();
  updateFooterCompanion();
  applySoundIcons();
  initParentalControls();
  initAccessibility();
  goHome();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('PWA Service Worker registered!', reg))
      .catch(err => console.error('PWA Service Worker registration failed:', err));
  }

  const splash = document.getElementById('splash-screen');
  function dismissSplash() {
    if (!splash || splash.dataset.dismissed) return;
    splash.dataset.dismissed = '1';
    splash.style.animation = 'splash-fade-out 0.6s ease-out forwards';
    setTimeout(() => splash.remove(), 650);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => setTimeout(dismissSplash, 800));
  }
  setTimeout(dismissSplash, 2500);
});

// Initialize French TTS voice early
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
    cachedFrenchVoice = voices.find(v => v.lang.startsWith('fr') || v.lang === 'fr-FR') || null;
  };
}

// =============================================
// Export all public functions to window for onclick handlers
// =============================================

window.toggleMute = toggleMute;
window.goHome = goHome;
window.selectCategory = selectCategory;
window.launchGame = launchGame;
window.backToSubmenu = backToSubmenu;
window.restartCurrentGame = restartCurrentGame;
window.setGameMode = setGameMode;
window.openAccessibilityModal = openAccessibilityModal;
window.closeAccessibilityModal = closeAccessibilityModal;
window.toggleAccVoice = toggleAccVoice;
window.toggleAccContrast = toggleAccContrast;
window.setQuestionCount = setQuestionCount;
window.openBadgesModal = openBadgesModal;
window.closeBadgesModal = closeBadgesModal;
window.closeUnlockPopup = closeUnlockPopup;
window.launchQuest = launchQuest;
window.closeQuestStoryModal = closeQuestStoryModal;
window.startMultiplayerMatch = startMultiplayerMatch;
window.handleNextExerciseClick = handleNextExerciseClick;
window.restartMultiplayerMatch = restartMultiplayerMatch;
window.openScoreboardModal = openScoreboardModal;
window.closeScoreboardModal = closeScoreboardModal;
window.clearScoreboardHistory = clearScoreboardHistory;
window.showParentGate = showParentGate;
window.hideParentGate = hideParentGate;
window.verifyParentGate = verifyParentGate;
window.toggleFractionBlock = toggleFractionBlock;
window.validateInteractiveFraction = validateInteractiveFraction;
window.addBaseTen = addBaseTen;
window.resetBaseTen = resetBaseTen;
window.validateBaseTen = validateBaseTen;
window.toggleShapeSelected = toggleShapeSelected;
window.validateFormesTri = validateFormesTri;
