<script lang="ts" setup>
import { common, createStarryNight } from '@wooorm/starry-night'
import { toHtml } from 'hast-util-to-html'
import '@wooorm/starry-night/style/light'
import Loader from './Loader.vue'

const props = withDefaults(defineProps<{
  code: string
  isPaid: boolean
  loading: boolean
  lang: string
}>(), {
  isPaid: true,
  loading: false,
  lang: 'typescript',
  code: `
const message = 'Voce precisa pagar para ter acesso ao conteudo :P'
console.log(message)
`,
})

const loading = ref(false)
const code = ref('')

async function registerSyntaxHighlighting() {
  loading.value = true
  const starryNight = await createStarryNight(common)
  const scope = starryNight.flagToScope(props.lang)
  const tree = starryNight.highlight(props.code, scope!)

  code.value = toHtml(tree)
  loading.value = false
}

onMounted(() => {
  registerSyntaxHighlighting()
})
</script>

<template>
  <Loader :loading="props.loading || loading">
    <div v-if="props.isPaid" class="w-full relative group">
      <span class="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <i class="pi pi-lock text-4xl group-hover:animate-ping" />
      </span>
      <pre :class="{ 'blur-md': props.isPaid }" class="w-full select-none bg-gray-200 rounded p-5 overflow-x-hidden" v-html="code" />
    </div>
    <pre v-else class="w-full select-none bg-gray-200 rounded p-5 overflow-x-auto" v-html="code" />
  </Loader>
</template>
