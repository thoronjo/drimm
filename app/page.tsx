import HeroSection from '@/components/home/HeroSection';
import VideoRow from '@/components/home/VideoRow';
import { videos, getVideosByCategory, getTrendingVideos } from '@/lib/data/videos';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home - Discover AI Stories from Around the World",
  description: "Explore trending AI-generated videos, African stories, sci-fi futures, and mythology. Watch stories created with Sora, Runway, and Pika AI.",
  openGraph: {
    title: "DRIMM - Discover AI Stories from Around the World",
    description: "Explore trending AI-generated videos, African stories, sci-fi futures, and mythology.",
    url: "https://drimm-stories.vercel.app",
    type: "website",
  },
};

export default function Home() {
  const africanStories = getVideosByCategory('African Stories');
  const sciFiVideos = getVideosByCategory('Sci-Fi');
  const mythologyVideos = getVideosByCategory('Mythology');
  const trendingVideos = getTrendingVideos().slice(0, 6);

  const websiteStructuredData = generateWebsiteStructuredData();
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />

      <main className="min-h-screen bg-black">
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>

        <div className="space-y-8 px-4 py-8 md:space-y-12 md:px-12 md:py-12" role="region" aria-label="Video collections">
          <ErrorBoundary>
            <VideoRow 
              title="🔥 Trending Now" 
              videos={trendingVideos}
              showMoreLink="/browse/trending"
            />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <VideoRow 
              title="🌍 African Stories" 
              videos={africanStories}
              showMoreLink="/browse/african-stories"
            />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <VideoRow 
              title="🚀 Sci-Fi & Futures" 
              videos={sciFiVideos}
              showMoreLink="/browse/sci-fi"
            />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <VideoRow 
              title="⚡ Mythology & Legends" 
              videos={mythologyVideos}
              showMoreLink="/browse/mythology"
            />
          </ErrorBoundary>
        </div>
      </main>
    </>
  );
}