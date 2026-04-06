'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Lightbulb, ChevronRight, Trophy, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  markSentenceComplete, 
  addXP, 
  getProgress,
  getRandomUncompletedSentences,
  isSentenceCompleted
} from '@/lib/progress-store';
import { LEVELS, getCurrentLevel } from '@/lib/level-system';

interface SentenceExercise {
  id: string;
  sentence: string;
  answer: string;
  options: string[];
  translation: string;
  hint?: string;
  difficulty: 'A1' | 'A2' | 'B1';
  category: string;
}

// 60+ exercises organized by difficulty
const ALL_EXERCISES: SentenceExercise[] = [
  // A1 - Basics (1-20)
  { id: 'sent-a1-1', sentence: 'Ich ___ gerne Kaffee.', answer: 'trinke', options: ['trinke', 'esse', 'kaufe', 'sehe'], translation: 'I like to drink coffee.', hint: 'Verb für Flüssigkeiten', difficulty: 'A1', category: 'Verben' },
  { id: 'sent-a1-2', sentence: 'Wie ___ du?', answer: 'geht', options: ['geht', 'kommt', 'heißt', 'wohnst'], translation: 'How are you?', hint: 'Standard-Grüßformel', difficulty: 'A1', category: 'Begrüßung' },
  { id: 'sent-a1-3', sentence: 'Ich ___ in Berlin.', answer: 'wohne', options: ['wohne', 'arbeite', 'komme', 'spiele'], translation: 'I live in Berlin.', hint: 'Wohnort angeben', difficulty: 'A1', category: 'Wohnen' },
  { id: 'sent-a1-4', sentence: 'Das ist ___ Buch.', answer: 'ein', options: ['ein', 'eine', 'der', 'die'], translation: 'This is a book.', hint: 'Neutrum-Artikel', difficulty: 'A1', category: 'Artikel' },
  { id: 'sent-a1-5', sentence: 'Sie ___ Arzt.', answer: 'ist', options: ['ist', 'bist', 'sind', 'bin'], translation: 'She is a doctor.', hint: '3. Person sein', difficulty: 'A1', category: 'Berufe' },
  { id: 'sent-a1-6', sentence: 'Wir ___ ins Kino.', answer: 'gehen', options: ['gehen', 'kommen', 'fahren', 'laufen'], translation: 'We are going to the cinema.', hint: 'Freizeit aktivität', difficulty: 'A1', category: 'Freizeit' },
  { id: 'sent-a1-7', sentence: 'Ich habe ___ Hunger.', answer: 'keinen', options: ['keinen', 'nicht', 'keine', 'nichts'], translation: 'I am not hungry.', hint: 'Negation mit kein', difficulty: 'A1', category: 'Negation' },
  { id: 'sent-a1-8', sentence: '___ ist das?', answer: 'Was', options: ['Was', 'Wer', 'Wie', 'Wo'], translation: 'What is that?', hint: 'Sachfrage', difficulty: 'A1', category: 'Fragen' },
  { id: 'sent-a1-9', sentence: 'Mein Name ___ Peter.', answer: 'ist', options: ['ist', 'heiße', 'bin', 'habe'], translation: 'My name is Peter.', hint: 'Vorstellung', difficulty: 'A1', category: 'Begrüßung' },
  { id: 'sent-a1-10', sentence: 'Ich ___ aus Deutschland.', answer: 'komme', options: ['komme', 'gehe', 'wohne', 'lebe'], translation: 'I come from Germany.', hint: 'Herkunft', difficulty: 'A1', category: 'Herkunft' },
  { id: 'sent-a1-11', sentence: '___ alt bist du?', answer: 'Wie', options: ['Wie', 'Was', 'Wo', 'Wer'], translation: 'How old are you?', hint: 'Nach Alter fragen', difficulty: 'A1', category: 'Fragen' },
  { id: 'sent-a1-12', sentence: 'Ich ___ gern Pizza.', answer: 'esse', options: ['esse', 'trinke', 'koche', 'kaufe'], translation: 'I like to eat pizza.', hint: 'Essen Verb', difficulty: 'A1', category: 'Essen' },
  { id: 'sent-a1-13', sentence: 'Er ___ ein Auto.', answer: 'hat', options: ['hat', 'ist', 'macht', 'geht'], translation: 'He has a car.', hint: 'haben Konjugation', difficulty: 'A1', category: 'Besitz' },
  { id: 'sent-a1-14', sentence: 'Wir ___ Freunde.', answer: 'sind', options: ['sind', 'seid', 'ist', 'bin'], translation: 'We are friends.', hint: 'Plural sein', difficulty: 'A1', category: 'Freundschaft' },
  { id: 'sent-a1-15', sentence: '___ geht es dir?', answer: 'Wie', options: ['Wie', 'Was', 'Wo', 'Wer'], translation: 'How are you?', hint: 'Nach Befinden fragen', difficulty: 'A1', category: 'Begrüßung' },
  { id: 'sent-a1-16', sentence: 'Das ist ___ Tisch.', answer: 'ein', options: ['ein', 'eine', 'einen', 'einer'], translation: 'That is a table.', hint: 'Maskulin Artikel', difficulty: 'A1', category: 'Artikel' },
  { id: 'sent-a1-17', sentence: 'Ich ___ Deutsch.', answer: 'lerne', options: ['lerne', 'lehre', 'spreche', 'sage'], translation: 'I am learning German.', hint: 'Lernen Verb', difficulty: 'A1', category: 'Sprache' },
  { id: 'sent-a1-18', sentence: 'Sie ___ Französisch.', answer: 'spricht', options: ['spricht', 'sprichst', 'spreche', 'sprecht'], translation: 'She speaks French.', hint: 'sprechen Konjugation', difficulty: 'A1', category: 'Sprache' },
  { id: 'sent-a1-19', sentence: 'Ich ___ Tennis.', answer: 'spiele', options: ['spiele', 'mache', 'gehe', 'fahre'], translation: 'I play tennis.', hint: 'Sport verb', difficulty: 'A1', category: 'Sport' },
  { id: 'sent-a1-20', sentence: 'Er ___ Fußball.', answer: 'spielt', options: ['spielt', 'spiele', 'spielst', 'spielen'], translation: 'He plays soccer.', hint: '3. Person spielen', difficulty: 'A1', category: 'Sport' },

  // A2 - Elementary (21-40)
  { id: 'sent-a2-21', sentence: 'Ich ___ gestern ins Kino gegangen.', answer: 'bin', options: ['bin', 'habe', 'war', 'ist'], translation: 'I went to the cinema yesterday.', hint: 'Perfekt mit sein', difficulty: 'A2', category: 'Vergangenheit' },
  { id: 'sent-a2-22', sentence: 'Sie ___ ein Buch gelesen.', answer: 'hat', options: ['hat', 'habe', 'ist', 'war'], translation: 'She has read a book.', hint: 'Perfekt mit haben', difficulty: 'A2', category: 'Vergangenheit' },
  { id: 'sent-a2-23', sentence: '___ Wetter ist heute schön.', answer: 'Das', options: ['Das', 'Der', 'Die', 'Ein'], translation: 'The weather is nice today.', hint: 'Wetter ist Neutrum', difficulty: 'A2', category: 'Wetter' },
  { id: 'sent-a2-24', sentence: 'Ich fahre ___ Bahn.', answer: 'mit der', options: ['mit der', 'mit dem', 'mit den', 'auf der'], translation: 'I take the train.', hint: 'Futtermittel + Dativ', difficulty: 'A2', category: 'Transport' },
  { id: 'sent-a2-25', sentence: 'Das ist ___ Schwester.', answer: 'meine', options: ['meine', 'mein', 'meinen', 'meiner'], translation: 'That is my sister.', hint: 'Possessivpronomen', difficulty: 'A2', category: 'Familie' },
  { id: 'sent-a2-26', sentence: 'Ich möchte ___ Wasser.', answer: 'ein', options: ['ein', 'eine', 'einen', 'einer'], translation: 'I would like a water.', hint: 'möchten + Akkusativ', difficulty: 'A2', category: 'Bestellung' },
  { id: 'sent-a2-27', sentence: 'Sie ___ in Berlin gewesen.', answer: 'war', options: ['war', 'hat', 'ist', 'waren'], translation: 'She has been to Berlin.', hint: 'Perfekt sein + Partizip II', difficulty: 'A2', category: 'Perfekt' },
  { id: 'sent-a2-28', sentence: 'Ich ___ schwimmen.', answer: 'kann', options: ['kann', 'könnte', 'will', 'möchte'], translation: 'I can swim.', hint: 'Modalverb können', difficulty: 'A2', category: 'Modalverben' },
  { id: 'sent-a2-29', sentence: 'Er ___ nicht kommen.', answer: 'darf', options: ['darf', 'muss', 'kann', 'soll'], translation: 'He is not allowed to come.', hint: 'dürfen negativ', difficulty: 'A2', category: 'Modalverben' },
  { id: 'sent-a2-30', sentence: 'Ich ___ nach Hause gehen.', answer: 'muss', options: ['muss', 'kann', 'darf', 'will'], translation: 'I must go home.', hint: 'müssen Notwendigkeit', difficulty: 'A2', category: 'Modalverben' },
  { id: 'sent-a2-31', sentence: '___ ist dein Geburtstag?', answer: 'Wann', options: ['Wann', 'Wo', 'Wie', 'Was'], translation: 'When is your birthday?', hint: 'Nach Zeit fragen', difficulty: 'A2', category: 'Zeit' },
  { id: 'sent-a2-32', sentence: 'Das Essen ___ gut.', answer: 'schmeckt', options: ['schmeckt', 'ist', 'hat', 'macht'], translation: 'The food tastes good.', hint: 'schmecken Verb', difficulty: 'A2', category: 'Essen' },
  { id: 'sent-a2-33', sentence: 'Ich habe ___ Zeit.', answer: 'keine', options: ['keine', 'kein', 'nicht', 'keinen'], translation: 'I have no time.', hint: 'kein + Feminin', difficulty: 'A2', category: 'Negation' },
  { id: 'sent-a2-34', sentence: 'Er kauft ___ Blumen.', answer: 'sich', options: ['sich', 'ihm', 'ihn', 'sein'], translation: 'He buys himself flowers.', hint: 'Reflexivpronomen', difficulty: 'A2', category: 'Reflexive' },
  { id: 'sent-a2-35', sentence: 'Wir ___ nach München gefahren.', answer: 'sind', options: ['sind', 'haben', 'waren', 'ist'], translation: 'We drove to Munich.', hint: 'fahren + sein Perfekt', difficulty: 'A2', category: 'Reisen' },
  { id: 'sent-a2-36', sentence: 'Ich ___ die Musik.', answer: 'höre', options: ['höre', 'hören', 'hörst', 'hört'], translation: 'I hear the music.', hint: 'hören Konjugation', difficulty: 'A2', category: 'Medien' },
  { id: 'sent-a2-37', sentence: 'Sie ___ im Hotel übernachtet.', answer: 'hat', options: ['hat', 'ist', 'haben', 'waren'], translation: 'She stayed at the hotel.', hint: 'übernachen + haben', difficulty: 'A2', category: 'Reisen' },
  { id: 'sent-a2-38', sentence: '___ bildet man das Perfekt?', answer: 'Wie', options: ['Wie', 'Was', 'Wo', 'Wer'], translation: 'How do you form the perfect tense?', hint: 'Nach Methode fragen', difficulty: 'A2', category: 'Grammatik' },
  { id: 'sent-a2-39', sentence: 'Das ist ___ interessantes Buch.', answer: 'ein', options: ['ein', 'eine', 'einen', '-'], translation: 'That is an interesting book.', hint: 'Adjektiv vor Nomen', difficulty: 'A2', category: 'Adjektive' },
  { id: 'sent-a2-40', sentence: 'Ich habe ___ Hunger.', answer: 'großen', options: ['großen', 'groß', 'große', 'großer'], translation: 'I am very hungry.', hint: 'Adjektiv Deklination', difficulty: 'A2', category: 'Adjektive' },

  // B1 - Intermediate (41-60)
  { id: 'sent-b1-41', sentence: 'Wenn ich Zeit ___, würde ich kommen.', answer: 'hätte', options: ['hätte', 'habe', 'hatte', 'haben'], translation: 'If I had time, I would come.', hint: 'Konjunktiv II', difficulty: 'B1', category: 'Konjunktiv' },
  { id: 'sent-b1-42', sentence: 'Ich ___ lieber zu Hause bleiben.', answer: 'würde', options: ['würde', 'will', 'möchte', 'sollte'], translation: 'I would rather stay at home.', hint: 'würde + Infinitiv', difficulty: 'B1', category: 'Konjunktiv' },
  { id: 'sent-b1-43', sentence: 'Die Prüfung ___ schwieriger als erwartet.', answer: 'war', options: ['war', 'ist', 'wäre', 'wurde'], translation: 'The exam was harder than expected.', hint: 'Vergleich Vergangenheit', difficulty: 'B1', category: 'Vergleich' },
  { id: 'sent-b1-44', sentence: '___ du mir helfen?', answer: 'Könntest', options: ['Könntest', 'Kannst', 'Darfst', 'Musst'], translation: 'Could you help me?', hint: 'höfliche Bitte', difficulty: 'B1', category: 'Höflichkeit' },
  { id: 'sent-b1-45', sentence: 'Ich ___ ihn seit zwei Jahren.', answer: 'kenne', options: ['kenne', 'weiß', 'wisse', 'kennen'], translation: 'I have known him for two years.', hint: 'kennen vs wissen', difficulty: 'B1', category: 'Wortschatz' },
  { id: 'sent-b1-46', sentence: 'Er ___ das Problem gelöst.', answer: 'hat', options: ['hat', 'ist', 'wurde', 'war'], translation: 'He has solved the problem.', hint: 'Perfekt transitiv', difficulty: 'B1', category: 'Perfekt' },
  { id: 'sent-b1-47', sentence: '___ berufst du dich?', answer: 'Worauf', options: ['Worauf', 'Woraus', 'Wovon', 'Wozu'], translation: 'What are you referring to?', hint: 'Verbzusatz', difficulty: 'B1', category: 'Fragewörter' },
  { id: 'sent-b1-48', sentence: 'Das ___ man nicht machen.', answer: 'sollte', options: ['sollte', 'muss', 'kann', 'darf'], translation: 'One should not do that.', hint: 'sollten Empfehlung', difficulty: 'B1', category: 'Modalverben' },
  { id: 'sent-b1-49', sentence: 'Ich ___ das nie vergessen.', answer: 'werde', options: ['werde', 'will', 'möchte', 'soll'], translation: 'I will never forget that.', hint: 'werden Futur', difficulty: 'B1', category: 'Zukunft' },
  { id: 'sent-b1-50', sentence: 'Bevor wir ___, trinken wir Kaffee.', answer: 'gehen', options: ['gehen', 'gingen', 'gehen werden', 'gegangen sind'], translation: 'Before we go, we drink coffee.', hint: 'Nebensatz Präsens', difficulty: 'B1', category: 'Konjunktionen' },
  { id: 'sent-b1-51', sentence: 'Trotz ___ Regens gehen wir spazieren.', answer: 'des', options: ['des', 'dem', 'den', 'der'], translation: 'Despite the rain, we go for a walk.', hint: 'Trotz + Genitiv', difficulty: 'B1', category: 'Präpositionen' },
  { id: 'sent-b1-52', sentence: '___ du die Nachricht gehört?', answer: 'Hast', options: ['Hast', 'Bist', 'Haben', 'Seid'], translation: 'Have you heard the news?', hint: 'hören + haben', difficulty: 'B1', category: 'Perfekt' },
  { id: 'sent-b1-53', sentence: 'Das ist der Mann, ___ ich gestern gesehen habe.', answer: 'den', options: ['den', 'der', 'dem', 'dessen'], translation: 'That is the man whom I saw yesterday.', hint: 'Relativpronomen Akkusativ', difficulty: 'B1', category: 'Relativsätze' },
  { id: 'sent-b1-54', sentence: 'Ich interessiere mich ___ Kunst.', answer: 'für', options: ['für', 'an', 'über', 'von'], translation: 'I am interested in art.', hint: 'sich interessieren für', difficulty: 'B1', category: 'Präpositionen' },
  { id: 'sent-b1-55', sentence: '___ du schon Deutschland besucht?', answer: 'Hast', options: ['Hast', 'Bist', 'Haben', 'Seid'], translation: 'Have you visited Germany already?', hint: 'besuchen + haben', difficulty: 'B1', category: 'Perfekt' },
  { id: 'sent-b1-56', sentence: 'Es ist wichtig, ___ man pünktlich ist.', answer: 'dass', options: ['dass', 'weil', 'obwohl', 'wenn'], translation: 'It is important that one is on time.', hint: 'dass-Satz', difficulty: 'B1', category: 'Nebensätze' },
  { id: 'sent-b1-57', sentence: 'Ich habe ___ Buch noch nicht gelesen.', answer: 'das', options: ['das', 'dem', 'den', 'der'], translation: 'I have not read that book yet.', hint: 'noch nicht Position', difficulty: 'B1', category: 'Satzstellung' },
  { id: 'sent-b1-58', sentence: '___ lange dauert der Film?', answer: 'Wie', options: ['Wie', 'Wann', 'Was', 'Wo'], translation: 'How long does the film last?', hint: 'Wie lange Zeitraum', difficulty: 'B1', category: 'Zeit' },
  { id: 'sent-b1-59', sentence: 'Es ___ mir leid.', answer: 'tut', options: ['tut', 'ist', 'macht', 'hat'], translation: 'I am sorry.', hint: 'es tut mir leid', difficulty: 'B1', category: 'Redewendungen' },
  { id: 'sent-b1-60', sentence: 'Ich ___ morgen früher aufstehen.', answer: 'muss', options: ['muss', 'kann', 'soll', 'darf'], translation: 'I have to get up earlier tomorrow.', hint: 'müssen + Infinitiv', difficulty: 'B1', category: 'Modalverben' },
];

export function SentenceCompletion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [userXP, setUserXP] = useState(0);
  const [availableExercises, setAvailableExercises] = useState<SentenceExercise[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  // Load progress on mount
  useEffect(() => {
    const progress = getProgress();
    setCompleted(progress.completedSentences);
    setUserXP(progress.xp);
    
    // Filter exercises based on user's level
    const currentLevel = getCurrentLevel(progress.xp);
    const filtered = ALL_EXERCISES.filter(e => {
      if (currentLevel.difficulty === 'A1') return e.difficulty === 'A1';
      if (currentLevel.difficulty === 'A2') return e.difficulty === 'A1' || e.difficulty === 'A2';
      return true; // B1 sees all
    });
    
    // Shuffle and get uncompleted first
    const uncompleted = filtered.filter(e => !progress.completedSentences.includes(e.id));
    const completedEx = filtered.filter(e => progress.completedSentences.includes(e.id));
    
    setAvailableExercises([...uncompleted, ...completedEx]
      .slice(0, currentLevel.sentenceCount));
    setCurrentIndex(0);
  }, []);

  const currentExercise = availableExercises[currentIndex] || ALL_EXERCISES[0];

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
      // Check if this is a first-time completion
      if (!completed.includes(currentExercise.id)) {
        setScore(s => s + 1);
        markSentenceComplete(currentExercise.id);
        addXP(15);
        setCompleted(c => [...c, currentExercise.id]);
        setUserXP(xp => xp + 15);
      }
    }
  }, [selectedOption, currentExercise.answer, currentExercise.id, completed]);

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
    
    if (currentIndex >= availableExercises.length - 1) {
      setGameFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex, availableExercises.length]);

  const handleRetry = useCallback(() => {
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
    setScore(0);
    setGameFinished(false);
  }, []);

  const isExerciseCompleted = completed.includes(currentExercise?.id);

  if (gameFinished) {
    const uncompletedCount = availableExercises.filter(e => !completed.includes(e.id)).length;
    
    return (
      <div className="mx-auto max-w-2xl">
        <div className="text-center p-8 bg-gradient-to-br from-[#C9A86C]/10 to-[#D4A574]/5 rounded-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mb-4"
          >
            <Trophy className="h-16 w-16 mx-auto text-[#C9A86C]" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl font-display mb-2">Übung beendet!</h2>
          <p className="text-muted-foreground mb-6">
            Du hast {completed.length} von {availableExercises.length} Sätzen richtig gelöst.
          </p>
          
          {uncompletedCount > 0 ? (
            <p className="text-sm text-muted-foreground mb-4">
              Es gibt noch {uncompletedCount} unvollendete Sätze.
            </p>
          ) : (
            <p className="text-green-600 font-medium mb-4">
              🎉 Alle Sätze abgeschlossen!
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={handleRestart}
              className="sm:w-auto"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Von vorne beginnen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentExercise) {
    return <div>Lade...</div>;
  }

  return (
    <Card className="w-full mx-auto max-w-2xl">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
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
            <div className="text-sm font-medium text-[#C9A86C]">
              XP: {userXP}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentIndex + 1} / {availableExercises.length}
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#C9A86C] to-[#D4A574] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / Math.max(1, availableExercises.length)) * 100}%` }}
          />
        </div>

        {/* Difficulty & Category */}
        <div className="flex gap-2">
          <Badge variant="outline" className={cn(
            "text-xs",
            currentExercise.difficulty === 'A1' && "bg-green-100 text-green-800",
            currentExercise.difficulty === 'A2' && "bg-amber-100 text-amber-800",
            currentExercise.difficulty === 'B1' && "bg-orange-100 text-orange-800",
          )}>
            {currentExercise.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {currentExercise.category}
          </Badge>
          {isExerciseCompleted && (
            <Badge className="bg-green-500 text-white text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Erledigt
            </Badge>
          )}
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
                    ? "border-green-500 bg-green-100 text-green-900"
                    : option === selectedOption
                      ? "border-red-500 bg-red-100 text-red-900"
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
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
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
                isCorrect ? "text-green-800" : "text-red-800"
              )}>
                {isCorrect ? 'Richtig!' : 'Fast!'}
              </h4>
              <p className={cn(
                "text-sm",
                isCorrect ? "text-green-700" : "text-red-700"
              )}>
                {isCorrect 
                  ? isExerciseCompleted 
                    ? 'Schon erledigt! +0 XP (bereits abgeschlossen)' 
                    : 'Sehr gut! +15 XP'
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
                {currentIndex >= availableExercises.length - 1 ? (
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
