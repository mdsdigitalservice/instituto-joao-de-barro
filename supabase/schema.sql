-- Banco das notícias do site do Instituto João de Barro
-- Rodar uma vez em: Supabase > SQL Editor > New query

create table if not exists public.noticias (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titulo text not null,
  resumo text not null default '',
  conteudo text not null default '',
  capa_url text,
  galeria text[] not null default '{}',
  publicado boolean not null default true,
  publicado_em timestamptz not null default now(),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists noticias_publicado_em_idx on public.noticias (publicado_em desc);

alter table public.noticias enable row level security;

-- Visitantes veem só notícias publicadas cuja data já chegou (agendamento)
drop policy if exists "leitura publica" on public.noticias;
create policy "leitura publica" on public.noticias
  for select to anon
  using (publicado = true and publicado_em <= now());

-- Usuários do painel (logados) gerenciam tudo.
-- IMPORTANTE: em Authentication > Providers > Email, desative "Allow new users to sign up"
-- e crie os usuários do Instituto em Authentication > Users > Add user.
drop policy if exists "painel gerencia" on public.noticias;
create policy "painel gerencia" on public.noticias
  for all to authenticated
  using (true) with check (true);

-- Fotos das notícias
insert into storage.buckets (id, name, public)
values ('noticias', 'noticias', true)
on conflict (id) do nothing;

drop policy if exists "fotos leitura publica" on storage.objects;
create policy "fotos leitura publica" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'noticias');

drop policy if exists "fotos painel envia" on storage.objects;
create policy "fotos painel envia" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'noticias');

drop policy if exists "fotos painel apaga" on storage.objects;
create policy "fotos painel apaga" on storage.objects
  for delete to authenticated
  using (bucket_id = 'noticias');
