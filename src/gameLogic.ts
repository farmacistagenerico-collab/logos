import { LEVELS, TOTAL_WORDS } from './data';

export const STORAGE_KEY = 'logos-adventure-v1';

export interface SavedProgress {
  completedWordIds: string[];
  unlockedLevel: number;
  soundEnabled: boolean;
}

export const INITIAL_PROGRESS: SavedProgress = {
  completedWordIds: [],
  unlockedLevel: 0,
  soundEnabled: true,
};

export function shuffleLetters(
  letters: string[],
  random: () => number = Math.random,
): string[] {
  const result = [...letters];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function completeWord(progress: SavedProgress, wordId: string): SavedProgress {
  if (progress.completedWordIds.includes(wordId)) return progress;
  return {
    ...progress,
    completedWordIds: [...progress.completedWordIds, wordId],
  };
}

export function completeLevel(
  progress: SavedProgress,
  levelIndex: number,
): SavedProgress {
  return {
    ...progress,
    unlockedLevel: Math.max(
      progress.unlockedLevel,
      Math.min(levelIndex + 1, LEVELS.length - 1),
    ),
  };
}

export function loadProgress(): SavedProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;

    const parsed = JSON.parse(raw) as Partial<SavedProgress>;
    const validWordIds = new Set(
      LEVELS.flatMap((level) => level.words.map((word) => word.id)),
    );
    const completedWordIds = Array.isArray(parsed.completedWordIds)
      ? [...new Set(parsed.completedWordIds.filter((id) => validWordIds.has(id)))]
      : [];

    return {
      completedWordIds,
      unlockedLevel:
        typeof parsed.unlockedLevel === 'number'
          ? Math.max(0, Math.min(Math.floor(parsed.unlockedLevel), LEVELS.length - 1))
          : 0,
      soundEnabled: parsed.soundEnabled !== false,
    };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function progressPercentage(completedCount: number): number {
  return Math.round((completedCount / TOTAL_WORDS) * 100);
}
