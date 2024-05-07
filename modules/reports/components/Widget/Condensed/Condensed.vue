<script lang="ts" setup>
const props = defineProps<{
  value: string | number
  label: string
}>()
</script>

<template>
  <div class="flex flex-1 flex-col bg-white p-5 rounded-xl">
    <span class="text-4xl text-primary-500 font-bold">{{ props.value }}</span>
    <p class="text-lg text-gray-700">
      {{ props.label }}
    </p>
  </div>
</template>
