import { supabase } from './client';
import { Video } from '@/lib/types';

/**
 * Fetch all videos
 */
export async function getAllVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('upload_date', { ascending: false });

  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }

  return mapDatabaseVideosToVideos(data || []);
}

/**
 * Fetch video by ID
 */
export async function getVideoById(id: string): Promise<Video | null> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching video:', error);
    return null;
  }

  return mapDatabaseVideoToVideo(data);
}

/**
 * Fetch videos by category
 */
export async function getVideosByCategory(category: string): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('category', category)
    .order('upload_date', { ascending: false });

  if (error) {
    console.error('Error fetching videos by category:', error);
    return [];
  }

  return mapDatabaseVideosToVideos(data || []);
}

/**
 * Fetch trending videos (sorted by views)
 */
export async function getTrendingVideos(limit: number = 20): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('views', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching trending videos:', error);
    return [];
  }

  return mapDatabaseVideosToVideos(data || []);
}

/**
 * Fetch videos by region
 */
export async function getVideosByRegion(region: string): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('region', region)
    .order('upload_date', { ascending: false });

  if (error) {
    console.error('Error fetching videos by region:', error);
    return [];
  }

  return mapDatabaseVideosToVideos(data || []);
}

/**
 * Fetch videos by AI model
 */
export async function getVideosByAIModel(aiModel: string): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('ai_model', aiModel)
    .order('upload_date', { ascending: false });

  if (error) {
    console.error('Error fetching videos by AI model:', error);
    return [];
  }

  return mapDatabaseVideosToVideos(data || []);
}

/**
 * Search videos
 */
export async function searchVideos(query: string): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('views', { ascending: false });

  if (error) {
    console.error('Error searching videos:', error);
    return [];
  }

  return mapDatabaseVideosToVideos(data || []);
}

/**
 * Increment video views
 */
export async function incrementVideoViews(videoId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_video_views', {
    video_id: videoId,
  });

  if (error) {
    console.error('Error incrementing views:', error);
  }
}

/**
 * Map database video to Video type
 */
function mapDatabaseVideoToVideo(dbVideo: any): Video {
  return {
    id: dbVideo.id,
    title: dbVideo.title,
    description: dbVideo.description || '',
    thumbnail: dbVideo.thumbnail,
    videoUrl: dbVideo.video_url,
    aiModel: dbVideo.ai_model,
    region: dbVideo.region,
    country: dbVideo.country || '',
    tags: dbVideo.tags || [],
    category: dbVideo.category,
    duration: dbVideo.duration,
    views: dbVideo.views,
    uploadedBy: dbVideo.uploaded_by,
    uploadDate: dbVideo.upload_date,
  };
}

/**
 * Map array of database videos to Video array
 */
function mapDatabaseVideosToVideos(dbVideos: any[]): Video[] {
  return dbVideos.map(mapDatabaseVideoToVideo);
}
