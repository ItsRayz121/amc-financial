-- ============================================================
-- AMC Financial — Database Schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- site_links
-- ============================================================
create table if not exists site_links (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  url text not null,
  description text,
  category text not null check (category in ('community', 'course', 'affiliate', 'support')),
  icon text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- site_content
-- ============================================================
create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  value text not null,
  type text default 'text' check (type in ('text', 'textarea', 'number', 'url', 'email')),
  group_name text not null,
  updated_at timestamptz default now()
);

-- ============================================================
-- admin_roles
-- ============================================================
create table if not exists admin_roles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  email text,
  role text not null default 'editor' check (role in ('super_admin', 'editor', 'viewer')),
  created_at timestamptz default now()
);

-- ============================================================
-- admin_activity (audit log)
-- ============================================================
create table if not exists admin_activity (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null,
  email text,
  action text not null,
  resource text not null,
  resource_id text,
  details jsonb,
  created_at timestamptz default now()
);

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists site_links_category_idx on site_links(category);
create index if not exists site_links_is_active_idx on site_links(is_active);
create index if not exists site_links_sort_order_idx on site_links(sort_order);
create index if not exists site_content_group_idx on site_content(group_name);
create index if not exists admin_activity_user_idx on admin_activity(clerk_user_id);
create index if not exists admin_activity_created_idx on admin_activity(created_at desc);

-- ============================================================
-- Updated_at trigger
-- ============================================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_site_links_updated_at
  before update on site_links
  for each row execute function update_updated_at_column();

create trigger update_site_content_updated_at
  before update on site_content
  for each row execute function update_updated_at_column();

-- ============================================================
-- Row Level Security
-- ============================================================

alter table site_links enable row level security;
alter table site_content enable row level security;
alter table admin_roles enable row level security;
alter table admin_activity enable row level security;

-- Public: read active links
create policy "public_read_active_links"
  on site_links for select
  using (is_active = true);

-- Public: read all content
create policy "public_read_content"
  on site_content for select
  using (true);

-- Service role (admin panel via service key): full access to all tables
-- These policies apply when using the service_role key (bypasses RLS)
-- For Clerk JWT-authenticated users, we use the service role key server-side

-- Admin can read all links (including inactive)
create policy "admin_read_all_links"
  on site_links for select
  using (auth.role() = 'service_role');

create policy "admin_insert_links"
  on site_links for insert
  with check (auth.role() = 'service_role');

create policy "admin_update_links"
  on site_links for update
  using (auth.role() = 'service_role');

create policy "admin_delete_links"
  on site_links for delete
  using (auth.role() = 'service_role');

create policy "admin_insert_content"
  on site_content for insert
  with check (auth.role() = 'service_role');

create policy "admin_update_content"
  on site_content for update
  using (auth.role() = 'service_role');

create policy "admin_delete_content"
  on site_content for delete
  using (auth.role() = 'service_role');

create policy "admin_read_roles"
  on admin_roles for select
  using (auth.role() = 'service_role');

create policy "admin_insert_roles"
  on admin_roles for insert
  with check (auth.role() = 'service_role');

create policy "admin_update_roles"
  on admin_roles for update
  using (auth.role() = 'service_role');

create policy "admin_delete_roles"
  on admin_roles for delete
  using (auth.role() = 'service_role');

create policy "admin_read_activity"
  on admin_activity for select
  using (auth.role() = 'service_role');

create policy "admin_insert_activity"
  on admin_activity for insert
  with check (auth.role() = 'service_role');
