<script lang="ts" setup>
import type { ZodFormattedError } from 'zod'
import CodeEdit from '~/modules/gists/components/CodeEdit/CodeEdit.vue'
import HeadlineEdit from '~/modules/gists/components/HeadlineEdit/HeadlineEdit.vue'
import { useGistCreate } from '~/modules/gists/composables/useGistCreate/useGistCreate'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'

const router = useRouter()
const { user } = inject(myselfKey) as MyselfContextProvider
const {
  loading,
  headline,
  code,
  safeParse,
  create,
  errors,
} = useGistCreate({ user })

function handleLanguageChange(lang: string) {
  code.value.lang = lang
}

async function handleCreateGist() {
  const isValid = safeParse().success

  if (!isValid)
    return

  const response = await create()

  if (response?.id)
    router.push(`/${user.value?.username}/gist/${response.id}`)
}
</script>

<template>
  <WidgetDefault title="Qual gist você quer criar?" class="my-5">
    <HeadlineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange" />
  </WidgetDefault>
  <WidgetDefault title="Show me the code">
    <ClientOnly>
      <CodeEdit v-model="code" :errors="errors" />
    </ClientOnly>
  </WidgetDefault>

  <Button :loading="loading" class="mt-5 w-full md:auto" label="Criar" icon="pi pi-plus" icon-pos="right" @click="handleCreateGist" />
</template>
