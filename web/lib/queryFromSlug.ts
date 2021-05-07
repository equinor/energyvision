import { newsQuery } from './queries'

const getQuery = (docType: string) => {
  switch (docType) {
    case 'news':
      return newsQuery
    default:
      return newsQuery
  }
}

export const getQueryFromSlug = (slugArray: string[] = []) => {
  const [slugStart] = slugArray
  const queryParams = { slug: `/${slugArray.join('/')}` }

  return {
    queryParams,
    query: getQuery(slugStart),
    docType: slugStart,
  }
}
