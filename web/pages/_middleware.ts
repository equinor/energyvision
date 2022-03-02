import { NextRequest, NextResponse } from 'next/server'

const PERMANENT_REDIRECT = 301
const PUBLIC_FILE = /\.(.*)$/
const DOT_HTML = '.html'

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  const isDotHtml = pathname.slice(-5) === DOT_HTML

  // Check if pathname is valid
  if ((PUBLIC_FILE.test(pathname) && !isDotHtml) || pathname.includes('/api/')) {
    return undefined
  }

  // Check if pathname ends with .html
  if (isDotHtml) {
    return NextResponse.redirect(`${origin}${pathname.replace(DOT_HTML, '')}`, PERMANENT_REDIRECT)
  }
}
