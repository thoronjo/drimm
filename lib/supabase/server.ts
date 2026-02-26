import { createClient } from '@supabase/supabase-js';
import { config } from '@/lib/config';

// Server-side client with service role key (for admin operations)
export const supabaseAdmin = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Regular server-side client
export const supabaseServer = createClient(
  config.supabase.url,
  config.supabase.anonKey
);
