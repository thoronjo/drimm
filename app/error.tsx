'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Oops!</h1>
          <h2 className="text-xl font-semibold text-gray-300">Something went wrong</h2>
        </div>
        
        <p className="text-gray-400">
          We encountered an unexpected error. Don't worry, our team has been notified.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            Try Again
          </button>
          <a
            href="/"
            className="rounded bg-gray-800 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Go Home
          </a>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="mt-8 rounded bg-gray-900 p-4 text-left">
            <summary className="cursor-pointer text-sm font-semibold text-gray-400">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-red-400">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
