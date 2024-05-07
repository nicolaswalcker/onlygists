<script lang="ts" setup>
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading" class="flex flex-col gap-2 py-8 w-full">
    <Skeleton width="100%" height="20rem" />
  </div>
  <slot v-else />
</template>
