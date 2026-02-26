import { notFound } from 'next/navigation';
import { videos } from '@/lib/data/videos';
import VideoPlayer from '@/components/video/VideoPlayer';
import VideoInfo from '@/components/video/VideoInfo';
import VideoRow from '@/components/home/VideoRow';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const video = videos.find(v => v.id === params.id);
  
  if (!video) {
    return {
      title: 'Video Not Found',
    };
  }

  return {
    title: `${video.title} | DRIMM`,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
      type: 'video.other',
    },
    twitter: {
      card: 'player',
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
    },
  };
}

// Generate static params for all videos (optional, for static generation)
export async function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id,
  }));
}

export default function WatchPage({ params }: PageProps) {
  const video = videos.find(v => v.id === params.id);

  if (!video) {
    notFound();
  }

  // Get related videos (same category, excluding current)
  const relatedVideos = videos
    .filter(v => v.category === video.category && v.id !== video.id)
    .slice(0, 6);

  // Get more from same region
  const sameRegionVideos = videos
    .filter(v => v.region === video.region && v.id !== video.id)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-black">
      {/* Video Player Section */}
      <ErrorBoundary>
        <VideoPlayer video={video} />
      </ErrorBoundary>

      {/* Video Info Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12">
        <ErrorBoundary>
          <VideoInfo video={video} />
        </ErrorBoundary>

        {/* Related Videos */}
        <div className="mt-12 space-y-8">
          {relatedVideos.length > 0 && (
            <ErrorBoundary>
              <VideoRow
                title={`More ${video.category}`}
                videos={relatedVideos}
                showMoreLink={`/browse/${video.category.toLowerCase().replace(/\s+/g, '-')}`}
              />
            </ErrorBoundary>
          )}

          {sameRegionVideos.length > 0 && (
            <ErrorBoundary>
              <VideoRow
                title={`More from ${video.region}`}
                videos={sameRegionVideos}
              />
            </ErrorBoundary>
          )}
        </div>
      </div>
    </main>
  );
}
