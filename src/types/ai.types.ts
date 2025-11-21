// AI Model Types
export type GPTModel = 'gpt-4' | 'gpt-4-turbo' | 'gpt-3.5-turbo';
export type TTSVoice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
export type DALLEModel = 'dall-e-3' | 'dall-e-2';
export type ImageSize = '1024x1024' | '1792x1024' | '1024x1792';

export interface GPTMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GPTResponse {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface TTSRequest {
  text: string;
  voice: TTSVoice;
  speed?: number;
}

export interface ImageGenerationRequest {
  prompt: string;
  size?: ImageSize;
  quality?: 'standard' | 'hd';
}

export interface VisionAnalysisRequest {
  imageUrl: string;
  prompt?: string;
}

export interface AIModelChoice {
  model: string;
  reason: string;
  estimatedCost: number;
}
