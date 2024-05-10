<script lang="ts" setup>
import Sales from '~/modules/payments/screens/Sales/Sales.vue'

useHead({
  title: 'onlygists | Minhas vendas',
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <Sales />
</template>
