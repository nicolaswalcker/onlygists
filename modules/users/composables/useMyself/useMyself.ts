import type { InjectionKey } from 'vue'
import type { MyselfContextProvider } from './types'
import type { User } from '~/modules/users/entities/User/User'
import { useSession } from '~/modules/auth/composables/useSession/useSession'

export const myselfKey = Symbol('myself') as InjectionKey<MyselfContextProvider>
export function useMyself() {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const session = useSession()
  const loading = ref(true)
  const user = ref<User>()

  provide<MyselfContextProvider>(myselfKey, { user, loading })

  const fetchUser = async () => {
    loading.value = true

    try {
      // eslint-disable-next-line ts/no-non-null-asserted-optional-chain
      const response = await services.users.getMyself(session.user.value?.id!)
      if (!response)
        return

      user.value = response
    }
    catch (e) {
      logAndTrack(e)
    }
    finally {
      loading.value = false
    }
  }

  onMounted(fetchUser)

  return {
    loading,
    user,
  }
}
