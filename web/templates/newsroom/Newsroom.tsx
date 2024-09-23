import { forwardRef, useRef, useState } from 'react'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import type { NewsRoomPageType } from '../../types'
import { Heading, Typography } from '@core/Typography'
import { ResourceLink } from '@core/Link'
import { getIsoFromLocale, getNameFromLocale } from '../../lib/localization'
import { Flags } from '../../common/helpers/datasetHelpers'
import Seo from '../../pageComponents/shared/Seo'
import { Configure, InstantSearch } from 'react-instantsearch'
import { FormattedMessage, useIntl } from 'react-intl'
import singletonRouter from 'next/router'
import NewsSections from './NewsSections/NewsSections'
import QuickSearch from './QuickSearch/QuickSearch'
import { searchClient as client } from '../../lib/algolia'
import { SearchClient } from 'algoliasearch/lite'
import { PaginationContextProvider } from '../../pageComponents/shared/search/pagination/PaginationContext'
import { Pagination } from '../../pageComponents/shared/search/pagination/Pagination'
import { List } from '@core/List'
import NewsRoomSanityFilters from './Filters/NewsroomSanityFilters'
import useRouterReplace, { useRouterClearParams } from '../../pageComponents/hooks/useRouterReplace'
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs'
import { UiState } from 'instantsearch.js'
import { stringify } from 'query-string'

type NewsRoomTemplateProps = {
  locale?: string
  pageData?: NewsRoomPageType | undefined
  slug?: string
}

export type SearchTags = {
  topic: string[]
  country: string[]
  year: string[]
}

const searchClient = client()
const queriedSearchClient: SearchClient = {
  ...searchClient,
  search(requests: any) {
    if (requests.every(({ params }: any) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      })
    }

    return searchClient.search(requests)
  },
}

const NewsRoomTemplate = forwardRef<HTMLElement, NewsRoomTemplateProps>(function NewsRoomTemplate(
  { locale, pageData, slug },
  ref,
) {
  const {
    ingress,
    title,
    seoAndSome,
    subscriptionLink,
    subscriptionLinkTitle,
    localNewsPages,
    fallbackImages,
    tags,
    news,
  } = pageData || {}
  const intl = useIntl()
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)
  const indexName = `${envPrefix}_NEWS_${isoCode}`
  const resultsRef = useRef<HTMLDivElement>(null)
  const [hasQuickSearch, setHasQuickSearch] = useState(false)
  const replaceUrl = useRouterReplace()
  const clearUrlParams = useRouterClearParams()
  const [newsList, setNewsList] = useState(news)
  console.log('news', news)

  const handleSearch = async (search: { topic: string[]; country: string[]; year: string[] }) => {
    if (search.topic?.length === 0 && search.country?.length === 0 && search.year.length === 0) {
      clearUrlParams()
    } else {
      replaceUrl(search)
    }
    const topicIds = search.topic?.map((t) => tags?.topic.find((tagTopic) => tagTopic.key === t)?.id)
    const countryIds = search.country?.map((t) => tags?.country.find((tagCountry) => tagCountry.key === t)?.id)
    const query = stringify({
      lang: getNameFromLocale(intl.locale),
      topic: topicIds ?? [],
      country: countryIds ?? [],
      year: search.year ?? [],
    })

    const res = await fetch(`/api/news/selection?${query}`)
    console.log('get news from sanity', res)
    let filteredNews = []
    try {
      const response = await res.json()
      filteredNews = response.news
    } catch (e) {
      console.log('Error', e)
    }
    setNewsList(filteredNews)
  }

  const handleClear = async () => {
    clearUrlParams()
    const res = await fetch(`/api/news/all`)
    console.log('get news from sanity', res)
    let filteredNews = []
    try {
      const response = await res.json()
      filteredNews = response.news
    } catch (e) {
      console.log('Error', e)
    }
    setNewsList(filteredNews)
  }

  // eslint-disable-next-line
  // @ts-ignore: @TODO: The types are not correct
  const createURL = ({ qsModule, routeState, location }) => {
    const queryParameters: any = {}
    if (routeState.query) {
      queryParameters.query = routeState.query
    }
    if (routeState.page !== 1) {
      queryParameters.page = routeState.page
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
    const { query = '', page }: any = qsModule.parse(location.search.slice(1))
    return {
      ...(query && { query: query }),
      ...(page && { page: page as number }),
      indexName: indexName,
    }
  }

  const routing = {
    router: createInstantSearchRouterNext({
      singletonRouter,
      routerOptions: {
        createURL: createURL,
        parseURL: parseURL,
        push(url) {
          if (url.split('?')[1]) {
            // replace url only if it has query params
            singletonRouter.replace(url)
          }
        },
      },
    }),
    stateMapping: {
      stateToRoute(uiState: UiState) {
        const indexUiState = uiState[indexName]
        return {
          ...(indexUiState?.query && { query: indexUiState.query }),
          ...(indexUiState?.page && { page: indexUiState?.page }),
          indexName: indexName,
        }
      },
      routeToState(routeState: any) {
        return {
          [indexName]: {
            ...(routeState.query && { query: routeState.query }),
            ...(routeState.page && { page: routeState.page as number }),
          },
        }
      },
    },
  }

  return (
    <PaginationContextProvider defaultRef={resultsRef}>
      <Seo seoAndSome={seoAndSome} slug={slug} pageTitle={title} />
      <main ref={ref} className="">
        <div className="flex flex-col gap-8 lg:gap-12">
          <InstantSearch
            future={{ preserveSharedStateOnUnmount: false }}
            searchClient={queriedSearchClient}
            indexName={indexName}
            routing={routing}
          >
            <Configure facetingAfterDistinct maxFacetHits={50} maxValuesPerFacet={100} facetFilters={['type:news']} />
            <div className="bg-slate-blue-95 dark py-24">
              <div className="flex flex-col gap-4  grid-rows-2 mx-auto px-layout-sm max-w-viewport">
                {title && <Heading value={title} as="h1" variant="h2" />}
                {ingress && <Blocks value={ingress} />}
                <div className="w-full flex flex-col gap-8 lg:flex-row lg:justify-between items-center">
                  <QuickSearch onSearch={setHasQuickSearch} />
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
                <NewsRoomSanityFilters tags={tags} onSearch={handleSearch} onClear={handleClear} />
              </aside>
              <div className="flex flex-col max-lg:px-4">
                <Typography id="newsroom_news" as="h2" className="sr-only">
                  <FormattedMessage id="newsroom_newslist_header" defaultMessage="News" />
                </Typography>
                <NewsSections fallbackImages={fallbackImages} news={newsList} hasQuickSearch={hasQuickSearch} />
                {hasQuickSearch && <Pagination hitsPerPage={20} className="w-full justify-center py-12" />}
              </div>
            </div>
          </InstantSearch>
        </div>
      </main>
    </PaginationContextProvider>
  )
})

export default NewsRoomTemplate
