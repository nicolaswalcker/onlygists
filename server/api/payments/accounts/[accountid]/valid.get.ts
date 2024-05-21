import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const accountid = getRouterParam(event, 'accountid')

  if (!accountid) {
    throw createError({
      status: 400,
      statusMessage: 'accountid is required',
    })
  }

  if (!event.context.auth.isAuthenticated) {
    throw createError({
      status: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const stripe = await useServerStripe(event)
  const account = await stripe.accounts.retrieve(accountid)

  return {
    isValid: account.details_submitted,
  }
})
