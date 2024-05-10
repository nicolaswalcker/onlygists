<script lang="ts" setup>
import OAuthRedirect from '~/modules/auth/screens/OAuthRedirect/OAuthRedirect.vue'

useHead({
  title: 'onlygists | Redirecionamento',
})

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <OAuthRedirect />
</template>
