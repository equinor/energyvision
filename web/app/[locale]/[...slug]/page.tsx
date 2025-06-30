import { getQueryFromSlug } from '../../../lib/queryFromSlug'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { getPageData } from '@/sanity/lib/fetchData'

const MagazinePage = dynamic(() => import('@/templates/magazine/MagazinePage'))
const LandingPage = dynamic(() => import('@/pageComponents/pageTemplates/LandingPage'))
const EventPage = dynamic(() => import('@/pageComponents/pageTemplates/Event'))
const NewsPage = dynamic(() => import('@/pageComponents/pageTemplates/News'))
const TopicPage = dynamic(() => import('@/pageComponents/pageTemplates/TopicPage'))

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
  const { locale, slug: s } = await params
  console.log('s', s)
  const { query, queryParams } = await getQueryFromSlug(s as string[], locale)

  const { pageData } = await getPageData({
    query,
    queryParams,
  })
  if (!pageData) notFound()
  console.log('[locale]>Page pageData', pageData)

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

  const getTemplate = () => {
    switch (template) {
      case 'landingPage':
        return <LandingPage data={pageData} />
      case 'event':
        // eslint-disable-next-line react/jsx-no-undef
        return <EventPage data={pageData} />
      case 'news':
      case 'localNews':
        // eslint-disable-next-line react/jsx-no-undef
        return <NewsPage data={pageData} />
      case 'magazine':
        return <MagazinePage data={pageData} />
      default:
        return <TopicPage data={pageData} />
    }
  }

  return getTemplate()
}
