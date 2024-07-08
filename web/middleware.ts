/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getDnsRedirect } from './common/helpers/redirects'
import { NextRequest, NextResponse } from 'next/server'
import { Flags } from './common/helpers/datasetHelpers'
import archivedNews from './lib/archive/archivedNewsPaths.json'

const PERMANENT_REDIRECT = 301
//const TEMPORARY_REDIRECT = 302
const PUBLIC_FILE = /\.(.*)$/
const DOT_HTML = '.html'
const IS_ARCHIVED_NEWS_DOWNLOADS = /(.*)\/news\/archive\/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\/downloads\/(.*)\.(.*)$/

const getSanitizedUrl = (url: String) => {
  //sanitize url once for all to avoid multiple redirects..
  return url.toLowerCase().replace(DOT_HTML, '')
}
export async function middleware(request: NextRequest) {
  const { origin, locale } = request.nextUrl
  const pathname = decodeURI(request.nextUrl.pathname)
  const isDotHtml = pathname.slice(-5).toLowerCase() === DOT_HTML

  // Rewrite the correct path for assets in download section of achived news (older than 2016)
  if (IS_ARCHIVED_NEWS_DOWNLOADS.test(pathname) && (Flags.IS_DEV || Flags.IS_GLOBAL_PROD)) {
    const rewrite = pathname.replace(pathname, `/content/dam/archive-assets/${locale}${pathname}`)
    return NextResponse.rewrite(`${origin}${rewrite}`)
  }

  // Redirect statoil enrollment pdf
  if (pathname.includes('/content/dam/statoil/documents/supply-chain/statoil-deposit-enrollment-form.pdf')) {
    return NextResponse.redirect(`${origin}/where-we-are/us-owner-relations`, PERMANENT_REDIRECT)
  }

  // Check if pathname is irrelevant (.svg, .png, /api/, etcs)
  if ((PUBLIC_FILE.test(pathname) && !isDotHtml) || pathname.includes('/api/')) {
    return undefined
  }

  // Check if it is a DNS redirect
  const host = String(request.headers.get('host'))
  const dnsRedirect = getDnsRedirect(host, pathname)
  if (dnsRedirect) {
    return NextResponse.redirect(dnsRedirect, PERMANENT_REDIRECT)
  }

  if (Flags.HAS_ARCHIVED_NEWS) {
    // redirect to archived news if it exists in archived news list
    const htmlRemoved = isDotHtml ? pathname.replace(pathname.slice(-5), '') : pathname
    // hit for /news/[archive]/18dec2017-brazil[.html] or /news/[archive]/2001/08/13/GasLeakOnsgard or /news/[archive]/2001/08/13/gasleakonsgard
    const archivedPath = htmlRemoved.includes('news/archive')
      ? htmlRemoved
      : htmlRemoved.replace('news', 'news/archive')
    const slug = archivedNews.find((e: { slug: string }) => e.slug.toLowerCase() === archivedPath.toLowerCase())?.slug
    if (slug && slug.toLowerCase() !== pathname.toLowerCase()) {
      return NextResponse.redirect(`${origin}${slug}`, PERMANENT_REDIRECT)
    }
  }

  // Redirect to the same url lowercased if necessary for pages other than news
  if (/[A-Z]/.test(pathname) && !pathname.includes('news/archive')) {
    return NextResponse.redirect(`${origin}${getSanitizedUrl(pathname)}`, PERMANENT_REDIRECT)
  }

  //Check if pathname ends with .html for pages other than news
  if (isDotHtml) {
    return NextResponse.redirect(`${origin}${getSanitizedUrl(pathname)}`, PERMANENT_REDIRECT)
  }
}
