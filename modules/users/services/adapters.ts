import type { SearchAdressResponse } from './types'
import type { User } from '~/modules/users/entities/User/User'
import type { Database } from '~/libs/supabase/schema'
import type { Address } from '~/modules/users/entities/Address/Address'

type ProfileTable = Database['public']['Tables']['profiles']
type Row = ProfileTable['Row']

export function readOneByUsernameAdapter(data: Row | null): User | null {
  if (!data)
    return null

  const address = data.address as unknown as Address

  return {
    id: data.id,
    email: data.email,
    username: data.username,
    name: data.name,
    avatarUrl: data.avatar_url,
    site: data.site ?? undefined,
    bio: data.bio ?? undefined,
    phone: data.phone ?? undefined,
    address,
    createdAt: new Date(data.created_at),
  }
}

export function searchAddressByZipCodeAdapter(data: SearchAdressResponse): Address {
  return {
    zipCode: data.cep,
    state: data.uf,
    city: data.localidade,
    street: data.logradouro,
    neighborhood: data.bairro,
    complement: data.complemento,
    number: '',
  }
}

export function getMyselfAdapter(data: Row | null): User | null {
  if (!data)
    return null
  const address = data.address as unknown as Address

  return {
    id: data.id,
    email: data.email,
    username: data.username,
    name: data.name,
    avatarUrl: data.avatar_url,
    site: data.site ?? undefined,
    bio: data.bio ?? undefined,
    phone: data.phone ?? undefined,
    address,
    createdAt: new Date(data.created_at),
  }
}
