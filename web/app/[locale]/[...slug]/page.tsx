import { getQueryFromSlug } from '../../../lib/queryFromSlug'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { getPageData } from '@/sanity/lib/fetchData'

const MagazinePage = dynamic(() => import('@/templates/magazine/MagazinePage'))
const LandingPage = dynamic(() => import('@/pageComponents/pageTemplates/LandingPage'))
const EventPage = dynamic(() => import('@/pageComponents/pageTemplates/Event'))
const NewsPage = dynamic(() => import('@/pageComponents/pageTemplates/News'))
const TopicPage = dynamic(() => import('@/pageComponents/pageTemplates/TopicPage'))

type Params = Promise<{ slug: string | string[]; locale: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

/* export async function generateMetadata(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
} */

export default async function Page(props: { params: Params; searchParams: SearchParams }) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { locale, slug: s } = params
  const searchQuery = searchParams.query
  console.log('slug page s', s)
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
