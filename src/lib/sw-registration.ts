// Service Worker Registration
// Handles PWA registration, updates, and offline capabilities

export interface SWRegistrationConfig {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
}

// Register service worker
export async function registerSW(config: SWRegistrationConfig = {}): Promise<void> {
  if (typeof window === 'undefined') return;
  
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service workers not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('[SW] Service Worker registered:', registration.scope);

    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (!installingWorker) return;

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New update available
            console.log('[SW] New content available');
            config.onUpdate?.(registration);
          } else {
            // Content cached for offline use
            console.log('[SW] Content cached for offline use');
            config.onSuccess?.(registration);
          }
        }
      };
    };

    // Listen for messages from SW
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('[SW] Message from service worker:', event.data);
    });

  } catch (error) {
    console.error('[SW] Registration failed:', error);
  }
}

// Unregister service worker
export async function unregisterSW(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  if (!('serviceWorker' in navigator)) return false;

  const registration = await navigator.serviceWorker.ready;
  const result = await registration.unregister();
  console.log('[SW] Unregistered:', result);
  return result;
}

// Check if update is available
export async function checkForUpdates(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  if (!('serviceWorker' in navigator)) return false;

  const registration = await navigator.serviceWorker.ready;
  await registration.update();
  
  return !!registration.waiting;
}

// Skip waiting and activate new service worker
export async function skipWaiting(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;
  if (registration.waiting) {
    registration.waiting.postMessage('skipWaiting');
  }
}

// Subscribe to push notifications
export async function subscribeToPush(publicVapidKey: string): Promise<PushSubscription | null> {
  if (typeof window === 'undefined') return null;
  
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('[SW] Push notifications not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const existingSubscription = await registration.pushManager.getSubscription();
    
    if (existingSubscription) {
      console.log('[SW] Already subscribed to push');
      return existingSubscription;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    console.log('[SW] Push subscription:', subscription);
    return subscription;

  } catch (error) {
    console.error('[SW] Push subscription failed:', error);
    return null;
  }
}

// Unsubscribe from push notifications
export async function unsubscribeFromPush(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  
  if (subscription) {
    await subscription.unsubscribe();
    console.log('[SW] Unsubscribed from push');
    return true;
  }
  
  return false;
}

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined') return 'default';
  
  if (!('Notification' in window)) {
    return 'default';
  }

  const permission = await Notification.requestPermission();
  console.log('[SW] Notification permission:', permission);
  return permission;
}

// Send notification (via service worker)
export async function sendNotification(title: string, options: NotificationOptions = {}): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  if (!('serviceWorker' in navigator)) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      ...options,
    });
    return true;
  } catch (error) {
    console.error('[SW] Notification failed:', error);
    return false;
  }
}

// Helper: Convert base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

// Get PWA install status
export function getPWAStatus(): {
  isStandalone: boolean;
  canInstall: boolean;
} {
  if (typeof window === 'undefined') {
    return { isStandalone: false, canInstall: false };
  }

  // Check if running as installed PWA
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;

  // Check if install prompt is available
  const canInstall = 'BeforeInstallPromptEvent' in window;

  return { isStandalone, canInstall };
}

// Default export for easy import
export default registerSW;
