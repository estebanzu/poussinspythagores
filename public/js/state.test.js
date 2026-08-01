import { describe, it, expect, beforeEach } from 'vitest';
import {
  state,
  userFractionSelected,
  targetNumber,
  targetShapeType,
  shapesArray,
  windowToastTimeout,
  questionTimeRemaining,
  currentSessionTotal,
  setQuestionTimeRemaining,
  setUserFractionSelected,
  setTargetNumber,
  setTargetShapeType,
  setShapesArray,
  setCurrentSessionTotal,
  setWindowToastTimeout,
} from './state.js';

beforeEach(() => {
  localStorage.clear();
});

describe('state', () => {
  it('initializes default state values', () => {
    expect(state.stars).toBeGreaterThanOrEqual(0);
    expect(state.difficulty).toBe('normal');
    expect(state.sessionStars).toBe(0);
    expect(state.isAnswerSelected).toBe(false);
  });

  it('setQuestionTimeRemaining updates timer state', () => {
    setQuestionTimeRemaining(7);
    expect(questionTimeRemaining).toBe(7);
  });

  it('setUserFractionSelected replaces selection', () => {
    setUserFractionSelected([1, 2]);
    expect(userFractionSelected).toEqual([1, 2]);
  });

  it('setTargetNumber updates interactive game target', () => {
    setTargetNumber(42);
    expect(targetNumber).toBe(42);
  });

  it('setTargetShapeType updates target shape', () => {
    setTargetShapeType('triangle');
    expect(targetShapeType).toBe('triangle');
  });

  it('setShapesArray replaces shape payload', () => {
    setShapesArray([{ id: 1 }, { id: 2 }]);
    expect(shapesArray).toHaveLength(2);
  });

  it('setCurrentSessionTotal updates session total', () => {
    setCurrentSessionTotal(3);
    expect(currentSessionTotal).toBe(3);
  });

  it('setWindowToastTimeout stores timeout id', () => {
    setWindowToastTimeout(123);
    expect(windowToastTimeout).toBe(123);
  });
});
