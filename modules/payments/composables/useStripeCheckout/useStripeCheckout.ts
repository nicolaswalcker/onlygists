import type { CreateCheckoutOptions } from '~/modules/payments/services/types'

export function useStripeCheckout() {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const checkoutUrl = ref<string>()

  const createCheckoutUrl = async ({ username, gistId, price }: CreateCheckoutOptions) => {
    try {
      const response = await services.payments.createCheckout({
        username,
        gistId,
        price,
      })
      checkoutUrl.value = response.data.checkoutUrl
    }
    catch (error) {
      logAndTrack(error)
    }
  }

  return {
    createCheckoutUrl,
    checkoutUrl,
  }
}
