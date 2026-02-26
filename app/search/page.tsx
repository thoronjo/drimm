'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import VideoCard from '@/components/video/VideoCard';
import { videos } from '@/lib/data/videos';
import { Search as SearchIcon } from 'lucide-react';
import { userEvents } from '@/lib/analytics';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState(videos);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = (searchQuery: string) => {
    setIsSearching(true);
    
    // Track search
    if (searchQuery) {
      userEvents.search(searchQuery);
    }

    // Simple client-side search (replace with Supabase search later)
    const results = videos.filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      video.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
    
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('q', query);
    window.history.pushState({}, '', url);
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12 md:py-12">
        {/* Search Header */}
        <div className="mb-8 space-y-6">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            Search Videos
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for videos, categories, regions..."
                className="w-full rounded-lg bg-gray-900 py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="mt-4 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Search
            </button>
          </form>

          {/* Results Count */}
          {query && (
            <p className="text-gray-400">
              {isSearching ? (
                'Searching...'
              ) : (
                <>
                  Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{query}"
                </>
              )}
            </p>
          )}
        </div>

        {/* Search Results */}
        {query ? (
          searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults.map((video) => (
                <div key={video.id}>
                  <VideoCard {...video} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <SearchIcon className="mx-auto h-16 w-16 text-gray-600" />
                <p className="mt-4 text-xl text-gray-500">No results found</p>
                <p className="mt-2 text-gray-600">Try different keywords or browse categories</p>
              </div>
            </div>
          )
        ) : (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <SearchIcon className="mx-auto h-16 w-16 text-gray-600" />
              <p className="mt-4 text-xl text-gray-500">Start searching</p>
              <p className="mt-2 text-gray-600">Enter keywords to find videos</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
