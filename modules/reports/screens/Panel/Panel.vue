<script lang="ts" setup>
import { useScroll } from '@vueuse/core'
import WidgetGroup from '~/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '~/modules/reports/components/Widget/Group/Loader.vue'
import WidgetCondensed from '~/modules/reports/components/Widget/Condensed/Condensed.vue'
import GistCardGroup from '~/modules/gists/components/Card/Group/Group.vue'
import GistCardItem from '~/modules/gists/components/Card/Item/Item.vue'
import GistCardGroupLoader from '~/modules/gists/components/Card/Group/Loader.vue'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'
import { useGistsReport } from '~/modules/reports/composables/useGistsReport/useGistsReport'
import { useGistsList } from '~/modules/gists/composables/useGistList/useGistList'

const { user } = inject(myselfKey) as MyselfContextProvider
const router = useRouter()
const { arrivedState } = useScroll(window, {
  offset: { bottom: 100 },
})

const {
  loading: reportLoading,
  totalGists,
  totalFreeGists,
  totalPaidGists,
  totalSoldGists,
} = useGistsReport({ user, isMyself: true })
const {
  gists,
  loading,
  fetchMoreGistsByUsername,
} = useGistsList({ username: user.value?.username as string })

watch(() => arrivedState.bottom, () => {
  if (!arrivedState.bottom)
    return

  fetchMoreGistsByUsername()
})

function handleNavigationToDetail(id: string) {
  router.push(`/${user.value?.username}/gist/${id}`)
}
</script>

<template>
  <WidgetGroup>
    <WidgetGroupLoader :amount="3" :loading="reportLoading">
      <WidgetCondensed :value="totalGists" label="Gists no total" />
      <WidgetCondensed :value="totalFreeGists" label="Gists gratuitos" />
      <WidgetCondensed :value="totalPaidGists" label="Gists pagos" />
      <WidgetCondensed :value="totalSoldGists" label="Gists vendidos" />
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
