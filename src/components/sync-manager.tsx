'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, 
  CloudOff, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Save,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

// Types for sync operations
interface SyncQueueItem {
  id: string;
  wordId: string;
  action: 'learn' | 'quiz' | 'progress';
  data: Record<string, unknown>;
  timestamp: number;
  synced: boolean;
  retryCount: number;
}

interface OfflineStorage {
  words: { id: string; german: string; english: string }[];
  progress: {
    learnedWords: string[];
    xp: number;
    level: number;
    streak: number;
  };
  syncQueue: SyncQueueItem[];
  lastSync: number | null;
}

const STORAGE_KEY = 'deutsch-offline-data';
const SYNC_QUEUE_KEY = 'deutsch-sync-queue';

export function useOfflineStorage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [storage, setStorage] = useState<OfflineStorage | null>(null);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<number | null>(null);

  // Initialize storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const queueStored = localStorage.getItem(SYNC_QUEUE_KEY);
      
      if (stored) {
        setStorage(JSON.parse(stored));
      } else {
        const initialStorage: OfflineStorage = {
          words: [],
          progress: {
            learnedWords: [],
            xp: 0,
            level: 1,
            streak: 0,
          },
          syncQueue: [],
          lastSync: null,
        };
        setStorage(initialStorage);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStorage));
      }
      
      if (queueStored) {
        setSyncQueue(JSON.parse(queueStored));
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize offline storage:', error);
    }
  }, []);

  // Save storage to localStorage
  const saveStorage = useCallback((newStorage: OfflineStorage) => {
    setStorage(newStorage);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));
    } catch (error) {
      console.error('Failed to save storage:', error);
    }
  }, []);

  // Add item to sync queue
  const addToSyncQueue = useCallback((item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'synced' | 'retryCount'>) => {
    const newItem: SyncQueueItem = {
      ...item,
      id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      synced: false,
      retryCount: 0,
    };
    
    setSyncQueue(prev => {
      const updated = [...prev, newItem];
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Mark item as synced
  const markAsSynced = useCallback((itemId: string) => {
    setSyncQueue(prev => {
      const updated = prev.map(item => 
        item.id === itemId ? { ...item, synced: true } : item
      );
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear synced items
  const clearSyncedItems = useCallback(() => {
    setSyncQueue(prev => {
      const filtered = prev.filter(item => !item.synced);
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(filtered));
      return filtered;
    });
  }, []);

  // Simulate sync operation
  const sync = useCallback(async (): Promise<boolean> => {
    if (isSyncing || !navigator.onLine) return false;
    
    setIsSyncing(true);
    const pendingItems = syncQueue.filter(item => !item.synced);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mark all pending items as synced
      const updatedQueue = syncQueue.map(item => 
        item.synced || pendingItems.includes(item) 
          ? { ...item, synced: true } 
          : item
      );
      
      setSyncQueue(updatedQueue);
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(updatedQueue));
      
      const newTime = Date.now();
      setLastSyncTime(newTime);
      
      // Update storage
      if (storage) {
        saveStorage({ ...storage, lastSync: newTime });
      }
      
      toast.success('Synchronisation erfolgreich', {
        description: `${pendingItems.length} Datenpunkte synchronisiert`,
      });
      
      return true;
    } catch (error) {
      toast.error('Synchronisation fehlgeschlagen');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing, syncQueue, storage, saveStorage]);

  // Learn word offline
  const learnWordOffline = useCallback((wordId: string) => {
    if (!storage) return;
    
    const newStorage = {
      ...storage,
      progress: {
        ...storage.progress,
        learnedWords: [...new Set([...storage.progress.learnedWords, wordId])],
      },
    };
    
    saveStorage(newStorage);
    
    addToSyncQueue({
      wordId,
      action: 'learn',
      data: { wordId, timestamp: Date.now() },
    });
  }, [storage, saveStorage, addToSyncQueue]);

  // Add XP offline
  const addXPOffline = useCallback((amount: number) => {
    if (!storage) return;
    
    const newStorage = {
      ...storage,
      progress: {
        ...storage.progress,
        xp: storage.progress.xp + amount,
      },
    };
    
    saveStorage(newStorage);
    
    addToSyncQueue({
      wordId: 'xp',
      action: 'progress',
      data: { xp: amount, timestamp: Date.now() },
    });
  }, [storage, saveStorage, addToSyncQueue]);

  // Calculate storage size
  const getStorageSize = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    
    try {
      const storage = localStorage.getItem(STORAGE_KEY) || '';
      const queue = localStorage.getItem(SYNC_QUEUE_KEY) || '';
      const totalSize = (storage.length + queue.length) * 2; // UTF-16 = 2 bytes per char
      return Math.round(totalSize / 1024); // KB
    } catch {
      return 0;
    }
  }, []);

  // Clear all offline data
  const clearAllData = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SYNC_QUEUE_KEY);
    setStorage(null);
    setSyncQueue([]);
    toast.success('Alle Offline-Daten gelöscht');
  }, []);

  return {
    storage,
    syncQueue,
    isSyncing,
    isInitialized,
    lastSyncTime,
    pendingCount: syncQueue.filter(item => !item.synced).length,
    storageSize: getStorageSize(),
    addToSyncQueue,
    markAsSynced,
    clearSyncedItems,
    sync,
    learnWordOffline,
    addXPOffline,
    clearAllData,
  };
}

// Sync status indicator
export function SyncStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const { 
    isSyncing, 
    pendingCount, 
    lastSyncTime,
    sync,
  } = useOfflineStorage();

  useEffect(() => {
    setMounted(true);
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!mounted) return null;

  const lastSyncText = lastSyncTime 
    ? new Date(lastSyncTime).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    : 'Nie';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      {/* Online/Offline Status */}
      <Badge 
        variant={isOnline ? 'default' : 'secondary'}
        className={`text-xs ${isOnline ? 'bg-green-500' : ''}`}
      >
        {isOnline ? 'Online' : 'Offline'}
      </Badge>
      
      {/* Sync Status */}
      {isSyncing ? (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <RefreshCw className="h-3 w-3 animate-spin" />
          <span>Sync...</span>
        </div>
      ) : pendingCount > 0 ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={sync}
          className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-900 dark:text-amber-100"
        >
          <CloudOff className="h-3 w-3" />
          <span>{pendingCount} warten</span>
        </motion.button>
      ) : (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Cloud className="h-3 w-3 text-green-500" />
          <span>Sync {lastSyncText}</span>
        </div>
      )}
    </motion.div>
  );
}

// Sync manager card
export function SyncManagerCard() {
  const {
    isSyncing,
    pendingCount,
    lastSyncTime,
    storageSize,
    sync,
    clearAllData,
  } = useOfflineStorage();
  
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const lastSyncText = lastSyncTime
    ? new Date(lastSyncTime).toLocaleString('de-DE')
    : 'Noch nie synchronisiert';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Daten-Synchronisation
        </CardTitle>
        <CardDescription>
          Verwalte deine Offline-Daten und Synchronisation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Sync Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <Badge variant={isOnline ? 'default' : 'destructive'}>
              {isOnline ? 'Verfügbar' : 'Offline'}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Letzte Synchronisation</span>
            <span className="text-sm">{lastSyncText}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Speicherplatz</span>
            <span className="text-sm">{storageSize} KB</span>
          </div>
          
          {pendingCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ausstehend</span>
              <Badge variant="secondary">{pendingCount} Einträge</Badge>
            </div>
          )}
        </div>

        {/* Sync Button */}
        <Button
          onClick={sync}
          disabled={!isOnline || isSyncing || pendingCount === 0}
          className="w-full"
        >
          {isSyncing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Synchronisiere...
            </>
          ) : (
            <>
              <Cloud className="mr-2 h-4 w-4" />
              {pendingCount > 0 ? `${pendingCount} Einträge synchronisieren` : 'Already synced'}
            </>
          )}
        </Button>

        {/* Storage Info */}
        <div className="rounded-lg border border-muted p-3">
          <div className="flex items-start gap-3">
            <Save className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              <p>Deine Daten werden lokal gespeichert und beim nächsten Online-Besuch synchronisiert.</p>
            </div>
          </div>
        </div>

        {/* Clear Data */}
        <div className="border-t pt-4">
          <Button
            variant="outline"
            onClick={() => {
              if (confirm('Möchtest du alle Offline-Daten löschen? Dies kann nicht rückgängig gemacht werden.')) {
                clearAllData();
              }
            }}
            className="w-full hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Alle Daten löschen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Auto-sync component
export function AutoSync() {
  const { sync, pendingCount, isSyncing } = useOfflineStorage();
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      if (!hasSynced && pendingCount > 0) {
        sync().then((success) => {
          if (success) setHasSynced(true);
        });
      }
    };

    window.addEventListener('online', handleOnline);
    
    // Also sync if already online when component mounts
    if (navigator.onLine && pendingCount > 0 && !isSyncing) {
      sync().then((success) => {
        if (success) setHasSynced(true);
      });
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [sync, pendingCount, hasSynced, isSyncing]);

  return null; // This is a background component
}
