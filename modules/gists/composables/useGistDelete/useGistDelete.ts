import type { GistVirtual } from '~/modules/gists/entities/Gist/Gist'

interface UseGistDeleteOptions {
  gist: Ref<GistVirtual | undefined>
}

export function useGistDelete({ gist }: UseGistDeleteOptions) {
  const { logAndTrack } = useLogger()
  const toast = useToast()
  const services = useServices()
  const loading = ref<boolean>(false)

  const gistId = ref<string>()

  const remove = async () => {
    if (!gistId.value)
      return

    loading.value = true

    try {
      await services.gists.delete(gistId.value)
    }
    catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Erro ao excluir o Gist',
        detail: 'Ocorreu um erro ao tentar excluir o gist! Sentimos muito :(',
        life: 2000,
      })
      logAndTrack(error)
    }
    finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!gist.value)
      return
    gistId.value = gist.value.id
  })

  return {
    loading,
    remove,
  }
}
