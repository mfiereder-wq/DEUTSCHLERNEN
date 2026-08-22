'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Settings, Puzzle, Brain, Map, UserCircle, Repeat, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/theme-toggle';
import { DailyLearning } from '@/components/daily-learning';
import { PronunciationPractice } from '@/components/pronunciation-practice';
import { SyncManagerCard } from '@/components/sync-manager';
import { PWAInfoCard } from '@/components/pwa-install';
import { SentenceCompletion } from '@/components/sentence-completion';
import { QuizGame } from '@/components/quiz-game';
import { LevelMap } from '@/components/level-map';
import { UserProfile } from '@/components/user-profile';
import { SRSPractice } from '@/components/srs-practice';
import { ExtendedVocabWord, EXTENDED_VOCABULARY, shuffleArray } from '@/data/extended-vocabulary';
import { useAuth } from '@/contexts/auth-context';
import { LoginScreen } from '@/components/auth/login-screen';
import { getProgress, PROGRESS_UPDATED_EVENT, UserProgress } from '@/lib/progress-store';
import { getCurrentLevel } from '@/lib/level-system';

// Pronunciation practice: shuffled list of all vocabulary words
function getShuffledPracticeWords(): ExtendedVocabWord[] {
  return shuffleArray(EXTENDED_VOCABULARY);
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [practiceWords, setPracticeWords] = useState<ExtendedVocabWord[]>(() => getShuffledPracticeWords());
  const [progress, setProgress] = useState<UserProgress>(() => getProgress());
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    const refreshProgress = () => setProgress(getProgress());
    window.addEventListener(PROGRESS_UPDATED_EVENT, refreshProgress);
    return () => window.removeEventListener(PROGRESS_UPDATED_EVENT, refreshProgress);
  }, []);

  const handleNextPractice = () => {
    setCurrentPracticeIndex((prev) => {
      if (prev + 1 >= practiceWords.length) {
        // Re-shuffle when all words have been practiced
        setPracticeWords(getShuffledPracticeWords());
        return 0;
      }
      return prev + 1;
    });
  };

  const handlePrevPractice = () => {
    setCurrentPracticeIndex((prev) => (prev - 1 + practiceWords.length) % practiceWords.length);
  };

  const handleLoginSuccess = () => {
    // Login is handled by the AuthContext
  };

  // Show loading spinner during auth check
  if (authLoading || !mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F26B5E] to-[#FF9A8E]">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <p className="text-sm text-muted-foreground">Lade...</p>
        </motion.div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background noise-texture">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#F26B5E] to-[#FF9A8E]">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Sprachwerkstatt</p>
                <h1 className="font-display text-lg sm:text-xl tracking-tight text-gradient-gold">
                  DEUTSCHLERNEN
                </h1>
              </div>
            </motion.div>

            {/* Right side */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 sm:gap-2"
            >
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                onClick={logout}
                title="Abmelden"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <div className="sticky top-14 sm:top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md overflow-x-auto">
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 min-w-max">
              <TabsList className="inline-flex h-14 rounded-none bg-transparent p-0">
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#F26B5E] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap hover:text-[#F26B5E]"
                >
                  <UserCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Profil</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="learn" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#F26B5E] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap hover:text-[#F26B5E]"
                >
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Lernen</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="pronunciation" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#F26B5E] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap hover:text-[#F26B5E]"
                >
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Aussprache</span>
                  <span className="text-xs sm:text-sm font-medium sm:hidden">Audio</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="srs" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#F26B5E] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap hover:text-[#F26B5E]"
                >
                  <Repeat className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Wiederholung</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="sentences" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#F26B5E] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap hover:text-[#F26B5E]"
                >
                  <Puzzle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Sätze</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="quiz" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#F26B5E] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap hover:text-[#F26B5E]"
                >
                  <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Quiz</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="levels" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#F26B5E] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap hover:text-[#F26B5E]"
                >
                  <Map className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Level</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#F26B5E] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap hover:text-[#F26B5E]"
                >
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Mehr</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Tab Content */}
          <div className="w-full">
            {/* Profile Tab - NEW! */}
            <TabsContent value="profile" className="mt-0 w-full px-3 sm:px-4 py-4">
              <div className="mx-auto max-w-7xl">
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#168C8C]">Dein Lernatelier</p>
                    <h2 className="font-display text-3xl sm:text-4xl">Weiterlernen, wo du aufgehört hast.</h2>
                  </div>
                  <Sparkles className="hidden h-8 w-8 text-[#F2B84B] sm:block" />
                </div>
                <UserProfile />
              </div>
            </TabsContent>

            {/* Learn Tab */}
            <TabsContent value="learn" className="mt-0 w-full">
              <DailyLearning userLevel={getCurrentLevel(progress.xp).id} />
            </TabsContent>

            {/* Pronunciation Tab */}
            <TabsContent value="pronunciation" className="mt-0 w-full px-3 sm:px-4 py-4">
              <div className="mx-auto max-w-2xl space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrevPractice} className="text-xs sm:text-sm">
                    ← Vorherige
                  </Button>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {currentPracticeIndex + 1} / {practiceWords.length}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleNextPractice} className="text-xs sm:text-sm">
                    Nächste →
                  </Button>
                </div>
                <PronunciationPractice 
                  word={practiceWords[currentPracticeIndex]} 
                  onNext={handleNextPractice}
                  hasNext={true}
                />
              </div>
            </TabsContent>

            {/* SRS/Spaced Repetition Tab */}
            <TabsContent value="srs" className="mt-0 w-full px-3 sm:px-4 py-4">
              <SRSPractice />
            </TabsContent>

            {/* Sentences Tab */}
            <TabsContent value="sentences" className="mt-0 w-full px-3 sm:px-4 py-4">
              <SentenceCompletion />
            </TabsContent>

            {/* Quiz Tab */}
            <TabsContent value="quiz" className="mt-0 w-full px-3 sm:px-4 py-4">
              <QuizGame />
            </TabsContent>

            {/* Levels Tab */}
            <TabsContent value="levels" className="mt-0 w-full px-3 sm:px-4 py-4">
              <LevelMap currentXP={progress.xp} onSelectLevel={(level) => console.log('Selected:', level)} />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-0 w-full px-3 sm:px-4 py-4">
              <div className="mx-auto max-w-7xl grid gap-4 sm:gap-6 md:grid-cols-2">
                <PWAInfoCard />
                <SyncManagerCard />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-[#102A43] py-4 sm:py-6 text-center text-white">
        <p className="text-xs sm:text-sm text-muted-foreground px-4">
          DEUTSCHLERNEN / Kleine Schritte. Sicheres Deutsch.
        </p>
      </footer>
    </div>
  );
}
