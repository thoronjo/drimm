import { callClaude } from '../client';
import { Video } from '@/lib/types';

export interface RecommendationResult {
  recommendedVideos: string[]; // Video IDs
  reasoning: string;
  confidence: number;
}

const DISCOVERY_SYSTEM_PROMPT = `You are a content discovery AI for DRIMM, a platform for AI-generated videos.

Your role is to recommend videos to users based on their viewing history and preferences.

Consider:
- User's watch history
- Video categories and themes
- Cultural diversity
- Content quality signals (views, likes)
- Freshness (newer content)

Provide diverse, relevant recommendations that introduce users to new content while respecting their preferences.`;

/**
 * Get personalized video recommendations
 */
export async function getPersonalizedRecommendations(
  watchHistory: Video[],
  availableVideos: Video[],
  limit: number = 10
): Promise<string[]> {
  const historyContext = watchHistory
    .slice(0, 10) // Last 10 videos
    .map(v => `- ${v.title} (${v.category}, ${v.region})`)
    .join('\n');

  const availableContext = availableVideos
    .map(v => `ID: ${v.id} | ${v.title} | ${v.category} | ${v.region} | Views: ${v.views}`)
    .join('\n');

  const prompt = `Based on this user's watch history, recommend ${limit} videos from the available list.

Watch History:
${historyContext}

Available Videos:
${availableContext}

Return a JSON array of video IDs in order of relevance: ["id1", "id2", ...]`;

  try {
    const response = await callClaude(prompt, DISCOVERY_SYSTEM_PROMPT, {
      temperature: 0.6,
      maxTokens: 512,
    });

    const recommendations = JSON.parse(response);
    return Array.isArray(recommendations) ? recommendations.slice(0, limit) : [];
  } catch (error) {
    console.error('Recommendation error:', error);
    
    // Fallback: return trending videos
    return availableVideos
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit)
      .map(v => v.id);
  }
}

/**
 * Find similar videos
 */
export async function findSimilarVideos(
  currentVideo: Video,
  availableVideos: Video[],
  limit: number = 6
): Promise<string[]> {
  const availableContext = availableVideos
    .filter(v => v.id !== currentVideo.id)
    .map(v => `ID: ${v.id} | ${v.title} | ${v.category} | ${v.region} | Tags: ${v.tags.join(', ')}`)
    .join('\n');

  const prompt = `Find ${limit} videos similar to this one:

Current Video:
Title: ${currentVideo.title}
Category: ${currentVideo.category}
Region: ${currentVideo.region}
Tags: ${currentVideo.tags.join(', ')}
Description: ${currentVideo.description}

Available Videos:
${availableContext}

Return a JSON array of the most similar video IDs: ["id1", "id2", ...]`;

  try {
    const response = await callClaude(prompt, DISCOVERY_SYSTEM_PROMPT, {
      temperature: 0.4,
      maxTokens: 256,
    });

    const similar = JSON.parse(response);
    return Array.isArray(similar) ? similar.slice(0, limit) : [];
  } catch (error) {
    console.error('Similar videos error:', error);
    
    // Fallback: same category
    return availableVideos
      .filter(v => v.category === currentVideo.category && v.id !== currentVideo.id)
      .slice(0, limit)
      .map(v => v.id);
  }
}

/**
 * Generate trending topics
 */
export async function analyzeTrendingTopics(
  recentVideos: Video[]
): Promise<string[]> {
  const videosContext = recentVideos
    .map(v => `${v.title} | ${v.category} | Tags: ${v.tags.join(', ')} | Views: ${v.views}`)
    .join('\n');

  const prompt = `Analyze these recent videos and identify 5-10 trending topics or themes:

Recent Videos:
${videosContext}

Return a JSON array of trending topics: ["topic1", "topic2", ...]`;

  try {
    const response = await callClaude(prompt, DISCOVERY_SYSTEM_PROMPT, {
      temperature: 0.5,
      maxTokens: 256,
    });

    const topics = JSON.parse(response);
    return Array.isArray(topics) ? topics : [];
  } catch (error) {
    console.error('Trending topics error:', error);
    return [];
  }
}
