// Spaced Repetition System for Vocabulary Learning
// Based on Ebbinghaus Forgetting Curve and SM-2 Algorithm

export interface SRSReview {
  wordId: string;
  interval: number; // days until next review
  easeFactor: number; // difficulty multiplier (default 2.5)
  repetitions: number; // consecutive correct answers
  lastReviewed: string; // ISO date
  nextReview: string; // ISO date
  status: 'new' | 'learning' | 'review' | 'mastered';
}

export interface SRSCard extends SRSReview {
  due: boolean;
  daysUntilDue: number;
}

const MIN_INTERVAL = 1; // minimum 1 day
const MAX_INTERVAL = 365; // maximum 1 year
const INITIAL_EASE = 2.5;
const EASE_INCREMENT = 0.1;
const EASE_MIN = 1.3;

/**
 * Calculate the next review schedule based on user performance
 * Uses modified SM-2 algorithm
 */
export function calculateNextReview(
  currentReview: SRSReview,
  quality: number // 0-5 scale (0=completely forgotten, 5=perfect recall)
): SRSReview {
  let { interval, easeFactor, repetitions } = currentReview;

  // Update ease factor based on performance
  easeFactor = Math.max(
    EASE_MIN,
    easeFactor + (EASE_INCREMENT * (5 - quality))
  );

  if (quality >= 3) {
    // Successful recall
    if (repetitions === 0) {
      interval = MIN_INTERVAL;
    } else if (repetitions === 1) {
      interval = 6; // second review after 6 days
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions++;
  } else {
    // Failed recall - reset
    repetitions = 0;
    interval = MIN_INTERVAL;
  }

  // Cap interval
  interval = Math.min(MAX_INTERVAL, Math.max(MIN_INTERVAL, interval));

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  // Determine status
  let status: SRSReview['status'] = 'learning';
  if (repetitions === 0) {
    status = 'new';
  } else if (interval >= 30) {
    status = 'mastered';
  } else if (interval >= 7) {
    status = 'review';
  }

  return {
    ...currentReview,
    interval,
    easeFactor,
    repetitions,
    lastReviewed: new Date().toISOString(),
    nextReview: nextReviewDate.toISOString(),
    status,
  };
}

/**
 * Create a new SRS card for a word
 */
export function createSRSCard(wordId: string): SRSReview {
  const now = new Date();
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + MIN_INTERVAL);

  return {
    wordId,
    interval: MIN_INTERVAL,
    easeFactor: INITIAL_EASE,
    repetitions: 0,
    lastReviewed: now.toISOString(),
    nextReview: nextReview.toISOString(),
    status: 'new',
  };
}

/**
 * Get all cards due for review
 */
export function getDueCards(cards: SRSReview[]): SRSCard[] {
  const now = new Date();
  
  return cards.map(card => {
    const nextReviewDate = new Date(card.nextReview);
    const daysUntilDue = Math.ceil(
      (nextReviewDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return {
      ...card,
      due: daysUntilDue <= 0,
      daysUntilDue,
    };
  }).filter(card => card.due);
}

/**
 * Get review statistics
 */
export function getSRSStats(cards: SRSReview[]): {
  total: number;
  due: number;
  new: number;
  learning: number;
  review: number;
  mastered: number;
  averageEase: number;
  forecast: Array<{ date: string; count: number }>;
} {
  const now = new Date();
  const dueCards = getDueCards(cards);
  
  const stats = {
    total: cards.length,
    due: dueCards.length,
    new: cards.filter(c => c.status === 'new').length,
    learning: cards.filter(c => c.status === 'learning').length,
    review: cards.filter(c => c.status === 'review').length,
    mastered: cards.filter(c => c.status === 'mastered').length,
    averageEase: cards.length > 0 
      ? cards.reduce((sum, c) => sum + c.easeFactor, 0) / cards.length 
      : INITIAL_EASE,
  };

  // 7-day forecast
  const forecast: Array<{ date: string; count: number }> = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    
    const count = cards.filter(card => {
      const reviewDate = new Date(card.nextReview);
      reviewDate.setHours(0, 0, 0, 0);
      return reviewDate.getTime() <= date.getTime();
    }).length;
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      count,
    });
  }

  return {
    ...stats,
    forecast,
  };
}

/**
 * Get optimal daily review count
 */
export function getDailyReviewTarget(cards: SRSReview[], maxPerDay: number = 20): number {
  const dueCards = getDueCards(cards);
  return Math.min(dueCards.length, maxPerDay);
}

/**
 * Prioritize cards for review session
 */
export function prioritizeCards(cards: SRSCard[], maxCount: number = 20): SRSCard[] {
  // Sort by: overdue first, then by ease factor (harder words first)
  return cards
    .sort((a, b) => {
      // Overdue cards first
      if (a.daysUntilDue < b.daysUntilDue) return -1;
      if (a.daysUntilDue > b.daysUntilDue) return 1;
      
      // Then by difficulty (lower ease = harder)
      return a.easeFactor - b.easeFactor;
    })
    .slice(0, maxCount);
}

/**
 * Storage key for SRS data
 */
export const SRS_STORAGE_KEY = 'deutschlernen-srs-cards';

/**
 * Load SRS cards from localStorage
 */
export function loadSRSCards(): SRSReview[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const stored = localStorage.getItem(SRS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading SRS cards:', e);
  }
  
  return [];
}

/**
 * Save SRS cards to localStorage
 */
export function saveSRSCards(cards: SRSReview[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(cards));
  } catch (e) {
    console.error('Error saving SRS cards:', e);
  }
}

/**
 * Update or create a card after a review
 */
export function updateCardAfterReview(
  cards: SRSReview[],
  wordId: string,
  quality: number
): SRSReview[] {
  const existingIndex = cards.findIndex(c => c.wordId === wordId);
  
  if (existingIndex >= 0) {
    // Update existing card
    const updatedCard = calculateNextReview(cards[existingIndex], quality);
    const newCards = [...cards];
    newCards[existingIndex] = updatedCard;
    return newCards;
  } else {
    // Create new card
    const newCard = createSRSCard(wordId);
    const updatedCard = calculateNextReview(newCard, quality);
    return [...cards, updatedCard];
  }
}

/**
 * Get words that need attention (due or new)
 */
export function getWordsForTodaySession(
  cards: SRSReview[],
  allWordIds: string[],
  newWordsPerDay: number = 10,
  reviewWordsPerDay: number = 20
): { due: SRSCard[]; new: string[] } {
  const dueCards = prioritizeCards(getDueCards(cards), reviewWordsPerDay);
  
  // Find new words (not in cards yet)
  const learnedWordIds = new Set(cards.map(c => c.wordId));
  const newWords = allWordIds
    .filter(id => !learnedWordIds.has(id))
    .slice(0, newWordsPerDay);
  
  return {
    due: dueCards,
    new: newWords,
  };
}
