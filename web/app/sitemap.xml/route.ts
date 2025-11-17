import { NextResponse } from 'next/server'
import { languages, defaultLanguage } from '@/languages'
import {
  getRoutePaths,
  getNewsPaths,
  getLocalNewsPaths,
  getNewsroomPaths,
  getMagazineIndexPaths,
  getMagazinePaths,
  PathType,
} from '../../sanity/helpers/getPaths'
import archivedNews from '@/lib/archive/archivedNewsPaths.json'
import { crawlableDomains } from '@/lib/helpers/domainHelpers'
import { Flags } from '@/sanity/helpers/datasetHelpers'

const formatPath = ({ slug, locale: urlLocale }: PathType) => {
  const locale = urlLocale === defaultLanguage.locale ? '' : urlLocale
  const path = Array.isArray(slug) ? '/' + slug.join('/') : slug

  if (path === '/') return locale ? `/${locale}` : ''
  return locale ? `/${locale}${path}` : path
}

const getSitemapUrls = (domain: string, paths: PathType[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `
  <url>
    <loc>${domain + formatPath(path)}</loc>
    <lastmod>${path.updatedAt}</lastmod>
  </url>`,
  )
  .join('')}
</urlset>`

const getSitemapIndex = (domain: string, locales: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locales
  .map(
    (locale) => `
  <sitemap>
    <loc>${domain}/sitemap.xml?lang=${locale}</loc>
  </sitemap>`,
  )
  .join('')}
</sitemapindex>`

export async function GET(request: Request) {
  const { searchParams, host } = new URL(request.url)
  let locale = ''
  let domain = host

  if (!crawlableDomains.includes(domain) && !Flags.IS_DEV) {
    return new NextResponse('Not Found', { status: 404 })
  }

  domain = domain.startsWith('www') ? `https://${domain}` : domain

  const locales = languages.map((lang) => lang.locale)
  const isMultilanguage = locales.length > 1

  const routeSlugs = await getRoutePaths(locales)
  const newsSlugs = Flags.HAS_NEWS ? await getNewsPaths(locales) : []
  const newsroomSlugs = Flags.HAS_NEWSROOM ? await getNewsroomPaths() : []
  const magazineSlugs = Flags.HAS_MAGAZINE ? await getMagazinePaths(locales) : []
  const magazineIndexSlugs = Flags.HAS_MAGAZINE ? await getMagazineIndexPaths() : []
  const localNewsSlugs = Flags.HAS_LOCAL_NEWS ? await getLocalNewsPaths(locales) : []
  const archivedNewsSlugs = Flags.HAS_ARCHIVED_NEWS ? (archivedNews as PathType[]) : []

  const allSlugs = [
    ...routeSlugs,
    ...newsSlugs,
    ...newsroomSlugs,
    ...magazineSlugs,
    ...magazineIndexSlugs,
    ...localNewsSlugs,
    ...archivedNewsSlugs,
  ]

  locale = searchParams.get('lang') ?? defaultLanguage.locale
  const shouldFetchUrls = !isMultilanguage || locales.includes(locale)

  const headers = { 'Content-Type': 'text/xml' }

  if (!shouldFetchUrls) {
    const indexXml = getSitemapIndex(domain, locales)
    return new NextResponse(indexXml, { headers })
  }

  const paths = allSlugs.filter((route) => route.locale === locale)
  const sitemapXml = getSitemapUrls(domain, paths)
  return new NextResponse(sitemapXml, { headers })
}
