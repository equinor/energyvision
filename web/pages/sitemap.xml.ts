import { GetServerSideProps } from 'next'
import { languages, defaultLanguage } from '../languages'
import { getRoutePaths, getNewsPaths, getLocalNewsPaths, PathType } from '../common/helpers/getPaths'
import { hasArchivedNews, hasLocalNews, hasNews } from '../common/helpers/datasetHelpers'
import archivedNews from '../lib/archive/archivedNewsPaths.json'

const Sitemap = () => {
  return 'Loading...'
}

const getUrl = ({ slug, locale }: PathType) => {
  if (Array.isArray(slug)) {
    const url = slug.length === 0 ? locale : locale + '/' + slug.join('/')
    return url
  }
  return locale + slug
}

const getSitemapUrls = (domain: string, paths: PathType[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${paths
      .map(
        (path) => `
          <url>
            <loc>${domain + '/' + getUrl(path)}</loc>
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
  let locale = ''
  let paths: PathType[]
  let domain = String(req.headers.host)
  domain = domain.startsWith('www') ? `https://${domain}` : domain
  const locales = languages.map((lang) => lang.locale)

  const isMultilanguage = locales.length > 1

  const routeSlugs = await getRoutePaths(locales)
  const newsSlugs = hasNews ? await getNewsPaths(locales) : []
  const localNewsSlugs = hasLocalNews ? await getLocalNewsPaths(locales) : []
  const archivedNewsSlugs = hasArchivedNews ? archivedNews : []

  const allSlugs = [...routeSlugs, ...newsSlugs, ...localNewsSlugs, ...(archivedNewsSlugs as PathType[])]

  if (isMultilanguage) {
    locale = String(query?.lang)
    paths = allSlugs.filter((route) => route.locale === locale)
  } else {
    locale = defaultLanguage.locale
    paths = allSlugs
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
