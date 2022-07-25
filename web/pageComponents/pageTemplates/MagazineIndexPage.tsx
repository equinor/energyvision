import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web'
import { toPlainText } from '@portabletext/react'
import { isGlobalProduction } from '../../common/helpers/datasetHelpers'
import IngressText from '../shared/portableText/IngressText'
import RichText from '../shared/portableText/RichText'
import isEmpty from '../shared/portableText/helpers/isEmpty'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import { Heading } from '@components'
import { searchClientServer, searchClient } from '../../lib/algolia'
import NewsContent from '../newsRoom/NewsContent'
import { getIsoFromLocale } from '../../lib/localization'
import { metaTitleSuffix } from '../../languages'
import { Wrapper, Intro, News, UnpaddedText } from './algoliaPages/components'
import { getUrl } from './algoliaPages/helpers'

import type { MagazineIndexData } from '../../types'

type MagazineIndexTemplateProps = {
  isServerRendered?: boolean
  locale: string
  pageData: MagazineIndexData | undefined
  slug?: string
}

const MagazineIndexPage = ({ isServerRendered = false, locale, pageData, slug }: MagazineIndexTemplateProps) => {
  const router = useRouter()

  const fullUrl = getUrl(router, slug)

  const { ingress, title, documentTitle, metaDescription, openGraphImage } = pageData || {}
  const plainTitle = title ? toPlainText(title) : ''
  const envPrefix = isGlobalProduction ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(locale)

  const indexName = `${envPrefix}_MAGAZINE_${isoCode}`
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
              <Configure facetingAfterDistinct maxFacetHits={50} maxValuesPerFacet={100} />
              <NewsContent hasFilters={false} />
            </InstantSearch>
          </News>
        </Wrapper>
      </main>
    </>
  )
}

export default MagazineIndexPage