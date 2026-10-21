-- El cliente puede mandar cualquier "nombre" en los metadatos (no hace falta pasar por el formulario),
-- así que el largo se limpia acá también.
create or replace function public.crear_perfil()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, nombre)
  values (new.id, left(trim(coalesce(new.raw_user_meta_data ->> 'nombre', '')), 50));
  return new;
end;
$$;

alter table public.profiles
  add constraint nombre_largo_maximo check (nombre is null or char_length(nombre) <= 50);
