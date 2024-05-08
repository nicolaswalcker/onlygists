export function useLogger() {
  const config = useRuntimeConfig()

  const isProd = config.public.nodeEnv === 'production'

  const logAndTrack = (...args: any[]) => {
    if (isProd)
      // TODO: send to error catch service
      return
    console.error(...args)
  }

  return {
    logAndTrack,
  }
}
