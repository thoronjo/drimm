import HeroSection from '@/components/home/HeroSection';
import VideoRow from '@/components/home/VideoRow';
import { videos, getVideosByCategory, getTrendingVideos } from '@/lib/data/videos';

export default function Home() {
  const africanStories = getVideosByCategory('African Stories');
  const sciFiVideos = getVideosByCategory('Sci-Fi');
  const mythologyVideos = getVideosByCategory('Mythology');
  const trendingVideos = getTrendingVideos().slice(0, 6);

  return (
    <main className="min-h-screen bg-black">
      <HeroSection />

      <div className="space-y-12 px-12 py-12">
        <VideoRow 
          title="🔥 Trending Now" 
          videos={trendingVideos}
          showMoreLink="/browse/trending"
        />
        <VideoRow 
          title="🌍 African Stories" 
          videos={africanStories}
          showMoreLink="/browse/african-stories"
        />
        <VideoRow 
          title="🚀 Sci-Fi & Futures" 
          videos={sciFiVideos}
          showMoreLink="/browse/sci-fi"
        />
        <VideoRow 
          title="⚡ Mythology & Legends" 
          videos={mythologyVideos}
          showMoreLink="/browse/mythology"
        />
      </div>
    </main>
  );
}