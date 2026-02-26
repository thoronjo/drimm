import VideoRowSkeleton from '@/components/home/VideoRowSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero skeleton */}
      <div className="relative h-[70vh] w-full">
        <Skeleton className="h-full w-full rounded-none" />
        <div className="absolute bottom-10 left-4 right-4 z-20 max-w-2xl md:bottom-20 md:left-12">
          <Skeleton className="mb-3 h-12 w-full md:mb-4 md:h-20" />
          <Skeleton className="mb-4 h-6 w-3/4 md:mb-6" />
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Skeleton className="h-10 w-40 md:h-12" />
            <Skeleton className="h-10 w-40 md:h-12" />
          </div>
        </div>
      </div>

      {/* Video rows skeleton */}
      <div className="space-y-8 px-4 py-8 md:space-y-12 md:px-12 md:py-12">
        <VideoRowSkeleton />
        <VideoRowSkeleton />
        <VideoRowSkeleton />
        <VideoRowSkeleton />
      </div>
    </main>
  );
}
