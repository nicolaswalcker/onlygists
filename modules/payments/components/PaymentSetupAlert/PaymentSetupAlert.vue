<script lang="ts" setup>
const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<(e: 'setup') => void>()
</script>

<template>
  <!-- eslint-disable-next-line vue/valid-v-slot -->
  <Card #content>
    <div class="flex items-center gap-4">
      <i class="pi pi-info-circle text-blue-700 text-4xl" />
      <div class="flex flex-col flex-1">
        <h4 class="text-blue-700">
          Complete os dados de pagamento
        </h4>
        <p class="text-sm">
          É necessário fazer a criação de uma conta de pagamento para ativar a sua conta!
        </p>
      </div>
      <Button
        :loading="props.loading"
        size="small"
        label="Completar"
        icon="pi pi-arrow-right"
        icon-pos="right"
        @click="() => emit('setup')"
      />
    </div>
  </Card>
</template>
