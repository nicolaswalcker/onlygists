import type { SupabaseClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import type { CreateOptions, ReadAllOptions, UpdateOptions } from './types'
import { type ReadAllRow, type ReadOneRow, readAllAdapter, readOneAdapter } from './adapters'
import type { Database } from '@/libs/supabase/schema'

export default (client: SupabaseClient<Database>) => ({

  async readAll({ username, from = 0, to = 10 }: ReadAllOptions) {
    const [totalResponse, gistsResponse] = await Promise.all([
      client.from('gists').select('profiles!inner(id, username)', { count: 'exact' }).eq('profiles.username', username),
      client.from('gists').select('id, title, description, lang, price, is_paid, created_at, profiles!inner(id, username)').eq('profiles.username', username).order('created_at', { ascending: true }).range(from, to).returns<ReadAllRow[]>(),
    ])

    return {
      total: totalResponse.count ?? 0,
      results: readAllAdapter(gistsResponse.data),
    }
  },

  async create({ title, description, price, content, lang, profileId }: CreateOptions) {
    const id = uuidv4()
    const isPaid = price !== 0

    await client.from('gists').insert({
      id,
      title,
      description,
      price,
      content,
      lang,
      profile_id: profileId,
      is_paid: isPaid,
    })

    return { id }
  },

  async readOne(id: string) {
    const response = await client.from('gists').select('id, title, description, lang, price, is_paid, profiles (id, username)').match({ id }).returns<ReadOneRow>().single()

    return readOneAdapter(response.data)
  },

  async readOneContent(id: string) {
    const response = await client.from('gists').select('id, content').match({ id }).returns<ReadOneRow>().single()

    return readOneAdapter(response.data)
  },

  async update(id: string, { title, description, price, content, lang }: UpdateOptions) {
    const isPaid = price !== 0

    await client.from('gists').update({
      title,
      description,
      price,
      content,
      lang,
      is_paid: isPaid,
    }).match({ id })

    return { id }
  },

  async delete(id: string) {
    await client.from('gists').delete().match({ id })

    return { id }
  },
})
