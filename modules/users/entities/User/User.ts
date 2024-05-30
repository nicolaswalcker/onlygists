import type { Address } from '~/modules/users/entities/Address/Address'

export interface User {
  id: string
  email: string
  username: string
  name: string
  avatarUrl: string
  site?: string
  bio?: string
  phone?: string
  address: Address
  createdAt: Date
  paymentConnectedAccount: string
}
