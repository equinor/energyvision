import { FormattedDate, FormattedTime } from '@components'
import { toPlainText } from '@portabletext/react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { getEventDates } from '../../common/helpers/dateUtilities'
import ContactList from '../shared/ContactList'
import TitleText from '../shared/portableText/TitleText'
import RelatedContent from '../shared/RelatedContent'
import AddToCalendar from '../topicPages/AddToCalendar'
import Promotion from '../topicPages/Promotion'

import type { PortableTextBlock } from '@portabletext/types'
import Seo from '../../pageComponents/shared/Seo'
import type { EventSchema } from '../../types/types'
import { EventJsonLd } from 'next-seo'
import Blocks from '../../pageComponents/shared/portableText/Blocks'

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

export default function Event({ data }: { data: EventSchema }): JSX.Element {
  const { title } = data
  const { location, ingress, content, promotedPeople, relatedLinks, contactList, eventDate } = data.content

  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const { start, end } = getEventDates(eventDate)

  return (
    <>
      <Seo seoAndSome={data?.seoAndSome} slug={data?.slug} pageTitle={data?.title} />
      {eventDate?.date && start && end && (
        <EventJsonLd name={plainTitle} startDate={start} endDate={end} location={location} />
      )}
      <main>
        <EventLayout>
          <Header>
            <HeaderInner>
              {title && <TitleText value={title} level="h1" size="3xl" />}
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
          {(ingress || content) && (
            <div
              className={`
             mt-16
             pb-16
             px-0 
             md:px-8
             lg:px-0
             `}
            >
              {ingress && (
                <LeadParagraph>
                  <Blocks value={ingress}></Blocks>
                </LeadParagraph>
              )}
              {content && (
                <Content>
                  <Blocks value={content} />
                </Content>
              )}
            </div>
          )}
          {promotedPeople?.people && promotedPeople?.people.length > 0 && (
            <Promotion
              className={`pb-16`}
              data={{
                id: 'promotedPeople',
                type: 'people',
                title: promotedPeople.title,
                content: { promotions: promotedPeople.people, type: 'promotePeople' },
              }}
            />
          )}
          {contactList && <ContactList data={contactList} />}

          {relatedLinks?.links && relatedLinks.links.length > 0 && (
            <RelatedContent
              data={relatedLinks}
              className={`
                  px-layout-lg
                  max-w-viewport
                  mx-auto
                  my-3xl
                  `}
            />
          )}
        </EventLayout>
      </main>
    </>
  )
}
