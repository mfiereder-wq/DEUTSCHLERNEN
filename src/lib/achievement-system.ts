// Achievement System for Gamification
// Badges, milestones, and progress tracking

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'vocabulary' | 'quiz' | 'level' | 'special';
  requirement: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  rewardXP: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Streak Achievements
  {
    id: 'streak-3',
    name: 'Anfänger Serie',
    description: '3 Tage am Stück gelernt',
    icon: '🔥',
    category: 'streak',
    requirement: 3,
    unlocked: false,
    progress: 0,
    rewardXP: 50,
  },
  {
    id: 'streak-7',
    name: 'Wochen-Champion',
    description: '7 Tage am Stück gelernt',
    icon: '⚡',
    category: 'streak',
    requirement: 7,
    unlocked: false,
    progress: 0,
    rewardXP: 100,
  },
  {
    id: 'streak-30',
    name: 'Monats-Meister',
    description: '30 Tage am Stück gelernt',
    icon: '🏆',
    category: 'streak',
    requirement: 30,
    unlocked: false,
    progress: 0,
    rewardXP: 500,
  },
  {
    id: 'streak-100',
    name: 'Legende',
    description: '100 Tage am Stück gelernt',
    icon: '👑',
    category: 'streak',
    requirement: 100,
    unlocked: false,
    progress: 0,
    rewardXP: 2000,
  },
  
  // Vocabulary Achievements
  {
    id: 'vocab-10',
    name: 'Erste Schritte',
    description: '10 Wörter gelernt',
    icon: '📚',
    category: 'vocabulary',
    requirement: 10,
    unlocked: false,
    progress: 0,
    rewardXP: 25,
  },
  {
    id: 'vocab-50',
    name: 'Wortschatz-Sammler',
    description: '50 Wörter gelernt',
    icon: '📖',
    category: 'vocabulary',
    requirement: 50,
    unlocked: false,
    progress: 0,
    rewardXP: 100,
  },
  {
    id: 'vocab-100',
    name: 'Vokabel-Virtuose',
    description: '100 Wörter gelernt',
    icon: '🎓',
    category: 'vocabulary',
    requirement: 100,
    unlocked: false,
    progress: 0,
    rewardXP: 250,
  },
  {
    id: 'vocab-500',
    name: 'Sprachgenie',
    description: '500 Wörter gelernt',
    icon: '🧠',
    category: 'vocabulary',
    requirement: 500,
    unlocked: false,
    progress: 0,
    rewardXP: 1000,
  },
  
  // Quiz Achievements
  {
    id: 'quiz-10',
    name: 'Quiz-Neuling',
    description: '10 Quizfragen beantwortet',
    icon: '❓',
    category: 'quiz',
    requirement: 10,
    unlocked: false,
    progress: 0,
    rewardXP: 30,
  },
  {
    id: 'quiz-perfect',
    name: 'Perfekt!',
    description: 'Ein Quiz ohne Fehler abgeschlossen',
    icon: '💯',
    category: 'quiz',
    requirement: 1,
    unlocked: false,
    progress: 0,
    rewardXP: 100,
  },
  {
    id: 'quiz-streak-5',
    name: 'Fragen-Kette',
    description: '5 Fragen in Folge richtig',
    icon: '⚡',
    category: 'quiz',
    requirement: 5,
    unlocked: false,
    progress: 0,
    rewardXP: 75,
  },
  
  // Level Achievements
  {
    id: 'level-5',
    name: 'Aufsteiger',
    description: 'Level 5 erreicht',
    icon: '📈',
    category: 'level',
    requirement: 5,
    unlocked: false,
    progress: 0,
    rewardXP: 200,
  },
  {
    id: 'level-10',
    name: 'Fortgeschritten',
    description: 'Level 10 erreicht',
    icon: '🌟',
    category: 'level',
    requirement: 10,
    unlocked: false,
    progress: 0,
    rewardXP: 500,
  },
  {
    id: 'level-15',
    name: 'Experte',
    description: 'Level 15 erreicht (B1 abgeschlossen)',
    icon: '🎖️',
    category: 'level',
    requirement: 15,
    unlocked: false,
    progress: 0,
    rewardXP: 1000,
  },
  
  // Special Achievements
  {
    id: 'first-sentence',
    name: 'Erster Satz',
    description: 'Die erste Satzübung abgeschlossen',
    icon: '✍️',
    category: 'special',
    requirement: 1,
    unlocked: false,
    progress: 0,
    rewardXP: 50,
  },
  {
    id: 'pronunciation-master',
    name: 'Aussprache-Profi',
    description: '20 Aussprache-Übungen gemeistert',
    icon: '🎤',
    category: 'special',
    requirement: 20,
    unlocked: false,
    progress: 0,
    rewardXP: 150,
  },
  {
    id: 'night-owl',
    name: 'Nachteule',
    description: 'Nach Mitternacht gelernt',
    icon: '🦉',
    category: 'special',
    requirement: 1,
    unlocked: false,
    progress: 0,
    rewardXP: 25,
  },
  {
    id: 'early-bird',
    name: 'Frühaufsteher',
    description: 'Vor 6 Uhr morgens gelernt',
    icon: '🌅',
    category: 'special',
    requirement: 5,
    unlocked: false,
    progress: 0,
    rewardXP: 75,
  },
];

export function checkAchievements(progress: {
  streak: number;
  wordsLearned: number;
  quizzesCompleted: number;
  currentLevel: number;
  sentencesCompleted: number;
  pronunciationSessions: number;
}): Achievement[] {
  return ACHIEVEMENTS.map(achievement => {
    let currentProgress = 0;
    
    switch (achievement.category) {
      case 'streak':
        currentProgress = progress.streak;
        break;
      case 'vocabulary':
        currentProgress = progress.wordsLearned;
        break;
      case 'quiz':
        if (achievement.id === 'quiz-perfect') {
          // Special handling for perfect quiz - would need separate tracking
          currentProgress = 0;
        } else if (achievement.id === 'quiz-streak-5') {
          currentProgress = 0; // Would need streak tracking
        } else {
          currentProgress = progress.quizzesCompleted;
        }
        break;
      case 'level':
        currentProgress = progress.currentLevel;
        break;
      case 'special':
        if (achievement.id === 'first-sentence') {
          currentProgress = progress.sentencesCompleted > 0 ? 1 : 0;
        } else if (achievement.id === 'pronunciation-master') {
          currentProgress = progress.pronunciationSessions;
        } else {
          currentProgress = 0; // Time-based achievements need special handling
        }
        break;
    }
    
    const unlocked = currentProgress >= achievement.requirement;
    
    return {
      ...achievement,
      progress: Math.min(currentProgress, achievement.requirement),
      unlocked,
      unlockedAt: unlocked && !achievement.unlocked 
        ? new Date().toISOString() 
        : achievement.unlockedAt,
    };
  });
}

export function getUnlockedAchievements(achievements: Achievement[]): Achievement[] {
  return achievements.filter(a => a.unlocked);
}

export function getAvailableAchievements(achievements: Achievement[]): Achievement[] {
  return achievements.filter(a => !a.unlocked);
}

export function getAchievementProgress(achievements: Achievement[]): number {
  if (achievements.length === 0) return 0;
  const unlocked = achievements.filter(a => a.unlocked).length;
  return Math.round((unlocked / achievements.length) * 100);
}

export function calculateTotalRewardXP(achievements: Achievement[]): number {
  return achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.rewardXP, 0);
}

// Storage functions
const ACHIEVEMENT_STORAGE_KEY = 'deutschlernen-achievements';

export function loadAchievements(): Achievement[] {
  if (typeof window === 'undefined') {
    return ACHIEVEMENTS;
  }
  
  try {
    const stored = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with base achievements to get any new ones
      return ACHIEVEMENTS.map(base => {
        const saved = parsed.find((a: Achievement) => a.id === base.id);
        return saved || base;
      });
    }
  } catch (e) {
    console.error('Error loading achievements:', e);
  }
  
  return ACHIEVEMENTS;
}

export function saveAchievements(achievements: Achievement[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(achievements));
  } catch (e) {
    console.error('Error saving achievements:', e);
  }
}

export function unlockAchievement(achievementId: string): Achievement | null {
  const achievements = loadAchievements();
  const achievement = achievements.find(a => a.id === achievementId);
  
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true;
    achievement.unlockedAt = new Date().toISOString();
    saveAchievements(achievements);
    return achievement;
  }
  
  return null;
}
