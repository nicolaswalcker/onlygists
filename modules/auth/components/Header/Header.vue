<script lang="ts" setup>
const props = defineProps<{
  profilePic?: string
  nickname: string
}>()

const emit = defineEmits<{
  (e: 'navigate-to-new-gist'): void
  (e: 'navigate-to-profile-edit'): void
  (e: 'navigate-to-sales'): void
  (e: 'navigate-to-reports'): void
  (e: 'logout'): void
}>()
const menu = ref()
const items = [
  {
    label: 'Painel',
    icon: 'pi pi-chart-line',
    command: () => emit('navigate-to-reports'),
  },
  {
    label: 'Novo gist',
    icon: 'pi pi-plus',
    command: () => emit('navigate-to-new-gist'),
  },
  {
    label: 'Editar perfil',
    icon: 'pi pi-user',
    command: () => emit('navigate-to-profile-edit'),
  },
  {
    label: 'Vendas',
    icon: 'pi pi-money-bill',
    command: () => emit('navigate-to-sales'),
  },
  { separator: true },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out',
    command: () => emit('logout'),
  },
]

function toggle(event: Event) {
  menu.value?.toggle(event)
}
</script>

<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-screen-xl">
        <div class="flex items-center">
          <NuxtLink class="active:scale-95 transition-transform" to="/app/panel">
            <Logo />
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <button class="flex gap-2 items-center" aria-haspopup="true" aria-controls="header-auth-menu" @click="toggle">
            <span class="font-regular text-lg text-gray-700">Olá, {{ props.nickname }}</span>
            <div v-if="props.profilePic" class="w-9 h-9 rounded-full overflow-hidden">
              <img class="w-full" :src="props.profilePic" alt="Foto de perfil do usuário">
            </div>
          </button>
        </div>
        <Menu id="header-auth-menu" ref="menu" :model="items" :popup="true" />
      </div>
    </nav>
  </header>
</template>
