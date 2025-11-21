import type { GPTModel, TTSVoice, DALLEModel } from '../types/ai.types';

export const OPENAI_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  organization: import.meta.env.VITE_OPENAI_ORG_ID || '',
  baseURL: 'https://api.openai.com/v1',
};

export const DEFAULT_GPT_MODEL: GPTModel = 'gpt-4';
export const FALLBACK_GPT_MODEL: GPTModel = 'gpt-3.5-turbo';

export const DEFAULT_TTS_VOICE: TTSVoice = 'nova';
export const TTS_VOICES: TTSVoice[] = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

export const DEFAULT_DALLE_MODEL: DALLEModel = 'dall-e-3';

export const MODEL_COSTS = {
  'gpt-4': {
    input: 0.03, // per 1K tokens
    output: 0.06,
  },
  'gpt-4-turbo': {
    input: 0.01,
    output: 0.03,
  },
  'gpt-3.5-turbo': {
    input: 0.0005,
    output: 0.0015,
  },
  'tts': {
    perCharacter: 0.000015,
  },
  'dall-e-3': {
    standard: 0.04, // per image
    hd: 0.08,
  },
  'dall-e-2': {
    '1024x1024': 0.02,
  },
};

export const RATE_LIMITS = {
  gpt4: 10000, // tokens per minute
  tts: 50, // requests per minute
  dalle: 50, // images per minute
};

export const REQUEST_TIMEOUT = 60000; // 60 seconds
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000; // 1 second
