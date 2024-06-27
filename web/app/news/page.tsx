import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getNameFromLocale } from '../../lib/localization'
import { getComponentsData } from '../../lib/fetchData'
import { allNewsDocuments, newsroomQuery } from '../../lib/queries/newsroom'
import NewsRoomPageTemplate from '../../templates/news'
import { getClient } from '../../lib/sanity.server'

type Props = {
  params: {
    slug: string
    locale: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = getNameFromLocale(params?.locale ?? 'en')

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
    description: pageData?.seoAndSome?.metaDescription,
  }
}

async function getData(locale: string) {
  const lang = getNameFromLocale(locale) ?? 'en_GB'

  const queryParams = {
    lang,
  }
  const { menuData, pageData, footerData } = await getComponentsData(
    {
      query: newsroomQuery,
      queryParams,
    },
    false,
  )

  const content = await getClient(false).fetch(allNewsDocuments, {
    lang,
  })

  return {
    data: {
      menuData,
      footerData,
      newsList: content,
      pageData,
    },
  }
}

export default async function NewsRoom({ params }: Props) {
  const { data } = await getData(params?.locale ?? 'en')

  return <NewsRoomPageTemplate data={data} />
}
