<script lang="ts" setup>
import type { Address } from '~/modules/users/entities/Address/Address'

const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<(e: 'trigger-address-search') => void>()

const address = defineModel<Address>({
  required: true,
  default: {
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  },
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col lg:flex-row gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1">
          <label for="zipCode">CEP
            <i v-if="props.loading" class="pi pi-spinner text-gray-500 animate-spin" /></label>
          <InputText id="cep" v-model="address.zipCode" v-maska placeholder="000000-000" data-maska="#####-###" @blur="() => emit('trigger-address-search')" />
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <label for="state">Estado</label>
          <InputText id="state" v-model="address.state" placeholder="Espírito Santo" />
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="city">Cidade</label>
        <InputText id="city" v-model="address.city" placeholder="Nova Venécia" />
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="neighborhood">Bairro</label>
        <InputText id="neighborhood" v-model="address.neighborhood" placeholder="Beira Rio" />
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="street">Rua</label>
        <InputText id="street" v-model="address.street" placeholder="Rua José de Anchieta" />
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="number">Número</label>
        <InputText id="number" v-model="address.number" placeholder="12" />
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="complement">Complemento</label>
        <InputText id="complement" v-model="address.complement" placeholder="Rua José de Anchieta" />
      </div>
    </div>
  </div>
</template>
