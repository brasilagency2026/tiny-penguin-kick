import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const body = await req.json();
    console.log("[mercadolivre-webhook] Notificação recebida:", JSON.stringify(body));
    
    const { resource, topic, action } = body;

    if (topic === 'payment' || action === 'payment.created' || action === 'payment.updated') {
      const paymentId = resource ? resource.split('/').pop() : body.data?.id;
      
      if (!paymentId) {
        return new Response('ID não encontrado', { status: 400, headers: corsHeaders });
      }

      const ML_ACCESS_TOKEN = Deno.env.get('ML_ACCESS_TOKEN');
      const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:8080';

      const mlResponse = await fetch(`https://api.mercadolibre.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${ML_ACCESS_TOKEN}` }
      });
      
      if (!mlResponse.ok) {
        return new Response('Erro API ML', { status: 502, headers: corsHeaders });
      }

      const payment = await mlResponse.json();
      const productTitle = payment.description || "";
      
      console.log(`[mercadolivre-webhook] Produto vendido: ${productTitle}`);

      // FILTRO: Só processa se o título contiver "Convite Digital"
      // Isso evita que seus produtos físicos gerem tokens de convite
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

        console.log(`[mercadolivre-webhook] ✅ Venda de convite validada para: ${payment.payer.email}`);
      } else if (payment.status === 'approved' && !isInvitation) {
        console.log(`[mercadolivre-webhook] ℹ️ Venda ignorada (Produto físico ou outro): ${productTitle}`);
      }
    }

    return new Response(JSON.stringify({ ok: true }), { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  } catch (e) {
    console.error(`[mercadolivre-webhook] Erro: ${e.message}`);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
})