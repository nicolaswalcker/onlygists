<script setup lang="ts">
import PublicHeadline from '~/modules/users/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineEmpty from '~/modules/users/components/PublicHeadline/Empty.vue'
import WidgetGroup from '~/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '~/modules/reports/components/Widget/Group/Loader.vue'
import WidgetCondensed from '~/modules/reports/components/Widget/Condensed/Condensed.vue'
import GistCardGroup from '~/modules/gists/components/Card/Group/Group.vue'
import GistCardItem from '~/modules/gists/components/Card/Item/Item.vue'
import GistCardGroupLoader from '~/modules/gists/components/Card/Group/Loader.vue'

const router = useRouter()
const route = useRoute()
const services = useServices()

const { data: user } = await useAsyncData('user-public-profile', () => {
  const username = route.params.username as string
  return services.users.readOneByUsername(username)
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
  <WidgetGroup>
    <WidgetGroupLoader :amount="3" :loading="false">
      <WidgetCondensed :value="10" label="Gists no total" />
      <WidgetCondensed :value="5" label="Gists gratuitos" />
      <WidgetCondensed :value="5" label="Gists pagos" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os gists" sub-title="Veja todos os meus gists">
    <GistCardGroup>
      <GistCardGroupLoader :loading="false">
        <GistCardItem id="123" title="useCurrentUser.ts" description="Hook para conrolar a store do **usuário**" :price="10" lang="typescript" @click="handleNavigationToDetail" />
      </GistCardGroupLoader>
    </GistCardGroup>
  </WidgetDefault>
</template>
