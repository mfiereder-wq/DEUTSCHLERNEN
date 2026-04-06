'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Wifi, WifiOff, X, Check, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

// Type for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  prompt(): Promise<void>;
}

// Custom hook for online status
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Verbindung wiederhergestellt', {
        description: 'Du bist jetzt online',
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('Offline-Modus', {
        description: 'Du kannst weiter lernen, aber einige Funktionen sind eingeschränkt',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, mounted };
}

// Custom hook for PWA install
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check for iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      toast.success('App installiert!', {
        description: 'DEUTSCHLERNEN ist jetzt auf deinem Gerät verfügbar',
      });
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        toast.info('iOS Installation', {
          description: 'Tippe auf "Teilen" und dann "Zum Home-Bildschirm hinzufügen"',
        });
      }
      return;
    }

    deferredPrompt.prompt();
    
    try {
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        toast.success('Installation akzeptiert');
      } else {
        toast.info('Installation abgelehnt');
      }
    } catch {
      toast.error('Installation fehlgeschlagen');
    }
    
    setDeferredPrompt(null);
  };

  const dismissPrompt = () => {
    setDeferredPrompt(null);
  };

  return {
    canInstall: !!deferredPrompt || isIOS,
    isInstalled,
    isIOS,
    promptInstall,
    dismissPrompt,
    mounted,
  };
}

// Install banner component
export function InstallBanner() {
  const { canInstall, isInstalled, isIOS, promptInstall, dismissPrompt, mounted } = usePWAInstall();
  const { isOnline } = useOnlineStatus();
  const [isVisible, setIsVisible] = useState(true);

  if (!mounted || !canInstall || isInstalled || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed inset-x-0 top-0 z-50 p-4 pb-0"
      >
        <Card className="border-2 border-[#fbbf24]/50 shadow-lg">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#fbbf24] to-[#f59e0b]">
                <Download className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">App installieren</h4>
                <p className="text-xs text-muted-foreground">
                  Für Offline-Lernen schneller Zugriff
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={promptInstall}>
                Installieren
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setIsVisible(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

// Compact install button
export function InstallButton() {
  const { canInstall, isInstalled, promptInstall, mounted } = usePWAInstall();

  if (!mounted || !canInstall || isInstalled) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={promptInstall}
      className="gap-2"
    >
      <Smartphone className="h-4 w-4" />
      App installieren
    </Button>
  );
}

// Online status indicator
export function OnlineStatus() {
  const { isOnline, mounted } = useOnlineStatus();

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
        isOnline
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="h-3 w-3" />
          <span>Online</span>
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3" />
          <span>Offline</span>
        </>
      )}
    </motion.div>
  );
}

// Offline mode card
export function OfflineModeCard() {
  const { isOnline, mounted } = useOnlineStatus();

  if (!mounted || isOnline) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
          <WifiOff className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h4 className="font-semibold text-amber-800 dark:text-amber-200">
            Du bist offline
          </h4>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Kein Problem! Dein Fortschritt wird gespeichert und synchronisiert, 
            sobald du wieder online bist.
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-amber-600">
            <Check className="h-3 w-3" />
            <span>Vokabeln verfügbar</span>
            <Check className="h-3 w-3 ml-2" />
            <span>Quiz spielbar</span>
            <Check className="h-3 w-3 ml-2" />
            <span>XP wird gespeichert</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// PWA info card
export function PWAInfoCard() {
  const { isInstalled, mounted } = usePWAInstall();

  if (!mounted) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          App Installieren
        </CardTitle>
        <CardDescription>
          Installiere DEUTSCHLERNEN für den besten Lernerlebnis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Offline-Lernen ohne Internet</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Schneller Start vom Homescreen</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Push-Benachrichtigungen für tägliche Wörter</span>
          </div>
        </div>
        
        {isInstalled ? (
          <div className="flex items-center gap-2 rounded-lg bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900 dark:text-green-100">
            <Check className="h-4 w-4" />
            <span>App ist installiert!</span>
          </div>
        ) : (
          <InstallButton />
        )}
      </CardContent>
    </Card>
  );
}
