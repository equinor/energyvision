import { getClient } from '../../lib/sanity.server'
import type { QueryParams } from '../../lib/queryFromSlug'
import { Flags } from '../../common/helpers/datasetHelpers'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { footerQuery } from '@/sanity/queries/footer'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import { sanityFetch } from '@/sanity/lib/live'

export const getPageData = async (page: { query: string; queryParams: QueryParams }) => {
  const pageResults = await sanityFetch({
    query: page.query,
    params: { ...page.queryParams },
  })

  return { pageData: pageResults.data }
}
export const getHeaderAndFooterData = async (queryParams: QueryParams) => {
  const menuQuery = Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery
  const menuResults = await sanityFetch({
    query: menuQuery,
    params: { ...queryParams },
  })
  const footerResults = await sanityFetch({
    query: footerQuery,
    params: { ...queryParams },
  })

  return { menuData: menuResults.data, footerData: footerResults.data }
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
