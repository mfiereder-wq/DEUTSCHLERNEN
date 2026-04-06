// Smart Content Generator - Rotates vocabulary and generates dynamic learning content
import { 
  ExtendedVocabWord, 
  getDailyNewWords, 
  getWordsForDay, 
  shuffleArray,
  DAILY_THEMES,
  getRandomWordsForQuiz
} from '@/data/extended-vocabulary';

// Storage keys
const LAST_VISIT_KEY = 'deutschelastVisited';
const DAILY_WORDS_KEY = 'deutscheDailyWords';
const LEARNED_WORDS_KEY = 'deutschLearnedWords';
const STREAK_KEY = 'deutschStreak';
const ROTATION_INDEX_KEY = 'deutschRotationIndex';

// Check if it's a new day
export function isNewDay(): boolean {
  if (typeof window === 'undefined') return false;
  
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
  if (!lastVisit) return true;
  
  const lastVisitDate = new Date(lastVisit);
  const today = new Date();
  
  return lastVisitDate.toDateString() !== today.toDateString();
}

// Get user's streak
export function getStreak(): number {
  if (typeof window === 'undefined') return 0;
  
  const streakData = localStorage.getItem(STREAK_KEY);
  if (!streakData) return 0;
  
  const { streak, lastActiveDate } = JSON.parse(streakData);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  // If last active was yesterday or today, maintain streak
  if (new Date(lastActiveDate).toDateString() === yesterday.toDateString() ||
      new Date(lastActiveDate).toDateString() === new Date().toDateString()) {
    return streak;
  }
  
  return 0;
}

// Update streak
export function updateStreak(): number {
  if (typeof window === 'undefined') return 0;
  
  const currentStreak = getStreak();
  const streakData = localStorage.getItem(STREAK_KEY);
  const parsed = streakData ? JSON.parse(streakData) : { streak: 0, lastActiveDate: null };
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  let newStreak = currentStreak;
  
  if (isNewDay()) {
    if (parsed.lastActiveDate === yesterday.toISOString()) {
      newStreak = currentStreak + 1;
    } else {
      newStreak = 1;
    }
  }
  
  localStorage.setItem(STREAK_KEY, JSON.stringify({
    streak: newStreak,
    lastActiveDate: new Date().toISOString()
  }));
  
  return newStreak;
}

// Mark words as learned
export function markWordsAsLearned(wordIds: string[]): void {
  if (typeof window === 'undefined') return;
  
  const learned = getLearnedWordIds();
  const newLearned = [...new Set([...learned, ...wordIds])];
  localStorage.setItem(LEARNED_WORDS_KEY, JSON.stringify(newLearned));
}

// Get learned word IDs
export function getLearnedWordIds(): string[] {
  if (typeof window === 'undefined') return [];
  
  const learned = localStorage.getItem(LEARNED_WORDS_KEY);
  return learned ? JSON.parse(learned) : [];
}

// Get current rotation index (for cycling through words)
export function getRotationIndex(): number {
  if (typeof window === 'undefined') return 0;
  
  const index = localStorage.getItem(ROTATION_INDEX_KEY);
  return index ? parseInt(index, 10) : 0;
}

// Increment rotation index
function incrementRotationIndex(): void {
  if (typeof window === 'undefined') return;
  
  const currentIndex = getRotationIndex();
  localStorage.setItem(ROTATION_INDEX_KEY, String((currentIndex + 1) % 7));
}

// Get daily discovery words (with New badge)
export function getDailyDiscovery(userLevel: number = 1): ExtendedVocabWord[] {
  if (typeof window === 'undefined') return [];
  
  const today = new Date();
  const isNew = isNewDay();
  
  // Check if we already generated today's words
  const cachedDaily = localStorage.getItem(DAILY_WORDS_KEY);
  if (cachedDaily) {
    const { date, words, shown } = JSON.parse(cachedDaily);
    
    // If it's still the same day, return cached words (mark as shown)
    if (new Date(date).toDateString() === today.toDateString()) {
      // Update last visit
      localStorage.setItem(LAST_VISIT_KEY, today.toISOString());
      
      // Mark first 2 words as new since they're fresh for the day
      return words.map((w: ExtendedVocabWord, i: number) => ({
        ...w,
        isNew: i < 2 && !shown
      }));
    }
  }
  
  // Generate new daily words
  const learnedIds = getLearnedWordIds();
  const dailyWords = getDailyNewWords(userLevel, learnedIds, today);
  
  // Cache for today
  localStorage.setItem(DAILY_WORDS_KEY, JSON.stringify({
    date: today.toISOString(),
    words: dailyWords,
    shown: true
  }));
  
  localStorage.setItem(LAST_VISIT_KEY, today.toISOString());
  
  // Update streak
  updateStreak();
  
  return dailyWords;
}

// Get themed practice words (rotates through themes)
export function getThemedPracticeWords(
  userLevel: number = 1,
  count: number = 10
): { words: ExtendedVocabWord[]; theme: typeof DAILY_THEMES[0] } {
  const rotationIndex = getRotationIndex();
  const theme = DAILY_THEMES[rotationIndex];
  const learnedIds = getLearnedWordIds();
  
  // Get words for this theme, excluding known ones
  const themeWords = getWordsForDay(new Date(2024, 0, rotationIndex + 1));
  const availableWords = themeWords.filter(w => !learnedIds.includes(w.id));
  
  // Shuffle and take requested count
  const shuffled = shuffleArray(availableWords);
  const selected = shuffled.slice(0, Math.min(count, availableWords.length));
  
  // If not enough words, include some learned ones with lower priority
  if (selected.length < count) {
    const learnedWords = themeWords.filter(w => learnedIds.includes(w.id));
    const needed = count - selected.length;
    selected.push(...shuffleArray(learnedWords).slice(0, needed));
  }
  
  return {
    words: selected,
    theme
  };
}

// Get smart quiz words (adaptive difficulty)
export function getSmartQuizWords(
  userLevel: number,
  correctRate: number, // 0-1
  count: number = 10
): ExtendedVocabWord[] {
  const learnedIds = getLearnedWordIds();
  
  // Adjust difficulty based on correct rate
  let targetDifficulty: 'A1' | 'A2' | 'B1' | 'B2' = 'A1';
  
  if (userLevel >= 10 && correctRate > 0.85) {
    targetDifficulty = 'B2';
  } else if (userLevel >= 7 && correctRate > 0.75) {
    targetDifficulty = 'B1';
  } else if (userLevel >= 4 && correctRate > 0.6) {
    targetDifficulty = 'A2';
  }
  
  const quizWords = getRandomWordsForQuiz(count * 2, learnedIds, targetDifficulty);
  
  // Mix in some learned words for review (spaced repetition)
  const reviewCount = Math.floor(count * 0.3); // 30% review
  const reviewWords = getRandomWordsForQuiz(reviewCount, [], targetDifficulty)
    .filter(w => learnedIds.includes(w.id));
  
  const newWords = quizWords.slice(0, count - reviewCount);
  
  return shuffleArray([...newWords, ...reviewWords]);
}

// Get review words (forgotten or due for review)
export function getReviewWords(count: number = 5): ExtendedVocabWord[] {
  // This would integrate with a spaced repetition algorithm
  // For now, return random learned words
  const learnedIds = getLearnedWordIds();
  if (learnedIds.length === 0) return [];
  
  const allWords = getRandomWordsForQuiz(100);
  const learnedWords = allWords.filter(w => learnedIds.includes(w.id));
  
  return shuffleArray(learnedWords).slice(0, Math.min(count, learnedWords.length));
}

// Get streak bonus information
export function getStreakBonus(): { multiplier: number; message: string } {
  const streak = getStreak();
  
  if (streak >= 30) {
    return { multiplier: 2.0, message: '30-Tage-Streak! Doppelte XP!' };
  } else if (streak >= 14) {
    return { multiplier: 1.5, message: '14-Tage-Streak! 50% XP-Bonus!' };
  } else if (streak >= 7) {
    return { multiplier: 1.25, message: '7-Tage-Streak! 25% XP-Bonus!' };
  } else if (streak >= 3) {
    return { multiplier: 1.1, message: '3-Tage-Streak! 10% XP-Bonus!' };
  }
  
  return { multiplier: 1.0, message: '' };
}

// Check and award streak achievements
export function checkStreakAchievements(): string[] {
  const streak = getStreak();
  const achievements: string[] = [];
  
  if (streak === 1) achievements.push('ersterTag');
  if (streak === 3) achievements.push('dreiTage');
  if (streak === 7) achievements.push('eineWoche');
  if (streak === 14) achievements.push('zweiWochen');
  if (streak === 30) achievements.push('einMonat');
  if (streak === 100) achievements.push('hundertTage');
  
  return achievements;
}

// Get today's theme info
export function getTodayTheme(): typeof DAILY_THEMES[0] {
  const day = new Date().getDay();
  return DAILY_THEMES[day];
}

// Get progress statistics
export function getContentProgress(): {
  totalWords: number;
  learnedWords: number;
  dailyWordsAvailable: number;
  streak: number;
  todayTheme: string;
  masteryPercentage: number;
} {
  const learnedIds = getLearnedWordIds();
  const dailyWords = getDailyDiscovery(1);
  const todayTheme = getTodayTheme();
  
  return {
    totalWords: 200, // Approximate
    learnedWords: learnedIds.length,
    dailyWordsAvailable: dailyWords.length,
    streak: getStreak(),
    todayTheme: todayTheme.name,
    masteryPercentage: Math.round((learnedIds.length / 200) * 100)
  };
}

// Initialize content generator
export function initializeContent(): void {
  if (typeof window === 'undefined') return;
  
  // Update streak on visit
  updateStreak();
  
  // Pre-generate daily words
  getDailyDiscovery(1);
}
