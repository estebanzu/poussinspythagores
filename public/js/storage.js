// =============================================
// STORAGE — localStorage persistence & session tracking
// =============================================

import {
  state,
  adaptiveStats,
  totalSessionsPlayed,
  perfectSessions,
  sessionHistory,
  currentSessionGames,
  currentSessionCorrect,
  currentSessionTotal,
  currentSessionStart,
  setCurrentSessionTotal,
  setCurrentSessionCorrect,
  setTotalSessionsPlayed,
  setPerfectSessions,
  setCurrentSessionStart,
} from './state.js';

export function saveAdaptiveStats() {
  localStorage.setItem('mathscp_adaptive_stats', JSON.stringify(adaptiveStats));
}

export function getGameStats(gameId) {
  if (!adaptiveStats[gameId]) {
    adaptiveStats[gameId] = {
      total: 0,
      correct: 0,
      wrong: 0,
      difficulty: 'normal',
      recentTimes: [],
      streak: 0,
    };
  }
  return adaptiveStats[gameId];
}

export function recordAnswer(gameId, isCorrect, responseTimeMs) {
  const stats = getGameStats(gameId);
  stats.total++;
  if (isCorrect) {
    stats.correct++;
    stats.streak = Math.max(0, stats.streak) + 1;
  } else {
    stats.wrong++;
    stats.streak = Math.min(0, stats.streak) - 1;
  }
  stats.difficulty = state.difficulty;
  if (responseTimeMs != null) {
    stats.recentTimes.push(responseTimeMs);
    if (stats.recentTimes.length > 10) stats.recentTimes.shift();
  }
  saveAdaptiveStats();

  currentSessionGames.add(gameId);
  setCurrentSessionTotal(currentSessionTotal + 1);
  if (isCorrect) setCurrentSessionCorrect(currentSessionCorrect + 1);
}

export function getAccuracyRate(gameId) {
  const stats = getGameStats(gameId);
  if (stats.total === 0) return 0.5;
  return stats.correct / stats.total;
}

export function getAvgResponseTime(gameId) {
  const stats = getGameStats(gameId);
  if (stats.recentTimes.length === 0) return 15000;
  return (
    stats.recentTimes.reduce((a, b) => a + b, 0) / stats.recentTimes.length
  );
}

export function recordSession() {
  if (currentSessionTotal === 0) return;
  const entry = {
    date: new Date().toLocaleDateString('fr-FR'),
    games: [...currentSessionGames],
    accuracy: currentSessionCorrect / currentSessionTotal,
    timeMs: Date.now() - currentSessionStart,
    stars: state.sessionStars,
  };
  sessionHistory.unshift(entry);
  if (sessionHistory.length > 20) sessionHistory.length = 20;
  localStorage.setItem(
    'mathscp_session_history',
    JSON.stringify(sessionHistory)
  );

  setTotalSessionsPlayed(totalSessionsPlayed + 1);
  localStorage.setItem(
    'mathscp_total_sessions',
    totalSessionsPlayed.toString()
  );
  if (
    currentSessionCorrect === currentSessionTotal &&
    currentSessionTotal >= 5
  ) {
    setPerfectSessions(perfectSessions + 1);
    localStorage.setItem(
      'mathscp_perfect_sessions',
      perfectSessions.toString()
    );
  }
}

export function resetSessionTracking() {
  currentSessionGames.clear();
  setCurrentSessionCorrect(0);
  setCurrentSessionTotal(0);
  setCurrentSessionStart(Date.now());
}
