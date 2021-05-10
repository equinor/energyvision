import { newsQuery, pageQuery } from './queries'

const getQuery = (docType: string) => {
  // @TODO A more sophisticated mapper to avoid to hard code this here
  // @TODO What to do about the landing pages
  switch (docType) {
    case 'news':
      return newsQuery
    default:
      return pageQuery
  }
}

const getQueryParams = (docType: string, slugArray: string[]) => {
  const slug = `/${slugArray.join('/')}`
  switch (docType) {
    case 'news':
      return { slug: slug }
    default:
      return { slug: slug, pageType: `${docType}_page` }
  }
}
export const getQueryFromSlug = (slugArray: string[] = []) => {
  const [slugStart] = slugArray
  console.log(slugArray)
  // Quick n' dirty
  const docType = slugStart === 'news' ? 'news' : 'page'

  // const queryParams = { slug: `/${slugArray.join('/')}` }

  return {
    queryParams: getQueryParams(slugStart, slugArray),
    query: getQuery(slugStart),
    docType: docType,
  }
}
