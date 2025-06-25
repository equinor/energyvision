import { getClient } from './sanity.server'
import type { QueryParams } from './queryFromSlug'
import { Flags } from '../common/helpers/datasetHelpers'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { footerQuery } from '@/sanity/queries/footer'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import { sanityFetch } from '@/sanity/lib/live'

export const getComponentsData = async (page: { query: string; queryParams: QueryParams }, draftMode = false) => {
  const menuQuery = Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery
  const menuData = await sanityFetch({
    query: menuQuery,
    params: { ...page.queryParams },
  })

  const { pageData } = await sanityFetch({
    query: page.query,
    params: { ...page.queryParams },
  })
  const footerData = await sanityFetch({
    query: footerQuery,
    params: { ...page.queryParams },
  })

  /* Necessary?
  const menuData = filterDataToSingleItem(menuDataWithDrafts, preview)
  const pageData = filterDataToSingleItem(pageDataWithDrafts, preview)
  const footerData = filterDataToSingleItem(footerDataWithDrafts, preview) */

  return { menuData, pageData, footerData }
}

export type MagazineQueryParams = {
  lang?: string
  tag?: string | undefined
  lastId?: string
  lastPublishedAt?: string
}

export const getData = async (fetchQuery: { query: string; queryParams: MagazineQueryParams }, preview = false) => {
  const client = getClient(preview)
  try {
    const results = await client.fetch(fetchQuery.query, fetchQuery.queryParams)
    return {
      isSuccess: true,
      data: results,
    }
  } catch (error) {
    console.log('Error when fetching from Sanity', error)
    return {
      isError: true,
      data: [],
    }
  }
}
