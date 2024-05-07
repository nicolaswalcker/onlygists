<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title: string
    lang: string
    description: string
    author: string
    price: number
  }>(),
  {
    title: 'currency_format.py',
    lang: 'python',
    description: 'Python script to **format** *currency*',
    author: 'nicolaswalcker',
  },
)

const { render } = useMarkdown()

const description = computed(() => render(props.description))
</script>

<template>
  <div class="w-full flex flex-col justify-center gap-2 py-5">
    <div class="flex flex-1 items-center gap-2">
      <h1 class="text-gray-700 font-bold text-2xl md:text-3xl">
        {{ props.title }}
      </h1>
      <Chip class="text-sm" :label="props.lang" icon="pi pi-bolt" />
    </div>
    <div class="text-gray-700 font-regular text-sm md:text-base" v-html="description" />
    <p class="text-gray-500 font-regular text-sm md:text-base">
      <i class="pi pi-star" />
      by
      <NuxtLink class="text-primary-500" :to="`/${props.author}`">
        @{{ props.author }}
      </NuxtLink>
    </p>
  </div>
</template>
