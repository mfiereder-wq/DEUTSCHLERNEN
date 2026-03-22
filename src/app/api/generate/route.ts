import { NextRequest, NextResponse } from 'next/server';

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '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';

// Fallback vocabulary when AI fails
const fallbackVocabulary = {
  A2: [
    { word: 'der Auftrag', article: 'der', translation: 'a ordem', wordType: 'noun', exampleSentence: { german: 'Ich habe einen Auftrag bekommen.', translation: 'Recebi uma ordem.' }},
    { word: 'die Ankunft', article: 'die', translation: 'a chegada', wordType: 'noun', exampleSentence: { german: 'Die Ankunft war pünktlich.', translation: 'A chegada foi pontual.' }},
    { word: 'begrüßen', translation: 'saudar', wordType: 'verb', exampleSentence: { german: 'Ich begrüße alle Gäste.', translation: 'Eu saúdo todos os convidados.' }},
    { word: 'die Entscheidung', article: 'die', translation: 'a decisão', wordType: 'noun', exampleSentence: { german: 'Das war eine schwierige Entscheidung.', translation: 'Foi uma decisão difícil.' }},
    { word: 'freundlich', translation: 'amigável', wordType: 'adjective', exampleSentence: { german: 'Er ist sehr freundlich.', translation: 'Ele é muito amigável.' }}
  ],
  B1: [
    { word: 'die Auswirkung', article: 'die', translation: 'o efeito', wordType: 'noun', exampleSentence: { german: 'Die Auswirkungen sind deutlich.', translation: 'Os efeitos são claros.' }},
    { word: 'beantragen', translation: 'solicitar', wordType: 'verb', exampleSentence: { german: 'Sie müssen ein Visum beantragen.', translation: 'Você precisa solicitar um visto.' }},
    { word: 'die Beschwerde', article: 'die', translation: 'a reclamação', wordType: 'noun', exampleSentence: { german: 'Ich habe eine Beschwerde.', translation: 'Tenho uma reclamação.' }},
    { word: 'erfolgreich', translation: 'bem-sucedido', wordType: 'adjective', exampleSentence: { german: 'Das Projekt war erfolgreich.', translation: 'O projeto foi bem-sucedido.' }},
    { word: 'die Gelegenheit', article: 'die', translation: 'a oportunidade', wordType: 'noun', exampleSentence: { german: 'Das ist eine gute Gelegenheit.', translation: 'Esta é uma boa oportunidade.' }}
  ]
};

const fallbackSentences = {
  A2: [
    { sentence: 'Ich ___ gestern im Kino gewesen.', translation: 'Eu estive no cinema ontem.', correct: 'war', options: ['war', 'bin', 'habe', 'wurde'], hint: 'Präteritum von "sein"', topic: 'Präteritum' },
    { sentence: 'Wir ___ heute einen Ausflug machen.', translation: 'Nós vamos fazer uma excursão hoje.', correct: 'wollen', options: ['wollen', 'können', 'müssen', 'dürfen'], hint: 'Modalverb für Wollen', topic: 'Modalverben' },
    { sentence: 'Er ___ jeden Tag zur Arbeit.', translation: 'Ele vai ao trabalho todos os dias.', correct: 'geht', options: ['geht', 'fahren', 'kommen', 'laufen'], hint: 'Bewegungsverb', topic: 'Verben' },
    { sentence: 'Das Buch liegt ___ dem Tisch.', translation: 'O livro está sobre a mesa.', correct: 'auf', options: ['auf', 'in', 'unter', 'neben'], hint: 'Präposition mit Dativ', topic: 'Präpositionen' },
    { sentence: 'Ich habe ___ Haus gekauft.', translation: 'Comprei uma casa.', correct: 'ein', options: ['ein', 'eine', 'einen', 'einer'], hint: 'Akkusativ Neutrum', topic: 'Artikel' }
  ],
  B1: [
    { sentence: 'Wenn ich mehr Zeit ___, würde ich reisen.', translation: 'Se eu tivesse mais tempo, viajaria.', correct: 'hätte', options: ['hätte', 'habe', 'hatte', 'haben'], hint: 'Konjunktiv II von "haben"', topic: 'Konjunktiv' },
    { sentence: 'Der Brief wurde ___ mir geschrieben.', translation: 'A carta foi escrita por mim.', correct: 'von', options: ['von', 'mit', 'bei', 'zu'], hint: 'Passiv mit Präposition', topic: 'Passiv' },
    { sentence: 'Ich freue mich ___ das Wochenende.', translation: 'Estou ansioso pelo fim de semana.', correct: 'auf', options: ['auf', 'über', 'für', 'mit'], hint: 'sich freuen auf + Akkusativ', topic: 'Präpositionen' },
    { sentence: 'Er hat gesagt, ___ er krank ist.', translation: 'Ele disse que está doente.', correct: 'dass', options: ['dass', 'das', 'ob', 'wenn'], hint: 'Nebensatz mit Konjunktion', topic: 'Nebensätze' },
    { sentence: 'Das ist der Mann, ___ ich gestern getroffen habe.', translation: 'Este é o homem que encontrei ontem.', correct: 'den', options: ['den', 'der', 'dem', 'dessen'], hint: 'Relativpronomen Akkusativ', topic: 'Relativsätze' }
  ]
};

// Fallback stories when AI fails
const fallbackStories = {
  A2: {
    title: 'Ein Tag im Park',
    category: 'alltag',
    text: `Es ist Sonntag. Das Wetter ist schön. Die Sonne scheint und es ist warm.

Peter geht in den Park. Er trifft seine Freunde. Sie spielen zusammen Fußball und lachen viel.

Später essen sie ein Eis. Peter nimmt Schokoladeneis. Sein Freund Lukas nimmt Vanilleeis.

Am Abend gehen sie nach Hause. Peter ist glücklich. Es war ein schöner Tag.`,
    translation: `É domingo. O tempo está bonito. O sol brilha e está quente.

Peter vai ao parque. Ele encontra seus amigos. Eles jogam futebol juntos e riem muito.

Mais tarde eles comem um sorvete. Peter pega sorvete de chocolate. Seu amigo Lukas pega sorvete de baunilha.

À noite eles vão para casa. Peter está feliz. Foi um dia bonito.`,
    questions: [
      { id: 'q1', question: 'Was macht Peter im Park?', options: ['Er liest ein Buch', 'Er trifft Freunde', 'Er schläft', 'Er arbeitet'], correctAnswer: 1 },
      { id: 'q2', question: 'Welches Eis nimmt Peter?', options: ['Vanille', 'Erdbeere', 'Schokolade', 'Stracciatella'], correctAnswer: 2 },
      { id: 'q3', question: 'Wie ist das Wetter?', options: ['Regnerisch', 'Kalt', 'Schön und warm', 'Windig'], correctAnswer: 2 }
    ]
  },
  B1: {
    title: 'Das Vorstellungsgespräch',
    category: 'beruf',
    text: `Lisa hat sich auf eine Stelle als Marketingassistentin beworben. Heute hat sie ihr Vorstellungsgespräch.

Sie hat sich gut vorbereitet. Sie hat Informationen über die Firma gesammelt und typische Fragen geübt.

Im Büro angekommen, wird sie von der Personalchefin empfangen. "Guten Tag, Frau Müller. Nehmen Sie bitte Platz."

Das Gespräch dauert etwa 30 Minuten. Lisa antwortet auf alle Fragen selbstbewusst und stellt auch eigene Fragen.

Nach einer Woche erhält sie einen Anruf: "Wir möchten Ihnen die Stelle anbieten!" Lisa freut sich sehr über diese Nachricht.`,
    translation: `Lisa se candidatou a uma vaga de assistente de marketing. Hoje ela tem sua entrevista de emprego.

Ela se preparou bem. Coletou informações sobre a empresa e praticou perguntas típicas.

Ao chegar no escritório, ela é recebida pela chefe de RH. "Bom dia, Sra. Müller. Por favor, sente-se."

A entrevista dura cerca de 30 minutos. Lisa responde todas as perguntas com confiança e também faz suas próprias perguntas.

Depois de uma semana, ela recebe uma ligação: "Gostaríamos de oferecer a vaga para você!" Lisa fica muito feliz com essa notícia.`,
    questions: [
      { id: 'q1', question: 'Auf welche Stelle hat sich Lisa beworben?', options: ['Sekretärin', 'Marketingassistentin', 'Verkäuferin', 'Lehrerin'], correctAnswer: 1 },
      { id: 'q2', question: 'Wie lange dauert das Gespräch?', options: ['15 Minuten', '30 Minuten', '1 Stunde', '2 Stunden'], correctAnswer: 1 },
      { id: 'q3', question: 'Was passiert nach einer Woche?', options: ['Sie muss noch warten', 'Sie wird abgelehnt', 'Sie bekommt die Stelle', 'Sie hat ein zweites Gespräch'], correctAnswer: 2 }
    ]
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, level, count } = body;

    let prompt = '';
    let systemPrompt = '';

    if (type === 'vocabulary') {
      systemPrompt = `Du bist ein Deutschlehrer. Erstelle Lernmaterialien für Niveau ${level}. Antworte NUR mit JSON.`;
      
      prompt = `Erstelle ${count || 5} deutsche Vokabeln für Niveau ${level}. Antworte NUR mit diesem JSON-Format, keine Erklärungen:
[{"word":"Haus","article":"das","translation":"casa","wordType":"noun","exampleSentence":{"german":"Das Haus ist groß.","translation":"A casa é grande."}}]
wordType: noun, verb, adjective, adverb, preposition. Übersetzung auf Portugiesisch.`;

    } else if (type === 'sentences') {
      systemPrompt = `Du bist ein Deutschlehrer. Erstelle Lückensätze für Niveau ${level}. Antworte NUR mit JSON.`;
      
      prompt = `Erstelle ${count || 5} Lückensätze für Deutschlerner Niveau ${level}. Markiere Lücke mit ___. Antworte NUR mit diesem JSON-Format:
[{"sentence":"Ich ___ nach Hause gegangen.","translation":"Eu fui para casa.","correct":"bin","options":["bin","war","habe","werde"],"hint":"Perfekt mit sein","topic":"Perfekt"}]
Themen: Konjugation, Perfekt, Modalverben, Präpositionen, Akkusativ/Dativ.`;

    } else if (type === 'stories') {
      systemPrompt = `Du bist ein professioneller Deutschlehrer mit Muttersprachler-Niveau. Erstelle grammatisch korrekte, natürliche deutsche Texte für Niveau ${level}. Achte STRENG auf korrekte Artikel, Grammatik und Rechtschreibung.`;
      
      prompt = `Erstelle eine deutsche Kurzgeschichte für Deutschlerner Niveau ${level}. Die Geschichte soll:
- 150-250 Wörter lang sein
- GRAMMATISCH KORREKT sein (besondere Aufmerksamkeit auf Artikel: der/die/das)
- Natürliches, authentisches Deutsch verwenden
- Alltägliche Themen behandeln (Freizeit, Arbeit, Reisen, Einkaufen, etc.)
- Für Deutschlerner verständlich sein
- Eine portugiesische Übersetzung enthalten
- 3-4 Verständnisfragen mit je 4 Antwortmöglichkeiten haben

WICHTIG: Prüfe jeden Artikel! Beispiele für korrekte Artikel:
- das Wetter, das Haus, das Buch, das Kind
- der Mann, der Tag, der Bus
- die Frau, die Arbeit, die Zeit

Antworte NUR mit diesem JSON-Format:
{
  "title": "Titel der Geschichte",
  "category": "alltag",
  "text": "Der deutsche Text...",
  "translation": "A tradução em português...",
  "questions": [
    {"id": "q1", "question": "Frage 1?", "options": ["A", "B", "C", "D"], "correctAnswer": 0},
    {"id": "q2", "question": "Frage 2?", "options": ["A", "B", "C", "D"], "correctAnswer": 1}
  ]
}`;

    } else {
      return NextResponse.json({ error: 'Unbekannter Typ' }, { status: 400 });
    }

    // Try NVIDIA API
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(NVIDIA_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NVIDIA_API_KEY}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'moonshotai/kimi-k2.5',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          max_tokens: 2048,
          temperature: 0.7,
          top_p: 0.9,
          stream: false,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';
        
        if (content) {
          // Try to parse JSON
          let cleanContent = content
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();
          
          // For stories, find JSON object; for others, find JSON array
          if (type === 'stories') {
            const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              cleanContent = jsonMatch[0];
            }
          } else {
            const jsonMatch = cleanContent.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
              cleanContent = jsonMatch[0];
            }
          }
          
          try {
            const parsedContent = JSON.parse(cleanContent);
            return NextResponse.json({ success: true, type, data: parsedContent });
          } catch (parseError) {
            console.error('JSON parse error:', parseError, 'Content:', content.substring(0, 200));
          }
        }
      } else {
        console.error('NVIDIA API error:', response.status, await response.text());
      }
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
    }

    // Fallback to predefined content
    console.log('Using fallback content for', type, level);
    
    if (type === 'vocabulary') {
      const vocabs = fallbackVocabulary[level as keyof typeof fallbackVocabulary] || fallbackVocabulary.A2;
      const shuffled = [...vocabs].sort(() => Math.random() - 0.5).slice(0, count || 5);
      return NextResponse.json({ 
        success: true, 
        type, 
        data: shuffled,
        fallback: true,
        message: 'KI nicht verfügbar - vordefinierte Inhalte verwendet'
      });
    } else if (type === 'sentences') {
      const sentences = fallbackSentences[level as keyof typeof fallbackSentences] || fallbackSentences.A2;
      const shuffled = [...sentences].sort(() => Math.random() - 0.5).slice(0, count || 5);
      return NextResponse.json({ 
        success: true, 
        type, 
        data: shuffled,
        fallback: true,
        message: 'KI nicht verfügbar - vordefinierte Inhalte verwendet'
      });
    } else if (type === 'stories') {
      const story = fallbackStories[level as keyof typeof fallbackStories] || fallbackStories.A2;
      return NextResponse.json({ 
        success: true, 
        type, 
        data: story,
        fallback: true,
        message: 'KI nicht verfügbar - vordefinierte Inhalte verwendet'
      });
    }

  } catch (error) {
    console.error('Generate API Error:', error);
    return NextResponse.json(
      { error: 'Server-Fehler', details: String(error) },
      { status: 500 }
    );
  }
}
