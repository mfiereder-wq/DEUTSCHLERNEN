'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, RefreshCw, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNewContentBanner, useDynamicContent } from '@/hooks/use-dynamic-content';

interface NewContentBannerProps {
  onViewNewWords?: () => void;
  userLevel?: number;
}

export function NewContentBanner({ onViewNewWords, userLevel = 1 }: NewContentBannerProps) {
  const { showBanner, newContentCount, dismissBanner, mounted } = useNewContentBanner();
  const { streak, streakBonus, theme } = useDynamicContent(userLevel);

  if (!mounted || !showBanner) return null;

  const today = new Date();
  const dateStr = today.toLocaleDateString('de-DE', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative overflow-hidden rounded-2xl border-2 border-[#fbbf24]/50 bg-gradient-to-r from-[#fbbf24]/10 via-[#a855f7]/10 to-[#fbbf24]/10 p-4 shadow-lg"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-[#fbbf24]/40"
                style={{
                  left: `${20 + i * 20}%`,
                  top: '50%',
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2, delay: 0.5 }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#fbbf24] to-[#f59e0b]"
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              
              <div>
                <h3 className="font-semibold text-[#fbbf24]">
                  {newContentCount} neue Wörter verfügbar!
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dateStr} • Thema: {theme.name} {theme.icon}
                </p>
                {streak > 0 && (
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      🔥 {streak} Tage Streak
                    </Badge>
                    {streakBonus.multiplier > 1 && (
                      <Badge variant="default" className="bg-[#fbbf24] text-xs text-black">
                        {streakBonus.message}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={onViewNewWords}
                className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-black hover:from-[#f59e0b] hover:to-[#fbbf24]"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Jetzt lernen
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={dismissBanner}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Compact version for sidebar/header
export function NewContentIndicator({ userLevel = 1 }: { userLevel?: number }) {
  const { showBanner, newContentCount } = useNewContentBanner();
  const { streak } = useDynamicContent(userLevel);

  if (!showBanner) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] px-3 py-1 text-xs font-medium text-black"
    >
      <Sparkles className="h-3 w-3" />
      <span>{newContentCount} neu</span>
      {streak > 0 && (
        <>
          <span className="opacity-60">•</span>
          <span>🔥 {streak}</span>
        </>
      )}
    </motion.div>
  );
}

// Daily theme card
export function DailyThemeCard() {
  const { theme, isLoading } = useDynamicContent();

  if (isLoading) {
    return (
      <div className="h-24 animate-pulse rounded-xl bg-muted" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl border p-4"
      style={{ borderColor: theme.color }}
    >
      <div 
        className="absolute inset-0 opacity-10"
        style={{ backgroundColor: theme.color }}
      />
      <div className="relative flex items-center gap-4">
        <div 
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
          style={{ backgroundColor: theme.color }}
        >
          {theme.icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Heutiges Thema</p>
          <h3 className="text-xl font-bold">{theme.name}</h3>
          <p className="text-xs text-muted-foreground">
            Entdecke neue Wörter zum Thema {theme.name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
