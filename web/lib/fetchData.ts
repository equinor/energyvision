import { getClient } from './sanity.server'
import type { NewsQuery, QueryParams } from './queryFromSlug'

export const fetchData = async (
  query: string | NewsQuery,
  queryParams: QueryParams,
  isNews: boolean | undefined,
  preview: boolean,
) => {
  if (isNews) {
    const { newsQuery, localNewsQuery } = query as NewsQuery
    const newsData = await getClient(preview).fetch(newsQuery, queryParams)

    if (!newsData?.news) {
      return await getClient(preview).fetch(localNewsQuery, queryParams)
    }
    return newsData
  }

  return await getClient(preview).fetch(query as string, queryParams)
}
