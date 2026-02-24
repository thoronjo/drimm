import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-black/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white hover:text-purple-400 transition">
          DRIMM
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/browse/african-stories" className="text-gray-300 hover:text-white transition">
            🌍 African Stories
          </Link>
          <Link href="/browse/trending" className="text-gray-300 hover:text-white transition">
            Trending
          </Link>
          <Link href="/browse/categories" className="text-gray-300 hover:text-white transition">
            Categories
          </Link>
          
          {/* Upload Button */}
          <button className="rounded bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition">
            Upload
          </button>
        </div>
      </div>
    </nav>
  );
}