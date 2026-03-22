'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  VocabularyCard, 
  Level, 
  WordCategory, 
  categories, 
  sampleVocabulary,
  grammarTopicsInfo 
} from '@/data/vocabulary';
import { sentenceExercises, stories, SentenceExercise, Story } from '@/data/exercises';

// ============================================
// ICONS
// ============================================
const BookIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const QuizIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const EditIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const BookOpenIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const VideoIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const ImportIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const PlayIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PauseIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const XIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const ArrowLeftIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const ArrowRightIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const ShuffleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const VolumeIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>;

// ============================================
// TTS UTILITY - Web Speech API with better support
// ============================================
let germanVoices: SpeechSynthesisVoice[] = [];
let voicesLoaded = false;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      germanVoices = voices.filter(v => v.lang.startsWith('de'));
      voicesLoaded = true;
      resolve(germanVoices);
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      const newVoices = window.speechSynthesis.getVoices();
      germanVoices = newVoices.filter(v => v.lang.startsWith('de'));
      voicesLoaded = true;
      resolve(germanVoices);
    };

    // Timeout fallback
    setTimeout(() => {
      if (!voicesLoaded) {
        const fallbackVoices = window.speechSynthesis.getVoices();
        germanVoices = fallbackVoices.filter(v => v.lang.startsWith('de'));
        resolve(germanVoices);
      }
    }, 1000);
  });
}

// Split text into chunks for TTS (Web Speech API has ~200 char limit, server API ~500)
function splitTextIntoChunks(text: string, maxLength: number = 150): string[] {
  if (text.length <= maxLength) return [text];
  
  const chunks: string[] = [];
  const sentences = text.split(/(?<=[.!?。！？])\s*/);
  let currentChunk = '';
  
  for (const sentence of sentences) {
    if ((currentChunk + ' ' + sentence).trim().length <= maxLength) {
      currentChunk = (currentChunk + ' ' + sentence).trim();
    } else {
      if (currentChunk) chunks.push(currentChunk);
      
      // If single sentence is too long, split by words
      if (sentence.length > maxLength) {
        const words = sentence.split(' ');
        let wordChunk = '';
        for (const word of words) {
          if ((wordChunk + ' ' + word).trim().length <= maxLength) {
            wordChunk = (wordChunk + ' ' + word).trim();
          } else {
            if (wordChunk) chunks.push(wordChunk);
            wordChunk = word;
          }
        }
        if (wordChunk) currentChunk = wordChunk;
        else currentChunk = '';
      } else {
        currentChunk = sentence;
      }
    }
  }
  if (currentChunk) chunks.push(currentChunk);
  
  return chunks;
}

// Server-side TTS fallback - handles longer texts better
async function fetchServerTTS(text: string): Promise<boolean> {
  try {
    // For texts longer than 450 chars, split and play sequentially
    const chunks = splitTextIntoChunks(text, 450);
    
    for (let i = 0; i < chunks.length; i++) {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chunks[i], speed: 0.85 })
      });

      if (!response.ok) {
        console.error('TTS API failed for chunk', i);
        return false;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      // Play and wait for completion
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          reject(new Error('Audio playback failed'));
        };
        audio.play().catch(reject);
      });
    }
    
    return true;
  } catch (e) {
    console.error('Server TTS error:', e);
    return false;
  }
}

// Speak a single chunk using Web Speech API
function speakChunk(text: string, rate: number): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = rate;
      utterance.pitch = 1;
      utterance.volume = 1;

      const allVoices = window.speechSynthesis.getVoices();
      const germanVoicesLocal = allVoices.filter(v => 
        v.lang.startsWith('de') || v.lang === 'de-DE' || v.lang === 'de-AT' || v.lang === 'de-CH'
      );
      
      if (germanVoicesLocal.length > 0) {
        utterance.voice = germanVoicesLocal[0];
      }

      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);

      // Chrome workaround: resume if paused
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      resolve(false);
    }
  });
}

// Main speak function - splits long text and plays sequentially
async function speakText(text: string, rate: number = 0.85): Promise<boolean> {
  // For longer texts, use server TTS directly (more reliable)
  if (text.length > 300) {
    console.log('Long text detected, using server TTS');
    const success = await fetchServerTTS(text);
    if (success) return true;
    // If server fails, fall through to chunked Web Speech
  }
  
  // Check if speech synthesis is available
  if (!('speechSynthesis' in window)) {
    toast.error('Browser unterstützt keine Sprachausgabe - nutze Server-Audio');
    return await fetchServerTTS(text);
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Wait for voices if not loaded
    if (!voicesLoaded) {
      await loadVoices();
    }

    // Split text into manageable chunks
    const chunks = splitTextIntoChunks(text, 150);
    console.log(`Speaking ${chunks.length} chunks`);
    
    // Speak each chunk sequentially
    for (let i = 0; i < chunks.length; i++) {
      const success = await speakChunk(chunks[i], rate);
      if (!success && i === 0) {
        // First chunk failed, try server TTS
        console.log('Web Speech failed, trying server TTS');
        return await fetchServerTTS(text);
      }
      
      // Small pause between chunks for natural flow
      if (i < chunks.length - 1) {
        await new Promise(r => setTimeout(r, 100));
      }
    }
    
    return true;
  } catch (error) {
    console.error('Speech synthesis error:', error);
    return await fetchServerTTS(text);
  }
}

// Load voices on module load
if (typeof window !== 'undefined') {
  loadVoices();
}

// ============================================
// VIDEO DATA
// ============================================
interface VideoItem {
  id: string;
  title: string;
  description: string;
  vimeoId?: string;
  youtubeId?: string;
  level: Level;
  category: string;
  duration: string;
}

const videoLibrary: VideoItem[] = [
  {
    id: 'video-001',
    title: 'Wegbeschreibung und Orientierung',
    description: 'Lerne, wie du nach dem Weg fragst und dich in Deutschland orientierst. Wichtige Vokabeln und Sätze für A2/B1.',
    vimeoId: '1139842875',
    level: 'A2',
    category: 'Verkehr & Orientierung',
    duration: '10 Min.'
  },
  {
    id: 'video-002',
    title: 'Deutsch Grammatik A1-A2-B1',
    description: 'Umfassende Grammatikübersicht für Deutschlerner. Ideal für B1-Lernende zur Wiederholung und Vertiefung.',
    youtubeId: 'dT2ANPzxhHg',
    level: 'B1',
    category: 'Grammatik',
    duration: '45 Min.'
  },
  {
    id: 'video-003',
    title: 'Deutsch Sprechen üben',
    description: 'Sprechübungen für Deutschlerner. Verbessere deine Aussprache und Sprechfertigkeit.',
    youtubeId: 'bcj9SRTbCgY',
    level: 'A2',
    category: 'Sprechen',
    duration: '20 Min.'
  },
  {
    id: 'video-004',
    title: 'Deutsche Verben konjugieren',
    description: 'Lerne, wie man deutsche Verben richtig konjugiert. Wichtig für A2 und B1 Prüfungen.',
    youtubeId: 'uK2H0i6tObI',
    level: 'A2',
    category: 'Grammatik',
    duration: '15 Min.'
  },
  {
    id: 'video-005',
    title: 'Deutsch Hörverständnis üben',
    description: 'Hörübungen für Deutschlerner. Trainiere dein Hörverständnis für Prüfungen.',
    youtubeId: '2X2ol0jhl2M',
    level: 'B1',
    category: 'Hören',
    duration: '25 Min.'
  }
];

// ============================================
// MAIN APP
// ============================================
export default function DeutschLernenApp() {
  const [level, setLevel] = useState<Level>('A2');
  const [activeTab, setActiveTab] = useState('cards');
  const [importedCards, setImportedCards] = useState<VocabularyCard[]>([]);

  // Use useMemo for vocabulary - no cascading renders
  const vocabulary = useMemo(() => {
    const filtered = sampleVocabulary.filter(v => v.level === level);
    return [...filtered, ...importedCards.filter(v => v.level === level)];
  }, [level, importedCards]);

  const loading = false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 flex flex-col">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-300/30 to-violet-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 shadow-lg shadow-violet-500/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 text-white font-bold text-xl shadow-xl shadow-purple-500/30">
                  DE
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  {level}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Deutsch Lernen
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Goethe A2/B1 Vokabeltrainer</p>
              </div>
            </div>

            {/* Level Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 p-1.5 dark:from-slate-800 dark:to-slate-800/50 shadow-inner">
                <button
                  onClick={() => setLevel('A2')}
                  className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    level === 'A2'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  A2
                </button>
                <button
                  onClick={() => setLevel('B1')}
                  className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    level === 'B1'
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  B1
                </button>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-100 to-pink-100 dark:from-violet-900/30 dark:to-pink-900/30">
                <span className="text-lg">📚</span>
                <Badge variant="outline" className="text-sm font-medium border-0 bg-transparent">
                  {vocabulary.length} Wörter
                </Badge>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-6 h-auto gap-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
            <TabsTrigger value="cards" className="gap-2 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              <BookIcon />
              <span className="hidden sm:inline">Karten</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              <QuizIcon />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="sentences" className="gap-2 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              <EditIcon />
              <span className="hidden sm:inline">Sätze</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="gap-2 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              <BookOpenIcon />
              <span className="hidden sm:inline">Geschichten</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              <VideoIcon />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="import" className="gap-2 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              <ImportIcon />
              <span className="hidden sm:inline">Import</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards">
            <FlashcardMode vocabulary={vocabulary} loading={loading} level={level} />
          </TabsContent>

          <TabsContent value="quiz">
            <QuizMode vocabulary={vocabulary} loading={loading} level={level} />
          </TabsContent>

          <TabsContent value="sentences">
            <SentenceMode level={level} />
          </TabsContent>

          <TabsContent value="stories">
            <StoryMode level={level} />
          </TabsContent>

          <TabsContent value="videos">
            <VideoMode level={level} />
          </TabsContent>

          <TabsContent value="import">
            <ImportMode level={level} onImport={(cards) => setImportedCards(prev => [...prev, ...cards])} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
            <p className="flex items-center gap-2">
              <span>🇩🇪</span>
              Basierend auf den offiziellen Wortschatzlisten des Goethe-Instituts und telc
            </p>
            <Badge className={`bg-gradient-to-r ${level === 'A2' ? 'from-emerald-500 to-teal-500' : 'from-violet-500 to-purple-500'} text-white border-0`}>
              {level}-Niveau
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// FLASHCARD MODE
// ============================================
function FlashcardMode({ vocabulary, loading, level }: { vocabulary: VocabularyCard[]; loading: boolean; level: Level }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [testAnswers, setTestAnswers] = useState<Record<string, boolean>>({});
  const [testCards, setTestCards] = useState<VocabularyCard[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Component resets automatically when level changes via key prop in parent

  const currentCard = vocabulary[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev + 1) % vocabulary.length), 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev - 1 + vocabulary.length) % vocabulary.length), 150);
  };

  const shuffleCards = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * vocabulary.length));
  };

  const startTest = () => {
    const shuffled = [...vocabulary].sort(() => Math.random() - 0.5).slice(0, 10);
    setTestCards(shuffled);
    setTestAnswers({});
    setShowTest(true);
  };

  // Speak word using Web Speech API
  const handleSpeak = async (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    setIsSpeaking(true);
    const success = await speakText(text, 0.8);
    setIsSpeaking(false);
    if (!success) {
      toast.error('Sprachausgabe nicht verfügbar');
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showTest) return;
      if (e.key === 'ArrowLeft') prevCard();
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(f => !f);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [vocabulary.length, showTest]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!vocabulary.length) {
    return (
      <Card className="max-w-lg mx-auto bg-gradient-to-br from-violet-100 to-pink-100 dark:from-violet-900/30 dark:to-pink-900/30 border-0">
        <CardContent className="py-12 text-center">
          <span className="text-4xl mb-4 block">📚</span>
          <p className="text-slate-600 dark:text-slate-300">Keine Vokabeln für dieses Niveau gefunden.</p>
        </CardContent>
      </Card>
    );
  }

  if (showTest) {
    return (
      <FlashcardTest
        cards={testCards}
        answers={testAnswers}
        setAnswers={setTestAnswers}
        onClose={() => setShowTest(false)}
        level={level}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
          <span className="flex items-center gap-2">
            <span className="text-lg">🎴</span>
            Karte {currentIndex + 1} von {vocabulary.length}
          </span>
          <span className="font-medium">{Math.round(((currentIndex + 1) / vocabulary.length) * 100)}%</span>
        </div>
        <Progress value={((currentIndex + 1) / vocabulary.length) * 100} className="h-2 bg-slate-200 dark:bg-slate-700 [&>div]:bg-gradient-to-r [&>div]:from-violet-500 [&>div]:to-pink-500" />
      </div>

      {/* Flashcard */}
      <div className="flex justify-center">
        <div
          className="relative w-full max-w-lg h-96 cursor-pointer perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className="absolute inset-0 transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Front */}
            <Card
              className="absolute inset-0 flex flex-col items-center justify-center p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white via-violet-50 to-pink-50 dark:from-slate-800 dark:via-violet-900/20 dark:to-pink-900/20 shadow-xl"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Badge className={`mb-4 ${level === 'A2' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-violet-500 to-purple-500'} text-white border-0`}>{level}</Badge>
              {currentCard.article && <span className="text-lg text-slate-400 mb-2">{currentCard.article}</span>}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">{currentCard.word}</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => handleSpeak(currentCard.word, e)}
                  className={`h-12 w-12 rounded-full ${isSpeaking ? 'bg-pink-100 dark:bg-pink-900/50' : 'hover:bg-violet-100 dark:hover:bg-violet-900/50'} transition-all`}
                  title="Wort anhören"
                >
                  {isSpeaking ? <PauseIcon /> : <VolumeIcon />}
                </Button>
              </div>
              <Badge variant="outline" className="border-violet-200 dark:border-violet-700">{getWordTypeLabel(currentCard.wordType)}</Badge>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {currentCard.grammar.topics.slice(0, 2).map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30">
                    {grammarTopicsInfo[topic]?.name || topic}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-slate-400 mt-6">👆 Klicke zum Umdrehen</p>
            </Card>

            {/* Back */}
            <Card
              className="absolute inset-0 flex flex-col items-center justify-center p-8 border-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-cyan-900/30 shadow-xl"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <p className="text-2xl font-semibold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {currentCard.translation}
                </p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => handleSpeak(currentCard.exampleSentence.german, e)}
                  className="h-8 w-8 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                  title="Beispielsatz anhören"
                >
                  <VolumeIcon />
                </Button>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl p-4 w-full mb-4 shadow-sm">
                <p className="text-sm text-slate-700 dark:text-slate-300 italic">&ldquo;{currentCard.exampleSentence.german}&rdquo;</p>
                <p className="text-xs text-slate-400 mt-2">{currentCard.exampleSentence.translation}</p>
              </div>
              {currentCard.grammar.hint && (
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-3 w-full">
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    <strong>💡 Grammatik:</strong> {currentCard.grammar.hint}
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline" onClick={prevCard} size="lg" className="rounded-xl border-violet-200 hover:bg-violet-50 dark:border-violet-700"><ArrowLeftIcon /></Button>
        <Button variant="outline" onClick={shuffleCards} size="lg" className="rounded-xl border-pink-200 hover:bg-pink-50 dark:border-pink-700"><ShuffleIcon /> Mischen</Button>
        <Button onClick={startTest} size="lg" className="rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white shadow-lg shadow-violet-500/30">📝 Test starten</Button>
        <Button variant="outline" onClick={nextCard} size="lg" className="rounded-xl border-violet-200 hover:bg-violet-50 dark:border-violet-700"><ArrowRightIcon /></Button>
      </div>

      <p className="text-center text-sm text-slate-400">
        ⌨️ Tastatur: ← → zum Navigieren, Leertaste zum Umdrehen
      </p>
    </div>
  );
}

// ============================================
// FLASHCARD TEST MODE
// ============================================
function FlashcardTest({
  cards,
  answers,
  setAnswers,
  onClose,
  level
}: {
  cards: VocabularyCard[];
  answers: Record<string, boolean>;
  setAnswers: (a: Record<string, boolean>) => void;
  onClose: () => void;
  level: Level;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);

  const currentCard = cards[currentIndex];
  const isComplete = currentIndex >= cards.length;

  const checkAnswer = () => {
    const correct = userInput.toLowerCase().trim() === currentCard.translation.toLowerCase().trim();
    setAnswers({ ...answers, [currentCard.id]: correct });
    setShowResult(true);
  };

  const nextQuestion = () => {
    setUserInput('');
    setShowResult(false);
    setCurrentIndex(prev => prev + 1);
  };

  const correctCount = Object.values(answers).filter(Boolean).length;

  if (isComplete) {
    const percentage = Math.round((correctCount / cards.length) * 100);
    return (
      <Card className="max-w-lg mx-auto border-0 bg-gradient-to-br from-violet-100 via-pink-100 to-orange-100 dark:from-violet-900/30 dark:via-pink-900/30 dark:to-orange-900/30 shadow-2xl">
        <CardContent className="py-12 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-400 via-pink-500 to-orange-500 flex items-center justify-center shadow-xl">
            <span className="text-3xl font-bold text-white">{percentage}%</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Test abgeschlossen!</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Du hast {correctCount} von {cards.length} Vokabeln richtig beantwortet.
          </p>
          <Button onClick={onClose} size="lg" className="rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white">Zurück zu den Karten</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className={`${level === 'A2' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-violet-500 to-purple-500'} text-white border-0`}>{level} Test</Badge>
          <span className="text-sm text-slate-500">{currentIndex + 1} / {cards.length}</span>
        </div>
        <CardTitle className="text-xl mt-4">Was bedeutet dieses Wort?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-6 bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-900/20 dark:to-pink-900/20 rounded-xl">
          {currentCard.article && <span className="text-slate-400 mr-2">{currentCard.article}</span>}
          <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">{currentCard.word}</span>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !showResult && checkAnswer()}
            placeholder="Schreibe die Übersetzung..."
            className="w-full px-4 py-3 rounded-xl border-2 border-violet-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 dark:focus:ring-pink-900/30 focus:outline-none text-lg bg-white dark:bg-slate-700"
            disabled={showResult}
            autoFocus
          />
        </div>

        {showResult && (
          <div className={`p-4 rounded-xl ${answers[currentCard.id] ? 'bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30' : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30'}`}>
            <div className="flex items-center gap-2 mb-2">
              {answers[currentCard.id] ? <CheckIcon /> : <XIcon />}
              <span className={answers[currentCard.id] ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
                {answers[currentCard.id] ? 'Richtig!' : 'Leider falsch'}
              </span>
            </div>
            {!answers[currentCard.id] && (
              <p className="text-sm">Richtige Antwort: <strong>{currentCard.translation}</strong></p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          {!showResult ? (
            <Button onClick={checkAnswer} className="flex-1 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white" size="lg" disabled={!userInput.trim()}>
              Prüfen
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white" size="lg">
              {currentIndex < cards.length - 1 ? 'Nächste' : 'Ergebnis'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// QUIZ MODE
// ============================================
function QuizMode({ vocabulary, loading, level }: { vocabulary: VocabularyCard[]; loading: boolean; level: Level }) {
  // Initialize quiz cards on mount (key prop handles level changes)
  const [quizCards, setQuizCards] = useState<VocabularyCard[]>(() =>
    [...vocabulary].sort(() => Math.random() - 0.5).slice(0, 10)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Stable options for each question - only recalculates when currentIndex or quizCards changes
  const options = useMemo(() => {
    if (!quizCards[currentIndex]) return [];
    const correct = quizCards[currentIndex];
    const wrong = vocabulary.filter(v => v.id !== correct.id).sort(() => Math.random() - 0.5).slice(0, 3);
    return [correct, ...wrong].sort(() => Math.random() - 0.5);
  }, [currentIndex, quizCards, vocabulary]);

  const currentCard = quizCards[currentIndex];

  const startQuiz = () => {
    const shuffled = [...vocabulary].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizCards(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (options[index]?.id === currentCard?.id) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex >= quizCards.length - 1) {
      setQuizComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  if (loading || quizCards.length === 0) {
    return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div></div>;
  }

  if (quizComplete) {
    const percentage = Math.round((score / quizCards.length) * 100);
    return (
      <Card className="max-w-lg mx-auto border-0 bg-gradient-to-br from-pink-100 via-rose-100 to-orange-100 dark:from-pink-900/30 dark:via-rose-900/30 dark:to-orange-900/30 shadow-2xl">
        <CardContent className="py-12 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 via-rose-500 to-orange-500 flex items-center justify-center shadow-xl">
            <span className="text-3xl font-bold text-white">{percentage}%</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Quiz abgeschlossen!</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">Du hast {score} von {quizCards.length} Fragen richtig beantwortet.</p>
          <Button onClick={startQuiz} size="lg" className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white">Nochmal spielen</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          Frage {currentIndex + 1} von {quizCards.length}
        </span>
        <span className="text-pink-600 dark:text-pink-400 font-medium flex items-center gap-1">
          <span>✨</span> {score} richtig
        </span>
      </div>
      <Progress value={((currentIndex + 1) / quizCards.length) * 100} className="h-2 bg-slate-200 dark:bg-slate-700 [&>div]:bg-gradient-to-r [&>div]:from-pink-500 [&>div]:to-rose-500" />

      <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500" />
        <CardHeader>
          <Badge className={`w-fit ${level === 'A2' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-violet-500 to-purple-500'} text-white border-0`}>{level} Quiz</Badge>
          <CardTitle className="text-2xl mt-2">Was bedeutet &ldquo;{currentCard?.word}&rdquo;?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <AnimatePresence mode="wait">
            {options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = opt?.id === currentCard?.id;
              let classes = 'border-2 border-slate-200 dark:border-slate-600 hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20';
              if (showResult) {
                if (isCorrect) classes = 'border-2 border-emerald-400 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30';
                else if (isSelected) classes = 'border-2 border-red-400 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30';
              }
              return (
                <motion.button
                  key={opt?.id || idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-xl transition-all ${classes}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                >
                  <span className="flex items-center gap-3">
                    <motion.span 
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium ${showResult && isCorrect ? 'bg-emerald-500 text-white border-emerald-500' : showResult && isSelected ? 'bg-red-500 text-white border-red-500' : 'border-slate-300 dark:border-slate-500'}`}
                      animate={showResult && isCorrect ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : showResult && isSelected ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {idx + 1}
                    </motion.span>
                    <span className="font-medium">{opt?.translation}</span>
                    <AnimatePresence>
                      {showResult && isCorrect && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <CheckIcon />
                        </motion.div>
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <XIcon />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Animated Feedback Overlay */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center"
          >
            {options[selectedAnswer!]?.id === currentCard?.id ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/30"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  🎉
                </motion.span>
                Richtig!
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg shadow-red-500/30"
              >
                <motion.span
                  animate={{ x: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  😢
                </motion.span>
                Leider falsch
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button onClick={nextQuestion} size="lg" className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30">
            {currentIndex >= quizCards.length - 1 ? 'Ergebnis anzeigen' : 'Nächste Frage'}
          </Button>
        </motion.div>
      )}
    </div>
  );
}

// ============================================
// SENTENCE COMPLETION MODE
// ============================================
function SentenceMode({ level }: { level: Level }) {
  const exercises = useMemo(() => sentenceExercises.filter(e => e.level === level), [level]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  // Component resets automatically when level changes via key prop in parent

  const current = exercises[currentIndex];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (current.options[index] === current.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex >= exercises.length - 1) {
      setComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setComplete(false);
  };

  if (exercises.length === 0) {
    return (
      <Card className="max-w-lg mx-auto border-0 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30">
        <CardContent className="py-12 text-center">
          <span className="text-4xl mb-4 block">✏️</span>
          <p className="text-slate-600 dark:text-slate-300">Keine Übungen für dieses Niveau verfügbar.</p>
        </CardContent>
      </Card>
    );
  }

  if (complete) {
    const percentage = Math.round((score / exercises.length) * 100);
    return (
      <Card className="max-w-lg mx-auto border-0 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-900/30 dark:via-amber-900/30 dark:to-yellow-900/30 shadow-2xl">
        <CardContent className="py-12 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 flex items-center justify-center shadow-xl">
            <span className="text-3xl font-bold text-white">{percentage}%</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Übung abgeschlossen!</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">Du hast {score} von {exercises.length} Sätzen richtig ergänzt.</p>
          <Button onClick={restart} size="lg" className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white">Nochmal üben</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="text-lg">✏️</span>
          Satz {currentIndex + 1} von {exercises.length}
        </span>
        <Badge variant="outline" className="border-orange-200 dark:border-orange-700">{current.category}</Badge>
      </div>
      <Progress value={((currentIndex + 1) / exercises.length) * 100} className="h-2 bg-slate-200 dark:bg-slate-700 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-amber-500" />

      <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className={`${level === 'A2' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-violet-500 to-purple-500'} text-white border-0`}>{level}</Badge>
            {current.grammarTopic && <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30">{current.grammarTopic}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
            <p className="text-xl font-medium bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{current.sentence}</p>
            <p className="text-sm text-slate-500 mt-2">{current.translation}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {current.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = opt === current.correctAnswer;
              let classes = 'border-2 border-slate-200 dark:border-slate-600';
              if (showResult) {
                if (isCorrect) classes = 'border-2 border-emerald-400 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30';
                else if (isSelected) classes = 'border-2 border-red-400 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30';
              }
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={`p-4 rounded-xl transition-all hover:bg-orange-50 dark:hover:bg-orange-900/20 ${classes}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  whileHover={!showResult ? { scale: 1.03 } : {}}
                  whileTap={!showResult ? { scale: 0.97 } : {}}
                >
                  <span className="font-medium">{opt}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Animated Feedback */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex justify-center"
              >
                {current.options[selectedAnswer!] === current.correctAnswer ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/30"
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      🎉
                    </motion.span>
                    Richtig!
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg shadow-red-500/30"
                  >
                    <motion.span
                      animate={{ x: [0, -5, 5, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      😢
                    </motion.span>
                    Leider falsch
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {showResult && current.hint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl"
            >
              <p className="text-sm text-blue-700 dark:text-blue-300"><strong>💡 Tipp:</strong> {current.hint}</p>
            </motion.div>
          )}

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button onClick={nextQuestion} size="lg" className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30">
                {currentIndex >= exercises.length - 1 ? 'Ergebnis' : 'Nächster Satz'}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// STORY MODE
// ============================================
function StoryMode({ level }: { level: Level }) {
  const availableStories = useMemo(() => stories.filter(s => s.level === level), [level]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Component resets automatically when level changes via key prop in parent

  const handlePlayAudio = async () => {
    if (!selectedStory) return;
    
    // If already playing, stop
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setAudioError(null);
    setIsPlaying(true);
    
    const success = await speakText(selectedStory.text, 0.85);
    
    setIsPlaying(false);
    if (!success) {
      setAudioError('Sprachausgabe nicht verfügbar. Bitte prüfe deine Browsereinstellungen.');
    }
  };

  const handleAnswer = (index: number) => {
    if (showResult || !selectedStory) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === selectedStory.questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (!selectedStory) return;
    if (currentQuestion >= selectedStory.questions.length - 1) {
      setComplete(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const startStory = (story: Story) => {
    // Clean up any existing speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSelectedStory(story);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setComplete(false);
    setIsPlaying(false);
    setAudioError(null);
  };

  const resetStory = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSelectedStory(null);
    setIsPlaying(false);
    setAudioError(null);
  };

  if (availableStories.length === 0) {
    return (
      <Card className="max-w-lg mx-auto border-0 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30">
        <CardContent className="py-12 text-center">
          <span className="text-4xl mb-4 block">📖</span>
          <p className="text-slate-600 dark:text-slate-300">Keine Geschichten für dieses Niveau verfügbar.</p>
        </CardContent>
      </Card>
    );
  }

  // Story Selection
  if (!selectedStory) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">📖</span>
          Wähle eine Geschichte zum Lesen oder Hören
        </h2>
        {availableStories.map((story) => (
          <Card
            key={story.id}
            className="cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur overflow-hidden group"
            onClick={() => startStory(story)}
          >
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 group-hover:h-2 transition-all" />
            <CardContent className="py-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{story.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                    <span>{story.category}</span>
                    <span>•</span>
                    <span>{story.duration} Min.</span>
                  </p>
                </div>
                <Badge className={`${level === 'A2' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-violet-500 to-purple-500'} text-white border-0`}>{level}</Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                {story.text.slice(0, 150)}...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Reading View
  if (!complete && currentQuestion === 0 && !showResult) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{selectedStory.title}</CardTitle>
              <Button variant="ghost" onClick={resetStory} className="rounded-xl">✕ Schließen</Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${level === 'A2' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-violet-500 to-purple-500'} text-white border-0`}>{level}</Badge>
              <Badge variant="outline" className="border-emerald-200 dark:border-emerald-700">{selectedStory.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Audio Player */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 rounded-xl">
              <Button 
                onClick={handlePlayAudio} 
                size="icon" 
                className={`h-12 w-12 rounded-full shadow-lg ${isPlaying ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} text-white`}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </Button>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {isPlaying ? '🔊 Wird abgespielt...' : '🔇 Vorlesen lassen'}
                </p>
                <p className="text-xs text-slate-500">
                  {audioError || 'Klicke auf Play für deutsche Sprachausgabe'}
                </p>
              </div>
              <VolumeIcon />
            </div>
            {audioError && (
              <p className="text-sm text-red-500">{audioError}</p>
            )}

            <ScrollArea className="h-64 rounded-xl border-2 border-emerald-100 dark:border-emerald-800 p-4 bg-white/50 dark:bg-slate-700/50">
              <p className="text-base leading-relaxed whitespace-pre-line">{selectedStory.text}</p>
            </ScrollArea>

            <div className="flex gap-3">
              <Button variant="outline" onClick={resetStory} className="rounded-xl">Zurück</Button>
              <Button onClick={() => setShowResult(true)} className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
                📝 Fragen beantworten ({selectedStory.questions.length} Fragen)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Questions
  if (!complete) {
    const question = selectedStory.questions[currentQuestion];
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-lg">❓</span>
            Frage {currentQuestion + 1} von {selectedStory.questions.length}
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <span>✨</span> {score} richtig
          </span>
        </div>
        <Progress value={((currentQuestion + 1) / selectedStory.questions.length) * 100} className="h-2 bg-slate-200 dark:bg-slate-700 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-teal-500" />

        <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-xl">
          <CardContent className="py-6 space-y-4">
            <p className="text-xl font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === question.correctAnswer;
                let classes = 'border-2 border-slate-200 dark:border-slate-600';
                if (showResult) {
                  if (isCorrect) classes = 'border-2 border-emerald-400 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30';
                  else if (isSelected) classes = 'border-2 border-red-400 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30';
                }
                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-xl transition-all ${classes}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
            
            {/* Animated Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex justify-center"
                >
                  {selectedAnswer === question.correctAnswer ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/30"
                    >
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: 2 }}
                      >
                        🎉
                      </motion.span>
                      Richtig!
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg shadow-red-500/30"
                    >
                      <motion.span
                        animate={{ x: [0, -5, 5, -5, 5, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        😢
                      </motion.span>
                      Leider falsch
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button onClick={nextQuestion} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white" size="lg">
                  {currentQuestion >= selectedStory.questions.length - 1 ? 'Ergebnis' : 'Nächste Frage'}
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results
  const percentage = Math.round((score / selectedStory.questions.length) * 100);
  return (
    <Card className="max-w-lg mx-auto border-0 bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-teal-900/30 shadow-2xl">
      <CardContent className="py-12 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center shadow-xl">
          <span className="text-3xl font-bold text-white">{percentage}%</span>
        </div>
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Geschichte abgeschlossen!</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">Du hast {score} von {selectedStory.questions.length} Fragen richtig beantwortet.</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={resetStory} className="rounded-xl">Andere Geschichte</Button>
          <Button onClick={() => startStory(selectedStory)} className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Nochmal lesen</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// VIDEO MODE
// ============================================
function VideoMode({ level }: { level: Level }) {
  const filteredVideos = useMemo(() => videoLibrary.filter(v => v.level === level), [level]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  if (!selectedVideo) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          Lernvideos für {level}
        </h2>
        {filteredVideos.length === 0 ? (
          <Card className="border-0 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30">
            <CardContent className="py-12 text-center">
              <span className="text-4xl mb-4 block">🎥</span>
              <p className="text-slate-600 dark:text-slate-300">Keine Videos für dieses Niveau verfügbar.</p>
            </CardContent>
          </Card>
        ) : (
          filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur overflow-hidden group"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 group-hover:h-2 transition-all" />
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="w-32 h-20 bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                    <PlayIcon />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">{video.title}</h3>
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">{video.duration}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{video.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="border-red-200 dark:border-red-700">{video.category}</Badge>
                      <Badge className={`${level === 'A2' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-violet-500 to-purple-500'} text-white border-0`}>{video.level}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="outline" onClick={() => setSelectedVideo(null)} className="rounded-xl">
        ← Zurück zur Übersicht
      </Button>
      
      <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">{selectedVideo.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-red-200 dark:border-red-700">{selectedVideo.category}</Badge>
            <Badge className={`${level === 'A2' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-violet-500 to-purple-500'} text-white border-0`}>{selectedVideo.level}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Video Embed - Vimeo or YouTube */}
          <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-xl">
            {selectedVideo.vimeoId ? (
              <iframe
                src={`https://player.vimeo.com/video/${selectedVideo.vimeoId}?h=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title={selectedVideo.title}
                className="w-full h-full"
              />
            ) : selectedVideo.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?rel=0&amp;showinfo=0`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={selectedVideo.title}
                className="w-full h-full"
              />
            ) : null}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">{selectedVideo.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// IMPORT MODE
// ============================================
function ImportMode({ level, onImport }: { level: Level; onImport: (cards: VocabularyCard[]) => void }) {
  const [importText, setImportText] = useState('');
  const [previewCards, setPreviewCards] = useState<VocabularyCard[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [importing, setImporting] = useState(false);

  const handlePreview = () => {
    if (!importText.trim()) {
      toast.error('Bitte gib einen Text ein');
      return;
    }

    const lines = importText.trim().split('\n').filter(l => l.trim());

    const cards: VocabularyCard[] = lines.map((line, index) => {
      const parts = line.split(/[;,\t|]/).map(p => p.trim());
      const word = parts[0] || '';
      const translation = parts[1] || '';
      const article = word.match(/^(der|die|das)\s/i)?.[1] || undefined;
      const cleanWord = article ? word.replace(new RegExp(`^${article}\\s+`, 'i'), '') : word;

      return {
        id: `import-${Date.now()}-${index}`,
        word: cleanWord,
        article: article,
        wordType: 'noun' as const,
        translation: translation || 'Bitte Übersetzung eingeben',
        level: level,
        category: 'alltag' as WordCategory,
        exampleSentence: {
          german: `Beispielsatz mit ${cleanWord}.`,
          translation: `Example sentence with ${cleanWord}.`
        },
        grammar: {
          topics: [],
          hint: ''
        },
        metadata: {
          frequency: 3,
          examRelevance: 3,
          timesReviewed: 0,
          timesCorrect: 0
        }
      };
    });

    setPreviewCards(cards);
    setShowPreview(true);
  };

  const handleImport = async () => {
    setImporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onImport(previewCards);
      toast.success(`${previewCards.length} Vokabeln erfolgreich importiert!`);
      setImportText('');
      setPreviewCards([]);
      setShowPreview(false);
    } catch {
      toast.error('Fehler beim Import');
    } finally {
      setImporting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-xl overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">📤 Vokabeln importieren</CardTitle>
        <CardDescription>Füge Vokabeln im Format: Wort; Übersetzung ein (eine pro Zeile)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="der Tisch; mesa&#10;die Frau; mulher&#10;essen; comer"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          rows={6}
          className="rounded-xl border-cyan-200 dark:border-cyan-700 focus:border-blue-400"
        />

        {!showPreview ? (
          <Button onClick={handlePreview} className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white" disabled={!importText.trim()}>
            Vorschau anzeigen
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="max-h-60 overflow-y-auto space-y-2">
              {previewCards.map((card, idx) => (
                <div key={card.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl">
                  <div>
                    <span className="font-medium">{card.article ? `${card.article} ` : ''}{card.word}</span>
                    <span className="text-slate-400 mx-2">→</span>
                    <span className="text-cyan-600 dark:text-cyan-400">{card.translation}</span>
                  </div>
                  <Badge variant="outline" className="border-cyan-200 dark:border-cyan-700">{idx + 1}</Badge>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPreview(false)} className="flex-1 rounded-xl">Abbrechen</Button>
              <Button 
                onClick={handleImport} 
                disabled={importing}
                className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
              >
                {importing ? 'Importiere...' : `${previewCards.length} importieren`}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function getWordTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    noun: 'Substantiv',
    verb: 'Verb',
    adjektiv: 'Adjektiv',
    adverb: 'Adverb',
    präposition: 'Präposition',
    konjunktion: 'Konjunktion',
    ausdruck: 'Ausdruck'
  };
  return labels[type] || type;
}