import { newsQuery, pageQuery, pageQueryById } from './queries'

export const getQueryFromSlug = (slugArray: string[] = ['']) => {
  const [slugStart] = slugArray
  const slug = `/${slugArray.join('/')}` || ''

  console.log(slugStart)

  if (slugStart.startsWith('drafts.')) {
    // We are in preview mode for content that has currently no slug (no routes)
    return {
      queryParams: { id: slugStart },
      query: pageQueryById,
      docType: 'page',
    }
  }

  switch (slugStart) {
    case '':
      return {
        queryParams: { slug: [] },
        query: '',
        docType: 'home',
      }
    case 'news':
      return {
        queryParams: { slug: slug },
        query: newsQuery,
        docType: 'news',
      }
    default:
      return {
        queryParams: { slug: slug, pageType: `${slugStart}` },
        query: pageQuery,
        docType: 'page',
      }
  }
}
