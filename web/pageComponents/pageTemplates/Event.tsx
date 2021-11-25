import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import getConfig from 'next/config'
import styled from 'styled-components'
import IFrame from '../../pageComponents/shared/IFrame'
import RelatedContent from '../../pageComponents/shared/RelatedContent'
import Lead from '../../pageComponents/shared/Lead'
import { TitleBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { blocksToText } from '../../common/helpers'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import Promotion from '../../pageComponents/topicPages/Promotion'

import type { EventSchema } from '../../types/types'

const { publicRuntimeConfig } = getConfig()

const EventLayout = styled.article`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  --banner-paddingVertical: clamp(40px, calc(14.3125px + 11.0032vw), 210px);
`

const Header = styled.div`
  background: var(--moss-green-50);
  padding: var(--banner-paddingVertical) var(--layout-paddingHorizontal-medium);
`

const HeaderInner = styled.div`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const ContentWrapper = styled.div`
  margin: var(--space-3xLarge) 0;
`

const LeadParagraph = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: 0 auto var(--space-3xLarge) 0;

  & > p {
    margin-bottom: 0;
  }
`

const Content = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;

  > div > aside:last-child,
  > div > div:last-child {
    margin-bottom: 0;
    p:last-child {
      margin-bottom: 0;
    }
  }
`

const Related = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: 1700px;
  margin: var(--space-4xLarge) auto;
`

export default function Event({ data }: { data: EventSchema }): JSX.Element {
  const slug = data?.slug

  const { title, location, ingress, content, iframe, promotedPeople, relatedLinks } = data

  const plainTitle = title ? blocksToText(title) : ''

  const { pathname } = useRouter()
  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('[slug]', slug)

  return (
    <>
      <NextSeo
        title={data.documentTitle || plainTitle}
        description={data.metaDescription}
        openGraph={{
          title: plainTitle,
          description: data.metaDescription,
          type: 'website',
          url: fullUrl,
          images: data.openGraphImage?.asset && getOpenGraphImages(data.openGraphImage),
        }}
      ></NextSeo>

      <main>
        <EventLayout>
          <Header>
            <HeaderInner>
              {title && (
                <SimpleBlockContent
                  blocks={title}
                  serializers={{
                    types: {
                      block: (props) => <TitleBlockRenderer level="h1" size="2xl" {...props} />,
                    },
                  }}
                />
              )}
              {location && <p>{location}</p>}
            </HeaderInner>
          </Header>
          <ContentWrapper>
            {ingress && (
              <LeadParagraph>
                <Lead blocks={ingress}></Lead>
              </LeadParagraph>
            )}
            {content && (
              <Content>
                <SimpleBlockContent blocks={content}></SimpleBlockContent>
              </Content>
            )}
          </ContentWrapper>

          {iframe && <IFrame data={iframe} />}

          {promotedPeople && promotedPeople.length > 0 && (
            <Promotion
              data={{
                id: 'promotedPeople',
                type: 'people',
                content: { promotions: promotedPeople },
              }}
            />
          )}

          {relatedLinks?.links && relatedLinks.links.length > 0 && (
            <Related>
              <RelatedContent data={relatedLinks} />
            </Related>
          )}
        </EventLayout>
      </main>
    </>
  )
}
