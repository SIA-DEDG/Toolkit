-- Kill switch do site: linha única que liga/desliga a exibição pública.
-- Rode este script no SQL Editor do Supabase.

create table if not exists public.site_config (
  id smallint primary key default 1,
  enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  constraint site_config_singleton check (id = 1)
);

-- Começa LIGADO
insert into public.site_config (id, enabled)
values (1, true)
on conflict (id) do nothing;

alter table public.site_config enable row level security;

-- Leitura pública: o site precisa consultar a flag com a chave anon.
drop policy if exists site_config_public_read on public.site_config;
create policy site_config_public_read
  on public.site_config for select
  to anon, authenticated
  using (true);

-- Sem policy de insert/update/delete: a flag NAO pode ser alterada pela chave
-- anon. So pelo painel do Supabase ou pela service_role key.

-- Para ligar o site:    update public.site_config set enabled = true,  updated_at = now() where id = 1;
-- Para desligar o site: update public.site_config set enabled = false, updated_at = now() where id = 1;
