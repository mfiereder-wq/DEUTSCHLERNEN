import { Level } from '@/data/vocabulary';

// Satzergänzungs-Übungen
export interface SentenceExercise {
  id: string;
  level: Level;
  category: string;
  sentence: string;           // "Ich ____ jeden Morgen um 7 Uhr."
  translation: string;
  correctAnswer: string;      // "stehe auf"
  options: string[];          // ["stehe auf", "steht auf", "aufstehe", "stehen auf"]
  hint?: string;
  grammarTopic?: string;
}

export const sentenceExercises: SentenceExercise[] = [
  // A2 Sätze
  {
    id: 'se-a2-001',
    level: 'A2',
    category: 'alltag',
    sentence: 'Ich _____ jeden Morgen um 7 Uhr.',
    translation: 'Eu levanto todas as manhãs às 7 horas.',
    correctAnswer: 'stehe auf',
    options: ['stehe auf', 'steht auf', 'aufstehe', 'stehen auf'],
    hint: 'Verbo separável: o prefixo fica no final da frase.',
    grammarTopic: 'Satzklammer'
  },
  {
    id: 'se-a2-002',
    level: 'A2',
    category: 'alltag',
    sentence: '_____ Sie mir bitte sagen, wo der Bahnhof ist?',
    translation: 'O senhor pode me dizer onde fica a estação de trem?',
    correctAnswer: 'Können',
    options: ['Können', 'Kann', 'Könnte', 'Wollen'],
    hint: 'Verbo modal para uma pergunta educada.',
    grammarTopic: 'Modalverben'
  },
  {
    id: 'se-a2-003',
    level: 'A2',
    category: 'einkaufen',
    sentence: 'Ich möchte ein _____ Wasser, bitte.',
    translation: 'Eu gostaria de uma garrafa de água, por favor.',
    correctAnswer: 'Flasche',
    options: ['Flasche', 'Glas', 'Tasse', 'Becher'],
    hint: 'Qual palavra combina com água?',
    grammarTopic: 'Akkusativ'
  },
  {
    id: 'se-a2-004',
    level: 'A2',
    category: 'gesundheit',
    sentence: 'Ich habe einen Termin _____ Arzt.',
    translation: 'Tenho uma consulta médica.',
    correctAnswer: 'beim',
    options: ['beim', 'zum', 'im', 'am'],
    hint: 'beim = bei + dem',
    grammarTopic: 'Präpositionen'
  },
  {
    id: 'se-a2-005',
    level: 'A2',
    category: 'wohnung',
    sentence: 'Die Wohnung ist sehr _____ eingerichtet.',
    translation: 'O apartamento está decorado de forma muito aconchegante.',
    correctAnswer: 'gemütlich',
    options: ['gemütlich', 'gemütliche', 'gemütliches', 'gemütlicher'],
    hint: 'Advérbio - como está decorado?',
    grammarTopic: 'Adjektivendungen'
  },
  {
    id: 'se-a2-006',
    level: 'A2',
    category: 'verkehr',
    sentence: 'Entschuldigung, wie _____ ich zum Bahnhof?',
    translation: 'Com licença, como chego à estação de trem?',
    correctAnswer: 'komme',
    options: ['komme', 'kommt', 'kommst', 'kommen'],
    hint: 'Forma "ich" de kommen.',
    grammarTopic: 'Konjugation'
  },
  {
    id: 'se-a2-007',
    level: 'A2',
    category: 'alltag',
    sentence: 'Gestern _____ ich im Kino.',
    translation: 'Ontem eu estava no cinema.',
    correctAnswer: 'war',
    options: ['war', 'bin', 'warst', 'ist'],
    hint: 'Passado de sein.',
    grammarTopic: 'Präteritum'
  },
  {
    id: 'se-a2-008',
    level: 'A2',
    category: 'beruf',
    sentence: 'Ich _____ heute viel Arbeit.',
    translation: 'Eu tenho muito trabalho hoje.',
    correctAnswer: 'habe',
    options: ['habe', 'hat', 'haben', 'hast'],
    hint: 'Forma "ich" de haben.',
    grammarTopic: 'Konjugation'
  },

  // B1 Sätze
  {
    id: 'se-b1-001',
    level: 'B1',
    category: 'beruf',
    sentence: 'Ich habe mich um die Stelle _____ Siemens beworben.',
    translation: 'Candidatei-me para a vaga na Siemens.',
    correctAnswer: 'bei',
    options: ['bei', 'in', 'von', 'zu'],
    hint: 'sich bewerben bei + Dativ',
    grammarTopic: 'Verben mit Präpositionen'
  },
  {
    id: 'se-b1-002',
    level: 'B1',
    category: 'umwelt',
    sentence: 'Es ist wichtig, umweltfreundliche Produkte _____ kaufen.',
    translation: 'É importante comprar produtos ecológicos.',
    correctAnswer: 'zu',
    options: ['zu', 'um', 'für', 'ohne'],
    hint: 'Infinitivo com zu',
    grammarTopic: 'Infinitivsätze'
  },
  {
    id: 'se-b1-003',
    level: 'B1',
    category: 'freizeit',
    sentence: 'Das Konzert _____ am nächsten Samstag statt.',
    translation: 'O show acontecerá no próximo sábado.',
    correctAnswer: 'findet',
    options: ['findet', 'gefunden', 'fand', 'finden'],
    hint: 'Presente de stattfinden.',
    grammarTopic: 'Konjugation'
  },
  {
    id: 'se-b1-004',
    level: 'B1',
    category: 'beruf',
    sentence: 'Wer ist _____ die Planung verantwortlich?',
    translation: 'Quem é responsável pelo planejamento?',
    correctAnswer: 'für',
    options: ['für', 'von', 'mit', 'bei'],
    hint: 'verantwortlich sein für + Akkusativ',
    grammarTopic: 'Verben mit Präpositionen'
  },
  {
    id: 'se-b1-005',
    level: 'B1',
    category: 'alltag',
    sentence: 'Ich hatte keine Zeit, _____ konnte ich nicht zum Training gehen.',
    translation: 'Eu não tinha tempo, por isso não pude ir ao treino.',
    correctAnswer: 'deshalb',
    options: ['deshalb', 'trotzdem', 'dennoch', 'aber'],
    hint: 'Indicar uma razão',
    grammarTopic: 'Konjunktionen'
  },
  {
    id: 'se-b1-006',
    level: 'B1',
    category: 'alltag',
    sentence: 'Wenn ich mehr Geld _____, würde ich reisen.',
    translation: 'Se eu tivesse mais dinheiro, viajaria.',
    correctAnswer: 'hätte',
    options: ['hätte', 'hatte', 'habe', 'haben würde'],
    hint: 'Konjunktiv II de haben',
    grammarTopic: 'Konjunktiv II'
  },
  {
    id: 'se-b1-007',
    level: 'B1',
    category: 'beruf',
    sentence: 'In dem Lebenslauf _____ alle Erfahrungen aufgelistet.',
    translation: 'No currículo, todas as experiências estão listadas.',
    correctAnswer: 'werden',
    options: ['werden', 'werde', 'wird', 'worden'],
    hint: 'Passivo no presente',
    grammarTopic: 'Passiv'
  },
  {
    id: 'se-b1-008',
    level: 'B1',
    category: 'alltag',
    sentence: 'Ich habe mich _____ Deutsch zu lernen.',
    translation: 'Decidi aprender alemão.',
    correctAnswer: 'entschieden',
    options: ['entschieden', 'entscheide', 'entschied', 'entscheiden'],
    hint: 'Perfeito de entscheiden',
    grammarTopic: 'Perfekt'
  }
];

// Kurzgeschichten mit Fragen
export interface StoryQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;  // Index of correct answer
}

export interface Story {
  id: string;
  title: string;
  level: Level;
  category: string;
  text: string;
  translation: string;
  questions: StoryQuestion[];
  duration: number; // geschätzte Lesezeit in Minuten
}

export const stories: Story[] = [
  {
    id: 'story-a2-001',
    title: 'Der neue Job',
    level: 'A2',
    category: 'beruf',
    text: `Maria ist 28 Jahre alt und kommt aus Spanien. Seit drei Monaten lebt sie in Deutschland. Sie sucht einen Job.

Jeden Morgen trinkt Maria Kaffee und liest die Zeitung. Eines Tages sieht sie eine Anzeige: "Wir suchen eine Sekretärin. Bitte rufen Sie an!"

Maria ruft sofort an. Am nächsten Tag hat sie ein Vorstellungsgespräch. Sie ist sehr nervös, aber sie ist auch freundlich und höflich.

Der Chef fragt: "Können Sie gut Deutsch sprechen?" Maria antwortet: "Ja, ich lerne seit zwei Jahren Deutsch."

Nach einer Woche bekommt Maria eine E-Mail: "Sie haben den Job!" Maria ist sehr glücklich. Am Montag fängt sie an zu arbeiten.`,
    translation: `Maria tem 28 anos e vem da Espanha. Há três meses ela vive na Alemanha. Ela está procurando um emprego.

Todas as manhãs Maria toma café e lê o jornal. Um dia ela vê um anúncio: "Procuramos uma secretária. Por favor, ligue!"

Maria liga imediatamente. No dia seguinte ela tem uma entrevista de emprego. Ela está muito nervosa, mas também é simpática e educada.

O chefe pergunta: "Você fala bem alemão?" Maria responde: "Sim, aprendo alemão há dois anos."

Depois de uma semana Maria recebe um e-mail: "Você conseguiu o emprego!" Maria está muito feliz. Na segunda-feira ela começa a trabalhar.`,
    duration: 3,
    questions: [
      {
        id: 'q1',
        question: 'Woher kommt Maria?',
        options: ['Aus Deutschland', 'Aus Spanien', 'Aus Italien', 'Aus Frankreich'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'Was macht Maria jeden Morgen?',
        options: ['Sie geht arbeiten', 'Sie trinkt Kaffee und liest Zeitung', 'Sie lernt Deutsch', 'Sie schreibt E-Mails'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        question: 'Was sucht Maria?',
        options: ['Eine Wohnung', 'Einen Deutschkurs', 'Einen Job', 'Einen Freund'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        question: 'Wie lange lernt Maria schon Deutsch?',
        options: ['Drei Monate', 'Ein Jahr', 'Zwei Jahre', 'Fünf Jahre'],
        correctAnswer: 2
      },
      {
        id: 'q5',
        question: 'Wann fängt Maria an zu arbeiten?',
        options: ['Sofort', 'Am Montag', 'In einer Woche', 'Am Wochenende'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'story-a2-002',
    title: 'Im Supermarkt',
    level: 'A2',
    category: 'einkaufen',
    text: `Heute ist Samstag. Anna möchte kochen. Sie geht in den Supermarkt.

Zuerst braucht sie Gemüse. Sie nimmt Tomaten, Gurken und Paprika. Dann geht sie zur Fleischtheke. "Ich hätte gerne 500 Gramm Rinderhack, bitte", sagt Anna. Der Verkäufer wiegt das Fleisch und gibt es ihr.

Anna braucht auch Milch, Eier und Brot. Sie findet alles schnell. An der Kasse zahlt sie mit ihrer Karte. Das kostet insgesamt 23,50 Euro.

"Schönes Wochenende!", sagt die Kassiererin. "Danke, gleichfalls!", antwortet Anna.

Zu Hause kocht Anna eine leckere Bolognese. Ihre Familie ist sehr zufrieden.`,
    translation: `Hoje é sábado. Anna quer cozinhar. Ela vai ao supermercado.

Primeiro ela precisa de legumes. Ela pega tomates, pepinos e pimentões. Depois vai ao balcão de carne. "Eu gostaria de 500 gramas de carne moída, por favor", diz Anna. O vendedor pesa a carne e a entrega.

Anna também precisa de leite, ovos e pão. Ela encontra tudo rapidamente. No caixa ela paga com o cartão. Custa no total 23,50 euros.

"Tenha um bom fim de semana!", diz a caixa. "Obrigado, igualmente!", responde Anna.

Em casa Anna cozinha um delicioso molho à bolonhesa. Sua família está muito satisfeita.`,
    duration: 2,
    questions: [
      {
        id: 'q1',
        question: 'Wann geht Anna in den Supermarkt?',
        options: ['Am Sonntag', 'Am Samstag', 'Am Freitag', 'Am Montag'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'Was kauft Anna an der Fleischtheke?',
        options: ['Hähnchen', 'Fisch', 'Rinderhack', 'Schweinefleisch'],
        correctAnswer: 2
      },
      {
        id: 'q3',
        question: 'Wie zahlt Anna?',
        options: ['Mit Bargeld', 'Mit Karte', 'Mit Handy', 'Mit Gutschein'],
        correctAnswer: 1
      },
      {
        id: 'q4',
        question: 'Was kocht Anna zu Hause?',
        options: ['Pizza', 'Suppe', 'Salat', 'Bolognese'],
        correctAnswer: 3
      },
      {
        id: 'q5',
        question: 'Wie viel kostet alles?',
        options: ['15 Euro', '20 Euro', '23,50 Euro', '30 Euro'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'story-b1-001',
    title: 'Die Entscheidung',
    level: 'B1',
    category: 'alltag',
    text: `Thomas arbeitet seit fünf Jahren bei einer großen Firma in München. Er ist zufrieden mit seinem Job, aber er hat einen Traum: Er möchte sein eigenes Restaurant eröffnen.

Eines Abends erzählt er seiner Frau Lena von seinem Plan. "Ich weiß nicht, ob ich den sicheren Job aufgeben soll", sagt Thomas. Lena antwortet: "Wenn es dein Traum ist, solltest du es versuchen. Wir können das schaffen zusammen!"

Thomas denkt lange nach. Er hat Angst, aber er hat auch Lena, die ihn unterstützt. Deshalb entscheidet er sich, den Schritt zu wagen.

Sechs Monate später eröffnet Thomas sein Restaurant. Es ist nicht einfach, aber er arbeitet hart. Die Kunden kommen, weil das Essen gut ist. Heute ist Thomas glücklich. Er hat keine Angst mehr – nur Spaß an seiner Arbeit.

"Wenn man einen Traum hat, muss man ihn verfolgen", sagt Thomas. "Aber man braucht Menschen, die einen unterstützen."`,
    translation: `Thomas trabalha há cinco anos em uma grande empresa em Munique. Ele está satisfeito com seu emprego, mas tem um sonho: quer abrir seu próprio restaurante.

Uma noite ele conta à sua esposa Lena sobre seu plano. "Não sei se devo deixar meu emprego seguro", diz Thomas. Lena responde: "Se é seu sonho, deve tentar. Nós conseguimos juntos!"

Thomas pensa por muito tempo. Ele tem medo, mas também tem Lena, que o apoia. Por isso decide dar o passo.

Seis meses depois Thomas abre seu restaurante. Não é fácil, mas ele trabalha duro. Os clientes vêm porque a comida é boa. Hoje Thomas está feliz. Ele não tem mais medo – só se diverte com seu trabalho.

"Quando se tem um sonho, deve-se persegui-lo", diz Thomas. "Mas precisa de pessoas que o apoiem."`,
    duration: 4,
    questions: [
      {
        id: 'q1',
        question: 'Was ist Thomas\' Traum?',
        options: ['Ein Haus zu bauen', 'Sein eigenes Restaurant zu eröffnen', 'Eine Weltreise zu machen', 'Manager zu werden'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'Warum zögert Thomas?',
        options: ['Er hat kein Geld', 'Er hat Angst, seinen sicheren Job aufzugeben', 'Seine Frau ist dagegen', 'Er weiß nicht, wie man kocht'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        question: 'Was rät Lena Thomas?',
        options: ['Den Job zu behalten', 'Noch zu warten', 'Seinen Traum zu verwirklichen', 'Ein anderes Restaurant zu kaufen'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        question: 'Wann eröffnet Thomas sein Restaurant?',
        options: ['Sofort', 'Nach sechs Monaten', 'Nach einem Jahr', 'Nach zwei Jahren'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        question: 'Was ist das Wichtigste laut Thomas?',
        options: ['Viel Geld zu haben', 'Ein gutes Team zu haben', 'Menschen zu haben, die einen unterstützen', 'Keine Angst zu haben'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'story-b1-002',
    title: 'Das Umweltprojekt',
    level: 'B1',
    category: 'umwelt',
    text: `Die Stadt Grünberg hat ein Problem: Es gibt zu viel Verkehr und die Luft ist schlecht. Deshalb startet die Stadt ein neues Projekt.

"Wir wollen eine grüne Stadt werden", erklärt Bürgermeister Müller. "Deshalb bauen wir neue Fahrradwege und verbessern den öffentlichen Nahverkehr."

Viele Bürger sind begeistert. Julia, eine Studentin, organisiert eine Fahrradgruppe. "Jeden Donnerstag fahren wir zusammen zur Universität", sagt sie. "Es ist gut für die Umwelt und macht Spaß."

Auch Schulen machen mit. Die Schüler lernen, wie man Müll trennt und Energie spart. "Kinder verstehen schnell, warum Umweltschutz wichtig ist", sagt eine Lehrerin.

Nach einem Jahr sind die Ergebnisse positiv: 30% mehr Menschen fahren mit dem Fahrrad oder dem Bus. Die Luftqualität ist besser geworden.

"Das Projekt zeigt, dass wir gemeinsam etwas verändern können", sagt der Bürgermeister. "Jeder kann einen Beitrag leisten."`,
    translation: `A cidade de Grünberg tem um problema: há muito trânsito e o ar está ruim. Por isso a cidade inicia um novo projeto.

"Queremos nos tornar uma cidade verde", explica o prefeito Müller. "Por isso construímos novas ciclovias e melhoramos o transporte público."

Muitos cidadãos estão entusiasmados. Julia, uma estudante, organiza um grupo de ciclismo. "Toda quinta-feira pedalamos juntos para a universidade", diz ela. "É bom para o meio ambiente e é divertido."

As escolas também participam. Os alunos aprendem a separar o lixo e economizar energia. "As crianças entendem rapidamente por que a proteção ambiental é importante", diz uma professora.

Depois de um ano os resultados são positivos: 30% mais pessoas andam de bicicleta ou ônibus. A qualidade do ar melhorou.

"O projeto mostra que juntos podemos mudar algo", diz o prefeito. "Todos podem contribuir."`,
    duration: 4,
    questions: [
      {
        id: 'q1',
        question: 'Welches Problem hat die Stadt Grünberg?',
        options: ['Zu wenig Wohnungen', 'Zu viel Verkehr und schlechte Luft', 'Zu viele Touristen', 'Zu hohe Steuern'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'Was baut die Stadt?',
        options: ['Neue Straßen', 'Neue Fahrradwege', 'Neue Parkplätze', 'Neue Häuser'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        question: 'Was macht Julia?',
        options: ['Sie ist Lehrerin', 'Sie arbeitet beim Bürgermeister', 'Sie organisiert eine Fahrradgruppe', 'Sie trennt Müll'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        question: 'Wie oft fährt Julias Gruppe zur Universität?',
        options: ['Jeden Tag', 'Jeden Montag', 'Jeden Donnerstag', 'Jeden Freitag'],
        correctAnswer: 2
      },
      {
        id: 'q5',
        question: 'Wie hat sich die Situation nach einem Jahr verändert?',
        options: ['30% mehr Autos', '30% mehr Menschen fahren Fahrrad oder Bus', 'Nichts hat verändert', 'Die Luft ist schlechter geworden'],
        correctAnswer: 1
      }
    ]
  }
];
