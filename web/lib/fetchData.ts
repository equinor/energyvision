import { getClient } from './sanity.server'
import type { QueryParams } from './queryFromSlug'
import { Flags } from '../common/helpers/datasetHelpers'
import { filterDataToSingleItem } from './filterDataToSingleItem'
import { footerQuery } from './queries/footer'
import { simpleMenuQuery } from './queries/simpleMenu'
import { menuQuery as globalMenuQuery } from './queries/menu'
import { allNewsCountryTags, allNewsDocuments, allNewsTopicTags } from './queries/newsroom'

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
export const getNewsroomComponentsData = async (page: { query: string; queryParams: QueryParams }, preview = false) => {
  const client = getClient(preview)

  const menuQuery = Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery
  const menuDataWithDrafts = await client.fetch(menuQuery, page.queryParams)
  const pageDataWithDrafts = await client.fetch(page.query, page.queryParams)
  const newsList = await client.fetch(allNewsDocuments, page.queryParams)
  const newsTopicTagList = await client.fetch(allNewsTopicTags, page.queryParams)
  const newsCountryTagList = await client.fetch(allNewsCountryTags, page.queryParams)
  const footerDataWithDrafts = await client.fetch(footerQuery, page.queryParams)

  const menuData = filterDataToSingleItem(menuDataWithDrafts, preview)
  const componentsPageData = filterDataToSingleItem(pageDataWithDrafts, preview)
  const pageData = {
    ...componentsPageData,
    newsList,
    newsTopicTagList,
    newsCountryTagList,
  }
  const footerData = filterDataToSingleItem(footerDataWithDrafts, preview)

  return {
    menuData,
    pageData,
    footerData,
  }
}
type NewsroomQueryParams = {
  lang?: string
  tags?: string[]
  countryTags?: string[]
  years?: string[]
}
export const getNewsroomData = async (
  fetchQuery: { query: string; queryParams: NewsroomQueryParams },
  preview = false,
) => {
  const client = getClient(preview)
  console.log('fetchQuery.queryParams', fetchQuery.queryParams)
  try {
    const results = await client.fetch(fetchQuery.query, fetchQuery.queryParams)
    console.log('results from sanity', results)
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
