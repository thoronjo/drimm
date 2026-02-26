import { Skeleton } from '@/components/ui/skeleton';

export default function VideoCardSkeleton() {
  return (
    <div className="space-y-2">
      {/* Thumbnail skeleton */}
      <Skeleton className="aspect-video w-full rounded-md" />
      
      {/* Title skeleton */}
      <Skeleton className="h-4 w-3/4" />
      
      {/* Metadata skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
