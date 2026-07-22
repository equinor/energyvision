import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { defaultLanguage, languages, metaTitleSuffix } from '@/languageConfig'
import archivedNews from '@/lib/archive/archivedNewsPaths.json'
import { host } from '@/lib/config'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { routeSanityFetch } from '@/sanity/lib/live'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import type { PathType } from '@/sanity/queries/paths/getPaths'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import Header from '@/sections/Header/Header'
import ArchivedNews from '@/templates/archivedNews/ArchivedNews'

type Params = Promise<{ locale: string; slug: string[] }>
//TODO types
async function getArchivedPageData(params: { locale: string; slug: string[] }) {
  const { locale: routeLocale, slug: pagePathArray } = params
  const locale = routeLocale === 'en-GB' ? 'en' : 'no'
  if (!Flags.HAS_ARCHIVED_NEWS) return { notFound: true }

  const pagePath = pagePathArray?.join('/')
  const archivedItems = archivedNews.filter(
    e => e.slug === `/news/archive/${pagePath}`,
  )
  if (archivedItems.length === 0) return notFound()

  const response = await fetchArchiveData(pagePathArray, pagePath, locale)

  if (response.status === 404)
    return fallbackToAnotherLanguage(pagePathArray, pagePath, locale)

  const pageData = await parseResponse(response)
  return pageData
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { locale, slug: pagePathArray } = await params
  const archivedItems = archivedNews.filter(
    e => e.slug === `/news/archive/${pagePathArray.join('/')}`,
  )
  const slugs =
    archivedItems?.map((data: PathType) => ({
      slug: `${data.locale === 'no' ? '/no' : ''}${data.slug as string}`,
      lang: data.locale === 'en' ? 'en-GB' : 'nb-NO',
    })) ?? []

  const fullUrl = `${host.url}${slugs.find(it => it.lang === (locale === 'en' ? 'en-GB' : 'nb-NO'))?.slug}`

  const pageData = await getArchivedPageData({ locale, slug: pagePathArray })
  if (!pageData) {
    return {
      title: metaTitleSuffix,
      openGraph: {
        title: metaTitleSuffix,
        url: fullUrl,
        locale,
        type: 'article',
        siteName: 'Equinor',
      },
      alternates: {
        ...(locale === defaultLanguage.iso && { canonical: fullUrl }),
        languages: {},
      },
    }
  }
  const { title, description } = pageData

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      locale,
      type: 'article',
      siteName: 'Equinor',
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        en: fullUrl,
        no: `${host.url}${slugs.find(it => it.lang === (locale === 'en' ? 'nb-NO' : 'en-GB'))?.slug}`,
        'x-default': fullUrl,
      },
    },
  }
}

const ARCHIVE_REQUEST_TIMEOUT_MS = 10_000

/** Allow-listed path segment pattern: only alphanumeric, hyphen, underscore. */
const SAFE_PATH_SEGMENT_RE = /^[a-zA-Z0-9_-]+$/

/** Allow-listed locales for archive fetch. */
const ALLOWED_ARCHIVE_LOCALES = new Set(['en', 'no'])

const fetchArchiveData = async (
  pagePathArray: string[],
  pagePath: string,
  locale: string,
): Promise<Response> => {
  if (pagePath.includes('.')) return Promise.reject(new Error('Invalid path'))

  if (!ALLOWED_ARCHIVE_LOCALES.has(locale)) {
    return Promise.reject(new Error('Invalid locale'))
  }

  if (!pagePathArray.every(segment => SAFE_PATH_SEGMENT_RE.test(segment))) {
    return Promise.reject(new Error('Invalid path segment'))
  }

  const archiveServerURL = process.env.NEXT_PUBLIC_ARCHIVE_CONTENT_LINK

  if (!archiveServerURL) {
    return Promise.reject(new Error('Missing NEXT_PUBLIC_ARCHIVE_CONTENT_LINK'))
  }

  let parsedBase: URL
  try {
    parsedBase = new URL(archiveServerURL)
  } catch {
    return Promise.reject(new Error('Invalid NEXT_PUBLIC_ARCHIVE_CONTENT_LINK'))
  }

  if (
    parsedBase.protocol !== 'https:' ||
    parsedBase.username ||
    parsedBase.password
  ) {
    return Promise.reject(new Error('Invalid NEXT_PUBLIC_ARCHIVE_CONTENT_LINK'))
  }

  const safePath =
    pagePathArray.length > 1 && pagePathArray[0] !== 'crudeoilassays'
      ? `${locale}/news/archive/${pagePath}.json`
      : `${locale}/news/${pagePath}.json`

  const endpoint = new URL(
    safePath,
    parsedBase.origin + parsedBase.pathname.replace(/\/$/, '') + '/',
  )

  /** Check if the required page is old archived AEM page or not
   * because AEM also has archived pages which has 'archive' the page path */
  return fetch(endpoint, {
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(ARCHIVE_REQUEST_TIMEOUT_MS),
  })
}

const parseResponse = async (response: Response) => {
  try {
    const data = await response.json()
    return data
  } catch (error) {
    console.error('An error occured while parsing archive news data', error)
    return null
  }
}

type FallbackToAnotherLanguageType = Promise<
  | {
      redirect: {
        permanent: boolean
        destination: string
      }
    }
  | {
      notFound: true
    }
>

const fallbackToAnotherLanguage = async (
  pagePathArray: string[],
  pagePath: string,
  locale: string,
): FallbackToAnotherLanguageType => {
  const otherLanguages = languages.filter(lang => lang.locale !== locale)
  const otherLocales = otherLanguages.map(lang => lang.locale)
  const responses = await Promise.all(
    otherLocales.map(async locale => ({
      locale: locale,
      res: await fetchArchiveData(pagePathArray, pagePath, locale),
    })),
  )
  const response = responses?.find(e => e.res.status === 200)
  if (response) {
    console.log(`Archived page does not exist with request locale: ${locale}`)
    console.log(
      `Redirecting to existing path: /${response.locale}/news/archive/${pagePath}`,
    )
    return {
      redirect: {
        permanent: true,
        destination: `/${response.locale}/news/archive/${pagePath}`,
      },
    }
  }
  return { notFound: true }
}

export default async function ArchivedNewsPage({ params }: { params: Params }) {
  const { locale, slug } = await params

  const pagePathArray = slug
  const pagePath = pagePathArray.join('/')
  const archivedItems = archivedNews.filter(
    e => e.slug === `/news/archive/${pagePath}`,
  )
  const slugs =
    archivedItems?.map((data: PathType) => ({
      slug: `${data.locale === 'no' ? '/no' : ''}${data.slug as string}`,
      lang: data.locale === 'en' ? 'en-GB' : 'nb-NO',
    })) ?? []

  const headerData = {
    slugs,
    currentSlug: slugs[0],
  }
  const { data: siteMenuData } = await routeSanityFetch({
    query: Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery,
    params: {
      lang: locale ?? 'en-GB',
    },
  })

  const pageData = await getArchivedPageData(await params)

  if (!pageData) notFound()
  return (
    <>
      <Header siteMenuData={siteMenuData} headerData={headerData} />
      <ArchivedNews {...pageData} />
    </>
  )
}
