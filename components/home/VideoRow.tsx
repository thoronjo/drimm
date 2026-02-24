import VideoCard from '@/components/video/VideoCard';
import { Video } from '@/lib/types';
import Link from 'next/link';

interface VideoRowProps {
  title: string;
  videos: Video[];
  showMoreLink?: string;
}

export default function VideoRow({ title, videos, showMoreLink }: VideoRowProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {showMoreLink && (
          <Link 
            href={showMoreLink} 
            className="text-sm text-gray-400 hover:text-white transition"
          >
            See all →
          </Link>
        )}
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {videos.map((video) => (
          <div key={video.id} className="w-[300px] flex-shrink-0">
            <VideoCard {...video} />
          </div>
        ))}
      </div>
    </div>
  );
}