<script lang="ts" setup>
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <header v-if="props.loading" class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex items-center justify-between mx-auto max-w-screen-xl">
        <div class="flex items-center">
          <NuxtLink class="active:scale-95 transition-transform" to="/app/panel">
            <Logo />
          </NuxtLink>
        </div>
        <div class="flex gap-2 items-center">
          <Skeleton width="7rem" height="2rem" />
          <Skeleton shape="circle" size="2rem" />
        </div>
      </div>
    </nav>
  </header>
  <slot v-else />
</template>
