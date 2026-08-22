'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, ChevronRight, Trophy, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { addXP, markQuizComplete } from '@/lib/progress-store';
import { XP_REWARDS } from '@/lib/level-system';
import { ExerciseImage } from '@/components/exercise-image';
import { EXTENDED_VOCABULARY, ExtendedVocabWord, shuffleArray, DifficultyLevel } from '@/data/extended-vocabulary';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: DifficultyLevel;
}

// Generate dynamic questions from vocabulary
function generateQuestions(count: number = 15, difficultyFilter?: DifficultyLevel): QuizQuestion[] {
  let pool = difficultyFilter
    ? EXTENDED_VOCABULARY.filter(w => w.difficulty === difficultyFilter)
    : EXTENDED_VOCABULARY;

  if (pool.length < 10) pool = EXTENDED_VOCABULARY;
  const selected = shuffleArray(pool).slice(0, count);
  const questions: QuizQuestion[] = [];

  for (const word of selected) {
    // Randomly pick question type
    const type = Math.random();

    if (type < 0.35) {
      // "What does [german] mean?"
      const wrongPool = EXTENDED_VOCABULARY.filter(w => w.id !== word.id);
      const wrongs = shuffleArray(wrongPool).slice(0, 3);
      const options = shuffleArray([word.english, ...wrongs.map(w => w.english)]);
      questions.push({
        id: `quiz-${word.id}-1`,
        question: `Was bedeutet "${word.german}" auf Englisch?`,
        options,
        correct: options.indexOf(word.english),
        explanation: `"${word.german}" = "${word.english}" (${word.category})`,
        category: word.category,
        difficulty: word.difficulty,
      });
    } else if (type < 0.65) {
      // "What is the German word for [english]?"
      const wrongPool = EXTENDED_VOCABULARY.filter(w => w.id !== word.id);
      const wrongs = shuffleArray(wrongPool).slice(0, 3);
      const options = shuffleArray([word.german, ...wrongs.map(w => w.german)]);
      questions.push({
        id: `quiz-${word.id}-2`,
        question: `Wie sagt man "${word.english}" auf Deutsch?`,
        options,
        correct: options.indexOf(word.german),
        explanation: `"${word.english}" = "${word.german}" (${word.category})`,
        category: word.category,
        difficulty: word.difficulty,
      });
    } else {
      // "Which category does [german] belong to?"
      const categories = [...new Set(EXTENDED_VOCABULARY.map(w => w.category))];
      const wrongCats = shuffleArray(categories.filter(c => c !== word.category)).slice(0, 3);
      const options = shuffleArray([word.category, ...wrongCats]);
      questions.push({
        id: `quiz-${word.id}-3`,
        question: `Zu welcher Kategorie gehört "${word.german}"?`,
        options,
        correct: options.indexOf(word.category),
        explanation: `"${word.german}" gehört zur Kategorie "${word.category}"`,
        category: word.category,
        difficulty: word.difficulty,
      });
    }
  }

  return questions;
}

const GRAMMAR_QUESTIONS: QuizQuestion[] = [
  { id: 'gram-1', question: 'Welcher Artikel gehört zu "Tisch"?', options: ['der', 'die', 'das', 'den'], correct: 0, explanation: '"Tisch" ist maskulin — der Tisch', category: 'Grammatik', difficulty: 'A1' },
  { id: 'gram-2', question: '"Ich ___ müde." — Welches Wort passt?', options: ['bin', 'bist', 'habe', 'ist'], correct: 0, explanation: '1. Person Singular von "sein" = "bin"', category: 'Grammatik', difficulty: 'A1' },
  { id: 'gram-3', question: 'Welcher Satz ist korrekt?', options: ['Ich bin ein Mann.', 'Ich bin der Mann.', 'Ich bin Mann.', 'Ich bin die Mann.'], correct: 1, explanation: 'Maskuline Nomen brauchen "der"', category: 'Grammatik', difficulty: 'A2' },
  { id: 'gram-4', question: '"Wir ___ ins Kino gegangen." — Welches Hilfsverb?', options: ['sind', 'haben', 'waren', 'wurden'], correct: 0, explanation: '"gehen" bildet Perfekt mit "sein"', category: 'Grammatik', difficulty: 'A2' },
  { id: 'gram-5', question: 'Welches Modalverb bedeutet "must/have to"?', options: ['müssen', 'können', 'dürfen', 'wollen'], correct: 0, explanation: '"müssen" = to have to / must', category: 'Grammatik', difficulty: 'A2' },
];

export function QuizGame() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => [...generateQuestions(12), ...GRAMMAR_QUESTIONS].slice(0, 15));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  const shuffledQuestions = useMemo(() => shuffleArray(questions), []);

  const currentQuestion = shuffledQuestions[currentIndex];

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
      setStreak(s => { const ns = s + 1; setMaxStreak(m => Math.max(m, ns)); return ns; });
      if (!completed.includes(currentQuestion.id)) {
        setCompleted(c => [...c, currentQuestion.id]);
        markQuizComplete(currentQuestion.id);
        addXP(XP_REWARDS.QUIZ_CORRECT);
      }
    } else {
      setStreak(0);
    }
  }, [selectedOption, currentQuestion, streak, completed]);

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    setShowResult(false);
    if (currentIndex >= shuffledQuestions.length - 1) {
      setGameFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex, shuffledQuestions.length]);

  const handleRetry = useCallback(() => {
    setSelectedOption(null);
    setShowResult(false);
  }, []);

  const handleRestart = useCallback(() => {
    setQuestions([...generateQuestions(12), ...GRAMMAR_QUESTIONS].slice(0, 15));
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCompleted([]);
    setGameFinished(false);
  }, []);

  if (gameFinished) {
    return (
      <Card className="w-full mx-auto max-w-2xl">
        <CardContent className="pt-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="mb-4">
            <Trophy className="h-16 w-16 mx-auto text-[#F26B5E]" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-display mb-2">Quiz beendet!</h2>
          <p className="text-muted-foreground mb-6">Tolle Leistung!</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted/50 rounded-xl"><div className="text-2xl font-bold text-[#F26B5E]">{score}</div><div className="text-xs text-muted-foreground">Punkte</div></div>
            <div className="p-4 bg-muted/50 rounded-xl"><div className="text-2xl font-bold text-[#F26B5E]">{maxStreak}</div><div className="text-xs text-muted-foreground">Beste Serie</div></div>
            <div className="p-4 bg-muted/50 rounded-xl"><div className="text-2xl font-bold text-[#168C8C]">{completed.length}/{shuffledQuestions.length}</div><div className="text-xs text-muted-foreground">Richtig</div></div>
          </div>
          <Button onClick={handleRestart} className="w-full bg-gradient-to-r from-[#F26B5E] to-[#FF9A8E] text-black hover:from-[#FF9A8E] hover:to-[#E5C58C]">
            <RotateCcw className="mr-2 h-4 w-4" /> Neues Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) return null;

  return (
    <Card className="w-full mx-auto max-w-2xl">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-[#F26B5E]" />Quiz Challenge</CardTitle>
            <CardDescription>Teste dein Wissen mit zufälligen Fragen!</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" />{currentIndex + 1}/{shuffledQuestions.length}</Badge>
            <Badge variant="outline" className="bg-[#F26B5E]/10">🔥 {streak}</Badge>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-gradient-to-r from-[#F26B5E] to-[#FF9A8E] h-2 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }} />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className={cn("text-xs", currentQuestion.difficulty === 'A1' && "bg-green-100 text-green-800", currentQuestion.difficulty === 'A2' && "bg-amber-100 text-amber-800", currentQuestion.difficulty === 'B1' && "bg-orange-100 text-orange-800")}>{currentQuestion.difficulty}</Badge>
          <Badge variant="outline" className="text-xs">{currentQuestion.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ExerciseImage imageKey={currentQuestion.id} context={`${currentQuestion.category} Quiz`} alt="Quiz-Bild" className="h-36 sm:h-44" />
        <div className="p-4 sm:p-6 bg-muted/50 rounded-xl">
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 className="text-lg sm:text-xl font-medium text-center leading-relaxed">{currentQuestion.question}</h3>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => (
            <motion.button key={`${currentQuestion.id}-${option}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
              onClick={() => handleOptionSelect(index)} disabled={showResult}
              className={cn("p-4 rounded-xl border-2 text-left font-medium transition-all duration-200",
                showResult
                  ? index === currentQuestion.correct ? "border-green-500 bg-green-100 text-green-900 dark:bg-green-900/50 dark:text-green-100"
                  : index === selectedOption ? "border-red-500 bg-red-100 text-red-900 dark:bg-red-900/50 dark:text-red-100"
                  : "border-muted bg-muted/30 text-muted-foreground"
                  : selectedOption === index ? "border-[#F26B5E] bg-[#F26B5E] text-black shadow-md"
                  : "border-border bg-card hover:border-[#F26B5E]/50 hover:shadow-sm")}>
              <span className="inline-block w-6 h-6 rounded-full bg-muted-foreground/20 text-center text-sm mr-3">{String.fromCharCode(97 + index)}</span>
              {option}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {showResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={cn("p-4 rounded-xl", selectedOption === currentQuestion.correct ? "bg-green-50 border border-green-200 dark:bg-green-900/30 dark:border-green-800" : "bg-red-50 border border-red-200 dark:bg-red-900/30 dark:border-red-800")}>
              <div className="flex items-start gap-3">
                {selectedOption === currentQuestion.correct ? <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-0.5" /> : <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />}
                <div>
                  <h4 className={cn("font-semibold mb-1", selectedOption === currentQuestion.correct ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200")}>
                    {selectedOption === currentQuestion.correct ? 'Richtig!' : 'Das war nicht ganz richtig'}
                  </h4>
                  <p className={cn("text-sm", selectedOption === currentQuestion.correct ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300")}>{currentQuestion.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-col sm:flex-row gap-3">
          {!showResult ? (
            <Button onClick={handleCheck} disabled={selectedOption === null} className="w-full bg-gradient-to-r from-[#F26B5E] to-[#FF9A8E] text-black hover:from-[#FF9A8E] hover:to-[#E5C58C] disabled:opacity-50 disabled:cursor-not-allowed">Antwort prüfen</Button>
          ) : (
            <>
              {selectedOption !== currentQuestion.correct && <Button variant="outline" onClick={handleRetry} className="flex-1"><RotateCcw className="mr-2 h-4 w-4" />Erneut versuchen</Button>}
              <Button onClick={handleNext} className="flex-1 bg-gradient-to-r from-[#168C8C] to-[#0F6F70] text-white hover:from-[#42AAA5] hover:to-[#2F8F90]">
                {currentIndex >= shuffledQuestions.length - 1 ? <><Trophy className="mr-2 h-4 w-4" />Ergebnis anzeigen</> : <>Nächste Frage<ChevronRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default QuizGame;