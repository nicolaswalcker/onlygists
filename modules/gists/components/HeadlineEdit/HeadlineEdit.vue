<script lang="ts" setup>
import getProgrammingLanguage from 'detect-programming-language'
import type { ZodFormattedError } from 'zod'
import type { Gist, Headline } from '~/modules/gists/entities/Gist/Gist'

const props = defineProps<{
  errors?: ZodFormattedError<Gist>
}>()

const emit = defineEmits<(e: 'language-change', lang: string) => void>()

const headline = defineModel<Headline>({
  required: true,
  default: {
    title: '',
    description: '',
    price: 0,
  },
})

const extension = computed(() => {
  const values = headline.value.title.split('.')

  if (values.length === 0)
    return ''
  const ext = values[values.length - 1]

  return `.${ext}`
})

watch(() => headline.value.title, () => {
  const mimeType = getProgrammingLanguage(extension.value)

  if (mimeType)
    emit('language-change', mimeType.toLocaleLowerCase())
})

const priceOptions = [
  { name: 'Grátis', value: 0 },
  { name: 'R$5,00', value: 5 },
  { name: 'R$10,00', value: 10 },
  { name: 'R$25,00', value: 25 },
]
</script>

<template>
  <div class="w-full flex-col justify-center gap-8">
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="gist-title">Título</label>
        <InputText id="gist-title" v-model="headline.title" type="text" placeholder="useCurrentUser.ts" />
        <small v-if="props.errors?.title" class="text-red-400">
          {{ props.errors.title?._errors[0] }}
        </small>
      </div>
      <div class="flex flex-col gap-2">
        <label for="gist-price">Valor</label>
        <SelectButton v-model="headline.price" :options="priceOptions" option-value="value" option-label="name" />
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-4">
      <label for="gist-description">Documentação</label>
      <Textarea
        id="gist-description" v-model="headline.description"
        rows="10" class="w-full" placeholder="useCurrentUser() é um hook que retorna o usuário **atual** do sistema."
      />
      <small class="text-gray-600">
        Markdown é suportado
      </small>
      <small v-if="props.errors?.description" class="text-red-400">
        {{ props.errors.description?._errors[0] }}
      </small>
    </div>
  </div>
</template>
