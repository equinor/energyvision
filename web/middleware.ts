/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getRedirectUrl, getDnsRedirect, getExternalRedirectUrl } from './common/helpers/redirects'
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server'
import { getLocaleFromName } from './lib/localization'
import { Flags } from './common/helpers/datasetHelpers'
import { getDocumentBySlug } from './common/helpers/getPaths'
import archivedNews from './lib/archive/archivedNewsPaths.json'

const PERMANENT_REDIRECT = 301
//const TEMPORARY_REDIRECT = 302
const PUBLIC_FILE = /\.(.*)$/
const DOT_HTML = '.html'
const IS_ARCHIVED_NEWS_DOWNLOADS = /(.*)\/news\/archive\/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\/downloads\/(.*)\.(.*)$/

// Check if a given path exists in Sanity or not
const pathExistsInSanity = async (pathname: string, isPreview = false): Promise<boolean> => {
  const article = await getDocumentBySlug(pathname, isPreview)
  return Boolean(article)
}

// Check if preview mode is enabled in Sanity
const isPreviewEnabled = (request: NextRequest): boolean => {
  const { searchParams } = request.nextUrl
  const previewCookie = request.cookies.get('__next_preview_data')
  const previewParam = searchParams.get('preview')

  if (previewCookie && previewParam) return true

  return false
}

export async function middleware(request: NextRequest) {
  const { origin, locale } = request.nextUrl
  const pathname = decodeURI(request.nextUrl.pathname)
  const isDotHtml = pathname.slice(-5) === DOT_HTML
  const isPreview = isPreviewEnabled(request)

  // Rewrite the correct path for assets in download section of achived news (older than 2016)
  if (IS_ARCHIVED_NEWS_DOWNLOADS.test(pathname) && (Flags.IS_DEV || Flags.IS_GLOBAL_PROD)) {
    const rewrite = pathname.replace(pathname, `/content/dam/archive-assets/${locale}${pathname}`)
    return NextResponse.rewrite(`${origin}${rewrite}`)
  }

  // Redirect statoil enrollment pdf 
  if(Flags.IS_DEV && pathname.includes("/content/dam/statoil/documents/supply-chain/statoil-deposit-enrollment-form.pdf")){
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

  // Redirect external links to news which is now archived if link doesn't exist in Sanity
  if (Flags.HAS_ARCHIVED_NEWS && pathname.startsWith('/news') && !pathname.startsWith('/news/archive')) {
    const existsInSanity = await pathExistsInSanity(pathname, isPreview)
    if (!existsInSanity) {
      const archivedPath = pathname.replace('news', 'news/archive')
      const existsInArchive = archivedNews.some((e) => e.slug === archivedPath)
      if (existsInArchive) return NextResponse.redirect(`${origin}${archivedPath}`, PERMANENT_REDIRECT)
    }
  }

  // Redirect to the same url lowercased if necessary
  if (pathname !== pathname.toLowerCase() && !pathname.includes('/news/archive')) {
    return NextResponse.redirect(`${origin}${pathname.toLowerCase()}`, PERMANENT_REDIRECT)
  }

  // Check if an external redirect exists in sanity
  const externalRedirect = await getExternalRedirectUrl(pathname, request.nextUrl.locale)
  if (externalRedirect) {
    return NextResponse.redirect(externalRedirect.to, PERMANENT_REDIRECT)
  }

  // Check if an internal redirect exists in sanity
  const redirect = await getRedirectUrl(pathname.replace(DOT_HTML, ''), request.nextUrl.locale)
  if (redirect) {
    const locale = getLocaleFromName(redirect.lang)
    return NextResponse.redirect(`${origin}/${locale}${redirect.to !== '/' ? redirect.to : ''}`, PERMANENT_REDIRECT)
  }

  // Check if pathname ends with .html
  if (isDotHtml) {
    return NextResponse.redirect(`${origin}${pathname.replace(DOT_HTML, '')}`, PERMANENT_REDIRECT)
  }
}
