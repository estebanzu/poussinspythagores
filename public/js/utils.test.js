import { describe, it, expect } from 'vitest';
import {
  getRandomInt,
  shuffleArray,
  getDistractors,
  markSeen,
  isRecentlySeen,
  clearRecentlySeen,
  getGameName,
} from './utils.js';

describe('utils', () => {
  it('getRandomInt returns values in range', () => {
    for (let i = 0; i < 100; i++) {
      const n = getRandomInt(3, 7);
      expect(n).toBeGreaterThanOrEqual(3);
      expect(n).toBeLessThanOrEqual(7);
      expect(Number.isInteger(n)).toBe(true);
    }
  });

  it('shuffleArray preserves length and elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled).toHaveLength(arr.length);
    expect(shuffled.sort()).toEqual(arr);
  });

  it('getDistractors does not include the correct answer', () => {
    const distractors = getDistractors(10, 3);
    expect(distractors).toHaveLength(3);
    expect(distractors).not.toContain(10);
  });

  it('recently seen helpers manage dedup state', () => {
    clearRecentlySeen('g1');
    expect(isRecentlySeen('g1', 'k1')).toBe(false);

    markSeen('g1', 'k1');
    expect(isRecentlySeen('g1', 'k1')).toBe(true);
    expect(isRecentlySeen('g1', 'k2')).toBe(false);

    markSeen('g1', 'k2');
    expect(isRecentlySeen('g1', 'k1')).toBe(true);
    expect(isRecentlySeen('g1', 'k2')).toBe(true);
  });

  it('getGameName maps known ids', () => {
    expect(getGameName('a_fractions_interact')).toBe('Colorier les Fractions');
    expect(getGameName('b_formes_tri')).toBe('Trier les Formes');
  });
});
