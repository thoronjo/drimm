# Environment Setup Guide

This guide explains how to configure environment variables for DRIMM.

## Quick Start

1. **Copy the example file:**
   ```bash
   copy .env.example .env.local
   ```

2. **Edit `.env.local`** with your actual values

3. **Restart your dev server** to pick up changes

## Environment Files

- `.env.example` - Template with all available variables (committed to git)
- `.env.local` - Your local development config (NOT committed to git)
- `.env.production` - Production config (set in Vercel dashboard)

## Configuration by Feature

### Core App (Required)
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=DRIMM
```

### Database - Supabase (Week 2)
When you set up Supabase:
1. Create a project at [supabase.com](https://supabase.com)
2. Go to Settings > API
3. Copy these values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Authentication - Clerk (Week 3)
When you set up Clerk:
1. Create an app at [clerk.com](https://clerk.com)
2. Go to API Keys
3. Copy these values:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Video Storage - Cloudflare R2 (Week 1, Day 3)
When you set up R2:
1. Create an R2 bucket in Cloudflare dashboard
2. Create API tokens
3. Copy these values:

```env
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=drimm-videos
NEXT_PUBLIC_R2_PUBLIC_URL=https://your-bucket.r2.dev
```

### AI Services - Claude API (Week 3-4)
When you build AI agents:
1. Get API key from [console.anthropic.com](https://console.anthropic.com)
2. Add to your env:

```env
ANTHROPIC_API_KEY=sk-ant-...
```

### Analytics (Optional)
For Google Analytics:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Email - Resend (Post-Launch)
For email notifications:
```env
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@drimm.app
```

## Feature Flags

Control which features are enabled:

```env
NEXT_PUBLIC_ENABLE_UPLOADS=false        # User video uploads
NEXT_PUBLIC_ENABLE_COMMENTS=false       # Comments system
NEXT_PUBLIC_ENABLE_AI_RECOMMENDATIONS=false  # AI recommendations
```

Set to `true` to enable each feature.

## Vercel Deployment

When deploying to Vercel:

1. Go to your project settings
2. Navigate to Environment Variables
3. Add all production values
4. Set `NEXT_PUBLIC_APP_URL` to your production domain

## Security Best Practices

✅ **DO:**
- Keep `.env.local` out of git (already in .gitignore)
- Use different keys for development and production
- Rotate API keys regularly
- Use Vercel's encrypted environment variables

❌ **DON'T:**
- Commit `.env.local` to git
- Share API keys in Slack/Discord
- Use production keys in development
- Expose secret keys in client-side code

## Troubleshooting

**Variables not updating?**
- Restart your dev server (`npm run dev`)
- Clear `.next` folder: `rmdir /s /q .next` (Windows)

**"Missing environment variable" error?**
- Check spelling in `.env.local`
- Ensure no spaces around `=`
- Restart dev server

**Client-side variables not working?**
- Must start with `NEXT_PUBLIC_`
- Restart dev server after adding

## Need Help?

Check the main [README.md](../README.md) or open an issue on GitHub.
