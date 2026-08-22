'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  accessCode: string | null;
  login: (code: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const VALID_ACCESS_CODES = ['DLRN-Q9A6-TOUB-JSTE'];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedCode = localStorage.getItem('deutschlernen_access_code');
    if (storedCode && VALID_ACCESS_CODES.includes(storedCode)) {
      setIsAuthenticated(true);
      setAccessCode(storedCode);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((code: string): boolean => {
    const normalizedCode = code.toUpperCase().trim();
    if (VALID_ACCESS_CODES.includes(normalizedCode)) {
      setIsAuthenticated(true);
      setAccessCode(normalizedCode);
      localStorage.setItem('deutschlernen_access_code', normalizedCode);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setAccessCode(null);
    localStorage.removeItem('deutschlernen_access_code');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessCode, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
