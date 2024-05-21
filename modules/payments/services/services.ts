import type { SupabaseClient } from '@supabase/supabase-js'
import type { AxiosInstance } from 'axios'
import type { ReadAllSalesRow } from './adapters'
import { readAllSalesAdapter } from './adapters'
import type { Database } from '~/libs/supabase/schema'

export default (client: SupabaseClient<Database>, httpClient: AxiosInstance) => ({
  async readAllSales(userId: string) {
    const response = await client.from('sales').select('id, customer_email, created_at, gists(title, profile_id, price)').eq('gists.profile_id', userId).returns<ReadAllSalesRow[]>()

    return readAllSalesAdapter(response.data)
  },

  async createCheckout() {},

  async createPayoutAccount(email: string) {

  },

  async isValidAccount(accountId: string) {
    const response = await httpClient.get<IsAccountValidResponse>(`/payments/accounts/${accountId}/valid`)

    return response
  },
})
