import type { SupabaseClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import type { CreateOptions } from './types'
import type { Database } from '@/libs/supabase/schema'

export default (client: SupabaseClient<Database>) => ({

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
})
