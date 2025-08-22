import { cache } from 'react'
import { getClient } from '../../lib/sanity.server'
import type { QueryParams } from '../../lib/queryFromSlug'
import { Flags } from '../../common/helpers/datasetHelpers'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { footerQuery } from '@/sanity/queries/footer'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import { sanityFetch } from '@/sanity/lib/live'
import { pageDataForHeaderQuery } from '../queries/routes'
import { homePageDataForHeaderQuery } from '../queries/homePage'

//export const getPageData = async (page: { query: string; queryParams: QueryParams }) => {
export const getPageData = cache(async (page: { query: string; queryParams: QueryParams }) => {
  const pageResults = await sanityFetch({
    query: page.query,
    params: { ...page.queryParams },
  })
  console.log('pageResults.data', pageResults.data)

  return { pageData: pageResults.data }
})

export const getHeaderAndFooterData = async (queryParams: QueryParams) => {
  const menuQuery = Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery
  const menuResults = await sanityFetch({
    query: menuQuery,
    params: {
      lang: queryParams?.lang ?? 'en_GB',
      slug: queryParams?.slug ?? '/',
    },
  })
  const footerResults = await sanityFetch({
    query: footerQuery,
    params: {
      lang: queryParams?.lang ?? 'en_GB',
      slug: queryParams?.slug ?? '/',
    },
  })

  return { menuData: menuResults.data, footerData: footerResults.data }
}

//export const getPageDataForHeader = async (queryParams: QueryParams) => {
export const getPageDataForHeader = cache(async (queryParams: QueryParams) => {
  console.log('getPageDataForHeader slug', queryParams?.slug)
  console.log('getPageDataForHeader test', !!queryParams?.slug)
  const isHomepage = typeof queryParams?.slug === undefined || queryParams?.slug === ''
  console.log('getPageDataForHeader isHomepage ', isHomepage)
  const pageResults = await sanityFetch({
    query: isHomepage ? homePageDataForHeaderQuery : pageDataForHeaderQuery,
    params: {
      lang: queryParams?.lang ?? 'en_GB',
      slug: queryParams?.slug ?? '/',
    },
  })
  console.log('pageResults', pageResults)
  return { pageData: pageResults.data }
})

export type MagazineQueryParams = {
  lang?: string
  magazineTag?: string
  lastId?: string
  lastPublishedAt?: string
}

export const getData = async (fetchQuery: { query: string; queryParams: MagazineQueryParams }, preview = false) => {
  const client = getClient(preview)
  const { query, queryParams } = fetchQuery
  try {
    const results = await client.fetch(query, queryParams)
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
