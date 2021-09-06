import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import type { AppProps } from 'next/app'
import { menuQuery } from '../../lib/queries/menu'
import { getClient } from '../../lib/sanity.server'
import { mapLocaleToLang } from '../../lib/localization'
import { getPageData, getPageLayout } from '../../common/helpers/staticPageHelpers'
import OldTopicPage from '../../tempcomponents/pageTemplates/OldTopicPage'

const Page = ({ data }: any): JSX.Element => {
  if (!data || !data.pageData) {
    return <ErrorPage statusCode={404} />
  }

  return <OldTopicPage data={data.pageData} />
}

// eslint-disable-next-line react/display-name
Page.getLayout = (page: AppProps) => getPageLayout(page)

export const getStaticProps: GetStaticProps = async ({ params, locale = 'en' }) => {
  const slugArray = params?.slug as string[]
  const slug = slugArray.join('/')
  const pageData = await getPageData(locale, 'what-we-do', slug)
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
  const paths = ['/what-we-do/exploration']

  return {
    paths: paths,
    fallback: true,
  }
}

export default Page
