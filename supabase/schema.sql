create table if not exists public.store_config (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.store_config enable row level security;

drop policy if exists "store_config_public_read" on public.store_config;
create policy "store_config_public_read"
on public.store_config
for select
to anon, authenticated
using (true);

drop policy if exists "store_config_owner_write" on public.store_config;
create policy "store_config_owner_write"
on public.store_config
for all
to authenticated
using (auth.jwt() ->> 'email' = current_setting('app.owner_email', true))
with check (auth.jwt() ->> 'email' = current_setting('app.owner_email', true));

-- Run this once in the Supabase SQL editor, replacing the email:
-- alter database postgres set app.owner_email = 'tu-correo@ejemplo.com';
