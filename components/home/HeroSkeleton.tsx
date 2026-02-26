import { Skeleton } from '@/components/ui/skeleton';

export default function HeroSkeleton() {
  return (
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
  );
}
