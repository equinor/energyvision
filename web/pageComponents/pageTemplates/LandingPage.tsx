import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import type { LandingPageSchema } from '../../types/types'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import { IngressBlockRenderer, TitleBlockRenderer } from '../../common/serializers'

import SimpleBlockContent from '../../common/SimpleBlockContent'
import { blocksToText } from '../../common/helpers/blocksToText'
import { Card } from '@components'

const { Title, Header, Action, Arrow, Media, CardLink, Text } = Card

const LandingPageLayout = styled.main`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  /* @TODO: Find a good value here */
  --banner-paddingVertical: clamp(16px, calc(-38.3689px + 14.4984vw), 250px);
`

const HeroBanner = styled.div`
  padding: var(--banner-paddingVertical) var(--layout-paddingHorizontal-medium) var(--space-xLarge)
    var(--layout-paddingHorizontal-medium);
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
`

const TempGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 15rem);
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

const ContentGroup = styled.div``

const StyledHeading = styled(TitleBlockRenderer)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const Intro = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

type LandingPageProps = {
  data: LandingPageSchema
}

const TopicPage = ({ data }: LandingPageProps) => {
  if (!data?.groupWithReference) {
    console.warn('Missing link content for landing page', data?.title)
  }
  const { pathname } = useRouter()
  const slug = data?.slug

  const { publicRuntimeConfig } = getConfig()

  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('/[[...slug]]', slug)

  const pageTitle = data?.title ? blocksToText(data.title) : ''

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
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      ></NextSeo>
      <LandingPageLayout>
        <HeroBanner>
          {data?.title && (
            <SimpleBlockContent
              blocks={data?.title}
              serializers={{
                types: {
                  block: (props) => <StyledHeading level="h1" size="2xl" {...props} />,
                },
              }}
            />
          )}
        </HeroBanner>
        {data?.ingress && (
          <Intro>
            <SimpleBlockContent
              blocks={data?.ingress}
              serializers={{
                types: {
                  block: IngressBlockRenderer,
                },
              }}
            ></SimpleBlockContent>
          </Intro>
        )}

        {data?.groupWithReference &&
          data?.groupWithReference.topicPageGroup.subGroups.map((item) => {
            console.log(item)
            return (
              <ContentGroup key={item.id}>
                {item.label && <h2>{item.label}</h2>}
                <TempGroup>
                  {item.links.map((link) => {
                    return (
                      <CardLink key={link.id}>
                        <Card>
                          <Header>
                            <Title>{link.label}</Title>
                          </Header>

                          <Action>
                            <Arrow />
                          </Action>
                        </Card>
                      </CardLink>
                    )
                  })}
                </TempGroup>
              </ContentGroup>
            )
          })}
      </LandingPageLayout>
    </>
  )
}

export default TopicPage
