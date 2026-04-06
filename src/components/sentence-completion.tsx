'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Lightbulb, ChevronRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SentenceExercise {
  id: string;
  sentence: string; // z.B. "Ich ___ gerne Kaffee."
  answer: string; // "trinke"
  options: string[]; // ["trinke", "esse", "kaufe", "sehe"]
  translation: string;
  hint?: string;
}

const EXERCISES: SentenceExercise[] = [
  {
    id: 'sent-1',
    sentence: 'Ich ___ gerne Kaffee.',
    answer: 'trinke',
    options: ['trinke', 'esse', 'kaufe', 'sehe'],
    translation: 'I like to drink coffee.',
    hint: 'Verb für Flüssigkeiten',
  },
  {
    id: 'sent-2',
    sentence: 'Wie ___ du?',
    answer: 'geht',
    options: ['geht', 'kommt', 'heißt', 'wohnst'],
    translation: 'How are you?',
    hint: 'Standard-Grüßformel',
  },
  {
    id: 'sent-3',
    sentence: 'Ich ___ in Berlin.',
    answer: 'wohne',
    options: ['wohne', 'arbeite', 'komme', 'spiele'],
    translation: 'I live in Berlin.',
    hint: 'Verb für den Wohnort',
  },
  {
    id: 'sent-4',
    sentence: 'Das ist ___ Buch.',
    answer: 'ein',
    options: ['ein', 'eine', 'der', 'die'],
    translation: 'This is a book.',
    hint: 'Neutrum-Artikel im Nominativ',
  },
  {
    id: 'sent-5',
    sentence: 'Sie ___ Arzt.',
    answer: 'ist',
    options: ['ist', 'bist', 'sind', 'bin'],
    translation: 'She is a doctor.',
    hint: '3. Person Singular von „sein"',
  },
  {
    id: 'sent-6',
    sentence: 'Wir ___ ins Kino.',
    answer: 'gehen',
    options: ['gehen', 'kommen', 'fahren', 'laufen'],
    translation: 'We are going to the cinema.',
    hint: 'Verb für den Weg dorthin',
  },
  {
    id: 'sent-7',
    sentence: 'Ich habe ___ Hunger.',
    answer: 'keinen',
    options: ['keinen', 'nicht', 'keine', 'nichts'],
    translation: 'I am not hungry.',
    hint: 'Negation bei Nomen im Akkusativ',
  },
  {
    id: 'sent-8',
    sentence: '___ ist das?',
    answer: 'Was',
    options: ['Was', 'Wer', 'Wie', 'Wo'],
    translation: 'What is that?',
    hint: 'Fragewort für Sachen',
  },
];

export function SentenceCompletion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const currentExercise = EXERCISES[currentIndex];

  const handleOptionSelect = useCallback((option: string) => {
    if (showResult) return;
    setSelectedOption(option);
  }, [showResult]);

  const handleCheck = useCallback(() => {
    if (!selectedOption) return;
    const correct = selectedOption === currentExercise.answer;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setScore(s => s + 1);
      if (!completed.includes(currentExercise.id)) {
        setCompleted(c => [...c, currentExercise.id]);
      }
    }
  }, [selectedOption, currentExercise.answer, currentExercise.id, completed]);

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
    setCurrentIndex(i => (i + 1) % EXERCISES.length);
  }, []);

  const handleRetry = useCallback(() => {
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
  }, []);

  const isCompleted = completed.includes(currentExercise.id);

  return (
    <Card className="w-full mx-auto max-w-2xl">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Satz vervollständigen
            </CardTitle>
            <CardDescription>
              Wähle das richtige Wort aus
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-muted-foreground">
              Aufgabe {currentIndex + 1} / {EXERCISES.length}
            </div>
            <div className="text-sm text-[#C9A86C] font-medium">
              {score} / {completed.length} richtig
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#C9A86C] to-[#D4A574] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / EXERCISES.length) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Sentence Display */}
        <div className="text-center p-6 bg-muted/50 rounded-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExercise.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-2xl sm:text-3xl font-display mb-3 leading-relaxed">
                {currentExercise.sentence.split('___').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className={cn(
                        "inline-block mx-1 min-w-[80px] sm:min-w-[120px] px-2 py-1 rounded-lg border-2 text-center transition-all",
                        showResult
                          ? isCorrect
                            ? "border-green-500 bg-green-100 text-green-800"
                            : selectedOption && selectedOption !== currentExercise.answer
                              ? "border-red-500 bg-red-100 text-red-800"
                              : "border-[#C9A86C] bg-[#C9A86C]/10 text-foreground"
                          : selectedOption
                            ? "border-[#C9A86C] bg-[#C9A86C]/10 text-foreground"
                            : "border-dashed border-muted-foreground/30 text-muted-foreground/50"
                      )}>
                        {showResult ? currentExercise.answer : (selectedOption || '___')}
                      </span>
                    )}
                  </span>
                ))}
              </p>
              <p className="text-sm text-muted-foreground italic">
                {currentExercise.translation}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hint */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800"
          >
            💡 <strong>Tipp:</strong> {currentExercise.hint}
          </motion.div>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3">
          {currentExercise.options.map((option, index) => (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleOptionSelect(option)}
              disabled={showResult}
              className={cn(
                "p-4 rounded-xl border-2 text-center font-medium transition-all duration-200",
                showResult
                  ? option === currentExercise.answer
                    ? "border-green-500 bg-green-100 text-green-900 dark:bg-green-900/50 dark:text-green-100"
                    : option === selectedOption
                      ? "border-red-500 bg-red-100 text-red-900 dark:bg-red-900/50 dark:text-red-100"
                      : "border-muted bg-muted/30 text-muted-foreground"
                  : selectedOption === option
                    ? "border-[#C9A86C] bg-[#C9A86C] text-black shadow-md"
                    : "border-border bg-card hover:border-[#C9A86C]/50 hover:shadow-sm"
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Result Display */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-4 rounded-xl text-center",
                isCorrect
                  ? "bg-green-50 border border-green-200 dark:bg-green-900/30 dark:border-green-800"
                  : "bg-red-50 border border-red-200 dark:bg-red-900/30 dark:border-red-800"
              )}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="flex justify-center mb-2"
              >
                {isCorrect ? (
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                ) : (
                  <XCircle className="h-12 w-12 text-red-500" />
                )}
              </motion.div>
              <h4 className={cn(
                "font-semibold mb-1",
                isCorrect ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
              )}>
                {isCorrect ? 'Richtig!' : 'Fast!'}
              </h4>
              <p className={cn(
                "text-sm",
                isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
              )}>
                {isCorrect 
                  ? 'Sehr gut! Weiter so!' 
                  : `Die richtige Antwort ist: "${currentExercise.answer}"`
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {!showResult ? (
            <>
              <Button
                variant="outline"
                onClick={() => setShowHint(true)}
                className="flex-1"
                disabled={showHint}
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                {showHint ? 'Tipp angezeigt' : 'Tipp anzeigen'}
              </Button>
              <Button
                onClick={handleCheck}
                disabled={!selectedOption}
                className="flex-1 bg-gradient-to-r from-[#C9A86C] to-[#D4A574] text-black hover:from-[#D4A574] hover:to-[#E5C58C]"
              >
                Überprüfen
              </Button>
            </>
          ) : (
            <>
              {!isCorrect && (
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
                {currentIndex >= EXERCISES.length - 1 ? (
                  <>
                    <Trophy className="mr-2 h-4 w-4" />
                    Übung beenden
                  </>
                ) : (
                  <>
                    Nächste Aufgabe
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

export default SentenceCompletion;
