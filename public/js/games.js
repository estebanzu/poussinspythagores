// =============================================
// GAMES — All exercise generator functions (SVG + UI)
// =============================================

import { state, multiplayerState, questState } from './state.js';
import {
  getRandomInt,
  shuffleArray,
  getDistractors,
  markSeen,
  isRecentlySeen,
  clearRecentlySeen,
} from './utils.js';
import { playAudioTone, speakText } from './audio.js';
import {
  updateMultiplayerScoreboardUI,
  updateQuestObjectiveUI,
  updateStarsUI,
  updateSessionStarsUI,
  updateDifficultyUI,
  showToast,
  updateFooterMessage,
  renderOptions,
  updateProgressBar,
  getAdaptiveThreshold,
} from './ui.js';
import { recordAnswer, recordSession } from './storage.js';
import { hideAllScreens } from './navigation.js';
import { SUCCESS_PHRASES, FAIL_PHRASES } from './constants.js';

// ---- Import callbacks for cross-module refs ----
let checkBadgeUnlocks = () => {};
let checkStreakBonus = () => {};
let showRandomFact = () => {};

export function setGamesCallbacks(fns) {
  if (fns.checkBadgeUnlocks) checkBadgeUnlocks = fns.checkBadgeUnlocks;
  if (fns.checkStreakBonus) checkStreakBonus = fns.checkStreakBonus;
  if (fns.showRandomFact) showRandomFact = fns.showRandomFact;
}

// =============================================
// TIMER
// =============================================

import * as stateMod from './state.js';

const QUESTION_TIME_LIMIT = 15;

export function startQuestionTimer() {
  stopQuestionTimer();
  stateMod.setQuestionTimeRemaining(QUESTION_TIME_LIMIT);
  updateTimerUI();
  const timerEl = document.getElementById('question-timer');
  if (timerEl) timerEl.classList.remove('timer-urgent');
  stateMod.setQuestionTimerInterval(
    setInterval(() => {
      stateMod.setQuestionTimeRemaining(stateMod.questionTimeRemaining - 1);
      updateTimerUI();
      if (
        stateMod.questionTimeRemaining <= 5 &&
        stateMod.questionTimeRemaining > 0
      ) {
        const timerEl = document.getElementById('question-timer');
        if (timerEl) timerEl.classList.add('timer-urgent');
        const timerText = document.getElementById('timer-text');
        if (timerText) timerText.classList.add('timer-shake-anim');
        setTimeout(() => {
          if (timerText) timerText.classList.remove('timer-shake-anim');
        }, 300);
      }
      if (stateMod.questionTimeRemaining <= 0) {
        stopQuestionTimer();
        handleTimeout();
      }
    }, 1000)
  );
}

export function stopQuestionTimer() {
  if (stateMod.questionTimerInterval) {
    clearInterval(stateMod.questionTimerInterval);
    stateMod.setQuestionTimerInterval(null);
  }
}

function updateTimerUI() {
  const timerText = document.getElementById('timer-text');
  const timerRing = document.getElementById('timer-ring');
  if (!timerText || !timerRing) return;
  timerText.innerText = stateMod.questionTimeRemaining;
  const circumference = 2 * Math.PI * 16;
  const progress = stateMod.questionTimeRemaining / QUESTION_TIME_LIMIT;
  const offset = circumference * (1 - progress);
  timerRing.style.strokeDashoffset = offset;
  if (stateMod.questionTimeRemaining > 10) {
    timerRing.style.stroke = '#22c55e';
    timerText.className = 'timer-number text-sm text-brand-green-dark';
  } else if (stateMod.questionTimeRemaining > 5) {
    timerRing.style.stroke = '#f59e0b';
    timerText.className = 'timer-number text-sm text-amber-600';
  } else {
    timerRing.style.stroke = '#ef4444';
    timerText.className = 'timer-number text-sm text-red-500';
  }
}

// =============================================
// CHECK ANSWER
// =============================================

export function checkAnswer(selected, buttonElement) {
  if (state.isAnswerSelected) return;
  state.isAnswerSelected = true;
  stopQuestionTimer();
  const isCorrect = selected === state.currentAnswer;
  if (isCorrect) {
    playAudioTone('success');
    buttonElement.classList.remove('border-slate-200');
    buttonElement.classList.add(
      'border-brand-green',
      'bg-brand-green-light',
      'text-brand-green-dark'
    );
    if (multiplayerState.isActive) {
      if (multiplayerState.currentPlayer === 1) {
        multiplayerState.player1.stars++;
      } else {
        multiplayerState.player2.stars++;
      }
      updateMultiplayerScoreboardUI();
    } else if (questState.isActive) {
      questState.progress++;
      questState.consecutiveCorrect++;
      updateQuestObjectiveUI();
    } else {
      state.sessionStars++;
      state.stars++;
      localStorage.setItem('mathscp_stars', state.stars);
      updateStarsUI();
      updateSessionStarsUI();
    }
    if (!multiplayerState.isActive) {
      const elapsed = stateMod.questionStartTime
        ? Date.now() - stateMod.questionStartTime
        : null;
      recordAnswer(state.currentGame, true, elapsed);
    }
    state.consecutiveCorrect++;
    state.consecutiveWrong = 0;
    if (!multiplayerState.isActive && !questState.isActive) {
      const upThreshold = getAdaptiveThreshold(state.currentGame);
      if (
        state.difficulty === 'easy' &&
        state.consecutiveCorrect >= upThreshold
      ) {
        state.difficulty = 'normal';
        state.consecutiveCorrect = 0;
        setTimeout(
          () => showToast(true, 'Super ! Difficulté : Normal ! 🔵'),
          500
        );
        updateDifficultyUI();
      } else if (
        state.difficulty === 'normal' &&
        state.consecutiveCorrect >= upThreshold
      ) {
        state.difficulty = 'challenge';
        state.consecutiveCorrect = 0;
        setTimeout(
          () => showToast(true, 'Incroyable ! Niveau Défi débloqué ! 🔥'),
          500
        );
        updateDifficultyUI();
      }
    }
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.75 } });
    checkBadgeUnlocks();
    const phrase = SUCCESS_PHRASES[getRandomInt(0, SUCCESS_PHRASES.length - 1)];
    showToast(true, phrase);
    updateFooterMessage('success');
    if (
      !multiplayerState.isActive &&
      !questState.isActive &&
      state.sessionStars < state.questionCount
    ) {
      showRandomFact();
    }
    if (multiplayerState.isActive) {
      const nextBtn = document.getElementById('btn-next-exercise');
      if (nextBtn) {
        if (multiplayerState.currentTurn >= multiplayerState.maxTurns) {
          nextBtn.querySelector('span').innerText = 'Voir les résultats 🏁';
        } else {
          const nextPlayer =
            multiplayerState.currentPlayer === 1
              ? multiplayerState.player2
              : multiplayerState.player1;
          nextBtn.querySelector('span').innerText =
            `Passer au tour de ${nextPlayer.name} ${multiplayerState.currentPlayer === 1 ? '🦁' : '🐣'}`;
        }
        nextBtn.classList.remove('hidden');
      }
    } else if (questState.isActive) {
      const nextBtn = document.getElementById('btn-next-exercise');
      if (nextBtn) {
        if (questState.progress >= 5) {
          nextBtn.querySelector('span').innerText = 'Terminer la quête ! 🏆';
        } else {
          nextBtn.querySelector('span').innerText = "Continuer l'aventure 🚀";
        }
        nextBtn.classList.remove('hidden');
      }
    } else {
      if (state.sessionStars >= state.questionCount) {
        checkStreakBonus();
        setTimeout(() => {
          triggerVictorySession();
        }, 1000);
      } else {
        document.getElementById('btn-next-exercise').classList.remove('hidden');
      }
    }
  } else {
    playAudioTone('fail');
    if (
      !multiplayerState.isActive &&
      !questState.isActive &&
      state.secondChancesLeft > 0
    ) {
      state.secondChancesLeft--;
      state.isAnswerSelected = false;
      buttonElement.classList.remove('border-slate-200');
      buttonElement.classList.add(
        'border-brand-pink',
        'bg-brand-pink-light',
        'text-brand-pink-dark',
        'opacity-50',
        'cursor-not-allowed'
      );
      buttonElement.onclick = null;
      setTimeout(() => showToast(false, 'Hmm, essaie encore ! 💪'), 300);
      return;
    }
    buttonElement.classList.remove('border-slate-200');
    buttonElement.classList.add(
      'border-brand-pink',
      'bg-brand-pink-light',
      'text-brand-pink-dark',
      'shake'
    );
    if (multiplayerState.isActive) {
      const nextBtn = document.getElementById('btn-next-exercise');
      if (nextBtn) {
        if (multiplayerState.currentTurn >= multiplayerState.maxTurns) {
          nextBtn.querySelector('span').innerText = 'Voir les résultats 🏁';
        } else {
          const nextPlayer =
            multiplayerState.currentPlayer === 1
              ? multiplayerState.player2
              : multiplayerState.player1;
          nextBtn.querySelector('span').innerText =
            `Passer au tour de ${nextPlayer.name} ${multiplayerState.currentPlayer === 1 ? '🦁' : '🐣'}`;
        }
        nextBtn.classList.remove('hidden');
      }
    } else if (questState.isActive) {
      state.isAnswerSelected = false;
      questState.consecutiveCorrect = 0;
    } else {
      state.isAnswerSelected = false;
      const elapsed = stateMod.questionStartTime
        ? Date.now() - stateMod.questionStartTime
        : null;
      recordAnswer(state.currentGame, false, elapsed);
      state.consecutiveWrong++;
      state.consecutiveCorrect = 0;
      const downThreshold = getAdaptiveThreshold(state.currentGame);
      if (
        state.difficulty === 'challenge' &&
        state.consecutiveWrong >= downThreshold
      ) {
        state.difficulty = 'normal';
        state.consecutiveWrong = 0;
        setTimeout(() => showToast(false, 'Retour au niveau Normal 🔵'), 500);
        updateDifficultyUI();
      } else if (
        state.difficulty === 'normal' &&
        state.consecutiveWrong >= downThreshold
      ) {
        state.difficulty = 'easy';
        state.consecutiveWrong = 0;
        setTimeout(
          () => showToast(false, "Mode Facile activé pour t'aider ! 🟢"),
          500
        );
        updateDifficultyUI();
      }
      checkBadgeUnlocks();
    }
    const phrase = FAIL_PHRASES[getRandomInt(0, FAIL_PHRASES.length - 1)];
    showToast(false, phrase);
    updateFooterMessage('retry');
  }
}

// =============================================
// TIMEOUT HANDLER
// =============================================

function handleTimeout() {
  if (state.isAnswerSelected) return;
  state.isAnswerSelected = true;
  playAudioTone('fail');
  const optionsContainer = document.getElementById('game-options-container');
  if (optionsContainer) {
    optionsContainer.querySelectorAll('button').forEach((btn) => {
      btn.onclick = null;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
    });
  }
  if (optionsContainer) {
    optionsContainer.querySelectorAll('button').forEach((btn) => {
      if (btn.innerText == state.currentAnswer) {
        btn.classList.remove('border-slate-200');
        btn.classList.add(
          'border-brand-green',
          'bg-brand-green-light',
          'text-brand-green-dark'
        );
      }
    });
  }
  if (multiplayerState.isActive) {
    // multiplayer scoring handled by the multiplayer flow
  } else if (questState.isActive) {
    questState.consecutiveCorrect = 0;
  } else {
    const elapsed = stateMod.questionStartTime
      ? QUESTION_TIME_LIMIT * 1000
      : null;
    recordAnswer(state.currentGame, false, elapsed);
    state.consecutiveWrong++;
    state.consecutiveCorrect = 0;
    const downThreshold = getAdaptiveThreshold(state.currentGame);
    if (
      state.difficulty === 'challenge' &&
      state.consecutiveWrong >= downThreshold
    ) {
      state.difficulty = 'normal';
      state.consecutiveWrong = 0;
      setTimeout(() => showToast(false, 'Retour au niveau Normal 🔵'), 500);
      updateDifficultyUI();
    } else if (
      state.difficulty === 'normal' &&
      state.consecutiveWrong >= downThreshold
    ) {
      state.difficulty = 'easy';
      state.consecutiveWrong = 0;
      setTimeout(
        () => showToast(false, "Mode Facile activé pour t'aider ! 🟢"),
        500
      );
      updateDifficultyUI();
    }
    checkBadgeUnlocks();
  }
  showToast(false, 'Temps écoulé ! ⏰');
  updateFooterMessage('retry');
  if (multiplayerState.isActive) {
    const nextBtn = document.getElementById('btn-next-exercise');
    if (nextBtn) {
      if (multiplayerState.currentTurn >= multiplayerState.maxTurns) {
        nextBtn.querySelector('span').innerText = 'Voir les résultats 🏁';
      } else {
        const nextPlayer =
          multiplayerState.currentPlayer === 1
            ? multiplayerState.player2
            : multiplayerState.player1;
        nextBtn.querySelector('span').innerText =
          `Passer au tour de ${nextPlayer.name} ${multiplayerState.currentPlayer === 1 ? '🦁' : '🐣'}`;
      }
      nextBtn.classList.remove('hidden');
    }
  } else if (questState.isActive) {
    state.isAnswerSelected = false;
    const nextBtn = document.getElementById('btn-next-exercise');
    if (nextBtn) {
      nextBtn.querySelector('span').innerText = "Continuer l'aventure 🚀";
      nextBtn.classList.remove('hidden');
    }
  } else {
    state.isAnswerSelected = false;
    document.getElementById('btn-next-exercise').classList.remove('hidden');
  }
}

// =============================================
// EXERCISE GENERATOR
// =============================================

export function generateExercise() {
  state.isAnswerSelected = false;
  state.secondChancesLeft = 1;
  stateMod.setQuestionStartTime(Date.now());
  state.questionNumber++;
  document.getElementById('btn-next-exercise').classList.add('hidden');
  updateProgressBar();
  const visualArea = document.getElementById('game-visual-area');
  const questionText = document.getElementById('game-question-text');
  const optionsContainer = document.getElementById('game-options-container');
  const MAX_DEDUP_ATTEMPTS = 6;
  for (let attempt = 0; attempt < MAX_DEDUP_ATTEMPTS; attempt++) {
    visualArea.innerHTML = '';
    optionsContainer.innerHTML = '';
    state.currentQuestionKey = null;
    switch (state.currentGame) {
      case 'a_nombres_100':
        genNombres100(visualArea, questionText, optionsContainer);
        break;
      case 'a_additions':
        genAdditions(visualArea, questionText, optionsContainer);
        break;
      case 'a_soustractions':
        genSoustractions(visualArea, questionText, optionsContainer);
        break;
      case 'a_add_rapide':
        genAddRapide(visualArea, questionText, optionsContainer);
        break;
      case 'a_sous_rapide':
        genSousRapide(visualArea, questionText, optionsContainer);
        break;
      case 'a_add_sous_rapide':
        genAddSousRapide(visualArea, questionText, optionsContainer);
        break;
      case 'a_tables_rapides':
        genTablesRapides(visualArea, questionText, optionsContainer);
        break;
      case 'd_sequences':
        genSequences(visualArea, questionText, optionsContainer);
        break;
      case 'd_analogies':
        genAnalogies(visualArea, questionText, optionsContainer);
        break;
      case 'a_doubles_moities':
        genDoublesMoities(visualArea, questionText, optionsContainer);
        break;
      case 'a_complements_10':
        genComplements10(visualArea, questionText, optionsContainer);
        break;
      case 'a_fractions':
        genFractions(visualArea, questionText, optionsContainer);
        break;
      case 'b_figures':
        genFigures(visualArea, questionText, optionsContainer);
        break;
      case 'b_vocabulaire_spatial':
        genVocabulaireSpatial(visualArea, questionText, optionsContainer);
        break;
      case 'b_formes_tri':
        genFormesTri(visualArea, questionText, optionsContainer);
        break;
      case 'c_monnaie':
        genMonnaie(visualArea, questionText, optionsContainer);
        break;
      case 'c_heure':
        genHeure(visualArea, questionText, optionsContainer);
        break;
      case 'c_mesures':
        genMesures(visualArea, questionText, optionsContainer);
        break;
      case 'a_fractions_interact':
        genFractionsInteract(visualArea, questionText, optionsContainer);
        break;
      case 'a_blocs_dizaines':
        genBlocsDizaines(visualArea, questionText, optionsContainer);
        break;
    }
    const key = state.currentQuestionKey;
    if (!key || !isRecentlySeen(state.currentGame, key)) {
      if (key) markSeen(state.currentGame, key);
      break;
    }
    if (attempt === MAX_DEDUP_ATTEMPTS - 1) {
      clearRecentlySeen(state.currentGame);
      markSeen(state.currentGame, key);
    }
  }
  setTimeout(() => {
    if (
      !state.isMuted ||
      (state.accessibilityState && state.accessibilityState.autoplayVoice)
    ) {
      const textEl = document.getElementById('game-question-text');
      if (textEl) speakText(textEl.innerText);
    }
  }, 350);
  startQuestionTimer();
}

// =============================================
// VICTORY
// =============================================

export function triggerVictorySession() {
  playAudioTone('trophy');
  recordSession();
  checkBadgeUnlocks();
  confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  document.getElementById('game-progress-container').classList.add('hidden');
  document.getElementById('game-progress-text').classList.add('hidden');
  hideAllScreens();
  document.getElementById('screen-victory').classList.remove('hidden');
}

// =============================================
// ALL GAME GENERATORS
// =============================================

// ---- A1. Nombres jusqu'à 100 ----
function genNombres100(visualArea, questionText, optionsContainer) {
  const mode = getRandomInt(1, 2);
  let number;
  if (state.difficulty === 'easy') {
    number = getRandomInt(5, 20);
  } else if (state.difficulty === 'challenge') {
    const pairs = [
      [12, 21],
      [13, 31],
      [14, 41],
      [15, 51],
      [16, 61],
      [17, 71],
      [18, 81],
      [19, 91],
      [23, 32],
      [24, 42],
      [25, 52],
      [26, 62],
      [27, 72],
      [28, 82],
      [29, 92],
      [34, 43],
      [35, 53],
      [36, 63],
      [37, 73],
      [38, 83],
      [39, 93],
      [45, 54],
      [46, 64],
      [47, 74],
      [48, 84],
      [49, 94],
      [56, 65],
      [57, 75],
      [58, 85],
      [59, 95],
      [67, 76],
      [68, 86],
      [69, 96],
      [78, 87],
      [79, 97],
      [89, 98],
    ];
    number = pairs[getRandomInt(0, pairs.length - 1)][getRandomInt(0, 1)];
  } else {
    number = getRandomInt(10, 99);
  }
  state.currentAnswer = number;
  state.currentQuestionKey = 'n100_' + state.difficulty + '_' + number;
  const dizaines = Math.floor(number / 10);
  const unites = number % 10;
  if (mode === 1) {
    questionText.innerText = 'Quel est ce nombre représenté par les blocs ?';
    let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
    const dWidth = 12,
      dHeight = 120,
      spacing = 18,
      startX = 20,
      startY = 30;
    for (let i = 0; i < dizaines; i++) {
      const rx = startX + i * spacing;
      svg += `<g><rect x="${rx}" y="${startY}" width="${dWidth}" height="${dHeight}" rx="2" fill="#F97316" stroke="#C2410C" stroke-width="1.5"/>`;
      for (let j = 1; j < 10; j++) {
        svg += `<line x1="${rx}" y1="${startY + j * (dHeight / 10)}" x2="${rx + dWidth}" y2="${startY + j * (dHeight / 10)}" stroke="#C2410C" stroke-width="1"/>`;
      }
      svg += `</g>`;
    }
    const cSize = 12,
      uStartX = startX + dizaines * spacing + 20,
      uStartY = startY + 10;
    for (let i = 0; i < unites; i++) {
      const row = Math.floor(i / 5),
        col = i % 5;
      svg += `<rect x="${uStartX + col * 18}" y="${uStartY + row * 18}" width="${cSize}" height="${cSize}" rx="2" fill="#38BDF8" stroke="#0284C7" stroke-width="1.5" class="animate-bounce-slow" style="animation-delay: ${i * 0.05}s"/>`;
    }
    svg += `</svg>`;
    visualArea.innerHTML = svg;
    renderOptions(
      number,
      getDistractors(
        number,
        3,
        state.difficulty === 'easy' ? 1 : 10,
        state.difficulty === 'easy' ? 25 : 99
      ),
      optionsContainer
    );
  } else {
    questionText.innerText = "Trouve le nombre correspondant à l'écriture :";
    visualArea.innerHTML = `
      <div class="flex flex-col items-center justify-center gap-4 bg-gradient-to-tr from-brand-purple/10 to-brand-blue/10 p-6 rounded-3xl border-2 border-brand-purple/20 w-4/5 animate-float font-title">
        <span class="text-4xl md:text-5xl font-extrabold text-brand-purple tracking-wide">${dizaines > 0 ? `${dizaines}d et ` : ''}${unites}u</span>
        <div class="text-xs text-slate-500 font-bold uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-200">d = dizaine • u = unité</div>
      </div>`;
    renderOptions(
      number,
      getDistractors(
        number,
        3,
        state.difficulty === 'easy' ? 1 : 10,
        state.difficulty === 'easy' ? 25 : 99
      ),
      optionsContainer
    );
  }
}

// ---- A2. Additions ----
function genAdditions(visualArea, questionText, optionsContainer) {
  let mode;
  if (state.difficulty === 'easy') mode = 1;
  else if (state.difficulty === 'challenge') mode = 2;
  else mode = getRandomInt(1, 2);
  if (mode === 1) {
    let a, b, correct;
    if (state.difficulty === 'easy') {
      a = getRandomInt(1, 7);
      b = getRandomInt(1, 10 - a);
    } else {
      const sm = getRandomInt(1, 3);
      if (sm === 1) {
        a = getRandomInt(2, 9);
        b = getRandomInt(2, 9);
      } else if (sm === 2) {
        a = getRandomInt(1, 8) * 10;
        b = getRandomInt(1, 9);
      } else {
        a = getRandomInt(11, 25);
        b = getRandomInt(1, 4);
      }
    }
    correct = a + b;
    state.currentAnswer = correct;
    state.currentQuestionKey = 'add_h_' + a + '+' + b;
    questionText.innerText = 'Trouve le résultat de cette addition en ligne :';
    visualArea.innerHTML = `<div class="flex items-center justify-center gap-3 bg-brand-blue-light/40 border-2 border-brand-blue/15 p-6 rounded-3xl shadow-sm w-4/5 animate-float font-title">
      <span class="text-4xl md:text-5xl font-extrabold text-brand-blue">${a}</span>
      <span class="text-3xl md:text-4xl font-black text-brand-pink">+</span>
      <span class="text-4xl md:text-5xl font-extrabold text-brand-blue">${b}</span>
      <span class="text-3xl md:text-4xl font-black text-brand-pink">=</span>
      <span class="text-4xl md:text-5xl font-extrabold text-slate-300">?</span>
    </div>`;
    renderOptions(
      correct,
      getDistractors(correct, 3, 2, 100),
      optionsContainer
    );
  } else {
    let aUnits, bUnits, aTens, bTens;
    if (state.difficulty === 'challenge') {
      aUnits = getRandomInt(4, 9);
      bUnits = getRandomInt(10 - aUnits, 9);
      aTens = getRandomInt(1, 4);
      bTens = getRandomInt(1, 4);
    } else {
      aUnits = getRandomInt(1, 6);
      bUnits = getRandomInt(1, 9 - aUnits);
      aTens = getRandomInt(1, 5);
      bTens = getRandomInt(1, 9 - aTens);
    }
    const a = aTens * 10 + aUnits,
      b = bTens * 10 + bUnits,
      correct = a + b;
    state.currentAnswer = correct;
    state.currentQuestionKey = 'add_v_' + a + '+' + b;
    questionText.innerText = 'Calcule cette addition posée en colonne :';
    visualArea.innerHTML = `<div class="seyes-grid p-6 rounded-2xl flex flex-col items-center justify-center font-title w-48 shadow-md relative overflow-hidden">
      <div class="absolute left-4 top-0 bottom-0 seyes-red-line"></div>
      <div class="grid grid-cols-2 gap-4 text-center border-b-2 border-slate-300 w-full pb-1 text-sm font-bold text-slate-500"><div>D</div><div>U</div></div>
      <div class="grid grid-cols-2 gap-4 text-center w-full text-xs font-bold text-brand-pink h-4 mt-1">${state.difficulty === 'challenge' ? '<div class="animate-pulse bg-brand-pink/15 rounded-full w-5 h-5 flex items-center justify-center mx-auto border border-brand-pink/30">①</div>' : '<div></div>'}<div></div></div>
      <div class="grid grid-cols-2 gap-4 text-center w-full py-1 text-2xl font-extrabold text-slate-800"><div>${aTens}</div><div>${aUnits}</div></div>
      <div class="grid grid-cols-2 gap-4 text-center w-full py-1 text-2xl font-extrabold text-slate-800 relative"><span class="absolute left-[-10px] text-brand-pink font-black text-xl">+</span><div>${bTens}</div><div>${bUnits}</div></div>
      <div class="w-full border-b-4 border-slate-700 my-1"></div>
      <div class="grid grid-cols-2 gap-4 text-center w-full py-1 text-2xl font-black text-brand-blue animate-pulse-soft"><div>?</div><div>?</div></div>
    </div>`;
    renderOptions(
      correct,
      getDistractors(correct, 3, 10, 99),
      optionsContainer
    );
  }
}

// ---- A3. Soustractions ----
function genSoustractions(visualArea, questionText, optionsContainer) {
  let a, b;
  if (state.difficulty === 'easy') {
    a = getRandomInt(3, 9);
    b = getRandomInt(1, a - 1);
  } else if (state.difficulty === 'challenge') {
    a = getRandomInt(15, 29);
    b = getRandomInt(11, a - 2);
    if (a % 10 < b % 10) {
      a = Math.floor(a / 10) * 10 + getRandomInt(5, 9);
      b = Math.floor(b / 10) * 10 + getRandomInt(1, 4);
    }
  } else {
    const aTens = getRandomInt(1, 2),
      aUnits = getRandomInt(4, 9),
      bTens = aTens === 2 ? getRandomInt(1, 2) : 0,
      bUnits = getRandomInt(1, aUnits - 1);
    a = aTens * 10 + aUnits;
    b = bTens * 10 + bUnits;
  }
  const correct = a - b;
  state.currentAnswer = correct;
  state.currentQuestionKey = 'sous_' + a + '-' + b;
  questionText.innerText = `Trouve le résultat de la soustraction : ${a} - ${b}`;
  let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
  const r = 12,
    spacingX = 30,
    spacingY = 32;
  for (let i = 0; i < a; i++) {
    const col = i % 10,
      row = Math.floor(i / 10),
      x = 25 + col * spacingX,
      y = 35 + row * spacingY;
    const isCrossed = i >= a - b;
    if (isCrossed) {
      svg += `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>`;
      svg += `<line x1="${x - r + 3}" y1="${y - r + 3}" x2="${x + r - 3}" y2="${y + r - 3}" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/>`;
      svg += `<line x1="${x - r + 3}" y1="${y + r - 3}" x2="${x + r - 3}" y2="${y - r - 3}" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/></g>`;
    } else {
      svg += `<g class="animate-bounce-slow" style="animation-delay: ${i * 0.05}s"><circle cx="${x}" cy="${y}" r="${r}" fill="#FF6B8B" stroke="#E05270" stroke-width="1.5"/>`;
      svg += `<circle cx="${x - 4}" cy="${y - 4}" r="3" fill="white" opacity="0.6"/>`;
      svg += `<path d="M${x - 2} ${y - r - 2} Q${x} ${y - r - 6} ${x + 4} ${y - r - 4} Q${x + 1} ${y - r - 1} ${x - 2} ${y - r - 2}" fill="#4ECA64"/></g>`;
    }
  }
  svg += `</svg>`;
  visualArea.innerHTML = svg;
  renderOptions(
    correct,
    getDistractors(correct, 3, 0, state.difficulty === 'easy' ? 10 : 35),
    optionsContainer
  );
}

// ---- A3b. Addition rapide ----
function genAddRapide(visualArea, questionText, optionsContainer) {
  let a, b;
  if (state.difficulty === 'easy') {
    a = getRandomInt(1, 9);
    b = getRandomInt(1, 9);
  } else if (state.difficulty === 'challenge') {
    a = getRandomInt(10, 30);
    b = getRandomInt(10, 30);
  } else {
    a = getRandomInt(1, 20);
    b = getRandomInt(1, 20);
  }
  const correct = a + b;
  state.currentAnswer = correct;
  state.currentQuestionKey = 'addrap_' + a + '+' + b;
  questionText.innerText = `Calcule vite : ${a} + ${b} = ?`;
  visualArea.innerHTML = `<div class="flex items-center justify-center gap-4 bg-brand-blue-light/40 border-2 border-brand-blue/15 p-6 rounded-3xl shadow-sm w-4/5 font-title">
    <span class="text-5xl font-extrabold text-brand-blue">${a}</span>
    <span class="text-4xl font-black text-brand-pink">+</span>
    <span class="text-5xl font-extrabold text-brand-blue">${b}</span>
    <span class="text-4xl font-black text-brand-pink">=</span>
    <span class="text-5xl font-black text-slate-300">?</span>
  </div>`;
  renderOptions(
    correct,
    getDistractors(correct, 3, 2, state.difficulty === 'easy' ? 20 : 60),
    optionsContainer
  );
}

// ---- A3c. Soustraction rapide ----
function genSousRapide(visualArea, questionText, optionsContainer) {
  let a, b;
  if (state.difficulty === 'easy') {
    a = getRandomInt(3, 12);
    b = getRandomInt(1, a - 1);
  } else if (state.difficulty === 'challenge') {
    a = getRandomInt(25, 60);
    b = getRandomInt(10, a - 1);
  } else {
    a = getRandomInt(10, 30);
    b = getRandomInt(1, a - 1);
  }
  const correct = a - b;
  state.currentAnswer = correct;
  state.currentQuestionKey = 'sousrap_' + a + '-' + b;
  questionText.innerText = `Calcule vite : ${a} - ${b} = ?`;
  visualArea.innerHTML = `<div class="flex items-center justify-center gap-4 bg-brand-pink-light/40 border-2 border-brand-pink/15 p-6 rounded-3xl shadow-sm w-4/5 font-title">
    <span class="text-5xl font-extrabold text-brand-blue">${a}</span>
    <span class="text-4xl font-black text-brand-pink">-</span>
    <span class="text-5xl font-extrabold text-brand-blue">${b}</span>
    <span class="text-4xl font-black text-brand-pink">=</span>
    <span class="text-5xl font-black text-slate-300">?</span>
  </div>`;
  renderOptions(
    correct,
    getDistractors(correct, 3, 0, state.difficulty === 'easy' ? 12 : 40),
    optionsContainer
  );
}

// ---- A3d. Addition / Soustraction rapide ----
function genAddSousRapide(visualArea, questionText, optionsContainer) {
  if (getRandomInt(0, 1) === 0)
    genAddRapide(visualArea, questionText, optionsContainer);
  else genSousRapide(visualArea, questionText, optionsContainer);
}

// ---- A3e. Tables de multiplication rapides ----
function genTablesRapides(visualArea, questionText, optionsContainer) {
  let a, b;
  if (state.difficulty === 'easy') {
    a = getRandomInt(1, 5);
    b = getRandomInt(1, 5);
  } else if (state.difficulty === 'challenge') {
    a = getRandomInt(6, 12);
    b = getRandomInt(1, 12);
  } else {
    a = getRandomInt(1, 9);
    b = getRandomInt(1, 9);
  }
  const correct = a * b;
  state.currentAnswer = correct;
  state.currentQuestionKey = 'table_' + a + 'x' + b;
  questionText.innerText = `Calcule vite : ${a} × ${b} = ?`;
  visualArea.innerHTML = `<div class="flex items-center justify-center gap-4 bg-brand-yellow-light/60 border-2 border-brand-yellow/20 p-6 rounded-3xl shadow-sm w-4/5 font-title">
    <span class="text-5xl font-extrabold text-brand-purple">${a}</span>
    <span class="text-4xl font-black text-brand-orange">×</span>
    <span class="text-5xl font-extrabold text-brand-purple">${b}</span>
    <span class="text-4xl font-black text-brand-orange">=</span>
    <span class="text-5xl font-black text-slate-300">?</span>
  </div>`;
  renderOptions(
    correct,
    getDistractors(correct, 3, 1, state.difficulty === 'easy' ? 25 : 81),
    optionsContainer
  );
}

// ---- A4. Doubles et moitiés ----
function genDoublesMoities(visualArea, questionText, optionsContainer) {
  const mode = getRandomInt(1, 2);
  if (mode === 1) {
    let x;
    if (state.difficulty === 'easy') x = getRandomInt(2, 8);
    else if (state.difficulty === 'challenge') x = getRandomInt(10, 15);
    else x = getRandomInt(2, 9);
    const correct = x * 2;
    state.currentAnswer = correct;
    state.currentQuestionKey = 'dm_d_' + state.difficulty + '_' + x;
    questionText.innerText = `Quel est le double de ${x} ? (${x} + ${x})`;
    let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect x="15" y="25" width="135" height="150" rx="15" fill="#EEF2F6" stroke="#94A3B8" stroke-width="3" stroke-dasharray="6 4"/>`;
    svg += `<text x="82" y="19" font-family="Fredoka" font-size="12" font-weight="bold" fill="#64748B" text-anchor="middle">GROUPE 1</text>`;
    svg += `<rect x="170" y="25" width="135" height="150" rx="15" fill="#EEF2F6" stroke="#94A3B8" stroke-width="3" stroke-dasharray="6 4"/>`;
    svg += `<text x="237" y="19" font-family="Fredoka" font-size="12" font-weight="bold" fill="#64748B" text-anchor="middle">GROUPE 2</text>`;
    const drawStarsInBox = (sx, count) => {
      let bs = '';
      for (let i = 0; i < count; i++) {
        const col = i % 3,
          row = Math.floor(i / 3),
          px = sx + 25 + col * 35,
          py = 50 + row * 40;
        bs += `<path d="M${px} ${py - 12} L${px + 3.5} ${py - 3.5} L${px + 12} ${py - 3.5} L${px + 5.5} ${py + 1.5} L${px + 8} ${py + 9.5} L${px} ${py + 5} L${px - 8} ${py + 9.5} L${px - 5.5} ${py + 1.5} L${px - 12} ${py - 3.5} L${px - 3.5} ${py - 3.5} Z" fill="#FFD93D" stroke="#E0BE2F" stroke-width="1.5"/>`;
      }
      return bs;
    };
    svg += drawStarsInBox(15, x);
    svg += drawStarsInBox(170, x);
    svg += `</svg>`;
    visualArea.innerHTML = svg;
    renderOptions(
      correct,
      getDistractors(correct, 3, 2, state.difficulty === 'easy' ? 12 : 35),
      optionsContainer
    );
  } else {
    let Y;
    if (state.difficulty === 'easy') Y = getRandomInt(2, 8) * 2;
    else if (state.difficulty === 'challenge') Y = getRandomInt(6, 10) * 2;
    else Y = getRandomInt(1, 10) * 2;
    const correct = Y / 2;
    state.currentAnswer = correct;
    state.currentQuestionKey = 'dm_m_' + state.difficulty + '_' + Y;
    questionText.innerText = `Quelle est la moitié de ${Y} ?`;
    let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect x="20" y="25" width="280" height="150" rx="20" fill="#EEF2F6" stroke="#94A3B8" stroke-width="4"/>`;
    svg += `<line x1="160" y1="25" x2="160" y2="175" stroke="#FF6B8B" stroke-width="3" stroke-dasharray="8 6"/>`;
    const drawCandies = (sx, count) => {
      let cs = '';
      for (let i = 0; i < count; i++) {
        const col = i % 3,
          row = Math.floor(i / 3),
          px = sx + 22 + col * 35,
          py = 50 + row * 40;
        cs += `<polygon points="${px - 12},${py - 6} ${px - 12},${py + 6} ${px - 4},${py}" fill="#4D96FF" stroke="#357AE8" stroke-width="1"/>`;
        cs += `<polygon points="${px + 12},${py - 6} ${px + 12},${py + 6} ${px + 4},${py}" fill="#4D96FF" stroke="#357AE8" stroke-width="1"/>`;
        cs += `<ellipse cx="${px}" cy="${py}" rx="8" ry="6" fill="#4ECA64" stroke="#3AB24F" stroke-width="1.5"/>`;
      }
      return cs;
    };
    svg += drawCandies(20, Y / 2);
    svg += drawCandies(160, Y / 2);
    svg += `</svg>`;
    visualArea.innerHTML = svg;
    renderOptions(correct, getDistractors(correct, 3, 1, 12), optionsContainer);
  }
}

// ---- A5. Compléments à 10 ----
function genComplements10(visualArea, questionText, optionsContainer) {
  let x, correct;
  if (state.difficulty === 'easy') {
    x = getRandomInt(4, 9);
    correct = 10 - x;
  } else if (state.difficulty === 'challenge') {
    x = getRandomInt(11, 18);
    correct = 20 - x;
  } else {
    x = getRandomInt(1, 9);
    correct = 10 - x;
  }
  state.currentAnswer = correct;
  state.currentQuestionKey = 'comp10_' + state.difficulty + '_' + x;
  if (state.difficulty === 'challenge') {
    questionText.innerText = `Combien de jetons manque-t-il pour faire 20 ? (${x} + ? = 20)`;
    let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect x="35" y="20" width="250" height="70" rx="6" fill="#F8FAFC" stroke="#6C5DD3" stroke-width="3"/>`;
    svg += `<rect x="35" y="105" width="250" height="70" rx="6" fill="#F8FAFC" stroke="#6C5DD3" stroke-width="3"/>`;
    for (let i = 1; i < 5; i++) {
      svg += `<line x1="${35 + i * 50}" y1="20" x2="${35 + i * 50}" y2="90" stroke="#6C5DD3" stroke-width="1.5"/>`;
      svg += `<line x1="${35 + i * 50}" y1="105" x2="${35 + i * 50}" y2="175" stroke="#6C5DD3" stroke-width="1.5"/>`;
    }
    svg += `<line x1="35" y1="55" x2="285" y2="55" stroke="#6C5DD3" stroke-width="1.5"/>`;
    svg += `<line x1="35" y1="140" x2="285" y2="140" stroke="#6C5DD3" stroke-width="1.5"/>`;
    for (let i = 0; i < 20; i++) {
      const grid = Math.floor(i / 10),
        cellInGrid = i % 10,
        row = Math.floor(cellInGrid / 5),
        col = cellInGrid % 5;
      const cx = 35 + col * 50 + 25,
        cy = (grid === 0 ? 20 : 105) + row * 35 + 17.5;
      if (i < x) {
        svg += `<circle cx="${cx}" cy="${cy}" r="13" fill="#FF6B8B" stroke="#E05270" stroke-width="1.5"/>`;
        svg += `<circle cx="${cx - 3}" cy="${cy - 3}" r="3" fill="white" opacity="0.6"/>`;
      } else {
        svg += `<circle cx="${cx}" cy="${cy}" r="13" fill="none" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="3 3"/>`;
        svg += `<text x="${cx}" y="${cy + 5}" font-family="Fredoka" font-size="14" font-weight="bold" fill="#94A3B8" text-anchor="middle">?</text>`;
      }
    }
    svg += `</svg>`;
    visualArea.innerHTML = svg;
    renderOptions(correct, getDistractors(correct, 3, 1, 9), optionsContainer);
  } else {
    questionText.innerText = `Combien de jetons manque-t-il pour faire 10 ? (${x} + ? = 10)`;
    let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
    const gridW = 250,
      gridH = 100,
      startX = 35,
      startY = 50,
      cellW = gridW / 5,
      cellH = gridH / 2;
    svg += `<rect x="${startX}" y="${startY}" width="${gridW}" height="${gridH}" rx="10" fill="#F8FAFC" stroke="#6C5DD3" stroke-width="4"/>`;
    for (let i = 1; i < 5; i++)
      svg += `<line x1="${startX + i * cellW}" y1="${startY}" x2="${startX + i * cellW}" y2="${startY + gridH}" stroke="#6C5DD3" stroke-width="2"/>`;
    svg += `<line x1="${startX}" y1="${startY + cellH}" x2="${startX + gridW}" y2="${startY + cellH}" stroke="#6C5DD3" stroke-width="2"/>`;
    for (let i = 0; i < 10; i++) {
      const row = Math.floor(i / 5),
        col = i % 5,
        cx = startX + col * cellW + cellW / 2,
        cy = startY + row * cellH + cellH / 2;
      if (i < x) {
        svg += `<circle cx="${cx}" cy="${cy}" r="18" fill="#FF6B8B" stroke="#E05270" stroke-width="2"/>`;
        svg += `<circle cx="${cx - 4}" cy="${cy - 4}" r="4" fill="white" opacity="0.6"/>`;
      } else {
        svg += `<circle cx="${cx}" cy="${cy}" r="18" fill="none" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="4 4"/>`;
        svg += `<text x="${cx}" y="${cy + 6}" font-family="Fredoka" font-size="18" font-weight="bold" fill="#94A3B8" text-anchor="middle">?</text>`;
      }
    }
    svg += `</svg>`;
    visualArea.innerHTML = svg;
    renderOptions(correct, getDistractors(correct, 3, 1, 9), optionsContainer);
  }
}

// ---- B1. Figures géométriques ----
function genFigures(visualArea, questionText, optionsContainer) {
  if (state.difficulty === 'challenge') {
    const questions = [
      { q: 'Combien y a-t-il de triangles dans ce dessin ?', ans: 3 },
      { q: 'Combien y a-t-il de carrés dans ce dessin ?', ans: 2 },
      { q: 'Combien y a-t-il de cercles dans ce dessin ?', ans: 1 },
      { q: 'Combien y a-t-il de rectangles dans ce dessin ?', ans: 2 },
    ];
    const item = questions[getRandomInt(0, questions.length - 1)];
    state.currentAnswer = `${item.ans}`;
    state.currentQuestionKey = 'fig_c_' + item.q;
    questionText.innerText = item.q;
    let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<circle cx="280" cy="40" r="18" fill="#FFF9DB" stroke="#F59E0B" stroke-width="2" class="animate-pulse"/>`;
    svg += `<rect x="40" y="140" width="8" height="20" fill="#78350F"/>`;
    svg += `<polygon points="44,90 24,140 64,140" fill="#059669"/>`;
    svg += `<rect x="80" y="135" width="8" height="25" fill="#78350F"/>`;
    svg += `<polygon points="84,80 64,135 104,135" fill="#10B981"/>`;
    svg += `<rect x="140" y="100" width="110" height="60" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/>`;
    svg += `<polygon points="195,45 130,100 260,100" fill="#FCA5A5" stroke="#EF4444" stroke-width="3" stroke-linejoin="round"/>`;
    svg += `<rect x="185" y="125" width="20" height="35" fill="#FCD34D" stroke="#D97706" stroke-width="2"/>`;
    svg += `<rect x="155" y="110" width="18" height="18" rx="2" fill="white" stroke="#2563EB" stroke-width="2"/>`;
    svg += `<rect x="215" y="110" width="18" height="18" rx="2" fill="white" stroke="#2563EB" stroke-width="2"/>`;
    svg += `<line x1="10" y1="160" x2="310" y2="160" stroke="#475569" stroke-width="3" stroke-linecap="round"/>`;
    svg += `</svg>`;
    visualArea.innerHTML = svg;
    const correct = item.ans;
    const distractorsSet = new Set();
    while (distractorsSet.size < 3) {
      const d = getRandomInt(0, 6);
      if (d !== correct) distractorsSet.add(d);
    }
    renderOptions(
      `${correct}`,
      Array.from(distractorsSet).map((v) => `${v}`),
      optionsContainer
    );
  } else {
    const shapes = [
      { id: 'carré', name: 'un carré', color: '#6C5DD3', border: '#5646B8' },
      {
        id: 'rectangle',
        name: 'un rectangle',
        color: '#4D96FF',
        border: '#357AE8',
      },
      {
        id: 'triangle',
        name: 'un triangle',
        color: '#4ECA64',
        border: '#3AB24F',
      },
      { id: 'cercle', name: 'un cercle', color: '#FF6B8B', border: '#E05270' },
    ];
    const idx = getRandomInt(0, 3);
    const chosen = shapes[idx];
    state.currentAnswer = chosen.name;
    state.currentQuestionKey = 'fig_n_' + chosen.id;
    questionText.innerText = "Comment s'appelle cette figure géométrique ?";
    let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">`;
    let shapeMarkup = '',
      faceX = 120,
      faceY = 120;
    if (chosen.id === 'carré') {
      shapeMarkup = `<rect x="50" y="50" width="140" height="140" rx="12" fill="${chosen.color}" stroke="${chosen.border}" stroke-width="6"/>`;
    } else if (chosen.id === 'rectangle') {
      shapeMarkup = `<rect x="30" y="65" width="180" height="110" rx="12" fill="${chosen.color}" stroke="${chosen.border}" stroke-width="6"/>`;
      faceY = 120;
    } else if (chosen.id === 'triangle') {
      shapeMarkup = `<polygon points="120,40 35,190 205,190" stroke-linejoin="round" fill="${chosen.color}" stroke="${chosen.border}" stroke-width="6"/>`;
      faceY = 145;
    } else if (chosen.id === 'cercle') {
      shapeMarkup = `<circle cx="120" cy="120" r="75" fill="${chosen.color}" stroke="${chosen.border}" stroke-width="6"/>`;
    }
    svg += shapeMarkup;
    svg += `<ellipse cx="${faceX - 25}" cy="${faceY - 10}" rx="6" ry="8" fill="#1E293B"/><ellipse cx="${faceX + 25}" cy="${faceY - 10}" rx="6" ry="8" fill="#1E293B"/><circle cx="${faceX - 27}" cy="${faceY - 13}" r="2" fill="white"/><circle cx="${faceX + 23}" cy="${faceY - 13}" r="2" fill="white"/><circle cx="${faceX - 35}" cy="${faceY + 5}" r="8" fill="#FFA5A5" opacity="0.75"/><circle cx="${faceX + 35}" cy="${faceY + 5}" r="8" fill="#FFA5A5" opacity="0.75"/><path d="M${faceX - 8} ${faceY + 2} Q${faceX} ${faceY + 12} ${faceX + 8} ${faceY + 2}" stroke="#1E293B" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    svg += `</svg>`;
    visualArea.innerHTML = svg;
    renderOptions(
      chosen.name,
      shapes.map((s) => s.name).filter((n) => n !== chosen.name),
      optionsContainer
    );
  }
}

// ---- B2. Vocabulaire spatial ----
function genVocabulaireSpatial(visualArea, questionText, optionsContainer) {
  let positions = [
    { id: 'au-dessus', label: 'au-dessus de la boîte', birdX: 120, birdY: 45 },
    {
      id: 'en dessous',
      label: 'en dessous de la boîte',
      birdX: 120,
      birdY: 195,
    },
    { id: 'à gauche', label: 'à gauche de la boîte', birdX: 35, birdY: 130 },
    { id: 'à droite', label: 'à droite de la boîte', birdX: 205, birdY: 130 },
  ];
  if (state.difficulty === 'easy') {
    positions =
      getRandomInt(0, 1) === 0
        ? [positions[0], positions[1]]
        : [positions[2], positions[3]];
  }
  const idx = getRandomInt(0, positions.length - 1);
  const chosen = positions[idx];
  state.currentAnswer = chosen.label;
  state.currentQuestionKey = 'spat_' + state.difficulty + '_' + chosen.id;
  questionText.innerText = 'Où est le petit oiseau bleu ?';
  let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<ellipse cx="120" cy="180" rx="55" ry="10" fill="#E2E8F0"/>`;
  svg += `<rect x="75" y="95" width="90" height="75" rx="8" fill="#FF8E53" stroke="#E0753A" stroke-width="4"/>`;
  svg += `<path d="M120 120 L122 125 L127 126 L123 130 L124 135 L120 132 L116 135 L117 130 L113 126 L118 125 Z" fill="white"/>`;
  svg += `<path d="M75 105 H165 M120 105 V170" stroke="#E0753A" stroke-width="2"/>`;
  const bx = chosen.birdX,
    by = chosen.birdY;
  svg += `<g class="animate-bounce-slow"><ellipse cx="${bx}" cy="${by + 20}" rx="12" ry="4" fill="#E2E8F0" opacity="0.6"/>`;
  svg += `<polygon points="${bx - 12},${by - 2} ${bx - 20},${by - 8} ${bx - 18},${by + 5}" fill="#4D96FF"/>`;
  svg += `<circle cx="${bx}" cy="${by}" r="15" fill="#4D96FF" stroke="#357AE8" stroke-width="2"/>`;
  svg += `<ellipse cx="${bx - 2}" cy="${by + 3}" rx="7" ry="5" fill="#2E86DE" transform="rotate(-15, ${bx - 2}, ${by + 3})"/>`;
  svg += `<circle cx="${bx + 5}" cy="${by - 4}" r="2" fill="#1E293B"/>`;
  svg += `<polygon points="${bx + 14},${by - 2} ${bx + 20},${by} ${bx + 14},${by + 4}" fill="#FFD93D"/>`;
  svg += `<line x1="${bx - 4}" y1="${by + 14}" x2="${bx - 6}" y2="${by + 20}" stroke="#FF8E53" stroke-width="2" stroke-linecap="round"/>`;
  svg += `<line x1="${bx + 4}" y1="${by + 14}" x2="${bx + 2}" y2="${by + 20}" stroke="#FF8E53" stroke-width="2" stroke-linecap="round"/></g>`;
  svg += `</svg>`;
  visualArea.innerHTML = svg;
  renderOptions(
    chosen.label,
    positions.map((p) => p.label).filter((l) => l !== chosen.label),
    optionsContainer
  );
}

// ---- C1. Monnaie ----
function genMonnaie(visualArea, questionText, optionsContainer) {
  const items = [];
  let total = 0;
  if (state.difficulty === 'easy') {
    for (let i = 0; i < getRandomInt(0, 2); i++) {
      items.push({ type: 'piece', val: 2 });
      total += 2;
    }
    for (let i = 0; i < getRandomInt(1, 3); i++) {
      items.push({ type: 'piece', val: 1 });
      total += 1;
    }
  } else if (state.difficulty === 'challenge') {
    for (let i = 0; i < getRandomInt(1, 3); i++) {
      items.push({ type: 'billet', val: 10 });
      total += 10;
    }
    for (let i = 0; i < getRandomInt(1, 2); i++) {
      items.push({ type: 'billet', val: 5 });
      total += 5;
    }
    for (let i = 0; i < getRandomInt(1, 3); i++) {
      items.push({ type: 'piece', val: 2 });
      total += 2;
    }
    for (let i = 0; i < getRandomInt(1, 3); i++) {
      items.push({ type: 'piece', val: 1 });
      total += 1;
    }
  } else {
    for (let i = 0; i < getRandomInt(0, 2); i++) {
      items.push({ type: 'billet', val: 10 });
      total += 10;
    }
    for (let i = 0; i < getRandomInt(0, 2); i++) {
      items.push({ type: 'billet', val: 5 });
      total += 5;
    }
    for (let i = 0; i < getRandomInt(0, 3); i++) {
      items.push({ type: 'piece', val: 2 });
      total += 2;
    }
    for (let i = 0; i < getRandomInt(1, 3); i++) {
      items.push({ type: 'piece', val: 1 });
      total += 1;
    }
  }
  if (total < 1) {
    items.push({ type: 'piece', val: 2 });
    total += 2;
  }
  state.currentAnswer = `${total} €`;
  state.currentQuestionKey =
    'mon_' +
    state.difficulty +
    '_' +
    items
      .map((i) => i.val)
      .sort()
      .join(',');
  questionText.innerText = "Combien d'argent y a-t-il dans le porte-monnaie ?";
  let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<path d="M40 180 C40 120 70 50 160 50 C250 50 280 120 280 180 Z" fill="#F5F3FF" stroke="#6C5DD3" stroke-width="4"/>`;
  svg += `<rect x="30" y="165" width="260" height="25" rx="10" fill="#6C5DD3"/><circle cx="160" cy="50" r="10" fill="#FFD93D" stroke="#E0BE2F" stroke-width="2"/>`;
  items.forEach((item, index) => {
    const row = Math.floor(index / 3),
      col = index % 3,
      x = 70 + col * 65 + row * 15,
      y = 80 + row * 38;
    if (item.type === 'billet') {
      svg += `<g class="animate-bounce-slow" style="animation-delay: ${index * 0.1}s">`;
      svg += `<rect x="${x}" y="${y}" width="55" height="32" rx="4" fill="${item.val === 10 ? '#FF6B8B' : '#4D96FF'}" stroke="${item.val === 10 ? '#E05270' : '#357AE8'}" stroke-width="2" transform="rotate(-5, ${x}, ${y})"/>`;
      svg += `<rect x="${x + 4}" y="${y + 4}" width="47" height="24" rx="2" fill="none" stroke="white" stroke-dasharray="2 1" opacity="0.6"/>`;
      svg += `<text x="${x + 27}" y="${y + 22}" font-family="Fredoka" font-weight="bold" font-size="14" fill="white" text-anchor="middle">${item.val}€</text></g>`;
    } else {
      svg += `<g class="animate-bounce-slow" style="animation-delay: ${index * 0.1}s">`;
      svg += `<circle cx="${x + 20}" cy="${y + 15}" r="${item.val === 2 ? 14 : 11}" fill="${item.val === 2 ? '#D8A020' : '#CCCCCC'}" stroke="#94A3B8" stroke-width="1"/>`;
      svg += `<circle cx="${x + 20}" cy="${y + 15}" r="${(item.val === 2 ? 14 : 11) - 3}" fill="${item.val === 2 ? '#E6E6E6' : '#EAA020'}"/>`;
      svg += `<text x="${x + 20}" y="${y + 19}" font-family="Fredoka" font-size="10" font-weight="black" fill="#1E293B" text-anchor="middle">${item.val}</text></g>`;
    }
  });
  svg += `</svg>`;
  visualArea.innerHTML = svg;
  renderOptions(
    `${total} €`,
    getDistractors(total, 3, 1, 60).map((v) => `${v} €`),
    optionsContainer
  );
}

// ---- C2. Heure ----
function genHeure(visualArea, questionText, optionsContainer) {
  function getHeureText(h, min) {
    if (min === 30) return `${h} heures et demie`;
    if (min === 15) return `${h} heures et quart`;
    if (min === 45) {
      const nh = h === 12 ? 1 : h + 1;
      return `${nh} heures moins le quart`;
    }
    return `${h} heures`;
  }
  let hour = getRandomInt(1, 12),
    min = 0;
  if (state.difficulty === 'easy') min = 0;
  else if (state.difficulty === 'challenge')
    min = [0, 15, 30, 45][getRandomInt(0, 3)];
  else min = [0, 30][getRandomInt(0, 1)];
  const correctText = getHeureText(hour, min);
  state.currentAnswer = correctText;
  state.currentQuestionKey = 'heure_' + hour + '_' + min;
  questionText.innerText = 'Quelle heure indique cette horloge ?';
  let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">`;
  const cx = 120,
    cy = 120,
    r = 90;
  svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="white" stroke="#6C5DD3" stroke-width="8"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="${r - 6}" fill="none" stroke="#F5F3FF" stroke-width="4"/>`;
  for (let h = 1; h <= 12; h++) {
    const angle = (h * 30 * Math.PI) / 180;
    svg += `<text x="${cx + (r - 20) * Math.sin(angle)}" y="${cy - (r - 20) * Math.cos(angle) + 5}" font-family="Fredoka" font-weight="bold" font-size="14" fill="#334155" text-anchor="middle">${h}</text>`;
  }
  for (let m = 0; m < 60; m += 5) {
    if (m % 15 !== 0) {
      const angle = (m * 6 * Math.PI) / 180;
      svg += `<line x1="${cx + (r - 8) * Math.sin(angle)}" y1="${cy - (r - 8) * Math.cos(angle)}" x2="${cx + (r - 4) * Math.sin(angle)}" y2="${cy - (r - 4) * Math.cos(angle)}" stroke="#CBD5E1" stroke-width="2"/>`;
    }
  }
  const mAngle = (min * 6 * Math.PI) / 180;
  const mx = cx + 68 * Math.sin(mAngle),
    my = cy - 68 * Math.cos(mAngle);
  svg += `<line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="#4D96FF" stroke-width="5" stroke-linecap="round"/>`;
  const hAngle = ((hour + min / 60) * 30 * Math.PI) / 180;
  const hx = cx + 45 * Math.sin(hAngle),
    hy = cy - 45 * Math.cos(hAngle);
  svg += `<line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#FF6B8B" stroke-width="7" stroke-linecap="round"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="6" fill="#1E293B"/><circle cx="${cx}" cy="${cy}" r="2" fill="white"/>`;
  svg += `</svg>`;
  visualArea.innerHTML = svg;
  const choicesSet = new Set([correctText]);
  while (choicesSet.size < 4) {
    const dh = getRandomInt(1, 12);
    let dmin = 0;
    if (state.difficulty === 'easy') dmin = 0;
    else if (state.difficulty === 'challenge')
      dmin = [0, 15, 30, 45][getRandomInt(0, 3)];
    else dmin = [0, 30][getRandomInt(0, 1)];
    choicesSet.add(getHeureText(dh, dmin));
  }
  renderOptions(
    correctText,
    Array.from(choicesSet).filter((t) => t !== correctText),
    optionsContainer
  );
}

// ---- C3. Mesures ----
function genMesures(visualArea, questionText, optionsContainer) {
  let length =
    state.difficulty === 'easy' ? getRandomInt(3, 7) : getRandomInt(3, 11);
  state.currentAnswer = `${length} cm`;
  state.currentQuestionKey = 'mes_' + state.difficulty + '_' + length;
  questionText.innerText = 'Combien mesure ce crayon de couleur ?';
  let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
  const rulerX = 20,
    rulerY = 110,
    rulerW = 280,
    rulerH = 40;
  svg += `<rect x="${rulerX}" y="${rulerY}" width="${rulerW}" height="${rulerH}" rx="4" fill="#FEF08A" stroke="#EAB308" stroke-width="3"/>`;
  const pxPerCm = rulerW / 12;
  for (let i = 0; i <= 12; i++) {
    const x = rulerX + i * pxPerCm;
    svg += `<line x1="${x}" y1="${rulerY}" x2="${x}" y2="${rulerY + 15}" stroke="#CA8A04" stroke-width="2"/>`;
    svg += `<text x="${x}" y="${rulerY + 30}" font-family="Fredoka" font-size="10" font-weight="bold" fill="#854D0E" text-anchor="middle">${i}</text>`;
    if (i < 12) {
      const hx = x + pxPerCm / 2;
      svg += `<line x1="${hx}" y1="${rulerY}" x2="${hx}" y2="${rulerY + 9}" stroke="#CA8A04" stroke-width="1.5"/>`;
    }
  }
  const crayonY = 60,
    crayonH = 20,
    crayonW = length * pxPerCm;
  svg += `<g class="animate-bounce-soft">`;
  svg += `<rect x="${rulerX}" y="${crayonY}" width="${crayonW - 15}" height="${crayonH}" fill="#FF6B8B" stroke="#E05270" stroke-width="2"/>`;
  svg += `<rect x="${rulerX}" y="${crayonY}" width="${crayonW - 15}" height="${crayonH / 2}" fill="#FF8EA5" opacity="0.4"/>`;
  const tipStartX = rulerX + crayonW - 15,
    tipMidY = crayonY + crayonH / 2;
  svg += `<polygon points="${tipStartX},${crayonY} ${rulerX + crayonW},${tipMidY} ${tipStartX},${crayonY + crayonH}" fill="#FED7AA" stroke="#E05270" stroke-width="2"/>`;
  svg += `<polygon points="${tipStartX + 10},${crayonY + 6} ${rulerX + crayonW},${tipMidY} ${tipStartX + 10},${crayonY + crayonH - 6}" fill="#FF6B8B"/>`;
  svg += `<rect x="${rulerX - 8}" y="${crayonY}" width="8" height="${crayonH}" fill="#E2E8F0" stroke="#E05270" stroke-width="2" rx="1"/>`;
  svg += `<rect x="${rulerX - 4}" y="${crayonY}" width="4" height="${crayonH}" fill="#FFB6C1"/></g></svg>`;
  visualArea.innerHTML = svg;
  renderOptions(
    `${length} cm`,
    getDistractors(length, 3, 2, 12).map((v) => `${v} cm`),
    optionsContainer
  );
}

// ---- A6. Fractions ----
function genFractions(visualArea, questionText, optionsContainer) {
  let d = state.difficulty === 'easy' ? 2 : [2, 3, 4][getRandomInt(0, 2)];
  const n = getRandomInt(1, d - 1);
  state.currentAnswer = `${n}/${d}`;
  state.currentQuestionKey = 'frac_' + state.difficulty + '_' + n + '_' + d;
  questionText.innerText = 'Quelle fraction de cette barre est coloriée ?';
  let svg = `<svg class="w-full h-full max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
  const width = 240,
    height = 60,
    startX = 40,
    startY = 70,
    blockW = width / d;
  for (let i = 0; i < d; i++) {
    const bx = startX + i * blockW,
      isColored = i < n;
    svg += `<rect x="${bx}" y="${startY}" width="${blockW}" height="${height}" fill="${isColored ? '#6C5DD3' : '#F8FAFC'}" stroke="#5646B8" stroke-width="4"/>`;
    svg += `<rect x="${bx + 4}" y="${startY + 4}" width="${blockW - 8}" height="${height - 8}" fill="none" stroke="${isColored ? '#8A7CE0' : '#E2E8F0'}" stroke-width="2" rx="4"/>`;
  }
  svg += `</svg>`;
  visualArea.innerHTML = svg;
  const allFractions = ['1/2', '1/3', '2/3', '1/4', '2/4', '3/4'];
  renderOptions(
    `${n}/${d}`,
    allFractions.filter((f) => f !== `${n}/${d}`).slice(0, 3),
    optionsContainer
  );
}

// =============================================
// INTERACTIVE GAMES
// =============================================

// ---- Interactive Fraction Coloring ----
function genFractionsInteract(visualArea, questionText, optionsContainer) {
  stateMod.setTargetFractionDenominator([2, 3, 4][getRandomInt(0, 2)]);
  stateMod.setTargetFractionNumerator(
    getRandomInt(1, stateMod.targetFractionDenominator - 1)
  );
  state.currentAnswer = `${stateMod.targetFractionNumerator}/${stateMod.targetFractionDenominator}`;
  state.currentQuestionKey =
    'fint_' +
    stateMod.targetFractionNumerator +
    '_' +
    stateMod.targetFractionDenominator;
  stateMod.setUserFractionSelected(
    Array(stateMod.targetFractionDenominator).fill(false)
  );
  questionText.innerText = `Colorie la fraction ${state.currentAnswer} de cette barre :`;
  renderFractionsInteractSVG(visualArea);
  optionsContainer.innerHTML = `<button onclick="window.validateInteractiveFraction()" class="w-full min-h-[64px] bg-brand-green hover:bg-brand-green-dark text-white font-title text-xl font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95">Valider ma réponse</button>`;
}

function renderFractionsInteractSVG(visualArea) {
  let svg = `<svg class="w-full h-full max-h-[200px] md:max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
  const width = 240,
    height = 60,
    startX = 40,
    startY = 70,
    blockW = width / stateMod.targetFractionDenominator;
  for (let i = 0; i < stateMod.targetFractionDenominator; i++) {
    const bx = startX + i * blockW,
      isColored = stateMod.userFractionSelected[i];
    svg += `<rect x="${bx}" y="${startY}" width="${blockW}" height="${height}" fill="${isColored ? '#6C5DD3' : '#F8FAFC'}" stroke="#5646B8" stroke-width="4" cursor="pointer" onclick="window.toggleFractionBlock(${i})"/>`;
    svg += `<rect x="${bx + 4}" y="${startY + 4}" width="${blockW - 8}" height="${height - 8}" fill="none" stroke="${isColored ? '#8A7CE0' : '#E2E8F0'}" stroke-width="2" rx="4" pointer-events="none"/>`;
  }
  svg += `</svg>`;
  visualArea.innerHTML = svg;
}

export function toggleFractionBlock(index) {
  playAudioTone('click');
  stateMod.userFractionSelected[index] = !stateMod.userFractionSelected[index];
  renderFractionsInteractSVG(document.getElementById('game-visual-area'));
}

export function validateInteractiveFraction() {
  const coloredCount = stateMod.userFractionSelected.filter(Boolean).length;
  const userAns = `${coloredCount}/${stateMod.targetFractionDenominator}`;
  const valBtn = document.querySelector('#game-options-container button');
  checkAnswer(userAns, valBtn);
}

// ---- Interactive Base-Ten Blocks ----
function genBlocsDizaines(visualArea, questionText, optionsContainer) {
  stateMod.setTargetNumber(getRandomInt(11, 49));
  state.currentAnswer = stateMod.targetNumber;
  state.currentQuestionKey = 'bloc_' + stateMod.targetNumber;
  stateMod.setUserTens(0);
  stateMod.setUserUnits(0);
  questionText.innerText = `Représente le nombre ${stateMod.targetNumber} en plaçant des dizaines (10) et des unités (1) :`;
  renderBlocsDizainesSVG(visualArea);
  optionsContainer.innerHTML = `
    <div class="grid grid-cols-2 gap-3 mb-3 font-title">
      <button onclick="window.addBaseTen(10)" class="py-3 bg-brand-purple-light hover:bg-brand-purple/20 text-brand-purple font-bold border-2 border-brand-purple/30 rounded-2xl transition-all active:scale-95 flex flex-col items-center">
        <span class="text-2xl">⚡</span><span class="text-xs">+10 (Dizaine)</span>
      </button>
      <button onclick="window.addBaseTen(1)" class="py-3 bg-brand-blue-light hover:bg-brand-blue/20 text-brand-blue font-bold border-2 border-brand-blue/30 rounded-2xl transition-all active:scale-95 flex flex-col items-center">
        <span class="text-2xl">🧊</span><span class="text-xs">+1 (Unité)</span>
      </button>
    </div>
    <div class="flex gap-3 font-title">
      <button onclick="window.resetBaseTen()" class="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-4 rounded-2xl transition-all active:scale-95">Effacer</button>
      <button onclick="window.validateBaseTen()" class="w-2/3 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-md">Valider</button>
    </div>`;
}

function renderBlocsDizainesSVG(visualArea) {
  let svg = `<svg class="w-full h-full max-h-[200px] md:max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<text x="60" y="30" font-family="Fredoka" font-size="14" font-weight="bold" fill="#6C5DD3" text-anchor="middle">Dizaines : ${stateMod.userTens}</text>`;
  svg += `<text x="220" y="30" font-family="Fredoka" font-size="14" font-weight="bold" fill="#4D96FF" text-anchor="middle">Unités : ${stateMod.userUnits}</text>`;
  svg += `<line x1="160" y1="10" x2="160" y2="190" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="4 4"/>`;
  const tenStartX = 20;
  for (let t = 0; t < stateMod.userTens; t++) {
    const sx = tenStartX + t * 24;
    for (let b = 0; b < 10; b++)
      svg += `<rect x="${sx}" y="${160 - b * 13}" width="16" height="11" fill="#CBBFEF" stroke="#6C5DD3" stroke-width="1.5" rx="1"/>`;
  }
  const unitStartX = 180;
  for (let u = 0; u < stateMod.userUnits; u++) {
    const col = u % 4,
      row = Math.floor(u / 4),
      ux = unitStartX + col * 28,
      uy = 150 - row * 28;
    svg += `<rect x="${ux}" y="${uy}" width="20" height="20" fill="#DDEBFF" stroke="#4D96FF" stroke-width="2" rx="2"/>`;
    svg += `<rect x="${ux + 3}" y="${uy + 3}" width="6" height="6" fill="white" opacity="0.6"/>`;
  }
  svg += `</svg>`;
  visualArea.innerHTML = svg;
}

// ---- Logic: Sequences ----
function genSequences(visualArea, questionText, optionsContainer) {
  const families = [
    { type: 'numbers', label: 'chiffres' },
    { type: 'shapes', label: 'formes' },
    { type: 'animals', label: 'animaux' },
  ];
  const family = families[getRandomInt(0, families.length - 1)];
  const items = generateSequenceFamily(family.type, 6);
  const missingIndex = getRandomInt(2, 4);
  const answer = items[missingIndex];
  items[missingIndex] = '?';

  state.currentAnswer = `${answer}`;
  state.currentQuestionKey = `seq_${family.type}_${items.join('-')}`;
  questionText.innerText = `Trouve l’élément manquant dans cette séquence de ${family.label} :`;

  const svgItems = items
    .map((item, idx) => {
      const x = 45 + idx * 48;
      const y = 90;
      if (family.type === 'numbers') {
        return `<text x="${x}" y="${y + 10}" font-family="Fredoka" font-size="26" font-weight="bold" fill="${idx === missingIndex ? '#EF4444' : '#1f2937'}" text-anchor="middle">${item}</text>`;
      }
      if (family.type === 'shapes') {
        const shapeSvg =
          item === 'triangle'
            ? `<polygon points="${x},${y - 25} ${x - 20},${y + 25} ${x + 20},${y + 25}" fill="#FFD93D" stroke="#F59E0B" stroke-width="3" stroke-linejoin="round"/>`
            : item === 'square'
              ? `<rect x="${x - 20}" y="${y - 20}" width="40" height="40" fill="#FFD93D" stroke="#F59E0B" stroke-width="3" rx="4"/>`
              : `<circle cx="${x}" cy="${y}" r="20" fill="#FFD93D" stroke="#F59E0B" stroke-width="3"/>`;
        const q =
          idx === missingIndex
            ? `<text x="${x}" y="${y + 45}" font-family="Fredoka" font-size="22" font-weight="bold" fill="#EF4444" text-anchor="middle">?</text>`
            : '';
        return shapeSvg + q;
      }
      const emojiMap = {
        chat: '🐱',
        chien: '🐶',
        lapin: '🐰',
        lion: '🦁',
        oiseau: '🐦',
      };
      return `<text x="${x}" y="${y + 14}" font-size="34" text-anchor="middle">${emojiMap[item] || item}</text>`;
    })
    .join('');

  visualArea.innerHTML = `<svg class="w-full h-full max-h-[260px]" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">${svgItems}</svg>`;
  renderOptions(
    `${answer}`,
    generateSequenceDistractors(family.type, answer),
    optionsContainer
  );
}

function generateSequenceFamily(type, count) {
  if (type === 'numbers') {
    const start = getRandomInt(1, 6);
    const step = getRandomInt(1, 3);
    return Array.from({ length: count }, (_, i) => `${start + step * i}`);
  }
  if (type === 'shapes') {
    const all = ['triangle', 'square', 'circle'];
    const order = shuffleArray(all).slice(0, 2);
    return Array.from({ length: count }, (_, i) => order[i % order.length]);
  }
  const pool = ['chat', 'chien', 'lapin', 'lion', 'oiseau'];
  const chosen = shuffleArray(pool).slice(0, 3);
  return Array.from({ length: count }, (_, i) => chosen[i % chosen.length]);
}

function generateSequenceDistractors(type, answer) {
  const set = new Set();
  while (set.size < 3) {
    let d;
    if (type === 'numbers') d = `${parseInt(answer, 10) + getRandomInt(-3, 3)}`;
    else if (type === 'shapes')
      d = ['triangle', 'square', 'circle'][getRandomInt(0, 2)];
    else d = ['chat', 'chien', 'lapin', 'lion', 'oiseau'][getRandomInt(0, 4)];
    if (d !== answer) set.add(d);
  }
  return Array.from(set);
}

// ---- Logic: Analogies ----
function genAnalogies(visualArea, questionText, optionsContainer) {
  const analogies = [
    {
      left: ['🐔', 'œuf'],
      right: '🐣',
      answer: '🐣',
      distractorPool: ['🐤', '🦆', '🐓'],
    },
    {
      left: ['🌱', 'arbre'],
      right: 'fruit',
      answer: '🍎',
      distractorPool: ['🍌', '🍇', '🍉'],
    },
    {
      left: ['graine', 'fleur'],
      right: 'pétale',
      answer: '🌸',
      distractorPool: ['🌼', '🌷', '🌻'],
    },
    {
      left: ['nuage', 'pluie'],
      right: 'arc-en-ciel',
      answer: '🌈',
      distractorPool: ['⛈️', '❄️', '☀️'],
    },
    {
      left: ['abeille', 'miel'],
      right: 'rayon',
      answer: '🍯',
      distractorPool: ['🧈', '🍞', '🥖'],
    },
    {
      left: ['livre', 'page'],
      right: 'mot',
      answer: '📖',
      distractorPool: ['📕', '📘', '📗'],
    },
  ];
  const item = analogies[getRandomInt(0, analogies.length - 1)];
  state.currentAnswer = item.answer;
  state.currentQuestionKey = `analogie_${item.right}_${item.answer}`;
  questionText.innerText = `Quel élément complète cette analogie ? ${item.left[0]} est à ${item.left[1]} comme ${item.right} est à :`;

  visualArea.innerHTML = `<div class="flex flex-wrap items-center justify-center gap-4 bg-brand-pink-light/40 border-2 border-brand-pink/15 p-6 rounded-3xl shadow-sm w-full font-title">
    <div class="flex items-center gap-2 text-4xl">
      <span>${item.left[0]}</span>
      <span class="text-2xl text-slate-500">→</span>
      <span class="font-bold text-slate-700">${item.left[1]}</span>
    </div>
    <div class="flex items-center gap-2 text-4xl">
      <span>${item.right}</span>
      <span class="text-2xl text-slate-500">→</span>
      <span class="font-black text-brand-pink">?</span>
    </div>
  </div>`;

  renderOptions(
    item.answer,
    shuffleArray(item.distractorPool).slice(0, 3),
    optionsContainer
  );
}

export function addBaseTen(value) {
  playAudioTone('click');
  if (value === 10) {
    if (stateMod.userTens < 5) stateMod.setUserTens(stateMod.userTens + 1);
  } else {
    if (stateMod.userUnits < 15) stateMod.setUserUnits(stateMod.userUnits + 1);
  }
  renderBlocsDizainesSVG(document.getElementById('game-visual-area'));
}

export function resetBaseTen() {
  playAudioTone('click');
  stateMod.setUserTens(0);
  stateMod.setUserUnits(0);
  renderBlocsDizainesSVG(document.getElementById('game-visual-area'));
}

export function validateBaseTen() {
  const userVal = stateMod.userTens * 10 + stateMod.userUnits;
  const valBtn = document.querySelector(
    '#game-options-container button:last-child'
  );
  checkAnswer(userVal, valBtn);
}

// ---- Interactive Shape Picker ----
function genFormesTri(visualArea, questionText, optionsContainer) {
  const types = ['triangle', 'rectangle', 'cercle'];
  stateMod.setTargetShapeType(types[getRandomInt(0, 2)]);
  const shapeNamesFr = {
    triangle: 'triangles 🔺',
    rectangle: 'rectangles 🟦',
    cercle: 'cercles 🟡',
  };
  questionText.innerText = `Trouve et clique sur tous les ${shapeNamesFr[stateMod.targetShapeType]} dans le dessin :`;
  stateMod.setShapesArray([]);
  for (let i = 0; i < 6; i++) {
    let type = types[getRandomInt(0, 2)];
    if (i < 2) type = stateMod.targetShapeType;
    stateMod.shapesArray.push({
      id: i,
      type: type,
      selected: false,
      x: 0,
      y: 0,
    });
  }
  stateMod.setShapesArray(shuffleArray(stateMod.shapesArray));
  stateMod.shapesArray.forEach((shape, idx) => {
    shape.x = 55 + (idx % 3) * 95;
    shape.y = 55 + Math.floor(idx / 3) * 75;
  });
  state.currentAnswer = 'correct';
  state.currentQuestionKey =
    'form_' +
    stateMod.targetShapeType +
    '_' +
    stateMod.shapesArray.map((s) => s.type).join(',');
  renderFormesTriSVG(visualArea);
  optionsContainer.innerHTML = `<button onclick="window.validateFormesTri()" class="w-full min-h-[64px] bg-brand-green hover:bg-brand-green-dark text-white font-title text-xl font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95">Valider ma sélection</button>`;
}

function renderFormesTriSVG(visualArea) {
  let svg = `<svg class="w-full h-full max-h-[200px] md:max-h-[300px]" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">`;
  stateMod.shapesArray.forEach((shape) => {
    const fill = shape.selected ? '#FFEFEF' : '#F8FAFC';
    const stroke = shape.selected ? '#FF6B8B' : '#64748B';
    const strokeWidth = shape.selected ? 4 : 2;
    svg += `<g cursor="pointer" onclick="window.toggleShapeSelected(${shape.id})">`;
    if (shape.type === 'triangle')
      svg += `<polygon points="${shape.x + 30},${shape.y} ${shape.x},${shape.y + 50} ${shape.x + 60},${shape.y + 50}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
    else if (shape.type === 'rectangle')
      svg += `<rect x="${shape.x}" y="${shape.y + 5}" width="60" height="40" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" rx="4"/>`;
    else if (shape.type === 'cercle')
      svg += `<circle cx="${shape.x + 30}" cy="${shape.y + 25}" r="22" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
    svg += `</g>`;
  });
  svg += `</svg>`;
  visualArea.innerHTML = svg;
}

export function toggleShapeSelected(id) {
  playAudioTone('click');
  const shape = stateMod.shapesArray.find((s) => s.id === id);
  if (shape) shape.selected = !shape.selected;
  renderFormesTriSVG(document.getElementById('game-visual-area'));
}

export function validateFormesTri() {
  const allCorrectSelected = stateMod.shapesArray.every((shape) => {
    return shape.type === stateMod.targetShapeType
      ? shape.selected
      : !shape.selected;
  });
  const userAns = allCorrectSelected ? 'correct' : 'incorrect';
  const valBtn = document.querySelector('#game-options-container button');
  checkAnswer(userAns, valBtn);
}
