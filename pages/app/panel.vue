<script lang="ts" setup>
import Panel from '~/modules/reports/screens/Panel/Panel.vue'

useHead({
  title: 'onlygists | Painel',
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <Panel />
</template>
