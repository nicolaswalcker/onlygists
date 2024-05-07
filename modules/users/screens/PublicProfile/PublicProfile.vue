<script setup lang="ts">
import PublicHeadline from '~/modules/users/components/PublicHeadline/PublicHeadline.vue'
import WidgetGroup from '~/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '~/modules/reports/components/Widget/Group/Loader.vue'
import WidgetCondensed from '~/modules/reports/components/Widget/Condensed/Condensed.vue'
import GistCardGroup from '~/modules/gists/components/Card/Group/Group.vue'
import GistCardItem from '~/modules/gists/components/Card/Item/Item.vue'
import GistCardGroupLoader from '~/modules/gists/components/Card/Group/Loader.vue'

const router = useRouter()
const route = useRoute()

function handleNavigationToDetail(id: string) {
  const { username } = route.params

  router.push(`/${username}/gist/${id}`)
}
</script>

<template>
  <PublicHeadline />
  <WidgetGroup>
    <WidgetGroupLoader :amount="3" :loading="false">
      <WidgetCondensed :value="10" label="Gists no total" />
      <WidgetCondensed :value="5" label="Gists gratuitos" />
      <WidgetCondensed :value="5" label="Gists pagos" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os gists" sub-title="Veja todos os meus gists">
    <GistCardGroup>
      <GistCardGroupLoader :loading="true">
        <GistCardItem id="123" title="useCurrentUser.ts" description="Hook para conrolar a store do **usuário**" :price="10" lang="typescript" @click="handleNavigationToDetail" />
      </GistCardGroupLoader>
    </GistCardGroup>
  </WidgetDefault>
</template>
