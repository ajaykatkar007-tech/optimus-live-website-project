-- Lead Hunter usage and saved leads.
-- Apply only after the existing admin Supabase migration is ready.

create table if not exists public.lead_hunter_daily_usage (
  usage_date date primary key default current_date,
  reserved_leads integer not null default 0 check (reserved_leads >= 0 and reserved_leads <= 20),
  used_leads integer not null default 0 check (used_leads >= 0 and used_leads <= 20),
  search_count integer not null default 0 check (search_count >= 0),
  updated_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'lead_hunter_daily_usage_capacity_check'
  ) then
    alter table public.lead_hunter_daily_usage
      add constraint lead_hunter_daily_usage_capacity_check
      check (used_leads + reserved_leads <= 20);
  end if;
end;
$$;

create table if not exists public.lead_hunter_leads (
  id uuid primary key default gen_random_uuid(),
  place_id text not null unique,
  name text not null,
  specialty text,
  city text,
  state text,
  address text,
  website text,
  phone text,
  maps_url text,
  rating numeric,
  review_count integer,
  business_status text,
  types text[] not null default '{}',
  score integer not null default 0 check (score between 0 and 100),
  reason text,
  status text not null default 'NEW' check (status in ('NEW','SAVED','CONTACTED','NOT_A_FIT')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lead_hunter_leads_city_state_idx on public.lead_hunter_leads (state, city);
create index if not exists lead_hunter_leads_score_idx on public.lead_hunter_leads (score desc);
create index if not exists lead_hunter_leads_status_idx on public.lead_hunter_leads (status);

alter table public.lead_hunter_daily_usage enable row level security;
alter table public.lead_hunter_leads enable row level security;

drop policy if exists "Admins can read lead hunter usage" on public.lead_hunter_daily_usage;
create policy "Admins can read lead hunter usage" on public.lead_hunter_daily_usage for select to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

drop policy if exists "Admins can read lead hunter leads" on public.lead_hunter_leads;
create policy "Admins can read lead hunter leads" on public.lead_hunter_leads for select to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

drop policy if exists "Admins can insert lead hunter leads" on public.lead_hunter_leads;
create policy "Admins can insert lead hunter leads" on public.lead_hunter_leads for insert to authenticated with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

drop policy if exists "Admins can update lead hunter leads" on public.lead_hunter_leads;
create policy "Admins can update lead hunter leads" on public.lead_hunter_leads for update to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

create or replace function public.claim_lead_hunter_capacity(requested integer default 20)
returns integer language plpgsql security definer set search_path = public as $$
declare
  available integer;
  granted integer;
begin
  if requested is null or requested <= 0 then
    return 0;
  end if;

  insert into public.lead_hunter_daily_usage (usage_date) values (current_date) on conflict (usage_date) do nothing;
  select 20 - used_leads - reserved_leads into available
  from public.lead_hunter_daily_usage
  where usage_date = current_date
  for update;
  granted := least(requested, greatest(0, available));
  if granted > 0 then
    update public.lead_hunter_daily_usage set reserved_leads = reserved_leads + granted, search_count = search_count + 1, updated_at = now() where usage_date = current_date;
  end if;
  return granted;
end;
$$;

create or replace function public.finalize_lead_hunter_capacity(reserved integer, actual integer)
returns void language plpgsql security definer set search_path = public as $$
declare
  released integer;
  consumed integer;
begin
  if reserved is null or reserved <= 0 then
    return;
  end if;

  -- Lock the daily row so finalization cannot race with another reservation.
  select least(reserved, reserved_leads) into released
  from public.lead_hunter_daily_usage
  where usage_date = current_date
  for update;
  released := greatest(0, coalesce(released, 0));
  consumed := greatest(0, least(coalesce(actual, 0), released));

  update public.lead_hunter_daily_usage
  set reserved_leads = reserved_leads - released,
      used_leads = used_leads + consumed,
      updated_at = now()
  where usage_date = current_date;
end;
$$;

revoke all on function public.claim_lead_hunter_capacity(integer) from public;
revoke all on function public.finalize_lead_hunter_capacity(integer, integer) from public;
grant execute on function public.claim_lead_hunter_capacity(integer) to service_role;
grant execute on function public.finalize_lead_hunter_capacity(integer, integer) to service_role;
