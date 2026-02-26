import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-black/95 backdrop-blur-sm" role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-bold text-white hover:text-purple-400 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded md:text-2xl"
          aria-label="DRIMM home"
        >
          DRIMM
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-3 md:gap-8" role="menubar">
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
          
          {/* Upload Button */}
          <button 
            className="rounded bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black md:px-4 md:py-2 md:text-sm"
            aria-label="Upload your video"
          >
            Upload
          </button>
        </div>
      </div>
    </nav>
  );
}