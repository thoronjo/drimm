import Image from 'next/image';
import Link from 'next/link';
import { Video } from '@/lib/types';

export default function VideoCard({ 
  id, 
  title, 
  thumbnail, 
  aiModel, 
  region, 
  duration,
  views
}: Video) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (viewCount?: number) => {
    if (!viewCount) return '';
    if (viewCount >= 1000) return `${(viewCount / 1000).toFixed(1)}K views`;
    return `${viewCount} views`;
  };

  return (
    <Link href={`/watch/${id}`}>
      <div className="group relative cursor-pointer transition-transform duration-200 hover:scale-105">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden rounded-md bg-gray-800">
          <img 
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />
          
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
            {formatDuration(duration)}
          </div>
          
          {/* AI Model badge */}
          <div className="absolute top-2 right-2 rounded bg-purple-600/90 px-2 py-1 text-xs font-semibold text-white">
            {aiModel}
          </div>
        </div>
        
        {/* Title & Info */}
        <div className="mt-2 space-y-1">
          <h3 className="text-sm font-semibold text-white line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{region}</span>
            {views && (
              <>
                <span>•</span>
                <span>{formatViews(views)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}