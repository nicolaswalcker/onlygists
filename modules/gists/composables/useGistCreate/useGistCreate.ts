import { z } from 'zod'
import type { ZodFormattedError } from 'zod'
import type { Code, Gist, Headline } from '~/modules/gists/entities/Gist/Gist'
import type { User } from '~/modules/users/entities/User/User'

interface UseGistCreateOptions {
  user: Ref<User | undefined>
}

const schema = z.object({
  title: z.string().min(2, 'Título é obirgatório'),
  description: z.string().min(10, 'A descrição precisa ter no mínimo 10 caracteres'),
  price: z.number(),
  content: z.string().min(2, 'O código é obrigatório'),
  lang: z.string().optional(),
})

export function useGistCreate({ user }: UseGistCreateOptions) {
  const { logAndTrack } = useLogger()
  const toast = useToast()
  const services = useServices()
  const loading = ref(false)
  const errors = ref<ZodFormattedError<Gist>>()

  const userId = ref<string>()

  const headline = ref<Headline>({
    title: '',
    description: '',
    price: 0,
  })

  const code = ref<Code>({
    content: '',
    lang: 'typescript',
  })

  const safeParse = () => {
    const result = schema.safeParse({
      ...headline.value,
      ...code.value,
    })

    if (!result.success)
      errors.value = result.error.format()

    return result
  }

  const create = async () => {
    if (!userId.value)
      return

    loading.value = true

    try {
      const response = await services.gists.create({
        ...headline.value,
        ...code.value,
        profileId: userId.value,
      })

      toast.add({
        severity: 'success',
        summary: 'Gist criado com sucesso',
        detail: 'Seu gist foi criado com sucesso! :)',
        life: 2000,
      })

      return response
    }
    catch (e) {
      logAndTrack(e)
      toast.add({
        severity: 'error',
        summary: 'Erro ao criar o Gist',
        detail: 'Ocorreu um erro ao tentar criar o gist! Sentimos muito :(',
        life: 2000,
      })
    }
    finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!user.value)
      return
    userId.value = user.value.id
  })

  return {
    errors,
    loading,
    headline,
    code,
    safeParse,
    create,
  }
}
