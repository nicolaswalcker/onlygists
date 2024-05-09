<script lang="ts" setup>
import type { ZodFormattedError } from 'zod'
import type { User } from '~/modules/users/entities/User/User'

const props = defineProps<{
  errors?: ZodFormattedError<User>
}>()

const user = defineModel<User>({
  required: false,
  default: {
    name: '',
    site: '',
    bio: '',
    phone: '',
  },
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="name">Nome</label>
        <InputText id="name" v-model="user.name" placeholder="Nicolas Walcker" />
        <small v-if="props.errors?.name" class="text-red-400">{{ props.errors?.name._errors[0] }}</small>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="site">Site</label>
        <InputText id="site" v-model="user.site" placeholder="nicolaswalcker.dev" />
        <small v-if="props.errors?.site" class="text-red-400">{{ props.errors?.site._errors[0] }}</small>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="bio">Bio</label>
        <InputText id="bio" v-model="user.bio" placeholder="Software Engineer, 24 anos" />
        <small v-if="props.errors?.bio" class="text-red-400">{{ props.errors?.bio._errors[0] }}</small>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="phone">Telefone</label>
        <InputMask id="phone" v-model="user.phone" unmask mask="(99)99999-9999" inputmode="numeric" placeholder="(99)99999-9999" />
        <small v-if="props.errors?.phone" class="text-red-400">{{ props.errors?.phone._errors[0] }}</small>
      </div>
    </div>
  </div>
</template>
