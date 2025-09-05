'use client'
import { forwardRef, useRef } from 'react'
import singletonRouter from 'next/router'
import Blocks from '../../portableText/Blocks'
import type { NewsRoomPageType } from '../../types'
import { Heading, Typography } from '@/core/Typography'
import NewsRoomFilters from './Filters/NewsroomFilters'
import { ResourceLink } from '@/core/Link'
import { getIsoFromLocale } from '../../lib/localization'
import { Flags } from '../../common/helpers/datasetHelpers'
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs'
import { SearchClient, SearchOptions, SearchResponse, UiState } from 'instantsearch.js'
import { Configure } from 'react-instantsearch'
import NewsSections from './NewsSections/NewsSections'
import QuickSearch from './QuickSearch/QuickSearch'
import { searchClient as client } from '../../lib/algolia'
import { Pagination } from '../../pageComponents/shared/search/pagination/Pagination'
import { List } from '@/core/List'
import { PaginationContextProvider } from '../../common/contexts/PaginationContext'
import { InstantSearchNext, InstantSearchNextRouting } from 'react-instantsearch-nextjs'
import { useTranslations } from 'next-intl'
import { FacetFilters } from 'algoliasearch'

type NewsRouteState = { query?: string; page?: number; topics?: string[]; years?: string[]; countries?: string[] }

type NewsRoomTemplateProps = {
  locale?: string
  pageData?: NewsRoomPageType | undefined
  slug?: string
  initialSearchResponse: SearchResponse<any>
}

const NewsRoomTemplate = forwardRef<HTMLElement, NewsRoomTemplateProps>(function NewsRoomTemplate(
  { locale, pageData, initialSearchResponse },
  ref,
) {
  const { ingress, title, subscriptionLink, subscriptionLinkTitle, localNewsPages, fallbackImages } = pageData || {}

  const t = useTranslations()
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)
  const indexName = `${envPrefix}_NEWS_${isoCode}`
  const resultsRef = useRef<HTMLDivElement>(null)

  const routing = {
    router: createInstantSearchRouterNext<NewsRouteState>({
      singletonRouter,
      serverUrl: `https://www.equinor.com${isoCode === 'nb-NO' ? '/no/nyheter' : '/news'}`, // temporary fix for url to be available during build time
      routerOptions: {
        /*createURL: ({ qsModule, routeState, location }) => {
          if (singletonRouter.locale !== locale) return location.href
          const queryParameters: any = {}

          if (routeState.query) {
            queryParameters.query = routeState.query
          }
          if (routeState.page !== 1) {
            queryParameters.page = routeState.page
          }
          if (routeState.topics) {
            queryParameters.topics = routeState.topics
          }
          if (routeState.years) {
            queryParameters.years = routeState.years
          }
          if (routeState.countries) {
            queryParameters.countries = routeState.countries
          }

          const queryString = qsModule.stringify(queryParameters, {
            addQueryPrefix: true,
            arrayFormat: 'repeat',
            format: 'RFC1738',
            encode: false,
          })
          return `${location.pathname}${queryString}`
        },*/
        parseURL: ({ qsModule, location }) => {
          const {
            query = '',
            page,
            topics = [],
            years = [],
            countries = [],
          }: NewsRouteState = qsModule.parse(location.search.slice(1))

          const allTopics = Array.isArray(topics) ? topics : [topics].filter(Boolean)
          const allYears = Array.isArray(years) ? years : [years].filter(Boolean)
          const allCountries = Array.isArray(countries) ? countries : [countries].filter(Boolean)
          return {
            query: query,
            page,
            topics: allTopics,
            years: allYears,
            countries: allCountries,
          } as NewsRouteState
        },
        push(url) {
          if (singletonRouter.asPath.split('?')[1] !== url.split('?')[1]) {
            // replace url only if there is a change in query params
            singletonRouter.replace(url, undefined, { scroll: false })
          }
        },
        cleanUrlOnDispose: false,
      },
    }),
    stateMapping: {
      stateToRoute(uiState: UiState) {
        const indexUiState = uiState[indexName] || {}
        return {
          query: indexUiState.query,
          years: indexUiState.refinementList?.year,
          topics: indexUiState.refinementList?.topicTags,
          countries: indexUiState.refinementList?.countryTags,
          page: indexUiState?.page,
        } as NewsRouteState
      },
      routeToState(routeState: NewsRouteState) {
        return {
          [indexName]: {
            query: routeState.query,
            refinementList: {
              year: routeState.years,
              topicTags: routeState.topics,
              countryTags: routeState.countries,
            },
            page: routeState.page,
          },
        } as UiState
      },
    },
  } as InstantSearchNextRouting<UiState, NewsRouteState>
  const searchClient = client()

  const queriedSearchClient: SearchClient = {
    ...searchClient,
    search(requests: Array<{ indexName: string; params: SearchOptions }>) {
      const facetFilterSet = new Set(requests.map((it) => it.params.facetFilters).flat(2))
      const hasEmptyQuery = requests.every(({ params }: { indexName: string; params: SearchOptions }) => !params.query)

      if (hasEmptyQuery && facetFilterSet.size == 2) {
        console.log('Server cache hit')
        console.log(JSON.stringify(requests))
        return Promise.resolve({
          results: requests.map(() => initialSearchResponse),
        })
      }
      console.log('Cache not hit for below request')
      console.log(JSON.stringify(facetFilterSet))
      return searchClient.search(requests)
    },
  }

  return (
    <PaginationContextProvider defaultRef={resultsRef}>
      <main ref={ref}>
        <InstantSearchNext
          searchClient={queriedSearchClient}
          future={{ preserveSharedStateOnUnmount: false }}
          indexName={indexName}
          routing={routing}
        >
          <Configure
            facetingAfterDistinct
            maxValuesPerFacet={100}
            facetFilters={['type:news', 'topicTags:-Crude Oil Assays']}
          />

          <div className="flex flex-col gap-8 lg:gap-12">
            <div className="dark bg-slate-blue-95 py-24">
              <div className="mx-auto flex max-w-viewport grid-rows-2 flex-col gap-4 px-layout-sm">
                {title && <Heading value={title} as="h1" variant="h2" />}
                {ingress && <Blocks value={ingress} />}
                <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:justify-between">
                  <QuickSearch />
                  <List
                    role="navigation"
                    className="max-lg:w-full"
                    listClassName={'list-none'}
                    aria-label={t('newsroom_related_links')}
                  >
                    <List.Item className="w-full">
                      {subscriptionLink?.link?.slug && (
                        <ResourceLink href={subscriptionLink.link.slug}>{subscriptionLinkTitle}</ResourceLink>
                      )}
                    </List.Item>
                    {localNewsPages &&
                      localNewsPages?.length > 0 &&
                      localNewsPages?.map((localNewsPage) => {
                        return localNewsPage?.link?.slug ? (
                          <List.Item key={localNewsPage.id} className="w-full">
                            <ResourceLink type={localNewsPage.type} href={localNewsPage?.link?.slug}>
                              {localNewsPage?.label}
                            </ResourceLink>
                          </List.Item>
                        ) : null
                      })}
                  </List>
                </div>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-viewport flex-col gap-8 pb-12 lg:grid lg:grid-cols-[27%_1fr] lg:gap-12 lg:px-layout-sm">
              <aside className="flex flex-col gap-4 max-lg:px-layout-sm lg:sticky lg:top-6 lg:gap-6 lg:self-start">
                <NewsRoomFilters />
              </aside>
              <div className="flex flex-col max-lg:px-4">
                <Typography id="newsroom_news" as="h2" className="sr-only">
                  {t('newsroom_newslist_header')}
                </Typography>
                <NewsSections fallbackImages={fallbackImages} />
                <Pagination hitsPerPage={20} className="w-full justify-center py-12" />
              </div>
            </div>
          </div>
        </InstantSearchNext>
      </main>
    </PaginationContextProvider>
  )
})

export default NewsRoomTemplate
