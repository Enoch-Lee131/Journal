import { createClient } from '@supabase/supabase-js';

// @ts-expect-error - Vite env variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
// @ts-expect-error - Vite env variables
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || "";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
