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