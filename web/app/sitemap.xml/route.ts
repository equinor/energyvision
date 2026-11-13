import { NextResponse } from 'next/server';
import { defaultLanguage, languages } from '@/languageConfig';
import archivedNews from '@/lib/archive/archivedNewsPaths.json';
import { crawlableDomains } from '@/lib/helpers/domainHelpers';
import { Flags } from '@/sanity/helpers/datasetHelpers';
import {
  getHomePagePaths,
  getLocalNewsPaths,
  getMagazineIndexPaths,
  getMagazinePaths,
  getNewsPaths,
  getNewsroomPaths,
  getRoutePaths,
  type PathType,
} from '../../sanity/helpers/getPaths';

const CACHE_CONTROL = 'public, s-maxage=1200, stale-while-revalidate=600';

const formatPath = ({ slug, locale: urlLocale }: PathType) => {
  const locale = urlLocale === defaultLanguage.locale ? '' : urlLocale;
  const path = Array.isArray(slug) ? '/' + slug.join('/') : slug;
  if (path === '/') return locale ? `/${locale}` : '';
  return locale ? `/${locale}${path}` : path;
};

const getSitemapUrls = (
  domain: string,
  paths: PathType[],
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `
  <url>
    <loc>${domain + formatPath(path)}</loc>${
      path.updatedAt
        ? `
    <lastmod>${path.updatedAt}</lastmod>`
        : ''
    }
  </url>`,
  )
  .join('')}
</urlset>`;

const getSitemapIndex = (
  domain: string,
  locales: string[],
) => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locales
  .map(
    (locale) => `
  <sitemap>
    <loc>${domain}/sitemap.xml?lang=${locale}</loc>
  </sitemap>`,
  )
  .join('')}
</sitemapindex>`;

const getSitemapPaths = async (locale: string): Promise<PathType[]> => {
  // Satellites can have magazine articles (e.g. stemgapet) but no magazine index page.
  const hasMagazineIndex = Flags.HAS_MAGAZINE && !Flags.IS_SATELLITE;

  const [
    homePageSlugs,
    routeSlugs,
    newsSlugs,
    newsroomSlugs,
    magazineSlugs,
    magazineIndexSlugs,
    localNewsSlugs,
  ] = await Promise.all([
    getHomePagePaths(),
    getRoutePaths([locale]),
    Flags.HAS_NEWS ? getNewsPaths([locale]) : [],
    Flags.HAS_NEWSROOM ? getNewsroomPaths() : [],
    Flags.HAS_MAGAZINE ? getMagazinePaths([locale]) : [],
    hasMagazineIndex ? getMagazineIndexPaths() : [],
    Flags.HAS_LOCAL_NEWS ? getLocalNewsPaths([locale]) : [],
  ]);

  return [
    ...homePageSlugs,
    ...routeSlugs,
    ...newsSlugs,
    ...newsroomSlugs,
    ...magazineSlugs,
    ...magazineIndexSlugs,
    ...localNewsSlugs,
  ].filter((route) => route.locale === locale);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let domain = String(request.headers.get('host'));

  if (!crawlableDomains.includes(domain) && !Flags.IS_DEV) {
    return new NextResponse('Not found', { status: 404 });
  }

  domain = domain.startsWith('www') ? `https://${domain}` : domain;

  const locales = languages.map((lang) => lang.locale);
  const isMultilanguage = locales.length > 1;

  const locale =
    searchParams.get('lang') ??
    (!isMultilanguage ? defaultLanguage.locale : '');
  const shouldFetchUrls = !isMultilanguage || locales.includes(locale);

  const headers = {
    'Content-Type': 'text/xml',
    'Cache-Control': CACHE_CONTROL,
  };

  if (!shouldFetchUrls) {
    return new NextResponse(getSitemapIndex(domain, locales), { headers });
  }

  const sanityPaths = await getSitemapPaths(locale);
  const archivedNewsPaths = Flags.HAS_ARCHIVED_NEWS
    ? (archivedNews as PathType[]).filter((route) => route.locale === locale)
    : [];

  const sitemapXml = getSitemapUrls(domain, [
    ...sanityPaths,
    ...archivedNewsPaths,
  ]);
  return new NextResponse(sitemapXml, { headers });
}
