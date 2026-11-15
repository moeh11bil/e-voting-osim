// src/middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useCookie<any>('auth')
  const voter = useCookie<any>('voter')

  const adminOnly = to.path.startsWith('/admin')
  const voterPages = ['/vote', '/ballot', '/thanks']
  const publicPages = ['/', '/login', '/results']

  if (publicPages.includes(to.path)) return

  if (adminOnly) {
    if (!auth.value) return navigateTo('/login')
    return
  }

  if (voterPages.includes(to.path)) {
    // ballot requires voter session
    if (to.path === '/ballot' && !voter.value) return navigateTo('/vote')
    return
  }

  // default: require admin
  if (!auth.value) return navigateTo('/login')
})