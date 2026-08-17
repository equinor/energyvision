import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
/* import { getDocumentBySlug } from './sanity/queries/paths/getPaths' */
import archivedNews from './lib/archive/archivedNewsPaths.json'
import { Flags } from './sanity/helpers/datasetHelpers'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getWWWRedirect } from './sanity/interface/redirects'

const PERMANENT_REDIRECT = 301
//const TEMPORARY_REDIRECT = 302
const DOT_HTML = '.html'
const IS_ARCHIVED_NEWS_DOWNLOADS =
  /(en|no)?\/news\/archive\/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\/downloads\/[^/]+\.[a-z]{2,4}$/

const wwwExcludedDomains = [
  'localhost:3000',
  process.env.RADIX_PUBLIC_DOMAIN_NAME,
  process.env.RADIX_CANONICAL_DOMAIN_NAME,
  'data.equinor.com',
]

// Check if a given path exists in Sanity or not
/* const pathExistsInSanity = async (pathname: string): Promise<boolean> => {
  const article = await getDocumentBySlug(pathname)
  return Boolean(article)
} */

export async function proxy(request: NextRequest) {
  const { origin, locale } = request.nextUrl
  const pathname = decodeURI(request.nextUrl.pathname)
  const isDotHtml = pathname.slice(-5) === DOT_HTML
  // Rewrite the correct path for assets in download section of achived news (older than 2016)
  if (
    IS_ARCHIVED_NEWS_DOWNLOADS.test(pathname) &&
    (Flags.IS_DEV || Flags.IS_GLOBAL_PROD)
  ) {
    const rewrite = pathname.replace(
      pathname,
      `/content/dam/archive-assets/${locale}${pathname}`,
    )
    return NextResponse.rewrite(`${origin}${rewrite}`)
  }

  const host = String(request.headers.get('host'))

  // Skip WWW redirect for Radix URLs and localhost
  if (!wwwExcludedDomains.includes(host)) {
    const wwwRedirect = getWWWRedirect(locale, host, pathname)
    if (wwwRedirect) {
      return NextResponse.redirect(wwwRedirect, PERMANENT_REDIRECT)
    }
  }

  // Redirect external links to news which is now archived if link doesn't exist in Sanity
  if (
    Flags.HAS_ARCHIVED_NEWS &&
    pathname.startsWith('/news') &&
    !pathname.startsWith('/news/archive')
  ) {
    //const existsInSanity = await pathExistsInSanity(pathname)
    //if (!existsInSanity) {
    const archivedPath = pathname.replace('news', 'news/archive')
    const existsInArchive = archivedNews.some(e => e.slug === archivedPath)
    if (existsInArchive)
      return NextResponse.redirect(
        `${origin}${archivedPath}`,
        PERMANENT_REDIRECT,
      )
    //}
  }

  // Redirect to the same url lowercased if necessary
  if (
    pathname !== pathname.toLowerCase() &&
    !pathname.includes('/news/archive')
  ) {
    return NextResponse.redirect(
      `${origin}${pathname.toLowerCase()}`,
      PERMANENT_REDIRECT,
    )
  }

  // Check if pathname ends with .html
  if (isDotHtml) {
    return NextResponse.redirect(
      `${origin}${pathname.replace(DOT_HTML, '')}`,
      PERMANENT_REDIRECT,
    )
  }

  const handleI18nRequest = createMiddleware(routing)
  const response = handleI18nRequest(request)
  return response
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or Next dev overlay routes
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher:
    '/((?!api|_next|favicon.ico|__nextjs|__nextjs_original-stack-frame|__nextjs_launch-editor|.well-known|legacy|content/dam/|etc.clientlibs/|sitemap.xml|robots.txt).*)',
}
