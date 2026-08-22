'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Mic, Brain, Puzzle, Zap, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OnboardingStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  tabName?: string;
  tabIcon?: string;
}

const STEPS: OnboardingStep[] = [
  {
    icon: <GraduationCap className="h-10 w-10 text-[#F26B5E]" />,
    title: 'Willkommen bei DEUTSCHLERNEN!',
    description: 'Deine App zum Deutschlernen — mit täglichen Vokabeln, Quiz, Aussprache-Training und mehr. Kein Abo, einmal zahlen, für immer lernen.',
  },
  {
    icon: <BookOpen className="h-10 w-10 text-[#168C8C]" />,
    title: 'Täglich neue Wörter',
    description: 'Im Tab "Lernen" findest du jeden Tag neue Vokabeln passend zum Wochenthema. Lerne sie und sammle XP!',
    tabName: 'Lernen',
  },
  {
    icon: <Mic className="h-10 w-10 text-amber-500" />,
    title: 'Aussprache üben',
    description: 'Im Tab "Aussprache" hörst du die richtige Aussprache und kannst selbst sprechen. Die App erkennt, ob du es richtig aussprichst!',
    tabName: 'Aussprache',
  },
  {
    icon: <Brain className="h-10 w-10 text-purple-500" />,
    title: 'Intelligente Wiederholung',
    description: 'Im Tab "Wiederholung" nutzen wir Spaced Repetition — eine wissenschaftlich bewiesene Methode, um Wörter langfristig zu behalten.',
    tabName: 'Wiederholung',
  },
  {
    icon: <Puzzle className="h-10 w-10 text-emerald-500" />,
    title: 'Sätze & Grammatik',
    description: 'In "Sätze" vervollständigst du Lückentexte. Unter "Level" findest du deine Statistiken und kannst den Lernfortschritt verfolgen.',
  },
  {
    icon: <Zap className="h-10 w-10 text-orange-500" />,
    title: 'Quiz & Belohnungen',
    description: 'Im "Quiz" testest du dein Wissen. Sammle XP, halte deine Streak und schalte neue Level frei. Viel Spaß beim Lernen! 🇩🇪',
  },
];

export function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('deutschlernen-onboarding-seen');
    if (!seen) setVisible(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem('deutschlernen-onboarding-seen', '1');
  };

  if (!visible) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
      >
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-2" onClick={dismiss}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                {current.icon}
              </div>
            </motion.div>

            <motion.div key={`text-${step}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-display mb-2">{current.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{current.description}</p>
              {current.tabName && (
                <p className="mt-2 text-xs text-[#F26B5E] font-medium">
                  → Zum Tab &quot;{current.tabName}&quot; wechseln
                </p>
              )}
            </motion.div>

            {/* Step indicators */}
            <div className="flex justify-center gap-1.5">
              {STEPS.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-[#F26B5E]' : 'w-1.5 bg-muted-foreground/30'}`} />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(s => s - 1)} className="flex-1">
                  <ChevronLeft className="h-4 w-4 mr-1" /> Zurück
                </Button>
              )}
              {isLast ? (
                <Button onClick={dismiss} className="flex-1 bg-gradient-to-r from-[#F26B5E] to-[#FF9A8E] text-black">
                  Los geht&apos;s! 🚀
                </Button>
              ) : (
                <Button onClick={() => setStep(s => s + 1)} className="flex-1 bg-gradient-to-r from-[#F26B5E] to-[#FF9A8E] text-black">
                  Weiter <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

export default OnboardingTour;