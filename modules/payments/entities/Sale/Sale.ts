import type { Gist } from '~/modules/gists/entities/Gist/Gist'

export interface Sale {
  id: string
  gist_id: string
  custommerEmail: string
  createdAt: Date
}

export interface SaleVirtual extends Sale {
  gists: Partial<Gist>
}

export function applyPayoutFeesToGrossValue(grossValue: number): number {
  const STRIPE_TRANSFER_TAX = 0.0025
  const FIXED_STRIPE_TRANSFER_TAX = 7

  const fee = grossValue * STRIPE_TRANSFER_TAX
  const totalValue = grossValue - fee
  const netValue = totalValue - FIXED_STRIPE_TRANSFER_TAX

  if (netValue <= 0)
    return 0

  return netValue
}
