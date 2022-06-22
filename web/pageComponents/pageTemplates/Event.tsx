import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'
import BasicIFrame from '../shared/iframe/BasicIFrame'
import RelatedContent from '../shared/RelatedContent'
import IngressText from '../shared/portableText/IngressText'
import { toPlainText } from '@portabletext/react'
import ContactList from '../shared/ContactList'
import TitleText from '../shared/portableText/TitleText'
import EventText from '../shared/portableText/EventText'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import Promotion from '../topicPages/Promotion'
import AddToCalendar from '../topicPages/AddToCalendar'
import { FormattedDate, FormattedTime } from '@components'
import { getEventDates } from '../../common/helpers/dateUtilities'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { FormattedMessage } from 'react-intl'
import { metaTitleSuffix } from '../../languages'

import type { EventSchema } from '../../types/types'
import type { PortableTextBlock } from '@portabletext/types'

const EventLayout = styled.article`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  --banner-paddingVertical: clamp(40px, calc(14.3125px + 11.0032vw), 130px);
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
  margin: var(--space-3xLarge) 0 0 0;
`

const LeadParagraph = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: 0 auto var(--space-xxLarge) auto;

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
  max-width: var(--maxViewportWidth);
  margin: var(--space-4xLarge) auto;
`

const StyledRelatedContent = styled(RelatedContent)`
  --related-titleAlign: center;

  @media (min-width: 450px) {
    --related-titleAlign: left;
  }
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

const StyledPromotion = styled(Promotion)`
  --promotion-padding: var(--space-xxLarge) 0;
  --promotion-titleAlign: center;

  @media (min-width: 450px) {
    --promotion-titleAlign: left;
  }
`

const StyledBasicIFrame = styled(BasicIFrame)`
  --iframe-maxWidth: var(--topbar-innerMaxWidth);
  --iframe-innerPadding: var(--space-3xLarge) 0;

  --iframe-titleAlign: center;

  @media (min-width: 450px) {
    --iframe-titleAlign: left;
  }

  padding: 0 var(--layout-paddingHorizontal-small);
`

const StyledContactList = styled(ContactList)`
  --contactList-titleAlign: center;

  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);

  @media (min-width: 450px) {
    --contactList-titleAlign: left;
  }
`

export default function Event({ data }: { data: EventSchema }): JSX.Element {
  const { title, slug } = data
  const { location, ingress, content, iframe, promotedPeople, relatedLinks, contactList, eventDate } = data.content
  const { documentTitle, metaDescription, openGraphImage } = data.seoAndSome

  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  const { pathname, locale } = useRouter()

  const { start, end } = getEventDates(eventDate)
  const fullUrl = getFullUrl(pathname, slug, locale)

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
        <EventLayout>
          <Header>
            <HeaderInner>
              {title && <TitleText value={title} level="h1" size="2xl" />}
              {start && (
                <StyledDate>
                  <FormattedDate datetime={start} />
                </StyledDate>
              )}

              <StyledTime>
                {start && end ? (
                  <>
                    <FormattedTime datetime={start} />
                    <span>-</span>
                    <FormattedTime datetime={end} timezone />
                  </>
                ) : (
                  <span>
                    <FormattedMessage id="tba" defaultMessage="To be announced" />
                  </span>
                )}
              </StyledTime>

              {location && <StyledLocation>{location}</StyledLocation>}
              <AddToCalendar eventDate={eventDate} location={location} title={plainTitle} />
            </HeaderInner>
          </Header>
          <ContentWrapper>
            {ingress && (
              <LeadParagraph>
                <IngressText value={ingress}></IngressText>
              </LeadParagraph>
            )}
            {content && (
              <Content>
                <EventText value={content} />
              </Content>
            )}
          </ContentWrapper>
          {iframe && <StyledBasicIFrame data={iframe} />}
          {promotedPeople?.people && promotedPeople?.people.length > 0 && (
            <StyledPromotion
              data={{
                id: 'promotedPeople',
                type: 'people',
                title: promotedPeople.title,
                content: { promotions: promotedPeople.people, type: 'promotePeople' },
              }}
            />
          )}
          {contactList && <StyledContactList data={contactList} />}

          {relatedLinks?.links && relatedLinks.links.length > 0 && (
            <Related>
              <StyledRelatedContent data={relatedLinks} />
            </Related>
          )}
        </EventLayout>
      </main>
    </>
  )
}
