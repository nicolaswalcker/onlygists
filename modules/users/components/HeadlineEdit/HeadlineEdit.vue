<script lang="ts" setup>
const props = defineProps<{
  username: string
  avatarUrl: string
}>()

const emit = defineEmits<{
  (e: 'share', username: string): void
  (e: 'navigate-to-profile', username: string): void
}>()
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center gap-2">
    <div class="w-24 md:w-32 rounded-full overflow-hidden">
      <img class="w-full" :src="props.avatarUrl" alt="foto de perfil do usuário">
    </div>
    <h1 class="text-gray-700 font-bold text-2xl md:text-3xl">
      @{{ props.username }}
    </h1>

    <div class="flex gap-2 mt-2">
      <Button label="Ver perfil" size="small" icon="pi pi-star" icon-pos="right" @click="() => emit('navigate-to-profile', props.username)" />
      <Button severity="info" label="Compartilhar" size="small" icon="pi pi-share-alt" icon-pos="right" @click="() => emit('share', props.username)" />
    </div>
  </div>
</template>
