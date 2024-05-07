<script lang="ts" setup>
const visible = defineModel<boolean>('visible')
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Compra efetuada com sucesso" :style="{ width: '400px' }">
    <div class="m-0 flex flex-col items-center justify-center w-full">
      <i class="pi pi-check-circle text-primary-500 text-6xl my-5" />
      <p class="text-gray-700 text-center">
        Parabens pela compra! <br> Voce recebera no seu email fornecido no checkout o seu gist 🤠
      </p>
    </div>
    <template #footer>
      <div class="flex justify-center w-full">
        <Button label="Voltar" icon="pi pi-arrow-left" autofocus @click="visible = false" />
      </div>
    </template>
  </Dialog>
</template>
