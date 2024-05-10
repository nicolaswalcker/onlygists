<script lang="ts" setup>
import EditGist from '~/modules/gists/screens/EditGist/EditGist.vue'

useHead({
  title: 'onlygists | Editar gist',
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <EditGist />
</template>
