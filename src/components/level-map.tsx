'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Star, 
  Trophy, 
  ChevronRight,
  Target,
  Zap,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  LEVELS, 
  Level, 
  getLevelProgress, 
  XP_REWARDS,
  getCurrentLevel 
} from '@/lib/level-system';

interface LevelMapProps {
  currentXP: number;
  onSelectLevel?: (level: Level) => void;
}

export function LevelMap({ currentXP, onSelectLevel }: LevelMapProps) {
  const { current, next, progress } = getLevelProgress(currentXP);
  const [animateItems, setAnimateItems] = useState<number[]>([]);

  useEffect(() => {
    // Animate level items sequentially
    const timer = setTimeout(() => {
      setAnimateItems(LEVELS.map(l => l.id));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Current Progress Card */}
      <Card className="bg-gradient-to-br from-[#C9A86C]/10 to-[#D4A574]/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-display">Level {current.id}</h2>
              <p className="text-muted-foreground text-sm">{current.name}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#C9A86C]">{currentXP}</div>
              <div className="text-xs text-muted-foreground">Total XP</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fortschritt</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            {next && (
              <p className="text-xs text-muted-foreground text-center">
                {next.requiredXP - currentXP} XP bis Level {next.id}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Level Grid */}
      <div className="space-y-3">
        <h3 className="font-medium text-muted-foreground flex items-center gap-2">
          <Target className="h-4 w-4" />
          Alle Level
        </h3>
        
        {LEVELS.map((level, index) => {
          const isUnlocked = currentXP >= level.requiredXP;
          const isCurrent = level.id === current.id;
          const isCompleted = currentXP >= (LEVELS.find(l => l.id === level.id + 1)?.requiredXP || Infinity);
          
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: animateItems.includes(level.id) ? 1 : 0, 
                x: animateItems.includes(level.id) ? 0 : -20 
              }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-md",
                  isCurrent && "ring-2 ring-[#C9A86C] ring-offset-2",
                  !isUnlocked && "opacity-60 cursor-not-allowed"
                )}
                onClick={() => isUnlocked && onSelectLevel?.(level)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Level Number / Icon */}
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center font-bold text-lg",
                      isCompleted 
                        ? "bg-green-500 text-white" 
                        : isCurrent 
                          ? "bg-[#C9A86C] text-black"
                          : isUnlocked 
                            ? "bg-muted text-foreground"
                            : "bg-muted/50 text-muted-foreground"
                    )}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : !isUnlocked ? (
                        <Lock className="h-5 w-5" />
                      ) : (
                        level.id
                      )}
                    </div>

                    {/* Level Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={cn(
                          "font-medium",
                          isCurrent && "text-[#C9A86C]"
                        )}>
                          {level.name}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            level.difficulty === 'A1' && "bg-green-100 text-green-800",
                            level.difficulty === 'A2' && "bg-amber-100 text-amber-800",
                            level.difficulty === 'B1' && "bg-orange-100 text-orange-800",
                          )}
                        >
                          {level.difficulty}
                        </Badge>
                        {isCurrent && (
                          <Badge className="bg-[#C9A86C] text-black text-xs">
                            Aktuell
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {level.description}
                      </p>
                      
                      {/* Content Preview */}
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {level.vocabularyCount} Wörter
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {level.sentenceCount} Sätze
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {level.quizCount} Quiz
                        </span>
                      </div>
                    </div>

                    {/* XP Required / Action */}
                    <div className="text-right">
                      {!isUnlocked ? (
                        <div className="text-xs text-muted-foreground">
                          <Zap className="h-4 w-4 mx-auto mb-1 text-[#C9A86C]" />
                          {level.requiredXP} XP
                        </div>
                      ) : isCompleted ? (
                        <div className="text-green-500">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* XP Rewards Info */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-[#C9A86C]" />
            XP verdienen
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wort gelernt</span>
              <span className="font-medium text-[#C9A86C]">+{XP_REWARDS.WORD_LEARNED}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Satz richtig</span>
              <span className="font-medium text-[#C9A86C]">+{XP_REWARDS.SENTENCE_CORRECT}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quiz richtig</span>
              <span className="font-medium text-[#C9A86C]">+{XP_REWARDS.QUIZ_CORRECT}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Level abschließen</span>
              <span className="font-medium text-[#C9A86C]">+{XP_REWARDS.LEVEL_COMPLETE}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LevelMap;
