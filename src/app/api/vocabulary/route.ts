import { NextRequest, NextResponse } from 'next/server';
import { sampleVocabulary, categories, grammarTopicsInfo } from '@/data/vocabulary';
import { parseVocabulary, validateCards, exportToJSON, exportToCSV } from '@/lib/vocabulary-parser';
import { VocabularyCard, Level, WordCategory } from '@/data/vocabulary';

// Simulierte Datenbank (in einer echten App würde hier Prisma verwendet)
let vocabularyStore: VocabularyCard[] = [...sampleVocabulary];

// GET: Vokabeln abrufen mit Filtern
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const level = searchParams.get('level') as Level | null;
  const category = searchParams.get('category') as WordCategory | null;
  const search = searchParams.get('search');
  const format = searchParams.get('format');
  const limit = parseInt(searchParams.get('limit') || '0');

  let filtered = [...vocabularyStore];

  // Filter anwenden
  if (level && (level === 'A2' || level === 'B1')) {
    filtered = filtered.filter(card => card.level === level);
  }

  if (category) {
    filtered = filtered.filter(card => card.category === category);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(card => 
      card.word.toLowerCase().includes(searchLower) ||
      card.translation.toLowerCase().includes(searchLower) ||
      card.exampleSentence.german.toLowerCase().includes(searchLower)
    );
  }

  // Limit anwenden
  if (limit > 0 && filtered.length > limit) {
    // Zufällige Auswahl wenn limit gesetzt
    filtered = shuffleArray(filtered).slice(0, limit);
  }

  // Export-Format
  if (format === 'json') {
    return new NextResponse(exportToJSON(filtered), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="vocabulary.json"'
      }
    });
  }

  if (format === 'csv') {
    return new NextResponse(exportToCSV(filtered), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="vocabulary.csv"'
      }
    });
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    total: vocabularyStore.length,
    data: filtered,
    categories,
    grammarTopicsInfo
  });
}

// POST: Neue Vokabeln importieren
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, format, level, category, action } = body;

    if (action === 'add') {
      // Einzelne Karte hinzufügen
      const newCard = body.card as VocabularyCard;
      if (!newCard.word || !newCard.translation) {
        return NextResponse.json(
          { success: false, error: 'Wort und Übersetzung sind erforderlich' },
          { status: 400 }
        );
      }

      newCard.id = `custom-${Date.now()}`;
      vocabularyStore.push(newCard);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Vokabel hinzugefügt',
        card: newCard 
      });
    }

    if (action === 'import') {
      // Import aus Text/CSV/JSON
      if (!content) {
        return NextResponse.json(
          { success: false, error: 'Kein Inhalt zum Importieren' },
          { status: 400 }
        );
      }

      const parsed = parseVocabulary(content, { 
        defaultLevel: level || 'A2',
        defaultCategory: category || 'alltag'
      });
      
      const { valid, errors } = validateCards(parsed);

      if (errors.length > 0) {
        return NextResponse.json({
          success: false,
          errors,
          partialSuccess: valid.length > 0,
          importedCount: valid.length,
          errorCount: errors.length
        });
      }

      vocabularyStore = [...vocabularyStore, ...valid];

      return NextResponse.json({
        success: true,
        message: `${valid.length} Vokabeln erfolgreich importiert`,
        importedCount: valid.length,
        cards: valid
      });
    }

    if (action === 'reset') {
      // Zurücksetzen auf Beispieldaten
      vocabularyStore = [...sampleVocabulary];
      return NextResponse.json({
        success: true,
        message: 'Vokabeln zurückgesetzt'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Ungültige Aktion' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { success: false, error: 'Fehler beim Verarbeiten der Daten' },
      { status: 500 }
    );
  }
}

// DELETE: Vokabel löschen
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'ID erforderlich' },
      { status: 400 }
    );
  }

  const index = vocabularyStore.findIndex(card => card.id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Vokabel nicht gefunden' },
      { status: 404 }
    );
  }

  vocabularyStore.splice(index, 1);
  return NextResponse.json({ success: true, message: 'Vokabel gelöscht' });
}

// Fisher-Yates Shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
