# ConvitePro - Plataforma de Convites Digitais

ConvitePro é uma solução SaaS completa para venda e criação de convites digitais interativos, integrada com Mercado Livre e Supabase.

## 🚀 Como colocar no ar (Deploy)

### 1. Frontend (Vercel)
1. Conecte seu repositório GitHub à Vercel.
2. Configure as Variáveis de Ambiente:
   - `VITE_SUPABASE_URL`: URL do seu projeto Supabase.
   - `VITE_SUPABASE_ANON_KEY`: Chave anônima do Supabase.
3. O arquivo `vercel.json` já está configurado para gerenciar as rotas do React.

### 2. Backend & Webhook (Supabase)
As Edge Functions processam as vendas automaticamente. Você precisa configurar os "Secrets" no painel do Supabase:
1. Vá em **Edge Functions** -> **Manage Secrets**.
2. Adicione:
   - `ML_ACCESS_TOKEN`: Seu token de acesso da API do Mercado Livre.
   - `SUPABASE_URL`: URL do seu projeto.
   - `SUPABASE_SERVICE_ROLE_KEY`: Chave de serviço do Supabase.
   - `NEXT_PUBLIC_SITE_URL`: A URL final do seu site (ex: https://seu-convite.vercel.app).

## 🤝 Integração Mercado Livre

1. Crie um app no [Mercado Livre Developers](https://developers.mercadolibre.com.ar/devcenter).
2. Configure a URL do Webhook:
   `https://exklceslsmplyinxwpuv.supabase.co/functions/v1/mercadolivre-webhook`
3. Marque o tópico **payments** para receber notificações de vendas.

## 🛠 Fluxo de Venda
1. O cliente compra no Mercado Livre.
2. O ML avisa nosso sistema via Webhook.
3. O sistema gera um **Token Único** e salva no banco.
4. Você (ou um bot) envia o link para o cliente: `https://seu-site.com/criar?token=TOKEN_GERADO`.
5. O cliente preenche os dados e o convite fica pronto instantaneamente!

## 📊 Painel Administrativo
Acesse `/dashboard` para gerenciar convites e vendas.
- **Senha Padrão**: `admin123` (Pode ser alterada no código em `src/pages/Dashboard.tsx`).

---
Desenvolvido com ❤️ por ConvitePro.