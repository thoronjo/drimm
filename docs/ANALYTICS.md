# Analytics & Monitoring Guide

This guide explains how to use analytics and monitoring in DRIMM.

## Overview

DRIMM includes built-in analytics and performance monitoring to help you understand user behavior and optimize performance.

## Setup

### 1. Google Analytics (Optional)

Add your Google Analytics measurement ID to `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**How to get your ID:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property
3. Copy the Measurement ID (starts with G-)

### 2. Vercel Analytics (Recommended)

Vercel Analytics is automatically enabled on Vercel deployments. No setup required!

## Tracked Events

### Video Events

```typescript
import { videoEvents } from '@/lib/analytics';

// Track video play
videoEvents.play(videoId, videoTitle);

// Track video pause
videoEvents.pause(videoId, videoTitle);

// Track video completion
videoEvents.complete(videoId, videoTitle);

// Track video seek
videoEvents.seek(videoId, videoTitle);
```

### User Events

```typescript
import { userEvents } from '@/lib/analytics';

// Track search
userEvents.search('query');

// Track signup
userEvents.signup('email'); // or 'google', 'github'

// Track login
userEvents.login('email');

// Track video upload
userEvents.upload(videoId);

// Track social share
userEvents.share(videoId, 'twitter'); // or 'facebook', 'linkedin'

// Track watchlist actions
userEvents.addToWatchlist(videoId);
userEvents.removeFromWatchlist(videoId);
```

### Navigation Events

```typescript
import { navigationEvents } from '@/lib/analytics';

// Track category clicks
navigationEvents.clickCategory('African Stories');

// Track video clicks
navigationEvents.clickVideo(videoId, position);

// Track row scrolling
navigationEvents.scrollRow('Trending Now');
```

### Error Tracking

```typescript
import { trackError } from '@/lib/analytics';

try {
  // Your code
} catch (error) {
  trackError(error as Error, 'video-upload');
}
```

## Performance Monitoring

### Web Vitals

Core Web Vitals are automatically tracked:
- **LCP** (Largest Contentful Paint) - Loading performance
- **FID** (First Input Delay) - Interactivity
- **CLS** (Cumulative Layout Shift) - Visual stability

### Custom Performance Metrics

```typescript
import { performanceMonitor } from '@/lib/monitoring';

// Start/end pattern
performanceMonitor.start('video-load');
// ... do something
performanceMonitor.end('video-load');

// Measure function execution
const result = await performanceMonitor.measure('fetch-videos', async () => {
  return await fetchVideos();
});
```

### API Monitoring

```typescript
import { monitorApiCall } from '@/lib/monitoring';

const videos = await monitorApiCall('videos', async () => {
  return await fetch('/api/videos').then(r => r.json());
});
```

### View Performance Metrics

In development, open the console and run:

```javascript
// Get current metrics
const metrics = getPerformanceMetrics();
console.table(metrics);

// Or use the helper
logPerformanceMetrics();
```

## Dashboard Access

### Google Analytics Dashboard

1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your DRIMM property
3. View real-time data, user behavior, and more

### Vercel Analytics Dashboard

1. Go to your Vercel project
2. Click "Analytics" tab
3. View page views, top pages, and Web Vitals

## Key Metrics to Monitor

### User Engagement
- **Page views** - Total visits
- **Session duration** - Time spent on site
- **Bounce rate** - Single-page visits
- **Return visitors** - User retention

### Video Performance
- **Play rate** - % of videos played
- **Completion rate** - % of videos watched fully
- **Average watch time** - Engagement level
- **Most watched** - Popular content

### Technical Performance
- **LCP** - Should be < 2.5s
- **FID** - Should be < 100ms
- **CLS** - Should be < 0.1
- **Page load time** - Should be < 3s

### Conversion Metrics (Post-Launch)
- **Signup rate** - New user registrations
- **Upload rate** - User-generated content
- **Watchlist adds** - Content saved
- **Share rate** - Social engagement

## Privacy & GDPR Compliance

### Cookie Consent

When you add analytics, you should also add a cookie consent banner. Consider using:
- [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent)
- [cookieyes](https://www.cookieyes.com/)

### Privacy Policy

Update your privacy policy to mention:
- What data you collect
- How you use it
- Third-party services (Google Analytics)
- User rights (opt-out, data deletion)

### Opt-Out

Allow users to opt out of tracking:

```typescript
// Disable GA tracking
window['ga-disable-G-XXXXXXXXXX'] = true;
```

## Best Practices

✅ **DO:**
- Track meaningful events (plays, signups, shares)
- Monitor performance regularly
- Set up alerts for errors
- Review analytics weekly
- A/B test features

❌ **DON'T:**
- Track personally identifiable information (PII)
- Track every single click
- Ignore privacy regulations
- Forget to test in production
- Track without user consent (in EU)

## Debugging

### Analytics not working?

1. Check if GA ID is set in `.env.local`
2. Open browser console - look for `[Analytics]` logs
3. Check Network tab for `google-analytics.com` requests
4. Verify GA script is loaded in page source

### Events not showing in GA?

- Events can take 24-48 hours to appear
- Use "Realtime" view for immediate feedback
- Check event names match exactly

### Performance metrics missing?

- Only works in production builds
- Requires HTTPS
- Check browser console for errors

## Resources

- [Google Analytics Documentation](https://support.google.com/analytics)
- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

## Need Help?

Check the main [README.md](../README.md) or open an issue on GitHub.
