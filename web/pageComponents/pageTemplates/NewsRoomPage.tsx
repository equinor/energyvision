//import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'
//import { useRouter } from 'next/router'
import { InstantSearch, Configure } from 'react-instantsearch-hooks'
import { toPlainText } from '@portabletext/react'
import { isGlobalProduction } from '../../common/helpers/datasetHelpers'
import SimpleBlockContent from '../../common/portableText/SimpleBlockContent'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import { Heading } from '@components'
import { searchClientServer, searchClient } from '../../lib/algolia'
import NewsContent from '../newsRoom/NewsContent'
import { getIsoFromLocale } from '../../lib/localization'
import type { NewsroomData } from '../../types/types'
//import { getFullUrl } from '../../common/helpers/getFullUrl'

const Wrapper = styled.div`
  max-width: var(--maxViewportWidth);
  margin: 0 auto;
  grid-template-areas:
    '. intro'
    '. .'
    'news news';
  grid-template-rows: auto var(--space-large) auto;
  grid-template-columns: var(--space-large) auto;
  display: grid;
  /* Yup, in an ideal world we might have used some clamp based paddings here to avoid MQ, but the smallest
  one is way too big. Might create some fluid spacings later on   */
  @media (min-width: 800px) {
    grid-template-areas:
      '. . .'
      '. intro .'
      '. . .'
      '.  news news';
    grid-template-rows: var(--space-xxLarge) auto var(--space-3xLarge) auto;
    grid-template-columns: var(--layout-paddingHorizontal-small) minmax(auto, var(--layout-maxContent-narrow)) 1fr;
  }
`

const Intro = styled.div`
  grid-area: intro;
  margin: 0 auto;
`

const News = styled.div`
  grid-area: news;
`

const UnpaddedText = styled.div`
  & p:only-child {
    margin-bottom: 0;
  }
`

type NewsRoomTemplateProps = {
  isServerRendered?: boolean
  locale: string
  pageData: NewsroomData | undefined
  slug?: string
}

const NewsRoomPage = ({ isServerRendered = false, locale, pageData /* slug */ }: NewsRoomTemplateProps) => {
  /*   const { pathname } = useRouter() */
  // const fullUrl = getFullUrl(pathname, slug)
  const { ingress, title, documentTitle, metaDescription, openGraphImage } = pageData || {}
  const plainTitle = title ? toPlainText(title) : ''
  const envPrefix = isGlobalProduction ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)

  const indexName = `${envPrefix}_NEWS_${isoCode}`
  return (
    <>
      <NextSeo
        title={documentTitle || plainTitle}
        description={metaDescription}
        openGraph={{
          title: plainTitle,
          description: metaDescription,
          type: 'website',
          // url: fullUrl,
          images: openGraphImage?.asset && getOpenGraphImages(openGraphImage),
        }}
      />
      <main>
        <Wrapper>
          <Intro>
            {title && (
              <SimpleBlockContent
                value={title}
                components={{
                  block: {
                    // Overriding the h2
                    normal: ({ children }) => (
                      <Heading level="h1" size="2xl">
                        {children}
                      </Heading>
                    ),
                  },
                }}
              />
            )}

            {ingress && <UnpaddedText>{ingress && <SimpleBlockContent value={ingress} />}</UnpaddedText>}
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
              <Configure facetingAfterDistinct />
              <NewsContent />
            </InstantSearch>
          </News>
        </Wrapper>
      </main>
    </>
  )
}

export default NewsRoomPage
