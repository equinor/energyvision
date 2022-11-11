import { getClient } from './sanity.server'
import type { QueryParams } from './queryFromSlug'
import { Flags } from '../common/helpers/datasetHelpers'
import { filterDataToSingleItem } from './filterDataToSingleItem'
import { footerQuery } from './queries/footer'
import { simpleMenuQuery } from './queries/simpleMenu'
import { menuQuery as globalMenuQuery } from './queries/menu'

export const getComponentsData = async (page: { query: string; queryParams: QueryParams }, preview = false) => {
  const client = getClient(preview)

  const menuQuery = Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery
  const menuDataWithDrafts = await client.fetch(menuQuery, page.queryParams)
  const pageDataWithDrafts = await client.fetch(page.query, page.queryParams)
  const footerDataWithDrafts = await client.fetch(footerQuery, page.queryParams)

  const menuData = filterDataToSingleItem(menuDataWithDrafts, preview)
  const pageData = filterDataToSingleItem(pageDataWithDrafts, preview)
  const footerData = filterDataToSingleItem(footerDataWithDrafts, preview)

  return { menuData, pageData, footerData }
}
