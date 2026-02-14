import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Lida com pre-flight do navegador
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // 2. Lida com pings de validação do Mercado Livre (GET)
  if (req.method === 'GET') {
    console.log("[mercadolivre-webhook] Validação GET recebida");
    return new Response(JSON.stringify({ status: "ok" }), { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }

  try {
    // Verifica se há corpo na requisição antes de tentar ler o JSON
    const bodyText = await req.text();
    if (!bodyText) {
      return new Response(JSON.stringify({ ok: true, message: "Corpo vazio" }), { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const body = JSON.parse(bodyText);
    console.log("[mercadolivre-webhook] Notificação recebida:", JSON.stringify(body));
    
    const { resource, topic, action } = body;

    // Processa apenas notificações de pagamento
    if (topic === 'payment' || action === 'payment.created' || action === 'payment.updated') {
      const paymentId = resource ? resource.split('/').pop() : body.data?.id;
      
      if (!paymentId) {
        return new Response('ID não encontrado', { status: 400, headers: corsHeaders });
      }

      const ML_ACCESS_TOKEN = Deno.env.get('ML_ACCESS_TOKEN');
      const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

      const mlResponse = await fetch(`https://api.mercadolibre.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${ML_ACCESS_TOKEN}` }
      });
      
      if (!mlResponse.ok) {
        return new Response('Erro API ML', { status: 502, headers: corsHeaders });
      }

      const payment = await mlResponse.json();
      const productTitle = payment.description || "";
      
      console.log(`[mercadolivre-webhook] Produto vendido: ${productTitle}`);

      // Filtro para garantir que é um convite digital
      const isInvitation = productTitle.toLowerCase().includes("convite digital");

      if (payment.status === 'approved' && isInvitation) {
        const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
        
        const { data: existing } = await supabase
          .from('acessos_ml')
          .select('id')
          .eq('payment_id', paymentId.toString())
          .maybeSingle();

        if (existing) {
          return new Response(JSON.stringify({ ok: true, message: 'Já processado' }), { status: 200, headers: corsHeaders });
        }

        const token = crypto.randomUUID();
        await supabase.from('acessos_ml').insert({
          payment_id: paymentId.toString(),
          comprador_email: payment.payer.email,
          comprador_id: payment.payer.id?.toString(),
          token: token
        });

        console.log(`[mercadolivre-webhook] ✅ Venda validada para: ${payment.payer.email}`);
      }
    }

    return new Response(JSON.stringify({ ok: true }), { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  } catch (e) {
    console.error(`[mercadolivre-webhook] Erro: ${e.message}`);
    // Retornamos 200 mesmo no erro para o ML não ficar tentando reenviar pings de teste
    return new Response(JSON.stringify({ error: e.message }), { status: 200, headers: corsHeaders });
  }
})