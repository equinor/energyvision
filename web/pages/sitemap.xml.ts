import { GetServerSideProps } from 'next'
import { languages, defaultLanguage } from '../languages'
import { getRoutePaths, PathType } from '../common/helpers/getPaths'

const Sitemap = () => {
  return 'Loading...'
}

const getUrl = ({ slug, locale }: PathType) => {
  const url = slug.length === 0 ? locale : locale + '/' + slug.join('/')
  return url
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

  const domain = String(req.headers.host)
  const locales = languages.map((lang) => lang.locale)
  const routeSlugs = await getRoutePaths(locales)
  const isMultilanguage = locales.length > 1

  if (isMultilanguage) {
    locale = String(query?.lang)
    paths = routeSlugs.filter((route) => route.locale === locale)
  } else {
    locale = defaultLanguage.locale
    paths = routeSlugs
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
