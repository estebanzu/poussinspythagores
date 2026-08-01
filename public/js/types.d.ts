/**
 * Shared types for the Poussins Pythagorés frontend modules.
 */

export type Difficulty = 'easy' | 'normal' | 'challenge';

export interface StreakState {
  current: number;
  best: number;
  lastPlayDate: string;
}

export interface MultiplayerPlayer {
  name: string;
  stars: number;
}

export interface MultiplayerState {
  isActive: boolean;
  player1: MultiplayerPlayer;
  player2: MultiplayerPlayer;
  currentPlayer: 1 | 2;
  currentTurn: number;
  maxTurns: number;
}

export interface QuestState {
  isActive: boolean;
  currentQuest: number | null;
  progress: number;
  currentSequenceIndex: number;
  consecutiveCorrect: number;
  materialEmoji: string;
  materialName: string;
  gameSequence: string[];
}

export interface AccessibilityState {
  autoplayVoice: boolean;
  highContrast: boolean;
}

export interface AdaptiveStatsEntry {
  correct: number;
  total: number;
  difficulty: Difficulty;
  recentTimes: number[];
}

export interface PlaytimeState {
  accumulated: number;
  lastActive: number;
  lockoutStart: number;
  sessionStart: number;
}

export interface CompanionData {
  type: string;
}

export interface ShapeItem {
  id: number;
  type: string;
  selected: boolean;
  x: number;
  y: number;
}

export interface AppState {
  stars: number;
  sessionStars: number;
  currentCategory: string | null;
  currentGame: string | null;
  currentAnswer: number | string | null;
  isMuted: boolean;
  isAnswerSelected: boolean;
  unlockedBadges: string[];
  consecutiveCorrect: number;
  consecutiveWrong: number;
  difficulty: Difficulty;
  questionCount: number;
  questionNumber: number;
  secondChancesLeft: number;
}

export interface GameStats {
  correct: number;
  total: number;
  difficulty: Difficulty;
  recentTimes: number[];
}
