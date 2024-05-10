<script lang="ts" setup>
import EditProfile from '~/modules/users/screens/EditProfile/EditProfile.vue'

useHead({
  title: 'onlygists | Editar perfil',
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <EditProfile />
</template>
