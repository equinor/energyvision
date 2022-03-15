import { getRedirectUrl } from '../common/helpers/getRedirectUrl'
import { NextRequest, NextResponse } from 'next/server'
import { isGlobal } from '../common/helpers/datasetHelpers'
import { getLocaleFromName } from '../lib/localization'

const PERMANENT_REDIRECT = 301
const PUBLIC_FILE = /\.(.*)$/
const DOT_HTML = '.html'

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  const isDotHtml = pathname.slice(-5) === DOT_HTML

  // Check if pathname is irrelevant (.svg, .png, /api/, etcs)
  if ((PUBLIC_FILE.test(pathname) && !isDotHtml) || pathname.includes('/api/')) {
    return undefined
  }

  // Check if should redirect
  const redirect = await getRedirectUrl(pathname, request.nextUrl.locale)
  if (redirect) {
    const locale = getLocaleFromName(redirect.lang)
    return NextResponse.redirect(`${origin}/${locale}${redirect.to}`, PERMANENT_REDIRECT)
  }

  // Check if pathname ends with .html
  if (isDotHtml) {
    return NextResponse.redirect(`${origin}${pathname.replace(DOT_HTML, '')}`, PERMANENT_REDIRECT)
  }
}
