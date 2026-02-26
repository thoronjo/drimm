import Anthropic from '@anthropic-ai/sdk';
import { config } from '@/lib/config';

// Initialize Anthropic client
export const anthropic = new Anthropic({
  apiKey: config.ai.anthropicApiKey,
});

// Default model configuration
export const DEFAULT_MODEL = 'claude-3-5-sonnet-20241022';
export const DEFAULT_MAX_TOKENS = 1024;

/**
 * Simple Claude API call wrapper
 */
export async function callClaude(
  prompt: string,
  systemPrompt?: string,
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  }
): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      model: options?.model || DEFAULT_MODEL,
      max_tokens: options?.maxTokens || DEFAULT_MAX_TOKENS,
      temperature: options?.temperature || 1,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      return content.text;
    }

    throw new Error('Unexpected response type from Claude');
  } catch (error) {
    console.error('Error calling Claude:', error);
    throw error;
  }
}
