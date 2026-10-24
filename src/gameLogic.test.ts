import { describe, expect, it } from 'vitest';
import { ALPHABET, LEVELS, TOTAL_WORDS } from './data';
import {
  INITIAL_PROGRESS,
  completeLevel,
  completeWord,
  getWordGuide,
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
    const lastLevel = LEVELS.length - 1;
    expect(completeLevel(INITIAL_PROGRESS, lastLevel).unlockedLevel).toBe(lastLevel);
  });

  it('calculates the adventure percentage', () => {
    expect(progressPercentage(0)).toBe(0);
    expect(progressPercentage(TOTAL_WORDS)).toBe(100);
  });
});

describe('progressive word guides', () => {
  it('shows the whole word at level 0', () => {
    expect(getWordGuide('CASA', 'full')).toBe('CASA');
  });

  it('hides alternating letters at level 1', () => {
    expect(getWordGuide('CASA', 'half')).toBe('C_S_');
    expect(getWordGuide('GATTO', 'half')).toBe('G_T_O');
  });

  it('shows only the first letter at level 2', () => {
    expect(getWordGuide('FIORE', 'first')).toBe('F____');
  });

  it('hides the whole guide at level 3', () => {
    expect(getWordGuide('TARTARUGA', 'none')).toBe('');
  });
});
