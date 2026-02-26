## Supabase Database Setup Guide

This guide will help you set up your Supabase database for DRIMM.

## Prerequisites

- A Supabase account ([sign up here](https://supabase.com))
- Your Supabase project created

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Click on "Settings" (gear icon) in the sidebar
3. Click on "API" under Project Settings
4. Copy the following values:

```
Project URL: https://your-project.supabase.co
anon/public key: eyJhbGc...
service_role key: eyJhbGc... (keep this secret!)
```

## Step 2: Add Credentials to Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 3: Run the Database Schema

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the sidebar
3. Click "New Query"
4. Copy the contents of `supabase/schema.sql`
5. Paste into the SQL editor
6. Click "Run" or press Ctrl+Enter

This will create:
- `videos` table
- `profiles` table
- `watchlist` table
- `likes` table
- `watch_history` table
- `comments` table
- All necessary indexes
- Row Level Security (RLS) policies
- Helper functions

## Step 4: Seed Initial Data (Optional)

To populate your database with sample videos:

1. In the SQL Editor, create a new query
2. Copy the contents of `supabase/seed.sql`
3. Paste and run

This will insert 8 sample videos into your database.

## Step 5: Verify Setup

Run this query in the SQL Editor to verify:

```sql
SELECT COUNT(*) FROM videos;
```

You should see 8 videos if you ran the seed file.

## Step 6: Update Your Code

The database is now ready! Your app will automatically use Supabase instead of dummy data.

To switch from dummy data to Supabase:

1. Open `lib/data/videos.ts`
2. Import Supabase functions:
   ```typescript
   import { getAllVideos, getVideosByCategory, getTrendingVideos } from '@/lib/supabase/videos';
   ```
3. Replace the exported functions with async versions that call Supabase

Or create new files that use Supabase and update imports in your pages.

## Database Schema Overview

### Videos Table
- `id` - UUID primary key
- `title` - Video title
- `description` - Video description
- `thumbnail` - Thumbnail URL
- `video_url` - Video file URL
- `ai_model` - AI model used (Sora, Runway, Pika, etc.)
- `region` - Geographic region
- `country` - Country
- `tags` - Array of tags
- `category` - Video category
- `duration` - Duration in seconds
- `views` - View count
- `likes` - Like count
- `uploaded_by` - User ID (foreign key to auth.users)
- `upload_date` - Upload timestamp

### Profiles Table
- `id` - UUID (matches auth.users.id)
- `username` - Unique username
- `display_name` - Display name
- `avatar_url` - Avatar image URL
- `bio` - User bio

### Watchlist Table
- `user_id` - User ID
- `video_id` - Video ID
- `added_at` - Timestamp

### Likes Table
- `user_id` - User ID
- `video_id` - Video ID
- `created_at` - Timestamp

### Watch History Table
- `user_id` - User ID
- `video_id` - Video ID
- `watched_at` - Timestamp
- `progress` - Seconds watched
- `completed` - Boolean

## Security (Row Level Security)

RLS is enabled on all tables with these policies:

**Videos:**
- Everyone can view videos
- Authenticated users can upload videos
- Users can only edit/delete their own videos

**Profiles:**
- Everyone can view profiles
- Users can only edit their own profile

**Watchlist:**
- Users can only view/modify their own watchlist

**Likes:**
- Everyone can see likes
- Users can like/unlike videos

**Watch History:**
- Users can only view/modify their own history

## Helper Functions

### increment_video_views(video_id)
Safely increments the view count for a video.

Usage:
```sql
SELECT increment_video_views('video-uuid-here');
```

Or from your app:
```typescript
import { incrementVideoViews } from '@/lib/supabase/videos';
await incrementVideoViews(videoId);
```

## Troubleshooting

**"relation does not exist" error:**
- Make sure you ran the schema.sql file
- Check that you're connected to the right project

**"permission denied" error:**
- Check your RLS policies
- Make sure you're using the correct API key

**Videos not showing:**
- Verify data exists: `SELECT * FROM videos;`
- Check browser console for errors
- Verify environment variables are set

**Can't insert videos:**
- Make sure you're authenticated
- Check RLS policies
- Verify the uploaded_by field matches your user ID

## Next Steps

1. Set up authentication (Clerk or Supabase Auth)
2. Enable user uploads
3. Add real-time subscriptions for live updates
4. Set up Cloudflare R2 for video storage
5. Add vector embeddings for AI recommendations

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- Check the main [README.md](../README.md)
