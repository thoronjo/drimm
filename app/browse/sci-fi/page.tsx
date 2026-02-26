import { getVideosByCategory } from '@/lib/data/videos';
import VideoCard from '@/components/video/VideoCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sci-Fi & Futures | DRIMM',
  description: 'Explore futuristic AI-generated videos. Cyberpunk cities, space exploration, and visions of tomorrow.',
  openGraph: {
    title: 'Sci-Fi & Futures | DRIMM',
    description: 'Explore futuristic AI-generated videos. Cyberpunk cities, space exploration, and visions of tomorrow.',
  },
};

export default function SciFiPage() {
  const videos = getVideosByCategory('Sci-Fi');

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12 md:py-12">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            🚀 Sci-Fi & Futures
          </h1>
          <p className="text-gray-400">
            Journey to tomorrow - cyberpunk cities, space exploration, and futuristic visions
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
              <p className="text-xl text-gray-500">No sci-fi videos yet</p>
              <p className="mt-2 text-gray-600">The future awaits!</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
