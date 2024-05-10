import type { GistVirtual } from '~/modules/gists/entities/Gist/Gist'

interface UseGistListOptions {
  username: string
}

export function useGistsList({ username }: UseGistListOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const loading = ref<boolean>(true)
  const loadingMore = ref<boolean>(false)

  const PAGE_COUNT = 5
  const page = ref<number>(0)

  const gists = ref<GistVirtual[]>([])
  const total = ref<number>(0)

  const from = computed(() => page.value * PAGE_COUNT)
  const to = computed(() => from.value + PAGE_COUNT - 1)

  const fetchMoreGistsByUsername = async () => {
    const canFetchMore = total.value > to.value

    if (!canFetchMore)
      return

    loadingMore.value = true

    try {
      page.value += 1
      const response = await services.gists.readAll({
        username,
        from: from.value,
        to: to.value,
      })

      gists.value.push(...response.results)
    }
    catch (error) {
      logAndTrack(error)
    }
    finally {
      loadingMore.value = false
    }
  }

  const fetchGistsByUsername = async () => {
    loading.value = true

    try {
      const response = await services.gists.readAll({
        username,
        from: from.value,
        to: to.value,
      })

      gists.value = response.results
      total.value = response.total
    }
    catch (error) {
      logAndTrack(error)
    }
    finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchGistsByUsername()
  })

  return {
    gists,
    loading,
    loadingMore,
    fetchMoreGistsByUsername,
  }
}
