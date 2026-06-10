'use client'
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { useTranslations } from 'next-intl'
import { EventJsonLd } from 'next-seo'
import AddToCalendar from '@/core/AddToCalendar/AddToCalendar'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { getEventDates } from '@/lib/helpers/dateUtilities'
import Blocks from '@/portableText/Blocks'
import ContactList from '@/sections/ContactList/ContactList'
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

export type EventDate = {
  date: string
  startTime?: string
  endTime?: string
  timezone: string
}

export type EventProps = {
  id: string
  title: PortableTextBlock[]
  slug: string
  seoAndSome: SeoData
  content: {
    location?: string
    eventDate: EventDate
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

export default function Event({ data }: { data: EventProps }): JSX.Element {
  const { title } = data
  const t = useTranslations()

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
  const { dayTime: startDayTime, overrideTimeLabel: startTimeLabel } =
    startDayAndTime || {}

  const { dayTime: endDayTime, overrideTimeLabel: endTimeLabel } =
    endDayAndTime || {}
  const isMoreThanOneDay =
    startDayTime && endDayTime
      ? new Date(endDayTime).getTime() - new Date(startDayTime).getTime() >
        24 * 60 * 60 * 1000
      : false

  const { start, end } = getEventDates(eventDate)

  const { bg, dark } = getBgAndDarkFromBackground({
    background: { backgroundColor: 'Moss Green Light' },
  })

  return (
    <>
      {((startDayTime && endDayTime) || (eventDate?.date && start && end)) && (
        <EventJsonLd
          name={plainTitle}
          startDate={startDayTime ?? start}
          endDate={endDayTime ?? end}
          location={location || ''}
        />
      )}
      <main className='flex flex-col pb-page-content'>
        <article>
          <div className='bg-moss-green-50'>
            <div className='mx-auto max-w-content px-layout-md py-32'>
              <div
                className={`mx-auto max-w-content ${bg} ${dark ? 'dark' : ''}`}
              >
                {title && <Blocks as='h1' variant='3xl' value={title} />}
                <div className='mt-7 mb-5 text-norwegian-woods-100 **:text-xl **:leading-none'>
                  {/* Date */}
                  <FormattedDateTime
                    datetime={startDayTime ?? start ?? eventDate?.date}
                    endDatetime={endDayTime}
                    variant={isMoreThanOneDay ? 'period' : 'date'}
                    dateIcon={false}
                  />
                </div>
                <div className='mb-5 text-norwegian-woods-100 **:text-md'>
                  {/* Time - Dont show if label is '-' or if event is more than one day*/}
                  {startTimeLabel !== '-' && !isMoreThanOneDay && (
                    <div className='flex items-center gap-2'>
                      {!startTimeLabel &&
                        !startDayTime &&
                        !start &&
                        (t('tba') ?? 'To be announced')}
                      {startTimeLabel ? (
                        startTimeLabel
                      ) : (
                        <>
                          <FormattedDateTime
                            variant='time'
                            datetime={startDayTime ?? start ?? eventDate?.date}
                            timeIcon={false}
                            showTimezone={!(endDayTime ?? end)}
                          />

                          {endTimeLabel !== '-' &&
                            (endTimeLabel ? (
                              endTimeLabel
                            ) : (
                              <>
                                <span className=''>-</span>
                                <FormattedDateTime
                                  variant='time'
                                  datetime={endDayTime ?? end}
                                  timeIcon={false}
                                />
                              </>
                            ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
                {location && (
                  <div className='mb-4 text-base text-norwegian-woods-100'>
                    {location}
                  </div>
                )}
                {!isMoreThanOneDay && (
                  <AddToCalendar
                    startDateTime={startDayTime ?? start}
                    endDateTime={endDayTime ?? end}
                    location={location}
                    title={plainTitle}
                  />
                )}
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
