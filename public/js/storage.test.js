import { describe, it, expect, beforeEach } from 'vitest';
import {
  getGameStats,
  recordAnswer,
  getAccuracyRate,
  getAvgResponseTime,
  recordSession,
  resetSessionTracking,
} from './storage.js';
import {
  setCurrentSessionTotal,
  setCurrentSessionCorrect,
  setCurrentSessionStart,
} from './state.js';

beforeEach(() => {
  localStorage.clear();
  setCurrentSessionTotal(0);
  setCurrentSessionCorrect(0);
  setCurrentSessionStart(Date.now());
});

describe('storage', () => {
  it('getGameStats initializes missing entries', () => {
    const stats = getGameStats('game_a');
    expect(stats.total).toBe(0);
    expect(stats.correct).toBe(0);
    expect(stats.difficulty).toBe('normal');
  });

  it('recordAnswer updates stats and persists', () => {
    recordAnswer('game_a', true, 1000);
    const stats = getGameStats('game_a');
    expect(stats.total).toBe(1);
    expect(stats.correct).toBe(1);
    expect(stats.wrong).toBe(0);
    expect(stats.recentTimes).toEqual([1000]);
    expect(stats.difficulty).toBe('normal');

    const raw = localStorage.getItem('mathscp_adaptive_stats');
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw).game_a.total).toBe(1);
  });

  it('recordAnswer records wrong answers and trims times', () => {
    const times = Array.from({ length: 12 }, (_, i) => (i + 1) * 1000);
    times.forEach((ms) => recordAnswer('game_b', false, ms));

    const stats = getGameStats('game_b');
    expect(stats.total).toBe(12);
    expect(stats.correct).toBe(0);
    expect(stats.wrong).toBe(12);
    expect(stats.recentTimes).toHaveLength(10);
  });

  it('getAccuracyRate returns sensible defaults', () => {
    expect(getAccuracyRate('missing')).toBe(0.5);
    recordAnswer('game_c', true, 100);
    expect(getAccuracyRate('game_c')).toBe(1);
  });

  it('getAvgResponseTime returns default for empty and average otherwise', () => {
    expect(getAvgResponseTime('missing')).toBe(15000);

    recordAnswer('game_d', true, 2000);
    recordAnswer('game_d', true, 4000);
    expect(getAvgResponseTime('game_d')).toBe(3000);
  });

  it('recordSession stores session history when there is activity', () => {
    localStorage.clear();
    resetSessionTracking();

    const emptyRaw = localStorage.getItem('mathscp_session_history');
    expect(emptyRaw).toBeNull();

    recordSession();
    const stillEmpty = localStorage.getItem('mathscp_session_history');
    expect(stillEmpty).toBeNull();

    const originalNow = Date.now;
    Date.now = () => 1700000000000;

    recordAnswer('game_e', true, 500);
    recordSession();

    const history = JSON.parse(
      localStorage.getItem('mathscp_session_history') || '[]'
    );
    expect(history).toHaveLength(1);
    expect(history[0].games).toEqual(['game_e']);

    Date.now = originalNow;
  });

  it('resetSessionTracking clears current session counters', () => {
    recordAnswer('game_f', true, 100);
    resetSessionTracking();
    const fresh = getGameStats('game_f');
    expect(fresh.total).toBe(1);
    expect(fresh.recentTimes).toEqual([100]);
  });
});
