import { callClaude } from '../client';

export interface GeneratedMetadata {
  title: string;
  description: string;
  tags: string[];
  category: string;
  suggestedThumbnailDescription?: string;
}

const METADATA_SYSTEM_PROMPT = `You are a metadata generation AI for DRIMM, a platform for AI-generated videos.

Your role is to create compelling, SEO-friendly metadata for videos based on their content.

Guidelines:
- Titles should be catchy, clear, and 50-70 characters
- Descriptions should be engaging, informative, and 150-200 characters
- Generate 5-8 relevant tags
- Suggest appropriate category
- Be culturally sensitive and accurate

Categories available:
- African Stories
- Sci-Fi
- Mythology
- History
- Nature
- Other

Respond in JSON format:
{
  "title": "Engaging Title Here",
  "description": "Compelling description that makes people want to watch",
  "tags": ["tag1", "tag2", "tag3"],
  "category": "Category Name",
  "suggestedThumbnailDescription": "Description for thumbnail generation"
}`;

/**
 * Generate metadata for a video based on user input
 */
export async function generateMetadata(
  userInput: string,
  context?: {
    aiModel?: string;
    region?: string;
    existingTitle?: string;
  }
): Promise<GeneratedMetadata> {
  const prompt = `Generate metadata for this AI-generated video:

User Input: ${userInput}
${context?.aiModel ? `AI Model: ${context.aiModel}` : ''}
${context?.region ? `Region/Culture: ${context.region}` : ''}
${context?.existingTitle ? `Existing Title: ${context.existingTitle}` : ''}

Create engaging, SEO-friendly metadata in JSON format.`;

  try {
    const response = await callClaude(prompt, METADATA_SYSTEM_PROMPT, {
      temperature: 0.7, // Balanced creativity
    });

    const result = JSON.parse(response);
    
    return {
      title: result.title || 'Untitled Video',
      description: result.description || '',
      tags: result.tags || [],
      category: result.category || 'Other',
      suggestedThumbnailDescription: result.suggestedThumbnailDescription,
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    
    // Fallback metadata
    return {
      title: 'AI Generated Video',
      description: userInput.substring(0, 200),
      tags: ['ai-generated', 'video'],
      category: 'Other',
    };
  }
}

/**
 * Improve existing metadata
 */
export async function improveMetadata(
  currentTitle: string,
  currentDescription: string,
  currentTags: string[]
): Promise<GeneratedMetadata> {
  const prompt = `Improve this video metadata to be more engaging and SEO-friendly:

Current Title: ${currentTitle}
Current Description: ${currentDescription}
Current Tags: ${currentTags.join(', ')}

Provide improved metadata in JSON format.`;

  try {
    const response = await callClaude(prompt, METADATA_SYSTEM_PROMPT, {
      temperature: 0.7,
    });

    const result = JSON.parse(response);
    
    return {
      title: result.title || currentTitle,
      description: result.description || currentDescription,
      tags: result.tags || currentTags,
      category: result.category || 'Other',
      suggestedThumbnailDescription: result.suggestedThumbnailDescription,
    };
  } catch (error) {
    console.error('Metadata improvement error:', error);
    
    // Return original metadata
    return {
      title: currentTitle,
      description: currentDescription,
      tags: currentTags,
      category: 'Other',
    };
  }
}

/**
 * Generate tags from video content
 */
export async function generateTags(
  title: string,
  description: string
): Promise<string[]> {
  const prompt = `Generate 5-8 relevant, searchable tags for this video:

Title: ${title}
Description: ${description}

Return only a JSON array of tags: ["tag1", "tag2", ...]`;

  try {
    const response = await callClaude(prompt, METADATA_SYSTEM_PROMPT, {
      temperature: 0.5,
      maxTokens: 256,
    });

    const tags = JSON.parse(response);
    return Array.isArray(tags) ? tags : [];
  } catch (error) {
    console.error('Tag generation error:', error);
    return [];
  }
}
