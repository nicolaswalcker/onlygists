import type { GistVirtual } from '~/modules/gists/entities/Gist/Gist'
import type { Database } from '~/libs/supabase/schema'

type ProfileTable = Database['public']['Tables']['profiles']
type GistTable = Database['public']['Tables']['gists']

export type ReadOneRow = GistTable['Row'] & {
  profiles: ProfileTable['Row'] | null
}

export function readOneAdapter(data: ReadOneRow | null): GistVirtual | null {
  if (!data)
    return null

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    lang: data.lang,
    price: data.price,
    isPaid: data.is_paid,
    profileId: data.profile_id ?? '',
    profiles: {
      id: data.profiles?.id ?? '',
      username: data.profiles?.username ?? '',
      name: data.profiles?.name ?? '',
    },
    content: data.content,
    createdAt: data.created_at ? new Date(data.created_at) : new Date(),
  }
}

export type ReadAllRow = GistTable['Row'] & {
  profiles: ProfileTable['Row'] | null
}

export function readAllAdapter(values: ReadAllRow[] | null): GistVirtual[] {
  if (!values)
    return []
  const newValues = values.map(data => ({
    id: data.id,
    title: data.title,
    description: data.description,
    lang: data.lang,
    price: data.price,
    isPaid: data.is_paid,
    profileId: data.profile_id ?? '',
    profiles: {
      id: data.profiles?.id,
      username: data.profiles?.username,
    },
    content: data.content,
    createdAt: new Date(data.created_at),
  }))

  return newValues
}
