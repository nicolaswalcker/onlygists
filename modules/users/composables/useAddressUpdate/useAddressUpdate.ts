import type { User } from '~/modules/users/entities/User/User'
import type { Address } from '~/modules/users/entities/Address/Address'

interface UserAdressUpdateOptions {
  user: Ref<User | undefined>
}

const INITIAL_ADDRESS_INFO = {
  zipCode: '',
  state: '',
  city: '',
  street: '',
  neighborhood: '',
  complement: '',
  number: '',
}

export function useAdressUpdate({ user }: UserAdressUpdateOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const loading = ref(false)

  const address = ref<Address>(INITIAL_ADDRESS_INFO)

  const searchZipCode = async () => {
    if (!address.value.zipCode)
      return

    loading.value = true

    try {
      const response = await services.users.searchAddressByZipCode(address.value.zipCode)

      address.value = response.data
    }
    catch (error) {
      logAndTrack(error)
    }
    finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!user.value)
      return
    address.value = user.value.address ?? INITIAL_ADDRESS_INFO
  })

  return {
    loading,
    address,
    searchZipCode,
  }
}
