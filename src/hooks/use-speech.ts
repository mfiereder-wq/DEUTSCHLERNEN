'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface SpeechState {
  isPlaying: boolean;
  isSupported: boolean;
  isLoading: boolean;
  error: string | null;
}

interface SpeechOptions {
  rate?: number; // 0.1 to 10
  pitch?: number; // 0 to 2
  volume?: number; // 0 to 1
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export function useSpeech() {
  const [state, setState] = useState<SpeechState>({
    isPlaying: false,
    isSupported: false,
    isLoading: false,
    error: null,
  });
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const synth = window.speechSynthesis;
    if (!synth) {
      setState(prev => ({ ...prev, isSupported: false }));
      return;
    }
    
    synthRef.current = synth;
    setState(prev => ({ ...prev, isSupported: true }));
    
    // Load voices
    const loadVoices = () => {
      voicesRef.current = synth.getVoices();
    };
    
    loadVoices();
    
    // Voices might load asynchronously
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if (utteranceRef.current) {
        synth.cancel();
      }
    };
  }, []);

  // Find best German voice
  const getGermanVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = voicesRef.current;
    if (voices.length === 0) return null;
    
    // Preferred German voices (in order of preference)
    const preferredVoices = [
      'Google Deutsch',
      'Microsoft Hedda',
      'Microsoft Katja',
      'Microsoft Stefan',
      'Anna',
      'Yannick',
      'Hans',
      'Marleen',
      'German',
      'Deutsch',
    ];
    
    for (const preferredName of preferredVoices) {
      const voice = voices.find(v => 
        v.name.includes(preferredName) && v.lang.startsWith('de')
      );
      if (voice) return voice;
    }
    
    // Fallback to any German voice
    const germanVoice = voices.find(v => v.lang.startsWith('de'));
    if (germanVoice) return germanVoice;
    
    // Last resort - first available voice
    return voices[0];
  }, []);

  // Speak text
  const speak = useCallback((text: string, options: SpeechOptions = {}) => {
    const synth = synthRef.current;
    if (!synth) {
      const error = 'Sprachausgabe wird nicht unterstützt';
      toast.error(error);
      options.onError?.(error);
      return;
    }
    
    // Cancel any ongoing speech
    if (synth.speaking) {
      synth.cancel();
    }
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    // Set German voice
    const voice = getGermanVoice();
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = 'de-DE';
    
    // Apply options
    utterance.rate = options.rate ?? 0.9; // Slightly slower for learning
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 1;
    
    // Event handlers
    utterance.onstart = () => {
      setState({
        isPlaying: true,
        isSupported: true,
        isLoading: false,
        error: null,
      });
    };
    
    utterance.onend = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
      options.onEnd?.();
    };
    
    utterance.onerror = (event) => {
      const error = 'Fehler bei der Sprachausgabe';
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error,
      }));
      options.onError?.(error);
    };
    
    synth.speak(utterance);
  }, [getGermanVoice]);

  // Stop speech
  const stop = useCallback(() => {
    const synth = synthRef.current;
    if (synth) {
      synth.cancel();
    }
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  // Pause speech
  const pause = useCallback(() => {
    const synth = synthRef.current;
    if (synth && synth.speaking) {
      synth.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  // Resume speech
  const resume = useCallback(() => {
    const synth = synthRef.current;
    if (synth && synth.paused) {
      synth.resume();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, []);

  // Preload voices
  const preload = useCallback(() => {
    if (voicesRef.current.length === 0 && synthRef.current) {
      voicesRef.current = synthRef.current.getVoices();
    }
  }, []);

  return {
    ...state,
    speak,
    stop,
    pause,
    resume,
    preload,
  };
}

// Hook for speech recognition (listening)
export function useSpeechRecognition() {
  const [state, setState] = useState({
    isListening: false,
    isSupported: false,
    transcript: '',
    confidence: 0,
    error: null as string | null,
    isListeningForPronunciation: false,
  });
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check for SpeechRecognition API
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setState(prev => ({ ...prev, isSupported: false }));
      return;
    }
    
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'de-DE';
    
    recognition.onstart = () => {
      setState(prev => ({
        ...prev,
        isListening: true,
        error: null,
        transcript: '',
      }));
    };
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = event.results;
      if (results.length > 0) {
        const result = results[results.length - 1];
        if (result.isFinal) {
          setState(prev => ({
            ...prev,
            transcript: result[0].transcript,
            confidence: result[0].confidence,
          }));
        } else {
          // Interim results
          setState(prev => ({
            ...prev,
            transcript: result[0].transcript,
            confidence: result[0].confidence * 0.8, // Lower confidence for interim
          }));
        }
      }
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      let error = 'Ein Fehler ist aufgetreten';
      switch (event.error) {
        case 'no-speech':
          error = 'Keine Sprache erkannt';
          break;
        case 'audio-capture':
          error = 'Mikrofon nicht verfügbar';
          break;
        case 'not-allowed':
          error = 'Mikrofon-Zugriff verweigert';
          break;
        case 'network':
          error = 'Netzwerkfehler';
          break;
        case 'aborted':
          error = 'Abgebrochen';
          break;
        default:
          error = `Fehler: ${event.error}`;
      }
      setState(prev => ({
        ...prev,
        isListening: false,
        error,
      }));
      toast.error(error);
    };
    
    recognition.onend = () => {
      setState(prev => ({ ...prev, isListening: false }));
    };
    
    recognitionRef.current = recognition;
    setState(prev => ({ ...prev, isSupported: true }));
    
    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      toast.error('Spracherkennung wird nicht unterstützt');
      return;
    }
    
    try {
      // Check microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setState(prev => ({ ...prev, error: null }));
      recognitionRef.current.start();
    } catch (error) {
      const errorMsg = error instanceof DOMException && error.name === 'NotAllowedError'
        ? 'Mikrofon-Zugriff verweigert. Bitte erlaube den Zugriff in den Browser-Einstellungen.'
        : 'Mikrofon nicht verfügbar';
      setState(prev => ({ ...prev, error: errorMsg }));
      toast.error(errorMsg);
    }
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const checkPronunciation = useCallback((targetWord: string): boolean => {
    const normalizedTarget = targetWord.toLowerCase().trim()
      .replace(/[äöü]/g, (c) => ({ 'ä': 'ae', 'ö': 'oe', 'ü': 'ue' }[c] || c))
      .replace(/ß/g, 'ss');
    const normalizedTranscript = state.transcript.toLowerCase().trim()
      .replace(/[äöü]/g, (c) => ({ 'ä': 'ae', 'ö': 'oe', 'ü': 'ue' }[c] || c))
      .replace(/ß/g, 'ss');
    
    // Check if transcript contains the target word
    return normalizedTranscript.includes(normalizedTarget) || 
           normalizedTarget.includes(normalizedTranscript);
  }, [state.transcript]);

  const resetTranscript = useCallback(() => {
    setState(prev => ({
      ...prev,
      transcript: '',
      confidence: 0,
      error: null,
    }));
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    checkPronunciation,
    resetTranscript,
  };
}
