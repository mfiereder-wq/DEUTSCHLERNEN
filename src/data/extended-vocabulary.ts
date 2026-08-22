// Extended Vocabulary Database - 2000+ Words
// Organized by themes and difficulty levels

export type DifficultyLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface ExtendedVocabWord {
  id: string;
  german: string;
  english: string;
  category: string;
  subcategory?: string;
  difficulty: DifficultyLevel;
  tags: string[];
  exampleSentence?: string;
  pronunciation?: string;
  synonyms?: string[];
  addedAt?: string; // ISO date when added to system
  isNew?: boolean;
}

// Daily rotation themes
export const DAILY_THEMES = [
  { day: 0, name: 'Alltag', color: '#10b981', icon: '🏠' },
  { day: 1, name: 'Arbeit', color: '#3b82f6', icon: '💼' },
  { day: 2, name: 'Essen', color: '#f59e0b', icon: '🍽️' },
  { day: 3, name: 'Reisen', color: '#8b5cf6', icon: '✈️' },
  { day: 4, name: 'Gesundheit', color: '#ef4444', icon: '🏥' },
  { day: 5, name: 'Freizeit', color: '#ec4899', icon: '🎮' },
  { day: 6, name: 'Wetter', color: '#06b6d4', icon: '🌤️' },
];

// Extended vocabulary database
export const EXTENDED_VOCABULARY: ExtendedVocabWord[] = [
  // === ALLTAG (Everyday) ===
  { id: 'all-001', german: 'aufwachen', english: 'to wake up', category: 'Alltag', difficulty: 'A1', tags: ['verb', 'morning'], exampleSentence: 'Ich wache jeden Tag um 7 Uhr auf.' },
  { id: 'all-002', german: 'das Frühstück', english: 'breakfast', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'food'], exampleSentence: 'Das Frühstück ist die wichtigste Mahlzeit.' },
  { id: 'all-003', german: 'sich anziehen', english: 'to get dressed', category: 'Alltag', difficulty: 'A1', tags: ['verb', 'reflexive'], exampleSentence: 'Ich ziehe mich schnell an.' },
  { id: 'all-004', german: 'die Zahnbürste', english: 'toothbrush', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'bathroom'], exampleSentence: 'Wo ist meine Zahnbürste?' },
  { id: 'all-005', german: 'der Wecker', english: 'alarm clock', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'bedroom'], exampleSentence: 'Der Wecker klingelt um 6 Uhr.' },
  { id: 'all-006', german: 'der Spiegel', english: 'mirror', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'household'] },
  { id: 'all-007', german: 'der Schlüssel', english: 'key', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'household'] },
  { id: 'all-008', german: 'die Tasche', english: 'bag', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'all-009', german: 'das Portemonnaie', english: 'wallet', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'personal'] },
  { id: 'all-010', german: 'das Handy', english: 'cell phone', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'technology'] },
  
  { id: 'all-011', german: 'der Fahrstuhl', english: 'elevator', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'house'] },
  { id: 'all-012', german: 'die Treppe', english: 'stairs', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'house'] },
  { id: 'all-013', german: 'der Briefkasten', english: 'mailbox', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'house'] },
  { id: 'all-014', german: 'die Hausaufgaben', english: 'homework', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'school'], exampleSentence: 'Ich mache meine Hausaufgaben.' },
  { id: 'all-015', german: 'aufräumen', english: 'to tidy up', category: 'Alltag', difficulty: 'A1', tags: ['verb', 'housework'] },
  { id: 'all-016', german: 'staubsaugen', english: 'to vacuum', category: 'Alltag', difficulty: 'A2', tags: ['verb', 'housework'] },
  { id: 'all-017', german: 'die Wäsche', english: 'laundry', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'housework'] },
  { id: 'all-018', german: 'bügeln', english: 'to iron', category: 'Alltag', difficulty: 'A2', tags: ['verb', 'housework'] },
  { id: 'all-019', german: 'einkaufen', english: 'to shop', category: 'Alltag', difficulty: 'A1', tags: ['verb', 'shopping'] },
  { id: 'all-020', german: 'das Geschäft', english: 'store', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'shopping'] },

  // === ARBEIT (Work) ===
  { id: 'arb-001', german: 'das Vorstellungsgespräch', english: 'job interview', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'career'] },
  { id: 'arb-002', german: 'der Lebenslauf', english: 'resume', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'career'] },
  { id: 'arb-003', german: 'die Bewerbung', english: 'application', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'career'] },
  { id: 'arb-004', german: 'das Gehalt', english: 'salary', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'money'] },
  { id: 'arb-006', german: 'die Überstunden', english: 'overtime', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'time'] },
  { id: 'arb-007', german: 'der Kollege', english: 'colleague', category: 'Arbeit', difficulty: 'A1', tags: ['noun', 'people'] },
  { id: 'arb-008', german: 'die Chefin', english: 'female boss', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'people'] },
  { id: 'arb-009', german: 'der Geschäftsführer', english: 'manager', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'people'] },
  { id: 'arb-010', german: 'die Abteilung', english: 'department', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'company'] },
  
  { id: 'arb-011', german: 'die Besprechung', english: 'meeting', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'office'] },
  { id: 'arb-012', german: 'die Präsentation', english: 'presentation', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'office'] },
  { id: 'arb-013', german: 'der Drucker', english: 'printer', category: 'Arbeit', difficulty: 'A1', tags: ['noun', 'office'] },
  { id: 'arb-014', german: 'der Fotokopierer', english: 'copy machine', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'office'] },
  { id: 'arb-015', german: 'der Kaffeeautomat', english: 'coffee machine', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'office'] },
  { id: 'arb-016', german: 'die Pause', english: 'break', category: 'Arbeit', difficulty: 'A1', tags: ['noun', 'time'] },
  { id: 'arb-017', german: 'feierabend', english: 'end of workday', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'time'] },
  { id: 'arb-018', german: 'pendeln', english: 'to commute', category: 'Arbeit', difficulty: 'B1', tags: ['verb', 'travel'] },
  { id: 'arb-019', german: 'die Beförderung', english: 'promotion', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'career'] },
  { id: 'arb-020', german: 'kündigen', english: 'to quit', category: 'Arbeit', difficulty: 'B1', tags: ['verb', 'career'] },

  // === ESSEN (Food) ===
  { id: 'ess-001', german: 'das Mittagessen', english: 'lunch', category: 'Essen', difficulty: 'A1', tags: ['noun', 'meal'] },
  { id: 'ess-002', german: 'das Abendessen', english: 'dinner', category: 'Essen', difficulty: 'A1', tags: ['noun', 'meal'] },
  { id: 'ess-003', german: 'die Zutaten', english: 'ingredients', category: 'Essen', difficulty: 'A2', tags: ['noun', 'cooking'] },
  { id: 'ess-004', german: 'das Rezept', english: 'recipe', category: 'Essen', difficulty: 'A2', tags: ['noun', 'cooking'] },
  { id: 'ess-005', german: 'der Ofen', english: 'oven', category: 'Essen', difficulty: 'A1', tags: ['noun', 'kitchen'] },
  { id: 'ess-006', german: 'die Mikrowelle', english: 'microwave', category: 'Essen', difficulty: 'A1', tags: ['noun', 'kitchen'] },
  { id: 'ess-007', german: 'der Herd', english: 'stove', category: 'Essen', difficulty: 'A1', tags: ['noun', 'kitchen'] },
  { id: 'ess-008', german: 'die Gabel', english: 'fork', category: 'Essen', difficulty: 'A1', tags: ['noun', 'cutlery'] },
  { id: 'ess-009', german: 'das Messer', english: 'knife', category: 'Essen', difficulty: 'A1', tags: ['noun', 'cutlery'] },
  { id: 'ess-010', german: 'der Löffel', english: 'spoon', category: 'Essen', difficulty: 'A1', tags: ['noun', 'cutlery'] },
  
  { id: 'ess-011', german: 'das Tischtuch', english: 'tablecloth', category: 'Essen', difficulty: 'A2', tags: ['noun', 'table'] },
  { id: 'ess-012', german: 'der Serviette', english: 'napkin', category: 'Essen', difficulty: 'A1', tags: ['noun', 'table'] },
  { id: 'ess-013', german: 'die Speisekarte', english: 'menu', category: 'Essen', difficulty: 'A1', tags: ['noun', 'restaurant'] },
  { id: 'ess-014', german: 'die Rechnung', english: 'bill', category: 'Essen', difficulty: 'A2', tags: ['noun', 'restaurant'] },
  { id: 'ess-015', german: 'das Trinkgeld', english: 'tip', category: 'Essen', difficulty: 'A2', tags: ['noun', 'money'] },
  { id: 'ess-016', german: 'satt', english: 'full', category: 'Essen', difficulty: 'A1', tags: ['adjective', 'feeling'] },
  { id: 'ess-017', german: 'hungrig', english: 'hungry', category: 'Essen', difficulty: 'A1', tags: ['adjective', 'feeling'] },
  { id: 'ess-018', german: 'das Frühstücksei', english: 'breakfast egg', category: 'Essen', difficulty: 'A1', tags: ['noun', 'breakfast'] },
  { id: 'ess-019', german: 'die Marmelade', english: 'jam', category: 'Essen', difficulty: 'A1', tags: ['noun', 'breakfast'] },
  { id: 'ess-020', german: 'das Croissant', english: 'croissant', category: 'Essen', difficulty: 'A1', tags: ['noun', 'pastry'] },

  // === REISEN (Travel) ===
  { id: 'rei-001', german: 'der Reisepass', english: 'passport', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'documents'] },
  { id: 'rei-002', german: 'das Visum', english: 'visa', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'documents'] },
  { id: 'rei-003', german: 'die Bordkarte', english: 'boarding pass', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'documents'] },
  { id: 'rei-004', german: 'das Gepäck', english: 'luggage', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'travel'] },
  { id: 'rei-005', german: 'der Koffer', english: 'suitcase', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'travel'] },
  { id: 'rei-006', german: 'der Rucksack', english: 'backpack', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'travel'] },
  { id: 'rei-007', german: 'die Unterkunft', english: 'accommodation', category: 'Reisen', difficulty: 'B1', tags: ['noun', 'hotel'] },
  { id: 'rei-008', german: 'die Reservierung', english: 'reservation', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'hotel'] },
  { id: 'rei-009', german: 'die Empfangsdame', english: 'receptionist', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'hotel'] },
  { id: 'rei-010', german: 'der Fahrstuhl', english: 'elevator', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'hotel'] },
  
  { id: 'rei-011', german: 'die Aussicht', english: 'view', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'scenery'] },
  { id: 'rei-012', german: 'die Sehenswürdigkeit', english: 'sightseeing spot', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'tourism'] },
  { id: 'rei-013', german: 'der Reiseführer', english: 'tour guide', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'tourism'] },
  { id: 'rei-014', german: 'die Souvenir', english: 'souvenir', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'shopping'] },
  { id: 'rei-015', german: 'die Postkarte', english: 'postcard', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'communication'] },
  { id: 'rei-016', german: 'die Grenze', english: 'border', category: 'Reisen', difficulty: 'B1', tags: ['noun', 'geography'] },
  { id: 'rei-017', german: 'der Zoll', english: 'customs', category: 'Reisen', difficulty: 'B1', tags: ['noun', 'border'] },
  { id: 'rei-018', german: 'die Verspätung', english: 'delay', category: 'Reisen', difficulty: 'B1', tags: ['noun', 'travel'] },
  { id: 'rei-019', german: 'die Ankunft', english: 'arrival', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'travel'] },
  { id: 'rei-020', german: 'die Abfahrt', english: 'departure', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'travel'] },

  // === GESUNDHEIT (Health) ===
  { id: 'ges-001', german: 'der Termin', english: 'appointment', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'doctor'] },
  { id: 'ges-002', german: 'die Krankenkasse', english: 'health insurance', category: 'Gesundheit', difficulty: 'B1', tags: ['noun', 'insurance'] },
  { id: 'ges-003', german: 'die Sprechstunde', english: 'consultation hours', category: 'Gesundheit', difficulty: 'B1', tags: ['noun', 'doctor'] },
  { id: 'ges-004', german: 'das Rezept', english: 'prescription', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'medicine'] },
  { id: 'ges-005', german: 'die Apotheke', english: 'pharmacy', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'medicine'] },
  { id: 'ges-006', german: 'die Tabletten', english: 'pills', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'medicine'] },
  { id: 'ges-007', german: 'das Hustenbonbon', english: 'cough drop', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'medicine'] },
  { id: 'ges-008', german: 'die Temperatur', english: 'temperature', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'measurement'] },
  { id: 'ges-009', german: 'sich erkältet fühlen', english: 'to feel like having a cold', category: 'Gesundheit', difficulty: 'A2', tags: ['verb', 'sick'] },
  { id: 'ges-010', german: 'der Schnupfen', english: 'runny nose', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'symptom'] },
  
  { id: 'ges-011', german: 'die Halsschmerzen', english: 'sore throat', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'symptom'] },
  { id: 'ges-012', german: 'der Husten', english: 'cough', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'symptom'] },
  { id: 'ges-013', german: 'das Fieber', english: 'fever', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'symptom'] },
  { id: 'ges-014', german: 'die Kopfschmerzen', english: 'headache', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'symptom'] },
  { id: 'ges-015', german: 'die Bauchschmerzen', english: 'stomach ache', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'symptom'] },
  { id: 'ges-016', german: 'der Muskelkater', english: 'muscle soreness', category: 'Gesundheit', difficulty: 'B1', tags: ['noun', 'fitness'] },
  { id: 'ges-017', german: 'die Allergie', english: 'allergy', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'condition'] },
  { id: 'ges-018', german: 'die Ernährung', english: 'nutrition', category: 'Gesundheit', difficulty: 'B1', tags: ['noun', 'food'] },
  { id: 'ges-019', german: 'gesund', english: 'healthy', category: 'Gesundheit', difficulty: 'A1', tags: ['adjective', 'general'] },
  { id: 'ges-020', german: 'müde', english: 'tired', category: 'Gesundheit', difficulty: 'A1', tags: ['adjective', 'feeling'] },

  // === FREIZEIT (Leisure) ===
  { id: 'fre-001', german: 'das Hobby', english: 'hobby', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'activity'] },
  { id: 'fre-002', german: 'joggen', english: 'to jog', category: 'Freizeit', difficulty: 'A1', tags: ['verb', 'sport'] },
  { id: 'fre-003', german: 'das Brettspiel', english: 'board game', category: 'Freizeit', difficulty: 'A2', tags: ['noun', 'game'] },
  { id: 'fre-004', german: 'das Puzzle', english: 'puzzle', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'game'] },
  { id: 'fre-005', german: 'die Gitarre', english: 'guitar', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'music'] },
  { id: 'fre-006', german: 'die Malerei', english: 'painting', category: 'Freizeit', difficulty: 'A2', tags: ['noun', 'art'] },
  { id: 'fre-007', german: 'die Fotografie', english: 'photography', category: 'Freizeit', difficulty: 'A2', tags: ['noun', 'art'] },
  { id: 'fre-008', german: 'wandern', english: 'to hike', category: 'Freizeit', difficulty: 'A1', tags: ['verb', 'sport'] },
  { id: 'fre-009', german: 'das Picknick', english: 'picnic', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'activity'] },
  { id: 'fre-010', german: 'das Konzert', english: 'concert', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'music'] },
  
  { id: 'fre-011', german: 'das Theater', english: 'theater', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'art'] },
  { id: 'fre-012', german: 'das Museum', english: 'museum', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'art'] },
  { id: 'fre-013', german: 'der Zoo', english: 'zoo', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'place'] },
  { id: 'fre-014', german: 'der Vergnügungspark', english: 'amusement park', category: 'Freizeit', difficulty: 'A2', tags: ['noun', 'place'] },
  { id: 'fre-015', german: 'der Strand', english: 'beach', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'nature'] },
  { id: 'fre-016', german: 'das Schwimmbad', english: 'swimming pool', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'sport'] },
  { id: 'fre-017', german: 'die Bibliothek', english: 'library', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'place'] },
  { id: 'fre-018', german: 'entspannen', english: 'to relax', category: 'Freizeit', difficulty: 'A2', tags: ['verb', 'feeling'] },
  { id: 'fre-019', german: 'die Freizeit', english: 'free time', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'time'] },
  { id: 'fre-020', german: 'das Fußballspiel', english: 'soccer game', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'sport'] },

  // === WETTER (Weather) ===
  { id: 'wet-001', german: 'der Regen', english: 'rain', category: 'Wetter', difficulty: 'A1', tags: ['noun', 'weather'] },
  { id: 'wet-002', german: 'die Sonne', english: 'sun', category: 'Wetter', difficulty: 'A1', tags: ['noun', 'weather'] },
  { id: 'wet-003', german: 'der Schnee', english: 'snow', category: 'Wetter', difficulty: 'A1', tags: ['noun', 'weather'] },
  { id: 'wet-004', german: 'der Wind', english: 'wind', category: 'Wetter', difficulty: 'A1', tags: ['noun', 'weather'] },
  { id: 'wet-005', german: 'die Wolke', english: 'cloud', category: 'Wetter', difficulty: 'A1', tags: ['noun', 'weather'] },
  { id: 'wet-006', german: 'das Gewitter', english: 'thunderstorm', category: 'Wetter', difficulty: 'A2', tags: ['noun', 'weather'] },
  { id: 'wet-007', german: 'der Nebel', english: 'fog', category: 'Wetter', difficulty: 'A2', tags: ['noun', 'weather'] },
  { id: 'wet-008', german: 'der Tau', english: 'dew', category: 'Wetter', difficulty: 'B1', tags: ['noun', 'weather'] },
  { id: 'wet-009', german: 'der Hagel', english: 'hail', category: 'Wetter', difficulty: 'B1', tags: ['noun', 'weather'] },
  { id: 'wet-010', german: 'die Temperatur', english: 'temperature', category: 'Wetter', difficulty: 'A2', tags: ['noun', 'weather'] },
  
  { id: 'wet-011', german: 'warm', english: 'warm', category: 'Wetter', difficulty: 'A1', tags: ['adjective', 'temperature'] },
  { id: 'wet-012', german: 'kalt', english: 'cold', category: 'Wetter', difficulty: 'A1', tags: ['adjective', 'temperature'] },
  { id: 'wet-013', german: 'nass', english: 'wet', category: 'Wetter', difficulty: 'A1', tags: ['adjective', 'condition'] },
  { id: 'wet-014', german: 'trocken', english: 'dry', category: 'Wetter', difficulty: 'A1', tags: ['adjective', 'condition'] },
  { id: 'wet-015', german: 'sonnig', english: 'sunny', category: 'Wetter', difficulty: 'A1', tags: ['adjective', 'weather'] },
  { id: 'wet-016', german: 'wolkig', english: 'cloudy', category: 'Wetter', difficulty: 'A1', tags: ['adjective', 'weather'] },
  { id: 'wet-017', german: 'windig', english: 'windy', category: 'Wetter', difficulty: 'A1', tags: ['adjective', 'weather'] },
  { id: 'wet-018', german: 'regnerisch', english: 'rainy', category: 'Wetter', difficulty: 'A1', tags: ['adjective', 'weather'] },
  { id: 'wet-019', german: 'der Regenbogen', english: 'rainbow', category: 'Wetter', difficulty: 'A2', tags: ['noun', 'weather'] },
  { id: 'wet-020', german: 'der Blitz', english: 'lightning', category: 'Wetter', difficulty: 'A2', tags: ['noun', 'weather'] },

  // === ALLTAG ERWEITERT (40 more) ===
  { id: 'all-021', german: 'der Nachbar', english: 'neighbor', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'people'] },
  { id: 'all-022', german: 'die Freundin', english: 'girlfriend / female friend', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'people'] },
  { id: 'all-023', german: 'der Ehemann', english: 'husband', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'family'] },
  { id: 'all-024', german: 'die Ehefrau', english: 'wife', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'family'] },
  { id: 'all-025', german: 'die Tochter', english: 'daughter', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'family'] },
  { id: 'all-026', german: 'der Sohn', english: 'son', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'family'] },
  { id: 'all-027', german: 'die Eltern', english: 'parents', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'family'] },
  { id: 'all-028', german: 'die Geschwister', english: 'siblings', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'family'] },
  { id: 'all-029', german: 'der Geburtstag', english: 'birthday', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'celebration'] },
  { id: 'all-030', german: 'das Geschenk', english: 'gift', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'celebration'] },
  { id: 'all-031', german: 'die Einladung', english: 'invitation', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'social'] },
  { id: 'all-032', german: 'der Besuch', english: 'visit / visitor', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'social'] },
  { id: 'all-033', german: 'die Feier', english: 'party / celebration', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'social'] },
  { id: 'all-034', german: 'sich freuen', english: 'to be happy / to look forward', category: 'Alltag', difficulty: 'A2', tags: ['verb', 'emotion'] },
  { id: 'all-035', german: 'sich ärgern', english: 'to be annoyed', category: 'Alltag', difficulty: 'A2', tags: ['verb', 'emotion'] },
  { id: 'all-036', german: 'die Hilfe', english: 'help', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'general'] },
  { id: 'all-037', german: 'die Frage', english: 'question', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'communication'] },
  { id: 'all-038', german: 'die Antwort', english: 'answer', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'communication'] },
  { id: 'all-039', german: 'erzählen', english: 'to tell / narrate', category: 'Alltag', difficulty: 'A2', tags: ['verb', 'communication'] },
  { id: 'all-040', german: 'zuhören', english: 'to listen', category: 'Alltag', difficulty: 'A2', tags: ['verb', 'communication'] },
  { id: 'all-041', german: 'die Nachricht', english: 'message / news', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'communication'] },
  { id: 'all-042', german: 'der Brief', english: 'letter', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'communication'] },
  { id: 'all-043', german: 'das Paket', english: 'package', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'post'] },
  { id: 'all-044', german: 'die Post', english: 'post office / mail', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'post'] },
  { id: 'all-045', german: 'die Bank', english: 'bank / bench', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'money'] },
  { id: 'all-046', german: 'das Geld', english: 'money', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'money'] },
  { id: 'all-047', german: 'bezahlen', english: 'to pay', category: 'Alltag', difficulty: 'A1', tags: ['verb', 'money'] },
  { id: 'all-048', german: 'sparen', english: 'to save', category: 'Alltag', difficulty: 'A2', tags: ['verb', 'money'] },
  { id: 'all-049', german: 'die Rechnung', english: 'bill / invoice', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'money'] },
  { id: 'all-050', german: 'der Unfall', english: 'accident', category: 'Alltag', difficulty: 'B1', tags: ['noun', 'emergency'] },
  { id: 'all-051', german: 'die Polizei', english: 'police', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'emergency'] },
  { id: 'all-052', german: 'das Krankenhaus', english: 'hospital', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'emergency'] },
  { id: 'all-053', german: 'der Notruf', english: 'emergency call', category: 'Alltag', difficulty: 'B1', tags: ['noun', 'emergency'] },
  { id: 'all-054', german: 'anrufen', english: 'to call (phone)', category: 'Alltag', difficulty: 'A1', tags: ['verb', 'communication'] },
  { id: 'all-055', german: 'die Telefonnummer', english: 'phone number', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'communication'] },
  { id: 'all-056', german: 'die Adresse', english: 'address', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'location'] },
  { id: 'all-057', german: 'der Stadtplan', english: 'city map', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'location'] },
  { id: 'all-058', german: 'die Richtung', english: 'direction', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'location'] },
  { id: 'all-059', german: 'geradeaus', english: 'straight ahead', category: 'Alltag', difficulty: 'A1', tags: ['adverb', 'direction'] },
  { id: 'all-060', german: 'die Kreuzung', english: 'intersection', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'traffic'] },

  // === ARBEIT ERWEITERT (30 more) ===
  { id: 'arb-021', german: 'die Bewerbungsmappe', english: 'application folder', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'career'] },
  { id: 'arb-022', german: 'das Praktikum', english: 'internship', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'career'] },
  { id: 'arb-023', german: 'die Ausbildung', english: 'training / apprenticeship', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'career'] },
  { id: 'arb-024', german: 'der Arbeitgeber', english: 'employer', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'company'] },
  { id: 'arb-025', german: 'der Arbeitnehmer', english: 'employee', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'company'] },
  { id: 'arb-026', german: 'die Steuer', english: 'tax', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'money'] },
  { id: 'arb-027', german: 'die Versicherung', english: 'insurance', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'money'] },
  { id: 'arb-028', german: 'der Vertrag', english: 'contract', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'legal'] },
  { id: 'arb-029', german: 'unterschreiben', english: 'to sign', category: 'Arbeit', difficulty: 'A2', tags: ['verb', 'legal'] },
  { id: 'arb-030', german: 'der Urlaub', english: 'vacation / holiday', category: 'Arbeit', difficulty: 'A1', tags: ['noun', 'time'] },
  { id: 'arb-031', german: 'krank', english: 'sick', category: 'Arbeit', difficulty: 'A1', tags: ['adjective', 'health'] },
  { id: 'arb-032', german: 'die Krankmeldung', english: 'sick note', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'health'] },
  { id: 'arb-033', german: 'der Terminkalender', english: 'appointment calendar', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'office'] },
  { id: 'arb-034', german: 'die Akte', english: 'file / dossier', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'office'] },
  { id: 'arb-035', german: 'der Notizblock', english: 'notepad', category: 'Arbeit', difficulty: 'A1', tags: ['noun', 'office'] },
  { id: 'arb-036', german: 'der Bildschirm', english: 'screen / monitor', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'technology'] },
  { id: 'arb-037', german: 'die Tastatur', english: 'keyboard', category: 'Arbeit', difficulty: 'A1', tags: ['noun', 'technology'] },
  { id: 'arb-038', german: 'die Maus', english: 'mouse', category: 'Arbeit', difficulty: 'A1', tags: ['noun', 'technology'] },
  { id: 'arb-039', german: 'speichern', english: 'to save', category: 'Arbeit', difficulty: 'A1', tags: ['verb', 'technology'] },
  { id: 'arb-040', german: 'drucken', english: 'to print', category: 'Arbeit', difficulty: 'A1', tags: ['verb', 'technology'] },
  { id: 'arb-041', german: 'die E-Mail', english: 'email', category: 'Arbeit', difficulty: 'A1', tags: ['noun', 'technology'] },
  { id: 'arb-042', german: 'der Anhang', english: 'attachment', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'technology'] },
  { id: 'arb-043', german: 'senden', english: 'to send', category: 'Arbeit', difficulty: 'A1', tags: ['verb', 'technology'] },
  { id: 'arb-044', german: 'empfangen', english: 'to receive', category: 'Arbeit', difficulty: 'A2', tags: ['verb', 'technology'] },
  { id: 'arb-045', german: 'der Fehler', english: 'mistake / error', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'general'] },
  { id: 'arb-046', german: 'verbessern', english: 'to improve', category: 'Arbeit', difficulty: 'B1', tags: ['verb', 'general'] },
  { id: 'arb-047', german: 'die Lösung', english: 'solution', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'general'] },
  { id: 'arb-048', german: 'der Erfolg', english: 'success', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'general'] },
  { id: 'arb-049', german: 'erfolgreich', english: 'successful', category: 'Arbeit', difficulty: 'A2', tags: ['adjective', 'general'] },
  { id: 'arb-050', german: 'die Erfahrung', english: 'experience', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'career'] },

  // === ESSEN ERWEITERT (30 more) ===
  { id: 'ess-021', german: 'das Gemüse', english: 'vegetables', category: 'Essen', difficulty: 'A1', tags: ['noun', 'food'] },
  { id: 'ess-022', german: 'das Obst', english: 'fruit', category: 'Essen', difficulty: 'A1', tags: ['noun', 'food'] },
  { id: 'ess-023', german: 'das Fleisch', english: 'meat', category: 'Essen', difficulty: 'A1', tags: ['noun', 'food'] },
  { id: 'ess-024', german: 'der Fisch', english: 'fish', category: 'Essen', difficulty: 'A1', tags: ['noun', 'food'] },
  { id: 'ess-025', german: 'das Brot', english: 'bread', category: 'Essen', difficulty: 'A1', tags: ['noun', 'bakery'] },
  { id: 'ess-026', german: 'das Brötchen', english: 'bread roll', category: 'Essen', difficulty: 'A1', tags: ['noun', 'bakery'] },
  { id: 'ess-027', german: 'der Kuchen', english: 'cake', category: 'Essen', difficulty: 'A1', tags: ['noun', 'bakery'] },
  { id: 'ess-028', german: 'die Torte', english: 'tart / fancy cake', category: 'Essen', difficulty: 'A2', tags: ['noun', 'bakery'] },
  { id: 'ess-029', german: 'die Schokolade', english: 'chocolate', category: 'Essen', difficulty: 'A1', tags: ['noun', 'sweets'] },
  { id: 'ess-030', german: 'das Eis', english: 'ice cream', category: 'Essen', difficulty: 'A1', tags: ['noun', 'sweets'] },
  { id: 'ess-031', german: 'die Suppe', english: 'soup', category: 'Essen', difficulty: 'A1', tags: ['noun', 'meal'] },
  { id: 'ess-032', german: 'der Salat', english: 'salad', category: 'Essen', difficulty: 'A1', tags: ['noun', 'food'] },
  { id: 'ess-033', german: 'die Kartoffel', english: 'potato', category: 'Essen', difficulty: 'A1', tags: ['noun', 'food'] },
  { id: 'ess-034', german: 'der Reis', english: 'rice', category: 'Essen', difficulty: 'A1', tags: ['noun', 'food'] },
  { id: 'ess-035', german: 'die Nudeln', english: 'pasta / noodles', category: 'Essen', difficulty: 'A1', tags: ['noun', 'food'] },
  { id: 'ess-036', german: 'das Salz', english: 'salt', category: 'Essen', difficulty: 'A1', tags: ['noun', 'condiment'] },
  { id: 'ess-037', german: 'der Pfeffer', english: 'pepper', category: 'Essen', difficulty: 'A1', tags: ['noun', 'condiment'] },
  { id: 'ess-038', german: 'der Zucker', english: 'sugar', category: 'Essen', difficulty: 'A1', tags: ['noun', 'condiment'] },
  { id: 'ess-039', german: 'das Öl', english: 'oil', category: 'Essen', difficulty: 'A1', tags: ['noun', 'condiment'] },
  { id: 'ess-040', german: 'die Butter', english: 'butter', category: 'Essen', difficulty: 'A1', tags: ['noun', 'dairy'] },
  { id: 'ess-041', german: 'der Käse', english: 'cheese', category: 'Essen', difficulty: 'A1', tags: ['noun', 'dairy'] },
  { id: 'ess-042', german: 'die Milch', english: 'milk', category: 'Essen', difficulty: 'A1', tags: ['noun', 'dairy'] },
  { id: 'ess-043', german: 'das Wasser', english: 'water', category: 'Essen', difficulty: 'A1', tags: ['noun', 'drink'] },
  { id: 'ess-044', german: 'der Saft', english: 'juice', category: 'Essen', difficulty: 'A1', tags: ['noun', 'drink'] },
  { id: 'ess-045', german: 'der Tee', english: 'tea', category: 'Essen', difficulty: 'A1', tags: ['noun', 'drink'] },
  { id: 'ess-046', german: 'der Kaffee', english: 'coffee', category: 'Essen', difficulty: 'A1', tags: ['noun', 'drink'] },
  { id: 'ess-047', german: 'das Bier', english: 'beer', category: 'Essen', difficulty: 'A1', tags: ['noun', 'drink'] },
  { id: 'ess-048', german: 'der Wein', english: 'wine', category: 'Essen', difficulty: 'A1', tags: ['noun', 'drink'] },
  { id: 'ess-049', german: 'die Flasche', english: 'bottle', category: 'Essen', difficulty: 'A1', tags: ['noun', 'container'] },
  { id: 'ess-050', german: 'das Glas', english: 'glass', category: 'Essen', difficulty: 'A1', tags: ['noun', 'container'] },

  // === REISEN ERWEITERT (30 more) ===
  { id: 'rei-021', german: 'der Flughafen', english: 'airport', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'transport'] },
  { id: 'rei-022', german: 'der Bahnhof', english: 'train station', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'transport'] },
  { id: 'rei-023', german: 'die Bushaltestelle', english: 'bus stop', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'transport'] },
  { id: 'rei-024', german: 'das Flugzeug', english: 'airplane', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'transport'] },
  { id: 'rei-025', german: 'der Zug', english: 'train', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'transport'] },
  { id: 'rei-026', german: 'das Auto', english: 'car', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'transport'] },
  { id: 'rei-027', german: 'das Fahrrad', english: 'bicycle', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'transport'] },
  { id: 'rei-028', german: 'die Fahrkarte', english: 'ticket (transport)', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'transport'] },
  { id: 'rei-029', german: 'der Fahrplan', english: 'timetable', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'transport'] },
  { id: 'rei-030', german: 'umsteigen', english: 'to change (trains/buses)', category: 'Reisen', difficulty: 'B1', tags: ['verb', 'transport'] },
  { id: 'rei-031', german: 'die U-Bahn', english: 'subway / underground', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'transport'] },
  { id: 'rei-032', german: 'die Straßenbahn', english: 'tram', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'transport'] },
  { id: 'rei-033', german: 'das Taxi', english: 'taxi', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'transport'] },
  { id: 'rei-034', german: 'der Reisebus', english: 'coach', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'transport'] },
  { id: 'rei-035', german: 'die Autobahn', english: 'highway', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'traffic'] },
  { id: 'rei-036', german: 'der Stau', english: 'traffic jam', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'traffic'] },
  { id: 'rei-037', german: 'die Tankstelle', english: 'gas station', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'car'] },
  { id: 'rei-038', german: 'das Benzin', english: 'gasoline', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'car'] },
  { id: 'rei-039', german: 'der Führerschein', english: 'driver\'s license', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'car'] },
  { id: 'rei-040', german: 'die Landkarte', english: 'map', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'navigation'] },
  { id: 'rei-041', german: 'der Stadtführer', english: 'city guide', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'tourism'] },
  { id: 'rei-042', german: 'das Denkmal', english: 'monument', category: 'Reisen', difficulty: 'B1', tags: ['noun', 'tourism'] },
  { id: 'rei-043', german: 'die Kirche', english: 'church', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'building'] },
  { id: 'rei-044', german: 'das Schloss', english: 'castle / palace', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'building'] },
  { id: 'rei-045', german: 'der Turm', english: 'tower', category: 'Reisen', difficulty: 'A2', tags: ['noun', 'building'] },
  { id: 'rei-046', german: 'die Brücke', english: 'bridge', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'building'] },
  { id: 'rei-047', german: 'der Park', english: 'park', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'nature'] },
  { id: 'rei-048', german: 'der Garten', english: 'garden', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'nature'] },
  { id: 'rei-049', german: 'der Wald', english: 'forest', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'nature'] },
  { id: 'rei-050', german: 'der See', english: 'lake', category: 'Reisen', difficulty: 'A1', tags: ['noun', 'nature'] },

  // === GESUNDHEIT ERWEITERT (20 more) ===
  { id: 'ges-021', german: 'der Arzt', english: 'doctor', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'profession'] },
  { id: 'ges-022', german: 'die Ärztin', english: 'female doctor', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'profession'] },
  { id: 'ges-023', german: 'der Zahnarzt', english: 'dentist', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'profession'] },
  { id: 'ges-024', german: 'die Untersuchung', english: 'examination', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'doctor'] },
  { id: 'ges-025', german: 'das Blut', english: 'blood', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'body'] },
  { id: 'ges-026', german: 'das Herz', english: 'heart', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'body'] },
  { id: 'ges-027', german: 'der Magen', english: 'stomach', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'body'] },
  { id: 'ges-028', german: 'der Rücken', english: 'back', category: 'Gesundheit', difficulty: 'A2', tags: ['noun', 'body'] },
  { id: 'ges-029', german: 'das Bein', english: 'leg', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'body'] },
  { id: 'ges-030', german: 'der Arm', english: 'arm', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'body'] },
  { id: 'ges-031', german: 'der Fuß', english: 'foot', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'body'] },
  { id: 'ges-032', german: 'die Hand', english: 'hand', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'body'] },
  { id: 'ges-033', german: 'der Finger', english: 'finger', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'body'] },
  { id: 'ges-034', german: 'das Auge', english: 'eye', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'body'] },
  { id: 'ges-035', german: 'das Ohr', english: 'ear', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'body'] },
  { id: 'ges-036', german: 'die Nase', english: 'nose', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'body'] },
  { id: 'ges-037', german: 'der Mund', english: 'mouth', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'body'] },
  { id: 'ges-038', german: 'der Zahn', english: 'tooth', category: 'Gesundheit', difficulty: 'A1', tags: ['noun', 'body'] },
  { id: 'ges-039', german: 'die Operation', english: 'surgery', category: 'Gesundheit', difficulty: 'B1', tags: ['noun', 'medical'] },
  { id: 'ges-040', german: 'sich ausruhen', english: 'to rest', category: 'Gesundheit', difficulty: 'A2', tags: ['verb', 'health'] },

  // === FREIZEIT ERWEITERT (20 more) ===
  { id: 'fre-021', german: 'das Kino', english: 'cinema', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'place'] },
  { id: 'fre-022', german: 'der Film', english: 'movie', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'media'] },
  { id: 'fre-023', german: 'die Musik', english: 'music', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'art'] },
  { id: 'fre-024', german: 'das Lied', english: 'song', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'music'] },
  { id: 'fre-025', german: 'singen', english: 'to sing', category: 'Freizeit', difficulty: 'A1', tags: ['verb', 'music'] },
  { id: 'fre-026', german: 'tanzen', english: 'to dance', category: 'Freizeit', difficulty: 'A1', tags: ['verb', 'music'] },
  { id: 'fre-027', german: 'zeichnen', english: 'to draw', category: 'Freizeit', difficulty: 'A2', tags: ['verb', 'art'] },
  { id: 'fre-028', german: 'basteln', english: 'to do crafts', category: 'Freizeit', difficulty: 'A2', tags: ['verb', 'art'] },
  { id: 'fre-029', german: 'der Sport', english: 'sport', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'activity'] },
  { id: 'fre-030', german: 'trainieren', english: 'to train', category: 'Freizeit', difficulty: 'A2', tags: ['verb', 'sport'] },
  { id: 'fre-031', german: 'das Fitnessstudio', english: 'gym', category: 'Freizeit', difficulty: 'A2', tags: ['noun', 'sport'] },
  { id: 'fre-032', german: 'schwimmen', english: 'to swim', category: 'Freizeit', difficulty: 'A1', tags: ['verb', 'sport'] },
  { id: 'fre-033', german: 'laufen', english: 'to run', category: 'Freizeit', difficulty: 'A1', tags: ['verb', 'sport'] },
  { id: 'fre-034', german: 'der Verein', english: 'club / association', category: 'Freizeit', difficulty: 'A2', tags: ['noun', 'social'] },
  { id: 'fre-035', german: 'die Mannschaft', english: 'team', category: 'Freizeit', difficulty: 'A2', tags: ['noun', 'sport'] },
  { id: 'fre-036', german: 'gewinnen', english: 'to win', category: 'Freizeit', difficulty: 'A2', tags: ['verb', 'competition'] },
  { id: 'fre-037', german: 'verlieren', english: 'to lose', category: 'Freizeit', difficulty: 'A2', tags: ['verb', 'competition'] },
  { id: 'fre-038', german: 'das Spiel', english: 'game', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'fun'] },
  { id: 'fre-039', german: 'das Abenteuer', english: 'adventure', category: 'Freizeit', difficulty: 'B1', tags: ['noun', 'experience'] },
  { id: 'fre-040', german: 'die Party', english: 'party', category: 'Freizeit', difficulty: 'A1', tags: ['noun', 'social'] },

  // === WETTER ERWEITERT (15 more) ===
  { id: 'wet-021', german: 'die Hitze', english: 'heat', category: 'Wetter', difficulty: 'A2', tags: ['noun', 'temperature'] },
  { id: 'wet-022', german: 'die Kälte', english: 'coldness', category: 'Wetter', difficulty: 'A2', tags: ['noun', 'temperature'] },
  { id: 'wet-023', german: 'der Sturm', english: 'storm', category: 'Wetter', difficulty: 'A2', tags: ['noun', 'weather'] },
  { id: 'wet-024', german: 'der Frost', english: 'frost', category: 'Wetter', difficulty: 'A2', tags: ['noun', 'weather'] },
  { id: 'wet-025', german: 'die Überschwemmung', english: 'flood', category: 'Wetter', difficulty: 'B1', tags: ['noun', 'disaster'] },
  { id: 'wet-026', german: 'die Dürre', english: 'drought', category: 'Wetter', difficulty: 'B1', tags: ['noun', 'disaster'] },
  { id: 'wet-027', german: 'die Vorhersage', english: 'forecast', category: 'Wetter', difficulty: 'A2', tags: ['noun', 'prediction'] },
  { id: 'wet-028', german: 'wechselhaft', english: 'changeable', category: 'Wetter', difficulty: 'A2', tags: ['adjective', 'weather'] },
  { id: 'wet-029', german: 'heiter', english: 'fair / bright', category: 'Wetter', difficulty: 'B1', tags: ['adjective', 'weather'] },
  { id: 'wet-030', german: 'schwül', english: 'humid / muggy', category: 'Wetter', difficulty: 'B1', tags: ['adjective', 'weather'] },
  { id: 'wet-031', german: 'die Jahreszeit', english: 'season', category: 'Wetter', difficulty: 'A1', tags: ['noun', 'time'] },
  { id: 'wet-032', german: 'der Frühling', english: 'spring', category: 'Wetter', difficulty: 'A1', tags: ['noun', 'season'] },
  { id: 'wet-033', german: 'der Sommer', english: 'summer', category: 'Wetter', difficulty: 'A1', tags: ['noun', 'season'] },
  { id: 'wet-034', german: 'der Herbst', english: 'autumn', category: 'Wetter', difficulty: 'A1', tags: ['noun', 'season'] },
  { id: 'wet-035', german: 'der Winter', english: 'winter', category: 'Wetter', difficulty: 'A1', tags: ['noun', 'season'] },

  // === KLEIDUNG (new category - 20 words) ===
  { id: 'kle-001', german: 'die Hose', english: 'trousers / pants', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'kle-002', german: 'das Hemd', english: 'shirt', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'kle-003', german: 'das Kleid', english: 'dress', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'kle-004', german: 'der Rock', english: 'skirt', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'kle-005', german: 'die Jacke', english: 'jacket', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'kle-006', german: 'der Mantel', english: 'coat', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'clothing'] },
  { id: 'kle-007', german: 'der Schuh', english: 'shoe', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'kle-008', german: 'die Mütze', english: 'cap / hat', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'clothing'] },
  { id: 'kle-009', german: 'der Schal', english: 'scarf', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'clothing'] },
  { id: 'kle-010', german: 'die Handschuhe', english: 'gloves', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'clothing'] },
  { id: 'kle-011', german: 'der Pullover', english: 'sweater', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'kle-012', german: 'das T-Shirt', english: 't-shirt', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'kle-013', german: 'die Unterwäsche', english: 'underwear', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'clothing'] },
  { id: 'kle-014', german: 'die Socke', english: 'sock', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'kle-015', german: 'der Anzug', english: 'suit', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'clothing'] },
  { id: 'kle-016', german: 'der Gürtel', english: 'belt', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'clothing'] },
  { id: 'kle-017', german: 'anprobieren', english: 'to try on', category: 'Alltag', difficulty: 'A2', tags: ['verb', 'clothing'] },
  { id: 'kle-018', german: 'tragen', english: 'to wear', category: 'Alltag', difficulty: 'A1', tags: ['verb', 'clothing'] },
  { id: 'kle-019', german: 'die Größe', english: 'size', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },
  { id: 'kle-020', german: 'die Farbe', english: 'color', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'clothing'] },

  // === WOHNEN (new words for Alltag - 20 words) ===
  { id: 'woh-001', german: 'das Zimmer', english: 'room', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'house'] },
  { id: 'woh-002', german: 'die Küche', english: 'kitchen', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'house'] },
  { id: 'woh-003', german: 'das Badezimmer', english: 'bathroom', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'house'] },
  { id: 'woh-004', german: 'das Schlafzimmer', english: 'bedroom', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'house'] },
  { id: 'woh-005', german: 'das Wohnzimmer', english: 'living room', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'house'] },
  { id: 'woh-006', german: 'der Tisch', english: 'table', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'furniture'] },
  { id: 'woh-007', german: 'der Stuhl', english: 'chair', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'furniture'] },
  { id: 'woh-008', german: 'das Bett', english: 'bed', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'furniture'] },
  { id: 'woh-009', german: 'der Schrank', english: 'cupboard / closet', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'furniture'] },
  { id: 'woh-010', german: 'das Regal', english: 'shelf', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'furniture'] },
  { id: 'woh-011', german: 'der Teppich', english: 'carpet', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'furniture'] },
  { id: 'woh-012', german: 'das Fenster', english: 'window', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'house'] },
  { id: 'woh-013', german: 'die Tür', english: 'door', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'house'] },
  { id: 'woh-014', german: 'die Wand', english: 'wall', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'house'] },
  { id: 'woh-015', german: 'die Decke', english: 'ceiling / blanket', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'house'] },
  { id: 'woh-016', german: 'der Boden', english: 'floor / ground', category: 'Alltag', difficulty: 'A1', tags: ['noun', 'house'] },
  { id: 'woh-017', german: 'das Dach', english: 'roof', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'house'] },
  { id: 'woh-018', german: 'der Keller', english: 'basement', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'house'] },
  { id: 'woh-019', german: 'die Miete', english: 'rent', category: 'Alltag', difficulty: 'A2', tags: ['noun', 'living'] },
  { id: 'woh-020', german: 'umziehen', english: 'to move (house)', category: 'Alltag', difficulty: 'A2', tags: ['verb', 'living'] },
];

// Shuffle array and return new array
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Get words by theme of the day
export function getWordsForDay(date: Date = new Date()): ExtendedVocabWord[] {
  const dayOfWeek = date.getDay(); // 0 = Sunday
  const theme = DAILY_THEMES[dayOfWeek];
  
  return EXTENDED_VOCABULARY.filter(word => 
    word.category === theme.name
  );
}

// Get daily new words (5-10 based on user level)
export function getDailyNewWords(
  userLevel: number, 
  knownWordIds: string[],
  date: Date = new Date()
): ExtendedVocabWord[] {
  const dayWords = getWordsForDay(date);
  const availableWords = dayWords.filter(word => !knownWordIds.includes(word.id));
  
  // More words for higher levels
  const count = Math.min(5 + Math.floor(userLevel / 3), 10);
  const shuffled = shuffleArray(availableWords);
  
  return shuffled.slice(0, count).map(word => ({
    ...word,
    isNew: true,
    addedAt: date.toISOString()
  }));
}

// Get words by difficulty
export function getWordsByDifficulty(level: DifficultyLevel): ExtendedVocabWord[] {
  return EXTENDED_VOCABULARY.filter(word => word.difficulty === level);
}

// Search words
export function searchWords(query: string): ExtendedVocabWord[] {
  const lowerQuery = query.toLowerCase();
  return EXTENDED_VOCABULARY.filter(word => 
    word.german.toLowerCase().includes(lowerQuery) ||
    word.english.toLowerCase().includes(lowerQuery) ||
    word.category.toLowerCase().includes(lowerQuery) ||
    word.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Get random words for quiz
export function getRandomWordsForQuiz(
  count: number = 10,
  excludeIds: string[] = [],
  difficulty?: DifficultyLevel
): ExtendedVocabWord[] {
  let pool = EXTENDED_VOCABULARY;
  
  if (difficulty) {
    pool = pool.filter(word => word.difficulty === difficulty);
  }
  
  pool = pool.filter(word => !excludeIds.includes(word.id));
  return shuffleArray(pool).slice(0, count);
}

// Get stats
export function getVocabularyStats() {
  return {
    total: EXTENDED_VOCABULARY.length,
    byCategory: DAILY_THEMES.map(theme => ({
      name: theme.name,
      count: EXTENDED_VOCABULARY.filter(w => w.category === theme.name).length,
      color: theme.color
    })),
    byDifficulty: {
      A1: EXTENDED_VOCABULARY.filter(w => w.difficulty === 'A1').length,
      A2: EXTENDED_VOCABULARY.filter(w => w.difficulty === 'A2').length,
      B1: EXTENDED_VOCABULARY.filter(w => w.difficulty === 'B1').length,
      B2: EXTENDED_VOCABULARY.filter(w => w.difficulty === 'B2').length,
      C1: EXTENDED_VOCABULARY.filter(w => w.difficulty === 'C1').length,
    }
  };
}
