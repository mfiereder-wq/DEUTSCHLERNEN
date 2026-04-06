'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/theme-toggle';
import { DailyLearning } from '@/components/daily-learning';
import { PronunciationPractice } from '@/components/pronunciation-practice';
import { SyncManagerCard } from '@/components/sync-manager';
import { PWAInfoCard } from '@/components/pwa-install';

// Mock user progress
const MOCK_USER = {
  level: 1,
  xp: 0,
  streak: 0,
  wordsLearned: 0,
};

// Sample word for pronunciation practice
const SAMPLE_WORD = {
  id: 'sample-1',
  german: 'Guten Morgen',
  english: 'Good morning',
  category: 'Alltag',
  difficulty: 'A1' as const,
  tags: ['greeting', 'morning'],
  exampleSentence: 'Guten Morgen! Wie geht es dir?',
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background noise-texture">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#C9A86C] to-[#D4A574]">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-display text-xl tracking-tight text-gradient-gold">
                  DEUTSCHLERNEN
                </h1>
              </div>
            </motion.div>

            {/* Right side */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <div className="mb-6 flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 rounded-xl bg-muted p-1">
              <TabsTrigger 
                value="learn" 
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Lernen</span>
              </TabsTrigger>
              <TabsTrigger 
                value="pronunciation" 
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Aussprache</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Einstellungen</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {/* Learn Tab */}
            <TabsContent value="learn" className="mt-0">
              <DailyLearning userLevel={MOCK_USER.level} />
            </TabsContent>

            {/* Pronunciation Tab */}
            <TabsContent value="pronunciation" className="mt-0">
              <div className="mx-auto max-w-2xl">
                <PronunciationPractice word={SAMPLE_WORD} />
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2">
                <PWAInfoCard />
                <SyncManagerCard />
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <p>DEUTSCHLERNEN - Lerne Deutsch jeden Tag</p>
      </footer>
    </div>
  );
}
