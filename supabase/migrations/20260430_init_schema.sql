-- Enable PostGIS extension
create extension if not exists postgis;

-- USERS TABLE
create table public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  phone text,
  full_name text not null,
  city text default 'Harare',
  country text default 'Zimbabwe',
  avatar_url text,
  is_responder boolean default false,
  responder_status text default 'off_duty',
  skills text[] default '{}',
  credential_url text,
  push_token text,
  location geography(point, 4326),
  location_updated_at timestamptz,
  response_count integer default 0,
  created_at timestamptz default now()
);

-- INCIDENTS TABLE
create table public.incidents (
  id uuid primary key default gen_random_uuid(),
  triggered_by uuid references public.users(id),
  type text not null,
  is_bystander boolean default false,
  victim_description text,
  location geography(point, 4326) not null,
  address_text text,
  status text default 'active',
  responder_count_alerted integer default 0,
  responder_count_accepted integer default 0,
  ems_called boolean default false,
  resolved_at timestamptz,
  outcome text,
  created_at timestamptz default now()
);

-- INCIDENT RESPONDERS
create table public.incident_responders (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.incidents(id) on delete cascade,
  responder_id uuid references public.users(id),
  status text default 'alerted',
  alerted_at timestamptz default now(),
  accepted_at timestamptz,
  arrived_at timestamptz,
  distance_at_alert float
);

-- MESSAGES TABLE
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.incidents(id) on delete cascade,
  sender_id uuid references public.users(id),
  content text not null,
  created_at timestamptz default now()
);

-- SPATIAL INDEXES for fast radius queries
create index idx_users_location on public.users using gist(location);
create index idx_incidents_location on public.incidents using gist(location);

-- ROW LEVEL SECURITY - Enable on all tables
alter table public.users enable row level security;
alter table public.incidents enable row level security;
alter table public.incident_responders enable row level security;
alter table public.messages enable row level security;

-- RLS POLICIES
-- Users policies
create policy "Users can read own profile" 
  on public.users for select 
  using (auth.uid() = id);

create policy "Users can update own profile" 
  on public.users for update 
  using (auth.uid() = id);

create policy "Users can insert own profile" 
  on public.users for insert 
  with check (auth.uid() = id);

-- Incidents policies - permissive for hackathon
create policy "Anyone can trigger incident" 
  on public.incidents for insert 
  with check (true);

create policy "Anyone can read incidents" 
  on public.incidents for select 
  using (true);

create policy "Anyone can update incidents" 
  on public.incidents for update 
  using (true);

-- Incident responders policies
create policy "Anyone can read incident responders" 
  on public.incident_responders for select 
  using (true);

create policy "System can insert responders" 
  on public.incident_responders for insert 
  with check (true);

create policy "Responder can update own status" 
  on public.incident_responders for update 
  using (responder_id = auth.uid());

-- Messages policies
create policy "Incident parties can access messages" 
  on public.messages for all 
  using (true);
