'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Clock, 
  Trophy, 
  Flame, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  XCircle,
  RotateCcw,
  Star,
  Zap,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  loadSRSCards, 
  saveSRSCards, 
  updateCardAfterReview, 
  getSRSStats,
  getWordsForTodaySession,
  SRSReview,
  SRSCard
} from '@/lib/srs-system';
import { EXTENDED_VOCABULARY, ExtendedVocabWord } from '@/data/extended-vocabulary';

interface SRSPracticeProps {
  onComplete?: (wordsReviewed: number) => void;
}

type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

export function SRSPractice({ onComplete }: SRSPracticeProps) {
  const [cards, setCards] = useState<SRSReview[]>([]);
  const [currentCard, setCurrentCard] = useState<SRSCard | null>(null);
  const [sessionWords, setSessionWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  
  const { toast } = useToast();

  // Initialize session
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    setIsLoading(true);
    
    try {
      // Load existing cards
      const loadedCards = loadSRSCards();
      setCards(loadedCards);
      
      // Get all word IDs
      const allWordIds = EXTENDED_VOCABULARY.map(w => w.id);
      
      // Get words for today's session
      const session = getWordsForTodaySession(loadedCards, allWordIds, 10, 20);
      
      // Combine due reviews and new words
      const wordIdsToReview = [
        ...session.due.map(c => c.wordId),
        ...session.new
      ];
      
      if (wordIdsToReview.length === 0) {
        setIsComplete(true);
        return;
      }
      
      setSessionWords(wordIdsToReview);
      
      // Set first card
      const firstWordId = wordIdsToReview[0];
      const existingCard = loadedCards.find(c => c.wordId === firstWordId);
      
      if (existingCard) {
        setCurrentCard({
          ...existingCard,
          due: true,
          daysUntilDue: 0
        });
      } else {
        // New word - create temporary card view
        setCurrentCard({
          wordId: firstWordId,
          interval: 0,
          easeFactor: 2.5,
          repetitions: 0,
          lastReviewed: new Date().toISOString(),
          nextReview: new Date().toISOString(),
          status: 'new',
          due: true,
          daysUntilDue: 0
        });
      }
    } catch (error) {
      console.error('Error initializing SRS session:', error);
      toast({
        title: 'Fehler',
        description: 'Konnte Sitzung nicht laden.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentWord = useCallback((): ExtendedVocabWord | undefined => {
    if (!currentCard) return undefined;
    return EXTENDED_VOCABULARY.find(w => w.id === currentCard.wordId);
  }, [currentCard]);

  const handleQualityRating = (quality: ReviewQuality) => {
    if (!currentCard) return;
    
    // Update card with new review data
    const updatedCards = updateCardAfterReview(cards, currentCard.wordId, quality);
    setCards(updatedCards);
    saveSRSCards(updatedCards);
    
    // Update session stats
    const isCorrect = quality >= 3;
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    
    // Move to next card or complete session
    if (currentIndex < sessionWords.length - 1) {
      const nextWordId = sessionWords[currentIndex + 1];
      const nextCard = updatedCards.find(c => c.wordId === nextWordId);
      
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
      
      if (nextCard) {
        setCurrentCard({
          ...nextCard,
          due: true,
          daysUntilDue: 0
        });
      } else {
        // New word
        setCurrentCard({
          wordId: nextWordId,
          interval: 0,
          easeFactor: 2.5,
          repetitions: 0,
          lastReviewed: new Date().toISOString(),
          nextReview: new Date().toISOString(),
          status: 'new',
          due: true,
          daysUntilDue: 0
        });
      }
    } else {
      // Session complete
      setIsComplete(true);
      onComplete?.(sessionStats.total + 1);
      
      toast({
        title: 'Sitzung abgeschlossen! 🎉',
        description: `Du hast ${sessionStats.total + 1} Wörter wiederholt.`,
      });
    }
  };

  const word = getCurrentWord();
  const progress = sessionWords.length > 0 
    ? ((currentIndex) / sessionWords.length) * 100 
    : 0;

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-2">
            <Brain className="h-6 w-6 animate-pulse text-primary" />
            <span className="text-lg font-medium">Lade Wiederholungen...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isComplete || sessionWords.length === 0) {
    const stats = getSRSStats(cards);
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600"
          >
            <Trophy className="h-10 w-10 text-white" />
          </motion.div>
          <CardTitle className="text-2xl">Sitzung Abgeschlossen!</CardTitle>
          <CardDescription>
            Du hast alle fälligen Wiederholungen erledigt.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <Brain className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Gesamt</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <Clock className="h-6 w-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{stats.due}</div>
              <div className="text-xs text-muted-foreground">Fällig</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{stats.mastered}</div>
              <div className="text-xs text-muted-foreground">Gemeistert</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <Target className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{Math.round(stats.averageEase * 20)}%</div>
              <div className="text-xs text-muted-foreground">Erfolg</div>
            </div>
          </div>
          
          <Button onClick={initializeSession} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Neue Sitzung Starten
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-warm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Intelligente Wiederholung</CardTitle>
          </div>
          <Badge variant="outline">
            {currentIndex + 1} / {sessionWords.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Flashcard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard?.wordId}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.3 }}
            className="perspective-1000"
          >
            <Card className={`min-h-[300px] cursor-pointer transition-all duration-300 ${
              showAnswer ? 'bg-gradient-to-br from-primary/5 to-accent/5' : ''
            }`}>
              <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                {word ? (
                  <>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="mb-2">
                        {word.category} • {word.difficulty}
                      </Badge>
                      <h3 className="text-3xl font-display font-bold text-foreground">
                        {word.german}
                      </h3>
                      {word.pronunciation && (
                        <p className="text-muted-foreground italic">
                          [{word.pronunciation}]
                        </p>
                      )}
                    </div>
                    
                    <AnimatePresence>
                      {showAnswer && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-4 pt-6 border-t"
                        >
                          <div>
                            <p className="text-xl font-semibold text-primary">
                              {word.english}
                            </p>
                          </div>
                          
                          {word.exampleSentence && (
                            <div className="bg-muted/50 rounded-lg p-4 text-left">
                              <p className="text-sm font-medium mb-1">Beispiel:</p>
                              <p className="text-muted-foreground italic">
                                "{word.exampleSentence}"
                              </p>
                            </div>
                          )}
                          
                          {word.synonyms && word.synonyms.length > 0 && (
                            <div className="flex flex-wrap gap-2 justify-center">
                              {word.synonyms.map(syn => (
                                <Badge key={syn} variant="outline">
                                  {syn}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <p className="text-muted-foreground">Wort wird geladen...</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        
        {/* Controls */}
        {!showAnswer ? (
          <Button 
            onClick={() => setShowAnswer(true)}
            className="w-full h-14 text-lg"
            size="lg"
          >
            <Zap className="h-5 w-5 mr-2" />
            Antwort Zeigen
          </Button>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={() => handleQualityRating(1)}
              variant="outline"
              className="h-14 border-red-500 text-red-600 hover:bg-red-50"
            >
              <XCircle className="h-5 w-5 mr-1" />
              <div className="text-left">
                <div className="text-xs">Vergessen</div>
                <div className="font-bold">1</div>
              </div>
            </Button>
            
            <Button
              onClick={() => handleQualityRating(3)}
              variant="outline"
              className="h-14 border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <RotateCcw className="h-5 w-5 mr-1" />
              <div className="text-left">
                <div className="text-xs">Schwer</div>
                <div className="font-bold">3</div>
              </div>
            </Button>
            
            <Button
              onClick={() => handleQualityRating(5)}
              variant="outline"
              className="h-14 border-green-500 text-green-600 hover:bg-green-50"
            >
              <CheckCircle className="h-5 w-5 mr-1" />
              <div className="text-left">
                <div className="text-xs">Perfekt</div>
                <div className="font-bold">5</div>
              </div>
            </Button>
          </div>
        )}
        
        {/* Session Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
          <div className="flex items-center gap-2">
            <Flame className={`h-4 w-4 ${sessionStats.correct > 0 ? 'text-orange-500' : ''}`} />
            <span>{sessionStats.correct} / {sessionStats.total} korrekt</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>Erfolgsrate: {sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
