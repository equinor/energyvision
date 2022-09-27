import { GetServerSideProps } from 'next'
import { languages, defaultLanguage } from '../languages'
import {
  getRoutePaths,
  getNewsPaths,
  getLocalNewsPaths,
  PathType,
  getNewsroomPaths,
  getMagazineIndexPaths,
  getMagazinePaths,
} from '../common/helpers/getPaths'
import { Flags } from '../common/helpers/datasetHelpers'
import archivedNews from '../lib/archive/archivedNewsPaths.json'

const Sitemap = () => {
  return 'Loading...'
}

const formatPath = ({ slug, locale: urlLocale }: PathType) => {
  const locale = urlLocale === defaultLanguage.locale ? '' : urlLocale
  const path = Array.isArray(slug) ? '/' + slug.join('/') : slug

  if (path === '/') return locale ? `/${locale}` : ''

  return locale ? `/${locale}${path}` : path
}

const getSitemapUrls = (domain: string, paths: PathType[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${paths
      .map(
        (path) => `
          <url>
            <loc>${domain + formatPath(path)}</loc>
            <lastmod>${path.updatedAt}</lastmod>
          </url>
        `,
      )
      .join('')}
    </urlset>`

const getSitemapIndex = (domain: string, locales: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${locales
      .map(
        (locale) => `
          <sitemap>
            <loc>${domain}/sitemap.xml?lang=${locale}</loc>
          </sitemap>
        `,
      )
      .join('')}
    </sitemapindex>`

type AnniversarySitemapItem = {
  updatedAt: string
  slug: string
  locale: 'en' | 'no'
}

const getAnniversarySitemap = async (locale: string): Promise<AnniversarySitemapItem[] | void> => {
  const response = await fetch(`https://www.equinor.com/50/api/sitemap`)
  if (response) {
    const data = await response.json()

    if (data) {
      return data.filter((item: AnniversarySitemapItem) => item.locale === locale)
    }
  }
}

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  let locale = ''
  let paths: PathType[]
  let domain = String(req.headers.host)
  domain = domain.startsWith('www') ? `https://${domain}` : domain
  const locales = languages.map((lang) => lang.locale)

  const isMultilanguage = locales.length > 1

  const routeSlugs = await getRoutePaths(locales)
  const newsSlugs = Flags.HAS_NEWS ? await getNewsPaths(locales) : []
  const newsroomSlugs = Flags.HAS_NEWSROOM ? await getNewsroomPaths() : []
  const magazineSlugs = Flags.HAS_MAGAZINE ? await getMagazinePaths(locales) : []
  const magazineIndexSlugs = Flags.HAS_MAGAZINE ? await getMagazineIndexPaths() : []
  const localNewsSlugs = Flags.HAS_LOCAL_NEWS ? await getLocalNewsPaths(locales) : []
  const archivedNewsSlugs = Flags.HAS_ARCHIVED_NEWS ? archivedNews : []

  const allSlugs = [
    ...routeSlugs,
    ...newsSlugs,
    ...newsroomSlugs,
    ...magazineSlugs,
    ...magazineIndexSlugs,
    ...localNewsSlugs,
    ...(archivedNewsSlugs as PathType[]),
  ]

  if (isMultilanguage) {
    locale = String(query?.lang)
    paths = allSlugs.filter((route) => route.locale === locale)
  } else {
    locale = defaultLanguage.locale
    paths = allSlugs
  }

  // TODO: switch to Flags.IS_GLOBAL_PROD for release
  if (Flags.IS_DEV) {
    const anniversarySitemap = await getAnniversarySitemap(locale)
    if (anniversarySitemap) {
      paths = [...paths, ...anniversarySitemap]
    }
  }

  const shouldFetchUrls = !isMultilanguage || locales.includes(locale)
  const sitemap = shouldFetchUrls ? getSitemapUrls(domain, paths) : getSitemapIndex(domain, locales)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
