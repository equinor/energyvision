import { Heading } from '@components'
import { useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Flags } from '../../common/helpers/datasetHelpers'
import { searchClient } from '../../lib/algolia'
import usePaginationPadding from '../../lib/hooks/usePaginationPadding'
import { getIsoFromLocale } from '../../lib/localization'
import type { NewsRoomPageType } from '../../types'
import IngressText from '../shared/portableText/IngressText'
import { Pagination } from '../shared/search/pagination/Pagination'
import { PaginationContextProvider } from '../shared/search/pagination/PaginationContext'
import Seo from '../shared/Seo'
import Filters from './newsroom/Filters'
import Hit from './newsroom/Hit'
import { Hits } from './newsroom/Hits'
import { Intro, News, UnpaddedText, Wrapper } from './newsroom/StyledComponents'
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs'
import singletonRouter from 'next/router'
import type { UiState } from 'instantsearch.js'
import { Configure, InstantSearch } from 'react-instantsearch'
import TitleText from '../shared/portableText/TitleText'

const NewsRoomContent = styled.div`
  display: grid;
  grid-template-areas:
    'filter'
    '.'
    'list'
    '.';

  grid-template-rows: auto var(--space-xLarge) auto var(--space-xLarge);

  @media (min-width: 800px) {
    grid-template-columns: minmax(auto, var(--layout-maxContent-narrow)) minmax(var(--space-xLarge), 1fr) 30% var(
        --space-medium
      );
    grid-template-areas: 'list . filter .';
  }
`

const GridFilters = styled(Filters)`
  grid-area: filter;
`

const StyledList = styled.div`
  padding: 0 var(--space-large);
  grid-area: list;

  @media (min-width: 800px) {
    padding: 0;
    display: grid;
    grid-template-rows: var(--space-56) min-content min-content;
  }
`

const StyledPagination = styled(Pagination)`
  margin: var(--space-medium) calc(-1 * var(--space-large)) 0;
  justify-content: center;

  @media (min-width: 800px) {
    margin: var(--space-medium) 0 0 0;
    justify-content: left;
  }
`

type NewsRoomTemplateProps = {
  isServerRendered: boolean
  locale: string
  pageData: NewsRoomPageType | undefined
  slug?: string
  url: string
}

const NewsRoomPage = ({ isServerRendered, locale, pageData, slug, url }: NewsRoomTemplateProps) => {
  const { ingress, title, seoAndSome } = pageData || {}
  const padding = usePaginationPadding()
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
      <main>
        <Wrapper>
          <Intro ref={resultsRef}>
            {title && <TitleText value={title} level="h1" size="3xl" />}
            {ingress && <UnpaddedText>{ingress && <IngressText value={ingress} />}</UnpaddedText>}
          </Intro>
          <News>
            <InstantSearch
              searchClient={
                isServerRendered
                  ? searchClient({
                      headers: {
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

              <NewsRoomContent>
                <GridFilters />
                <StyledList>
                  <Heading level="h2" size="lg">
                    <FormattedMessage id="newsroom_newslist_header" defaultMessage="News" />
                  </Heading>
                  <Hits hitComponent={Hit} />
                  <StyledPagination padding={padding} hitsPerPage={20} />
                </StyledList>
              </NewsRoomContent>
            </InstantSearch>
          </News>
        </Wrapper>
      </main>
    </PaginationContextProvider>
  )
}

export default NewsRoomPage
