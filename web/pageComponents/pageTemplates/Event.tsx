import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import getConfig from 'next/config'
import styled from 'styled-components'
import IFrame from '../../pageComponents/shared/IFrame'
import RelatedContent from '../../pageComponents/shared/RelatedContent'
import Lead from '../../pageComponents/shared/Lead'

import ContactList from '../../pageComponents/shared/ContactList'
import { TitleBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { blocksToText } from '../../common/helpers'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import Promotion from '../../pageComponents/topicPages/Promotion'
import AddToCalendar from '../../pageComponents/topicPages/AddToCalendar'

import type { EventDateType, EventSchema } from '../../types/types'
import { zonedTimeToUtc } from 'date-fns-tz'
import { FormattedDate, FormattedTime } from '@components'

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
  padding: 0 var(--space-large);
  max-width: var(--layout-maxContent-narrow);
  margin: var(--space-4xLarge) auto;
`

const StyledDate = styled.div`
  font-size: var(--typeScale-4);
  color: var(--moss-green-100);
  margin-top: var(--space-large);
  margin-bottom: var(--space-medium);
`

const StyledTime = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-xSmall);
  color: var(--moss-green-100);
  font-weight: var(--fontWeight-light);
  & > :not([hidden]) ~ :not([hidden]) {
    margin-left: 0.3em;
  }
`

const StyledLocation = styled.div`
  color: var(--moss-green-100);
  margin-bottom: var(--space-medium);
  font-weight: var(--fontWeight-light);
`

const getDates = ({ date, startTime, endTime, timezone }: EventDateType) => {
  if (startTime && endTime) {
    const startDate = zonedTimeToUtc(new Date(date + ' ' + startTime), timezone).toString()
    const endDate = zonedTimeToUtc(new Date(date + ' ' + endTime), timezone).toString()

    return { startDate: startDate, endDate: endDate }
  } else {
    const startDate = new Date(date).toString()

    return { startDate: startDate, endDate: null }
  }
}

export default function Event({ data }: { data: EventSchema }): JSX.Element {
  const { title, slug } = data
  const { location, ingress, content, iframe, promotedPeople, relatedLinks, contactList, eventDate } = data.content
  const { documentTitle, metaDescription, openGraphImage } = data.seoAndSome

  const plainTitle = title ? blocksToText(title) : ''

  const { pathname } = useRouter()

  const { startDate, endDate } = eventDate.date ? getDates(eventDate) : { startDate: null, endDate: null }
  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('[slug]', slug)
  return (
    <>
      <NextSeo
        title={documentTitle || plainTitle}
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
              {startDate && (
                <StyledDate>
                  <FormattedDate datetime={startDate} />
                </StyledDate>
              )}
              {startDate && endDate && (
                <StyledTime>
                  <FormattedTime datetime={startDate} />
                  <span>-</span>
                  <FormattedTime datetime={endDate} timezone />
                </StyledTime>
              )}
              {location && <StyledLocation>{location}</StyledLocation>}
              <AddToCalendar event={data} />
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

          {promotedPeople?.people && promotedPeople?.people.length > 0 && (
            <Promotion
              data={{
                id: 'promotedPeople',
                type: 'people',
                title: promotedPeople.title,
                content: { promotions: promotedPeople.people },
              }}
            />
          )}
          {contactList && <ContactList data={contactList} />}

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
