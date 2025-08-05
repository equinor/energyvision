'use client'
import { BackgroundContainer } from '@/core/Backgrounds'
import { FormattedDate, FormattedTime } from '@/core/FormattedDateTime'
import { toPlainText } from '@portabletext/react'
import { getEventDates } from '../../common/helpers/dateUtilities'
import Promotion from '../../sections/Promotion/Promotion'
import type { PortableTextBlock } from '@portabletext/types'
import Seo from '../../pageComponents/shared/Seo'
import type { EventSchema } from '../../types/index'
import { EventJsonLd } from 'next-seo'
import Blocks from '../../portableText/Blocks'
import { twMerge } from 'tailwind-merge'
import RelatedContent from '../../pageComponents/shared/RelatedContent'
import { useTranslations } from 'next-intl'
import { Typography } from '@/core/Typography'
import AddToCalendar from '@/pageComponents/topicPages/AddToCalendar'
import IngressText from '@/portableText/IngressText'
import ContactList from '@/pageComponents/shared/ContactList'

export default function Event({ data }: { data: EventSchema }): JSX.Element {
  const { title } = data
  const t = useTranslations()
  const { location, ingress, content, promotedPeople, relatedLinks, contactList, eventDate } = data.content

  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const { start, end } = getEventDates(eventDate)
  return (
    <>
      <Seo seoAndSome={data?.seoAndSome} slug={data?.slug} pageTitle={data?.title} />
      {eventDate?.date && start && end && (
        <EventJsonLd
          name={plainTitle}
          startDate={start.toDateString()}
          endDate={end.toDateString()}
          location={location}
        />
      )}
      <main>
        <article>
          <BackgroundContainer className="px-layout-md py-32" background={{ backgroundColor: 'Moss Green Light' }}>
            <div className="mx-auto max-w-[1186px]">
              {title && (
                <Typography as="h1" variant="3xl">
                  {plainTitle}
                </Typography>
              )}
              {start && (
                <div className="mt-7 mb-5 text-xl text-norwegian-woods-100">
                  <FormattedDate datetime={start} />
                </div>
              )}

              <div className="flex-center mb-2 flex gap-1 text-norwegian-woods-100">
                {start && end ? (
                  <>
                    <FormattedTime datetime={start} />
                    <span>-</span>
                    <FormattedTime datetime={end} timezone />
                  </>
                ) : (
                  <span>{t('tba')}</span>
                )}
              </div>

              {location && <div className="mb-4 text-norwegian-woods-100">{location}</div>}
              <AddToCalendar eventDate={eventDate} location={location} title={plainTitle} />
            </div>
          </BackgroundContainer>
          {(ingress || content) && (
            <div className={`mt-16 px-0 pb-page-content md:px-8 lg:px-0`}>
              {ingress && <IngressText value={ingress} className="mx-auto max-w-viewport px-layout-lg pb-16" />}
              {content && <Blocks variant="prose-article" value={content} className="mx-auto max-w-viewport" />}
            </div>
          )}
          {promotedPeople?.people && promotedPeople?.people.length > 0 && (
            <Promotion
              data={{
                id: 'promotedPeople',
                type: 'people',
                title: promotedPeople.title,
                content: { promotions: promotedPeople.people, type: 'promotePeople' },
              }}
            />
          )}
          {contactList && <ContactList data={contactList} className="my-12" />}

          {relatedLinks?.links && relatedLinks.links.length > 0 && (
            <RelatedContent
              data={relatedLinks}
              className={twMerge(`mx-auto max-w-viewport px-layout-lg pb-page-content`)}
            />
          )}
        </article>
      </main>
    </>
  )
}
