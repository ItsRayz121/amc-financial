import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isPublicRoute = createRouteMatcher(['/admin/login(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req) && !isPublicRoute(req)) {
    const authObj = await auth()
    if (!authObj.userId) {
      const { redirectToSignIn } = await import('@clerk/nextjs/server')
      return redirectToSignIn({ returnBackUrl: req.url })
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
