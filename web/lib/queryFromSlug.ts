import { newsQuery, pageQuery } from './queries'

export const getQueryFromSlug = (slugArray: string[] = ['']) => {
  const [slugStart] = slugArray
  const slug = `/${slugArray.join('/')}`

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
