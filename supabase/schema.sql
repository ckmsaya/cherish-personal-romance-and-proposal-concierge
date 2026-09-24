-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query) once.
-- These tables are only ever written to via the server's service_role key,
-- so Row Level Security stays enabled with no public policies (no direct
-- client access is possible or expected).

create table if not exists public.bookings (
  booking_id text primary key,
  device_id text not null,
  status text not null,
  client_name text not null,
  client_phone text not null,
  client_email text not null,
  occasion text not null,
  partner_name text not null default '',
  event_date text not null,
  event_time text not null,
  city_location text not null,
  selected_tier text not null,
  total_estimated_amount numeric not null,
  deposit_paid numeric not null,
  balance_remaining numeric not null,
  selected_addons jsonb not null default '[]',
  special_notes text not null default '',
  assigned_concierge jsonb not null,
  deposit_receipt_number text not null,
  booked_at timestamptz not null default now(),
  concierge_direct_channel text not null,
  next_steps jsonb not null default '[]',
  plan jsonb,
  created_at timestamptz not null default now()
);

create index if not exists bookings_device_id_idx on public.bookings (device_id);

create table if not exists public.bespoke_inquiries (
  inquiry_id text primary key,
  device_id text not null,
  status text not null,
  client_name text not null,
  client_phone text not null,
  client_email text not null,
  contact_preference text not null,
  occasion text not null,
  custom_vision text not null,
  location_area text not null,
  target_timeline text not null,
  budget_expectation text not null,
  discreet_guarantee boolean not null default true,
  submitted_at timestamptz not null default now(),
  assigned_concierge jsonb not null,
  whatsapp_quick_link text not null,
  guarantee_message text not null,
  created_at timestamptz not null default now()
);

create index if not exists bespoke_inquiries_device_id_idx on public.bespoke_inquiries (device_id);

alter table public.bookings enable row level security;
alter table public.bespoke_inquiries enable row level security;
