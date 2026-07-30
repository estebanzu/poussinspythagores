// =============================================
// UTILS — Pure helper functions
// =============================================

import { CATEGORIES, recentlySeen, RECENTLY_SEEN_SIZE } from './constants.js';

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getDistractors(correctAnswer, count, min = 0, max = 100) {
  const set = new Set();
  while (set.size < count) {
    let dist = correctAnswer + getRandomInt(-5, 5);
    if (dist === correctAnswer || dist < min || dist > max) {
      dist = getRandomInt(min, max);
    }
    if (dist !== correctAnswer) set.add(dist);
  }
  return Array.from(set);
}

export function markSeen(gameId, key) {
  if (!recentlySeen[gameId]) recentlySeen[gameId] = [];
  const arr = recentlySeen[gameId];
  const idx = arr.indexOf(key);
  if (idx !== -1) arr.splice(idx, 1);
  arr.push(key);
  if (arr.length > RECENTLY_SEEN_SIZE) arr.shift();
}

export function isRecentlySeen(gameId, key) {
  return recentlySeen[gameId] && recentlySeen[gameId].indexOf(key) !== -1;
}

export function clearRecentlySeen(gameId) {
  recentlySeen[gameId] = [];
}

export function getGameName(gameId) {
  if (gameId === 'a_fractions_interact') return "Colorier les Fractions";
  if (gameId === 'a_blocs_dizaines') return "Construire les Nombres";
  if (gameId === 'b_formes_tri') return "Trier les Formes";
  for (const cat in CATEGORIES) {
    const found = CATEGORIES[cat].games.find(g => g.id === gameId);
    if (found) return found.name;
  }
  return "Jeu";
}
