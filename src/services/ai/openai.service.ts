import OpenAI from 'openai';
import { OPENAI_CONFIG, DEFAULT_GPT_MODEL, REQUEST_TIMEOUT, MAX_RETRIES } from '../../config/ai-models.config';
import type { GPTMessage, GPTResponse } from '../../types/ai.types';
import { APIError } from '../../utils/error-handler';

class OpenAIService {
  private client: OpenAI | null = null;
  private isInitialized = false;

  /**
   * Initialize the OpenAI client
   */
  initialize() {
    if (this.isInitialized) return;

    const apiKey = OPENAI_CONFIG.apiKey;
    
    if (!apiKey) {
      throw new APIError('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.', 401);
    }

    this.client = new OpenAI({
      apiKey,
      organization: OPENAI_CONFIG.organization,
      dangerouslyAllowBrowser: true, // Required for client-side usage
      timeout: REQUEST_TIMEOUT,
      maxRetries: MAX_RETRIES,
    });

    this.isInitialized = true;
  }

  /**
   * Get the OpenAI client instance
   */
  getClient(): OpenAI {
    if (!this.client) {
      this.initialize();
    }
    return this.client!;
  }

  /**
   * Check if the service is properly configured
   */
  isConfigured(): boolean {
    return !!OPENAI_CONFIG.apiKey;
  }

  /**
   * Test API connectivity
   */
  async testConnection(): Promise<boolean> {
    try {
      const client = this.getClient();
      await client.models.list();
      return true;
    } catch (error) {
      console.error('OpenAI connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const openAIService = new OpenAIService();

/**
 * Generate a chat completion with GPT
 */
export async function generateChatCompletion(
  messages: GPTMessage[],
  model: string = DEFAULT_GPT_MODEL
): Promise<GPTResponse> {
  try {
    const client = openAIService.getClient();
    
    const response = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
    });

    const choice = response.choices[0];
    
    if (!choice.message.content) {
      throw new APIError('No content in GPT response');
    }

    return {
      content: choice.message.content,
      model: response.model,
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
    };
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new APIError(
        `OpenAI API error: ${error.message}`,
        error.status || 500
      );
    }
    throw error;
  }
}

/**
 * Stream a chat completion
 */
export async function* streamChatCompletion(
  messages: GPTMessage[],
  model: string = DEFAULT_GPT_MODEL
): AsyncGenerator<string, void, unknown> {
  try {
    const client = openAIService.getClient();
    
    const stream = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new APIError(
        `OpenAI API error: ${error.message}`,
        error.status || 500
      );
    }
    throw error;
  }
}
