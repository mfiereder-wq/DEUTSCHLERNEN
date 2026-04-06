'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Settings, User, Puzzle, Brain, Map, UserCircle } from 'lucide-react';
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
import { ExtendedVocabWord } from '@/data/extended-vocabulary';

// Sample words for pronunciation practice
const PRACTICE_WORDS: ExtendedVocabWord[] = [
  {
    id: 'practice-1',
    german: 'Guten Morgen',
    english: 'Good morning',
    category: 'Alltag',
    difficulty: 'A1',
    tags: ['greeting', 'morning'],
    exampleSentence: 'Guten Morgen! Wie geht es dir?',
  },
  {
    id: 'practice-2',
    german: 'Danke schön',
    english: 'Thank you very much',
    category: 'Alltag',
    difficulty: 'A1',
    tags: ['polite', 'thanks'],
    exampleSentence: 'Danke schön für deine Hilfe!',
  },
  {
    id: 'practice-3',
    german: 'Entschuldigung',
    english: 'Excuse me / Sorry',
    category: 'Alltag',
    difficulty: 'A1',
    tags: ['polite', 'apology'],
    exampleSentence: 'Entschuldigung, wie spät ist es?',
  },
  {
    id: 'practice-4',
    german: 'Auf Wiedersehen',
    english: 'Goodbye',
    category: 'Alltag',
    difficulty: 'A1',
    tags: ['farewell'],
    exampleSentence: 'Auf Wiedersehen und bis bald!',
  },
  {
    id: 'practice-5',
    german: 'Bitte sehr',
    english: 'You\'re welcome',
    category: 'Alltag',
    difficulty: 'A1',
    tags: ['polite', 'response'],
    exampleSentence: 'Bitte sehr, gern geschehen!',
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNextPractice = () => {
    setCurrentPracticeIndex((prev) => (prev + 1) % PRACTICE_WORDS.length);
  };

  const handlePrevPractice = () => {
    setCurrentPracticeIndex((prev) => (prev - 1 + PRACTICE_WORDS.length) % PRACTICE_WORDS.length);
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
    );
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
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#C9A86C] to-[#D4A574]">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h1 className="font-display text-lg sm:text-xl tracking-tight text-gradient-gold">
                  <span className="hidden sm:inline">DEUTSCH</span>LERNEN
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
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
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
              <TabsList className="inline-flex h-12 rounded-none bg-transparent p-0">
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#C9A86C] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap"
                >
                  <UserCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Profil</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="learn" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#C9A86C] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap"
                >
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Lernen</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="pronunciation" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#C9A86C] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap"
                >
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Aussprache</span>
                  <span className="text-xs sm:text-sm font-medium sm:hidden">Audio</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="sentences" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#C9A86C] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap"
                >
                  <Puzzle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Sätze</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="quiz" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#C9A86C] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap"
                >
                  <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Quiz</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="levels" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#C9A86C] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap"
                >
                  <Map className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Level</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-1 sm:gap-2 rounded-none border-b-2 border-transparent px-3 sm:px-4 data-[state=active]:border-[#C9A86C] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 whitespace-nowrap"
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
              <UserProfile />
            </TabsContent>

            {/* Learn Tab */}
            <TabsContent value="learn" className="mt-0 w-full">
              <DailyLearning userLevel={1} />
            </TabsContent>

            {/* Pronunciation Tab */}
            <TabsContent value="pronunciation" className="mt-0 w-full px-3 sm:px-4 py-4">
              <div className="mx-auto max-w-2xl space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrevPractice} className="text-xs sm:text-sm">
                    ← Vorherige
                  </Button>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {currentPracticeIndex + 1} / {PRACTICE_WORDS.length}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleNextPractice} className="text-xs sm:text-sm">
                    Nächste →
                  </Button>
                </div>
                <PronunciationPractice 
                  word={PRACTICE_WORDS[currentPracticeIndex]} 
                  onNext={handleNextPractice}
                  hasNext={true}
                />
              </div>
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
              <LevelMap currentXP={150} onSelectLevel={(level) => console.log('Selected:', level)} />
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
      <footer className="border-t border-border py-4 sm:py-6 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground px-4">
          DEUTSCHLERNEN - Lerne Deutsch jeden Tag
        </p>
      </footer>
    </div>
  );
}
