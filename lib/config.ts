/**
 * Application configuration
 * Centralizes all environment variables and app settings
 */

export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'DRIMM',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    description: 'Where AI storytellers share their visions',
  },
  
  features: {
    enableUploads: process.env.NEXT_PUBLIC_ENABLE_UPLOADS === 'true',
    enableComments: process.env.NEXT_PUBLIC_ENABLE_COMMENTS === 'true',
    enableAIRecommendations: process.env.NEXT_PUBLIC_ENABLE_AI_RECOMMENDATIONS === 'true',
  },

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },

  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
    secretKey: process.env.CLERK_SECRET_KEY || '',
    signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in',
    signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up',
    afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/',
    afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/',
  },

  r2: {
    accountId: process.env.R2_ACCOUNT_ID || '',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucketName: process.env.R2_BUCKET_NAME || '',
    publicUrl: process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '',
  },

  ai: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  },

  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    vercelAnalyticsId: process.env.VERCEL_ANALYTICS_ID || '',
  },

  email: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.RESEND_FROM_EMAIL || 'noreply@drimm.app',
  },

  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

/**
 * Validates required environment variables
 * Call this in your app initialization to catch missing config early
 */
export function validateConfig() {
  const errors: string[] = [];

  // Add validation as you add features
  // Example:
  // if (config.features.enableUploads && !config.r2.bucketName) {
  //   errors.push('R2_BUCKET_NAME is required when uploads are enabled');
  // }

  if (errors.length > 0) {
    throw new Error(`Configuration errors:\n${errors.join('\n')}`);
  }
}
