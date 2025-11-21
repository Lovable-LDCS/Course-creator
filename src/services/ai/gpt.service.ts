import { generateChatCompletion, streamChatCompletion } from './openai.service';
import type { GPTMessage } from '../../types/ai.types';

/**
 * Analyze content and generate a script
 */
export async function generateScript(content: string, context?: string): Promise<string> {
  const messages: GPTMessage[] = [
    {
      role: 'system',
      content: `You are an expert educational content creator. Your task is to create engaging, natural-sounding narration scripts for training materials. The scripts should be:
- Clear and easy to understand
- Conversational and engaging
- Well-paced for voice-over
- Pedagogically sound
${context ? `\nAdditional context: ${context}` : ''}`,
    },
    {
      role: 'user',
      content: `Create a professional narration script for the following content:\n\n${content}`,
    },
  ];

  const response = await generateChatCompletion(messages);
  return response.content;
}

/**
 * Analyze content and extract key points
 */
export async function analyzeContent(content: string): Promise<{
  summary: string;
  keyPoints: string[];
  topics: string[];
}> {
  const messages: GPTMessage[] = [
    {
      role: 'system',
      content: 'You are an expert content analyst. Analyze educational content and extract key information in JSON format.',
    },
    {
      role: 'user',
      content: `Analyze this content and return a JSON object with:
- summary: A brief summary (2-3 sentences)
- keyPoints: Array of main points (3-5 items)
- topics: Array of main topics covered (3-5 items)

Content:
${content}

Return only valid JSON, no additional text.`,
    },
  ];

  const response = await generateChatCompletion(messages);
  
  try {
    const parsed = JSON.parse(response.content);
    return {
      summary: parsed.summary || '',
      keyPoints: parsed.keyPoints || [],
      topics: parsed.topics || [],
    };
  } catch {
    // Fallback if JSON parsing fails
    return {
      summary: response.content,
      keyPoints: [],
      topics: [],
    };
  }
}

/**
 * Improve text quality and style
 */
export async function improveText(
  text: string,
  style: 'professional' | 'casual' | 'educational' = 'professional'
): Promise<string> {
  const styleGuides = {
    professional: 'formal, business-like, and authoritative',
    casual: 'friendly, conversational, and approachable',
    educational: 'clear, instructive, and pedagogically sound',
  };

  const messages: GPTMessage[] = [
    {
      role: 'system',
      content: `You are an expert editor. Improve the given text to be ${styleGuides[style]}.`,
    },
    {
      role: 'user',
      content: `Improve this text:\n\n${text}`,
    },
  ];

  const response = await generateChatCompletion(messages);
  return response.content;
}

/**
 * Generate a storyboard for video creation
 */
export async function generateStoryboard(content: string): Promise<Array<{
  sceneNumber: number;
  description: string;
  visualDescription: string;
  narration: string;
}>> {
  const messages: GPTMessage[] = [
    {
      role: 'system',
      content: 'You are an expert video storyboard creator. Create detailed scene breakdowns for educational videos.',
    },
    {
      role: 'user',
      content: `Create a video storyboard for this content. Return a JSON array where each scene has:
- sceneNumber: Number
- description: Scene description
- visualDescription: What should be shown visually
- narration: Voice-over text for this scene

Content:
${content}

Return only valid JSON array, no additional text.`,
    },
  ];

  const response = await generateChatCompletion(messages);
  
  try {
    return JSON.parse(response.content);
  } catch {
    // Fallback to basic structure
    return [
      {
        sceneNumber: 1,
        description: 'Introduction',
        visualDescription: 'Title card',
        narration: response.content,
      },
    ];
  }
}

/**
 * Stream script generation for real-time feedback
 */
export async function* streamScriptGeneration(
  content: string,
  context?: string
): AsyncGenerator<string, void, unknown> {
  const messages: GPTMessage[] = [
    {
      role: 'system',
      content: `You are an expert educational content creator. Create an engaging narration script.${
        context ? ` Context: ${context}` : ''
      }`,
    },
    {
      role: 'user',
      content: `Create a narration script for:\n\n${content}`,
    },
  ];

  yield* streamChatCompletion(messages);
}
