import { useSession } from '~/modules/auth/composables/useSession/useSession'

export default defineNuxtRouteMiddleware(async (to) => {
  const session = useSession()
  const isLogged = session.isLogged()

  if (!isLogged) {
    console.log('User is not logged in')

    if (to.path === '/auth/login')
      return

    return navigateTo({ path: '/auth/login' })
  }
})
