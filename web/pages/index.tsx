/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'
import { Layout } from '../sections/Layout/Layout'
import { defaultLanguage, languages } from '../languages'
import Header from '../sections/Header/Header'
import { FormattedMessage } from 'react-intl'
import getIntl from '../common/helpers/getIntl'
import getPageSlugs from '../common/helpers/getPageSlugs'
import { getComponentsData } from '../lib/fetchData'
import { useContext, useEffect } from 'react'
import { PreviewContext } from '../lib/contexts/PreviewContext'
import { getQueryFromSlug } from '../lib/queryFromSlug'

const HomePage = dynamic(() => import('../pageComponents/pageTemplates/HomePage'))

// @TODO Improve types here, don't use any
export default function Page({ data, preview = false }: any) {
  const router = useRouter()

  const { setIsPreview } = useContext(PreviewContext)

  useEffect(() => {
    setIsPreview(preview)
  }, [setIsPreview, preview])

  const { pageData } = data

  const slug = pageData?.slug

  if (!router.isFallback && !slug && !data?.queryParams?.id) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return (
      <p>
        <FormattedMessage id="loading" defaultMessage="Loading..." />
      </p>
    )
  }
  return <HomePage data={pageData} />
}

// eslint-disable-next-line react/display-name
Page.getLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data } = props

  const slugs = getPageSlugs(data)
  const hasSticky =
    data?.pageData?.stickyMenu && data?.pageData?.stickyMenu?.links && data?.pageData?.stickyMenu?.links?.length > 0

  return (
    <Layout footerData={data?.footerData} intl={data?.intl} hasSticky={hasSticky}>
      <>
        <Header slugs={slugs} menuData={data?.menuData} stickyMenuData={data?.pageData?.stickyMenu} />
        {page}
      </>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale = defaultLanguage.locale }) => {
  if (!languages.map((it) => it.locale).includes(locale))
    return {
      notFound: true,
    }
  const { query, queryParams } = await getQueryFromSlug(params?.slug as string[], locale)

  const intl = await getIntl(locale, preview)
  const { menuData, pageData, footerData } = await getComponentsData(
    {
      query,
      queryParams,
    },
    preview,
  )

  const { data, slugs } = pageData
  return {
    props: {
      preview,
      data: {
        query,
        queryParams,
        pageData: { ...data, slugs },
        menuData,
        footerData,
        intl,
      },
    },
    revalidate: 60,
    notFound: !pageData,
  }
}
