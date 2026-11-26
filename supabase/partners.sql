-- Run once in Supabase: SQL editor > New query > paste > Run.
create table if not exists public.partners (
  code text primary key check (code ~ '^[a-z0-9_-]{2,40}$'),  -- used in the link: ?ref=code
  name text not null,
  email text,
  commission_pct integer not null default 10,
  access_key text not null,                                    -- password the partner uses to see their referrals
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.partners enable row level security;
grant usage on schema public to service_role;
grant all on public.partners to service_role;

alter table public.contact_requests add column if not exists ref text;
alter table public.orders add column if not exists ref text;
create index if not exists contact_requests_ref_idx on public.contact_requests (ref);
create index if not exists orders_ref_idx on public.orders (ref);

-- Add a partner (change the values):
-- insert into public.partners (code, name, email, access_key) values ('sherwin', 'Sherwin', 'sherwin@example.com', 'kies-een-lang-wachtwoord');
