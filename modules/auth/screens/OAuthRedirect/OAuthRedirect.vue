<script setup lang="ts">
const router = useRouter()

async function navigateToPanel() {
  await new Promise(resolve => setTimeout(resolve, 2_000))
  router.push('/app/panel')
}

onMounted(() => {
  navigateToPanel()
})
</script>

<template>
  <MainContent>
    <template #content>
      <p class="text-gray-800 text-regular">
        🤩 Redirecionando...
      </p>
    </template>
  </MainContent>
</template>
