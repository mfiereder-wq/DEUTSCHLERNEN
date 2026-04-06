'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, ChevronRight, Trophy, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number; // Index of correct answer
  explanation: string;
  category: 'Grammar' | 'Vocabulary' | 'Culture';
  difficulty: 'A1' | 'A2' | 'B1';
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Welcher Artikel gehört zu "Tisch"?',
    options: ['der', 'die', 'das', 'den'],
    correct: 0,
    explanation: '"Tisch" ist maskulin - der Tisch',
    category: 'Grammar',
    difficulty: 'A1',
  },
  {
    id: 'q2',
    question: 'Wie sagt man "Good morning" auf Deutsch?',
    options: ['Gute Nacht', 'Guten Morgen', 'Guten Tag', 'Auf Wiedersehen'],
    correct: 1,
    explanation: 'Guten Morgen = Good morning!',
    category: 'Vocabulary',
    difficulty: 'A1',
  },
  {
    id: 'q3',
    question: 'Welches Verb ist "to eat"?',
    options: ['trinken', 'schlafen', 'essen', 'laufen'],
    correct: 2,
    explanation: '"essen" bedeutet "to eat"',
    category: 'Vocabulary',
    difficulty: 'A1',
  },
  {
    id: 'q4',
    question: 'Wie fragt man höflich nach dem Weg?',
    options: ['Wo ist...?', 'Entschuldigung, wo ist...?', 'Wo?!', 'Zeig mal!'],
    correct: 1,
    explanation: '"Entschuldigung, wo ist...?" ist die höflichste Form',
    category: 'Culture',
    difficulty: 'A1',
  },
  {
    id: 'q5',
    question: 'Welches Wort ist falsch? "Ich ___ müde."',
    options: ['bin', 'bist', 'habe', 'fühle'],
    correct: 1,
    explanation: '"bist" ist für "du", nicht für "ich". Richtig: "Ich bin müde"',
    category: 'Grammar',
    difficulty: 'A2',
  },
  {
    id: 'q6',
    question: 'Was bedeutet "Zeit"?',
    options: ['Weather', 'Time', 'Money', 'Food'],
    correct: 1,
    explanation: '"Zeit" = "Time"',
    category: 'Vocabulary',
    difficulty: 'A1',
  },
  {
    id: 'q7',
    question: 'In Deutschland...',
    options: ['darf man überall rauchen', 'gibt es viele Recycling-Regeln', 'ist alles 24h geöffnet', 'muss man kein Trinkgeld geben'],
    correct: 1,
    explanation: 'Deutschland hat sehr strenge Recycling-Regeln!',
    category: 'Culture',
    difficulty: 'A2',
  },
  {
    id: 'q8',
    question: '"Wie geht es dir?" = ?',
    options: ['What is your name?', 'How are you?', 'Where are you?', 'How old are you?'],
    correct: 1,
    explanation: '"Wie geht es dir?" ist die informelle Art nach dem Befinden zu fragen',
    category: 'Vocabulary',
    difficulty: 'A1',
  },
  {
    id: 'q9',
    question: 'Welcher Satz ist korrekt?',
    options: [
      'Ich bin ein Mann.',
      'Ich bin die Mann.',
      'Ich bin der Mann.',
      'Ich bin Mann.'
    ],
    correct: 2,
    explanation: 'Maskuline Substantive brauchen "der" - also "der Mann"',
    category: 'Grammar',
    difficulty: 'A2',
  },
  {
    id: 'q10',
    question: 'Was ist das typisch deutsche Essen?',
    options: ['Pizza', 'Sushi', 'Sauerkraut', 'Tacos'],
    correct: 2,
    explanation: 'Sauerkraut (Sauerkraut) ist ein traditionelles deutsches Gericht!',
    category: 'Culture',
    difficulty: 'A1',
  },
];

export function QuizGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleOptionSelect = useCallback((index: number) => {
    if (showResult || gameFinished) return;
    setSelectedOption(index);
  }, [showResult, gameFinished]);

  const handleCheck = useCallback(() => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === currentQuestion.correct;
    setShowResult(true);
    
    if (correct) {
      setScore(s => s + 10 + (streak * 2));
      setStreak(s => {
        const newStreak = s + 1;
        setMaxStreak(m => Math.max(m, newStreak));
        return newStreak;
      });
      if (!completed.includes(currentQuestion.id)) {
        setCompleted(c => [...c, currentQuestion.id]);
      }
    } else {
      setStreak(0);
    }
  }, [selectedOption, currentQuestion.correct, currentQuestion.id, streak, completed]);

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    setShowResult(false);
    
    if (currentIndex >= QUIZ_QUESTIONS.length - 1) {
      setGameFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex]);

  const handleRetry = useCallback(() => {
    setSelectedOption(null);
    setShowResult(false);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setStreak(0);
    setCompleted([]);
    setGameFinished(false);
  }, []);

  const accuracy = completed.length > 0 
    ? Math.round((score / (completed.length * 10 + completed.reduce((acc, _, i) => acc + i * 2, 0))) * 100)
    : 0;

  if (gameFinished) {
    return (
      <Card className="w-full mx-auto max-w-2xl">
        <CardContent className="pt-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mb-4"
          >
            <Trophy className="h-16 w-16 mx-auto text-[#C9A86C]" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl font-display mb-2">Quiz beendet!</h2>
          <p className="text-muted-foreground mb-6">Tolle Leistung!</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="text-2xl font-bold text-[#C9A86C]">{score}</div>
              <div className="text-xs text-muted-foreground">Punkte</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="text-2xl font-bold text-[#B76E79]">{maxStreak}</div>
              <div className="text-xs text-muted-foreground">Beste Serie</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="text-2xl font-bold text-[#6B8E6B]">{completed.length}/{QUIZ_QUESTIONS.length}</div>
              <div className="text-xs text-muted-foreground">Richtig</div>
            </div>
          </div>
          
          <Button
            onClick={handleRestart}
            className="w-full bg-gradient-to-r from-[#C9A86C] to-[#D4A574] text-black hover:from-[#D4A574] hover:to-[#E5C58C]"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Nochmal spielen
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mx-auto max-w-2xl">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#C9A86C]" />
              Quiz Challenge
            </CardTitle>
            <CardDescription>
              Teste dein Wissen!
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {currentIndex + 1}/{QUIZ_QUESTIONS.length}
            </Badge>
            <Badge variant="outline" className="bg-[#C9A86C]/10">
              🔥 {streak}
            </Badge>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#C9A86C] to-[#D4A574] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
        
        {/* Difficulty & Category */}
        <div className="flex gap-2">
          <Badge variant="outline" className={cn(
            "text-xs",
            currentQuestion.difficulty === 'A1' && "bg-green-100 text-green-800",
            currentQuestion.difficulty === 'A2' && "bg-amber-100 text-amber-800",
            currentQuestion.difficulty === 'B1' && "bg-orange-100 text-orange-800",
          )}>
            {currentQuestion.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {currentQuestion.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question */}
        <div className="p-4 sm:p-6 bg-muted/50 rounded-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h3 className="text-lg sm:text-xl font-medium text-center leading-relaxed">
                {currentQuestion.question}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={`${currentQuestion.id}-${option}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleOptionSelect(index)}
              disabled={showResult}
              className={cn(
                "p-4 rounded-xl border-2 text-left font-medium transition-all duration-200",
                showResult
                  ? index === currentQuestion.correct
                    ? "border-green-500 bg-green-100 text-green-900 dark:bg-green-900/50 dark:text-green-100"
                    : index === selectedOption
                      ? "border-red-500 bg-red-100 text-red-900 dark:bg-red-900/50 dark:text-red-100"
                      : "border-muted bg-muted/30 text-muted-foreground"
                  : selectedOption === index
                    ? "border-[#C9A86C] bg-[#C9A86C] text-black shadow-md"
                    : "border-border bg-card hover:border-[#C9A86C]/50 hover:shadow-sm"
              )}
            >
              <span className="inline-block w-6 h-6 rounded-full bg-muted-foreground/20 text-center text-sm mr-3">
                {String.fromCharCode(97 + index)}
              </span>
              {option}
            </motion.button>
          ))}
        </div>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-4 rounded-xl",
                selectedOption === currentQuestion.correct
                  ? "bg-green-50 border border-green-200 dark:bg-green-900/30 dark:border-green-800"
                  : "bg-red-50 border border-red-200 dark:bg-red-900/30 dark:border-red-800"
              )}
            >
              <div className="flex items-start gap-3">
                {selectedOption === currentQuestion.correct ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={cn(
                    "font-semibold mb-1",
                    selectedOption === currentQuestion.correct
                      ? "text-green-800 dark:text-green-200"
                      : "text-red-800 dark:text-red-200"
                  )}>
                    {selectedOption === currentQuestion.correct ? 'Richtig!' : 'Das war nicht ganz richtig'}
                  </h4>
                  <p className={cn(
                    "text-sm",
                    selectedOption === currentQuestion.correct
                      ? "text-green-700 dark:text-green-300"
                      : "text-red-700 dark:text-red-300"
                  )}>
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {!showResult ? (
            <Button
              onClick={handleCheck}
              disabled={selectedOption === null}
              className="w-full bg-gradient-to-r from-[#C9A86C] to-[#D4A574] text-black hover:from-[#D4A574] hover:to-[#E5C58C]
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Antwort prüfen
            </Button>
          ) : (
            <>
              {selectedOption !== currentQuestion.correct && (
                <Button
                  variant="outline"
                  onClick={handleRetry}
                  className="flex-1"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Erneut versuchen
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-[#6B8E6B] to-[#5A7A5A] text-white hover:from-[#7A9E7A] hover:to-[#6A8A6A]"
              >
                {currentIndex >= QUIZ_QUESTIONS.length - 1 ? (
                  <>
                    <Trophy className="mr-2 h-4 w-4" />
                    Ergebnis anzeigen
                  </>
                ) : (
                  <>
                    Nächste Frage
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default QuizGame;
