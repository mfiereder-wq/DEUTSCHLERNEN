'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const imageUrl = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=82`;

const QUESTION_IMAGE_IDS: Record<string, string> = {
  'sent-a1-1': 'photo-1495475776255-0f3a2c2f8c8a',
  'sent-a1-2': 'photo-1539635278303-d4002c07eae3',
  'sent-a1-3': 'photo-1560969184-10fe8719e047',
  'sent-a1-4': 'photo-1543002588-bfa74002ed7e',
  'sent-a1-5': 'photo-1651008376811-b90baee60c1f',
  'sent-a1-6': 'photo-1489599849927-2ee91cede3ba',
  'sent-a1-7': 'photo-1498837167922-ddd27525d352',
  'sent-a1-8': 'photo-1516321318423-f06f85e504b3',
  'sent-a1-9': 'photo-1529156069898-49953e39b3ac',
  'sent-a1-10': 'photo-1467269204594-9661b134dd2b',
  'sent-a1-11': 'photo-1517841905240-472988babdf9',
  'sent-a1-12': 'photo-1579751626657-72bc17010498',
  'sent-a1-13': 'photo-1502877338535-766e1452684a',
  'sent-a1-14': 'photo-1511632765486-a01980e01a18',
  'sent-a1-15': 'photo-1521791136064-7986c2920216',
  'sent-a1-16': 'photo-1493666438817-866a91353ca9',
  'sent-a1-17': 'photo-1516979187457-637abb4f9353',
  'sent-a1-18': 'photo-1521587760476-6c12a4b040da',
  'sent-a1-19': 'photo-1554068865-24cecd4e34b8',
  'sent-a1-20': 'photo-1579952363873-27f3bade9f55',
  'sent-a2-21': 'photo-1517604931442-7e0c8ed2963c',
  'sent-a2-22': 'photo-1512820790803-83ca734da794',
  'sent-a2-23': 'photo-1499346030926-9a72daac6c63',
  'sent-a2-24': 'photo-1544620347-c4fd4a3d5957',
  'sent-a2-25': 'photo-1511895426328-dc8714191300',
  'sent-a2-26': 'photo-1548839140-29a749e1cf4d',
  'sent-a2-27': 'photo-1519677100203-a0e668c92439',
  'sent-a2-28': 'photo-1530549387789-4c1017266635',
  'sent-a2-29': 'photo-1556761175-b413da4baf72',
  'sent-a2-30': 'photo-1505693416388-ac5ce068fe85',
  'sent-a2-31': 'photo-1513159446162-54eb8bdaa79b',
  'sent-a2-32': 'photo-1512621776951-a57141f2eefd',
  'sent-a2-33': 'photo-1501139083538-0139583c060f',
  'sent-a2-34': 'photo-1490750967868-88aa4486c946',
  'sent-a2-35': 'photo-1500534623283-312aade485b7',
  'sent-a2-36': 'photo-1511379938547-c1f69419868d',
  'sent-a2-37': 'photo-1566073771259-6a8506099945',
  'sent-a2-38': 'photo-1491841550275-ad7854e35ca6',
  'sent-a2-39': 'photo-1495446815901-a7297e633e8d',
  'sent-a2-40': 'photo-1547592180-85f173990554',
  'sent-b1-41': 'photo-1517502884422-41eaead166d4',
  'sent-b1-42': 'photo-1484101403633-562f891dc89a',
  'sent-b1-43': 'photo-1434030216411-0b793f4b4173',
  'sent-b1-44': 'photo-1551836022-d5d88e9218df',
  'sent-b1-45': 'photo-1517245386807-bb43f82c33c4',
  'sent-b1-46': 'photo-1497366754035-f200968a6e72',
  'sent-b1-47': 'photo-1484480974693-6ca0a78fb36b',
  'sent-b1-48': 'photo-1565793298595-6a879b1d9492',
  'sent-b1-49': 'photo-1506784983877-45594efa4cbe',
  'sent-b1-50': 'photo-1512568400610-62da28bc8a13',
  'sent-b1-51': 'photo-1519692933481-e162a57d6721',
  'sent-b1-52': 'photo-1504711434969-e33886168f5c',
  'sent-b1-53': 'photo-1500648767791-00dcc994a43e',
  'sent-b1-54': 'photo-1561214115-f2f134cc4912',
  'sent-b1-55': 'photo-1471623432079-b009d30b6729',
  'sent-b1-56': 'photo-1495366691023-cc4eadcc2a7e',
  'sent-b1-57': 'photo-1519682337058-a94d519337bc',
  'sent-b1-58': 'photo-1485846234645-a62644f84728',
  'sent-b1-59': 'photo-1508214751196-bcfd4ca60f91',
  'sent-b1-60': 'photo-1541781774459-bb2af2f05b55',
  q1: 'photo-1555041469-a586c61ea9bc',
  q2: 'photo-1521737711867-e3b97375f902',
  q3: 'photo-1565299624946-b28f40a0ae38',
  q4: 'photo-1494526585095-c41746248156',
  q5: 'photo-1544717305-2782549b5136',
  q6: 'photo-1508057198894-247b23fe5ade',
  q7: 'photo-1532996122724-e3c354a0b15b',
  q8: 'photo-1531482615713-2afd69097998',
  q9: 'photo-1507003211169-0a1dd7228f2d',
  q10: 'photo-1473093295043-cdd812d0e601',
};

// Specific vocabulary is matched before broad topic labels so a word like
// "Buch" gets a book image even when its category is simply "Alltag".
const WORD_IMAGE_RULES: Array<[string[], string]> = [
  [['wecker', 'alarm clock', 'aufwachen', 'wake up', 'bett', 'bedroom'], 'photo-1505693416388-ac5ce068fe85'],
  [['tisch', 'table', 'stuhl', 'chair'], 'photo-1493666438817-866a91353ca9'],
  [['schlüssel', ' key', 'tasche', 'bag', 'portemonnaie', 'wallet', 'geldbörse'], 'photo-1512909006721-3d6018887383'],
  [['zahnbürste', 'toothbrush', 'zahn', 'tooth', 'zahnarzt', 'dentist', 'spiegel', 'mirror'], 'photo-1505751172876-fa1923c5c528'],
  [['kaffee', 'coffee', 'café', 'frühstück', 'croissant', 'brötchen'], 'photo-1495475776255-0f3a2c2f8c8a'],
  [['pizza', 'mittagessen', 'abendessen', 'restaurant', 'mahlzeit', 'rezept', 'recipe', 'zutaten', 'ingredients', 'gemüse', 'vegetables', 'obst', 'fruit', 'fleisch', 'meat', 'fisch', 'fish', 'brot', 'bread', 'kuchen', 'cake', 'suppe', 'soup', 'salat', 'salad', 'nudeln', 'pasta', 'hungrig', 'hunger'], 'photo-1504674900247-0877df9cc836'],
  [['wasser', 'saft', 'tee', 'milch', 'getränk', 'trinken'], 'photo-1548839140-29a749e1cf4d'],
  [['buch', 'lesen', 'bibliothek', 'hausaufgaben', 'schule', 'lernen', 'sprache', 'grammatik', 'prüfung', 'studieren'], 'photo-1456513080510-7bf3a84b82f8'],
  [['arzt', 'doctor', 'ärztin', 'physician', 'gesund', 'health', 'medizin', 'medicine', 'apotheke', 'pharmacy', 'krank', 'sick', 'krankenhaus', 'hospital', 'fieber', 'fever', 'husten', 'cough', 'schmerzen', 'pain', 'tabletten', 'pills'], 'photo-1505751172876-fa1923c5c528'],
  [['berlin'], 'photo-1560969184-10fe8719e047'],
  [['deutschland', 'münchen'], 'photo-1467269204594-9661b134dd2b'],
  [['flughafen', 'airport', 'flugzeug', 'airplane', 'boarding', 'reisepass', 'passport', 'koffer', 'suitcase', 'gepäck', 'luggage', 'rucksack', 'backpack', 'zug', 'train', 'bahn', 'bahnhof', 'bus', 'fahrkarte', 'ticket', 'taxi', 'fahrrad', 'bicycle', 'auto', 'car'], 'photo-1544620347-c4fd4a3d5957'],
  [['urlaub', 'vacation', 'hike', 'wandern', 'wald', 'forest', 'berg', 'mountain', 'natur', 'nature', 'park', 'spaziergang', 'spazieren', 'walk'], 'photo-1500534623283-312aade485b7'],
  [['hotel', 'unterkunft', 'accommodation', 'reservierung', 'reservation'], 'photo-1566073771259-6a8506099945'],
  [['schwimmen', 'schwimmbad', 'pool'], 'photo-1530549387789-4c1017266635'],
  [['musik', 'music', 'konzert', 'concert', 'gitarre', 'guitar', 'singen', 'sing', 'lied', 'song', 'tanzen', 'dance'], 'photo-1511379938547-c1f69419868d'],
  [['tennis'], 'photo-1554068865-24cecd4e34b8'],
  [['fußball', 'fußballspiel', 'soccer', 'football'], 'photo-1579952363873-27f3bade9f55'],
  [['regen', 'wetter', 'wolke', 'schnee', 'wind', 'gewitter', 'sonne', 'sonnig', 'winter', 'sommer'], 'photo-1519692933481-e162a57d6721'],
  [['besprechung', 'kollege', 'kollegin', 'präsentation', 'lebenslauf', 'bewerbung', 'gehalt', 'meeting'], 'photo-1497366754035-f200968a6e72'],
  [['handy', 'cell phone', 'mobile phone', 'telefon', 'phone', 'nachricht', 'message', 'e-mail', 'email', 'computer', 'bildschirm', 'screen', 'tastatur', 'keyboard'], 'photo-1516321318423-f06f85e504b3'],
  [['hose', 'hemd', 'kleid', 'jacke', 'mantel', 'schuh', 'pullover', 't-shirt', 'kleidung', 'anzug', 'anziehen', 'get dressed', 'socke', 'sock', 'schal', 'scarf', 'handschuh', 'glove', 'rock', 'skirt', 'shirt'], 'photo-1483985988355-763728e1935b'],
  [['familie', 'family', 'freund', 'friend', 'freundin', 'freunde', 'schwester', 'sister', 'bruder', 'brother', 'eltern', 'parents', 'geburtstag', 'birthday', 'party', 'feier', 'geschenk', 'gift'], 'photo-1529156069898-49953e39b3ac'],
  [['kino', 'cinema', 'film', 'movie', 'theater'], 'photo-1489599849927-2ee91cede3ba'],
  [['spiegel', 'mirror', 'briefkasten', 'mailbox', 'treppe', 'stairs', 'fahrstuhl', 'elevator', 'staubsauger', 'vacuum cleaner', 'wäsche', 'laundry'], 'photo-1484154218962-a197022b5858'],
  [['kunst', 'malerei', 'museum', 'fotografie'], 'photo-1561214115-f2f134cc4912'],
  [['wandern', 'hike', 'wald', 'forest', 'berg', 'mountain', 'natur', 'nature', 'park', 'spaziergang', 'spazieren', 'walk'], 'photo-1500534623283-312aade485b7'],
  [['wohnung', 'zimmer', 'küche', 'kitchen', 'badezimmer', 'bathroom', 'schlafzimmer', 'bedroom', 'wohnzimmer', 'living room', 'möbel', 'furniture', 'tisch', 'table', 'stuhl', 'chair', 'bett', 'bed', 'schrank', 'closet', 'fenster', 'window', 'tür', 'door', 'haus', 'house', 'wohnen', 'home', 'aufräumen', 'tidy up', 'staubsaugen', 'vacuum', 'wäsche', 'laundry', 'bügeln', 'iron', 'einkaufen', 'shop', 'geschäft', 'store'], 'photo-1484154218962-a197022b5858'],
];

const TOPIC_IMAGE_RULES: Array<[string[], string]> = [
  [['begrüßung', 'freundschaft', 'familie', 'kommunikation'], 'photo-1529156069898-49953e39b3ac'],
  [['essen', 'bestellung', 'restaurant'], 'photo-1504674900247-0877df9cc836'],
  [['wohnen', 'alltag', 'besitz'], 'photo-1484154218962-a197022b5858'],
  [['reisen', 'transport', 'herkunft'], 'photo-1500534623283-312aade485b7'],
  [['wetter'], 'photo-1519692933481-e162a57d6721'],
  [['sport'], 'photo-1579952363873-27f3bade9f55'],
  [['freizeit'], 'photo-1529156069898-49953e39b3ac'],
  [['gesundheit', 'berufe'], 'photo-1505751172876-fa1923c5c528'],
  [['arbeit', 'beruf'], 'photo-1497366754035-f200968a6e72'],
  [['grammatik', 'artikel', 'verben', 'modalverben', 'negation', 'adjektive', 'perfekt', 'vergangenheit', 'konjunktiv', 'fragen', 'wortschatz', 'sprache'], 'photo-1456513080510-7bf3a84b82f8'],
];

export function getStockImage(imageKey = '', context = ''): string {
  const normalized = context.toLocaleLowerCase('de');

  for (const [keywords, photoId] of WORD_IMAGE_RULES) {
    if (keywords.some(keyword => normalized.includes(keyword))) {
      return imageUrl(photoId);
    }
  }

  if (QUESTION_IMAGE_IDS[imageKey]) return imageUrl(QUESTION_IMAGE_IDS[imageKey]);

  for (const [topics, photoId] of TOPIC_IMAGE_RULES) {
    if (topics.some(topic => normalized.includes(topic))) {
      return imageUrl(photoId);
    }
  }

  return imageUrl('photo-1456513080510-7bf3a84b82f8');
}

export function ExerciseImage({
  imageKey,
  context,
  alt,
  className,
  imageClassName,
}: {
  imageKey?: string;
  context?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const src = getStockImage(imageKey, context);
  const fallbackSrc = imageUrl('photo-1456513080510-7bf3a84b82f8');
  const imageSrc = failedImage === src ? fallbackSrc : src;

  if (failedImage === fallbackSrc) return null;

  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-muted', className)}>
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onError={() => setFailedImage(imageSrc)}
        className={cn('h-full w-full object-cover', imageClassName)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}
