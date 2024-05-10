<script lang="ts" setup>
const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center bg-[#5B73AA]">
    <h1 class="font-bold text-6xl text-white text-center">
      {{ props.title }}
    </h1>
    <p class="text-white font-normal text-center text-4xl -mt-3">
      {{ props.description }}
    </p>
  </div>
</template>
