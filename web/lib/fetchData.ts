import { getClient } from './sanity.server'
import type { NewsQuery, QueryParams } from './queryFromSlug'
import { isGlobal } from '../common/helpers/datasetHelpers'
import { filterDataToSingleItem } from './filterDataToSingleItem'
import { footerQuery } from './queries/footer'
import { simpleMenuQuery } from './queries/simpleMenu'
import { menuQuery as globalMenuQuery } from './queries/menu'

const fetchData = async (
  query: string | NewsQuery,
  queryParams: QueryParams,
  isNews: boolean | undefined,
  preview: boolean,
) => {
  if (isNews) {
    const { newsQuery, localNewsQuery } = query as NewsQuery
    const newsData = await getClient(preview).fetch(newsQuery, queryParams)
    if (newsData.news.length === 0) {
      return await getClient(preview).fetch(localNewsQuery, queryParams)
    }
    return newsData
  }

  return await getClient(preview).fetch(query as string, queryParams)
}

export const getComponentsData = async (
  page: { query: string | NewsQuery; queryParams: QueryParams },
  preview = false,
  isNews = false,
) => {
  const client = getClient(preview)

  const menuQuery = isGlobal ? globalMenuQuery : simpleMenuQuery
  const menuDataWithDrafts = await client.fetch(menuQuery, page.queryParams)
  const pageDataWithDrafts = await fetchData(page.query, page.queryParams, isNews, preview)
  const footerDataWithDrafts = await client.fetch(footerQuery, page.queryParams)

  const menuData = filterDataToSingleItem(menuDataWithDrafts, preview)
  const pageData = filterDataToSingleItem(pageDataWithDrafts, preview)
  const footerData = filterDataToSingleItem(footerDataWithDrafts, preview)

  return { menuData, pageData, footerData }
}
