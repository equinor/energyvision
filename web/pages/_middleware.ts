/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getRedirectUrl, getDnsRedirect, getExternalRedirectUrl } from '../common/helpers/redirects'
import { NextRequest, NextResponse } from 'next/server'
import { getLocaleFromName } from '../lib/localization'
import { hasArchivedNews, isGlobal } from '../common/helpers/datasetHelpers'
import { getDocumentBySlug } from '../common/helpers/getPaths'

const PERMANENT_REDIRECT = 301
const TEMPORARY_REDIRECT = 302
const PUBLIC_FILE = /\.(.*)$/
const DOT_HTML = '.html'

// Check if a given path exists in Sanity or not
const pathExistsInSanity = async (pathname: string, isPreview = false): Promise<boolean> => {
  const article = await getDocumentBySlug(pathname, isPreview)
  return Boolean(article)
}

// Check if preview mode is enabled in Sanity
const isPreviewEnabled = (request: NextRequest): boolean => {
  const { searchParams } = request.nextUrl
  const previewCookie = request.cookies['__next_preview_data']
  const previewParam = searchParams.get('preview')

  if (previewCookie && previewParam) return true

  return false
}

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  const isDotHtml = pathname.slice(-5) === DOT_HTML
  const isPreview = isPreviewEnabled(request)

  // Check if pathname is irrelevant (.svg, .png, /api/, etcs)
  if ((PUBLIC_FILE.test(pathname) && !isDotHtml) || pathname.includes('/api/')) {
    return undefined
  }

  // Check if it is a DNS redirect
  const host = String(request.headers.get('host'))
  const dnsRedirect = getDnsRedirect(host, pathname)
  if (dnsRedirect) {
    return NextResponse.redirect(dnsRedirect)
  }

  // Redirect external links to news which is now archived if link doesn't exist in Sanity
  if (hasArchivedNews && pathname.startsWith('/news') && !pathname.startsWith('/news/archive')) {
    const existsInSanity = await pathExistsInSanity(pathname, isPreview)
    if (!existsInSanity) return NextResponse.redirect(`${origin}${pathname.replace('news', 'news/archive')}`)
  }

  // Redirect to the same url lowercased if necessary
  if (pathname !== pathname.toLowerCase() && !pathname.includes('/news/archive')) {
    return NextResponse.redirect(`${origin}${pathname.toLowerCase()}`)
  }

  // Check if an external redirect exists in sanity
  const externalRedirect = await getExternalRedirectUrl(pathname, request.nextUrl.locale)
  if (externalRedirect) {
    return NextResponse.redirect(externalRedirect.to, PERMANENT_REDIRECT)
  }

  // Check if an internal redirect exists in sanity
  const redirect = await getRedirectUrl(pathname, request.nextUrl.locale)
  if (redirect) {
    const locale = getLocaleFromName(redirect.lang)
    return NextResponse.redirect(`${origin}/${locale}${redirect.to !== '/' ? redirect.to : ''}`, PERMANENT_REDIRECT)
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
