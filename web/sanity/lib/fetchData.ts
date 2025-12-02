import { Flags } from '@/sanity/helpers/datasetHelpers'
import { sanityFetch } from '@/sanity/lib/live'
import { footerQuery } from '@/sanity/queries/footer'
import { menuQuery as globalMenuQuery } from '@/sanity/queries/menu'
import { simpleMenuQuery } from '@/sanity/queries/simpleMenu'
import type { QueryParams } from '../helpers/queryFromSlug'
import { homePageDataForHeaderQuery } from '../queries/homePage'
import { newsroomDataForHeaderQuery } from '../queries/newsroom'
import { pageDataForHeaderQuery } from '../queries/routes'
import { dataset } from './api'

export const getPageData = async (page: {
  query: string
  queryParams: QueryParams
}) => {
  try {
    const { data } = await sanityFetch({
      query: page.query,
      params: { ...page.queryParams },
      requestTag: "getPageData"+"."+dataset
    })

    return { pageData: data }
  } catch (error) {
    console.warn('getPageData error:', error)
    return { isError: true, pageData: null }
  }
}

export const getFooterData = async (lang: string) => {
  try {
    const { data } = await sanityFetch({
      query: footerQuery,
      params: {
        lang: lang ?? 'en_GB',
      },
    })
    return { footerData: data }
  } catch (error) {
    console.warn('getFooterData error:', error)
    return { isError: true, footerData: null }
  }
}
export const getHeaderData = async (queryParams: QueryParams) => {
  const menuQuery = Flags.HAS_FANCY_MENU ? globalMenuQuery : simpleMenuQuery

  try {
    const { data } = await sanityFetch({
      query: menuQuery,
      params: {
        lang: queryParams?.lang ?? 'en_GB',
      },
    })
    return { headerData: data }
  } catch (error) {
    console.warn('getHeaderData error:', error)
    return { isError: true, headerData: null }
  }
}

//export const getPageDataForHeader = async (queryParams: QueryParams) => {
export const getPageDataForHeader = async (queryParams: QueryParams) => {
  const isHomepage =
    typeof queryParams?.slug === 'undefined' || queryParams?.slug === ''
  try {
    const { data } = await sanityFetch({
      query: isHomepage ? homePageDataForHeaderQuery : pageDataForHeaderQuery,
      params: {
        lang: queryParams?.lang ?? 'en_GB',
        slug: queryParams?.slug ?? '/',
      },
    })
    return { pageData: data }
  } catch (error) {
    console.warn('getPageDataForHeader error:', error)
    return { isError: true, pageData: null }
  }
}

export const getNewsroomDataForHeader = async (queryParams: QueryParams) => {
  try {
    const { data } = await sanityFetch({
      query: newsroomDataForHeaderQuery,
      params: {
        lang: queryParams?.lang ?? 'en_GB',
      },
    })
    return { pageData: data }
  } catch (error) {
    console.warn('getNewsroomDataForHeader error:', error)
    return { isError: true, pageData: null }
  }
}

export type MagazineQueryParams = {
  lang?: string
  magazineTag?: string
  lastId?: string
  lastPublishedAt?: string
}

export const getData = async (fetchQuery: {
  query: string
  queryParams: MagazineQueryParams
}) => {
  const { query, queryParams } = fetchQuery
  try {
    const results = await sanityFetch({
      query,
      params: queryParams,
    })
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
