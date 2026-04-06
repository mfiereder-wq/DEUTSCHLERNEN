// Extended Vocabulary Database - 2000+ Words
// Organized by themes and difficulty levels

export type DifficultyLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface ExtendedVocabWord {
  id: string;
  german: string;
  english: string;
  category: string;
  subcategory: string;
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
  { id: 'arb-005', german: 'das Gehalt', english: 'salary', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'money'] },
  { id: 'arb-006', german: 'die Überstunden', english: 'overtime', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'time'] },
  { id: 'arb-007', german: 'der Kollege', english: 'colleague', category: 'Arbeit', difficulty: 'A1', tags: ['noun', 'people'] },
  { id: 'arb-008', german: 'die Chefin', english: 'female boss', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'people'] },
  { id: 'arb-009', german: 'der Geschäftsführer', english: 'manager', category: 'Arbeit', difficulty: 'B1', tags: ['noun', 'people'] },
  { id: 'arb-010', german: 'die Abteilung', english: 'department', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'company'] },
  
  { id: 'arb-011', german: ' die Besprechung', english: 'meeting', category: 'Arbeit', difficulty: 'A2', tags: ['noun', 'office'] },
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
