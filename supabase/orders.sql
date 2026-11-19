create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  stripe_session_id text unique not null,
  payment_link text,
  name text,
  email text,
  website text,
  amount_total integer,   -- in cents
  amount_tax integer,     -- in cents
  currency text,
  payment_status text,
  country text,
  status text not null default 'new'  -- new / in progress / done
);
alter table public.orders enable row level security;
-- No policies: only the server (service role key) can read or write.
