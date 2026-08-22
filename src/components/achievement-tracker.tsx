'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Star, Zap, Flame, BookOpen, Brain, Mic, Clock, Sun, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ACHIEVEMENTS,
  checkAchievements,
  loadAchievements,
  saveAchievements,
  unlockAchievement,
  Achievement,
} from '@/lib/achievement-system';
import { useToast } from '@/hooks/use-toast';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  '🔥': Flame,
  '⚡': Zap,
  '🏆': Trophy,
  '👑': Award,
  '📚': BookOpen,
  '📖': BookOpen,
  '🎓': Award,
  '🧠': Brain,
  '❓': Award,
  '💯': Star,
  '📈': Award,
  '🌟': Star,
  '🎖️': Trophy,
  '✍️': Award,
  '🎤': Mic,
  '🦉': Moon,
  '🌅': Sun,
};

export function AchievementTracker() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    const loaded = loadAchievements();
    setAchievements(loaded);
  }, []);

  const progressData = {
    streak: 7, // Would come from actual tracking
    wordsLearned: 45,
    quizzesCompleted: 12,
    currentLevel: 3,
    sentencesCompleted: 8,
    pronunciationSessions: 15,
  };

  useEffect(() => {
    const updated = checkAchievements(progressData);
    setAchievements(updated);
    saveAchievements(updated);

    // Check for newly unlocked achievements
    const newlyUnlocked = updated.filter(
      (a, i) => a.unlocked && !ACHIEVEMENTS[i].unlocked
    );
    newlyUnlocked.forEach((achievement) => {
      toast({
        title: '🎉 Erfolg freigeschaltet!',
        description: `${achievement.icon} ${achievement.name}`,
        duration: 4000,
      });
    });
  }, []);

  const filteredAchievements = achievements.filter((achievement) => {
    if (showUnlockedOnly && !achievement.unlocked) return false;
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory)
      return false;
    return true;
  });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalProgress = Math.round((unlockedCount / achievements.length) * 100);

  const categories = [
    { id: 'all', name: 'Alle', icon: Award },
    { id: 'streak', name: 'Serien', icon: Flame },
    { id: 'vocabulary', name: 'Vokabeln', icon: BookOpen },
    { id: 'quiz', name: 'Quiz', icon: Brain },
    { id: 'level', name: 'Level', icon: Trophy },
    { id: 'special', name: 'Spezial', icon: Star },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#C9A86C]" />
            Erfolge & Auszeichnungen
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {unlockedCount}/{achievements.length} freigeschaltet
          </div>
        </div>
        <Progress value={totalProgress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="text-xs"
              >
                <Icon className="h-3 w-3 mr-1" />
                {cat.name}
              </Button>
            );
          })}
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={showUnlockedOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
            className="text-xs"
          >
            <Award className="h-3 w-3 mr-1" />
            Nur freigeschaltete
          </Button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement) => {
              const IconComponent = ICON_MAP[achievement.icon] || Award;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <Card
                    className={`relative overflow-hidden transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-[#C9A86C]/10 to-[#D4A574]/5 border-[#C9A86C]/30'
                        : 'bg-muted/30 opacity-60'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl ${
                            achievement.unlocked
                              ? 'bg-gradient-to-br from-[#C9A86C] to-[#D4A574] text-white shadow-lg'
                              : 'bg-muted text-muted-foreground grayscale'
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-semibold text-sm ${
                              achievement.unlocked
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {achievement.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {achievement.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Progress
                              value={
                                (achievement.progress / achievement.requirement) *
                                100
                              }
                              className="h-1.5 flex-1"
                            />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {achievement.progress}/{achievement.requirement}
                            </span>
                          </div>
                          {achievement.unlocked && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-[#C9A86C]">
                              <Star className="h-3 w-3" />
                              +{achievement.rewardXP} XP
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Keine Erfolge in dieser Kategorie</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AchievementTracker;
