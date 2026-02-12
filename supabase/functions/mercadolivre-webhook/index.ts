// À déployer sur Supabase Edge Functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ML_ACCESS_TOKEN = Deno.env.get('ML_ACCESS_TOKEN')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const SITE_URL = Deno.env.get('NEXT_PUBLIC_SITE_URL')

serve(async (req) => {
  try {
    const { resource, topic } = await req.json()

    if (topic === 'payment') {
      const paymentId = resource.split('/').pop()
      
      // 1. Vérifier le paiement chez Mercado Livre
      const mlResponse = await fetch(`https://api.mercadolibre.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${ML_ACCESS_TOKEN}` }
      })
      const payment = await mlResponse.json()

      if (payment.status === 'approved') {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        const token = crypto.randomUUID()

        // 2. Sauvegarder le token
        await supabase.from('acessos_ml').insert({
          payment_id: paymentId,
          comprador_email: payment.payer.email,
          comprador_id: payment.payer.id.toString(),
          token: token
        })

        // 3. Envoyer le message automatique sur ML
        // Note: L'envoi de message nécessite l'ID de la commande (order_id)
        const message = `Olá! Seu pagamento foi aprovado 🎉\n\nAcesse seu convite exclusivo aqui:\n${SITE_URL}/criar?token=${token}`
        
        // Logique d'envoi de message ML ici...
        console.log('Token gerado:', token)
      }
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
})