import { Flags } from '@/common/helpers/datasetHelpers'
import archivedNews from '../../../../../../lib/archive/archivedNewsPaths.json'
import { languages } from '@/languages'
import { notFound } from 'next/navigation'
import ArchivedNews from '@/templates/archivedNews/ArchivedNews'

//const { publicRuntimeConfig } = getConfig()

const fetchArchiveData = async (pagePathArray: string[], pagePath: string, locale: string): Promise<Response> => {
  if (pagePath.includes('.')) return Promise.reject()

  const archiveSeverURL = process.env.NEXT_PUBLIC_ARCHIVE_CONTENT_LINK

  if (pagePathArray.length > 1 && pagePathArray[0] !== 'crudeoilassays') {
    /** Check if the required page is old archived AEM page or not
     * because AEM also has archived pages which has 'archive' the page path */
    return await fetch(`${archiveSeverURL}/${locale}/news/archive/${pagePath}.json`)
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
  const otherLanguages = languages.filter((lang) => lang.locale !== locale)
  const otherLocales = otherLanguages.map((lang) => lang.locale)
  const responses = await Promise.all(
    otherLocales.map(async (locale) => ({
      locale: locale,
      res: await fetchArchiveData(pagePathArray, pagePath, locale),
    })),
  )
  const response = responses && responses.find((e) => e.res.status === 200)
  if (response) {
    console.log(`Archived page does not exist with request locale: ${locale}`)
    console.log(`Redirecting to existing path: /${response.locale}/news/archive/${pagePath}`)
    return {
      redirect: {
        permanent: true,
        destination: `/${response.locale}/news/archive/${pagePath}`,
      },
    }
  } else {
    return { notFound: true }
  }
}

export default async function Page({ params }: any) {
  const { locale, slug: pagePathArray } = await params
  if (!Flags.HAS_ARCHIVED_NEWS) return { notFound: true }

  const pagePath = pagePathArray.join('/')

  const archivedItems = archivedNews.filter((e) => e.slug === `/news/archive/${pagePath}`)
  if (archivedItems.length === 0) return notFound()

  const response = await fetchArchiveData(pagePathArray, pagePath, locale)

  if (response.status === 404) return fallbackToAnotherLanguage(pagePathArray, pagePath, locale)

  const pageData = await parseResponse(response)

  if (!pageData) notFound()

  return <ArchivedNews {...pageData} />
}
