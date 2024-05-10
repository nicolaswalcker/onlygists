<script setup lang="ts">
import PublicProfile from '~/modules/users/screens/PublicProfile/PublicProfile.vue'

useHead({
  title: 'onlygists | Perfil público',
})

definePageMeta({
  layout: 'checkout',
})
</script>

<template>
  <PublicProfile />
</template>
