import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import { Flags } from '../../common/helpers/datasetHelpers'
import { searchClient } from '../../lib/algolia'
import { getIsoFromLocale } from '../../lib/localization'
import type { MagazineIndexPageType } from '../../types'
import { Hits } from '../searchIndexPages/magazineIndex/Hits'
import { MagazineTagFilter } from '../searchIndexPages/magazineIndex/MagazineTagFilter'
import { Pagination } from '../shared/search/pagination/Pagination'
import { UnpaddedText } from './newsroom/StyledComponents'
import { useRef } from 'react'
import usePaginationPadding from '../../lib/hooks/usePaginationPadding'
import Seo from '../../pageComponents/shared/Seo'
import { HeroTypes } from '../../types/types'
import MagazineIndexText from '../shared/portableText/MagazineIndexText'
import { PaginationContextProvider } from '../shared/search/pagination/PaginationContext'
import Teaser from '../shared/Teaser'
import { SharedBanner } from './shared/SharedBanner'
import SharedTitle from './shared/SharedTitle'
import singletonRouter from 'next/router'
import type { UiState } from 'instantsearch.js'
import { Configure, InstantSearch } from 'react-instantsearch'
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs'

const IngressWrapper = styled.div`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin: 0 auto;
`

const Intro = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large) var(--space-xLarge);
`

const MagazineWapper = styled.div`
  padding: var(--space-xLarge);
  max-width: var(--maxViewportWidth);
  margin: 0 auto;

  @media (min-width: 1000px) {
    padding: var(--space-3xLarge);
  }
`

const StyledHits = styled(Hits)`
  padding-bottom: var(--space-xLarge);

  @media (min-width: 1000px) {
    padding-bottom: var(--space-3xLarge);
  }
`

const StyledPagination = styled(Pagination)`
  padding: var(--space-xLarge) 0;
  justify-content: center;
`

type MagazineIndexTemplateProps = {
  isServerRendered?: boolean
  locale: string
  pageData: MagazineIndexPageType
  slug?: string
  url: string
}

const MagazineIndexPage = ({ isServerRendered = false, locale, pageData, slug, url }: MagazineIndexTemplateProps) => {
  const { ingress, title, hero, seoAndSome, magazineTags, footerComponent } = pageData || {}
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)
  const padding = usePaginationPadding()

  const indexName = `${envPrefix}_MAGAZINE_${isoCode}`
  const HITS_PER_PAGE = 12

  const resultsRef = useRef<HTMLDivElement>(null)

  return (
    <PaginationContextProvider defaultRef={resultsRef}>
      <Seo seoAndSome={seoAndSome} slug={slug} pageTitle={title} />
      <main>
        <SharedBanner title={title} hero={hero} hideImageCaption={true} />
        {pageData?.hero.type !== HeroTypes.DEFAULT && title && (
          <SharedTitle sharedTitle={title} background={{ backgroundColor: ingress.background }} />
        )}
        <BackgroundContainer background={{ backgroundColor: ingress.background }}>
          <Intro>
            {ingress && (
              <IngressWrapper>
                <UnpaddedText>{ingress && <MagazineIndexText value={ingress.content} />}</UnpaddedText>
              </IngressWrapper>
            )}
          </Intro>
        </BackgroundContainer>

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
          routing={{
            router: createInstantSearchRouterNext({
              singletonRouter,
              serverUrl: url,
              routerOptions: {
                createURL: ({ qsModule, routeState, location }) => {
                  const isIndexpageUrl = location.pathname.split('/').length === (locale === 'en' ? 2 : 3)

                  if (!isIndexpageUrl) {
                    // do not update router state when magazine pages are clicked..
                    return location.href
                  }

                  const queryParameters: any = {}
                  if (routeState.page) {
                    queryParameters.page = routeState.page
                  }
                  if (routeState.magazineTags) {
                    queryParameters.tag = routeState.magazineTags
                  }

                  const queryString = qsModule.stringify(queryParameters, {
                    addQueryPrefix: true,
                    arrayFormat: 'repeat',
                    format: 'RFC1738',
                  })
                  return `${location.pathname}${queryString}`
                },
                // eslint-disable-next-line
                // @ts-ignore: @TODO: The types are not correct
                parseURL: ({ qsModule, location }) => {
                  const { page, tag = '' }: any = qsModule.parse(location.search.slice(1))
                  return {
                    page,
                    magazineTags: tag,
                  }
                },
                push(url) {
                  if (singletonRouter.asPath.split('?')[1] !== url.split('?')[1]) {
                    // replace url only if there is a change in query params
                    singletonRouter.replace(url, undefined, { scroll: false })
                  }
                },
              },
            }),

            stateMapping: {
              // eslint-disable-next-line
              // @ts-ignore: @TODO: The types are not correct
              stateToRoute(uiState: UiState) {
                const indexUiState = uiState[indexName] || {}
                return {
                  magazineTags: indexUiState.menu && indexUiState.menu.magazineTags,
                  page: indexUiState.page,
                }
              },
              // eslint-disable-next-line
              // @ts-ignore: @TODO: The types are not correct
              routeToState(routeState) {
                return {
                  [indexName]: {
                    page: routeState.page,
                    menu: {
                      magazineTags: routeState.magazineTags,
                    },
                  },
                }
              },
            },
          }}
        >
          <Configure facetingAfterDistinct maxFacetHits={50} maxValuesPerFacet={100} hitsPerPage={HITS_PER_PAGE} />
          {magazineTags && (
            <MagazineTagFilter
              tags={magazineTags}
              attribute="magazineTags"
              sortBy={[`name:asc`]}
              limit={5}
              ref={resultsRef}
            />
          )}
          <MagazineWapper>
            <StyledHits />
            <StyledPagination padding={padding} hitsPerPage={HITS_PER_PAGE} />
          </MagazineWapper>
        </InstantSearch>
        {footerComponent && <Teaser data={footerComponent} />}
      </main>
    </PaginationContextProvider>
  )
}
export default MagazineIndexPage
