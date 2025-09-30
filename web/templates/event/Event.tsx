'use client'
import { FormattedTime } from '@/core/FormattedDateTime'
import { toPlainText } from '@portabletext/react'
import { getEventDates } from '../../common/helpers/dateUtilities'
import Promotion from '../../sections/promotions/PromotionsBlock'
import type { PortableTextBlock } from '@portabletext/types'
import type { EventSchema } from '../../types/index'
import { EventJsonLd } from 'next-seo'
import { twMerge } from 'tailwind-merge'
import RelatedContent from '../../pageComponents/shared/RelatedContent'
import { useTranslations, useFormatter } from 'next-intl'
import AddToCalendar from '@/pageComponents/topicPages/AddToCalendar'
import ContactList from '@/pageComponents/shared/ContactList'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'

export default function Event({ data }: { data: EventSchema }): JSX.Element {
  const { title } = data
  const t = useTranslations()
  const format = useFormatter()
  const { location, ingress, content, promotedPeople, relatedLinks, contactList, eventDate } = data.content

  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const { start, end } = getEventDates(eventDate)

  const { bg, dark } = getBgAndDarkFromBackground({ background: { backgroundColor: 'Moss Green Light' } })

  return (
    <>
      {eventDate?.date && start && end && (
        <EventJsonLd
          name={plainTitle}
          startDate={start.toISOString()}
          endDate={end.toISOString()}
          location={location}
        />
      )}
      <main className="flex flex-col [:not(:has(.sticky-menu))]:pt-topbar">
        <article>
          <div className={`${bg} ${dark ? 'dark' : ''} px-layout-md py-32`}>
            <div className="mx-auto max-w-[1186px]">
              {title && <Blocks as="h1" variant="3xl" value={title} />}
              {start && (
                <span className="mt-7 mb-5 inline-block text-xl text-norwegian-woods-100">
                  <time suppressHydrationWarning dateTime={start.toISOString()}>
                    {format.dateTime(start, { dateStyle: 'long' })}
                  </time>
                </span>
              )}

              <div className="flex-center mb-2 flex gap-1 text-norwegian-woods-100">
                {start && end ? (
                  <div className={`flex h-full items-center gap-1 py-2`}>
                    <FormattedTime datetime={start} />
                    {`-`}
                    <FormattedTime datetime={end} showTimezone />
                  </div>
                ) : (
                  <span>{t('tba')}</span>
                )}
              </div>

              {location && <div className="mb-4 text-norwegian-woods-100">{location}</div>}
              <AddToCalendar eventDate={eventDate} location={location} title={plainTitle} />
            </div>
          </div>
          {(ingress || content) && (
            <div className={`mx-auto mt-16 px-layout-lg pb-page-content`}>
              {ingress && <Blocks variant="ingress" value={ingress} className="pb-16" />}
              {content && <Blocks value={content} />}
            </div>
          )}
          {promotedPeople?.people && promotedPeople?.people.length > 0 && (
            <Promotion
              variant="promotePeople"
              data={{
                id: 'promotedPeople',
                type: 'people',
                title: promotedPeople.title,
                promotions: promotedPeople.people,
              }}
            />
          )}
          {contactList && <ContactList data={contactList} className="my-12" />}

          {relatedLinks?.links && relatedLinks.links.length > 0 && (
            <RelatedContent data={relatedLinks} className={twMerge(`mx-auto px-layout-lg pb-page-content`)} />
          )}
        </article>
      </main>
    </>
  )
}
