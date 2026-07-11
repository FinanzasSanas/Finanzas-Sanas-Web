-- Ejecuta este script una vez en el SQL Editor de tu proyecto Supabase
-- (https://app.supabase.com/project/_/sql/new)

create table if not exists public.workshop_registrations (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  correo text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.workshop_results (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  correo text not null,
  avatar_dominante text,
  avatar_secundario text,
  scores jsonb,
  respuestas jsonb,
  created_at timestamptz not null default now()
);

alter table public.workshop_registrations enable row level security;
alter table public.workshop_results enable row level security;

-- Solo permite INSERT desde el cliente (rol anon). Nadie puede leer, editar
-- ni borrar estos datos desde el navegador — solo tú, desde el dashboard de
-- Supabase con tu propia sesión (que usa el rol de servicio, no anon).
create policy "anon insert registrations" on public.workshop_registrations
  for insert to anon
  with check (true);

create policy "anon insert results" on public.workshop_results
  for insert to anon
  with check (true);
