import { newsQuery, careersQuery, whatWeDoQuery } from './queries'

const getQuery = (docType: string) => {
  // @TODO A more sophisticated mapper to avoid to hard code this here
  // @TODO What to do about the landing pages
  switch (docType) {
    case 'news':
      return newsQuery
    case 'careers':
      return careersQuery
    case 'what-we-do':
      return whatWeDoQuery
    default:
      return newsQuery
  }
}

export const getQueryFromSlug = (slugArray: string[] = []) => {
  const [slugStart] = slugArray
  console.log(slugArray)
  // Quick n' dirty
  const docType = slugStart === 'news' ? 'news' : 'page'

  const queryParams = { slug: `/${slugArray.join('/')}` }

  return {
    queryParams,
    query: getQuery(slugStart),
    docType: docType,
  }
}
