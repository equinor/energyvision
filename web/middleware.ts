/* import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('x-your-custom-locale') || 'en'
  const [, locale, ...segments] = request.nextUrl.pathname.split('/')
  console.log('request.nextUrl.pathname', request.nextUrl.pathname)
  console.log('middleware defaultLocale', locale)
  console.log('middleware locale', locale)

  const handleI18nRouting = createMiddleware(routing)
  const response = handleI18nRouting(request)
  return response
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|_next|.*\\..*).*)',
}
 */

import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
