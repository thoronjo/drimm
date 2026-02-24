export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  aiModel: 'Sora' | 'Runway' | 'Pika' | 'Stable Video' | 'Other';
  region: string;
  country: string;
  tags: string[];
  category: 'African Stories' | 'Sci-Fi' | 'Mythology' | 'History' | 'Nature' | 'Other';
  duration: number;
  views?: number;
  uploadedBy?: string;
  uploadDate?: string;
}

export interface VideoRowProps {
  title: string;
  videos: Video[];
  showMoreLink?: string;
}