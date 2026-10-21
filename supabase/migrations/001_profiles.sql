create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "ver mi perfil" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "editar mi perfil" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create function public.crear_perfil()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, nombre)
  values (new.id, new.raw_user_meta_data ->> 'nombre');
  return new;
end;
$$;

create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function public.crear_perfil();
