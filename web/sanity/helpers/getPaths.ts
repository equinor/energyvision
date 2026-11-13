import { groq } from 'next-sanity';
import { languages } from '@/languageConfig';
import { client } from '@/sanity/lib/client';
import { sanityFetch } from '../lib/live';
import { sameLang } from '../queries/common/langAndDrafts';
import { publishDateTimeQuery } from '../queries/common/publishDateTime';

const getHomePages = async () => {
  const data: { lang: string; _updatedAt: string }[] = await client.fetch(
    groq`*[_type=="route_homepage"][0]{
  "data":*[_type == "translation.metadata" && references(^.content._ref)].translations[].value->{
    lang,
    _updatedAt
  }
    }.data`,
    undefined,
    {
      perspective: 'published',
    },
  );
  return data;
};

const ROUTE_FILTER = groq`string::startsWith(_type, "route_") && _type != "route_homepage" && lang == $lang`;

const getTopicRoutesForLocale = async (locale: string) => {
  const data: { slug: string; _updatedAt: string }[] = await client.fetch(
    groq`*[${ROUTE_FILTER} && defined(slug.current)][] {
      _updatedAt,
      "slug": slug.current,
    }`,
    {
      lang:
        languages.find((language) => language.locale === locale)?.iso ?? locale,
    },
  );
  return data;
};
const getDocumentsForLocale = async (
  type: 'news' | 'localNews' | 'magazine',
  locale: string,
) => {
  const data: { slug: string; _updatedAt: string }[] = await client.fetch(
    groq`*[_type == $type && defined(slug.current) && ${sameLang} ][] {
      _updatedAt,
      "slug": slug.current,
    }`,
    {
      type,
      lang:
        languages.find((language) => language.locale === locale)?.iso ?? locale,
    },
  );
  return data;
};

// Get a Sanity document by given slug
// Only include drafts if preview mode is enabled
export const getDocumentBySlug = async (slug: string) => {
  const { data } = await sanityFetch({
    query: `*[defined(slug.current) && slug.current == $slug][0] {
      _updatedAt,
      "slug": slug.current,
    }`,
    params: { slug },
  });
  return data;
};

export type PathType = {
  slug: string[] | string;
  updatedAt?: string;
  locale: string;
};

export const getHomePagePaths = async (): Promise<PathType[]> => {
  const pages = await getHomePages();

  return pages
    .filter((e) => e)
    .map((it) => ({
      locale:
        languages.find((language) => language.iso === it.lang)?.locale || '',
      updatedAt: it._updatedAt,
      slug: '/',
    }));
};

// Used by sitemap to generate paths for different locales
export const getRoutePaths = async (locales: string[]): Promise<PathType[]> => {
  const fetchPaths = locales.map(async (locale) => {
    const pages = await getTopicRoutesForLocale(locale);
    return pages.map((page) => ({
      slug: page.slug.split('/').filter((p) => p),
      updatedAt: page._updatedAt,
      locale,
    }));
  });

  return (await Promise.all(fetchPaths)).flat();
};

export const getNewsPaths = async (locales: string[]): Promise<PathType[]> => {
  const fetchPaths = locales.map(async (locale) => {
    const pages = await getDocumentsForLocale('news', locale);
    return pages.map((page) => ({
      slug: page.slug.split('/').filter((p) => p),
      updatedAt: page._updatedAt,
      locale,
    }));
  });

  return (await Promise.all(fetchPaths)).flat();
};

export const getMagazinePaths = async (
  locales: string[],
): Promise<PathType[]> => {
  const fetchPaths = locales.map(async (locale) => {
    const pages = await getDocumentsForLocale('magazine', locale);
    return pages.map((page) => ({
      slug: page.slug.split('/').filter((p) => p),
      updatedAt: page._updatedAt,
      locale,
    }));
  });

  return (await Promise.all(fetchPaths)).flat();
};

export const getLocalNewsPaths = async (
  locales: string[],
): Promise<PathType[]> => {
  const fetchPaths = locales.map(async (locale) => {
    const pages = await getDocumentsForLocale('localNews', locale);
    return pages.map((page) => ({
      slug: page.slug.split('/').filter((p) => p),
      updatedAt: page._updatedAt,
      locale,
    }));
  });

  return (await Promise.all(fetchPaths)).flat();
};

const NEWSROOM_SLUGS: Record<string, string> = { en: 'news', no: 'nyheter' };
const MAGAZINE_INDEX_SLUGS: Record<string, string> = {
  en: 'magazine',
  no: 'magasin',
};

// Index pages have no document of their own; use the latest article's
// _updatedAt as lastmod. The result is null when a language has no articles.
const getLatestUpdatedAt = async (
  type: 'news' | 'magazine',
  orderBy: string,
  iso: string,
): Promise<string | undefined> => {
  const data: { _updatedAt: string } | null = await client.fetch(
    groq`*[_type == $type && ${sameLang}] | order(${orderBy} desc)[0] {
      _updatedAt,
    }`,
    { type, lang: iso },
  );
  return data?._updatedAt;
};

const getIndexPagePaths = async (
  type: 'news' | 'magazine',
  orderBy: string,
  slugsByLocale: Record<string, string>,
): Promise<PathType[]> => {
  const paths = languages
    .filter((lang) => slugsByLocale[lang.locale])
    .map(async (lang) => ({
      slug: [slugsByLocale[lang.locale]],
      updatedAt: await getLatestUpdatedAt(type, orderBy, lang.iso),
      locale: lang.locale,
    }));

  return Promise.all(paths);
};

export const getNewsroomPaths = (): Promise<PathType[]> =>
  getIndexPagePaths('news', publishDateTimeQuery, NEWSROOM_SLUGS);

export const getMagazineIndexPaths = (): Promise<PathType[]> =>
  getIndexPagePaths('magazine', '_createdAt', MAGAZINE_INDEX_SLUGS);
