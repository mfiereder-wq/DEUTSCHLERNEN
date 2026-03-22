/**
 * Parser für Vokabellisten-Import
 * 
 * Unterstützt Formate:
 * - CSV (Komma oder Semikolon getrennt)
 * - Text (ein Wort pro Zeile oder Format: Wort - Übersetzung)
 * - JSON (voreingestelltes Format)
 */

import { 
  VocabularyCard, 
  Level, 
  WordCategory, 
  GrammarTopic,
  WordType 
} from '@/data/vocabulary';

// Parser-Konfiguration
interface ParserConfig {
  defaultLevel: Level;
  defaultCategory: WordCategory;
  defaultWordType: WordType;
  generateId: boolean;
}

const defaultConfig: ParserConfig = {
  defaultLevel: 'A2',
  defaultCategory: 'alltag',
  defaultWordType: 'noun',
  generateId: true
};

// CSV-Spalten-Mapping (Unterstützung für verschiedene Spaltennamen)
const columnMappings: Record<string, keyof VocabularyCard | string> = {
  'wort': 'word',
  'word': 'word',
  'deutsch': 'word',
  'german': 'word',
  'artikel': 'article',
  'article': 'article',
  'genus': 'article',
  'typ': 'wordType',
  'wordtype': 'wordType',
  'word_type': 'wordType',
  'wortart': 'wordType',
  'übersetzung': 'translation',
  'translation': 'translation',
  'englisch': 'translation',
  'english': 'translation',
  'niveau': 'level',
  'level': 'level',
  'stufe': 'level',
  'kategorie': 'category',
  'category': 'category',
  'thema': 'category',
  'beispiel': 'exampleSentence.german',
  'beispielsatz': 'exampleSentence.german',
  'example': 'exampleSentence.german',
  'example_sentence': 'exampleSentence.german',
  'beispiel_übersetzung': 'exampleSentence.translation',
  'example_translation': 'exampleSentence.translation',
  'grammatik': 'grammar.hint',
  'grammar': 'grammar.hint',
  'grammatik_hinweis': 'grammar.hint',
  'grammar_hint': 'grammar.hint',
  'grammatik_themen': 'grammar.topics',
  'grammar_topics': 'grammar.topics',
  'plural': 'grammar.forms.plural',
  'synonyme': 'synonyms',
  'synonyms': 'synonyms',
  'antonyme': 'antonyms',
  'antonyms': 'antonyms',
  'verwandte': 'relatedWords',
  'related_words': 'relatedWords',
  'häufigkeit': 'metadata.frequency',
  'frequency': 'metadata.frequency',
  'prüfungsrelevanz': 'metadata.examRelevance',
  'exam_relevance': 'metadata.examRelevance'
};

/**
 * Parse CSV-String in VocabularyCards
 */
export function parseCSV(csvContent: string, config: Partial<ParserConfig> = {}): VocabularyCard[] {
  const finalConfig = { ...defaultConfig, ...config };
  const lines = csvContent.trim().split('\n');
  
  if (lines.length < 2) {
    throw new Error('CSV muss mindestens eine Header-Zeile und eine Datenzeile enthalten');
  }

  // Header parsen
  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  const mappedHeaders = headers.map(h => columnMappings[h] || h);

  const cards: VocabularyCard[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const card = createCardFromValues(mappedHeaders, values, finalConfig, i);
    if (card) cards.push(card);
  }

  return cards;
}

/**
 * Parse CSV-Zeile (berücksichtigt Anführungszeichen)
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  const delimiter = line.includes(';') ? ';' : ',';

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

/**
 * Parse Text-Liste (ein Wort pro Zeile oder "Wort - Übersetzung" Format)
 */
export function parseTextList(textContent: string, config: Partial<ParserConfig> = {}): VocabularyCard[] {
  const finalConfig = { ...defaultConfig, ...config };
  const lines = textContent.trim().split('\n');
  const cards: VocabularyCard[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;

    // Verschiedene Formate erkennen
    // Format 1: "der Mann - the man"
    // Format 2: "Mann = man"
    // Format 3: "Mann: man"
    // Format 4: "Mann	man" (Tab-getrennt)
    // Format 5: "Mann" (nur Wort)
    
    let word = '';
    let translation = '';
    let article = '';

    const separators = [' - ', ' = ', ' : ', '\t', '   '];
    let parts: string[] = [];

    for (const sep of separators) {
      if (line.includes(sep)) {
        parts = line.split(sep).map(p => p.trim());
        break;
      }
    }

    if (parts.length === 0) {
      // Nur ein Wort
      word = line;
    } else if (parts.length >= 2) {
      const leftPart = parts[0];
      translation = parts.slice(1).join(' - ').trim();

      // Artikel erkennen
      const articleMatch = leftPart.match(/^(der|die|das)\s+(.+)$/i);
      if (articleMatch) {
        article = articleMatch[1].toLowerCase();
        word = articleMatch[2];
      } else {
        word = leftPart;
      }
    }

    if (word) {
      const card = createEmptyCard(finalConfig, i + 1);
      card.word = word;
      card.translation = translation || `[Übersetzung für "${word}"]`;
      if (article) card.article = article;
      cards.push(card);
    }
  }

  return cards;
}

/**
 * Parse JSON-Import
 */
export function parseJSON(jsonContent: string, config: Partial<ParserConfig> = {}): VocabularyCard[] {
  const finalConfig = { ...defaultConfig, ...config };
  
  try {
    const data = JSON.parse(jsonContent);
    
    // Array von Karten
    if (Array.isArray(data)) {
      return data.map((card, index) => normalizeCard(card, finalConfig, index + 1));
    }
    
    // Objekt mit cards-Property
    if (data.cards && Array.isArray(data.cards)) {
      return data.cards.map((card: Partial<VocabularyCard>, index: number) => normalizeCard(card, finalConfig, index + 1));
    }

    // Einzelne Karte
    return [normalizeCard(data, finalConfig, 1)];
  } catch {
    throw new Error('Ungültiges JSON-Format');
  }
}

/**
 * Erstelle Karteikarte aus Werten
 */
function createCardFromValues(
  headers: (string | keyof VocabularyCard)[], 
  values: string[], 
  config: ParserConfig,
  index: number
): VocabularyCard | null {
  const card = createEmptyCard(config, index);

  for (let i = 0; i < Math.min(headers.length, values.length); i++) {
    const header = headers[i];
    const value = values[i];
    
    if (!value) continue;

    setCardProperty(card, header as string, value);
  }

  // Wort ist Pflichtfeld
  if (!card.word) return null;

  return card;
}

/**
 * Setze Eigenschaft auf Karte (unterstützt verschachtelte Pfade)
 */
function setCardProperty(card: VocabularyCard, path: string, value: string): void {
  // Spezialfall: Arrays (Synonyme, Grammatik-Themen)
  if (path === 'synonyms' || path === 'antonyms' || path === 'relatedWords') {
    (card as Record<string, string[]>)[path] = value.split(',').map(s => s.trim()).filter(Boolean);
    return;
  }

  if (path === 'grammar.topics') {
    card.grammar.topics = value.split(',').map(s => s.trim() as GrammarTopic).filter(Boolean);
    return;
  }

  // Verschachtelte Pfade
  const parts = path.split('.');
  let obj: Record<string, unknown> = card;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!obj[part]) {
      obj[part] = {};
    }
    obj = obj[part] as Record<string, unknown>;
  }

  const lastPart = parts[parts.length - 1];
  
  // Typ-Konvertierung
  if (lastPart === 'frequency' || lastPart === 'examRelevance') {
    obj[lastPart] = Math.min(5, Math.max(1, parseInt(value) || 3));
  } else if (lastPart === 'level') {
    obj[lastPart] = value.toUpperCase() === 'B1' ? 'B1' : 'A2';
  } else if (lastPart === 'wordType') {
    obj[lastPart] = normalizeWordType(value);
  } else {
    obj[lastPart] = value;
  }
}

/**
 * Erstelle leere Karteikarte mit Standardwerten
 */
function createEmptyCard(config: ParserConfig, index: number): VocabularyCard {
  return {
    id: config.generateId ? `import-${Date.now()}-${index}` : '',
    word: '',
    wordType: config.defaultWordType,
    translation: '',
    level: config.defaultLevel,
    category: config.defaultCategory,
    exampleSentence: {
      german: '',
      translation: ''
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
}

/**
 * Normalisiere importierte Karte
 */
function normalizeCard(data: Partial<VocabularyCard>, config: ParserConfig, index: number): VocabularyCard {
  const card = createEmptyCard(config, index);
  
  return {
    ...card,
    ...data,
    id: data.id || card.id,
    level: (data.level?.toUpperCase() === 'B1' ? 'B1' : 'A2') as Level,
    wordType: normalizeWordType(data.wordType || config.defaultWordType),
    metadata: {
      ...card.metadata,
      ...data.metadata
    }
  };
}

/**
 * Normalisiere Wortart
 */
function normalizeWordType(type: string): WordType {
  const normalized = type.toLowerCase().trim();
  const mappings: Record<string, WordType> = {
    'nomen': 'noun',
    'noun': 'noun',
    'substantiv': 'noun',
    'verb': 'verb',
    'verben': 'verb',
    'adjektiv': 'adjektiv',
    'adjective': 'adjektiv',
    'adverb': 'adverb',
    'präposition': 'präposition',
    'preposition': 'präposition',
    'konjunktion': 'konjunktion',
    'conjunction': 'konjunktion',
    'ausdruck': 'ausdruck',
    'expression': 'ausdruck',
    'redewendung': 'ausdruck'
  };
  
  return mappings[normalized] || 'noun';
}

/**
 * Hauptparser-Funktion - erkennt Format automatisch
 */
export function parseVocabulary(content: string, config: Partial<ParserConfig> = {}): VocabularyCard[] {
  const trimmed = content.trim();
  
  // JSON erkennen
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return parseJSON(content, config);
  }
  
  // CSV erkennen (mehrere Zeilen mit Trennzeichen)
  const lines = trimmed.split('\n');
  const firstLine = lines[0];
  
  if (lines.length > 1 && (firstLine.includes(',') || firstLine.includes(';'))) {
    // Prüfen ob es wie CSV aussieht (Header mit mehreren Spalten)
    const delimiters = firstLine.includes(';') ? ';' : ',';
    const columnCount = firstLine.split(delimiters).length;
    
    if (columnCount >= 2) {
      return parseCSV(content, config);
    }
  }
  
  // Fallback: Text-Liste
  return parseTextList(content, config);
}

/**
 * Validiere Karteikarten
 */
export function validateCards(cards: VocabularyCard[]): { valid: VocabularyCard[]; errors: string[] } {
  const valid: VocabularyCard[] = [];
  const errors: string[] = [];

  cards.forEach((card, index) => {
    if (!card.word || card.word.trim() === '') {
      errors.push(`Zeile ${index + 1}: Wort fehlt`);
      return;
    }
    if (!card.translation || card.translation.trim() === '') {
      errors.push(`Zeile ${index + 1}: Übersetzung fehlt für "${card.word}"`);
      return;
    }
    if (!card.exampleSentence.german || card.exampleSentence.german.trim() === '') {
      // Warnung, aber kein Fehler
      console.warn(`Warnung: Kein Beispielsatz für "${card.word}"`);
    }
    valid.push(card);
  });

  return { valid, errors };
}

/**
 * Exportiere Karteikarten als JSON
 */
export function exportToJSON(cards: VocabularyCard[], pretty: boolean = true): string {
  return JSON.stringify(cards, null, pretty ? 2 : 0);
}

/**
 * Exportiere Karteikarten als CSV
 */
export function exportToCSV(cards: VocabularyCard[]): string {
  const headers = [
    'Wort', 'Artikel', 'Typ', 'Übersetzung', 'Niveau', 'Kategorie',
    'Beispielsatz', 'Beispiel-Übersetzung', 'Grammatik-Hinweis',
    'Plural', 'Synonyme', 'Häufigkeit', 'Prüfungsrelevanz'
  ];
  
  const rows = cards.map(card => [
    card.word,
    card.article || '',
    card.wordType,
    card.translation,
    card.level,
    card.category,
    card.exampleSentence.german,
    card.exampleSentence.translation,
    card.grammar.hint,
    card.grammar.forms?.plural || '',
    card.synonyms?.join(', ') || '',
    card.metadata.frequency,
    card.metadata.examRelevance
  ]);

  // CSV-Escape
  const escapeCSV = (value: string | number) => {
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  return [
    headers.join(','),
    ...rows.map(row => row.map(escapeCSV).join(','))
  ].join('\n');
}
