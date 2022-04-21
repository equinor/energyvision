import { getRedirectUrl, getDnsRedirect } from '../common/helpers/redirects'
import { NextRequest, NextResponse } from 'next/server'
import { getLocaleFromName } from '../lib/localization'
import { isGlobal } from '../common/helpers/datasetHelpers'

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
  const dnsRedirect = getDnsRedirect(origin, pathname)
  console.log('### DNS REDIRECT ###')
  console.log('origin: ', origin)
  console.log('redirect: ', dnsRedirect)
  if (dnsRedirect) {
    return NextResponse.redirect(dnsRedirect)
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
