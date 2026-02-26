'use client';

import { useRef } from 'react';
import VideoCard from '@/components/video/VideoCard';
import VideoCardSkeleton from '@/components/video/VideoCardSkeleton';
import { Video } from '@/lib/types';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoRowWithScrollProps {
  title: string;
  videos: Video[];
  showMoreLink?: string;
  isLoading?: boolean;
}

export default function VideoRowWithScroll({ 
  title, 
  videos, 
  showMoreLink, 
  isLoading = false 
}: VideoRowWithScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 400;
    const newScrollPosition = direction === 'left' 
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <section className="space-y-3 md:space-y-4">
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
      </section>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <section className="space-y-3 md:space-y-4">
        <h2 className="text-lg font-bold text-white md:text-2xl">{title}</h2>
        <div className="flex items-center justify-center rounded-lg bg-gray-900/50 py-12">
          <p className="text-gray-500">No videos available in this category yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="group/row relative space-y-3 md:space-y-4" 
      aria-labelledby={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex items-center justify-between">
        <h2 
          id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`} 
          className="text-lg font-bold text-white md:text-2xl"
        >
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
      
      {/* Scroll buttons - hidden on mobile, shown on hover on desktop */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white opacity-0 transition hover:bg-black group-hover/row:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500 md:flex"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white opacity-0 transition hover:bg-black group-hover/row:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500 md:flex"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div 
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide md:gap-4 scroll-smooth"
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
