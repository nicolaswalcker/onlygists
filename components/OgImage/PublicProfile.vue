<script lang="ts" setup>
const props = defineProps<{
  author: string
  bio: string
  avatarUrl: string
}>()
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center bg-[#5B73AA]">
    <img
      class="rounded-full"
      :src="props.avatarUrl"
      alt="Avatar"
      width="170"
      height="170"
    >
    <h1 class="font-bold text-6xl text-white text-center">
      {{ props.author }}
    </h1>
    <p class="text-white font-normal text-center text-4xl -mt-3">
      {{ props.bio }}
    </p>
  </div>
</template>
