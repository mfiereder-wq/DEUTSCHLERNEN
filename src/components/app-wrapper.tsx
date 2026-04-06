'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { InstallBanner } from './pwa-install';
import { OfflineModeCard } from './pwa-install';
import { SyncStatus, AutoSync } from './sync-manager';
import { registerSW } from '@/lib/sw-registration';
import { toast } from 'sonner';

// Service Worker registration component
function SWRegister() {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    registerSW({
      onSuccess: () => {
        console.log('[SW] Content cached for offline use');
        toast.success('App bereit für Offline-Nutzung', {
          description: 'Du kannst jetzt auch ohne Internet lernen',
        });
      },
      onUpdate: (registration) => {
        console.log('[SW] New content available');
        toast.info('Update verfügbar', {
          description: 'Neue Daten werden geladen...',
          action: {
            label: 'Neu laden',
            onClick: () => {
              registration.waiting?.postMessage('skipWaiting');
              window.location.reload();
            },
          },
        });
      },
    });

    // Check if already a PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsRegistered(true);
    }
  }, []);

  return null;
}

// Main app wrapper
export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Service Worker Registration */}
      <SWRegister />
      
      {/* Background Sync */}
      <AutoSync />
      
      {/* Install Banner (shows only when not installed) */}
      <InstallBanner />
      
      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {children}
      </motion.main>
      
      {/* Bottom status bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/80 p-2 backdrop-blur-sm sm:hidden">
        <div className="flex items-center justify-between">
          <SyncStatus />
          <OfflineModeCard className="!rounded-lg !border-0 !bg-transparent !p-0" />
        </div>
      </div>
    </div>
  );
}
