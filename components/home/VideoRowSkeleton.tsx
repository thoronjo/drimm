import VideoCardSkeleton from '@/components/video/VideoCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function VideoRowSkeleton() {
  return (
    <div className="space-y-3 md:space-y-4">
      {/* Title skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48 md:h-8" />
        <Skeleton className="h-4 w-16" />
      </div>
      
      {/* Video cards skeleton */}
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
