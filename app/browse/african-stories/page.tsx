import { getVideosByCategory } from '@/lib/data/videos';
import VideoCard from '@/components/video/VideoCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'African Stories | DRIMM',
  description: 'Explore AI-generated videos celebrating African narratives, myths, and futures. From ancient kingdoms to Afrofuturistic visions.',
  openGraph: {
    title: 'African Stories | DRIMM',
    description: 'Explore AI-generated videos celebrating African narratives, myths, and futures.',
  },
};

export default function AfricanStoriesPage() {
  const videos = getVideosByCategory('African Stories');

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12 md:py-12">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            🌍 African Stories
          </h1>
          <p className="text-gray-400">
            Celebrating narratives from across the African continent - from ancient myths to futuristic visions
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <div key={video.id}>
              <VideoCard {...video} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="text-xl text-gray-500">No African stories yet</p>
              <p className="mt-2 text-gray-600">Be the first to upload!</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
