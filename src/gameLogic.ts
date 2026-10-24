import { LEVELS, TOTAL_WORDS, type GuideMode } from './data';

export const STORAGE_KEY = 'logos-adventure-v2';
export const LEGACY_STORAGE_KEY = 'logos-adventure-v1';

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

export function getWordGuide(word: string, mode: GuideMode): string {
  if (!word || mode === 'none') return '';
  if (mode === 'full') return word;
  if (mode === 'first') return word[0] + '_'.repeat(word.length - 1);
  return word
    .split('')
    .map((letter, index) => (index % 2 === 0 ? letter : '_'))
    .join('');
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
    const currentSave = window.localStorage.getItem(STORAGE_KEY);
    const legacySave = currentSave === null
      ? window.localStorage.getItem(LEGACY_STORAGE_KEY)
      : null;
    const raw = currentSave ?? legacySave;
    if (!raw) return INITIAL_PROGRESS;

    const parsed = JSON.parse(raw) as Partial<SavedProgress>;
    const validWordIds = new Set(
      LEVELS.flatMap((level) => level.words.map((word) => word.id)),
    );
    const completedWordIds = Array.isArray(parsed.completedWordIds)
      ? [...new Set(parsed.completedWordIds.filter((id) => validWordIds.has(id)))]
      : [];
    const savedLevel = typeof parsed.unlockedLevel === 'number'
      ? Math.max(0, Math.min(Math.floor(parsed.unlockedLevel), LEVELS.length - 1))
      : 0;
    const isLegacySave = currentSave === null && legacySave !== null;

    return {
      completedWordIds,
      unlockedLevel: isLegacySave
        ? Math.min(savedLevel + 1, LEVELS.length - 1)
        : savedLevel,
      soundEnabled: parsed.soundEnabled !== false,
    };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function progressPercentage(completedCount: number): number {
  return Math.round((completedCount / TOTAL_WORDS) * 100);
}
