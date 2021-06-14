import { newsQuery, pageQuery, pageQueryById } from './queries'

const isSlugID = (slug: string): boolean => {
  const str = slug.startsWith('draft.') ? slug.split('.')[1] : slug
  // regex magic to see if string is a UUID
  const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

  return regExp.test(str)
}

export const getQueryFromSlug = (slugArray: string[] = ['']) => {
  const [slugStart] = slugArray
  const slug = `/${slugArray.join('/')}` || ''

  console.log(slugStart)

  if (isSlugID(slugStart)) {
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
