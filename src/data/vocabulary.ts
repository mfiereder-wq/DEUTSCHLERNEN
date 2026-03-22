/**
 * JSON-Datenformat für Goethe A2/B1 Vokabeln
 * 
 * Dieses Format basiert auf den offiziellen Wortschatzlisten des Goethe-Instituts
 * und telc Prüfungszielen. Extrahiert aus:
 * - Goethe-Zertifikat A1 SD1 Modellsatz
 * - Goethe-Zertifikat B1 Übungssatz
 */

// Typ-Definitionen
export type Level = 'A2' | 'B1';

export type WordCategory = 
  | 'alltag'           // Alltagssituationen
  | 'beruf'            // Beruf & Arbeit
  | 'freizeit'         // Freizeit & Hobbys
  | 'gesundheit'       // Gesundheit & Körper
  | 'wohnung'          // Wohnung & Haus
  | 'verkehr'          // Verkehr & Reisen
  | 'einkaufen'        // Einkaufen & Geld
  | 'beziehungen'      // Beziehungen & Kommunikation
  | 'bildung'          // Bildung & Schule
  | 'umwelt';          // Umwelt & Natur

export type GrammarTopic = 
  // A2 Grammatik
  | 'perfekt'          // Perfekt (haben/sein + Partizip II)
  | 'modalverben'      // Modalverben (können, müssen, wollen, etc.)
  | 'präteritum'       // Präteritum (war, hatte, etc.)
  | 'akkusativ'        // Akkusativ (den, einen, etc.)
  | 'dativ'            // Dativ (dem, einem, etc.)
  | 'präpositionen'    // Wechselpräpositionen
  | 'adjektiv_endungen'// Adjektivendungen
  | 'satzklammer'      // Satzklammer
  | 'konjunktionen'    // denn, weil, dass, ob
  // B1 Grammatik
  | 'konjunktiv_ii'    // Konjunktiv II (würde, hätte)
  | 'passiv'           // Passiv
  | 'relativsätze'     // Relativsätze
  | 'genitiv'          // Genitiv
  | 'infinitiv_sätze'  // Infinitivsätze (zu + Infinitiv)
  | 'indirekte_fragen' // Indirekte Fragesätze
  | 'nomen_verben'     // Nomen-Verbindungen
  | 'verben_mit_präp'; // Verben mit Präpositionen

export interface VocabularyCard {
  id: string;
  word: string;                    // Das deutsche Wort
  article?: string;                // Artikel (der/die/das) für Nomen
  wordType: 'noun' | 'verb' | 'adjektiv' | 'adverb' | 'präposition' | 'konjunktion' | 'ausdruck';
  translation: string;             // Übersetzung (Portugiesisch)
  level: Level;                    // Schwierigkeitsstufe
  category: WordCategory;          // Themenbereich
  
  // Beispielsatz auf Prüfungsniveau
  exampleSentence: {
    german: string;                // Deutscher Beispielsatz
    translation: string;           // Übersetzung des Beispielsatzes
    audioUrl?: string;             // Optional: Audio-URL
  };
  
  // Grammatik-Information
  grammar: {
    topics: GrammarTopic[];        // Relevante Grammatikthemen
    hint: string;                  // Kurzer Grammatik-Hinweis
    forms?: {                      // Wichtige Formen
      plural?: string;             // Pluralform für Nomen
      conjugation?: string[];      // Konjugation für Verben
      comparative?: string;        // Komparativ für Adjektive
    };
  };
  
  // Zusätzliche Informationen
  synonyms?: string[];             // Synonyme
  antonyms?: string[];             // Antonyme
  relatedWords?: string[];         // Verwandte Wörter
  
  // Lern-Metadaten
  metadata: {
    frequency: number;             // Häufigkeit (1-5, 5 = sehr häufig)
    examRelevance: number;         // Prüfungsrelevanz (1-5)
    lastReviewed?: string;         // ISO-Datestring
    timesReviewed: number;
    timesCorrect: number;
  };
}

// Beispiel-Datenbankstruktur
export interface VocabularyDatabase {
  version: string;
  lastUpdated: string;
  source: 'goethe' | 'telc' | 'custom';
  cards: VocabularyCard[];
  categories: {
    name: WordCategory;
    description: string;
    icon: string;
  }[];
}

// ============================================
// A2 VOKABELN - Aus Goethe-Zertifikat A1 SD1 Modellsatz
// ============================================

export const sampleVocabulary: VocabularyCard[] = [
  // === A2 WÖRTER ===
  // Alltag & tägliche Routine
  {
    id: 'a2-001',
    word: 'Anmeldung',
    article: 'die',
    wordType: 'noun',
    translation: 'inscrição, registro',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Die Anmeldung beim Einwohnermeldeamt muss innerhalb von zwei Wochen erfolgen.',
      translation: 'O registro no cartório de residentes deve ser feito dentro de duas semanas.'
    },
    grammar: {
      topics: ['akkusativ', 'dativ'],
      hint: 'Substantivo feminino, plural: die Anmeldungen. Usado com a preposição "bei".',
      forms: { plural: 'die Anmeldungen' }
    },
    synonyms: ['Registrierung'],
    relatedWords: ['anmelden', 'angemeldet', 'Abmeldung'],
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-002',
    word: 'aufstehen',
    wordType: 'verb',
    translation: 'levantar-se',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Ich stehe jeden Morgen um sieben Uhr auf.',
      translation: 'Eu levanto todas as manhãs às sete horas.'
    },
    grammar: {
      topics: ['perfekt', 'satzklammer'],
      hint: 'Verbo separável: "auf" fica no final. Perfeito: ist aufgestanden.',
      forms: { conjugation: ['stehe auf', 'stehst auf', 'steht auf', 'stehen auf', 'steht auf'] }
    },
    relatedWords: ['aufgestanden', 'das Aufstehen'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-003',
    word: 'Bahnhof',
    article: 'der',
    wordType: 'noun',
    translation: 'estação de trem',
    level: 'A2',
    category: 'verkehr',
    exampleSentence: {
      german: 'Wo ist der Bahnhof?',
      translation: 'Onde fica a estação de trem?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Bahnhöfe. Importante para pedir direções.',
      forms: { plural: 'die Bahnhöfe' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-004',
    word: 'Zimmernummer',
    article: 'die',
    wordType: 'noun',
    translation: 'número do quarto',
    level: 'A2',
    category: 'wohnung',
    exampleSentence: {
      german: 'Welche Zimmernummer haben Sie?',
      translation: 'Qual é o número do seu quarto?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Zimmernummern. Pergunta comum em hotéis.',
      forms: { plural: 'die Zimmernummern' }
    },
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-005',
    word: 'kosten',
    wordType: 'verb',
    translation: 'custar',
    level: 'A2',
    category: 'einkaufen',
    exampleSentence: {
      german: 'Was kostet der Pullover? Er kostet dreißig Euro.',
      translation: 'Quanto custa o pulôver? Ele custa trinta euros.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Verbo regular: kostet, kostete, hat gekostet.',
      forms: { conjugation: ['kostet', 'kostest', 'kostet', 'kosten', 'kostet'] }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-006',
    word: 'Aufzug',
    article: 'der',
    wordType: 'noun',
    translation: 'elevador',
    level: 'A2',
    category: 'wohnung',
    exampleSentence: {
      german: 'Nehmen Sie bitte den Aufzug in den zweiten Stock.',
      translation: 'Por favor, pegue o elevador para o segundo andar.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Aufzüge.',
      forms: { plural: 'die Aufzüge' }
    },
    relatedWords: ['Rolltreppe', 'Treppe'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-007',
    word: 'Uhr',
    article: 'die',
    wordType: 'noun',
    translation: 'relógio, hora',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Wie spät ist es? Es ist 15 Uhr.',
      translation: 'Que horas são? São 15 horas.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Uhren. Para indicar horas.',
      forms: { plural: 'die Uhren' }
    },
    relatedWords: ['Stunde', 'Minute'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-008',
    word: 'essen',
    wordType: 'verb',
    translation: 'comer',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Was möchten Sie essen? Pommes, Fisch oder Wurst?',
      translation: 'O que você gostaria de comer? Batatas fritas, peixe ou salsicha?'
    },
    grammar: {
      topics: ['perfekt'],
      hint: 'Verbo irregular: isst, aß, hat gegessen.',
      forms: { conjugation: ['esse', 'isst', 'isst', 'essen', 'esst'] }
    },
    relatedWords: ['das Essen', 'Speise'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-009',
    word: 'warten',
    wordType: 'verb',
    translation: 'esperar',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Wie lange wollen Sie noch warten? Zehn Minuten.',
      translation: 'Quanto tempo você ainda quer esperar? Dez minutos.'
    },
    grammar: {
      topics: ['modalverben', 'präpositionen'],
      hint: 'warten auf + Acusativo (esperar por alguém/algo).'
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-010',
    word: 'kaputt',
    wordType: 'adjektiv',
    translation: 'quebrado, estragado',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Der Fernseher ist kaputt.',
      translation: 'A televisão está quebrada.'
    },
    grammar: {
      topics: ['adjektiv_endungen'],
      hint: 'Adjetivo após sein.'
    },
    relatedWords: ['reparieren', 'defekt'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-011',
    word: 'Pullover',
    article: 'der',
    wordType: 'noun',
    translation: 'pulôver, suéter',
    level: 'A2',
    category: 'einkaufen',
    exampleSentence: {
      german: 'Der Pullover kostet dreißig Euro.',
      translation: 'O pulôver custa trinta euros.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Pullover.',
      forms: { plural: 'die Pullover' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-012',
    word: 'Euro',
    article: 'der',
    wordType: 'noun',
    translation: 'euro',
    level: 'A2',
    category: 'einkaufen',
    exampleSentence: {
      german: 'Das kostet neunzehn Euro fünfundneunzig Cent.',
      translation: 'Isso custa dezenove euros e noventa e cinco centavos.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Euro (ou Euros).',
      forms: { plural: 'die Euro' }
    },
    relatedWords: ['Cent', 'Geld', 'Preis'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-013',
    word: 'Restaurant',
    article: 'das',
    wordType: 'noun',
    translation: 'restaurante',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Was isst die Frau im Restaurant?',
      translation: 'O que a mulher come no restaurante?'
    },
    grammar: {
      topics: ['dativ'],
      hint: 'im Restaurant = in dem Restaurant.',
      forms: { plural: 'die Restaurants' }
    },
    relatedWords: ['Café', 'Bistro'],
    metadata: { frequency: 5, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-014',
    word: 'Pommes',
    wordType: 'noun',
    translation: 'batatas fritas',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Möchten Sie Pommes oder Fisch?',
      translation: 'Você quer batatas fritas ou peixe?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Abreviação de Pommes frites.'
    },
    metadata: { frequency: 4, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-015',
    word: 'Fisch',
    article: 'der',
    wordType: 'noun',
    translation: 'peixe',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Der Fisch ist sehr frisch.',
      translation: 'O peixe está muito fresco.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Fische.',
      forms: { plural: 'die Fische' }
    },
    metadata: { frequency: 4, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-016',
    word: 'Wurst',
    article: 'die',
    wordType: 'noun',
    translation: 'salsicha, linguiça',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Ich möchte bitte eine Wurst.',
      translation: 'Eu gostaria de uma salsicha, por favor.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Würste.',
      forms: { plural: 'die Würste' }
    },
    metadata: { frequency: 4, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-017',
    word: 'Klasse',
    article: 'die',
    wordType: 'noun',
    translation: 'classe, série escolar',
    level: 'A2',
    category: 'bildung',
    exampleSentence: {
      german: 'In welche Klasse geht Ihr Sohn? In die vierte Klasse.',
      translation: 'Em que série está seu filho? Na quarta série.'
    },
    grammar: {
      topics: ['akkusativ', 'dativ'],
      hint: 'in die Klasse (Acusativo) / in der Klasse (Dativo).',
      forms: { plural: 'die Klassen' }
    },
    relatedWords: ['Schule', 'Schüler'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-018',
    word: 'Stock',
    article: 'der',
    wordType: 'noun',
    translation: 'andar',
    level: 'A2',
    category: 'wohnung',
    exampleSentence: {
      german: 'Wie komme ich in den zweiten Stock?',
      translation: 'Como chego ao segundo andar?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'erster Stock = primeiro andar. Erdgeschoss = térreo.',
      forms: { plural: 'die Stockwerke' }
    },
    relatedWords: ['Erdgeschoss', 'Aufzug', 'Treppe'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-019',
    word: 'Rolltreppe',
    article: 'die',
    wordType: 'noun',
    translation: 'escada rolante',
    level: 'A2',
    category: 'verkehr',
    exampleSentence: {
      german: 'Nehmen Sie die Rolltreppe nach oben.',
      translation: 'Pegue a escada rolante para subir.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Rolltreppen.',
      forms: { plural: 'die Rolltreppen' }
    },
    relatedWords: ['Treppe', 'Aufzug'],
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-020',
    word: 'Treppe',
    article: 'die',
    wordType: 'noun',
    translation: 'escada',
    level: 'A2',
    category: 'wohnung',
    exampleSentence: {
      german: 'Gehen Sie bitte die Treppe hinauf.',
      translation: 'Por favor, suba as escadas.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Treppen.',
      forms: { plural: 'die Treppen' }
    },
    relatedWords: ['Rolltreppe', 'Stiege'],
    metadata: { frequency: 4, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-021',
    word: 'Urlaub',
    article: 'der',
    wordType: 'noun',
    translation: 'férias',
    level: 'A2',
    category: 'freizeit',
    exampleSentence: {
      german: 'Wohin fährt Herr Albers? In Urlaub ans Meer.',
      translation: 'Para onde vai o Sr. Albers? De férias para o mar.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Urlaube. in Urlaub fahren.',
      forms: { plural: 'die Urlaube' }
    },
    relatedWords: ['reisen', 'Ferien'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-022',
    word: 'Meer',
    article: 'das',
    wordType: 'noun',
    translation: 'mar',
    level: 'A2',
    category: 'umwelt',
    exampleSentence: {
      german: 'Wir fahren in den Urlaub ans Meer.',
      translation: 'Vamos de férias para o mar.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'ans Meer = an das Meer.',
      forms: { plural: 'die Meere' }
    },
    relatedWords: ['Strand', 'Wasser', 'Ozean'],
    metadata: { frequency: 4, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-023',
    word: 'Familie',
    article: 'die',
    wordType: 'noun',
    translation: 'família',
    level: 'A2',
    category: 'beziehungen',
    exampleSentence: {
      german: 'Er fährt zur Familie.',
      translation: 'Ele vai para a família.'
    },
    grammar: {
      topics: ['akkusativ', 'dativ'],
      hint: 'Plural: die Familien.',
      forms: { plural: 'die Familien' }
    },
    relatedWords: ['Eltern', 'Kind', 'Geschwister'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-024',
    word: 'Arbeit',
    article: 'die',
    wordType: 'noun',
    translation: 'trabalho',
    level: 'A2',
    category: 'beruf',
    exampleSentence: {
      german: 'Er fährt zur Arbeit.',
      translation: 'Ele vai para o trabalho.'
    },
    grammar: {
      topics: ['akkusativ', 'dativ'],
      hint: 'Plural: die Arbeiten.',
      forms: { plural: 'die Arbeiten' }
    },
    relatedWords: ['arbeiten', 'Arbeiter', 'Beruf'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-025',
    word: 'spät',
    wordType: 'adjektiv',
    translation: 'tarde',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Wie spät ist es? Es ist schon spät.',
      translation: 'Que horas são? Já é tarde.'
    },
    grammar: {
      topics: ['adjektiv_endungen'],
      hint: 'Antônimo: früh (cedo).'
    },
    antonyms: ['früh'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-026',
    word: 'früh',
    wordType: 'adjektiv',
    translation: 'cedo',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Ich stehe früh auf.',
      translation: 'Eu acordo cedo.'
    },
    grammar: {
      topics: ['adjektiv_endungen'],
      hint: 'Antônimo: spät (tarde).'
    },
    antonyms: ['spät'],
    metadata: { frequency: 5, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-027',
    word: 'Halb',
    wordType: 'adjektiv',
    translation: 'meio, meia',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Es ist halb fünf Uhr.',
      translation: 'São quatro e meia.'
    },
    grammar: {
      topics: ['adjektiv_endungen'],
      hint: 'halb fünf = 4:30 (quatro e meia).'
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-028',
    word: 'Ferienjob',
    article: 'der',
    wordType: 'noun',
    translation: 'trabalho de férias',
    level: 'A2',
    category: 'beruf',
    exampleSentence: {
      german: 'Viele Jugendliche suchen einen Ferienjob.',
      translation: 'Muitos jovens procuram um trabalho de férias.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Ferienjobs.',
      forms: { plural: 'die Ferienjobs' }
    },
    relatedWords: ['Job', 'Arbeit', 'Ferien'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-029',
    word: 'Bewerbung',
    article: 'die',
    wordType: 'noun',
    translation: 'candidatura, inscrição',
    level: 'A2',
    category: 'beruf',
    exampleSentence: {
      german: 'Schreiben Sie eine Bewerbung für den Job.',
      translation: 'Escreva uma candidatura para o trabalho.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Bewerbungen.',
      forms: { plural: 'die Bewerbungen' }
    },
    relatedWords: ['bewerben', 'Bewerber', 'Lebenslauf'],
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-030',
    word: 'Vorstellungsgespräch',
    article: 'das',
    wordType: 'noun',
    translation: 'entrevista de emprego',
    level: 'A2',
    category: 'beruf',
    exampleSentence: {
      german: 'Morgen habe ich ein Vorstellungsgespräch.',
      translation: 'Amanhã tenho uma entrevista de emprego.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Vorstellungsgespräche.',
      forms: { plural: 'die Vorstellungsgespräche' }
    },
    relatedWords: ['Bewerbung', 'Interview'],
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  
  // === B1 WÖRTER ===
  // Beruf & Arbeit
  {
    id: 'b1-001',
    word: 'Bewerbungsgespräch',
    article: 'das',
    wordType: 'noun',
    translation: 'entrevista de emprego',
    level: 'B1',
    category: 'beruf',
    exampleSentence: {
      german: 'Das hat mich an ein Bewerbungsgespräch erinnert.',
      translation: 'Isso me lembrou de uma entrevista de emprego.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Bewerbungsgespräche.',
      forms: { plural: 'die Bewerbungsgespräche' }
    },
    relatedWords: ['bewerben', 'Bewerber', 'Bewerbung'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-002',
    word: 'Radiosendung',
    article: 'die',
    wordType: 'noun',
    translation: 'programa de rádio',
    level: 'B1',
    category: 'freizeit',
    exampleSentence: {
      german: 'Ich habe eine spannende Radiosendung gehört.',
      translation: 'Eu ouvi um programa de rádio interessante.'
    },
    grammar: {
      topics: ['akkusativ', 'passiv'],
      hint: 'Plural: die Radiosendungen.',
      forms: { plural: 'die Radiosendungen' }
    },
    metadata: { frequency: 3, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-003',
    word: 'aufhören',
    wordType: 'verb',
    translation: 'parar, cessar',
    level: 'B1',
    category: 'alltag',
    exampleSentence: {
      german: 'Ich habe vor zwei Monaten mit dem Rauchen aufgehört.',
      translation: 'Eu parei de fumar há dois meses.'
    },
    grammar: {
      topics: ['perfekt', 'satzklammer'],
      hint: 'Verbo separável. Perfeito: hat aufgehört. aufhören mit + Dativ.',
      forms: { conjugation: ['höre auf', 'hörst auf', 'hört auf', 'hören auf', 'hört auf'] }
    },
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-004',
    word: 'Wohngemeinschaft',
    article: 'die',
    wordType: 'noun',
    translation: 'república, casa compartilhada',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Viele Studierende leben in einer Wohngemeinschaft.',
      translation: 'Muitos estudantes moram em república.'
    },
    grammar: {
      topics: ['dativ'],
      hint: 'in + Dativ = in einer WG. Abreviação: WG.',
      forms: { plural: 'die Wohngemeinschaften' }
    },
    synonyms: ['WG'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-005',
    word: 'vermieten',
    wordType: 'verb',
    translation: 'alugar (dar em aluguel)',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Die Stadt Hamburg vermietet Zimmer an Studierende.',
      translation: 'A cidade de Hamburgo aluga quartos para estudantes.'
    },
    grammar: {
      topics: ['akkusativ', 'verben_mit_präp'],
      hint: 'vermieten an + Acusativo.',
      forms: { conjugation: ['vermiete', 'vermietest', 'vermietet', 'vermieten', 'vermietet'] }
    },
    relatedWords: ['Vermieter', 'Miete', 'Mieter'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-006',
    word: 'Lebensqualität',
    article: 'die',
    wordType: 'noun',
    translation: 'qualidade de vida',
    level: 'B1',
    category: 'alltag',
    exampleSentence: {
      german: 'Wie schätzen Sie Ihre Lebensqualität ein?',
      translation: 'Como você avalia sua qualidade de vida?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Importante para discussões.'
    },
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-007',
    word: 'Tempolimit',
    article: 'das',
    wordType: 'noun',
    translation: 'limite de velocidade',
    level: 'B1',
    category: 'verkehr',
    exampleSentence: {
      german: 'Ein Tempolimit auf Autobahnen ist umstritten.',
      translation: 'Um limite de velocidade nas autobahns é controverso.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Tempolimits.',
      forms: { plural: 'die Tempolimits' }
    },
    metadata: { frequency: 3, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-008',
    word: 'Partnerschaft',
    article: 'die',
    wordType: 'noun',
    translation: 'parceria, relacionamento',
    level: 'B1',
    category: 'beziehungen',
    exampleSentence: {
      german: 'Menschen in einer Partnerschaft sind oft zufriedener.',
      translation: 'Pessoas em um relacionamento costumam ser mais satisfeitas.'
    },
    grammar: {
      topics: ['dativ'],
      hint: 'Plural: die Partnerschaften.',
      forms: { plural: 'die Partnerschaften' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-009',
    word: 'Ausflug',
    article: 'der',
    wordType: 'noun',
    translation: 'passeio, excursão',
    level: 'B1',
    category: 'freizeit',
    exampleSentence: {
      german: 'Einmal pro Woche mache ich Ausflüge mit dem Rad.',
      translation: 'Uma vez por semana faço passeios de bicicleta.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Ausflüge. Einen Ausflug machen.',
      forms: { plural: 'die Ausflüge' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-010',
    word: 'Studenten-WG',
    article: 'die',
    wordType: 'noun',
    translation: 'república de estudantes',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Hast du dich in deiner Studenten-WG gut eingelebt?',
      translation: 'Você se adaptou bem à sua república de estudantes?'
    },
    grammar: {
      topics: ['dativ'],
      hint: 'WG = Wohngemeinschaft.'
    },
    relatedWords: ['Wohngemeinschaft', 'Mitbewohner'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-011',
    word: 'Sitzen',
    article: 'das',
    wordType: 'noun',
    translation: 'ato de sentar, ficar sentado',
    level: 'B1',
    category: 'gesundheit',
    exampleSentence: {
      german: 'Sitzen ist das neue Rauchen.',
      translation: 'Ficar sentado é o novo fumar.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Substantivado do verbo sitzen.'
    },
    relatedWords: ['sitzen', 'bewegen', 'Bewegung'],
    metadata: { frequency: 3, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-012',
    word: 'Rauchen',
    article: 'das',
    wordType: 'noun',
    translation: 'fumar, ato de fumar',
    level: 'B1',
    category: 'gesundheit',
    exampleSentence: {
      german: 'Ich habe vor zwei Monaten mit dem Rauchen aufgehört.',
      translation: 'Parei de fumar há dois meses.'
    },
    grammar: {
      topics: ['dativ'],
      hint: 'Substantivado do verbo rauchen. mit dem Rauchen aufhören.'
    },
    relatedWords: ['rauchen', 'Raucher', 'Zigarette'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-013',
    word: 'Nichtraucher',
    article: 'der',
    wordType: 'noun',
    translation: 'não-fumante',
    level: 'B1',
    category: 'gesundheit',
    exampleSentence: {
      german: 'Seit zwei Monaten bin ich Nichtraucher.',
      translation: 'Há dois meses sou não-fumante.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Nichtraucher.',
      forms: { plural: 'die Nichtraucher' }
    },
    antonyms: ['Raucher'],
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-014',
    word: 'bewegen',
    wordType: 'verb',
    translation: 'mover, movimentar-se',
    level: 'B1',
    category: 'gesundheit',
    exampleSentence: {
      german: 'Es ist wichtig, sich zu bewegen.',
      translation: 'É importante movimentar-se.'
    },
    grammar: {
      topics: ['perfekt', 'infinitiv_sätze'],
      hint: 'sich bewegen = reflexivo. Perfeito: hat bewegt.',
      forms: { conjugation: ['bewege', 'bewegst', 'bewegt', 'bewegen', 'bewegt'] }
    },
    relatedWords: ['Bewegung', 'Sport', 'Fitnes'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-015',
    word: 'Studium',
    article: 'das',
    wordType: 'noun',
    translation: 'estudos universitários, faculdade',
    level: 'B1',
    category: 'bildung',
    exampleSentence: {
      german: 'Bis zum Ende ihres Studiums wohnen sie dort.',
      translation: 'Eles moram lá até o fim dos estudos.'
    },
    grammar: {
      topics: ['akkusativ', 'genitiv'],
      hint: 'Plural: die Studien.',
      forms: { plural: 'die Studien' }
    },
    relatedWords: ['studieren', 'Student', 'Universität'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-016',
    word: 'Wohnungsamt',
    article: 'das',
    wordType: 'noun',
    translation: 'departamento de moradia',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Das Hamburger Wohnungsamt vermittelt Zimmer.',
      translation: 'O departamento de moradia de Hamburgo intermedia quartos.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Wohnungsämter.',
      forms: { plural: 'die Wohnungsämter' }
    },
    metadata: { frequency: 2, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-017',
    word: 'Alleinerziehende',
    article: 'der/die',
    wordType: 'noun',
    translation: 'pai/mãe solteiro(a)',
    level: 'B1',
    category: 'beziehungen',
    exampleSentence: {
      german: 'Auch Alleinerziehende rufen bei Thomas Schmidt an.',
      translation: 'Pais solteiros também ligam para Thomas Schmidt.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Alleinerziehenden.'
    },
    relatedWords: ['Kind', 'Eltern', 'Familie'],
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-018',
    word: 'Miete',
    article: 'die',
    wordType: 'noun',
    translation: 'aluguel',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Die Mieten steigen jährlich.',
      translation: 'Os alugueis sobem anualmente.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Mieten.',
      forms: { plural: 'die Mieten' }
    },
    relatedWords: ['vermieten', 'Mieter', 'Vermieter'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-019',
    word: 'Autobahn',
    article: 'die',
    wordType: 'noun',
    translation: 'autoestrada',
    level: 'B1',
    category: 'verkehr',
    exampleSentence: {
      german: 'Auf deutschen Autobahnen gibt es oft kein Tempolimit.',
      translation: 'Nas autoestradas alemãs muitas vezes não há limite de velocidade.'
    },
    grammar: {
      topics: ['dativ'],
      hint: 'Plural: die Autobahnen. auf + Dativ.',
      forms: { plural: 'die Autobahnen' }
    },
    relatedWords: ['Straße', 'Auto', 'Tempolimit'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-020',
    word: 'Stress',
    article: 'der',
    wordType: 'noun',
    translation: 'estresse',
    level: 'B1',
    category: 'gesundheit',
    exampleSentence: {
      german: 'Der Alltag mit Kindern ist oft stressig.',
      translation: 'O dia a dia com crianças é muitas vezes estressante.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Stresssituationen.',
      forms: { plural: 'die Stresssituationen' }
    },
    relatedWords: ['stressig', 'entspannen', 'Entspannung'],
    metadata: { frequency: 5, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-021',
    word: 'Karriere',
    article: 'die',
    wordType: 'noun',
    translation: 'carreira',
    level: 'B1',
    category: 'beruf',
    exampleSentence: {
      german: 'In der Mitte des Lebens ist die Karriere sehr wichtig.',
      translation: 'Na metade da vida a carreira é muito importante.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Karrieren.',
      forms: { plural: 'die Karrieren' }
    },
    relatedWords: ['Beruf', 'Arbeit', 'Job'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-022',
    word: 'Zufriedenheit',
    article: 'die',
    wordType: 'noun',
    translation: 'satisfação',
    level: 'B1',
    category: 'alltag',
    exampleSentence: {
      german: 'Die Zufriedenheit steigt mit dem Alter.',
      translation: 'A satisfação aumenta com a idade.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Antônimo: Unzufriedenheit.'
    },
    relatedWords: ['zufrieden', 'zufriedenstellen'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-023',
    word: 'nachweisen',
    wordType: 'verb',
    translation: 'comprovar, demonstrar',
    level: 'B1',
    category: 'beruf',
    exampleSentence: {
      german: 'Mit der Prüfung haben Sie nachgewiesen, dass Sie Deutsch können.',
      translation: 'Com o exame você comprovou que sabe alemão.'
    },
    grammar: {
      topics: ['perfekt', 'konjunktiv_ii'],
      hint: 'Perfeito: hat nachgewiesen.',
      forms: { conjugation: ['weise nach', 'weist nach', 'weist nach', 'weisen nach', 'weist nach'] }
    },
    relatedWords: ['Nachweis', 'beweisen'],
    metadata: { frequency: 3, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-024',
    word: 'sich verständigen',
    wordType: 'verb',
    translation: 'comunicar-se, entender-se',
    level: 'B1',
    category: 'beziehungen',
    exampleSentence: {
      german: 'Sie können sich auf einfache Weise auf Deutsch verständigen.',
      translation: 'Você pode comunicar-se de forma simples em alemão.'
    },
    grammar: {
      topics: ['akkusativ', 'reflexiv'],
      hint: 'Verbo reflexivo. sich verständigen über + Acusativo.',
      forms: { conjugation: ['verständige mich', 'verständest dich', 'verständigt sich', 'verständigen uns', 'verständigt euch'] }
    },
    relatedWords: ['Verständigung', 'Verständnis'],
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-025',
    word: 'erfolgreich',
    wordType: 'adjektiv',
    translation: 'bem-sucedido',
    level: 'B1',
    category: 'alltag',
    exampleSentence: {
      german: 'Das Projekt war sehr erfolgreich.',
      translation: 'O projeto foi muito bem-sucedido.'
    },
    grammar: {
      topics: ['adjektiv_endungen'],
      hint: 'Komparativ: erfolgreicher.'
    },
    relatedWords: ['Erfolg', 'erfolgen'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-026',
    word: 'Hilfe',
    article: 'die',
    wordType: 'noun',
    translation: 'ajuda',
    level: 'B1',
    category: 'alltag',
    exampleSentence: {
      german: 'Die Stadt vermietet Zimmer gegen Hilfe.',
      translation: 'A cidade aluga quartos em troca de ajuda.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Hilfen.',
      forms: { plural: 'die Hilfen' }
    },
    relatedWords: ['helfen', 'hilfreich', 'Hilfe'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-027',
    word: 'Quadratmeter',
    article: 'der',
    wordType: 'noun',
    translation: 'metro quadrado',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Für jeden Quadratmeter arbeiten sie eine Stunde.',
      translation: 'Para cada metro quadrado eles trabalham uma hora.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Abreviação: m².',
      forms: { plural: 'die Quadratmeter' }
    },
    relatedWords: ['Meter', 'Wohnfläche'],
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-028',
    word: 'Hausordnung',
    article: 'die',
    wordType: 'noun',
    translation: 'regulamento interno',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Bitte beachten Sie die Hausordnung des Fitness-Studios.',
      translation: 'Por favor, observe o regulamento interno da academia.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Hausordnungen.',
      forms: { plural: 'die Hausordnungen' }
    },
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-029',
    word: 'Handtuch',
    article: 'das',
    wordType: 'noun',
    translation: 'toalha',
    level: 'B1',
    category: 'alltag',
    exampleSentence: {
      german: 'Ein Handtuch soll man für das Training dabei haben.',
      translation: 'Deve-se ter uma toalha para o treino.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Handtücher.',
      forms: { plural: 'die Handtücher' }
    },
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-030',
    word: 'Fitness-Studio',
    article: 'das',
    wordType: 'noun',
    translation: 'academia',
    level: 'B1',
    category: 'freizeit',
    exampleSentence: {
      german: 'Ich bin Mitglied in einem Fitness-Studio geworden.',
      translation: 'Tornei-me membro de uma academia.'
    },
    grammar: {
      topics: ['akkusativ', 'dativ'],
      hint: 'Plural: die Fitness-Studios.',
      forms: { plural: 'die Fitness-Studios' }
    },
    relatedWords: ['Sport', 'Training', 'Fitnes'],
    metadata: { frequency: 4, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  }
];

// Kategorien-Definition
export const categories: { name: WordCategory; description: string; icon: string }[] = [
  { name: 'alltag', description: 'Alltagssituationen & tägliche Routinen', icon: '🏠' },
  { name: 'beruf', description: 'Beruf, Arbeit & Bewerbung', icon: '💼' },
  { name: 'freizeit', description: 'Freizeit, Hobbys & Sport', icon: '⚽' },
  { name: 'gesundheit', description: 'Gesundheit, Körper & Arzt', icon: '🏥' },
  { name: 'wohnung', description: 'Wohnung, Haus & Möbel', icon: '🏡' },
  { name: 'verkehr', description: 'Verkehr, Reisen & Orientierung', icon: '🚗' },
  { name: 'einkaufen', description: 'Einkaufen, Geld & Preise', icon: '🛒' },
  { name: 'beziehungen', description: 'Beziehungen, Familie & Kommunikation', icon: '👥' },
  { name: 'bildung', description: 'Bildung, Schule & Ausbildung', icon: '📚' },
  { name: 'umwelt', description: 'Umwelt, Natur & Wetter', icon: '🌿' }
];

// Grammatik-Topics Beschreibungen
export const grammarTopicsInfo: Record<GrammarTopic, { name: string; description: string; level: Level }> = {
  // A2
  perfekt: { name: 'Perfekt', description: 'Vergangenheit mit haben/sein + Partizip II', level: 'A2' },
  modalverben: { name: 'Modalverben', description: 'können, müssen, wollen, dürfen, sollen, möchten', level: 'A2' },
  präteritum: { name: 'Präteritum', description: 'Vergangenheit (war, hatte, ging)', level: 'A2' },
  akkusativ: { name: 'Akkusativ', description: 'den, einen, keinen (Wen? Was?)', level: 'A2' },
  dativ: { name: 'Dativ', description: 'dem, einem, keinem (Wem?)', level: 'A2' },
  präpositionen: { name: 'Präpositionen', description: 'in, an, auf, unter, vor, hinter, etc.', level: 'A2' },
  adjektiv_endungen: { name: 'Adjektivendungen', description: 'der gute Mann, ein guter Mann', level: 'A2' },
  satzklammer: { name: 'Satzklammer', description: 'Verb am Ende bei trennbaren Verben', level: 'A2' },
  konjunktionen: { name: 'Konjunktionen', description: 'denn, weil, dass, ob', level: 'A2' },
  // B1
  konjunktiv_ii: { name: 'Konjunktiv II', description: 'würde, hätte, wäre (Höflichkeit, Wünsche)', level: 'B1' },
  passiv: { name: 'Passiv', description: 'wird gemacht, wurde gemacht', level: 'B1' },
  relativsätze: { name: 'Relativsätze', description: 'der, die, das als Relativpronomen', level: 'B1' },
  genitiv: { name: 'Genitiv', description: 'des, eines (Wessen?)', level: 'B1' },
  infinitiv_sätze: { name: 'Infinitivsätze', description: 'zu + Infinitiv, um...zu', level: 'B1' },
  indirekte_fragen: { name: 'Indirekte Fragesätze', description: 'Ich weiß nicht, ob/wann/wo...', level: 'B1' },
  nomen_verben: { name: 'Nomen-Verbindungen', description: 'eine Entscheidung treffen', level: 'B1' },
  verben_mit_präp: { name: 'Verben mit Präpositionen', description: 'warten auf, sich freuen über', level: 'B1' }
};
