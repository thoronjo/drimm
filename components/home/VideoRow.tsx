import VideoCard from '@/components/video/VideoCard';
import VideoCardSkeleton from '@/components/video/VideoCardSkeleton';
import { Video } from '@/lib/types';
import Link from 'next/link';

interface VideoRowProps {
  title: string;
  videos: Video[];
  showMoreLink?: string;
  isLoading?: boolean;
}

export default function VideoRow({ title, videos, showMoreLink, isLoading = false }: VideoRowProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 md:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white md:text-2xl">{title}</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide md:gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-[200px] flex-shrink-0 md:w-[300px]">
              <VideoCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="space-y-3 md:space-y-4">
        <h2 className="text-lg font-bold text-white md:text-2xl">{title}</h2>
        <div className="flex items-center justify-center rounded-lg bg-gray-900/50 py-12">
          <p className="text-gray-500">No videos available in this category yet.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-3 md:space-y-4" aria-labelledby={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="flex items-center justify-between">
        <h2 id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-lg font-bold text-white md:text-2xl">
          {title}
        </h2>
        {showMoreLink && (
          <Link 
            href={showMoreLink} 
            className="text-xs text-gray-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded md:text-sm"
            aria-label={`See all videos in ${title}`}
          >
            See all →
          </Link>
        )}
      </div>
      
      <div 
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide md:gap-4"
        role="list"
        aria-label={`${title} videos`}
      >
        {videos.map((video) => (
          <div key={video.id} className="w-[200px] flex-shrink-0 md:w-[300px]" role="listitem">
            <VideoCard {...video} />
          </div>
        ))}
      </div>
    </section>
  );
}