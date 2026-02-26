import Link from 'next/link';
import { videos } from '@/lib/data/videos';
import type { Metadata } from 'next';
import { Sparkles, Rocket, Zap, BookOpen, Trees, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Categories | DRIMM',
  description: 'Explore all video categories on DRIMM. African Stories, Sci-Fi, Mythology, History, Nature, and more.',
  openGraph: {
    title: 'Browse Categories | DRIMM',
    description: 'Explore all video categories on DRIMM.',
  },
};

interface Category {
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const categories: Category[] = [
  {
    name: 'African Stories',
    slug: 'african-stories',
    description: 'Narratives from across the African continent',
    icon: <Globe className="h-8 w-8" />,
    color: 'from-green-600 to-emerald-600',
  },
  {
    name: 'Sci-Fi & Futures',
    slug: 'sci-fi',
    description: 'Cyberpunk cities and futuristic visions',
    icon: <Rocket className="h-8 w-8" />,
    color: 'from-purple-600 to-pink-600',
  },
  {
    name: 'Mythology & Legends',
    slug: 'mythology',
    description: 'Ancient tales and legendary creatures',
    icon: <Zap className="h-8 w-8" />,
    color: 'from-orange-600 to-red-600',
  },
  {
    name: 'History',
    slug: 'history',
    description: 'Historical events and ancient civilizations',
    icon: <BookOpen className="h-8 w-8" />,
    color: 'from-amber-600 to-yellow-600',
  },
  {
    name: 'Nature',
    slug: 'nature',
    description: 'Wildlife, landscapes, and natural wonders',
    icon: <Trees className="h-8 w-8" />,
    color: 'from-green-600 to-teal-600',
  },
  {
    name: 'Other',
    slug: 'other',
    description: 'Unique and uncategorized stories',
    icon: <Sparkles className="h-8 w-8" />,
    color: 'from-blue-600 to-indigo-600',
  },
];

export default function CategoriesPage() {
  // Count videos per category
  const getCategoryCount = (categoryName: string) => {
    return videos.filter(v => v.category === categoryName).length;
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12 md:py-12">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            Browse Categories
          </h1>
          <p className="text-gray-400">
            Explore AI-generated videos by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = getCategoryCount(category.name);
            
            return (
              <Link
                key={category.slug}
                href={`/browse/${category.slug}`}
                className="group relative overflow-hidden rounded-lg bg-gray-900 p-6 transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 transition group-hover:opacity-20`} />
                
                {/* Content */}
                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className={`inline-flex rounded-lg bg-gradient-to-br ${category.color} p-3 text-white`}>
                    {category.icon}
                  </div>

                  {/* Title and Count */}
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition">
                      {category.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                      {count} {count === 1 ? 'video' : 'videos'}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400">
                    {category.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 text-gray-600 transition group-hover:text-purple-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-12 rounded-lg bg-gray-900/50 p-6">
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div>
              <p className="text-3xl font-bold text-white">{videos.length}</p>
              <p className="text-sm text-gray-400">Total Videos</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{categories.length}</p>
              <p className="text-sm text-gray-400">Categories</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">3</p>
              <p className="text-sm text-gray-400">AI Models</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                {new Set(videos.map(v => v.region)).size}
              </p>
              <p className="text-sm text-gray-400">Regions</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
