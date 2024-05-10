import { applyPayoutFeesToGrossValue } from '~/modules/payments/entities/Sale/Sale'

interface UseSalesReportOptions {
  userId: string
}

export function useSalesReport({ userId }: UseSalesReportOptions) {
  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref<boolean>(false)
  const grossRevenue = ref<number>(0)
  const netRevenue = ref<number>(0)

  const fetchRevenue = async () => {
    loading.value = true
    try {
      if (!userId)
        return
      const total = await services.reports.totalRevenue(userId)

      grossRevenue.value = total ?? 0
      netRevenue.value = total === 0 ? 0 : applyPayoutFeesToGrossValue(grossRevenue.value ?? 0)
    }
    catch (error) {
      logAndTrack(error)
    }
    finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchRevenue()
  })

  return {
    loading,
    grossRevenue,
    netRevenue,
  }
}
