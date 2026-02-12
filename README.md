# ConvitePro - Plataforma de Convites Digitais

ConvitePro é uma solução SaaS completa para venda e criação de convites digitais interativos, integrada com Mercado Livre e Supabase.

## 🚀 Fluxo de Funcionamento

1. **Venda**: O cliente compra o convite no Mercado Livre.
2. **Webhook**: O Mercado Livre notifica nossa Supabase Edge Function.
3. **Token**: Um token único é gerado e salvo no banco de dados.
4. **Mensagem**: O cliente recebe automaticamente o link: `https://seudominio.com/criar?token=TOKEN`.
5. **Criação**: O cliente preenche os dados e gera seu convite exclusivo.
6. **Interação**: Os convidados acessam o convite, confirmam presença e veem a localização.

## 🛠 Configuração

### 1. Supabase (Banco de Dados)
Execute o SQL abaixo no editor do Supabase:

```sql
-- Tabelas e RLS já configurados no projeto
```

### 2. Variáveis de Ambiente (.env)
Configure as seguintes variáveis no seu ambiente de deploy (Vercel/Supabase):

- `VITE_SUPABASE_URL`: URL do seu projeto Supabase.
- `VITE_SUPABASE_ANON_KEY`: Chave anônima do Supabase.
- `ML_ACCESS_TOKEN`: Token de acesso da API do Mercado Livre.
- `NEXT_PUBLIC_SITE_URL`: URL base do seu site (ex: https://convitepro.vercel.app).
- `ADMIN_PASSWORD`: Senha para o painel administrativo (padrão: admin123).

### 3. Webhook Mercado Livre
Configure a URL do Webhook no painel de desenvolvedor do Mercado Livre:
`https://[PROJECT_ID].supabase.co/functions/v1/mercadolivre-webhook`

## 🎨 Temas Disponíveis
- **Clássico**: Elegante com fontes serifadas.
- **Moderno**: Minimalista, uppercase e bordas retas.
- **Romântico**: Delicado com ícones animados.

## 📊 Painel Admin
Acesse `/dashboard` para visualizar estatísticas de vendas, convites criados e total de visualizações.

---
Desenvolvido com ❤️ por ConvitePro.