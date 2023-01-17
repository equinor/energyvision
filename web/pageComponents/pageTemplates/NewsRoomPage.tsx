import { InstantSearch, Configure } from 'react-instantsearch-hooks-web'
import { Flags } from '../../common/helpers/datasetHelpers'
import IngressText from '../shared/portableText/IngressText'
import RichText from '../shared/portableText/RichText'
import isEmpty from '../shared/portableText/helpers/isEmpty'
import { Heading } from '@components'
import { searchClientServer, searchClient } from '../../lib/algolia'
import { getIsoFromLocale } from '../../lib/localization'
import { Wrapper, Intro, News, UnpaddedText } from './newsroom/StyledComponents'
import { PaginationContextProvider } from '../shared/search/pagination/PaginationContext'
import type { NewsRoomPageType } from '../../types'
import Seo from '../shared/Seo'
import { useRef } from 'react'
import styled from 'styled-components'
import Filters from './newsroom/Filters'
import { Pagination } from '../shared/search/pagination/Pagination'
import { FormattedMessage } from 'react-intl'
import Hit from './newsroom/Hit'
import { Hits } from './newsroom/Hits'

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
  margin-top: var(--space-medium);
`

type NewsRoomTemplateProps = {
  isServerRendered?: boolean
  locale: string
  pageData: NewsRoomPageType | undefined
  slug?: string
}

const NewsRoomPage = ({ isServerRendered = false, locale, pageData, slug }: NewsRoomTemplateProps) => {
  const { ingress, title, seoAndSome } = pageData || {}
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)
  const indexName = `${envPrefix}_NEWS_${isoCode}`
  const resultsRef = useRef<HTMLDivElement>(null)

  return (
    <PaginationContextProvider defaultRef={resultsRef}>
      <Seo seoAndSome={seoAndSome} slug={slug} pageTitle={title} />
      <main>
        <Wrapper>
          <Intro ref={resultsRef}>
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
          <News>
            <InstantSearch searchClient={isServerRendered ? searchClientServer : searchClient} indexName={indexName}>
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
                  <StyledPagination padding={1} hitsPerPage={20} />
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
