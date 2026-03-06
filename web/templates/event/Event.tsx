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
    startDayAndTime,
    endDayAndTime,
  } = data.content

  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const { start, end } = getEventDates(eventDate)
  const { dayTime: startDayTime, overrideTimeLabel: startTimeLabel } =
    startDayAndTime || {}
  const { dayTime: endDayTime, overrideTimeLabel: endTimeLabel } =
    endDayAndTime || {}

  const { bg, dark } = getBgAndDarkFromBackground({
    background: { backgroundColor: 'Moss Green Light' },
  })

  return (
    <>
      {eventDate?.date && start && end && (
        <EventJsonLd
          name={plainTitle}
          startDate={start.toISOString()}
          endDate={end.toISOString()}
          location={location || ''}
        />
      )}
      <main className='flex flex-col pt-topbar pb-page-content'>
        <article>
          <div
            className={`flex flex-col items-start justify-center ${bg} ${dark ? 'dark' : ''} px-layout-lg lg:min-h-[28vh]`}
          >
            {title && <Blocks as='h1' variant='3xl' value={title} />}
            <div className='mt-6 flex flex-col gap-2'>
              {!startDayTime && (start || eventDate?.date) && (
                <div className=''>
                  <FormattedDateTime
                    variant='date'
                    dateIcon={true}
                    datetime={start ?? eventDate?.date}
                    className='text-sm'
                    timeClassName='leading-none'
                  />
                </div>
              )}
              {(startDayTime || endDayTime) && (
                <div className='flex items-end gap-2 text-base'>
                  <time
                    dateTime={startDayTime.toLocaleString()}
                    className='leading-none'
                  >
                    {`${
                      endDayTime
                        ? formatter
                            .dateTime(new Date(startDayTime), {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                            })
                            .split(' ')
                            .slice(0, 2)
                            .join(' ')
                        : formatter.dateTime(new Date(startDayTime), {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                          })
                    }`}
                  </time>
                  {endDayTime && (
                    <>
                      <span className='leading-none'>-</span>
                      <time
                        dateTime={endDayTime.toLocaleString()}
                        className='leading-none'
                      >
                        {formatter.dateTime(new Date(endDayTime), {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                        })}
                      </time>
                    </>
                  )}
                </div>
              )}
              {startDayTime && startTimeLabel !== '-' && (
                <div className='flex items-end gap-2 text-base'>
                  {startTimeLabel
                    ? startTimeLabel
                    : new Date(startDayTime).toTimeString()}
                  {endDayTime && endTimeLabel && endTimeLabel !== '-' && (
                    <>
                      <span className=''>-</span>
                      {endTimeLabel && endTimeLabel !== '-' && endTimeLabel}
                      {!endTimeLabel && new Date(startDayTime).toTimeString()}
                    </>
                  )}
                </div>
              )}
              {!startDayAndTime && start && end && (
                <div className={`flex items-end gap-1 *:text-base`}>
                  <FormattedDateTime
                    variant='time'
                    timeIcon={false}
                    datetime={start}
                    className='text-sm'
                    timeClassName='leading-none'
                  />
                  <span>-</span>
                  <FormattedDateTime
                    variant='time'
                    datetime={end}
                    showTimezone
                    className='text-sm'
                    timeClassName='leading-none'
                  />
                </div>
              )}
              {/*             {start && (
              <span className='mt-7 mb-5 inline-block text-xl'>
                <time suppressHydrationWarning dateTime={start.toISOString()}>
                  {format.dateTime(start, { dateStyle: 'long' })}
                </time>
              </span>
            )}
            <div className='mb-2 flex flex-center gap-1'>
              {start && end ? (
                <div className={`flex h-full items-center gap-1 py-2`}>
                  <FormattedDateTime variant='time' datetime={start} />
                  <span>-</span>
                  <FormattedDateTime
                    variant='time'
                    datetime={end}
                    showTimezone
                  />
                </div>
              ) : (
                <span>{t('tba')}</span>
              )}
            </div> */}
              {location && <p className='text-base'>{location}</p>}
              <AddToCalendar
                eventDate={eventDate}
                startDateTime={startDayAndTime?.dayTime}
                endDateTime={endDayAndTime?.dayTime}
                location={location}
                title={plainTitle}
              />
            </div>
          </div>
          {(ingress || content) && (
            <div className={`mt-14`}>
              {ingress && (
                <Blocks group='article' variant='ingress' value={ingress} />
              )}
              {content && (
                <Blocks group='article' variant='body' value={content} />
              )}
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
              className='px-layout-sm sm:px-layout-lg'
            />
          )}
        </article>
      </main>
    </>
  )
}
