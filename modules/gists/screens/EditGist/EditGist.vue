<script lang="ts" setup>
import CodeEdit from '~/modules/gists/components/CodeEdit/CodeEdit.vue'
import HeadlineEdit from '~/modules/gists/components/HeadlineEdit/HeadlineEdit.vue'
import { useGist } from '~/modules/gists/composables/useGist/useGist'
import { useGistUpdate } from '~/modules/gists/composables/useGistUpdate/useGistUpdate'
import { useGistDelete } from '~/modules/gists/composables/useGistDelete/useGistDelete'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'

const router = useRouter()
const route = useRoute()
const confirm = useConfirm()
const { user } = inject(myselfKey) as MyselfContextProvider

const { gist } = useGist({ id: route.params.id as string })
const {
  loading,
  headline,
  code,
  safeParse,
  update,
  errors,
} = useGistUpdate({ gist })

const { loading: loadingDelete, remove } = useGistDelete({ gist })

function handleLanguageChange(lang: string) {
  code.value.lang = lang
}

function handleDeleteGist() {
  confirm.require({
    header: 'Excluir Gist',
    message: 'Você tem certeza que deseja excluir este gist?',
    rejectLabel: 'Voltar',
    acceptLabel: 'Quero apagar!',
    accept: async () => {
      await remove()
      router.push(`/${user.value?.username}`)
    },
  })
}

async function handleUpdateGist() {
  const isValid = safeParse().success

  if (!isValid)
    return

  const response = await update()

  if (response?.id)
    router.push(`/${user.value?.username}/gist/${response.id}`)
}
</script>

<template>
  <ConfirmDialog />
  <WidgetDefault title="Qual gist você quer criar?" class="my-5">
    <HeadlineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange" />
  </WidgetDefault>
  <WidgetDefault title="Show me the code">
    <ClientOnly>
      <CodeEdit v-model="code" :errors="errors" />
    </ClientOnly>
  </WidgetDefault>

  <div class="flex flex-col md:flex-row gap-2">
    <Button :loading="loading" class="mt-5 w-full md:w-auto" label="Criar" icon="pi pi-plus" icon-pos="right" @click="handleUpdateGist" />
    <Button :loading="loadingDelete" class="mt-5 w-full md:w-auto" label="Excluir" icon="pi pi-trash" icon-pos="right" severity="danger" @click="handleDeleteGist" />
  </div>
</template>
