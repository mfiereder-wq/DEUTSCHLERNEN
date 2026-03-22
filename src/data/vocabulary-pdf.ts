import { VocabularyCard, GrammarTopic } from './vocabulary';

// A1/A2 Level Vocabulary extracted from Goethe-Zertifikat A1 SD1 Modellsatz
export const a1a2Vocabulary: VocabularyCard[] = [
  // Alltag & Begrüßung
  {
    id: 'a1-001',
    word: 'der Name',
    article: 'der',
    wordType: 'noun',
    translation: 'name',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Wie ist Ihr Name, bitte?',
      translation: 'What is your name, please?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Namen. Oft in Begrüßungsformeln.',
      forms: { plural: 'die Namen' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-002',
    word: 'die Zimmernummer',
    article: 'die',
    wordType: 'noun',
    translation: 'room number',
    level: 'A2',
    category: 'wohnung',
    exampleSentence: {
      german: 'Welche Zimmernummer haben Sie?',
      translation: 'What room number do you have?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Zimmernummern. Wichtig in Hotels.',
      forms: { plural: 'die Zimmernummern' }
    },
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-003',
    word: 'kosten',
    wordType: 'verb',
    translation: 'to cost',
    level: 'A2',
    category: 'einkaufen',
    exampleSentence: {
      german: 'Was kostet der Pullover?',
      translation: 'How much does the pullover cost?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Regelmäßiges Verb: kostet, kostete, hat gekostet.',
      forms: { conjugation: ['kostet', 'kostest', 'kostet', 'kosten', 'kostet'] }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-004',
    word: 'der Pullover',
    article: 'der',
    wordType: 'noun',
    translation: 'pullover, sweater',
    level: 'A2',
    category: 'einkaufen',
    exampleSentence: {
      german: 'Der Pullover kostet dreißig Euro.',
      translation: 'The pullover costs thirty euros.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Pullover. Kleidungsstück.',
      forms: { plural: 'die Pullover' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-005',
    word: 'die Uhr',
    article: 'die',
    wordType: 'noun',
    translation: 'clock, watch',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Wie spät ist es? Es ist 15 Uhr.',
      translation: 'What time is it? It is 3 pm.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Uhren. Für Uhrzeiten.',
      forms: { plural: 'die Uhren' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-006',
    word: 'essen',
    wordType: 'verb',
    translation: 'to eat',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Was möchten Sie essen?',
      translation: 'What would you like to eat?'
    },
    grammar: {
      topics: ['perfekt', 'modalverben'],
      hint: 'Unregelmäßiges Verb: isst, aß, hat gegessen.',
      forms: { conjugation: ['esse', 'isst', 'isst', 'essen', 'esst'] }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-007',
    word: 'das Restaurant',
    article: 'das',
    wordType: 'noun',
    translation: 'restaurant',
    level: 'A2',
    category: 'einkaufen',
    exampleSentence: {
      german: 'Gibt es hier ein gutes Restaurant?',
      translation: 'Is there a good restaurant here?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Restaurants.',
      forms: { plural: 'die Restaurants' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-008',
    word: 'die Klasse',
    article: 'die',
    wordType: 'noun',
    translation: 'class, grade',
    level: 'A2',
    category: 'bildung',
    exampleSentence: {
      german: 'In welche Klasse geht Ihr Kind?',
      translation: 'Which grade does your child go to?'
    },
    grammar: {
      topics: ['akkusativ', 'präpositionen'],
      hint: 'Plural: die Klassen. In + Akkusativ = in die Klasse.',
      forms: { plural: 'die Klassen' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-009',
    word: 'der Aufzug',
    article: 'der',
    wordType: 'noun',
    translation: 'elevator, lift',
    level: 'A2',
    category: 'wohnung',
    exampleSentence: {
      german: 'Nehmen Sie bitte den Aufzug in den zweiten Stock.',
      translation: 'Please take the elevator to the second floor.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Aufzüge (mit Umlaut!).',
      forms: { plural: 'die Aufzüge' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-010',
    word: 'die Rolltreppe',
    article: 'die',
    wordType: 'noun',
    translation: 'escalator',
    level: 'A2',
    category: 'verkehr',
    exampleSentence: {
      german: 'Die Rolltreppe ist links.',
      translation: 'The escalator is on the left.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Rolltreppen.',
      forms: { plural: 'die Rolltreppen' }
    },
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-011',
    word: 'fahren',
    wordType: 'verb',
    translation: 'to drive, to go (by vehicle)',
    level: 'A2',
    category: 'verkehr',
    exampleSentence: {
      german: 'Wohin fahren Sie in den Urlaub?',
      translation: 'Where are you going for vacation?'
    },
    grammar: {
      topics: ['perfekt'],
      hint: 'Bewegungsverben mit sein im Perfekt: ist gefahren.',
      forms: { conjugation: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt'] }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-012',
    word: 'der Urlaub',
    article: 'der',
    wordType: 'noun',
    translation: 'vacation, holiday',
    level: 'A2',
    category: 'freizeit',
    exampleSentence: {
      german: 'Ich fahre in den Urlaub ans Meer.',
      translation: 'I am going on vacation to the sea.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Urlaub. Oft mit "in den Urlaub fahren".',
      forms: { plural: 'die Urlaube' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-013',
    word: 'das Meer',
    article: 'das',
    wordType: 'noun',
    translation: 'sea, ocean',
    level: 'A2',
    category: 'freizeit',
    exampleSentence: {
      german: 'Wir fahren ans Meer.',
      translation: 'We are going to the sea.'
    },
    grammar: {
      topics: ['akkusativ', 'präpositionen'],
      hint: 'an + das = ans. Plural: die Meere.',
      forms: { plural: 'die Meere' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-014',
    word: 'die Information',
    article: 'die',
    wordType: 'noun',
    translation: 'information',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Die Reisende soll zur Information kommen.',
      translation: 'The traveler should come to the information desk.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Informationen.',
      forms: { plural: 'die Informationen' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-015',
    word: 'der Bahnhof',
    article: 'der',
    wordType: 'noun',
    translation: 'train station',
    level: 'A2',
    category: 'verkehr',
    exampleSentence: {
      german: 'Wo ist der Bahnhof?',
      translation: 'Where is the train station?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Bahnhöfe.',
      forms: { plural: 'die Bahnhöfe' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-016',
    word: 'der Schalter',
    article: 'der',
    wordType: 'noun',
    translation: 'counter, ticket window',
    level: 'A2',
    category: 'verkehr',
    exampleSentence: {
      german: 'Bitte kommen Sie zum Schalter.',
      translation: 'Please come to the counter.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Schalter.',
      forms: { plural: 'die Schalter' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-017',
    word: 'warten',
    wordType: 'verb',
    translation: 'to wait',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Ich muss noch zehn Minuten warten.',
      translation: 'I still have to wait ten minutes.'
    },
    grammar: {
      topics: ['modalverben', 'präpositionen'],
      hint: 'warten auf + Akkusativ (warten auf jemanden).'
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-018',
    word: 'kaputt',
    wordType: 'adjektiv',
    translation: 'broken',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Der Fernseher ist kaputt.',
      translation: 'The television is broken.'
    },
    grammar: {
      topics: ['adjektiv_endungen'],
      hint: 'Adjektiv nach sein. Plural: kaputte.'
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-019',
    word: 'der Fernseher',
    article: 'der',
    wordType: 'noun',
    translation: 'television, TV',
    level: 'A2',
    category: 'wohnung',
    exampleSentence: {
      german: 'Der Fernseher funktioniert nicht.',
      translation: 'The TV is not working.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Fernseher.',
      forms: { plural: 'die Fernseher' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'a1-020',
    word: 'das Handy',
    article: 'das',
    wordType: 'noun',
    translation: 'mobile phone, cell phone',
    level: 'A2',
    category: 'alltag',
    exampleSentence: {
      german: 'Mein Handy ist kaputt.',
      translation: 'My mobile phone is broken.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Handys.',
      forms: { plural: 'die Handys' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  }
];

// B1 Level Vocabulary extracted from Goethe-Zertifikat B1
export const b1Vocabulary: VocabularyCard[] = [
  {
    id: 'b1-001',
    word: 'das Sommerfest',
    article: 'das',
    wordType: 'noun',
    translation: 'summer party',
    level: 'B1',
    category: 'freizeit',
    exampleSentence: {
      german: 'Seit dem Sommerfest habe ich nichts von ihm gehört.',
      translation: 'Since the summer party I haven\'t heard anything from him.'
    },
    grammar: {
      topics: ['präteritum', 'perfekt'],
      hint: 'Plural: die Sommerfeste.',
      forms: { plural: 'die Sommerfeste' }
    },
    metadata: { frequency: 3, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-002',
    word: 'sich einleben',
    wordType: 'verb',
    translation: 'to settle in, to get used to',
    level: 'B1',
    category: 'alltag',
    exampleSentence: {
      german: 'Hast du dich in deiner neuen Wohnung gut eingelebt?',
      translation: 'Have you settled in well in your new apartment?'
    },
    grammar: {
      topics: ['perfekt'],
      hint: 'Reflexives Verb mit sein im Perfekt: hat sich eingelebt.'
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-003',
    word: 'aufhören',
    wordType: 'verb',
    translation: 'to stop, to quit',
    level: 'B1',
    category: 'alltag',
    exampleSentence: {
      german: 'Ich habe vor zwei Monaten mit dem Rauchen aufgehört.',
      translation: 'I stopped smoking two months ago.'
    },
    grammar: {
      topics: ['perfekt', 'präpositionen'],
      hint: 'Trennbares Verb. aufhören mit + Dativ.',
      forms: { conjugation: ['höre auf', 'hörst auf', 'hört auf', 'hören auf', 'hört auf'] }
    },
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-004',
    word: 'die Radiosendung',
    article: 'die',
    wordType: 'noun',
    translation: 'radio program, radio show',
    level: 'B1',
    category: 'freizeit',
    exampleSentence: {
      german: 'Ich habe eine spannende Radiosendung gehört.',
      translation: 'I listened to an interesting radio program.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Radiosendungen.',
      forms: { plural: 'die Radiosendungen' }
    },
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-005',
    word: 'das Bewerbungsgespräch',
    article: 'das',
    wordType: 'noun',
    translation: 'job interview',
    level: 'B1',
    category: 'beruf',
    exampleSentence: {
      german: 'Das hat mich an ein Bewerbungsgespräch erinnert.',
      translation: 'That reminded me of a job interview.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Bewerbungsgespräche.',
      forms: { plural: 'die Bewerbungsgespräche' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-006',
    word: 'vermieten',
    wordType: 'verb',
    translation: 'to rent out',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Die Stadt Hamburg vermietet Zimmer an Studierende.',
      translation: 'The city of Hamburg rents out rooms to students.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'vermieten an + Akkusativ.',
      forms: { conjugation: ['vermiete', 'vermietest', 'vermietet', 'vermieten', 'vermietet'] }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-007',
    word: 'die Wohngemeinschaft',
    article: 'die',
    wordType: 'noun',
    translation: 'shared apartment, flat share',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Viele Studierende leben in einer Wohngemeinschaft.',
      translation: 'Many students live in a shared apartment.'
    },
    grammar: {
      topics: ['dativ'],
      hint: 'Plural: die Wohngemeinschaften. In + Dativ = in einer WG.',
      forms: { plural: 'die Wohngemeinschaften' }
    },
    synonyms: ['WG'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-008',
    word: 'die Miete',
    article: 'die',
    wordType: 'noun',
    translation: 'rent',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Die Mieten steigen jährlich.',
      translation: 'Rents are rising annually.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Mieten. Die Miete zahlen.',
      forms: { plural: 'die Mieten' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-009',
    word: 'die Lebensqualität',
    article: 'die',
    wordType: 'noun',
    translation: 'quality of life',
    level: 'B1',
    category: 'alltag',
    exampleSentence: {
      german: 'Wie schätzen Sie Ihre Lebensqualität ein?',
      translation: 'How do you rate your quality of life?'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Wichtig für Diskussionen und Meinungsäußerungen.'
    },
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-010',
    word: 'der Psychologe',
    article: 'der',
    wordType: 'noun',
    translation: 'psychologist',
    level: 'B1',
    category: 'gesundheit',
    exampleSentence: {
      german: 'Der Psychologe hat eine interessante Studie gemacht.',
      translation: 'The psychologist conducted an interesting study.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Berufsbezeichnung. Plural: die Psychologen.',
      forms: { plural: 'die Psychologen' }
    },
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-011',
    word: 'die Partnerschaft',
    article: 'die',
    wordType: 'noun',
    translation: 'partnership, relationship',
    level: 'B1',
    category: 'beziehungen',
    exampleSentence: {
      german: 'Menschen in einer Partnerschaft sind oft zufriedener.',
      translation: 'People in a partnership are often more satisfied.'
    },
    grammar: {
      topics: ['dativ'],
      hint: 'Plural: die Partnerschaften.',
      forms: { plural: 'die Partnerschaften' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-012',
    word: 'der Ausflug',
    article: 'der',
    wordType: 'noun',
    translation: 'excursion, trip',
    level: 'B1',
    category: 'freizeit',
    exampleSentence: {
      german: 'Wir machen Ausflüge mit dem Rad.',
      translation: 'We go on bike trips.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Ausflüge. Einen Ausflug machen.',
      forms: { plural: 'die Ausflüge' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-013',
    word: 'das Tempolimit',
    article: 'das',
    wordType: 'noun',
    translation: 'speed limit',
    level: 'B1',
    category: 'verkehr',
    exampleSentence: {
      german: 'Ein Tempolimit auf Autobahnen ist umstritten.',
      translation: 'A speed limit on highways is controversial.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Diskussionsthema. Plural: die Tempolimits.',
      forms: { plural: 'die Tempolimits' }
    },
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-014',
    word: 'die Autobahn',
    article: 'die',
    wordType: 'noun',
    translation: 'highway, motorway',
    level: 'B1',
    category: 'verkehr',
    exampleSentence: {
      german: 'Auf deutschen Autobahnen gibt es oft kein Tempolimit.',
      translation: 'On German highways there is often no speed limit.'
    },
    grammar: {
      topics: ['akkusativ', 'dativ'],
      hint: 'Plural: die Autobahnen. Auf der Autobahn (Dativ).',
      forms: { plural: 'die Autobahnen' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-015',
    word: 'überholen',
    wordType: 'verb',
    translation: 'to overtake, to pass',
    level: 'B1',
    category: 'verkehr',
    exampleSentence: {
      german: 'Die ganze Zeit überholt jemand.',
      translation: 'Someone is overtaking all the time.'
    },
    grammar: {
      topics: ['perfekt'],
      hint: 'Regelmäßiges Verb: hat überholt.',
      forms: { conjugation: ['überhole', 'überholst', 'überholt', 'überholen', 'überholt'] }
    },
    metadata: { frequency: 3, examRelevance: 3, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-016',
    word: 'das Fitness-Studio',
    article: 'das',
    wordType: 'noun',
    translation: 'gym, fitness center',
    level: 'B1',
    category: 'freizeit',
    exampleSentence: {
      german: 'Ich bin Mitglied in einem Fitness-Studio geworden.',
      translation: 'I became a member of a gym.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Fitness-Studios.',
      forms: { plural: 'die Fitness-Studios' }
    },
    metadata: { frequency: 4, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-017',
    word: 'die Hausordnung',
    article: 'die',
    wordType: 'noun',
    translation: 'house rules',
    level: 'B1',
    category: 'wohnung',
    exampleSentence: {
      german: 'Sie müssen die Hausordnung beachten.',
      translation: 'You have to observe the house rules.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Hausordnungen.',
      forms: { plural: 'die Hausordnungen' }
    },
    metadata: { frequency: 3, examRelevance: 4, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-018',
    word: 'der Ferienjob',
    article: 'der',
    wordType: 'noun',
    translation: 'holiday job, summer job',
    level: 'B1',
    category: 'beruf',
    exampleSentence: {
      german: 'In den Sommerferien suchen viele junge Menschen einen Ferienjob.',
      translation: 'During the summer holidays many young people look for a holiday job.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Ferienjobs.',
      forms: { plural: 'die Ferienjobs' }
    },
    metadata: { frequency: 4, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-019',
    word: 'die Bewerbung',
    article: 'die',
    wordType: 'noun',
    translation: 'application',
    level: 'B1',
    category: 'beruf',
    exampleSentence: {
      german: 'Schicken Sie Ihre Bewerbung per E-Mail.',
      translation: 'Send your application by email.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Bewerbungen. Wichtig für den Beruf.',
      forms: { plural: 'die Bewerbungen' }
    },
    relatedWords: ['bewerben', 'Bewerber', 'Bewerbungsgespräch'],
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  },
  {
    id: 'b1-020',
    word: 'der Kurs',
    article: 'der',
    wordType: 'noun',
    translation: 'course',
    level: 'B1',
    category: 'bildung',
    exampleSentence: {
      german: 'Ich habe mich für einen Deutschkurs angemeldet.',
      translation: 'I registered for a German course.'
    },
    grammar: {
      topics: ['akkusativ'],
      hint: 'Plural: die Kurse. Sich für einen Kurs anmelden.',
      forms: { plural: 'die Kurse' }
    },
    metadata: { frequency: 5, examRelevance: 5, timesReviewed: 0, timesCorrect: 0 }
  }
];

// Combine all vocabulary
export const allVocabulary: VocabularyCard[] = [...a1a2Vocabulary, ...b1Vocabulary];
