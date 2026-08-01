/**
 * Type declarations for public/js/utils.js
 */

export declare function getRandomInt(min: number, max: number): number;
export declare function shuffleArray<T>(array: T[]): T[];
export declare function getDistractors(
  correct: number,
  count: number,
  min: number,
  max: number
): number[];
export declare function markSeen(gameId: string, key: string): void;
export declare function isRecentlySeen(gameId: string, key: string): boolean;
export declare function clearRecentlySeen(gameId: string): void;
export declare function getGameName(gameId: string): string;
