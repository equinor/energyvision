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
import { crawlableDomains } from './robots.txt'

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

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const locale = String(query?.lang || defaultLanguage.locale)
  let paths: PathType[]
  let domain = String(req.headers.host)

  if (!crawlableDomains.includes(domain) && !Flags.IS_DEV) {
    return {
      notFound: true,
    }
  }

  domain = domain.startsWith('www') ? `https://${domain}` : domain

  const locales = languages.map((lang) => lang.locale)

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

  if (locale && locales.includes(locale)) {
    paths = allSlugs.filter((route) => route.locale === locale || !route.locale)

    const sitemap = getSitemapUrls(domain, paths)

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()
  } else {
    // Serve the sitemap index
    res.setHeader('Content-Type', 'text/xml')
    res.write(getSitemapIndex(domain, locales))
    res.end()
  }

  return {
    props: {},
  }
}

export default Sitemap
