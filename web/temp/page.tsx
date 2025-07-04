/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@/sections/Header/Header'
import { Layout } from '@/sections/Layout/Layout'
import { notFound } from 'next/navigation'
import { getRoutePaths } from '@/sanity/queries/paths/getPaths'
import { getValidLanguagesLocales, languages } from '@/languages'
import { getQueryFromSlug } from '@/lib/queryFromSlug'
import { getComponentsData } from '@/sanity/lib/fetchData'
import getPageSlugs from '@/common/helpers/getPageSlugs'
import HomePage from '@/templates/homepage/HomePage'
//import { useContext, useEffect } from 'react'
//import { PreviewContext } from '../../../lib/contexts/PreviewContext'
//import { FormattedMessage } from 'react-intl'

export async function generateStaticParams() {
  const locales = getValidLanguagesLocales()
  const routePaths = await getRoutePaths(locales)
  console.log('static params', routePaths)
  const paths = routePaths.map((path) => ({
    params: { slug: path.slug },
    locale: path.locale,
  }))

  return paths
}

export const dynamicParams = true // fallback to true in app router

/*type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const { id } = await params

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}*/

export default async function Page({ params }: any) {
  const { locale } = await params
  if (!languages.map((it) => it.locale).includes(locale)) notFound()
  console.log('params?.slug', params?.slug)
  const { query, queryParams } = await getQueryFromSlug(params?.slug as string[], locale)

  const {
    menuData,
    pageData: fullData,
    footerData,
  } = await getComponentsData(
    {
      query,
      queryParams,
    },
    false,
  )
  const { data, slugs: s } = fullData
  const pageData = { ...data, s }
  if (!pageData) notFound()
  const slugs = getPageSlugs({ pageData })
  const hasSticky = pageData?.stickyMenu && pageData?.stickyMenu?.links && pageData?.stickyMenu?.links?.length > 0

  //const router = useRouter()

  //const { setIsPreview } = useContext(PreviewContext)

  /*useEffect(() => {
    setIsPreview(preview)
  }, [setIsPreview, preview])*/

  const slug = pageData?.slug
  /*if (!router.isFallback && !slug && queryParams?.id) {
    return <ErrorPage pageData={pageData} />
  }*/

  const template = pageData?.template || null

  if (!template) console.warn('Missing template for', slug)

  /*if (router.isFallback) {
    return (
      <p>
        <FormattedMessage id="loading" defaultMessage="Loading..." />
      </p>
    )
  }*/

  return (
    <Layout footerData={footerData} hasSticky={hasSticky}>
      <>
        <Header slugs={slugs} menuData={menuData} stickyMenuData={pageData?.stickyMenu} />
        <HomePage data={pageData} />
      </>
    </Layout>
  )
}
