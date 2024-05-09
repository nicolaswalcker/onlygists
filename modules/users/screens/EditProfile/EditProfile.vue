<script lang="ts" setup>
import HeadlineEdit from '~/modules/users/components/HeadlineEdit/HeadlineEdit.vue'
import HeadlineEditLoader from '~/modules/users/components/HeadlineEdit/Loader.vue'
import AddressForm from '~/modules/users/components/AddressForm/AddressForm.vue'
import { useUserProfileActions } from '~/modules/users/composables/useUserProfileActions/useUserProfileActions'
import { useUserUpdate } from '~/modules/users/composables/useUserUpdate/useUserUpdate'
import { useAdressUpdate } from '~/modules/users/composables/useAddressUpdate/useAddressUpdate'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'
import BasicInfoForm from '~/modules/users/components/BasicInfoForm/BasicInfoForm.vue'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'

const { user, loading } = inject(myselfKey) as MyselfContextProvider
const { loading: addressLoading, searchZipCode, address } = useAdressUpdate({
  user,
})

const {
  loading: updateLoading,
  safeParse,
  update,
  errors,
} = useUserUpdate({
  user,
})
const router = useRouter()
const { share } = useUserProfileActions()
function handleShare(username: string) {
  share(username)
}

function handleUpdateProfile() {
  const isValid = safeParse().success

  if (!isValid || !user.value)
    return

  user.value.address = address.value

  update()
}

function handleZipCodeSearch() {
  searchZipCode()
}

function handleNavigateToProfile(username: string) {
  router.push(`/${username}`)
}
</script>

<template>
  <HeadlineEditLoader :loading="loading">
    <HeadlineEdit class="my-10" :username="user?.username!" :avatar-url="user?.avatarUrl!" @share="handleShare" @navigate-to-profile="handleNavigateToProfile" />
  </HeadlineEditLoader>
  <WidgetDefault title="Informações básicas">
    <BasicInfoForm v-model="user" :errors="errors" />
  </WidgetDefault>
  <WidgetDefault title="Endereço" class="mt-5">
    <AddressForm v-model="address" :loading="addressLoading" @trigger-address-search="handleZipCodeSearch()" />
  </WidgetDefault>

  <Button :loading="updateLoading" class="w-full mt-5 md:auto" label="Atualizar" icon="pi pi-pencil" icon-pos="right" @click="handleUpdateProfile" />
</template>
