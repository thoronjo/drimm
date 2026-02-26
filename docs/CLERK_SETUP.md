# Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication for DRIMM.

## Why Clerk?

- Free for up to 10,000 monthly active users
- Drop-in authentication components
- Social login (Google, GitHub, etc.)
- User management dashboard
- Webhooks for user events
- No backend code required

## Step 1: Create a Clerk Account

1. Go to [clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application
4. Choose "Next.js" as your framework

## Step 2: Get Your API Keys

1. In your Clerk dashboard, go to "API Keys"
2. Copy your keys:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

## Step 3: Add Keys to Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-key-here
CLERK_SECRET_KEY=sk_test_your-key-here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Step 4: Configure Clerk Dashboard

### Set Redirect URLs

In your Clerk dashboard:

1. Go to "Paths" in the sidebar
2. Set these paths:
   - **Sign-in path:** `/sign-in`
   - **Sign-up path:** `/sign-up`
   - **After sign-in:** `/dashboard`
   - **After sign-up:** `/dashboard`

### Enable Social Providers (Optional)

1. Go to "User & Authentication" > "Social Connections"
2. Enable providers you want:
   - Google
   - GitHub
   - Facebook
   - Twitter
   - etc.

### Customize Appearance

1. Go to "Customization" > "Theme"
2. Match DRIMM's dark theme:
   - Primary color: `#9333ea` (purple-600)
   - Background: `#000000` (black)
   - Text: `#ffffff` (white)

## Step 5: Test Authentication

1. Restart your dev server: `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Sign Up" in the navbar
4. Create a test account
5. You should be redirected to `/dashboard`

## Features Enabled

With Clerk authentication, users can now:

✅ Sign up with email/password or social providers
✅ Sign in securely
✅ Access their dashboard
✅ Upload videos (protected route)
✅ Manage their profile
✅ Sign out

## Protected Routes

These routes require authentication:
- `/dashboard` - User dashboard
- `/upload` - Video upload page
- `/dashboard/watchlist` - User's watchlist
- `/dashboard/history` - Watch history

Public routes (no auth required):
- `/` - Homepage
- `/browse/*` - Browse pages
- `/watch/*` - Video player
- `/search` - Search page

## User Data Structure

Clerk provides these user fields:
- `id` - Unique user ID
- `firstName` - First name
- `lastName` - Last name
- `emailAddress` - Email
- `imageUrl` - Profile picture
- `username` - Username (if enabled)

Access user data in server components:
```typescript
import { currentUser } from '@clerk/nextjs/server';

const user = await currentUser();
```

Access user data in client components:
```typescript
import { useUser } from '@clerk/nextjs';

const { user, isLoaded, isSignedIn } = useUser();
```

## Webhooks (Optional)

Set up webhooks to sync user data with Supabase:

1. In Clerk dashboard, go to "Webhooks"
2. Add endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Subscribe to events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
4. Copy the signing secret
5. Create webhook handler (see below)

### Webhook Handler Example

Create `app/api/webhooks/clerk/route.ts`:

```typescript
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    return new Response('Error: Verification failed', { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    // Create profile in Supabase
    await supabaseAdmin.from('profiles').insert({
      id: id,
      username: evt.data.username,
      display_name: `${evt.data.first_name} ${evt.data.last_name}`,
      avatar_url: evt.data.image_url,
    });
  }

  return new Response('Webhook received', { status: 200 });
}
```

## Customization

### Custom Sign-In/Sign-Up Pages

The sign-in and sign-up pages are already customized in:
- `app/sign-in/[[...sign-in]]/page.tsx`
- `app/sign-up/[[...sign-up]]/page.tsx`

### User Button Customization

The user button in the navbar is customized with:
```typescript
<UserButton 
  appearance={{
    elements: {
      avatarBox: "h-8 w-8 md:h-10 md:w-10"
    }
  }}
  afterSignOutUrl="/"
/>
```

## Troubleshooting

**"Clerk: Missing publishableKey" error:**
- Check that `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set in `.env.local`
- Restart your dev server

**Redirect loop:**
- Check your redirect URLs in Clerk dashboard
- Ensure middleware is configured correctly

**User not found after sign-up:**
- Check that ClerkProvider wraps your app in `layout.tsx`
- Verify API keys are correct

**Styling issues:**
- Clerk components use their own styles
- Customize with `appearance` prop
- Override with CSS if needed

## Security Best Practices

✅ **DO:**
- Use environment variables for API keys
- Enable MFA for admin accounts
- Set up webhooks for user sync
- Use HTTPS in production
- Rotate keys regularly

❌ **DON'T:**
- Commit API keys to git
- Use test keys in production
- Disable CSRF protection
- Skip webhook signature verification

## Production Checklist

Before going live:

- [ ] Switch to production API keys
- [ ] Update redirect URLs to production domain
- [ ] Set up webhooks for user sync
- [ ] Enable MFA for admin accounts
- [ ] Configure email templates
- [ ] Set up custom domain (optional)
- [ ] Test all auth flows
- [ ] Monitor Clerk dashboard for issues

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Integration Guide](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Discord](https://clerk.com/discord)
- [API Reference](https://clerk.com/docs/reference/backend-api)

## Need Help?

Check the main [README.md](../README.md) or open an issue on GitHub.
