<script setup lang="ts">
import Header from '~/modules/landing-page/components/Header/Header.vue'
import Hero from '~/modules/landing-page/components/Hero/Hero.vue'

const router = useRouter()

function handleLogin() {
  router.push('/auth/login')
}

defineOgImage({
  component: 'Main',
  props: {
    title: 'onlygists',
    description: 'Compartilhe e monetize trechos de código.',
  },
})
</script>

<template>
  <MainContent>
    <template #header>
      <Header @wants-be-creator="handleLogin" />
    </template>
    <template #content>
      <Hero @wants-be-creator="handleLogin" />
    </template>
  </MainContent>
</template>
