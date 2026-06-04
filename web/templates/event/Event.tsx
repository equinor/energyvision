'use client'
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { useFormatter, useTranslations } from 'next-intl'
import { EventJsonLd } from 'next-seo'
import AddToCalendar from '@/core/AddToCalendar/AddToCalendar'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { getEventDates } from '@/lib/helpers/dateUtilities'
import Blocks from '@/portableText/Blocks'
import ContactList from '@/sections/ContactList/ContactList'
import type { EventDateType } from '@/sections/cards/EventCard/EventCard'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type {
  ContactListData,
  IFrameData,
  PeopleCardData,
  RelatedLinksData,
  SeoData,
} from '@/types'
import Promotion from '../../sections/promotions/PromotionsBlock'
import RelatedContent from '../../sections/RelatedContent/RelatedContent'

export type EventSchema = {
  id: string
  title: PortableTextBlock[]
  slug: string
  seoAndSome: SeoData
  content: {
    location?: string
    eventDate: EventDateType
    startDayAndTime?: any
    endDayAndTime?: any
    ingress?: PortableTextBlock[]
    content?: PortableTextBlock[]
    iframe?: IFrameData
    promotedPeople?: {
      title?: PortableTextBlock[]
      people?: PeopleCardData[]
    }
    contactList?: ContactListData
    relatedLinks?: RelatedLinksData
  }
}

export default function Event({ data }: { data: EventSchema }): JSX.Element {
  const { title } = data
  const t = useTranslations()
  const formatter = useFormatter()
  const {
    location,
    ingress,
    content,
    promotedPeople,
    relatedLinks,
    contactList,
    eventDate,
  } = data.content

  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const { start, end } = getEventDates(eventDate)

  const { bg, dark } = getBgAndDarkFromBackground({
    background: { backgroundColor: 'Moss Green Light' },
  })

  return (
    <>
      {eventDate?.date && start && end && (
        <EventJsonLd
          name={plainTitle}
          startDate={start}
          endDate={end}
          location={location || ''}
        />
      )}
      <main className='flex flex-col pt-topbar pb-page-content'>
        <article>
          <div className='bg-moss-green-50'>
            <div className='mx-auto max-w-content px-layout-md py-32'>
              <div
                className={`mx-auto max-w-content ${bg} ${dark ? 'dark' : ''}`}
              >
                {title && <Blocks as='h1' variant='3xl' value={title} />}
                <div className='mt-7 flex flex-col *:text-sm *:leading-0'>
                  {(start || eventDate?.date) && (
                    <FormattedDateTime
                      variant='date'
                      dateIcon
                      datetime={start}
                      className='mb-5 text-norwegian-woods-100 *:text-xl'
                    />
                  )}
                  <div className='mb-2 flex flex-center gap-1 text-norwegian-woods-100'>
                    {start && end ? (
                      <div className={`flex gap-1 *:text-base`}>
                        <FormattedDateTime
                          variant='time'
                          timeIcon={false}
                          datetime={start}
                          showTimezone={false}
                          timeClassName='leading-none'
                        />
                        <span>-</span>
                        <FormattedDateTime
                          variant='time'
                          datetime={end}
                          timeClassName='leading-none'
                        />
                      </div>
                    ) : (
                      <p className='my-2 *:text-base'>To be announced</p>
                    )}
                  </div>
                </div>
                {location && (
                  <div className='mb-4 text-norwegian-woods-100 *:text-base'>
                    {location}
                  </div>
                )}
                <AddToCalendar
                  eventDate={eventDate}
                  startDateTime={start}
                  endDateTime={end}
                  location={location}
                  title={plainTitle}
                />
              </div>
            </div>
          </div>
          {(ingress || content) && (
            <div className={`mt-14`}>
              <div className='prose prose-md dark:prose-invert mx-auto max-w-content pb-16'>
                {ingress && (
                  <Blocks group='article' variant='ingress' value={ingress} />
                )}
                {content && (
                  <Blocks group='article' variant='body' value={content} />
                )}
              </div>
            </div>
          )}
          {promotedPeople?.people && promotedPeople?.people.length > 0 && (
            <Promotion
              variant='promotePeople'
              data={{
                id: 'promotedPeople',
                type: 'people',
                title: promotedPeople.title,
                promotions: promotedPeople.people,
              }}
            />
          )}
          {contactList && <ContactList data={contactList} />}
          {relatedLinks?.links && relatedLinks.links.length > 0 && (
            <RelatedContent
              data={relatedLinks}
              className='mx-auto max-w-content px-layout-lg'
            />
          )}
        </article>
      </main>
    </>
  )
}
