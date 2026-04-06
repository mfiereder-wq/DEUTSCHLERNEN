'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  Mic, 
  MicOff, 
  Play, 
  RotateCcw,
  CheckCircle2,
  XCircle,
  Ear,
  Mic2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSpeech, useSpeechRecognition } from '@/hooks/use-speech';
import { ExtendedVocabWord } from '@/data/extended-vocabulary';

interface PronunciationPracticeProps {
  word: ExtendedVocabWord;
  onComplete?: (success: boolean) => void;
  onNext?: () => void;
  hasNext?: boolean;
}

export function PronunciationPractice({ word, onComplete, onNext, hasNext = false }: PronunciationPracticeProps) {
  const { 
    isPlaying, 
    isSupported: speechSupported, 
    speak, 
    stop 
  } = useSpeech();
  
  const { 
    isListening, 
    isSupported: recognitionSupported, 
    transcript, 
    confidence,
    startListening, 
    stopListening, 
    checkPronunciation, 
    resetTranscript 
  } = useSpeechRecognition();

  const [practiceMode, setPracticeMode] = useState<'listen' | 'speak' | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [lastResult, setLastResult] = useState<'success' | 'fail' | null>(null);

  const handleListen = useCallback(() => {
    setPracticeMode('listen');
    speak(word.german, {
      rate: 0.8, // Slower for learning
      onEnd: () => {
        setTimeout(() => setPracticeMode(null), 500);
      }
    });
  }, [word.german, speak]);

  const handleStartSpeaking = useCallback(async () => {
    setPracticeMode('speak');
    setLastResult(null);
    resetTranscript();
    await startListening();
  }, [startListening, resetTranscript]);

  const handleStopSpeaking = useCallback(() => {
    stopListening();
    setPracticeMode(null);
    
    // Check pronunciation
    const isCorrect = checkPronunciation(word.german);
    setAttempts(prev => prev + 1);
    setLastResult(isCorrect ? 'success' : 'fail');
    onComplete?.(isCorrect);
  }, [stopListening, checkPronunciation, word.german, onComplete]);

  const handleRetry = useCallback(() => {
    setLastResult(null);
    setAttempts(0);
    resetTranscript();
    handleStartSpeaking();
  }, [resetTranscript, handleStartSpeaking]);

  // Calculate accuracy
  const accuracy = confidence > 0 ? Math.round(confidence * 100) : 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Ear className="h-5 w-5" />
              Aussprache-Übung
            </CardTitle>
            <CardDescription>
              Höre und wiederhole das Wort
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {!speechSupported && (
              <Badge variant="destructive" className="text-xs">
                Sprachausgabe nicht verfügbar
              </Badge>
            )}
            {!recognitionSupported && (
              <Badge variant="destructive" className="text-xs">
                Spracherkennung nicht verfügbar
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Word Display */}
        <div className="text-center">
          <motion.h3 
            key={word.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
          >
            {word.german}
          </motion.h3>
          <p className="text-muted-foreground">{word.english}</p>
          {word.difficulty && (
            <Badge variant="outline" className="mt-2">
              {word.difficulty}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {/* Listen Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={handleListen}
            disabled={isPlaying || !speechSupported}
            className={`relative ${isPlaying ? 'border-primary' : ''}`}
          >
            {isPlaying ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="mr-2"
                >
                  <Volume2 className="h-5 w-5" />
                </motion.div>
                Wiedergabe...
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                Anhören
              </>
            )}
          </Button>

          {/* Speak Button */}
          {practiceMode !== 'speak' ? (
            <Button
              size="lg"
              onClick={handleStartSpeaking}
              disabled={isListening || !recognitionSupported}
              className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-black hover:from-[#f59e0b] hover:to-[#fbbf24]"
            >
              <Mic2 className="mr-2 h-5 w-5" />
              Aussprache üben
            </Button>
          ) : (
            <Button
              size="lg"
              variant="destructive"
              onClick={handleStopSpeaking}
              className="animate-pulse"
            >
              <Mic className="mr-2 h-5 w-5" />
              Aufnehmen...
            </Button>
          )}
        </div>

        {/* Listening Status */}
        <AnimatePresence mode="wait">
          {isListening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="mb-2 flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Mic className="h-6 w-6 text-red-500" />
                </motion.div>
                <span className="text-sm font-medium">Höre zu...</span>
              </div>
              
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-8 w-2 rounded-full bg-primary"
                    animate={{
                      height: [8, 32, 8],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transcript Display */}
        {transcript && !isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border bg-muted/50 p-4"
          >
            <p className="text-sm text-muted-foreground">Deine Aussprache:</p>
            <p className="text-lg font-medium">{transcript}</p>
            {confidence > 0 && (
              <div className="mt-2">
                <div className="mb-1 flex justify-between text-xs">
                  <span>Sicherheit</span>
                  <span>{accuracy}%</span>
                </div>
                <Progress value={accuracy} className="h-1" />
              </div>
            )}
          </motion.div>
        )}

        {/* Result Display */}
        <AnimatePresence mode="wait">
          {lastResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`rounded-lg p-4 text-center ${
                lastResult === 'success'
                  ? 'border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                  : 'border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
              }`}
            >
              {lastResult === 'success' ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="mb-2 flex justify-center"
                  >
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                  </motion.div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">
                    Perfekt!
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Ausgezeichnete Aussprache!
                  </p>
                  {attempts > 1 && (
                    <p className="mt-1 text-xs text-green-600">
                      Nach {attempts} {attempts === 1 ? 'Versuch' : 'Versuchen'}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="mb-2 flex justify-center"
                  >
                    <XCircle className="h-12 w-12 text-red-500" />
                  </motion.div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200">
                    Nochmal versuchen
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Höre dir das Wort noch einmal an und versuche es zu wiederholen.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="mt-3"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Erneut versuchen
                  </Button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        {!practiceMode && !lastResult && (
          <div className="rounded-lg border border-dashed border-muted-foreground/25 p-4 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <Ear className="h-4 w-4" />
              Tippe auf &quot;Anhören&quot; um die Aussprache zu hören
            </p>
            <p className="mt-1 flex items-center justify-center gap-2">
              <Mic2 className="h-4 w-4" />
              Dann auf &quot;Aussprache üben&quot; um selbst zu sprechen
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Simple pronunciation button for vocabulary cards
interface PronounceButtonProps {
  word: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PronounceButton({ word, size = 'md' }: PronounceButtonProps) {
  const { isPlaying, isSupported, speak } = useSpeech();

  const handleClick = () => {
    if (isPlaying) return;
    speak(word, { rate: 0.9 });
  };

  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  if (!isSupported) return null;

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      disabled={isPlaying}
      className={`flex items-center justify-center rounded-full bg-primary/10 transition-colors hover:bg-primary/20 ${sizeClasses[size]} ${isPlaying ? 'animate-pulse' : ''}`}
      title="Aussprache hören"
    >
      <Volume2 className={`${iconSizes[size]} ${isPlaying ? 'text-primary' : ''}`} />
    </motion.button>
  );
}

// Batch pronunciation practice
interface BatchPronunciationProps {
  words: ExtendedVocabWord[];
  onComplete?: (results: { wordId: string; success: boolean }[]) => void;
}

export function BatchPronunciation({ words, onComplete }: BatchPronunciationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<{ wordId: string; success: boolean }[]>([]);

  const currentWord = words[currentIndex];
  const progress = Math.round((currentIndex / words.length) * 100);

  const handleWordComplete = (success: boolean) => {
    const newResults = [...results, { wordId: currentWord.id, success }];
    setResults(newResults);
    
    if (currentIndex < words.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 1500);
    } else {
      setTimeout(() => onComplete?.(newResults), 1500);
    }
  };

  if (!currentWord) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>Fortschritt</span>
          <span>{currentIndex + 1} / {words.length}</span>
        </div>
        <Progress value={progress} />
      </div>
      
      <PronunciationPractice 
        word={currentWord} 
        onComplete={handleWordComplete}
      />
    </div>
  );
}
