import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import type { GeneratePageMetadataProps, PageProps } from 'next-roots'
import { router, getNewsHref } from '../../lib/router'
import { getNameFromLocale } from '../../lib/localization'
import { getComponentsData } from '../../lib/fetchData'
import { newsroomQuery } from '../../lib/queries/newsroom'
import NewsRoomPageTemplate from '../../templates/news'

async function getMetaData(locale: string) {
  const lang = getNameFromLocale(locale)

  const queryParams = {
    lang,
  }
  const { pageData } = await getComponentsData(
    {
      query: newsroomQuery,
      queryParams,
    },
    draftMode().isEnabled ?? 'false',
  )

  return {
    title: pageData?.seoAndSome?.documentTitle,
    content: pageData?.seoAndSome?.metaDescription,
    href: getNewsHref(locale),
  }
}

async function getData(locale: string) {
  const lang = getNameFromLocale(locale)

  const queryParams = {
    lang,
  }
  const { menuData, pageData, footerData } = await getComponentsData(
    {
      query: newsroomQuery,
      queryParams,
    },
    draftMode().isEnabled ?? 'false',
  )

  return {
    data: {
      menuData,
      footerData,
      pageData,
    },
    href: getNewsHref(locale),
  }
}

export default async function NewsRoom({ pageHref }: PageProps) {
  const pageLocale = router.getLocaleFromHref(pageHref)

  const { data, href } = await getData(pageLocale)

  return <NewsRoomPageTemplate locale={pageLocale} href={href} pageData={data} />
}

export async function generateMetadata({ pageHref }: GeneratePageMetadataProps<void>): Promise<Metadata> {
  const pageLocale = router.getLocaleFromHref(pageHref)
  const { title, content } = await getMetaData(pageLocale)

  return { title, description: content }
}
