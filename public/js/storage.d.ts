/**
 * Type declarations for public/js/storage.js
 */

import type { GameStats } from './types.js';

export declare function getGameStats(gameId: string): GameStats;
export declare function getAvgResponseTime(gameId: string): number;
export declare function recordAnswer(
  gameId: string,
  correct: boolean,
  elapsedMs: number | null
): void;
export declare function recordSession(): void;
