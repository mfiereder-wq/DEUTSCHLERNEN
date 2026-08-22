'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogIn, AlertCircle, KeyRound, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(accessCode);
    
    if (success) {
      onLoginSuccess();
    } else {
      setError('Ungültiger Zugangscode. Bitte überprüfen Sie Ihre Eingabe.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background px-4 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="border-border shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C9A86C] to-[#D4A574]"
              >
                <Lock className="h-10 w-10 text-white" />
              </motion.div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-display text-gradient-gold">
                  DEUTSCHLERNEN
                </CardTitle>
                <CardDescription className="text-base">
                  Bitte geben Sie Ihren Zugangscode ein, um fortzufahren
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label 
                    htmlFor="access-code" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Zugangscode
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="access-code"
                      type="password"
                      value={accessCode}
                      onChange={(e) => {
                        setAccessCode(e.target.value);
                        setError('');
                      }}
                      placeholder="Geben Sie Ihren Code ein"
                      className="pl-10 pr-4 h-12 text-lg tracking-wider uppercase"
                      autoComplete="off"
                      disabled={isLoading}
                      autoFocus
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-destructive text-sm"
                    >
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-[#C9A86C] to-[#D4A574] hover:from-[#B8965C] hover:to-[#C49564]"
                  disabled={isLoading || !accessCode.trim()}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Anmelden
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Hilfe benötigt?
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={() => setShowHint(!showHint)}
                className="w-full text-sm text-muted-foreground hover:text-foreground"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                {showHint ? 'Hinweis ausblenden' : 'Hinweis anzeigen'}
              </Button>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground space-y-2 overflow-hidden"
                  >
                    <p className="font-medium">Beispiel-Zugangscodes:</p>
                    <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                      <li>DEUTSCH2024</li>
                      <li>LEARN123</li>
                      <li>ADMIN</li>
                    </ul>
                    <p className="pt-2 text-xs">
                      Hinweis: Diese Codes sind für Demonstrationszwecke. In einer Produktionsumgebung würden Sie sichere, benutzerspezifische Codes verwenden.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2 pt-0">
              <p className="text-xs text-center text-muted-foreground">
                Sicherer Zugang zur Deutschlern-App
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
