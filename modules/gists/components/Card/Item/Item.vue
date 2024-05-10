<script lang="ts" setup>
const props = withDefaults(defineProps<{
  id: string
  title: string
  description: string
  price: number
  lang: string
}>(), {
  id: '123',
  title: 'useCurrentUser.ts',
  description: 'Hook para controlar **usuário** atual',
  price: 10,
  lang: 'typescript',
})
const emit = defineEmits<(e: 'click', id: string) => void>()
const { render } = useMarkdown()
const isFree = computed(() => props.price === 0)

const description = computed(() => {
  return render(props.description)
})

const amount = computed(() => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(props.price).replace(' ', '')
})

function handleClick() {
  emit('click', props.id)
}
</script>

<template>
  <div class="card">
    <Card class="overflow-hidden">
      <template #title>
        <div class="flex flex-wrap gap-2">
          {{ props.title }}
          <Chip class="text-sm" :label="props.lang" icon="pi pi-bolt" />
        </div>
      </template>
      <template #content>
        <div class="line-clamp-2" v-html="description" />
      </template>
      <template #footer>
        <Button v-if="isFree" label="Baixar gratuitamente" class="w-full" icon-pos="right" icon="pi pi-shopping-bag" @click="handleClick" />
        <Button v-else :label="`Comprar por ${amount}`" class="w-full" icon-pos="right" icon="pi pi-shopping-bag" @click="handleClick" />
      </template>
    </Card>
  </div>
</template>
