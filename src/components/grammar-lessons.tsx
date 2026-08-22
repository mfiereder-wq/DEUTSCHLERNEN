'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GrammarLesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'A1' | 'A2' | 'B1';
  content: string;
  examples: { german: string; english: string }[];
  tips: string[];
}

const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'artikel',
    title: 'Artikel: der, die, das',
    description: 'Bestimmte und unbestimmte Artikel im Nominativ',
    difficulty: 'A1',
    content: 'Im Deutschen hat jedes Nomen einen Artikel. Es gibt drei bestimmte Artikel: **der** (maskulin), **die** (feminin) und **das** (neutral). Die unbestimmten Artikel sind **ein** (maskulin/neutral) und **eine** (feminin).\n\n**Faustregel:** Endet ein Wort auf -e, -heit, -keit, -ung → meist "die". Endet es auf -er, -or → meist "der". Endet es auf -chen, -lein → immer "das".',
    examples: [
      { german: 'der Mann / ein Mann', english: 'the man / a man' },
      { german: 'die Frau / eine Frau', english: 'the woman / a woman' },
      { german: 'das Kind / ein Kind', english: 'the child / a child' },
      { german: 'die Freiheit', english: 'freedom (ends in -heit)' },
      { german: 'das Mädchen', english: 'girl (ends in -chen)' },
    ],
    tips: ['Lerne Nomen immer mit Artikel!', 'Nutze Farben: Blau=der, Rot=die, Grün=das'],
  },
  {
    id: 'praesens',
    title: 'Präsens: Konjugation',
    description: 'Regelmäßige Verben im Präsens',
    difficulty: 'A1',
    content: 'Die meisten deutschen Verben werden regelmäßig konjugiert. Man entfernt die Endung **-en** und fügt die Personalendung hinzu.\n\n**Beispiel: lernen**\n• ich lern**e**\n• du lern**st**\n• er/sie/es lern**t**\n• wir lern**en**\n• ihr lern**t**\n• sie/Sie lern**en**',
    examples: [
      { german: 'Ich wohne in Berlin.', english: 'I live in Berlin.' },
      { german: 'Du sprichst gut Deutsch.', english: 'You speak German well.' },
      { german: 'Er arbeitet bei Siemens.', english: 'He works at Siemens.' },
      { german: 'Wir gehen ins Kino.', english: 'We are going to the cinema.' },
    ],
    tips: ['Die "du"-Form endet auf -st', 'Unregelmäßige Verben wie "sein" und "haben" muss man auswendig lernen'],
  },
  {
    id: 'perfekt',
    title: 'Perfekt: Vergangenheit',
    description: 'Die gesprochene Vergangenheit',
    difficulty: 'A2',
    content: 'Das Perfekt wird mit **haben** oder **sein** + Partizip II gebildet. Die meisten Verben nutzen **haben**. Verben der Bewegung oder Zustandsänderung nutzen **sein**.\n\n**Partizip II:** ge + Verbstamm + t (regelmäßig) oder ge + Verbstamm + en (unregelmäßig).',
    examples: [
      { german: 'Ich habe einen Film gesehen.', english: 'I have seen a movie.' },
      { german: 'Sie ist nach Berlin gefahren.', english: 'She went to Berlin.' },
      { german: 'Wir haben Pizza gegessen.', english: 'We ate pizza.' },
      { german: 'Er ist gestern angekommen.', english: 'He arrived yesterday.' },
    ],
    tips: ['"sein" + Bewegung: gehen, fahren, kommen, fliegen', '"haben" für die meisten anderen Verben', 'Das Partizip II steht am SATZENDE!'],
  },
  {
    id: 'modalverben',
    title: 'Modalverben',
    description: 'können, müssen, dürfen, wollen, sollen, möchten',
    difficulty: 'A2',
    content: 'Modalverben verändern die Bedeutung des Hauptverbs. Das Hauptverb steht im Infinitiv am Satzende. Die Modalverben haben im Singular oft einen Vokalwechsel.\n\n• **können** = can / to be able to\n• **müssen** = must / have to\n• **dürfen** = may / to be allowed to\n• **wollen** = to want\n• **sollen** = should / to be supposed to\n• **möchten** = would like',
    examples: [
      { german: 'Ich kann schwimmen.', english: 'I can swim.' },
      { german: 'Du musst zur Arbeit gehen.', english: 'You must go to work.' },
      { german: 'Hier darf man nicht rauchen.', english: 'You may not smoke here.' },
      { german: 'Ich möchte ein Wasser, bitte.', english: 'I would like a water, please.' },
    ],
    tips: ['Modalverb + Infinitiv am Ende', 'kann, muss, darf, will haben keinen Umlaut in ich/er-Form'],
  },
  {
    id: 'akkusativ',
    title: 'Akkusativ: Wen oder was?',
    description: 'Der vierte Fall im Deutschen',
    difficulty: 'A2',
    content: 'Der Akkusativ antwortet auf die Frage "Wen oder was?". Nur der maskuline Artikel ändert sich: **der → den**, **ein → einen**. Feminin, Neutral und Plural bleiben gleich.\n\nBestimmte Präpositionen verlangen immer Akkusativ: **durch, für, gegen, ohne, um**.',
    examples: [
      { german: 'Ich sehe den Mann.', english: 'I see the man.' },
      { german: 'Er kauft einen Tisch.', english: 'He buys a table.' },
      { german: 'Das Geschenk ist für die Mutter.', english: 'The gift is for the mother.' },
      { german: 'Wir fahren durch den Wald.', english: 'We drive through the forest.' },
    ],
    tips: ['NUR der maskuline Artikel ändert sich!', 'Präpositionen: durch, für, gegen, ohne, um → Akkusativ!'],
  },
  {
    id: 'konjunktiv',
    title: 'Konjunktiv II: Höflichkeit',
    description: 'Würde-Form und Höflichkeitsformen',
    difficulty: 'B1',
    content: 'Der Konjunktiv II wird für höfliche Bitten, Wünsche und irreale Situationen verwendet. Man bildet ihn mit **würde + Infinitiv** oder mit der speziellen Konjunktivform (z.B. hätte, wäre, könnte).\n\n**Höfliche Bitte:** Könnten Sie mir helfen? (statt: Können Sie mir helfen?)',
    examples: [
      { german: 'Ich würde gerne bezahlen.', english: 'I would like to pay.' },
      { german: 'Wenn ich Zeit hätte, würde ich kommen.', english: 'If I had time, I would come.' },
      { german: 'Könnten Sie das bitte wiederholen?', english: 'Could you please repeat that?' },
      { german: 'Das wäre super!', english: 'That would be great!' },
    ],
    tips: ['würde + Infinitiv ist die einfachste Form', 'hätte, wäre, könnte sind die wichtigsten Konjunktiv-Formen'],
  },
  {
    id: 'dativ',
    title: 'Dativ: Wem?',
    description: 'Der dritte Fall im Deutschen',
    difficulty: 'A2',
    content: 'Der Dativ antwortet auf die Frage **"Wem?"**. Alle Artikel ändern sich: der → **dem**, die → **der**, das → **dem**, die (Plural) → **den** (+n am Nomen). Ein → einem, eine → einer.\n\nPräpositionen mit Dativ: **aus, bei, mit, nach, seit, von, zu** (Merkhilfe: "aus bei mit nach seit von zu — Dativ ist im Nu!"). Bei **in, auf, an, über, unter, vor, hinter, neben, zwischen** gilt: Wo? → Dativ, Wohin? → Akkusativ.',
    examples: [
      { german: 'Ich gebe dem Mann das Buch.', english: 'I give the book to the man.' },
      { german: 'Er wohnt bei seinen Eltern.', english: 'He lives with his parents.' },
      { german: 'Wir fahren mit dem Zug.', english: 'We go by train.' },
      { german: 'Das Buch liegt auf dem Tisch.', english: 'The book is on the table. (Wo? → Dativ)' },
      { german: 'Ich lege das Buch auf den Tisch.', english: 'I put the book on the table. (Wohin? → Akkusativ)' },
    ],
    tips: ['Wechselpräpositionen: Wo? = Dativ, Wohin? = Akkusativ', 'Bei Plural-Dativ: Nomen + n (den Kindern, den Frauen)'],
  },
  {
    id: 'nebensaetze',
    title: 'Nebensätze: weil, dass, wenn, obwohl',
    description: 'Hauptsatz + Nebensatz Struktur',
    difficulty: 'B1',
    content: 'In einem Nebensatz steht das konjugierte Verb **am Ende**. Nebensätze werden mit Konjunktionen eingeleitet: **weil** (because), **dass** (that), **wenn** (if/when), **obwohl** (although), **damit** (so that), **als** (when — past, once).\n\n**Hauptsatz + Nebensatz:** Ich bleibe zu Hause, weil ich krank bin. Das Verb "bin" steht am ENDE!\n\n**Indirekte Fragesätze** (ob, wann, warum): Weißt du, wann der Zug kommt?',
    examples: [
      { german: 'Ich lerne Deutsch, weil ich in Berlin arbeiten möchte.', english: 'I learn German because I want to work in Berlin.' },
      { german: 'Ich denke, dass Deutsch eine schöne Sprache ist.', english: 'I think that German is a beautiful language.' },
      { german: 'Wenn ich Zeit habe, gehe ich spazieren.', english: 'When I have time, I go for a walk.' },
      { german: 'Er geht zur Arbeit, obwohl er krank ist.', english: 'He goes to work although he is sick.' },
    ],
    tips: ['Verb am ENDE im Nebensatz!', 'Nebensatz VOR Hauptsatz → Hauptsatz beginnt mit Verb: "Wenn ich Zeit habe, gehe ich..."', '"als" = einmalige Vergangenheit, "wenn" = wiederholt oder Gegenwart'],
  },
  {
    id: 'passiv',
    title: 'Passiv: Vorgangspassiv',
    description: 'Werden + Partizip II',
    difficulty: 'B1',
    content: 'Das Passiv beschreibt, was mit etwas passiert — nicht wer es tut. Es wird mit **werden + Partizip II** gebildet. Der Handelnde wird mit **von + Dativ** angeschlossen (optional).\n\n**Aktiv:** Der Mechaniker repariert das Auto.\n**Passiv:** Das Auto wird (von dem Mechaniker) repariert.\n\n**Perfekt Passiv:** Das Auto ist repariert **worden**. (worden, nicht geworden!)',
    examples: [
      { german: 'Das Haus wird gebaut.', english: 'The house is being built.' },
      { german: 'Die Tür wurde geschlossen.', english: 'The door was closed.' },
      { german: 'Hier wird Deutsch gesprochen.', english: 'German is spoken here.' },
      { german: 'Das Problem ist gelöst worden.', english: 'The problem was solved (has been solved).' },
    ],
    tips: ['Aktiv → Passiv: Objekt wird Subjekt, Verb wird werden + Partizip II', 'Perfekt Passiv = sein + Partizip II + worden (nicht geworden!)', 'Unpersönliches Passiv: "Es wird getanzt" = There is dancing'],
  },
  {
    id: 'trennbare-verben',
    title: 'Trennbare Verben',
    description: 'anrufen, aufstehen, einkaufen und Co.',
    difficulty: 'A2',
    content: 'Viele deutsche Verben haben eine Vorsilbe, die im Satz **abgetrennt** wird: **an**rufen → Ich rufe dich **an**. Die Vorsilbe steht am Satzende.\n\nHäufige Vorsilben: **ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-, zurück-**. Im Perfekt steht das **-ge-** zwischen Vorsilbe und Stamm: an**ge**rufen, auf**ge**standen.',
    examples: [
      { german: 'Ich stehe um 7 Uhr auf.', english: 'I get up at 7.' },
      { german: 'Ruf mich bitte an!', english: 'Please call me!' },
      { german: 'Er kauft im Supermarkt ein.', english: 'He shops at the supermarket.' },
      { german: 'Wir haben gestern ferngesehen.', english: 'We watched TV yesterday.' },
      { german: 'Hast du schon angerufen?', english: 'Have you called already?' },
    ],
    tips: ['Vorsilbe ans Satzende!', 'Nicht alle Verben mit Vorsilbe sind trennbar (z.B. verstehen, bekommen)', 'Perfekt: Vorsilbe + ge + Stamm: angerufen, aufgestanden'],
  },
  {
    id: 'komparativ',
    title: 'Komparativ & Superlativ',
    description: 'Steigerung von Adjektiven',
    difficulty: 'A2',
    content: 'Adjektive haben drei Steigerungsformen:\n• Positiv: schnell\n• Komparativ: schnell**er** (als)\n• Superlativ: **am** schnell**sten**\n\nKurze Adjektive (einsilbig) bekommen oft einen Umlaut: groß → größer, warm → wärmer, jung → jünger. Adjektive auf -d/-t/-s/-ß/-z bekommen im Superlativ -esten: heiß → am heißesten.',
    examples: [
      { german: 'Deutsch ist schwer, aber Mathematik ist schwerer.', english: 'German is hard, but math is harder.' },
      { german: 'Er läuft schneller als ich.', english: 'He runs faster than me.' },
      { german: 'Das ist das beste Restaurant der Stadt.', english: 'That is the best restaurant in town.' },
      { german: 'Sie ist am jüngsten.', english: 'She is the youngest.' },
    ],
    tips: ['Komparativ immer mit "als": größer als, schneller als', 'Superlativ: am + -sten (Adverb) oder der/die/das + -ste (Adjektiv vor Nomen)', 'gut → besser → am besten (unregelmäßig!)'],
  },
  {
    id: 'satzklammer',
    title: 'Satzklammer & Satzstellung',
    description: 'Verbzweitstellung und Klammerstruktur',
    difficulty: 'B1',
    content: 'Im deutschen Hauptsatz steht das konjugierte Verb immer an **Position 2**. Das Subjekt kann vor oder nach dem Verb stehen. Das zweite Verb (Infinitiv, Partizip II, trennbare Vorsilbe) steht am Satzende — das bildet die **Satzklammer**.\n\n**Grundstruktur:** Position 1 (Thema) + Verb + Subjekt + ... + Rest des Verbs am Ende.\n\n**Zeit vor Ort:** Ich bin **gestern** (Zeit) **nach Berlin** (Ort) gefahren.',
    examples: [
      { german: 'Ich möchte heute Abend ins Kino gehen.', english: 'I want to go to the cinema tonight. (Klammer: möchte...gehen)' },
      { german: 'Gestern bin ich nach München gefahren.', english: 'Yesterday I went to Munich. (Gestern = Position 1, bin = Verb 2)' },
      { german: 'Er hat mir das Buch gegeben.', english: 'He gave me the book. (Dativ vor Akkusativ: mir = Dativ, das Buch = Akkusativ)' },
      { german: 'Trotzdem werde ich morgen zur Arbeit gehen.', english: 'Nevertheless I will go to work tomorrow.' },
    ],
    tips: ['Verb immer an Position 2 im Hauptsatz', 'Infinitiv/Partizip am ENDE → Satzklammer', 'Reihenfolge: TEKAMOLO (temporal, kausal, modal, lokal) — aber flexibel'],
  },
];

export function GrammarLessons() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem('deutschlernen-grammar-done') || '[]'); } catch { return []; }
  });

  const markDone = (id: string) => {
    const next = completed.includes(id) ? completed : [...completed, id];
    setCompleted(next);
    localStorage.setItem('deutschlernen-grammar-done', JSON.stringify(next));
  };

  return (
    <div className="space-y-4">
      {GRAMMAR_LESSONS.map((lesson, i) => (
        <motion.div key={lesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Card className={completed.includes(lesson.id) ? 'border-emerald-200' : ''}>
            <CardHeader className="cursor-pointer pb-2" onClick={() => setExpandedId(expandedId === lesson.id ? null : lesson.id)}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-base">{lesson.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">{lesson.difficulty}</Badge>
                    {completed.includes(lesson.id) && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                  </div>
                  <CardDescription>{lesson.description}</CardDescription>
                </div>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${expandedId === lesson.id ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>

            <AnimatePresence>
              {expandedId === lesson.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <CardContent className="pt-0 space-y-4">
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line text-muted-foreground">{lesson.content}</div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1"><Lightbulb className="h-4 w-4 text-amber-500" />Beispiele</h4>
                      <div className="space-y-2">
                        {lesson.examples.map((ex, j) => (
                          <div key={j} className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg text-sm">
                            <span className="font-medium text-[#F26B5E] min-w-[40%]">{ex.german}</span>
                            <span className="text-muted-foreground">→ {ex.english}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {lesson.tips.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">💡 Tipps</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {lesson.tips.map((tip, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>{tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button variant="outline" size="sm" onClick={() => markDone(lesson.id)} className="w-full">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {completed.includes(lesson.id) ? 'Bereits gelernt ✓' : 'Als gelernt markieren'}
                    </Button>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default GrammarLessons;