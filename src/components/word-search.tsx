'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EXTENDED_VOCABULARY, ExtendedVocabWord } from '@/data/extended-vocabulary';

export function WordSearch() {
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem('deutschlernen-favorites') || '[]'); } catch { return []; }
  });

  const toggleFavorite = (wordId: string) => {
    const next = favorites.includes(wordId) ? favorites.filter(id => id !== wordId) : [...favorites, wordId];
    setFavorites(next);
    localStorage.setItem('deutschlernen-favorites', JSON.stringify(next));
  };

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const byDifficulty: Record<string, number> = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4 };

    return EXTENDED_VOCABULARY
      .filter(w => w.german.toLowerCase().includes(q) || w.english.toLowerCase().includes(q) || w.category.toLowerCase().includes(q))
      .sort((a, b) => {
        // Favorites first
        const aFav = favorites.includes(a.id) ? -1 : 0;
        const bFav = favorites.includes(b.id) ? -1 : 0;
        if (aFav !== bFav) return aFav - bFav;
        // Then by match quality
        const aExact = a.german.toLowerCase() === q ? -1 : 0;
        const bExact = b.german.toLowerCase() === q ? -1 : 0;
        if (aExact !== bExact) return aExact - bExact;
        return 0;
      })
      .slice(0, 30);
  }, [query, favorites]);

  const favoriteWords = useMemo(() =>
    EXTENDED_VOCABULARY.filter(w => favorites.includes(w.id)),
    [favorites]
  );

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Wort suchen (Deutsch oder Englisch)..."
          className="pl-10 pr-10"
        />
        {query && (
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2" onClick={() => setQuery('')}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Favorites bar */}
      {favoriteWords.length > 0 && !query && (
        <div>
          <p className="text-sm font-medium mb-2 flex items-center gap-1"><Star className="h-4 w-4 text-amber-500" />Favoriten ({favoriteWords.length})</p>
          <div className="flex flex-wrap gap-2">
            {favoriteWords.map(w => (
              <Badge key={w.id} variant="secondary" className="cursor-pointer hover:bg-muted flex items-center gap-1" onClick={() => setQuery(w.german)}>
                {w.german} <span className="text-muted-foreground">→ {w.english}</span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {query && results.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
            <p className="text-sm text-muted-foreground">{results.length} Treffer</p>
            {results.map(w => (
              <motion.div key={w.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{w.german}</span>
                        <span className="text-muted-foreground text-sm">{w.english}</span>
                        <Badge variant="outline" className="text-[10px]">{w.category}</Badge>
                        <Badge className={`text-[10px] ${w.difficulty === 'A1' ? 'bg-green-100 text-green-800' : w.difficulty === 'A2' ? 'bg-amber-100 text-amber-800' : 'bg-orange-100 text-orange-800'}`}>{w.difficulty}</Badge>
                      </div>
                      {w.exampleSentence && <p className="text-xs text-muted-foreground mt-1 truncate italic">„{w.exampleSentence}“</p>}
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 ml-2" onClick={() => toggleFavorite(w.id)}>
                      <Star className={`h-4 w-4 ${favorites.includes(w.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {query && results.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Keine Wörter gefunden für &quot;{query}&quot;</p>
          <p className="text-sm">Versuche einen anderen Suchbegriff.</p>
        </div>
      )}

      {!query && favoriteWords.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Gib einen Suchbegriff ein, um Wörter zu finden</p>
          <p className="text-sm">Klicke auf den Stern ⭐ um Favoriten zu speichern.</p>
        </div>
      )}
    </div>
  );
}

export default WordSearch;