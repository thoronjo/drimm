import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-purple-600">404</h1>
          <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
        </div>
        
        <p className="text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            Go Home
          </Link>
          <Link
            href="/browse/trending"
            className="rounded bg-gray-800 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Browse Videos
          </Link>
        </div>
      </div>
    </div>
  );
}
