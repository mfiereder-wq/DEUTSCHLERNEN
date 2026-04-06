'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExtendedVocabWord } from '@/data/extended-vocabulary';
import {
  getDailyDiscovery,
  getThemedPracticeWords,
  getSmartQuizWords,
  getReviewWords,
  markWordsAsLearned,
  getStreak,
  getStreakBonus,
  getContentProgress,
  getTodayTheme,
  initializeContent,
  isNewDay,
} from '@/lib/content-generator';

interface DailyContent {
  newWords: ExtendedVocabWord[];
  themeWords: ExtendedVocabWord[];
  reviewWords: ExtendedVocabWord[];
  quizWords: ExtendedVocabWord[];
  theme: { name: string; color: string; icon: string };
}

interface ContentStats {
  streak: number;
  streakBonus: { multiplier: number; message: string };
  totalLearned: number;
  dailyProgress: number;
  isNewDay: boolean;
}

export function useDynamicContent(userLevel: number = 1) {
  const [content, setContent] = useState<DailyContent>({
    newWords: [],
    themeWords: [],
    reviewWords: [],
    quizWords: [],
    theme: { name: '', color: '', icon: '' },
  });
  
  const [stats, setStats] = useState<ContentStats>({
    streak: 0,
    streakBonus: { multiplier: 1, message: '' },
    totalLearned: 0,
    dailyProgress: 0,
    isNewDay: false,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize content on mount
  useEffect(() => {
    if (!mounted) return;
    
    const loadContent = () => {
      setIsLoading(true);
      
      // Initialize content generator
      initializeContent();
      
      // Get daily new words
      const newWords = getDailyDiscovery(userLevel);
      
      // Get themed practice words
      const { words: themeWords, theme } = getThemedPracticeWords(userLevel, 15);
      
      // Get review words
      const reviewWords = getReviewWords(5);
      
      // Get smart quiz words (will be generated when needed)
      const quizWords: ExtendedVocabWord[] = [];
      
      setContent({
        newWords,
        themeWords,
        reviewWords,
        quizWords,
        theme,
      });
      
      // Update stats
      const progress = getContentProgress();
      const streak = getStreak();
      const bonus = getStreakBonus();
      
      setStats({
        streak,
        streakBonus: bonus,
        totalLearned: progress.learnedWords,
        dailyProgress: (newWords.length > 0 ? 1 : 0) * 20, // 20% per new word interaction
        isNewDay: isNewDay(),
      });
      
      setIsLoading(false);
    };
    
    loadContent();
  }, [mounted, userLevel]);

  // Function to generate quiz words on demand
  const generateQuizWords = useCallback((correctRate: number = 0.7, count: number = 10) => {
    const words = getSmartQuizWords(userLevel, correctRate, count);
    setContent(prev => ({ ...prev, quizWords: words }));
    return words;
  }, [userLevel]);

  // Mark words as learned
  const learnWords = useCallback((wordIds: string[]) => {
    markWordsAsLearned(wordIds);
    
    // Update local state
    setContent(prev => ({
      ...prev,
      newWords: prev.newWords.map(w => 
        wordIds.includes(w.id) ? { ...w, isNew: false } : w
      ),
    }));
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalLearned: prev.totalLearned + wordIds.length,
    }));
  }, []);

  // Refresh content (for manual refresh)
  const refreshContent = useCallback(() => {
    const { words: themeWords, theme } = getThemedPracticeWords(userLevel, 15);
    const reviewWords = getReviewWords(5);
    
    setContent(prev => ({
      ...prev,
      themeWords,
      reviewWords,
    }));
  }, [userLevel]);

  // Get today's theme
  const getCurrentTheme = useCallback(() => {
    return getTodayTheme();
  }, []);

  return {
    newWords: content.newWords,
    themeWords: content.themeWords,
    reviewWords: content.reviewWords,
    quizWords: content.quizWords,
    theme: content.theme,
    streak: stats.streak,
    streakBonus: stats.streakBonus,
    totalLearned: stats.totalLearned,
    dailyProgress: stats.dailyProgress,
    isNewDay: stats.isNewDay,
    isLoading,
    mounted,
    generateQuizWords,
    learnWords,
    refreshContent,
    getCurrentTheme,
  };
}

// Hook specifically for new content banner
export function useNewContentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [newContentCount, setNewContentCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const checkNewContent = () => {
      const isNew = isNewDay();
      const newWords = getDailyDiscovery(1);
      
      setShowBanner(isNew && newWords.length > 0);
      setNewContentCount(newWords.length);
    };
    
    checkNewContent();
  }, [mounted]);

  const dismissBanner = useCallback(() => {
    setShowBanner(false);
  }, []);

  return {
    showBanner,
    newContentCount,
    dismissBanner,
    mounted,
  };
}
