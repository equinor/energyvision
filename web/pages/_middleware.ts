import { getRedirectUrl, getDnsRedirect } from '../common/helpers/redirects'
import { NextRequest, NextResponse } from 'next/server'
import { getLocaleFromName } from '../lib/localization'
import { isGlobal } from '../common/helpers/datasetHelpers'
import { getNewsPaths } from '../common/helpers/getPaths'

const PERMANENT_REDIRECT = 301
const TEMPORARY_REDIRECT = 302
const PUBLIC_FILE = /\.(.*)$/
const DOT_HTML = '.html'

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  const isDotHtml = pathname.slice(-5) === DOT_HTML
  // Check if pathname is irrelevant (.svg, .png, /api/, etcs)
  if ((PUBLIC_FILE.test(pathname) && !isDotHtml) || pathname.includes('/api/')) {
    return undefined
  }

  // Check if it is a DNS redirect
  const host = String(request.headers.get('host'))
  const dnsRedirect = getDnsRedirect(host, pathname)
  console.log('#DNS HOST: ', host)
  console.log('#DNS REDIRECT: ', dnsRedirect)
  if (dnsRedirect) {
    return NextResponse.redirect(dnsRedirect)
  }

  // Redirect external links to news which is now archived if link doesn't exist in Sanity
  if (pathname.startsWith('/news') && !pathname.startsWith('/news/archive') && isGlobal) {
    const sanityNewsSlugs = await getNewsPaths(['en', 'no'])
    const existsInSanity = sanityNewsSlugs.some((item) => item.slug === pathname)
    if (!existsInSanity) return NextResponse.redirect(`${origin}${pathname.replace('news', 'news/archive')}`)
  }

  // Redirect to the same url lowercased if necessary
  if (pathname !== pathname.toLowerCase() && !pathname.includes('/news/archive')) {
    return NextResponse.redirect(`${origin}${pathname.toLowerCase()}`)
  }

  // Check if a redirect exists in sanity
  const redirect = await getRedirectUrl(pathname, request.nextUrl.locale)
  if (redirect) {
    const locale = getLocaleFromName(redirect.lang)
    return NextResponse.redirect(`${origin}/${locale}${redirect.to}`, PERMANENT_REDIRECT)
  }

  // Check if has /magazine/ in the url and redirect to a temporary landing page if so
  if (pathname.includes('/magazine/') && isGlobal) {
    return NextResponse.redirect(`${origin}/magazine`, TEMPORARY_REDIRECT)
  }

  // Check if pathname ends with .html
  if (isDotHtml) {
    return NextResponse.redirect(`${origin}${pathname.replace(DOT_HTML, '')}`, PERMANENT_REDIRECT)
  }
}
