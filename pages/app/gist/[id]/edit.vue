<script lang="ts" setup>
import EditGist from '~/modules/gists/screens/EditGist/EditGist.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <EditGist />
</template>
