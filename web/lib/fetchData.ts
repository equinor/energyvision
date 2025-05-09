import { getClient, PreviewContext } from './sanity.server'
import type { QueryParams as CustomQueryParams } from './queryFromSlug'
import { Flags } from '../common/helpers/datasetHelpers'
import { filterDataToSingleItem } from './filterDataToSingleItem'
import { footerQuery } from './queries/footer'
import { simpleMenuQuery } from './queries/simpleMenu'
import { menuQuery as globalMenuQuery } from './queries/menu'
import { QueryParams } from 'next-sanity'

export const getComponentsData = async (
  page: { query: string; queryParams: CustomQueryParams },
  previewContext: PreviewContext,
) => {
  const client = getClient(previewContext)

  const menuQuery = Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery
  const menuDataWithDrafts = await client.fetch(menuQuery, page.queryParams)
  const pageDataWithDrafts = await client.fetch(page.query, page.queryParams)
  const footerDataWithDrafts = await client.fetch(footerQuery, page.queryParams)

  const menuData = filterDataToSingleItem(menuDataWithDrafts, previewContext)
  const pageData = filterDataToSingleItem(pageDataWithDrafts, previewContext)
  const footerData = filterDataToSingleItem(footerDataWithDrafts, previewContext)

  return { menuData, pageData, footerData }
}

export type MagazineQueryParams = {
  lang?: string
  tag?: string | undefined
  lastId?: string
  lastPublishedAt?: string
}

export const getData = async (
  fetchQuery: { query: string; queryParams: MagazineQueryParams },
  previewContext: PreviewContext,
) => {
  const client = getClient(previewContext)
  try {
    const results = await client.fetch(fetchQuery.query, fetchQuery.queryParams as QueryParams)
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
