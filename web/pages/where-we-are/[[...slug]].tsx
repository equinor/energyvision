/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import type { AppProps } from 'next/app'
import { NextSeo } from 'next-seo'
import { menuQuery } from '../../lib/queries/menu'
import { getClient } from '../../lib/sanity.server'
import { mapLocaleToLang } from '../../lib/localization'
import { getPageData, getPageLayout, getPagePaths } from '../../common/helpers/staticPageHelpers'
import OldTopicPage from '../../tempcomponents/pageTemplates/OldTopicPage'

type PageProps = {
  data: {
    pageData: {
      title: string
      description: string
      content: string
    }
    menuData: any
  }
}

const Page = ({ data }: PageProps): JSX.Element => {
  if (!data || !data.pageData) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <NextSeo title={data.pageData?.title} description={data.pageData?.description}></NextSeo>
      <OldTopicPage data={data.pageData} />
    </>
  )
}

// eslint-disable-next-line react/display-name
Page.getLayout = (page: AppProps) => getPageLayout(page)

export const getStaticProps: GetStaticProps = async ({ params, locale = 'en' }) => {
  const slug = (params?.slug as string[])?.join('/') || ''
  const pageData = await getPageData(locale, 'where-we-are/' + slug)
  const menuData = await getClient(false).fetch(menuQuery, { lang: mapLocaleToLang(locale) })

  return {
    props: {
      data: {
        pageData,
        menuData,
      },
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPagePaths('where-we-are')

  return {
    paths: paths,
    fallback: true,
  }
}

export default Page
