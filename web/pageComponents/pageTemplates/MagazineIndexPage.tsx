import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web'
import { toPlainText } from '@portabletext/react'
import { Flags } from '../../common/helpers/datasetHelpers'
import IngressText from '../shared/portableText/IngressText'
import RichText from '../shared/portableText/RichText'
import isEmpty from '../shared/portableText/helpers/isEmpty'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import { Heading } from '@components'
import { searchClientServer, searchClient } from '../../lib/algolia'
import MagazineContent from '../searchIndexPages/magazineIndex/MagazineContent'
import { getIsoFromLocale } from '../../lib/localization'
import { metaTitleSuffix } from '../../languages'
import { UnpaddedText } from './algoliaPages/components'
import { getUrl } from './algoliaPages/helpers'
import styled from 'styled-components'
import { Pagination } from '../shared/search/pagination/Pagination'
import type { MagazineIndexData } from '../../types'
import { MagazineTagFilter } from '../searchIndexPages/magazineIndex/MagazineTagFilter'
import { history } from 'instantsearch.js/es/lib/routers'

const Wrapper = styled.div`
  max-width: var(--maxViewportWidth);
  margin: 0 auto;
`

const Intro = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-medium);
`

const MagazineWapper = styled.div`
  padding: var(--space-3xLarge);
`

const StyledPagination = styled(Pagination)`
  padding-bottom: var(--space-4xLarge);
  justify-content: center;
`

type MagazineIndexTemplateProps = {
  isServerRendered?: boolean
  locale: string
  pageData: MagazineIndexData | undefined
  slug?: string
  url: string
}

const MagazineIndexPage = ({ isServerRendered = false, locale, pageData, slug, url }: MagazineIndexTemplateProps) => {
  const router = useRouter()
  const fullUrl = getUrl(router, slug)
  const { ingress, title, documentTitle, metaDescription, openGraphImage, magazineTags } = pageData || {}
  const plainTitle = title ? toPlainText(title) : ''
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)

  const indexName = `${envPrefix}_MAGAZINE_${isoCode}`
  const HITS_PER_PAGE = 12

  return (
    <>
      <NextSeo
        title={`${documentTitle || plainTitle} - ${metaTitleSuffix}`}
        description={metaDescription}
        openGraph={{
          title: plainTitle,
          description: metaDescription,
          type: 'website',
          url: fullUrl,
          images: openGraphImage?.asset && getOpenGraphImages(openGraphImage),
        }}
      />
      <main>
        <Wrapper>
          <Intro>
            {title && (
              <RichText
                value={title}
                components={{
                  block: {
                    // Overriding the h2. This is the normal text because that's all this text editor allows
                    normal: ({ children }) => {
                      // eslint-disable-next-line
                      // @ts-ignore: Still struggling with the types here :/
                      if (isEmpty(children)) return null
                      return (
                        <Heading level="h1" size="2xl">
                          {children}
                        </Heading>
                      )
                    },
                  },
                }}
              />
            )}

            {ingress && <UnpaddedText>{ingress && <IngressText value={ingress} />}</UnpaddedText>}
          </Intro>

          <InstantSearch
            searchClient={isServerRendered ? searchClientServer : searchClient}
            indexName={indexName}
            routing={{
              // @TODO If this is enabled, the app will freeze with browser back
              router: history({
                createURL({ qsModule, routeState, location }) {
                  const isIndexpageUrl = location.pathname.split('/').length === (locale === 'en' ? 2 : 3)

                  if (!isIndexpageUrl) {
                    // do not update router state when magazine pages are clicked..
                    return location.href
                  }

                  const queryParameters: any = {}
                  if (routeState.query) {
                    queryParameters.query = encodeURIComponent(routeState.query as string)
                  }
                  if (routeState.page !== 1) {
                    queryParameters.page = routeState.page
                  }
                  if (routeState.magazineTags) {
                    queryParameters.tags = encodeURIComponent(routeState.magazineTags as string)
                  }

                  const queryString = qsModule.stringify(queryParameters, {
                    addQueryPrefix: true,
                    arrayFormat: 'repeat',
                  })
                  const href = locale === 'en' ? `/magazine${queryString}` : `/no/magasin${queryString}`

                  return href
                },
                // eslint-disable-next-line
                // @ts-ignore: @TODO: The types are not correct
                parseURL({ qsModule, location }) {
                  const { query = '', page, tags = '' }: any = qsModule.parse(location.search.slice(1))
                  return {
                    query: decodeURIComponent(query),
                    page,
                    magazineTags: decodeURIComponent(tags),
                  }
                },
                getLocation() {
                  if (typeof window === 'undefined') {
                    return new URL(url!) as unknown as Location
                  }

                  return window.location
                },
              }),

              stateMapping: {
                // eslint-disable-next-line
                // @ts-ignore: @TODO: The types are not correct
                stateToRoute(uiState) {
                  const indexUiState = uiState[indexName] || {}
                  return {
                    query: indexUiState.query,
                    magazineTags: indexUiState.menu && indexUiState.menu.magazineTags,
                  }
                },
                // eslint-disable-next-line
                // @ts-ignore: @TODO: The types are not correct
                routeToState(routeState) {
                  return {
                    [indexName]: {
                      query: routeState.query,
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
              <MagazineTagFilter tags={magazineTags} attribute="magazineTags" sortBy={[`name:asc`]} limit={5} />
            )}
            <MagazineWapper>
              <MagazineContent />
              <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} />
            </MagazineWapper>
          </InstantSearch>
        </Wrapper>
      </main>
    </>
  )
}
export default MagazineIndexPage
