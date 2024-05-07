<script lang="ts" setup>
const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<(e: 'wants-login-with-github') => void>()
</script>

<template>
  <div class="flex flex-col gap-2 items-center justify-center bg-gray-50 rounded p-6">
    <h2 class="text-gray-700 font-regular">
      Entre com a sua conta
    </h2>
    <Button :loading="props.loading" label="Continuar com o GitHub" icon-pos="right" icon="pi pi-github" @click="() => emit('wants-login-with-github')" />
  </div>
</template>
