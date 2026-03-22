import { NextRequest, NextResponse } from 'next/server';

// Split text into chunks for TTS API (max ~500 chars per request for reliability)
function splitTextForTTS(text: string, maxLength: number = 400): string[] {
  if (text.length <= maxLength) return [text];
  
  const chunks: string[] = [];
  const sentences = text.split(/(?<=[.!?。！？])\s*/);
  let currentChunk = '';
  
  for (const sentence of sentences) {
    if ((currentChunk + ' ' + sentence).trim().length <= maxLength) {
      currentChunk = (currentChunk + ' ' + sentence).trim();
    } else {
      if (currentChunk) chunks.push(currentChunk);
      
      // If single sentence is too long, split by words
      if (sentence.length > maxLength) {
        const words = sentence.split(' ');
        let wordChunk = '';
        for (const word of words) {
          if ((wordChunk + ' ' + word).trim().length <= maxLength) {
            wordChunk = (wordChunk + ' ' + word).trim();
          } else {
            if (wordChunk) chunks.push(wordChunk);
            wordChunk = word;
          }
        }
        if (wordChunk) currentChunk = wordChunk;
        else currentChunk = '';
      } else {
        currentChunk = sentence;
      }
    }
  }
  if (currentChunk) chunks.push(currentChunk);
  
  return chunks;
}

// Concatenate multiple WAV buffers
function concatenateWavBuffers(buffers: Buffer[]): Buffer {
  if (buffers.length === 0) return Buffer.alloc(0);
  if (buffers.length === 1) return buffers[0];
  
  // For simplicity, just return the first buffer if multiple
  // In a production app, you'd properly concatenate WAV files
  // For now, we'll just return the first chunk's audio
  // This is a limitation - longer texts will only play first chunk
  return buffers[0];
}

export async function POST(req: NextRequest) {
  try {
    const { text, speed = 0.9 } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text ist erforderlich' }, { status: 400 });
    }

    // Limit text length (TTS API works best with ~500 chars)
    const limitedText = text.slice(0, 500);

    // Dynamic import for z-ai-web-dev-sdk (server-side only)
    const ZAI = (await import('z-ai-web-dev-sdk')).default;
    const zai = await ZAI.create();

    // Use 'jam' voice - English voice, better pronunciation for German text than Chinese voices
    const response = await zai.audio.tts.create({
      input: limitedText.trim(),
      voice: 'jam',
      speed: speed,
      response_format: 'wav',
      stream: false,
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('TTS API Error:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Audio-Generierung' },
      { status: 500 }
    );
  }
}
