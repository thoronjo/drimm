'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/95 backdrop-blur-sm" role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-bold text-white hover:text-purple-400 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded md:text-2xl"
          aria-label="DRIMM home"
        >
          DRIMM
        </Link>

        {/* Search Bar - Hidden on small screens */}
        <form onSubmit={handleSearch} className="hidden flex-1 max-w-md lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full rounded-full bg-gray-900 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </form>

        {/* Navigation Links */}
        <div className="flex items-center gap-3 md:gap-6" role="menubar">
          <Link 
            href="/" 
            className="hidden text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded md:block"
            role="menuitem"
          >
            Home
          </Link>
          <Link 
            href="/browse/african-stories" 
            className="hidden text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded lg:block"
            role="menuitem"
          >
            🌍 African Stories
          </Link>
          <Link 
            href="/browse/trending" 
            className="text-sm text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded md:text-base"
            role="menuitem"
          >
            Trending
          </Link>
          <Link 
            href="/browse/categories" 
            className="hidden text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded sm:block"
            role="menuitem"
          >
            Categories
          </Link>
          
          {/* Search Icon - Mobile */}
          <Link
            href="/search"
            className="text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded lg:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Auth Buttons */}
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="rounded bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black md:px-4 md:py-2 md:text-sm"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            {/* Upload Button - Only for signed in users */}
            <Link
              href="/upload"
              className="rounded bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black md:px-4 md:py-2 md:text-sm"
            >
              Upload
            </Link>
            
            {/* User Button */}
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 md:h-10 md:w-10"
                }
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}