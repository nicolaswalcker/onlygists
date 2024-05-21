import { zh } from 'h3-zod'
import z from 'zod'
import { useServerStripe } from '#stripe/server'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/libs/supabase/schema'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body = await zh.useSafeValidatedBody(
    event,
    z.object({
      username: z.string(),
      gistId: z.string(),
      // * TODO: pensar em como nao mandar o price no body da requisição
      price: z.string(),
    }),
  )

  if (!body.success) {
    throw createError({
      status: 400,
      statusMessage: body.error.message,
    })
  }

  const { price, username, gistId } = body.data

  const prices: Record<string, string> = {
    5: config.stripeProductId5BRL,
    10: '',
    25: '',
  }

  const allowedGistPrices = Object.keys(prices)

  if (!allowedGistPrices.includes(price)) {
    throw createError({
      status: 400,
      statusMessage: 'Invalid price',
    })
  }

  const stripe = await useServerStripe(event)
  const supabase = await serverSupabaseClient<Database>(event)

  const response = await supabase.from('profiles').select('payment_connected_account').eq('username', username).maybeSingle()

  if (!response.data) {
    throw createError({
      status: 404,
      statusMessage: 'Profile not found',
    })
  }

  if (!response.data.payment_connected_account) {
    throw createError({
      status: 422,
      statusMessage: 'Payment not connected',
    })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: prices[price],
        quantity: 1,
      },
    ],
    payment_intent_data: {
      transfer_data: {
        destination: response.data.payment_connected_account,
        amount: Math.round(Number(price) * 100),
      },
    },
    client_reference_id: gistId,
    success_url: `${config.public.siteUrl}/${username}/gist/${gistId}?success_payment=t`,
    cancel_url: `${config.public.siteUrl}/${username}/gist/${gistId}?fail_payment=t`,
  })

  return {
    id: session.id,
    checkoutUrl: session.url,
  }
})
