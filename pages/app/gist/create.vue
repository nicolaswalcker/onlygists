<script lang="ts" setup>
import CreateNew from '~/modules/gists/screens/CreateNew/CreateNew.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <CreateNew />
</template>
