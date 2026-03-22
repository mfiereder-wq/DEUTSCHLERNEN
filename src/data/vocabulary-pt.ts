import { VocabularyCard } from './vocabulary';

// ============================================
// PORTUGIESISCHE ÜBERSETZUNGEN
// Vokabeln aus Goethe-Zertifikat A1/A2 und B1 PDFs
// ============================================

export const a1a2Vocabulary: VocabularyCard[] = [
  // A1/A2 Beispiele (aus Goethe-Zertifikat A1 SD1 Modellsatz)
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
      hint: 'Substantivo feminino, plural: die Anmeldungen. Frequentemente usado com a preposição "bei".',
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
      hint: 'Verbo separável: "auf" fica no final da frase. Perfeito: ist aufgestanden (com sein).',
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
      hint: 'Plural: die Zimmernummern. Frequentemente perguntado em hotéis.',
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
      hint: 'Plural: die Aufzüge (com trema!).',
      forms: { plural: 'die Aufzüge' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-007',
    word: 'Uhr',
    article: 'die',
    wordType: 'noun',
    translation: 'relógio',
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
      hint: 'warten auf + Akkusativ (esperar por alguém/algo).'
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
      hint: 'Adjetivo após sein (verbo ser/estar).'
    },
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
      hint: 'Plural: die Pullover. Peça de roupa.',
      forms: { plural: 'die Pullover' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-012',
    word: 'Schalter',
    article: 'der',
    wordType: 'noun',
    translation: 'guichê, balcão de atendimento',
    level: 'A2',
    category: 'verkehr',
    exampleSentence: {
      german: 'Bitte kommen Sie zum Schalter.',
      translation: 'Por favor, venha ao guichê.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Schalter.',
      forms: { plural: 'die Schalter' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-013',
    word: 'Information',
    article: 'die',
    wordType: 'noun',
    translation: 'informação',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Die Reisende soll zur Information kommen.',
      translation: 'A viajante deve ir ao balcão de informações.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Informationen.',
      forms: { plural: 'die Informationen' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-014',
    word: 'Klasse',
    article: 'die',
    wordType: 'noun',
    translation: 'classe, série escolar',
    level: 'A2',
    category: 'bildung',
    exampleSentence: {
      german: 'In welche Klasse geht Ihr Kind?',
      translation: 'Em que série seu filho estuda?'
    },
    grammar: {
      topics: ['akkusativ', 'präpositionen'],
      hint: 'Plural: die Klassen. In + Akkusativ = in die Klasse.',
      forms: { plural: 'die Klassen' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a2-015',
    word: 'Fernseher',
    article: 'der',
    wordType: 'noun',
    translation: 'televisão',
    level: 'A2',
    category: 'wohnung',
    exampleSentence: {
      german: 'Der Fernseher ist kaputt.',
      translation: 'A televisão está quebrada.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Fernseher.',
      forms: { plural: 'die Fernseher' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },

  // B1 Beispiele (aus Goethe-Zertifikat B1 Übungssatz)
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
      hint: 'Plural: die Bewerbungsgespräche. Importante para o mundo profissional.',
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
      hint: 'In + Dativ = in einer WG. Abreviação: WG.',
      forms: { plural: 'die Wohngemeinschaften' }
    },
    synonyms: ['WG'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-005',
    word: 'Ferienjob',
    article: 'der',
    wordType: 'noun',
    translation: 'trabalho de férias',
    level: 'B1',
    category: 'beruf',
    exampleSentence: {
      german: 'In den Sommerferien suchen viele junge Menschen einen Ferienjob.',
      translation: 'Nas férias de verão, muitos jovens procuram um trabalho de férias.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Ferienjobs. Tema popular em provas.',
      forms: { plural: 'die Ferienjobs' }
    },
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-006',
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
      hint: 'vermieten an + Akkusativ.',
      forms: { conjugation: ['vermiete', 'vermietest', 'vermietet', 'vermieten', 'vermietet'] }
    },
    relatedWords: ['Vermieter', 'Miete', 'Mieter'],
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-007',
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
    id: 'b1-008',
    word: 'Tempolimit',
    article: 'das',
    wordType: 'noun',
    translation: 'limite de velocidade',
    level: 'B1',
    category: 'verkehr',
    exampleSentence: {
      german: 'Ein Tempolimit auf deutschen Autobahnen ist umstritten.',
      translation: 'Um limite de velocidade nas autobahns alemãs é controverso.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Tempolimits. Tema de discussão.',
      forms: { plural: 'die Tempolimits' }
    },
    metadata: { frequency: 3, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-009',
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
    id: 'b1-010',
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
    id: 'b1-011',
    word: 'sich einleben',
    wordType: 'verb',
    translation: 'adaptar-se, acostumar-se',
    level: 'B1',
    category: 'alltag',
    exampleSentence: {
      german: 'Hast du dich in deiner neuen Wohnung gut eingelebt?',
      translation: 'Você já se adaptou bem ao seu novo apartamento?'
    },
    grammar: {
      topics: ['perfekt'],
      hint: 'Verbo reflexivo. Perfeito: hat sich eingelebt.'
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-012',
    word: 'Miete',
    article: 'die',
    wordType: 'noun',
    translation: 'aluguel',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Die Mieten steigen jährlich.',
      translation: 'Os aluguéis sobem anualmente.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Mieten. Die Miete zahlen.',
      forms: { plural: 'die Mieten' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-013',
    word: 'Bewerbung',
    article: 'die',
    wordType: 'noun',
    translation: 'candidatura, inscrição',
    level: 'B1',
    category: 'beruf',
    exampleSentence: {
      german: 'Schicken Sie Ihre Bewerbung per E-Mail.',
      translation: 'Envie sua candidatura por e-mail.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Bewerbungen. Importante para o trabalho.',
      forms: { plural: 'die Bewerbungen' }
    },
    relatedWords: ['bewerben', 'Bewerber', 'Bewerbungsgespräch'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-014',
    word: 'überholen',
    wordType: 'verb',
    translation: 'ultrapassar',
    level: 'B1',
    category: 'verkehr',
    exampleSentence: {
      german: 'Die ganze Zeit überholt jemand.',
      translation: 'O tempo todo alguém está ultrapassando.'
    },
    grammar: {
      topics: ['perfekt'],
      hint: 'Verbo regular: hat überholt.',
      forms: { conjugation: ['überhole', 'überholst', 'überholt', 'überholen', 'überholt'] }
    },
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-015',
    word: 'Kurs',
    article: 'der',
    wordType: 'noun',
    translation: 'curso',
    level: 'B1',
    category: 'bildung',
    exampleSentence: {
      german: 'Ich habe mich für einen Deutschkurs angemeldet.',
      translation: 'Eu me inscrevi em um curso de alemão.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Kurse. Sich für einen Kurs anmelden.',
      forms: { plural: 'die Kurse' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  }
];
