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
    console.log("[mercadolivre-webhook] Notification reçue:", JSON.stringify(body));
    
    const { resource, topic, action } = body;

    // Mercado Livre peut envoyer 'payment' ou 'payment.updated' selon la version de l'API
    if (topic === 'payment' || action === 'payment.created' || action === 'payment.updated') {
      const paymentId = resource ? resource.split('/').pop() : body.data?.id;
      
      if (!paymentId) {
        console.error("[mercadolivre-webhook] ID de paiement introuvable dans le body");
        return new Response('ID introuvable', { status: 400, headers: corsHeaders });
      }

      const ML_ACCESS_TOKEN = Deno.env.get('ML_ACCESS_TOKEN');
      const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:8080';

      if (!ML_ACCESS_TOKEN) {
        console.error("[mercadolivre-webhook] ML_ACCESS_TOKEN non configuré dans les secrets Supabase");
        return new Response('Erreur config', { status: 500, headers: corsHeaders });
      }

      console.log(`[mercadolivre-webhook] Vérification du paiement ${paymentId}...`);

      const mlResponse = await fetch(`https://api.mercadolibre.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${ML_ACCESS_TOKEN}` }
      });
      
      if (!mlResponse.ok) {
        const errorText = await mlResponse.text();
        console.error(`[mercadolivre-webhook] Erreur API ML (${mlResponse.status}): ${errorText}`);
        return new Response('Erreur API ML', { status: 502, headers: corsHeaders });
      }

      const payment = await mlResponse.json();
      console.log(`[mercadolivre-webhook] Statut du paiement: ${payment.status}`);

      if (payment.status === 'approved') {
        const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
        
        // Vérifier si on n'a pas déjà traité ce paiement
        const { data: existing } = await supabase
          .from('acessos_ml')
          .select('id')
          .eq('payment_id', paymentId.toString())
          .maybeSingle();

        if (existing) {
          console.log(`[mercadolivre-webhook] Paiement ${paymentId} déjà traité.`);
          return new Response(JSON.stringify({ ok: true, message: 'Déjà traité' }), { status: 200, headers: corsHeaders });
        }

        const token = crypto.randomUUID();
        const { error: insertError } = await supabase.from('acessos_ml').insert({
          payment_id: paymentId.toString(),
          comprador_email: payment.payer.email,
          comprador_id: payment.payer.id?.toString(),
          token: token
        });

        if (insertError) throw insertError;

        const linkCriacao = `${SITE_URL}/criar?token=${token}`;
        console.log(`[mercadolivre-webhook] ✅ VENTE VALIDÉE !`);
        console.log(`[mercadolivre-webhook] Client: ${payment.payer.email}`);
        console.log(`[mercadolivre-webhook] Lien de création: ${linkCriacao}`);
      }
    }

    return new Response(JSON.stringify({ ok: true }), { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  } catch (e) {
    console.error(`[mercadolivre-webhook] Erreur critique: ${e.message}`);
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
})