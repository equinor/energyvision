import { InstantSearch, Configure } from 'react-instantsearch-hooks-web'
import { Flags } from '../../common/helpers/datasetHelpers'
import IngressText from '../shared/portableText/IngressText'
import RichText from '../shared/portableText/RichText'
import isEmpty from '../shared/portableText/helpers/isEmpty'
import { Heading } from '@components'
import { searchClientServer, searchClient } from '../../lib/algolia'
import NewsContent from '../searchIndexPages/newsRoomIndex/NewsContent'
import { getIsoFromLocale } from '../../lib/localization'
import { Wrapper, Intro, News, UnpaddedText } from './algoliaPages/components'
import { PaginationContextProvider } from '../shared/search/pagination/PaginationContext'
import type { NewsRoomPageType } from '../../types'
import Seo from '../../pageComponents/shared/Seo'
import { useRef } from 'react'

type NewsRoomTemplateProps = {
  isServerRendered?: boolean
  locale: string
  pageData: NewsRoomPageType | undefined
  slug?: string
}

const NewsRoomPage = ({ isServerRendered = false, locale, pageData, slug }: NewsRoomTemplateProps) => {
  const { ingress, title } = pageData || {}
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)
  const indexName = `${envPrefix}_NEWS_${isoCode}`
  const resultsRef = useRef<HTMLDivElement>(null)

  return (
    <PaginationContextProvider defaultRef={resultsRef}>
      <Seo seoAndSome={pageData?.seoAndSome} slug={slug} pageTitle={title} />
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
            <InstantSearch
              searchClient={isServerRendered ? searchClientServer : searchClient}
              indexName={indexName}
              /*  routing={{
                  router: history({
                    getLocation() {
                      if (typeof window === 'undefined') {
                        return new URL(url!) as unknown as Location
                      }

                      return window.location
                    },
                  }),
                }} */
            >
              <Configure
                facetingAfterDistinct
                maxFacetHits={50}
                maxValuesPerFacet={100}
                facetFilters={['type:news', 'topicTags:-Crude Oil Assays']}
              />

              <NewsContent />
            </InstantSearch>
          </News>
        </Wrapper>
      </main>
    </PaginationContextProvider>
  )
}

export default NewsRoomPage
