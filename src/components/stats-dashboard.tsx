'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, BookOpen, Brain, Target, Award,
  Calendar, BarChart3, PieChart, Zap, Flame
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProgress } from '@/lib/progress-store';
import { getCurrentLevel, getLevelProgress, LEVELS } from '@/lib/level-system';
import { EXTENDED_VOCABULARY } from '@/data/extended-vocabulary';
import { getSRSStats, loadSRSCards } from '@/lib/srs-system';

export function StatsDashboard() {
  const progress = getProgress();
  const currentLevel = getCurrentLevel(progress.xp);
  const { next, progress: levelProgress } = getLevelProgress(progress.xp);
  const srsCards = typeof window !== 'undefined' ? loadSRSCards() : [];
  const srsStats = getSRSStats(srsCards);

  const categoryStats = useMemo(() => {
    const cats = [...new Set(EXTENDED_VOCABULARY.map(w => w.category))];
    return cats.map(cat => ({
      name: cat,
      total: EXTENDED_VOCABULARY.filter(w => w.category === cat).length,
      learned: progress.completedWords.filter(id =>
        EXTENDED_VOCABULARY.find(w => w.id === id && w.category === cat)
      ).length,
    })).sort((a, b) => b.total - a.total);
  }, [progress.completedWords]);

  const difficultyStats = useMemo(() => {
    return (['A1', 'A2', 'B1'] as const).map(diff => ({
      name: diff,
      total: EXTENDED_VOCABULARY.filter(w => w.difficulty === diff).length,
      learned: progress.completedWords.filter(id =>
        EXTENDED_VOCABULARY.find(w => w.id === id && w.difficulty === diff)
      ).length,
    }));
  }, [progress.completedWords]);

  const totalWords = EXTENDED_VOCABULARY.length;
  const wordsLearned = progress.completedWords.length;
  const wordsPercent = Math.round((wordsLearned / totalWords) * 100);

  return (
    <div className="space-y-6">
      {/* XP & Level Card */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 mx-auto mb-2 text-[#F26B5E]" />
            <div className="text-2xl font-bold font-display">{progress.xp}</div>
            <div className="text-xs text-muted-foreground">XP gesamt</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-[#168C8C]" />
            <div className="text-2xl font-bold font-display">{currentLevel.difficulty}</div>
            <div className="text-xs text-muted-foreground">Niveau</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold font-display">{progress.streak}</div>
            <div className="text-xs text-muted-foreground">Tage Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-emerald-500" />
            <div className="text-2xl font-bold font-display">{wordsLearned}</div>
            <div className="text-xs text-muted-foreground">von {totalWords} Wörtern</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      {next && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="h-4 w-4" />Level-Fortschritt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-1">
              <span>{currentLevel.name} ({currentLevel.difficulty})</span>
              <span className="text-muted-foreground">{progress.xp} / {next.requiredXP} XP</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-1">Nächster Level: {next.name} — noch {(next.requiredXP - progress.xp).toLocaleString()} XP</p>
          </CardContent>
        </Card>
      )}

      {/* Tabs: Kategorien, Schwierigkeit, SRS */}
      <Tabs defaultValue="categories">
        <TabsList className="w-full">
          <TabsTrigger value="categories" className="flex-1"><PieChart className="h-4 w-4 mr-1" />Kategorien</TabsTrigger>
          <TabsTrigger value="difficulty" className="flex-1"><BarChart3 className="h-4 w-4 mr-1" />Niveau</TabsTrigger>
          <TabsTrigger value="srs" className="flex-1"><Brain className="h-4 w-4 mr-1" />SRS</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-4 space-y-3">
          {categoryStats.map(cat => (
            <div key={cat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{cat.name}</span>
                <span className="text-muted-foreground">{cat.learned}/{cat.total}</span>
              </div>
              <Progress value={cat.total > 0 ? (cat.learned / cat.total) * 100 : 0} className="h-2" />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="difficulty" className="mt-4 space-y-3">
          {difficultyStats.map(diff => (
            <div key={diff.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{diff.name}</span>
                <span className="text-muted-foreground">{diff.learned}/{diff.total}</span>
              </div>
              <Progress value={diff.total > 0 ? (diff.learned / diff.total) * 100 : 0} className="h-2" />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="srs" className="mt-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-xl font-bold text-[#F26B5E]">{srsStats.total}</div>
              <div className="text-xs text-muted-foreground">Karten</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-xl font-bold text-orange-500">{srsStats.due}</div>
              <div className="text-xs text-muted-foreground">Fällig</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-xl font-bold text-emerald-500">{srsStats.mastered}</div>
              <div className="text-xs text-muted-foreground">Gemeistert</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sentence & Quiz stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="h-5 w-5 mx-auto mb-1 text-amber-500" />
            <div className="text-xl font-bold">{progress.completedSentences.length}</div>
            <div className="text-xs text-muted-foreground">Sätze gelöst</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="h-5 w-5 mx-auto mb-1 text-purple-500" />
            <div className="text-xl font-bold">{progress.completedQuizzes.length}</div>
            <div className="text-xs text-muted-foreground">Quiz-Fragen</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StatsDashboard;