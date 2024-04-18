import { BackgroundContainer, FormattedDate, FormattedTime } from '@components'
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

const StyledPromotion = styled(Promotion)`
  --promotion-padding: var(--space-xxLarge) 0;
  --promotion-titleAlign: center;

  @media (min-width: 450px) {
    --promotion-titleAlign: left;
  }
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
        <article>
          <BackgroundContainer
            className="px-layout-md py-layout-md"
            background={{ backgroundColor: 'Moss Green Light' }}
          >
            <div className="mx-auto m-w-1186px">
              {title && <TitleText value={title} level="h1" size="3xl" />}
              {start && (
                <div className="text-xl text-moss-green-100 mt-7 mb-5">
                  <FormattedDate datetime={start} />
                </div>
              )}

              <div className="flex flex-center mb-2 text-moss-green-100 ">
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
              </div>

              {location && <div className="text-moss-green-100 mb-4">{location}</div>}
              <AddToCalendar eventDate={eventDate} location={location} title={plainTitle} />
            </div>
          </BackgroundContainer>
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
                <Blocks proseClassName="prose-article" className="p-0 max-w-viewport mx-auto" value={ingress} />
              )}
              {content && (
                <div className="mx-auto max-w-viewport px-layout-lg">
                  <Blocks value={content} />
                </div>
              )}
            </div>
          )}
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
          {contactList && <ContactList data={contactList} />}

          {relatedLinks?.links && relatedLinks.links.length > 0 && (
            <Related>
              <StyledRelatedContent data={relatedLinks} />
            </Related>
          )}
        </article>
      </main>
    </>
  )
}
