import { forwardRef } from 'react'
import singletonRouter from 'next/router'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import type { NewsRoomPageType } from '../../types'
import { Heading, Typography } from '@core/Typography'
import { FormattedDate } from '@components/FormattedDateTime'
import TopicSwitch from '@templates/newsroom/TopicSwitch/TopicSwitch'
import NewsRoomFilters from './NewsroomFilters'
import { ReadMoreLink } from '@core/Link'
import { getIsoFromLocale } from '../../lib/localization'
import { Flags } from '../../common/helpers/datasetHelpers'
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs'
import { UiState } from 'instantsearch.js'
import Seo from '../../pageComponents/shared/Seo'
import { Configure, InstantSearch } from 'react-instantsearch'
import { useIntl } from 'react-intl'
import NewsSections from './NewsSections/NewsSections'
import QuickSearch from './QuickSearch/QuickSearch'
import { algolia } from '../../lib/config'
import algoliasearch from 'algoliasearch'

type NewsRoomTemplateProps = {
  isServerRendered?: boolean
  locale?: string
  pageData?: NewsRoomPageType | undefined
  slug?: string
  url?: string
}

const client = algoliasearch(algolia.applicationId, algolia.searchApiKey)

const NewsRoomTemplate = forwardRef<HTMLElement, NewsRoomTemplateProps>(function NewsRoomTemplate(
  { isServerRendered, locale, pageData, slug, url, ...rest },
  ref,
) {
  const {
    ingress,
    title,
    seoAndSome,
    subscriptionHeading,
    subscriptionLink,
    subscriptionLinkTitle,
    localNewsPagesHeading,
    localNewsPages,
  } = pageData || {}

  const intl = useIntl()

  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)
  const indexName = `${envPrefix}_NEWS_${isoCode}`
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
    <>
      <Seo seoAndSome={seoAndSome} slug={slug} pageTitle={title} />
      <main ref={ref} className="px-layout-sm">
        <div className="w-2/3">
          <Heading value={title} variant="h1" />
          <div className="border-y border-autumn-storm-40 py-4">
            <FormattedDate
              suppressHydrationWarning
              datetime={new Date()}
              weekday="long"
              day="numeric"
              year="numeric"
              month="long"
            />
          </div>
        </div>
        {ingress && <Blocks value={ingress} />}
        <InstantSearch
          /*           searchClient={
            isServerRendered
              ? searchClient({
                  headers: {
                    Referer: url,
                  },
                })
              : searchClient(undefined)
          } */
          searchClient={client}
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

          <div className="flex flex-col gap-12">
            <div>
              <Typography as="h2" variant="h6" className="max-w-text pt-12 pb-4">
                Search among Equinor corporate-level news releases
              </Typography>
              <QuickSearch />
            </div>
            <div className="grid grid-cols-[22vw_auto] gap-12">
              <aside className="self-start sticky top-0 flex flex-col gap-6 py-8">
                <TopicSwitch limit={50} attribute="topicTags" />
                {subscriptionLink?.slug && subscriptionHeading && (
                  <div className="bg-spruce-wood-100 px-8 py-6">
                    <Typography as="h2" variant="h6" className="font-medium pb-4">
                      {subscriptionHeading}
                    </Typography>
                    <ReadMoreLink href={subscriptionLink.slug}>{subscriptionLinkTitle}</ReadMoreLink>
                  </div>
                )}
                {localNewsPages && localNewsPages?.length > 0 && localNewsPagesHeading && (
                  <div className="bg-moss-green-50 px-8 py-6">
                    <Typography as="h2" variant="h6" className="font-medium pb-4">
                      {localNewsPagesHeading}
                    </Typography>
                    {localNewsPages?.map((localNewsPage) => {
                      return localNewsPage ? (
                        <ReadMoreLink key={localNewsPage._key} href={localNewsPage.href}>
                          {localNewsPage?.label}
                        </ReadMoreLink>
                      ) : null
                    })}
                  </div>
                )}
              </aside>
              <div>
                <div>
                  <NewsRoomFilters />
                  <NewsSections />
                </div>
              </div>
            </div>
          </div>
        </InstantSearch>
      </main>
    </>
  )
})

export default NewsRoomTemplate
