import { Flags } from '@/common/helpers/datasetHelpers'
import { getIsoFromLocale } from '@/lib/localization'
import { useLocale, useTranslations } from 'next-intl'
import { InstantSearchNext } from 'react-instantsearch-nextjs'
import { searchClient as client } from '../../lib/algolia'
import { SearchClient } from 'instantsearch.js'
import { useRouter } from 'next/navigation'
import { SearchBox } from '@/core/AlgoliaSearchBox/SearchBox'
import { Configure, Index } from 'react-instantsearch'
import SearchResults from '@/pageComponents/search/SearchResults'
import { PaginationContextProvider } from '@/common/contexts/PaginationContext'
import { useRef } from 'react'
import { Pagination } from '@/pageComponents/shared/search/pagination/Pagination'
import usePaginationPadding from '@/lib/hooks/usePaginationPadding'

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
export function Search() {
  const intl = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const resultsRef = useRef<HTMLDivElement>(null)
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)
  const padding = usePaginationPadding()
  const indices = [
    {
      value: `${envPrefix}_TOPICS_${isoCode}`,
      label: intl('search_topics_tab'),
    },
    {
      value: `${envPrefix}_EVENTS_${isoCode}`,
      label: intl('search_events_tab'),
    },
    {
      value: `${envPrefix}_NEWS_${isoCode}`,
      label: intl('search_news_tab'),
    },
    {
      value: `${envPrefix}_MAGAZINE_${isoCode}`,
      label: 'Magazine', //intl('search_magazine_tab'), TODO : Add the text snippet
    },
  ]

  // The main index will be "all" at some point
  const mainIndex = `${envPrefix}_TOPICS_${isoCode}`

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
    if (routeState.tab) {
      queryParameters.tab = routeState.tab
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
    const { query = '', page, tab = '' }: any = qsModule.parse(location.search.slice(1))
    return {
      ...(query && { query: query }),
      ...(page && { page: page as number }),
      ...(tab && { tab: tab }),
    }
  }

  return (
    <InstantSearchNext
      indexName={mainIndex}
      searchClient={queriedSearchClient}
      routing={{
        router: {
          cleanUrlOnDispose: false,
          createURL: createURL,
          parseURL: parseURL,
          push(url) {
            if (url.split('?')[1]) {
              // replace url only if it has query params
              router.replace(url)
            }
          },
        },
        stateMapping: {
          stateToRoute(uiState) {
            const indexUiState = uiState[mainIndex]
            return {
              ...(indexUiState.sortBy && {
                tab: indexUiState.sortBy
                  .replaceAll(isoCode, '')
                  .replaceAll(envPrefix, '')
                  .replaceAll('_', '')
                  .toLowerCase(),
              }),
              ...(indexUiState?.query && { query: indexUiState.query }),
              ...(indexUiState?.page && { page: indexUiState?.page }),
            }
          },
          routeToState(routeState: any) {
            return {
              [mainIndex]: {
                ...(routeState.query && { query: routeState.query }),
                ...(routeState.page && { page: routeState.page as number }),
                ...(routeState.tab && { sortBy: `${envPrefix}_${routeState.tab.toUpperCase()}_${isoCode}` }),
              },
            }
          },
        },
      }}
    >
      <Configure hitsPerPage={5} snippetEllipsisText="..." />
      {indices.map((index) => (
        <Index indexName={index.value} key={index.label} indexId={index.value} />
      ))}
      <div className="mx-auto p-8 px-layout-sm lg:px-layout-lg">
        <h1 className="sr-only">{intl('search_page_title')}</h1>

        <div className="max-w-[700px]">
          <SearchBox variant="inverted" />
        </div>

        <SearchResults resultsRef={resultsRef} items={indices} />
        <PaginationContextProvider defaultRef={resultsRef}>
          <Pagination className="mt-12 justify-center" padding={padding} hitsPerPage={5} />
        </PaginationContextProvider>
      </div>
    </InstantSearchNext>
  )
}
