/**
 * Type declarations for public/js/constants.js
 */

export interface GameEntry {
  id: string;
  name: string;
  desc: string;
}

export interface CategoryDef {
  name: string;
  color: string;
  games: GameEntry[];
}

export interface CompanionStageDef {
  label: string;
  minStars: number;
}

export interface CompanionDef {
  name: string;
  emoji: string;
  color: string;
  colorHex: string;
  lightHex: string;
  desc: string;
  stages: (() => string)[];
}

export interface BadgeDef {
  id: string;
  name: string;
  desc: string;
  cond: Record<string, unknown>;
  svg: (locked: boolean) => string;
}

export declare const MATH_FACTS: string[];
export declare const SUCCESS_PHRASES: string[];
export declare const FAIL_PHRASES: string[];
export declare const CATEGORIES: Record<string, CategoryDef>;
export declare const COMPANION_STAGES: CompanionStageDef[];
export declare const COMPANIONS: Record<string, CompanionDef>;
export declare const FOOTER_PHRASES: Record<string, string[]>;
export declare const QUESTION_TIME_LIMIT: number;
export declare const PLAYTIME_LIMIT: number;
export declare const LOCKOUT_DURATION: number;
export declare const DECAY_BREAK_DURATION: number;
export declare const RECENTLY_SEEN_SIZE: number;
export declare const BADGES: BadgeDef[];
export declare let recentlySeen: Record<string, string[]>;
