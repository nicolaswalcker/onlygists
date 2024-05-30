<script lang="ts" setup>
import PublicHeadline from '~/modules/gists/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineLoader from '~/modules/gists/components/PublicHeadline/Loader.vue'
import PublicHeadlineEmpty from '~/modules/gists/components/PublicHeadline/Empty.vue'
import GistCodeSnippet from '~/modules/gists/components/CodeSnippet/CodeSnippet.vue'
import LazyDialogPaymentSuccess from '~/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue'
import LazyDialogPaymentError from '~/modules/payments/components/DialogPaymentError/DialogPaymentError.vue'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'
import { useSession } from '~/modules/auth/composables/useSession/useSession'
import { useGistContent } from '~/modules/gists/composables/useGistContent/useGistContent'
import { useStripeCheckout } from '~/modules/payments/composables/useStripeCheckout/useStripeCheckout'
import { currencyFormatBRL } from '~/libs/currency/format'

const { user } = inject(myselfKey) as MyselfContextProvider
const session = useSession()

const {
  checkoutUrl,
  createCheckoutUrl,
} = useStripeCheckout()

const isPaymentSuccessfully = ref(false)
const isPaymentFail = ref(false)
const router = useRouter()
const route = useRoute()
const services = useServices()

onMounted(() => {
  const { success_payment, fail_payment } = route.query

  if (success_payment)
    isPaymentSuccessfully.value = true
  if (fail_payment)
    isPaymentFail.value = true
})

const gistId = route.params.id as string
const { data: gist, pending: loading } = await useAsyncData('gist-detail', () => {
  return services.gists.readOne(gistId)
})

const { gistContent, loading: loadingContent } = useGistContent({ gist })

function handleNavigateToGistEdit() {
  router.push(`/app/gist/${route.params.id}/edit`)
}

async function handlePay() {
  await createCheckoutUrl({
    username: route.params.username as string,
    gistId: route.params.id as string,
    price: String(gist.value?.price),
  })

  if (!checkoutUrl.value)
    return

  window.location.href = checkoutUrl.value
}

defineOgImage({
  component: 'GistDetail',
  props: {
    title: `${gist.value?.title} by @${gist.value?.profiles.username}`,
    description: `Veja o gist de ${gist.value?.profiles.name} no onlygists.`,
  },
})

useSeoMeta({
  title: `${gist.value?.title} by @${gist.value?.profiles.username}`,
  ogTitle: `${gist.value?.title} by @${gist.value?.profiles.username}`,
  description: `Veja o gist de ${gist.value?.profiles.name} no onlygists.`,
  ogDescription: `Veja o gist de ${gist.value?.profiles.name} no onlygists.`,
})
</script>

<template>
  <PublicHeadlineLoader :loading="loading">
    <PublicHeadline
      v-if="gist"
      :title="gist.title"
      :description="gist.description"
      :author="gist.profiles.username"
      :lang="gist.lang"
      :price="gist.price"
    />
    <PublicHeadlineEmpty v-else />
  </PublicHeadlineLoader>
  <template v-if="gist">
    <GistCodeSnippet :is-paid="gist.isPaid" :loading="loadingContent" :lang="gist.lang" :code="gistContent" />
    <div class="flex flex-col md:flex-row">
      <Button
        v-if="gist && user?.username !== route.params.username" :label="`Comprar por ${currencyFormatBRL(gist.price)}`"
        class="mt-5 w-full md:w-auto"
        icon-pos="right"
        icon="pi pi-shopping-bag"
        @click="handlePay"
      />
      <Button v-if="session.isLogged() && user?.username === route.params.username" label="Editar este gist" class="mt-5 w-full md:w-auto" icon-pos="right" icon="pi pi-pencil" @click="handleNavigateToGistEdit()" />
    </div>
  </template>
  <LazyDialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
  <LazyDialogPaymentError v-model:visible="isPaymentFail" />
</template>
