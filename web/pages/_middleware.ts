import { NextRequest, NextResponse } from 'next/server'
import { defaultLanguage } from '../lib/localization'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname, locale, origin } = request.nextUrl
  const shouldHandleLocale = !PUBLIC_FILE.test(pathname) && !pathname.includes('/api/') && locale === 'default'
  return shouldHandleLocale ? NextResponse.redirect(`${origin}/${defaultLanguage.locale}${pathname}`) : undefined
}
