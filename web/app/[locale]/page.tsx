/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@/sections/Header/Header'
import { Layout } from '@/sections/Layout/Layout'
import { getQueryFromSlug } from '../../lib/queryFromSlug'
import { getComponentsData } from '../../sanity/lib/fetchData'
import getPageSlugs from '../../common/helpers/getPageSlugs'
import { notFound } from 'next/navigation'
import HomePage from '../../pageComponents/pageTemplates/HomePage'
import { languages } from '@/languages'

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

  const { query, queryParams } = await getQueryFromSlug(params?.slug as string[], locale)

  const {
    menuData,
    pageData: fullData,
    footerData,
  } = await getComponentsData({
    query,
    queryParams,
  })

  console.log('fullData', fullData)
  const { pageData: data, slugs: s } = fullData
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
