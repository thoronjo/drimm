import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Upload, Video, Image, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Video | DRIMM',
  description: 'Share your AI-generated video with the world.',
};

export default async function UploadPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-12 md:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            Upload Your Story
          </h1>
          <p className="mt-2 text-gray-400">
            Share your AI-generated video with the DRIMM community
          </p>
        </div>

        {/* Upload Form */}
        <div className="rounded-lg bg-gray-900 p-8">
          <form className="space-y-6">
            {/* Video Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Video File
              </label>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-700 bg-gray-800/50 p-12 transition hover:border-purple-500">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-500" />
                  <p className="mt-4 text-sm text-gray-400">
                    Drag and drop your video here, or click to browse
                  </p>
                  <p className="mt-2 text-xs text-gray-600">
                    MP4, WebM, or MOV (max 500MB)
                  </p>
                  <button
                    type="button"
                    className="mt-4 rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
                  >
                    Choose File
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Thumbnail
              </label>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-700 bg-gray-800/50 p-8 transition hover:border-purple-500">
                <div className="text-center">
                  <Image className="mx-auto h-10 w-10 text-gray-500" />
                  <p className="mt-2 text-sm text-gray-400">Upload thumbnail</p>
                  <p className="mt-1 text-xs text-gray-600">JPG, PNG (recommended: 1280x720)</p>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-semibold text-white">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Give your video a catchy title"
                className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-semibold text-white">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Tell viewers about your video"
                className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-semibold text-white">
                Category
              </label>
              <select
                id="category"
                className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a category</option>
                <option value="African Stories">African Stories</option>
                <option value="Sci-Fi">Sci-Fi & Futures</option>
                <option value="Mythology">Mythology & Legends</option>
                <option value="History">History</option>
                <option value="Nature">Nature</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* AI Model */}
            <div>
              <label htmlFor="aiModel" className="mb-2 block text-sm font-semibold text-white">
                AI Model Used
              </label>
              <select
                id="aiModel"
                className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select AI model</option>
                <option value="Sora">Sora</option>
                <option value="Runway">Runway</option>
                <option value="Pika">Pika</option>
                <option value="Stable Video">Stable Video</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label htmlFor="region" className="mb-2 block text-sm font-semibold text-white">
                Region
              </label>
              <input
                type="text"
                id="region"
                placeholder="e.g., West Africa, Asia, Europe"
                className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="mb-2 block text-sm font-semibold text-white">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                placeholder="folklore, animation, cyberpunk (comma-separated)"
                className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Upload Video
              </button>
              <button
                type="button"
                className="rounded-lg bg-gray-800 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
              >
                Save Draft
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 rounded-lg bg-purple-900/20 p-4">
            <p className="text-sm text-purple-300">
              <strong>Note:</strong> Video uploads are currently in beta. Your video will be reviewed before going live.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
