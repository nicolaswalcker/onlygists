<script lang="ts" setup>
import CreateNew from '~/modules/gists/screens/CreateNew/CreateNew.vue'

useHead({
  title: 'onlygists | Criar novo gist',
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <CreateNew />
</template>
