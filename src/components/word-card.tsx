'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, Star, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ExtendedVocabWord } from '@/data/extended-vocabulary';
import { useSpeech } from '@/hooks/use-speech';

// Difficulty indicator values
const DIFFICULTY_CONFIG = {
  A1: { color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  A2: { color: 'from-sky-500 to-sky-600', bg: 'bg-sky-50', text: 'text-sky-700' },
  B1: { color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', text: 'text-amber-700' },
  B2: { color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-700' },
  C1: { color: 'from-rose-500 to-rose-600', bg: 'bg-rose-50', text: 'text-rose-700' },
};

interface WordCardProps {
  word: ExtendedVocabWord;
  index?: number;
  isLearned?: boolean;
  onLearn?: () => void;
  variant?: 'default' | 'compact' | 'featured';
  showActions?: boolean;
}

export function WordCard({
  word,
  index = 0,
  isLearned = false,
  onLearn,
  variant = 'default',
  showActions = true,
}: WordCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const { isPlaying, isSupported, speak } = useSpeech();

  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying || !isSupported) return;
    speak(word.german, { rate: 0.85 });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const difficulty = DIFFICULTY_CONFIG[word.difficulty];

  // Compact variant (for lists)
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className={cn(
          'group relative flex items-center gap-3 rounded-xl border p-4 transition-all',
          'hover:border-[#C9A86C]/50 hover:shadow-warm',
          isLearned && 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20'
        )}
      >
        {/* Status indicator */}
        <div className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
          isLearned ? 'bg-emerald-100 text-emerald-600' : 'bg-muted text-muted-foreground'
        )}>
          {isLearned ? <Check className="h-5 w-5" /> : <span className="font-display text-lg">{index + 1}</span>}
        </div>

        {/* Word content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate font-display text-lg">{word.german}</h4>
            {word.isNew && (
              <Badge className="shrink-0 badge-new text-[10px] px-1.5 py-0">
                NEU
              </Badge>
            )}
          </div>
          <p className="truncate text-sm text-muted-foreground">{word.english}</p>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex shrink-0 items-center gap-1">
            {isSupported && (
              <button
                onClick={handlePronounce}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full transition-all',
                  'bg-[#C9A86C]/10 text-[#C9A86C] hover:bg-[#C9A86C] hover:text-white',
                  isPlaying && 'animate-pulse'
                )}
                title="Aussprache hören"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            )}
            {onLearn && (
              <Button
                size="sm"
                variant={isLearned ? 'outline' : 'default'}
                onClick={onLearn}
                className={cn(
                  'h-8 px-3 transition-all',
                  isLearned && 'border-emerald-500 text-emerald-600'
                )}
              >
                {isLearned ? <Check className="h-4 w-4" /> : 'Lernen'}
              </Button>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  // Featured variant (prominent)
  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
        className="group relative"
      >
        <div className={cn(
          'relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-500',
          'hover-lift shadow-warm',
          isLearned 
            ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-card' 
            : 'border-[#C9A86C]/20 bg-gradient-to-br from-[#FFFCF7] via-white to-[#FAF6F0]'
        )}>
          {/* Decorative corner */}
          <div className="absolute right-0 top-0 h-20 w-20">
            <div className={cn(
              'absolute right-3 top-3 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white',
              `bg-gradient-to-br ${difficulty.color}`
            )}>
              {word.difficulty}
            </div>
          </div>

          {/* New badge */}
          {word.isNew && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute left-4 top-4"
            >
              <Badge className="badge-new animate-pulse-glow">
                <Star className="mr-1 h-3 w-3" />
                NEU
              </Badge>
            </motion.div>
          )}

          {/* Content */}
          <div className={cn('text-center', word.isNew && 'pt-8')}>
            <motion.h3 
              className="font-display text-4xl tracking-tight mb-2"
              whileHover={{ scale: 1.02 }}
            >
              {word.german}
            </motion.h3>
            <p className="text-lg text-muted-foreground mb-4">{word.english}</p>

            {/* Divider */}
            <div className="mx-auto mb-4 h-px w-16 bg-gradient-to-r from-transparent via-[#C9A86C] to-transparent" />

            {/* Example sentence */}
            {word.exampleSentence && (
              <p className="mb-6 italic text-muted-foreground/80">
                &ldquo;{word.exampleSentence}&rdquo;
              </p>
            )}

            {/* Tags */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
              {word.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag} 
                  className="rounded-full bg-[#C9A86C]/10 px-3 py-1 text-xs text-[#C9A86C]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex items-center justify-center gap-3">
                {isSupported && (
                  <Button
                    variant="outline"
                    onClick={handlePronounce}
                    disabled={isPlaying}
                    className="rounded-full border-[#C9A86C]/30"
                  >
                    <Volume2 className={cn('mr-2 h-4 w-4', isPlaying && 'animate-pulse')} />
                    Hören
                  </Button>
                )}
                {onLearn && (
                  <Button
                    onClick={onLearn}
                    className={cn(
                      'btn-primary-german rounded-full px-8',
                      isLearned && 'bg-emerald-500 hover:bg-emerald-600'
                    )}
                  >
                    {isLearned ? (
                      <><Check className="mr-2 h-4 w-4" /> Gelernt</>
                    ) : (
                      <><GraduationCap className="mr-2 h-4 w-4" /> Lernen</>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant (flip card)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative h-48 cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260 }}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={handleFlip}
      >
        {/* Front */}
        <div 
          className={cn(
            'absolute inset-0 overflow-hidden rounded-xl border-2 p-4 backface-hidden',
            'transition-all duration-300',
            isLearned 
              ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-white' 
              : 'border-[#C9A86C]/20 bg-gradient-to-br from-[#FFFCF7] to-[#FAF6F0] hover:border-[#C9A86C]/50'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Difficulty badge */}
          <div className={cn(
            'absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold',
            difficulty.bg, difficulty.text
          )}>
            {word.difficulty}
          </div>

          {/* Content */}
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h4 className="font-display text-2xl mb-2">{word.german}</h4>
            <p className="text-sm text-muted-foreground mb-4">{word.english}</p>
            
            <div className="text-xs text-muted-foreground">
              Klicken zum Details
            </div>
          </div>

          {/* Status indicator */}
          {isLearned && (
            <div className="absolute bottom-3 left-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3.5 w-3.5" />
              </div>
            </div>
          )}

          {/* New badge */}
          {word.isNew && (
            <div className="absolute bottom-3 right-3">
              <Badge className="badge-new text-[10px]">NEU</Badge>
            </div>
          )}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border-2 border-[#C9A86C]/30 bg-[#1C2541] text-white p-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#C9A86C]">{word.category}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="text-xs text-white/60 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="font-display text-xl mb-2">{word.german}</p>
              
              {word.exampleSentence && (
                <>
                  <div className="w-8 h-px bg-[#C9A86C]/50 my-2" />
                  <p className="text-sm text-white/80 italic">
                    &ldquo;{word.exampleSentence}&rdquo;
                  </p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {isSupported && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePronounce}
                  className="flex-1 border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  <Volume2 className="mr-1 h-3 w-3" />
                  Hören
                </Button>
              )}
              {onLearn && (
                <Button
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); onLearn(); }}
                  className={cn(
                    'flex-1',
                    isLearned ? 'bg-emerald-500' : 'bg-[#C9A86C]'
                  )}
                >
                  {isLearned ? 'Gelernt' : 'Lernen'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Word list with staggered animations
export function WordList({ 
  words, 
  onLearn,
  learnedIds = [],
  variant = 'compact',
}: {
  words: ExtendedVocabWord[];
  onLearn?: (id: string) => void;
  learnedIds?: string[];
  variant?: 'compact' | 'default' | 'featured';
}) {
  return (
    <div className={cn(
      'grid gap-3',
      variant === 'compact' && 'grid-cols-1',
      variant === 'default' && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      variant === 'featured' && 'grid-cols-1 md:grid-cols-2'
    )}>
      {words.map((word, index) => (
        <WordCard
          key={word.id}
          word={word}
          index={index}
          isLearned={learnedIds.includes(word.id)}
          onLearn={() => onLearn?.(word.id)}
          variant={variant}
        />
      ))}
    </div>
  );
}
