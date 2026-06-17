# Deploy na Netlify — D'Leve Saboaria

Guia para publicar o site na Netlify (requer PostgreSQL/Neon em produção).

## Por que precisa de banco na nuvem?

A Netlify não guarda arquivos SQLite nem uploads locais. Por isso usamos **Neon** (PostgreSQL grátis).

---

## Passo 1 — Criar banco no Neon

1. Acesse [neon.tech](https://neon.tech) e crie uma conta grátis
2. Crie um projeto (ex: `dleve`)
3. Copie a **Connection string** (formato PostgreSQL)
   - Exemplo: `postgresql://usuario:senha@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

---

## Passo 2 — Subir o código no GitHub

Na pasta do projeto:

```bash
git init
git add .
git commit -m "D'Leve Saboaria"
git remote add origin https://github.com/luanlbmk93/dlevesabonetaria.git
git branch -M main
git push -u origin main
```

---

## Passo 3 — Criar site na Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. **Add new site** → **Import an existing project**
3. Escolha **GitHub** e autorize
4. Selecione o repositório `dlevesabonetaria`
5. A Netlify detecta o `netlify.toml` automaticamente

**Build settings** (já configurados no `netlify.toml`):
- Build command: `npm run build:netlify`
- Plugin: `@netlify/plugin-nextjs`

---

## Passo 4 — Variáveis de ambiente na Netlify

Em **Site configuration** → **Environment variables**, adicione:

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | Connection string do Neon (Passo 1) |
| `JWT_SECRET` | Uma chave longa e aleatória (ex: `dleve-jwt-producao-2026-xK9mP2`) |
| `ADMIN_EMAIL` | `admin@dleve.com` |
| `ADMIN_PASSWORD` | Sua senha do painel admin |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5541985380834` |

Clique em **Deploy site**.

---

## Passo 5 — Popular o banco (seed)

Depois do primeiro deploy com sucesso, rode o seed **uma vez** apontando para o banco Neon.

No seu computador, crie/edite o `.env` local:

```env
DATABASE_URL="postgresql://...sua-connection-string-do-neon..."
ADMIN_EMAIL="admin@dleve.com"
ADMIN_PASSWORD="sua-senha"
JWT_SECRET="sua-chave"
NEXT_PUBLIC_WHATSAPP_NUMBER="5541985380834"
```

Depois execute:

```bash
npm run setup
```

Isso cria as tabelas, o admin e os produtos iniciais.

---

## Passo 6 — Testar

- **Site:** `https://seu-site.netlify.app`
- **Admin:** `https://seu-site.netlify.app/admin`
- **Produtos:** `https://seu-site.netlify.app/produtos`

Teste o carrinho e o botão **Enviar pedido pelo WhatsApp**.

---

## Desenvolvimento local (com Neon)

Use a mesma `DATABASE_URL` do Neon no `.env` local, ou crie um branch/database separado no Neon para dev.

```bash
npm install
npm run setup
npm run dev
```

---

## Observações importantes

### Imagens no admin
Em produção, **upload de arquivo não funciona** na Netlify. Use:
- URLs como `/imagens/nome.avif` (imagens que estão em `public/imagens`)
- Ou links externos (https://...)

### Domínio próprio
Na Netlify: **Domain management** → adicione seu domínio e siga o DNS.

### Novos deploys
Cada `git push` na branch `main` faz deploy automático.

---

## Problemas comuns

**Build falhou no Prisma**
- Confira se `DATABASE_URL` está correta nas variáveis da Netlify
- A string deve começar com `postgresql://`

**Admin não loga**
- Rode `npm run setup` com a `DATABASE_URL` de produção
- Confira `ADMIN_EMAIL` e `ADMIN_PASSWORD` nas variáveis da Netlify

**Página em branco**
- Veja os logs em **Deploys** → último deploy → **Deploy log**
