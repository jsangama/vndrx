-- VNDRX / tiendas multi-marca
-- Ejecuta este script en Supabase SQL Editor.

create table if not exists public.vndrx_orders (
  id text primary key,
  supplier_key text not null default 'reyleon',
  supplier_name text not null default '',
  status text not null default 'pendiente',
  payment text not null default 'cod',
  payment_label text not null default '',
  subtotal numeric(12,2) not null default 0,
  delivery numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  bonus_earned integer not null default 0,
  channel text not null default 'whatsapp',
  items jsonb not null default '[]'::jsonb,
  customer jsonb not null default '{}'::jsonb,
  extras jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vndrx_profiles (
  profile_code text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.vndrx_reviews (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null default '{}'::jsonb
);

alter table public.vndrx_orders enable row level security;
alter table public.vndrx_profiles enable row level security;
alter table public.vndrx_reviews enable row level security;

drop policy if exists "Public read orders" on public.vndrx_orders;
drop policy if exists "Public write orders" on public.vndrx_orders;
drop policy if exists "Public read profiles" on public.vndrx_profiles;
drop policy if exists "Public write profiles" on public.vndrx_profiles;
drop policy if exists "Public read reviews" on public.vndrx_reviews;
drop policy if exists "Public write reviews" on public.vndrx_reviews;

create policy "Public read orders"
on public.vndrx_orders
for select
using (true);

create policy "Public write orders"
on public.vndrx_orders
for all
using (true)
with check (true);

create policy "Public read profiles"
on public.vndrx_profiles
for select
using (true);

create policy "Public write profiles"
on public.vndrx_profiles
for all
using (true)
with check (true);

create policy "Public read reviews"
on public.vndrx_reviews
for select
using (true);

create policy "Public write reviews"
on public.vndrx_reviews
for all
using (true)
with check (true);

do $$
begin
  alter publication supabase_realtime add table public.vndrx_orders;
exception
  when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.vndrx_profiles;
exception
  when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.vndrx_reviews;
exception
  when duplicate_object then null;
end $$;
