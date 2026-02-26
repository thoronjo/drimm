'use client';

import { useState } from 'react';
import { Video } from '@/lib/types';
import { Eye, Calendar, MapPin, Sparkles, Share2, Heart, Plus } from 'lucide-react';
import { userEvents } from '@/lib/analytics';

interface VideoInfoProps {
  video: Video;
}

export default function VideoInfo({ video }: VideoInfoProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatViews = (viewCount?: number) => {
    if (!viewCount) return '0 views';
    if (viewCount >= 1000000) return `${(viewCount / 1000000).toFixed(1)}M views`;
    if (viewCount >= 1000) return `${(viewCount / 1000).toFixed(1)}K views`;
    return `${viewCount} views`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleWatchlist = () => {
    if (isInWatchlist) {
      userEvents.removeFromWatchlist(video.id);
    } else {
      userEvents.addToWatchlist(video.id);
    }
    setIsInWatchlist(!isInWatchlist);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description || '',
        url: window.location.href,
      }).then(() => {
        userEvents.share(video.id, 'native');
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      userEvents.share(video.id, 'clipboard');
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title and Actions */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-white md:text-4xl">
          {video.title}
        </h1>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{formatViews(video.views)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(video.uploadDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{video.region}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Created with {video.aiModel}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isLiked
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>

          <button
            onClick={handleWatchlist}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isInWatchlist
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
            aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <Plus className="h-5 w-5" />
            <span>{isInWatchlist ? 'In Watchlist' : 'Watchlist'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Share"
          >
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Description</h2>
        <p className="text-gray-300 leading-relaxed">{video.description}</p>
      </div>

      {/* Tags */}
      {video.tags && video.tags.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="rounded-lg bg-gray-900/50 p-4 space-y-2">
        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div>
            <span className="text-gray-500">Category</span>
            <p className="font-semibold text-white">{video.category}</p>
          </div>
          <div>
            <span className="text-gray-500">Region</span>
            <p className="font-semibold text-white">{video.region}</p>
          </div>
          {video.country && (
            <div>
              <span className="text-gray-500">Country</span>
              <p className="font-semibold text-white">{video.country}</p>
            </div>
          )}
          <div>
            <span className="text-gray-500">AI Model</span>
            <p className="font-semibold text-white">{video.aiModel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
