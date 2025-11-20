import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { cache } from 'react'
import { routing } from '@/i18n/routing'
import { languages } from '@/languageConfig'
import archivedNews from '@/lib/archive/archivedNewsPaths.json'
import { host } from '@/lib/config'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import type { PathType } from '@/sanity/queries/paths/getPaths'
import ArchivedNews from '@/templates/archivedNews/ArchivedNews'

//TODO types
const getPageData = cache(async (params: any) => {
  const { locale: routeLocale, slug: pagePathArray } = await params
  const locale = routeLocale === 'en-GB' ? 'en' : routeLocale
  if (!Flags.HAS_ARCHIVED_NEWS) return { notFound: true }

  const pagePath = pagePathArray.join('/')

  const archivedItems = archivedNews.filter(
    e => e.slug === `/news/archive/${pagePath}`,
  )
  if (archivedItems.length === 0) return notFound()

  const response = await fetchArchiveData(pagePathArray, pagePath, locale)

  if (response.status === 404)
    return fallbackToAnotherLanguage(pagePathArray, pagePath, locale)

  const pageData = await parseResponse(response)
  return pageData
})

//TODO types
export async function generateMetadata({
  params,
}: {
  params: any
}): Promise<Metadata> {
  const { locale, slug: pagePathArray } = await params

  if (!hasLocale(routing.locales, locale) || !Flags.HAS_ARCHIVED_NEWS) {
    notFound()
  }

  const archivedItems = archivedNews.filter(
    e => e.slug === `/news/archive/${pagePathArray.join('/')}`,
  )
  const slugs =
    archivedItems?.map((data: PathType) => ({
      slug: `${data.locale === 'no' ? '/no' : ''}${data.slug as string}`,
      lang: data.locale === 'en' ? 'en_GB' : 'nb_NO',
    })) ?? []

  const pageData = await getPageData(params)
  const { title, description } = pageData

  const fullUrl = `${host.url}${slugs.find(it => it.lang === (locale === 'en' ? 'en_GB' : 'nb_NO'))?.slug}`
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
        no: `${host.url}${slugs.find(it => it.lang === (locale === 'en' ? 'nb_NO' : 'en_GB'))?.slug}`,
        'x-default': fullUrl,
      },
    },
  }
}

const fetchArchiveData = async (
  pagePathArray: string[],
  pagePath: string,
  locale: string,
): Promise<Response> => {
  if (pagePath.includes('.')) return Promise.reject()

  const archiveSeverURL = process.env.NEXT_PUBLIC_ARCHIVE_CONTENT_LINK

  if (pagePathArray.length > 1 && pagePathArray[0] !== 'crudeoilassays') {
    /** Check if the required page is old archived AEM page or not
     * because AEM also has archived pages which has 'archive' the page path */
    return await fetch(
      `${archiveSeverURL}/${locale}/news/archive/${pagePath}.json`,
    )
  }

  return await fetch(`${archiveSeverURL}/${locale}/news/${pagePath}.json`)
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

//TODO types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const pageData = await getPageData(params)
  if (!pageData) notFound()
  return <ArchivedNews {...pageData} />
}
