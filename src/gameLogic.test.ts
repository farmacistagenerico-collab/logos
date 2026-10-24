import { describe, expect, it } from 'vitest';
import { ALPHABET } from './data';
import {
  INITIAL_PROGRESS,
  completeLevel,
  completeWord,
  progressPercentage,
  shuffleLetters,
} from './gameLogic';

describe('game progression', () => {
  it('keeps every letter when shuffling', () => {
    const shuffled = shuffleLetters(ALPHABET, () => 0.42);
    expect(shuffled).toHaveLength(ALPHABET.length);
    expect([...shuffled].sort()).toEqual([...ALPHABET].sort());
  });

  it('does not mutate the original alphabet', () => {
    const original = [...ALPHABET];
    shuffleLetters(ALPHABET);
    expect(ALPHABET).toEqual(original);
  });

  it('counts each completed word only once', () => {
    const once = completeWord(INITIAL_PROGRESS, 'casa');
    const twice = completeWord(once, 'casa');
    expect(twice.completedWordIds).toEqual(['casa']);
  });

  it('unlocks the next level without locking previous ones', () => {
    const progress = completeLevel(INITIAL_PROGRESS, 0);
    expect(progress.unlockedLevel).toBe(1);
    expect(completeLevel(progress, 0).unlockedLevel).toBe(1);
  });

  it('never unlocks beyond the last level', () => {
    expect(completeLevel(INITIAL_PROGRESS, 2).unlockedLevel).toBe(2);
  });

  it('calculates the adventure percentage', () => {
    expect(progressPercentage(0)).toBe(0);
    expect(progressPercentage(11)).toBe(100);
  });
});
