/**
 * Type declarations for public/js/state.js
 */

import type {
  AppState,
  StreakState,
  MultiplayerState,
  QuestState,
  AccessibilityState,
  AdaptiveStatsEntry,
  PlaytimeState,
  CompanionData,
  ShapeItem,
} from './types.js';

export declare let state: AppState;
export declare let streakState: StreakState;
export declare let shownFacts: string[];
export declare let multiplayerState: MultiplayerState;
export declare let questState: QuestState;
export declare let accessibilityState: AccessibilityState;
export declare let adaptiveStats: Record<string, AdaptiveStatsEntry>;
export declare let questionStartTime: number | null;
export declare let questionTimerInterval: number | null;
export declare let questionTimeRemaining: number;
export declare let totalSessionsPlayed: number;
export declare let perfectSessions: number;
export declare let totalTimePlayed: number;
export declare let sessionHistory: unknown[];
export declare let currentSessionGames: Set<string>;
export declare let currentSessionCorrect: number;
export declare let currentSessionTotal: number;
export declare let currentSessionStart: number;
export declare let playtimeState: PlaytimeState;
export declare let parentGateAnswer: { value: string | number | null };
export declare let parentGateMode: string;
export declare let companionData: CompanionData;
export declare let userFractionSelected: boolean[];
export declare let targetFractionNumerator: number;
export declare let targetFractionDenominator: number;
export declare let userTens: number;
export declare let userUnits: number;
export declare let targetNumber: number;
export declare let targetShapeType: string;
export declare let shapesArray: ShapeItem[];
export declare let windowToastTimeout: number | null;

export declare function setQuestionTimeRemaining(v: number): void;
export declare function setQuestionTimerInterval(v: number | null): void;
export declare function setQuestionStartTime(v: number | null): void;
export declare function setTargetFractionDenominator(v: number): void;
export declare function setTargetFractionNumerator(v: number): void;
export declare function setUserFractionSelected(v: boolean[]): void;
export declare function setTargetNumber(v: number): void;
export declare function setUserTens(v: number): void;
export declare function setUserUnits(v: number): void;
export declare function setTargetShapeType(v: string): void;
export declare function setShapesArray(v: ShapeItem[]): void;
export declare function setCurrentSessionTotal(v: number): void;
export declare function setCurrentSessionCorrect(v: number): void;
export declare function setTotalSessionsPlayed(v: number): void;
export declare function setPerfectSessions(v: number): void;
export declare function setCurrentSessionStart(v: number): void;
export declare function setWindowToastTimeout(v: number | null): void;
