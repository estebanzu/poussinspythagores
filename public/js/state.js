// =============================================
// STATE — All mutable application state
// =============================================

export let state = {
  stars: parseInt(localStorage.getItem('mathscp_stars') || '0'),
  sessionStars: 0,
  currentCategory: null,
  currentGame: null,
  currentAnswer: null,
  isMuted: localStorage.getItem('mathscp_muted') === 'true',
  isAnswerSelected: false,
  unlockedBadges: JSON.parse(localStorage.getItem('mathscp_unlocked_badges') || '[]'),
  consecutiveCorrect: 0,
  consecutiveWrong: 0,
  difficulty: 'normal',
  questionCount: parseInt(localStorage.getItem('mathscp_question_count') || '10'),
  questionNumber: 0,
  secondChancesLeft: 0,
};

export let streakState = {
  current: parseInt(localStorage.getItem('mathscp_streak_current') || '0'),
  best: parseInt(localStorage.getItem('mathscp_streak_best') || '0'),
  lastPlayDate: localStorage.getItem('mathscp_streak_last_date') || '',
};

export let shownFacts = JSON.parse(localStorage.getItem('mathscp_shown_facts') || '[]');

export let multiplayerState = {
  isActive: false,
  player1: { name: "Joueur 1", stars: 0 },
  player2: { name: "Joueur 2", stars: 0 },
  currentPlayer: 1,
  currentTurn: 1,
  maxTurns: 10,
};

export let questState = {
  isActive: false,
  currentQuest: null,
  progress: 0,
  currentSequenceIndex: 0,
  consecutiveCorrect: 0,
  materialEmoji: "",
  materialName: "",
  gameSequence: [],
};

export let accessibilityState = {
  autoplayVoice: localStorage.getItem('mathscp_autoplay_voice') === 'true',
  highContrast: localStorage.getItem('mathscp_high_contrast') === 'true',
};

export let adaptiveStats = JSON.parse(localStorage.getItem('mathscp_adaptive_stats') || '{}');

export let questionStartTime = null;
export let questionTimerInterval = null;
export let questionTimeRemaining = 15;

export let totalSessionsPlayed = parseInt(localStorage.getItem('mathscp_total_sessions') || '0');
export let perfectSessions = parseInt(localStorage.getItem('mathscp_perfect_sessions') || '0');
export let totalTimePlayed = parseInt(localStorage.getItem('mathscp_playtime_accumulated') || '0');

export let sessionHistory = JSON.parse(localStorage.getItem('mathscp_session_history') || '[]');
export let currentSessionGames = new Set();
export let currentSessionCorrect = 0;
export let currentSessionTotal = 0;
export let currentSessionStart = Date.now();

export let cachedFrenchVoice = null;

export let playtimeState = {
  accumulated: parseInt(localStorage.getItem('mathscp_playtime_accumulated') || '0'),
  lastActive: parseInt(localStorage.getItem('mathscp_last_active_time') || '0'),
  lockoutStart: parseInt(localStorage.getItem('mathscp_lockout_start_time') || '0'),
  sessionStart: Date.now(),
};

export let parentGateAnswer = { value: null };
export let parentGateMode = 'lockout';

export let companionData = JSON.parse(localStorage.getItem('mathscp_companion') || '{"type":"owl"}');

// Interactive fraction game state
export let userFractionSelected = [];
export let targetFractionNumerator = 0;
export let targetFractionDenominator = 0;

// Interactive base-ten blocks game state
export let userTens = 0;
export let userUnits = 0;
export let targetNumber = 0;

// Interactive shape picker game state
export let targetShapeType = "";
export let shapesArray = [];

export let windowToastTimeout = null;
