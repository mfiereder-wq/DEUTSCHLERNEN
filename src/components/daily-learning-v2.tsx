'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  RotateCcw, 
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Star,
  Circle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useDynamicContent } from '@/hooks/use-dynamic-content';
import { ExtendedVocabWord } from '@/data/extended-vocabulary';
import { WordList } from './word-card';
import { cn } from '@/lib/utils';

interface DailyLearningProps {
  userLevel: number;
  onComplete?: () => void;
}

// Error boundary wrapper
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingState />}>{children}</Suspense>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6 py-8">
      <div className="h-24 animate-shimmer rounded-2xl bg-muted" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 animate-shimmer rounded-xl bg-muted" />
        ))}
      </div>
      <div className="h-96 animate-shimmer rounded-2xl bg-muted" />
    </div>
  );
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
  const [showCelebration, setShowCelebration] = useState(false);

  const handleLearnWord = (wordId: string) => {
    setLearnedToday(prev => {
      const newSet = new Set([...prev, wordId]);
      if (newSet.size > prev.length) {
        learnWords([wordId]);
        
        // Check for completion
        const progress = (newSet.size / newWords.length) * 100;
        if (progress === 100 && newWords.length > 0) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      }
      return [...newSet];
    });
  };

  const progress = newWords.length > 0 
    ? Math.round((learnedToday.length / newWords.length) * 100) 
    : 0;

  const today = new Date();
  const dateStr = today.toLocaleDateString('de-DE', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="relative min-h-screen pb-24">
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 360, 720] }}
                transition={{ duration: 1.5 }}
                className="mb-4"
              >
                <Trophy className="mx-auto h-20 w-20 text-[#C9A86C]" />
              </motion.div>
              <h3 className="font-display text-3xl mb-2">Tagesziel erreicht!</h3>
              <p className="text-muted-foreground">
                Perfekte Arbeit! Du hast alle heutigen Wörter gelernt.
              </p>
              {streakBonus.multiplier > 1 && (
                <p className="mt-2 text-[#C9A86C] font-medium">
                  +{Math.round(streakBonus.multiplier * 100)}% XP Bonus!
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-8 space-y-6">
        {/* Date & Title */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <Calendar className="h-4 w-4" />
            <span className="capitalize">{dateStr}</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl mb-2"
          >
            <span className="text-gradient-gold">Tägliches Deutsch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="subheadline text-lg text-muted-foreground"
          >
            Thema des Tages: {theme.name} {theme.icon}
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 stagger-children"
        >
          <StatCard
            icon={<Flame className="h-5 w-5" />}
            iconColor="text-orange-500"
            label="Streak"
            value={`${streak}`}
            subtext={streak > 0 ? 'Tage' : 'Starte heute!'}
            trend={streak > 7 ? '+Hot!' : undefined}
          />
          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            iconColor="text-[#C9A86C]"
            label="Gelernt"
            value={totalLearned.toString()}
            subtext="Wörter gesamt"
          />
          <StatCard
            icon={<Sparkles className="h-5 w-5" />}
            iconColor="text-amber-500"
            label="Neu heute"
            value={newWords.length.toString()}
            subtext="Verfügbar"
            highlight
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            iconColor="text-emerald-500"
            label="Fortschritt"
            value={`${progress}%`}
            subtext="Heute"
            progress={progress}
          />
        </motion.div>

        {/* Progress bar for today */}
        {newWords.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl bg-muted/50 p-4"
          >
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">Tagesfortschritt</span>
              <span className="text-muted-foreground">
                {learnedToday.length} / {newWords.length} Wörter
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#C9A86C] to-[#D4A574]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}

        {/* Theme card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="overflow-hidden rounded-2xl border border-[#C9A86C]/20 bg-gradient-to-br from-[#FFFCF7] to-[#F5EDE4] p-6"
        >
          <div className="flex items-center gap-4">
            <div 
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-warm"
              style={{ backgroundColor: theme.color }}
            >
              {theme.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Heutiges Thema</p>
              <h2 className="font-display text-2xl">{theme.name}</h2>
              <p className="text-sm text-muted-foreground">
                {themeWords.length} neue Vokabeln zu entdecken
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Learning Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="inline-flex w-full justify-start rounded-xl bg-muted/50 p-1">
              <TabsTrigger 
                value="new" 
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span>Neue Wörter</span>
                {newWords.length > 0 && (
                  <span className="ml-1 rounded-full bg-[#C9A86C]/20 px-2 py-0.5 text-xs text-[#C9A86C]">
                    {newWords.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="theme" 
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                {theme.icon}
                <span className="hidden sm:inline">{theme.name}</span>
                <span className="sm:hidden">Thema</span>
                <span className="ml-1 rounded-full bg-[#C9A86C]/20 px-2 py-0.5 text-xs text-[#C9A86C]">
                  {themeWords.length}
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="review" 
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Wiederholen</span>
                {reviewWords.length > 0 && (
                  <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                    {reviewWords.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* New Words Tab */}
          <TabsContent value="new" className="mt-6">
            {newWords.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl">Heute zu lernen</h3>
                  {learnedToday.length > 0 && (
                    <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {learnedToday.length} gelernt
                    </Badge>
                  )}
                </div>
                <WordList 
                  words={newWords}
                  learnedIds={learnedToday}
                  onLearn={handleLearnWord}
                  variant="default"
                />
              </div>
            ) : (
              <EmptyState
                icon={<CheckCircle2 className="h-16 w-16 text-emerald-500" />}
                title="Alles gelernt!"
                description="Du hast alle heutigen Wörter gelernt. Komm morgen für neue zurück!"
              />
            )}
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme" className="mt-6">
            {themeWords.length > 0 ? (
              <div className="space-y-4">
                <div 
                  className="rounded-xl p-4"
                  style={{ backgroundColor: `${theme.color}15` }}
                >
                  <h3 className="font-display text-xl" style={{ color: theme.color }}>
                    {theme.name} Thema
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Spezialisierte Vokabeln zum heutigen Thema entdecken
                  </p>
                </div>
                <WordList 
                  words={themeWords.slice(0, 12)}
                  learnedIds={learnedToday}
                  onLearn={handleLearnWord}
                  variant="compact"
                />
              </div>
            ) : (
              <EmptyState
                icon={<Circle className="h-16 w-16 text-muted-foreground" />}
                title="Keine Themenwörter"
                description="Lade die App neu, um neue Vokabeln zu erhalten."
              />
            )}
          </TabsContent>

          {/* Review Tab */}
          <TabsContent value="review" className="mt-6">
            {reviewWords.length > 0 ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-[#C9A86C]/20 bg-[#C9A86C]/5 p-4">
                  <h3 className="font-display text-xl mb-2">
                    Zeit für Wiederholung
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Diese Wörter hast du schon gelernt - lass sie uns auffrischen!
                  </p>
                </div>
                <WordList 
                  words={reviewWords}
                  learnedIds={learnedToday}
                  onLearn={handleLearnWord}
                  variant="compact"
                />
              </div>
            ) : (
              <EmptyState
                icon={<Star className="h-16 w-16 text-[#C9A86C]" />}
                title="Gute Arbeit!"
                description="Keine Wiederholungen nötig. Du hast alles im Griff!"
              />
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Floating action button for mobile */}
      {progress < 100 && newWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-4 z-40 sm:hidden"
        >
          <div className="flex flex-col items-end gap-2">
            {streakBonus.multiplier > 1 && (
              <span className="rounded-full bg-gradient-to-r from-[#C9A86C] to-[#D4A574] px-3 py-1 text-xs font-medium text-white shadow-lg">
                {streakBonus.message}
              </span>
            )}
            <Button
              size="lg"
              className="btn-primary-german h-14 w-14 rounded-full shadow-elevated"
              onClick={() => {
                const nextWord = newWords.find(w => !learnedToday.includes(w.id));
                if (nextWord) {
                  document.getElementById(`word-${nextWord.id}`)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <GraduationCap className="h-6 w-6" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  icon, 
  iconColor,
  label, 
  value, 
  subtext,
  highlight,
  progress,
  trend,
}: { 
  icon: React.ReactNode; 
  iconColor: string;
  label: string; 
  value: string; 
  subtext?: string;
  highlight?: boolean;
  progress?: number;
  trend?: string;
}) {
  return (
    <Card className={cn(
      'relative overflow-hidden transition-all hover:shadow-warm',
      highlight && 'border-[#C9A86C]/30'
    )}>
      <div className={cn(
        'absolute left-0 top-0 h-full w-1',
        iconColor.replace('text', 'bg')
      )} />
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-display text-2xl">{value}</p>
          </div>
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-muted', iconColor)}>
            {icon}
          </div>
        </div>
        {progress !== undefined && progress > 0 && (
          <div className="mt-2">
            <div className="h-1 overflow-hidden rounded-full bg-muted">
              <motion.div 
                className={cn('h-full', iconColor.replace('text', 'bg'))}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
        {subtext && (
          <p className="mt-2 text-xs text-muted-foreground">{subtext}</p>
        )}
        {trend && (
          <Badge variant="secondary" className="mt-2 text-xs">
            {trend}
          </Badge>
        )}
      </CardContent>
    </Card>
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
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/25 bg-muted/25 p-8 text-center"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="font-display text-xl mb-2">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export default DailyLearning;
