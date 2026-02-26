import { createClient } from '@supabase/supabase-js';
import { config } from '@/lib/config';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey
);
