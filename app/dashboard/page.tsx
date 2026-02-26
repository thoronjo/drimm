import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { User, Video, Heart, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | DRIMM',
  description: 'Manage your videos, watchlist, and profile on DRIMM.',
};

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            Welcome back, {user.firstName || 'Creator'}!
          </h1>
          <p className="mt-2 text-gray-400">
            Manage your content and track your impact
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-gray-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Your Videos</p>
                <p className="mt-2 text-3xl font-bold text-white">0</p>
              </div>
              <Video className="h-10 w-10 text-purple-500" />
            </div>
          </div>

          <div className="rounded-lg bg-gray-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Views</p>
                <p className="mt-2 text-3xl font-bold text-white">0</p>
              </div>
              <User className="h-10 w-10 text-blue-500" />
            </div>
          </div>

          <div className="rounded-lg bg-gray-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Likes</p>
                <p className="mt-2 text-3xl font-bold text-white">0</p>
              </div>
              <Heart className="h-10 w-10 text-red-500" />
            </div>
          </div>

          <div className="rounded-lg bg-gray-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Watch Time</p>
                <p className="mt-2 text-3xl font-bold text-white">0h</p>
              </div>
              <Clock className="h-10 w-10 text-green-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/upload"
              className="group rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 p-6 transition hover:from-purple-700 hover:to-pink-700"
            >
              <Video className="mb-3 h-8 w-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Upload Video</h3>
              <p className="mt-1 text-sm text-purple-100">Share your AI-generated story</p>
            </a>

            <a
              href="/dashboard/watchlist"
              className="group rounded-lg bg-gray-900 p-6 transition hover:bg-gray-800"
            >
              <Heart className="mb-3 h-8 w-8 text-red-500" />
              <h3 className="text-lg font-semibold text-white">My Watchlist</h3>
              <p className="mt-1 text-sm text-gray-400">Videos you want to watch</p>
            </a>

            <a
              href="/dashboard/history"
              className="group rounded-lg bg-gray-900 p-6 transition hover:bg-gray-800"
            >
              <Clock className="mb-3 h-8 w-8 text-green-500" />
              <h3 className="text-lg font-semibold text-white">Watch History</h3>
              <p className="mt-1 text-sm text-gray-400">Continue where you left off</p>
            </a>
          </div>
        </div>

        {/* Your Videos Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Your Videos</h2>
            <a
              href="/upload"
              className="text-sm text-purple-400 hover:text-purple-300 transition"
            >
              Upload new video →
            </a>
          </div>
          
          <div className="flex min-h-[300px] items-center justify-center rounded-lg bg-gray-900/50">
            <div className="text-center">
              <Video className="mx-auto h-16 w-16 text-gray-600" />
              <p className="mt-4 text-xl text-gray-500">No videos yet</p>
              <p className="mt-2 text-gray-600">Upload your first AI-generated video to get started</p>
              <a
                href="/upload"
                className="mt-6 inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Upload Video
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
