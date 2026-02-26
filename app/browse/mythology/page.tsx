import { getVideosByCategory } from '@/lib/data/videos';
import VideoCard from '@/components/video/VideoCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mythology & Legends | DRIMM',
  description: 'Discover ancient myths and legends brought to life with AI. From Norse gods to Greek heroes.',
  openGraph: {
    title: 'Mythology & Legends | DRIMM',
    description: 'Discover ancient myths and legends brought to life with AI.',
  },
};

export default function MythologyPage() {
  const videos = getVideosByCategory('Mythology');

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12 md:py-12">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            ⚡ Mythology & Legends
          </h1>
          <p className="text-gray-400">
            Ancient tales reimagined - gods, heroes, and legendary creatures from cultures worldwide
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
              <p className="text-xl text-gray-500">No mythology videos yet</p>
              <p className="mt-2 text-gray-600">Legends are waiting to be told!</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
