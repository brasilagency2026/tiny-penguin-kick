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
    console.log("[mercadolivre-webhook] Webhook recebido");
    
    const body = await req.json();
    const { resource, topic } = body;

    if (topic === 'payment') {
      const paymentId = resource.split('/').pop();
      
      const ML_ACCESS_TOKEN = Deno.env.get('ML_ACCESS_TOKEN');
      const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      // Alterado para SITE_URL para ser mais genérico e correto
      const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:8080';

      if (!ML_ACCESS_TOKEN) {
        console.error("[mercadolivre-webhook] ML_ACCESS_TOKEN não configurado");
        return new Response('Erro de configuração', { status: 500, headers: corsHeaders });
      }

      const mlResponse = await fetch(`https://api.mercadolibre.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${ML_ACCESS_TOKEN}` }
      });
      
      if (!mlResponse.ok) {
        console.error("[mercadolivre-webhook] Erro ao consultar API do ML");
        return new Response('Erro API Mercado Livre', { status: 502, headers: corsHeaders });
      }

      const payment = await mlResponse.json();

      if (payment.status === 'approved') {
        const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
        const token = crypto.randomUUID();

        const { error: insertError } = await supabase.from('acessos_ml').insert({
          payment_id: paymentId,
          comprador_email: payment.payer.email,
          comprador_id: payment.payer.id.toString(),
          token: token
        });

        if (insertError) throw insertError;

        const linkCriacao = `${SITE_URL}/criar?token=${token}`;
        console.log(`[mercadolivre-webhook] VENDA APROVADA!`);
        console.log(`[mercadolivre-webhook] Comprador: ${payment.payer.email}`);
        console.log(`[mercadolivre-webhook] Link para enviar ao cliente: ${linkCriacao}`);
      }
    }

    return new Response(JSON.stringify({ ok: true }), { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  } catch (e) {
    console.error(`[mercadolivre-webhook] Erro: ${e.message}`);
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
})