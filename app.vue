<script setup lang="ts">
const colorMode = useColorMode()

colorMode.preference = 'light'

useHead({
  title: 'onlygists',
})

useSeoMeta({
  title: 'onlygists - Compartilhe trechos de código',
  ogTitle: 'onlygists - Compartilhe trechos de código',
  description: 'Compartilhe trechos de código',
  ogDescription: 'Compartilhe trechos de código',
})
</script>

<template>
  <NuxtLayout>
    <Toast />
    <NuxtPage />
  </NuxtLayout>
</template>
