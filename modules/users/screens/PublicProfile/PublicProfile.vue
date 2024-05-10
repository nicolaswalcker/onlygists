<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import PublicHeadline from '~/modules/users/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineEmpty from '~/modules/users/components/PublicHeadline/Empty.vue'
import WidgetGroup from '~/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '~/modules/reports/components/Widget/Group/Loader.vue'
import WidgetCondensed from '~/modules/reports/components/Widget/Condensed/Condensed.vue'
import GistCardGroup from '~/modules/gists/components/Card/Group/Group.vue'
import GistCardItem from '~/modules/gists/components/Card/Item/Item.vue'
import GistCardGroupLoader from '~/modules/gists/components/Card/Group/Loader.vue'
import { useGistsReport } from '~/modules/reports/composables/useGistsReport/useGistsReport'
import { useGistsList } from '~/modules/gists/composables/useGistList/useGistList'

const router = useRouter()
const route = useRoute()
const services = useServices()

const { data: user } = await useAsyncData('user-public-profile', () => {
  const username = route.params.username as string
  return services.users.readOneByUsername(username)
})

const {
  gists,
  loading,
  fetchMoreGistsByUsername,
} = useGistsList({ username: route.params.username as string })

const {
  loading: reportLoading,
  totalGists,
  totalFreeGists,
  totalPaidGists,
} = useGistsReport({ user, isMyself: false })

const { arrivedState } = useScroll(window, {
  offset: { bottom: 100 },
})

watch(() => arrivedState.bottom, () => {
  if (!arrivedState.bottom)
    return

  fetchMoreGistsByUsername()
})

function handleNavigationToDetail(id: string) {
  const { username } = route.params

  router.push(`/${username}/gist/${id}`)
}
</script>

<template>
  <PublicHeadline
    v-if="user"
    :avatar-url="user.avatarUrl"
    :bio="user.bio"
    :name="user.name"
    :city="user.address?.city"
    :state="user.address?.state"
    class="my-10"
  />
  <PublicHeadlineEmpty v-else />
  <WidgetGroup v-if="user">
    <WidgetGroupLoader :amount="3" :loading="reportLoading">
      <WidgetCondensed :value="totalGists" label="Gists no total" />
      <WidgetCondensed :value="totalFreeGists" label="Gists gratuitos" />
      <WidgetCondensed :value="totalPaidGists" label="Gists pagos" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault v-if="gists.length !== 0" title="Todos os gists" sub-title="Veja todos os meus gists">
    <GistCardGroup>
      <GistCardGroupLoader :loading="loading">
        <GistCardItem v-for="gist in gists" :id="gist.id" :key="gist.id" :title="gist.title" :description="gist.description" :price="gist.price" :lang="gist.lang" @click="handleNavigationToDetail" />
      </GistCardGroupLoader>
    </GistCardGroup>
  </WidgetDefault>
</template>
