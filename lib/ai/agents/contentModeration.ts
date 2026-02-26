import { callClaude } from '../client';

export interface ModerationResult {
  isApproved: boolean;
  flags: string[];
  severity: 'safe' | 'warning' | 'blocked';
  reasoning: string;
  suggestedActions?: string[];
}

const MODERATION_SYSTEM_PROMPT = `You are a content moderation AI for DRIMM, a platform for AI-generated videos.

Your role is to review video metadata (title, description, tags) and determine if the content is appropriate.

APPROVE content that is:
- Creative and artistic
- Educational or informative
- Cultural storytelling
- Science fiction or fantasy
- Historical or mythological
- Nature and wildlife

FLAG content that contains:
- Explicit violence or gore
- Sexual or adult content
- Hate speech or discrimination
- Misinformation or harmful content
- Spam or misleading information
- Copyright violations

Respond in JSON format:
{
  "isApproved": boolean,
  "flags": ["flag1", "flag2"],
  "severity": "safe" | "warning" | "blocked",
  "reasoning": "explanation",
  "suggestedActions": ["action1", "action2"]
}`;

/**
 * Moderate video content before publishing
 */
export async function moderateContent(
  title: string,
  description: string,
  tags: string[]
): Promise<ModerationResult> {
  const prompt = `Review this video content for moderation:

Title: ${title}
Description: ${description}
Tags: ${tags.join(', ')}

Analyze and respond with your moderation decision in JSON format.`;

  try {
    const response = await callClaude(prompt, MODERATION_SYSTEM_PROMPT, {
      temperature: 0.3, // Lower temperature for consistent moderation
    });

    // Parse JSON response
    const result = JSON.parse(response);
    
    return {
      isApproved: result.isApproved ?? true,
      flags: result.flags ?? [],
      severity: result.severity ?? 'safe',
      reasoning: result.reasoning ?? 'No issues detected',
      suggestedActions: result.suggestedActions ?? [],
    };
  } catch (error) {
    console.error('Content moderation error:', error);
    
    // Fail-safe: approve content but log error
    return {
      isApproved: true,
      flags: ['moderation-error'],
      severity: 'warning',
      reasoning: 'Moderation service unavailable. Manual review recommended.',
      suggestedActions: ['Manual review required'],
    };
  }
}

/**
 * Batch moderate multiple videos
 */
export async function moderateContentBatch(
  videos: Array<{ title: string; description: string; tags: string[] }>
): Promise<ModerationResult[]> {
  const results = await Promise.all(
    videos.map(video => 
      moderateContent(video.title, video.description, video.tags)
    )
  );
  
  return results;
}
