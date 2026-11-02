# Site — Instituto João de Barro

Next.js 15 (App Router) + Supabase para o painel de notícias. Plano Essencial: a equipe do Instituto publica as notícias pelo painel; o restante do conteúdo é atualizado pela MDS nos arquivos de `src/content/`.

## Rodar no computador

```bash
npm install
cp .env.example .env.local   # preencher com os dados do Supabase
npm run dev                  # http://localhost:3000
```

Sem o `.env.local`, o site funciona com duas notícias de rascunho (só para visualizar o layout) e o painel avisa que o banco não está conectado.

## Onde editar cada coisa

| O quê | Arquivo |
|---|---|
| Contatos, CNPJ, WhatsApp, Instagram | `src/content/site.ts` |
| Quem Somos, missão, valores, números de impacto | `src/content/institucional.ts` |
| Projetos | `src/content/projetos.ts` |
| Termos de fomento (Transparência) | `src/content/transparencia.ts` |
| Fotos e logo | `public/img/` |
| Cores e estilos | `src/app/globals.css` |

Campos vazios não aparecem no site (ex.: o botão de WhatsApp só surge quando `whatsapp` for preenchido).

## Configurar o painel de notícias (uma vez)

1. Criar um projeto em supabase.com (plano gratuito).
2. SQL Editor → colar e rodar `supabase/schema.sql` (cria a tabela, as regras de acesso e a pasta de fotos).
3. Authentication → Providers → Email: desativar **Allow new users to sign up**.
4. Authentication → Users → Add user: criar o login do Instituto (e-mail e senha).
5. Project Settings → API: copiar a URL e a chave `anon` para o `.env.local` (e para as variáveis do servidor).
6. Painel: `seudominio/admin`.

No painel dá para criar, editar e excluir notícias, enviar capa e galeria de fotos, salvar como rascunho e agendar (data futura). As notícias aparecem no site em até 1 minuto.

## Publicar

- **Vercel** (recomendado para Next.js): importar a pasta, cadastrar as variáveis do `.env.example`, apontar o domínio.
- **cPanel com "Setup Node.js App"**: `npm run build` e iniciar com `npm start`.

## Pendências de conteúdo

- CNPJ, endereço, telefone, WhatsApp, e-mail
- Descrição completa e público de cada projeto; fotos originais em boa resolução
- Números de impacto
- Dados dos termos de fomento
- Domínio (ex.: institutojoaodebarro.org.br)
- Revisar as duas notícias de rascunho em `src/lib/noticias.ts` (somem quando o Supabase é conectado)

## Página "em breve" (Cloudflare Pages)

A pasta `em-breve/` é uma página estática, sem build, para deixar o domínio no ar enquanto o site é finalizado.

Cloudflare Pages → Create → Connect to Git → este repositório:
- Production branch: `main`
- Framework preset: None
- Build command: (vazio)
- Build output directory: `em-breve`

Para editar: `em-breve/index.html` (os botões de contato estão marcados com `EDITAR`).
