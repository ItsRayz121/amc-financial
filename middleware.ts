import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedAdminRoute = createRouteMatcher([
  '/admin/dashboard(.*)',
  '/admin/links(.*)',
  '/admin/content(.*)',
  '/admin/team(.*)',
  '/admin/settings(.*)',
  '/api/admin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedAdminRoute(req)) {
    const authObj = await auth()
    if (!authObj.userId) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
}
