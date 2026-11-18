import { createClient } from "@supabase/supabase-js";

// Server-side client. Uses the service role key, so only import this in route handlers.
export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
