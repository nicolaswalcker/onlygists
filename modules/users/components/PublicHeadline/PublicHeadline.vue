<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  avatarUrl: string
  bio?: string
  city?: string
  state?: string
}>(), {
  name: 'Nicolas Walcker',
  avatarUrl: 'https://avatars.githubusercontent.com/u/50677753?v=4',
  bio: 'Software Engineer',
  city: 'Nova Venécia',
  state: 'ES',
})
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center gap-2">
    <div class="w-24 md:w-32 rounded-full overflow-hidden">
      <img class="w-full" :src="props.avatarUrl" :alt="`Foto de perfil de ${props.name}`">
    </div>
    <h1 class="text-gray-700 font-bold text-2xl md:text-3xl text-center">
      {{ props.name }}
    </h1>
    <p v-if="props.bio" class="text-gray-700 text-center font-regular md:text-lg">
      {{ props.bio }}
    </p>
    <p v-if="props.city && props.state" class="text-gray-500 text-center font-regular text-sm md:text-base">
      <i class="pi pi-map-marker" />
      {{ props.city }}, {{ props.state }}
    </p>
  </div>
</template>
