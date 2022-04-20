import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import type { LandingPageSchema } from '../../types/types'
import { useRouter } from 'next/router'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import { IngressBlockRenderer, TitleBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { blocksToText } from '../../common/helpers/blocksToText'
import ContentGroup from '../landingPages/ContentGroup'
import { getFullUrl } from '../../common/helpers/getFullUrl'

const LandingPageLayout = styled.main``

const HeroBanner = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-medium) var(--space-xLarge)
    var(--layout-paddingHorizontal-medium);
`

const StyledHeading = styled(TitleBlockRenderer)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const Intro = styled.div`
  --max-width: calc(40 * var(--space-medium));
  padding: 0 var(--layout-paddingHorizontal-medium);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
  /* While I don't love this, we need to restrict the width of the paragraph */
  & p {
    max-width: var(--layout-maxContent-narrow);
  }
`

const TOCList = styled.div``

type LandingPageProps = {
  data: LandingPageSchema
}

const LandingPage = ({ data }: LandingPageProps) => {
  const { pathname } = useRouter()
  const { slug, title, ingress, subGroups = [] } = data

  const fullUrl = getFullUrl(pathname, slug)

  const pageTitle = blocksToText(title) || ''

  return (
    <>
      <NextSeo
        title={data?.seoAndSome?.documentTitle || pageTitle}
        description={data?.seoAndSome?.metaDescription}
        openGraph={{
          title: pageTitle,
          description: data?.seoAndSome?.metaDescription,
          type: 'website',
          url: fullUrl,
          /* @TODO: Add fallback image */
          // eslint-disable-next-line
          // @ts-ignore: Why does ts hates because I moved this line from another file
          images: getOpenGraphImages(data?.seoAndSome?.openGraphImage),
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      ></NextSeo>
      <LandingPageLayout>
        <HeroBanner>
          {title && (
            <SimpleBlockContent
              blocks={title}
              serializers={{
                types: {
                  block: (props) => <StyledHeading level="h1" size="2xl" {...props} />,
                },
              }}
            />
          )}
        </HeroBanner>
        {ingress && (
          <Intro>
            <SimpleBlockContent
              blocks={ingress}
              serializers={{
                types: {
                  block: IngressBlockRenderer,
                },
              }}
            ></SimpleBlockContent>
          </Intro>
        )}
        <TOCList>
          {subGroups?.map((group) => {
            return <ContentGroup key={group.id} group={group} />
          })}
        </TOCList>
      </LandingPageLayout>
    </>
  )
}

export default LandingPage
