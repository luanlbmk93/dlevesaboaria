# D'Leve Saboaria Artesanal

Site com painel administrativo, loja, carrinho e pedido via WhatsApp.

**Deploy na Netlify:** veja o guia completo em [NETLIFY.md](./NETLIFY.md)

## Como rodar localmente

```bash
npm install
```

Configure o `.env` com a connection string do [Neon](https://neon.tech) (PostgreSQL):

```bash
npm run setup
npm run dev
```

- **Site público:** http://localhost:3000
- **Painel admin:** http://localhost:3000/admin

## Login do admin

Credenciais padrão (altere no arquivo `.env`):

- Email: `admin@dleve.com`
- Senha: `admin123`

## Painel admin

No painel você pode:

- Criar, editar e excluir produtos
- Enviar imagens ou usar URL
- Definir categoria (Geral, Hot Process, Rosto, Destaque)
- Marcar produtos como ativos/inativos
- Ordenar produtos por número de ordem

Produtos com categoria **Tendência** aparecem na seção de tendências da home.

## WhatsApp (pedidos)

Configure o número no `.env`:

```
NEXT_PUBLIC_WHATSAPP_NUMBER="5511XXXXXXXXX"
```

Formato: código do país + DDD + número, sem `+` ou espaços. Exemplo: `5541988931260`

O carrinho monta a lista do pedido e abre o WhatsApp com a mensagem pronta.

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste:

```
DATABASE_URL="postgresql://usuario:senha@ep-xxx.neon.tech/neondb?sslmode=require"
ADMIN_EMAIL="admin@dleve.com"
ADMIN_PASSWORD="admin123"
JWT_SECRET="sua-chave-secreta"
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia em modo desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia produção |
| `npm run setup` | Cria banco e popula dados iniciais |
