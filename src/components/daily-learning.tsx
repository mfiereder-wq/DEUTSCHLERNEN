'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  RotateCcw, 
  Sparkles,
  Trophy,
  Flame,
  ChevronRight,
  CheckCircle2,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useDynamicContent } from '@/hooks/use-dynamic-content';
import { NewContentBanner, DailyThemeCard } from './new-content-banner';
import { ExtendedVocabWord } from '@/data/extended-vocabulary';

interface DailyLearningProps {
  userLevel: number;
  onComplete?: () => void;
}

export function DailyLearning({ userLevel, onComplete }: DailyLearningProps) {
  const {
    newWords,
    themeWords,
    reviewWords,
    streak,
    streakBonus,
    totalLearned,
    isLoading,
    learnWords,
    theme,
  } = useDynamicContent(userLevel);

  const [learnedToday, setLearnedToday] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('new');

  const handleLearnWord = (wordId: string) => {
    setLearnedToday(prev => {
      const newSet = new Set([...prev, wordId]);
      if (newSet.size > prev.length) {
        learnWords([wordId]);
      }
      return [...newSet];
    });
  };

  const progress = newWords.length > 0 
    ? Math.round((learnedToday.length / newWords.length) * 100) 
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-24 animate-pulse rounded-xl bg-muted" />
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* New Content Banner */}
      <NewContentBanner 
        userLevel={userLevel} 
        onViewNewWords={() => setActiveTab('new')} 
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon={<Flame className="h-5 w-5 text-orange-500" />}
          label="Streak"
          value={`${streak} Tage`}
          subtext={streakBonus.message}
        />
        <StatCard
          icon={<BookOpen className="h-5 w-5 text-blue-500" />}
          label="Gelernt"
          value={totalLearned.toString()}
          subtext="Wörter"
        />
        <StatCard
          icon={<Sparkles className="h-5 w-5 text-yellow-500" />}
          label="Neu heute"
          value={newWords.length.toString()}
          subtext="Verfügbar"
        />
        <StatCard
          icon={<Trophy className="h-5 w-5 text-purple-500" />}
          label="Fortschritt"
          value={`${progress}%`}
          subtext="Heute"
        />
      </div>

      {/* Daily Theme Card */}
      <DailyThemeCard />

      {/* Learning Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex w-full justify-start bg-muted/50 p-1">
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Neue Wörter</span>
              <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5">
                {newWords.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">{theme.name}</span>
              <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5">
                {themeWords.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="review" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Wiederholen</span>
              <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5">
                {reviewWords.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* New Words Tab */}
        <TabsContent value="new" className="mt-4 space-y-4">
          {progress > 0 && (
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Tagesziel</span>
                <span className="font-medium">{learnedToday.length} / {newWords.length}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newWords.map((word, index) => (
              <WordCard
                key={word.id}
                word={word}
                index={index}
                isLearned={learnedToday.includes(word.id)}
                onLearn={() => handleLearnWord(word.id)}
              />
            ))}
          </div>

          {newWords.length === 0 && (
            <EmptyState
              icon={<CheckCircle2 className="h-12 w-12 text-green-500" />}
              title="Alles gelernt!"
              description="Du hast alle heutigen Wörter gelernt. Komm morgen für neue zurück!"
            />
          )}
        </TabsContent>

        {/* Theme Words Tab */}
        <TabsContent value="theme" className="mt-4 space-y-4">
          <div 
            className="mb-4 rounded-lg p-4"
            style={{ backgroundColor: `${theme.color}15` }}
          >
            <h3 className="font-semibold">Thema: {theme.name} {theme.icon}</h3>
            <p className="text-sm text-muted-foreground">
              Spezialisierte Vokabeln zum heutigen Thema
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {themeWords.slice(0, 12).map((word, index) => (
              <WordCard
                key={word.id}
                word={word}
                index={index}
                isLearned={learnedToday.includes(word.id)}
                onLearn={() => handleLearnWord(word.id)}
                showDifficulty
              />
            ))}
          </div>
        </TabsContent>

        {/* Review Tab */}
        <TabsContent value="review" className="mt-4 space-y-4">
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:bg-amber-950/20">
            <h3 className="font-semibold text-amber-800 dark:text-amber-200">
              Zeit für Wiederholung
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Diese Wörter hast du schon gelernt - lass sie uns auffrischen!
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviewWords.map((word, index) => (
              <WordCard
                key={word.id}
                word={{ ...word, isNew: false }}
                index={index}
                isLearned={learnedToday.includes(word.id)}
                onLearn={() => handleLearnWord(word.id)}
                isReview
              />
            ))}
          </div>

          {reviewWords.length === 0 && (
            <EmptyState
              icon={<Star className="h-12 w-12 text-amber-500" />}
              title="Gute Arbeit!"
              description="Keine Wiederholungen nötig. Du hast alles im Griff!"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  icon, 
  label, 
  value, 
  subtext 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  subtext?: string;
}) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-lg font-bold leading-tight">{value}</p>
            {subtext && (
              <p className="truncate text-xs text-muted-foreground">{subtext}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Word Card Component
function WordCard({
  word,
  index,
  isLearned,
  onLearn,
  showDifficulty = false,
  isReview = false,
}: {
  word: ExtendedVocabWord;
  index: number;
  isLearned: boolean;
  onLearn: () => void;
  showDifficulty?: boolean;
  isReview?: boolean;
}) {
  const difficultyColor = {
    A1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    A2: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    B1: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    B2: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
    C1: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  }[word.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`group relative transition-all hover:shadow-lg ${
        isLearned ? 'border-green-500/50 bg-green-500/5' : ''
      }`}>
        <CardContent className="p-4">
          {/* Markers */}
          <div className="absolute right-3 top-3 flex gap-1">
            {word.isNew && !isReview && (
              <Badge className="bg-[#fbbf24] text-xs text-black hover:bg-[#fbbf24]">
                NEU
              </Badge>
            )}
            {isReview && (
              <Badge variant="secondary" className="text-xs">
                <RotateCcw className="mr-1 h-3 w-3" />
                Review
              </Badge>
            )}
            {showDifficulty && (
              <Badge className={`text-xs ${difficultyColor}`}>
                {word.difficulty}
              </Badge>
            )}
          </div>

          {/* Word Content */}
          <div className="pt-2">
            <h4 className="text-lg font-bold">{word.german}</h4>
            <p className="text-sm text-muted-foreground">{word.english}</p>
            
            {word.exampleSentence && (
              <p className="mt-2 text-xs italic text-muted-foreground">
                &quot;{word.exampleSentence}&quot;
              </p>
            )}

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1">
              {word.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Learn Button */}
            <Button
              size="sm"
              variant={isLearned ? "outline" : "default"}
              onClick={onLearn}
              className={`mt-4 w-full transition-all ${
                isLearned 
                  ? 'border-green-500 text-green-600 hover:bg-green-50' 
                  : ''
              }`}
            >
              {isLearned ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Gelernt
                </>
              ) : (
                <>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Lernen
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Empty State Component
function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
