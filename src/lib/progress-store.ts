// Simple progress storage using localStorage
// In a real app, this would be backed by a database

export interface UserProgress {
  xp: number;
  completedWords: string[];
  completedSentences: string[];
  completedQuizzes: string[];
  currentLevel: number;
  streak: number;
  lastActive: string;
}

const STORAGE_KEY = 'deutschlernen-progress';

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return {
      xp: 0,
      completedWords: [],
      completedSentences: [],
      completedQuizzes: [],
      currentLevel: 1,
      streak: 0,
      lastActive: new Date().toISOString(),
    };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading progress:', e);
  }
  
  return {
    xp: 0,
    completedWords: [],
    completedSentences: [],
    completedQuizzes: [],
    currentLevel: 1,
    streak: 0,
    lastActive: new Date().toISOString(),
  };
}

export function saveProgress(progress: Partial<UserProgress>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const current = getProgress();
    const updated = { ...current, ...progress };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
}

export function addXP(amount: number): void {
  const progress = getProgress();
  saveProgress({ xp: progress.xp + amount });
}

export function markSentenceComplete(sentenceId: string): void {
  const progress = getProgress();
  if (!progress.completedSentences.includes(sentenceId)) {
    saveProgress({
      completedSentences: [...progress.completedSentences, sentenceId],
    });
  }
}

export function markQuizComplete(quizId: string): void {
  const progress = getProgress();
  if (!progress.completedQuizzes.includes(quizId)) {
    saveProgress({
      completedQuizzes: [...progress.completedQuizzes, quizId],
    });
  }
}

export function isSentenceCompleted(sentenceId: string): boolean {
  const progress = getProgress();
  return progress.completedSentences.includes(sentenceId);
}

export function isQuizCompleted(quizId: string): boolean {
  const progress = getProgress();
  return progress.completedQuizzes.includes(quizId);
}

export function getCompletedCount(): {
  words: number;
  sentences: number;
  quizzes: number;
} {
  const progress = getProgress();
  return {
    words: progress.completedWords.length,
    sentences: progress.completedSentences.length,
    quizzes: progress.completedQuizzes.length,
  };
}

// Get next uncompleted sentence
export function getNextSentence(exercises: { id: string }[]): { id: string } | null {
  const progress = getProgress();
  const uncompleted = exercises.filter(e => !progress.completedSentences.includes(e.id));
  if (uncompleted.length === 0) return null;
  return uncompleted[0];
}

// Get random uncompleted sentences
export function getRandomUncompletedSentences(exercises: { id: string }[], count: number): { id: string }[] {
  const progress = getProgress();
  const uncompleted = exercises.filter(e => !progress.completedSentences.includes(e.id));
  if (uncompleted.length === 0) return [];
  
  // Shuffle and return requested count
  const shuffled = [...uncompleted].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
