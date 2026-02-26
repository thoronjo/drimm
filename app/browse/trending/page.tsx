import { getTrendingVideos } from '@/lib/data/videos';
import VideoCard from '@/components/video/VideoCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trending Videos | DRIMM',
  description: 'Discover the most popular AI-generated videos on DRIMM. Watch trending stories from around the world.',
  openGraph: {
    title: 'Trending Videos | DRIMM',
    description: 'Discover the most popular AI-generated videos on DRIMM.',
  },
};

export default function TrendingPage() {
  const trendingVideos = getTrendingVideos();

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12 md:py-12">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            🔥 Trending Now
          </h1>
          <p className="text-gray-400">
            The most popular AI-generated videos on DRIMM right now
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trendingVideos.map((video) => (
            <div key={video.id}>
              <VideoCard {...video} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {trendingVideos.length === 0 && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="text-xl text-gray-500">No trending videos yet</p>
              <p className="mt-2 text-gray-600">Check back soon!</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
