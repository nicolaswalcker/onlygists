import type { Database } from '~/libs/supabase/schema'
import type { SaleVirtual } from '~/modules/payments/entities/Sale/Sale'

type SalesTable = Database['public']['Tables']['sales']
type GistsTable = Database['public']['Tables']['gists']

export type ReadAllSalesRow = SalesTable['Row'] & {
  gists: GistsTable['Row'] | null
}

export function readAllSalesAdapter(values: ReadAllSalesRow[] | null): SaleVirtual[] {
  if (!values)
    return []

  const newValues = values.map((data) => {
    return {
      id: data.id,
      gist_id: data.gist_id ?? '',
      custommerEmail: data.customer_email ?? '',
      gists: {
        title: data.gists?.title ?? '',
        price: data.gists?.price ?? 0,
      },
      createdAt: new Date(data.created_at),
    }
  })

  return newValues
}
