import { openAIService } from './openai.service';
import type { TTSVoice, TTSRequest } from '../../types/ai.types';
import { APIError } from '../../utils/error-handler';

/**
 * Generate speech from text using OpenAI TTS
 */
export async function synthesizeSpeech(request: TTSRequest): Promise<Blob> {
  try {
    const client = openAIService.getClient();
    
    const response = await client.audio.speech.create({
      model: 'tts-1',
      voice: request.voice,
      input: request.text,
      speed: request.speed || 1.0,
    });

    // Convert response to Blob
    const arrayBuffer = await response.arrayBuffer();
    return new Blob([arrayBuffer], { type: 'audio/mpeg' });
  } catch (error) {
    throw new APIError('Failed to generate speech: ' + (error as Error).message);
  }
}

/**
 * Generate voice-over for multiple text segments
 */
export async function generateVoiceOver(
  segments: string[],
  voice: TTSVoice = 'nova',
  speed: number = 1.0,
  onProgress?: (current: number, total: number) => void
): Promise<Blob[]> {
  const audioBlobs: Blob[] = [];
  
  for (let i = 0; i < segments.length; i++) {
    const blob = await synthesizeSpeech({
      text: segments[i],
      voice,
      speed,
    });
    
    audioBlobs.push(blob);
    
    if (onProgress) {
      onProgress(i + 1, segments.length);
    }
  }
  
  return audioBlobs;
}

/**
 * Estimate audio duration from text (rough estimate)
 * Assumes ~150 words per minute average speaking rate
 */
export function estimateAudioDuration(text: string, speed: number = 1.0): number {
  const words = text.split(/\s+/).length;
  const baseMinutes = words / 150;
  const seconds = (baseMinutes * 60) / speed;
  return Math.ceil(seconds);
}

/**
 * Split text into segments suitable for TTS
 * OpenAI TTS has a limit of 4096 characters per request
 */
export function splitTextForTTS(text: string, maxLength: number = 4000): string[] {
  const segments: string[] = [];
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  let currentSegment = '';
  
  for (const sentence of sentences) {
    if ((currentSegment + sentence).length > maxLength) {
      if (currentSegment) {
        segments.push(currentSegment.trim());
        currentSegment = '';
      }
      
      // If single sentence is too long, split by commas
      if (sentence.length > maxLength) {
        const parts = sentence.split(',');
        for (const part of parts) {
          if ((currentSegment + part).length > maxLength) {
            if (currentSegment) {
              segments.push(currentSegment.trim());
            }
            currentSegment = part;
          } else {
            currentSegment += part;
          }
        }
      } else {
        currentSegment = sentence;
      }
    } else {
      currentSegment += sentence;
    }
  }
  
  if (currentSegment) {
    segments.push(currentSegment.trim());
  }
  
  return segments;
}

/**
 * Create audio URL from Blob for playback
 */
export function createAudioURL(blob: Blob): string {
  return URL.createObjectURL(blob);
}

/**
 * Download audio file
 */
export function downloadAudio(blob: Blob, filename: string = 'audio.mp3'): void {
  const url = createAudioURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
