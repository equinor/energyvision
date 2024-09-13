import { forwardRef, useRef } from 'react'
import singletonRouter from 'next/router'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import type { NewsRoomPageType } from '../../types'
import { Heading, Typography } from '@core/Typography'
import NewsRoomFilters from './Filters/NewsroomFilters'
import { ResourceLink } from '@core/Link'
import { getIsoFromLocale } from '../../lib/localization'
import { Flags } from '../../common/helpers/datasetHelpers'
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs'
import { UiState } from 'instantsearch.js'
import Seo from '../../pageComponents/shared/Seo'
import { Configure, InstantSearch } from 'react-instantsearch'
import { FormattedMessage, useIntl } from 'react-intl'
import NewsSections from './NewsSections/NewsSections'
import QuickSearch from './QuickSearch/QuickSearch'
import { searchClient } from '../../lib/algolia'
import { PaginationContextProvider } from '../../pageComponents/shared/search/pagination/PaginationContext'
import { Pagination } from '../../pageComponents/shared/search/pagination/Pagination'
import { List } from '@core/List'

type NewsRoomTemplateProps = {
  isServerRendered?: boolean
  locale?: string
  pageData?: NewsRoomPageType | undefined
  slug?: string
  url?: string
}

//const client = algoliasearch(algolia.applicationId, algolia.searchApiKey)

const NewsRoomTemplate = forwardRef<HTMLElement, NewsRoomTemplateProps>(function NewsRoomTemplate(
  { isServerRendered, locale, pageData, slug, url },
  ref,
) {
  const { ingress, title, seoAndSome, subscriptionLink, subscriptionLinkTitle, localNewsPages, fallbackImages } =
    pageData || {}
  const intl = useIntl()
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)
  const indexName = `${envPrefix}_NEWS_${isoCode}`
  const resultsRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line
  // @ts-ignore: @TODO: The types are not correct
  const createURL = ({ qsModule, routeState, location }) => {
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
    })
    return `${location.pathname}${queryString}`
  }
  // eslint-disable-next-line
  // @ts-ignore: @TODO: The types are not correct
  const parseURL = ({ qsModule, location }) => {
    const { query = '', page, topics = '', years = '', countries = '' }: any = qsModule.parse(location.search.slice(1))

    const allTopics = Array.isArray(topics) ? topics : [topics].filter(Boolean)
    const allYears = Array.isArray(years) ? years : [years].filter(Boolean)
    const allCountries = Array.isArray(countries) ? countries : [countries].filter(Boolean)
    return {
      query: query,
      page,
      topics: allTopics,
      years: allYears,
      countries: allCountries,
      indexName: indexName,
    }
  }

  const routing = {
    router: createInstantSearchRouterNext({
      singletonRouter,
      serverUrl: url,
      routerOptions: {
        createURL: createURL,
        parseURL: parseURL,
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
          indexName: indexName,
        } as { query: any; page: any; topics: any[]; years: any[]; countries: any[]; indexName: string }
      },
      routeToState(routeState: any) {
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
        }
      },
    },
  }

  return (
    <PaginationContextProvider defaultRef={resultsRef}>
      <Seo seoAndSome={seoAndSome} slug={slug} pageTitle={title} />
      <main ref={ref} className="">
        <InstantSearch
          searchClient={
            isServerRendered
              ? searchClient({
                  headers: {
                    //@ts-ignore: TODO
                    Referer: url,
                  },
                })
              : searchClient(undefined)
          }
          future={{ preserveSharedStateOnUnmount: false }}
          indexName={indexName}
          routing={routing}
        >
          <Configure
            facetingAfterDistinct
            maxFacetHits={50}
            maxValuesPerFacet={100}
            facetFilters={['type:news', 'topicTags:-Crude Oil Assays']}
          />

          <div className="flex flex-col gap-8 lg:gap-12">
            <div className="bg-slate-blue-95 dark py-24">
              <div className="flex flex-col gap-4  grid-rows-2 mx-auto px-layout-sm max-w-viewport">
                {title && <Heading value={title} as="h1" variant="h2" />}
                {ingress && <Blocks value={ingress} />}
                <div className="w-full flex flex-col gap-8 lg:flex-row lg:justify-between items-center">
                  <QuickSearch />
                  <List
                    role="navigation"
                    className="max-lg:w-full"
                    listClassName={'list-none'}
                    aria-label={intl.formatMessage({
                      id: 'newsroom_related_links',
                      defaultMessage: 'Related links',
                    })}
                  >
                    <List.Item className="w-full">
                      {subscriptionLink?.slug && (
                        <ResourceLink href={subscriptionLink.slug} className="w-full">
                          {subscriptionLinkTitle}
                        </ResourceLink>
                      )}
                    </List.Item>
                    {localNewsPages &&
                      localNewsPages?.length > 0 &&
                      localNewsPages?.map((localNewsPage) => {
                        return localNewsPage?.link?.slug ? (
                          <List.Item key={localNewsPage.id} className="w-full">
                            <ResourceLink type={localNewsPage.type} href={localNewsPage?.link?.slug} className="w-full">
                              {localNewsPage?.label}
                            </ResourceLink>
                          </List.Item>
                        ) : null
                      })}
                  </List>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col lg:grid lg:grid-cols-[27%_1fr] gap-8 lg:gap-12 pb-12 lg:px-layout-sm mx-auto max-w-viewport">
              <aside className="lg:self-start lg:sticky lg:top-6 flex flex-col gap-4 lg:gap-6 max-lg:px-layout-sm">
                <NewsRoomFilters />
              </aside>
              <div className="flex flex-col max-lg:px-4">
                <Typography id="newsroom_news" as="h2" className="sr-only">
                  <FormattedMessage id="newsroom_newslist_header" defaultMessage="News" />
                </Typography>
                <NewsSections fallbackImages={fallbackImages} />
                <Pagination hitsPerPage={20} className="w-full justify-center py-12" />
              </div>
            </div>
          </div>
        </InstantSearch>
      </main>
    </PaginationContextProvider>
  )
})

export default NewsRoomTemplate
