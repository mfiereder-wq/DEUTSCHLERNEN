// Level System for DEUTSCHLERNEN
// Progressive difficulty with unlockable content

export interface Level {
  id: number;
  name: string;
  description: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2';
  requiredXP: number;
  vocabularyCount: number;
  sentenceCount: number;
  quizCount: number;
  categories: string[];
  unlocked: boolean;
  completed: boolean;
}

export const LEVELS: Level[] = [
  // A1 - Beginner
  {
    id: 1,
    name: 'Grüße & Basics',
    description: 'Hallo, Guten Tag, Danke, Entschuldigung',
    difficulty: 'A1',
    requiredXP: 0,
    vocabularyCount: 15,
    sentenceCount: 8,
    quizCount: 5,
    categories: ['Greetings', 'Basics'],
    unlocked: true,
    completed: false,
  },
  {
    id: 2,
    name: 'Zahlen & Zeit',
    description: 'Zählen, Uhrzeit, Tage der Woche',
    difficulty: 'A1',
    requiredXP: 100,
    vocabularyCount: 20,
    sentenceCount: 10,
    quizCount: 6,
    categories: ['Numbers', 'Time'],
    unlocked: false,
    completed: false,
  },
  {
    id: 3,
    name: 'Familie & Personen',
    description: 'Mutter, Vater, Freunde, Berufe',
    difficulty: 'A1',
    requiredXP: 250,
    vocabularyCount: 25,
    sentenceCount: 12,
    quizCount: 7,
    categories: ['Family', 'People'],
    unlocked: false,
    completed: false,
  },
  {
    id: 4,
    name: 'Essen & Trinken',
    description: 'Restaurant, Lebensmittel, Getränke',
    difficulty: 'A1',
    requiredXP: 450,
    vocabularyCount: 30,
    sentenceCount: 15,
    quizCount: 8,
    categories: ['Food', 'Drinks'],
    unlocked: false,
    completed: false,
  },
  {
    id: 5,
    name: 'A1 Abschluss',
    description: 'Wohnung, Möbel, Farben, Kleidung',
    difficulty: 'A1',
    requiredXP: 700,
    vocabularyCount: 35,
    sentenceCount: 18,
    quizCount: 10,
    categories: ['Home', 'Colors', 'Clothing'],
    unlocked: false,
    completed: false,
  },
  // A2 - Elementary
  {
    id: 6,
    name: 'Tägliche Routinen',
    description: 'Morgens, Arbeit, Freizeit',
    difficulty: 'A2',
    requiredXP: 1000,
    vocabularyCount: 30,
    sentenceCount: 15,
    quizCount: 8,
    categories: ['DailyLife', 'Work'],
    unlocked: false,
    completed: false,
  },
  {
    id: 7,
    name: 'Einkaufen',
    description: 'Supermarkt, Kleidung, Preise',
    difficulty: 'A2',
    requiredXP: 1350,
    vocabularyCount: 35,
    sentenceCount: 18,
    quizCount: 9,
    categories: ['Shopping', 'Money'],
    unlocked: false,
    completed: false,
  },
  {
    id: 8,
    name: 'Gesundheit',
    description: 'Körper, Krankheit, Arztbesuch',
    difficulty: 'A2',
    requiredXP: 1750,
    vocabularyCount: 35,
    sentenceCount: 18,
    quizCount: 9,
    categories: ['Health', 'Body'],
    unlocked: false,
    completed: false,
  },
  {
    id: 9,
    name: 'Reisen & Transport',
    description: 'Zug, Flugzeug, Hotel, Stadt',
    difficulty: 'A2',
    requiredXP: 2200,
    vocabularyCount: 40,
    sentenceCount: 20,
    quizCount: 10,
    categories: ['Travel', 'Transport'],
    unlocked: false,
    completed: false,
  },
  {
    id: 10,
    name: 'A2 Abschluss',
    description: 'Wetter, Natur, Hobbys, Vergangenheit',
    difficulty: 'A2',
    requiredXP: 2700,
    vocabularyCount: 45,
    sentenceCount: 25,
    quizCount: 12,
    categories: ['Weather', 'Nature', 'Hobbies'],
    unlocked: false,
    completed: false,
  },
  // B1 - Intermediate
  {
    id: 11,
    name: 'Beziehungen',
    description: 'Gefühle, Streit, Versöhnung',
    difficulty: 'B1',
    requiredXP: 3300,
    vocabularyCount: 40,
    sentenceCount: 20,
    quizCount: 10,
    categories: ['Relationships', 'Emotions'],
    unlocked: false,
    completed: false,
  },
  {
    id: 12,
    name: 'Medien & Technik',
    description: 'Internet, TV, Smartphone, Apps',
    difficulty: 'B1',
    requiredXP: 3900,
    vocabularyCount: 40,
    sentenceCount: 22,
    quizCount: 11,
    categories: ['Technology', 'Media'],
    unlocked: false,
    completed: false,
  },
  {
    id: 13,
    name: 'Arbeitswelt',
    description: 'Bewerbung, Meeting, Präsentation',
    difficulty: 'B1',
    requiredXP: 4550,
    vocabularyCount: 45,
    sentenceCount: 25,
    quizCount: 12,
    categories: ['Business', 'Office'],
    unlocked: false,
    completed: false,
  },
  {
    id: 14,
    name: 'Kultur & Geschichte',
    description: 'Deutsche Geschichte, Traditionen',
    difficulty: 'B1',
    requiredXP: 5250,
    vocabularyCount: 45,
    sentenceCount: 25,
    quizCount: 12,
    categories: ['Culture', 'History'],
    unlocked: false,
    completed: false,
  },
  {
    id: 15,
    name: 'B1 Abschluss',
    description: 'Politik, Umwelt, Zukunftspläne',
    difficulty: 'B1',
    requiredXP: 6000,
    vocabularyCount: 50,
    sentenceCount: 30,
    quizCount: 15,
    categories: ['Politics', 'Environment'],
    unlocked: false,
    completed: false,
  },
];

// XP rewards
export const XP_REWARDS = {
  WORD_LEARNED: 10,
  WORD_MASTERED: 25,
  SENTENCE_CORRECT: 15,
  SENTENCE_FIRST_TRY: 25,
  QUIZ_CORRECT: 20,
  QUIZ_STREAK_BONUS: 5, // per streak
  PERFECT_QUIZ: 50,
  DAILY_STREAK: 50,
  LEVEL_COMPLETE: 100,
};

// Get current level based on XP
export function getCurrentLevel(totalXP: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i].requiredXP) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

// Get next level
export function getNextLevel(currentLevelId: number): Level | null {
  return LEVELS.find(l => l.id === currentLevelId + 1) || null;
}

// Check if level is unlocked
export function isLevelUnlocked(levelId: number, totalXP: number): boolean {
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) return false;
  return totalXP >= level.requiredXP;
}

// Calculate progress to next level
export function getLevelProgress(totalXP: number): { current: Level; next: Level | null; progress: number } {
  const current = getCurrentLevel(totalXP);
  const next = getNextLevel(current.id);
  
  if (!next) {
    return { current, next: null, progress: 100 };
  }
  
  const xpInCurrentLevel = totalXP - current.requiredXP;
  const xpNeeded = next.requiredXP - current.requiredXP;
  const progress = Math.min(100, Math.round((xpInCurrentLevel / xpNeeded) * 100));
  
  return { current, next, progress };
}

// Vocabulary by level
export const getVocabForLevel = (levelId: number) => {
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) return [];
  
  // Filter vocabulary by level categories
  return level.categories;
};
