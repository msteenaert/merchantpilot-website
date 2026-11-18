-- Run this once in Supabase: SQL editor > New query > paste > Run.
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  website text,
  topic text,
  message text,
  locale text
);

-- Nobody can read or write from the browser. The server uses the service role key.
alter table public.contact_requests enable row level security;
