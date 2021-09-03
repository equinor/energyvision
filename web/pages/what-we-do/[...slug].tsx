import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'
import getConfig from 'next/config'
import type { AppProps } from 'next/app'
import { Menu } from '../../tempcomponents/shared/Menu'
import { Layout } from '@components'
import { menuQuery } from '../../lib/queries/menu'
import { getClient } from '../../lib/sanity.server'
import { mapLocaleToLang } from '../../lib/localization'

const { publicRuntimeConfig } = getConfig()

const OldTopicPage = dynamic(() => import('../../tempcomponents/pageTemplates/OldTopicPage'))

const Page = ({ data }: any): JSX.Element => {
  if (!data || !data.pageData) {
    return <ErrorPage statusCode={404} />
  }

  return <OldTopicPage data={data.pageData} />
}

// eslint-disable-next-line react/display-name
Page.getLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subcscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page

  const { data, preview } = props

  const slugs = {
    en_GB: data?.pageData?.allSlugs?.en_GB,
    nb_NO: data?.pageData?.allSlugs?.nb_NO,
  }
  return (
    <Layout preview={preview}>
      <Menu slugs={slugs} data={data?.menuData} />
      {page}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale = 'en' }) => {
  const pagePathArray = params?.slug as string[]
  const pagePath = pagePathArray.join('/')
  const archiveSeverURL = publicRuntimeConfig.archiveStorageURL
  /** Check if the required page is old archived AEM page or not
   * because AEM also has archived pages which has 'archive' the page path */
  const response = await fetch(`${archiveSeverURL}/${locale}/what-we-do/${pagePath}.json`)
  const menuData = await getClient(false).fetch(menuQuery, { lang: mapLocaleToLang(locale) })

  let pageData
  try {
    pageData = await response.json()
  } catch (err) {
    console.log('error', err)
    pageData = null
  }

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
