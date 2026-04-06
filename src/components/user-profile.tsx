'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Camera, Edit2, Check, X, Award, Star, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getProgress } from '@/lib/progress-store';
import { LEVELS, getLevelProgress, getCurrentLevel } from '@/lib/level-system';

interface UserProfile {
  name: string;
  avatar: string | null;
  joinedAt: string;
  totalStudyTime: number; // minutes
}

const STORAGE_KEY = 'deutschlernen-profile';

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userXP, setUserXP] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Deutsch-Lerner',
    avatar: null,
    joinedAt: new Date().toISOString(),
    totalStudyTime: 0,
  });
  const [tempName, setTempName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile and progress on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEY);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    const progress = getProgress();
    setUserXP(progress.xp);
  }, []);

  const { current, next, progress: levelProgress } = getLevelProgress(userXP);
  const currentLevel = getCurrentLevel(userXP);
  
  // Save profile
  const saveProfile = (updates: Partial<UserProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Handle name edit
  const handleEditName = () => {
    setTempName(profile.name);
    setIsEditing(true);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      saveProfile({ name: tempName.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempName('');
  };

  // Handle avatar upload
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveProfile({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate stats
  const joinedDate = new Date(profile.joinedAt);
  const daysSinceJoin = Math.floor((Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24));
  const completedLevels = LEVELS.filter(l => userXP >= l.requiredXP).length;
  const wordsPerDay = daysSinceJoin > 0 ? Math.round((userXP / 10) / daysSinceJoin) : 0;

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="bg-gradient-to-br from-[#C9A86C]/10 to-[#D4A574]/5 overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                onClick={handleAvatarClick}
                className={cn(
                  "h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden cursor-pointer",
                  "border-4 border-white shadow-lg",
                  "bg-gradient-to-br from-[#C9A86C] to-[#D4A574]",
                  "flex items-center justify-center",
                  "group relative"
                )}
              >
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {/* Edit hint */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full shadow-sm">
                  Bild ändern
                </span>
              </div>
            </motion.div>

            {/* User Info */}
            <div className="text-center sm:text-left flex-1">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 justify-center sm:justify-start"
                  >
                    <Input
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-48 sm:w-64 font-display text-xl sm:text-2xl"
                      placeholder="Dein Name"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName();
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                    />
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={handleSaveName}
                      className="text-green-600 hover:text-green-700 hover:bg-green-100"
                    >
                      <Check className="h-5 w-5" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={handleCancelEdit}
                      className="text-red-600 hover:text-red-700 hover:bg-red-100"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="display"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 justify-center sm:justify-start"
                  >
                    <h2 className="text-2xl sm:text-3xl font-display">{profile.name}</h2>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={handleEditName}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <p className="text-muted-foreground mt-1">
                Level {current.id} • {current.difficulty}
              </p>
              
              {/* Join Date */}
              <p className="text-xs text-muted-foreground mt-2">
                <Clock className="h-3 w-3 inline mr-1" />
                Mitglied seit {joinedDate.toLocaleDateString('de-DE', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            {/* Level Badge */}
            <div className="text-center">
              <div className="inline-flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm">
                <span className="text-3xl font-bold text-[#C9A86C]">{current.id}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Level</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {userXP} XP • {levelProgress}% zum nächsten Level
              </span>
              {next && (
                <span className="text-muted-foreground">
                  Noch {next.requiredXP - userXP} XP zu Level {next.id}
                </span>
              )}
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#C9A86C]">{userXP}</div>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Star className="h-3 w-3" /> XP Gesamt
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#6B8E6B]">{completedLevels}</div>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Target className="h-3 w-3" /> Levels
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#B76E79]">{daysSinceJoin}</div>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Clock className="h-3 w-3" /> Tage aktiv
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#5B7C99]">{Math.round(userXP / 50)}</div>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Award className="h-3 w-3" /> Wörter gelernt
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Level Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-[#C9A86C]" />
            Aktuelles Level: {current.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{current.description}</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Vokabeln</span>
              <span className="text-[#C9A86C] font-medium">{current.vocabularyCount} Wörter</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Satz-Übungen</span>
              <span className="text-[#C9A86C] font-medium">{current.sentenceCount} Sätze</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Quiz-Fragen</span>
              <span className="text-[#C9A86C] font-medium">{current.quizCount} Quizze</span>
            </div>
          </div>
          
          {next && (
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Nächstes Level: <strong>{next.name}</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {next.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfile;
