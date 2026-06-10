'use client'
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { useLocale, useTranslations } from 'next-intl'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { BaseLink } from '@/core/Link/BaseLink'
import { defaultLanguage } from '@/languageConfig'
import { getEventDates } from '@/lib/helpers/dateUtilities'
import { getLocaleFromIso } from '@/sanity/helpers/localization'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import type { EventProps } from '@/templates/event/Event'
import AddToCalendar from '../../../core/AddToCalendar/AddToCalendar'
import Blocks from '../../../portableText/Blocks'

type Variants = 'default' | 'single' | 'carousel'

type EventCardEventFields = Pick<
  EventProps['content'],
  'location' | 'eventDate' | 'ingress' | 'startDayAndTime' | 'endDayAndTime'
>

export type EventCardData = {
  type: 'events'
} & Pick<EventProps, 'id' | 'title' | 'slug'> &
  EventCardEventFields

export type EventCardProps = {
  data: EventCardData
  background?: ColorKeys
  hasSectionTitle: boolean
  variant?: Variants
} & HTMLAttributes<HTMLDivElement>

/**
 * Event Card component.
 * Remember to wrap in ul and li if in a list.
 * */
const EventCard = forwardRef<HTMLDivElement, EventCardProps>(function EventCard(
  {
    data,
    background,
    className = '',
    variant = 'default',
    hasSectionTitle = true,
  },
  ref,
) {
  const {
    title,
    location,
    eventDate,
    slug,
    ingress,
    startDayAndTime,
    endDayAndTime,
  } = data

  const iso = useLocale()
  const t = useTranslations()
  const locale = iso !== defaultLanguage.name ? getLocaleFromIso(iso) : ''
  const href = '/' + locale + slug || ''

  const { start, end } = getEventDates(eventDate)
  const { dayTime: startDayTime, overrideTimeLabel: startTimeLabel } =
    startDayAndTime || {}

  const { dayTime: endDayTime, overrideTimeLabel: endTimeLabel } =
    endDayAndTime || {}
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const isMoreThanOneDay =
    startDayTime && endDayTime
      ? new Date(endDayTime).getTime() - new Date(startDayTime).getTime() >
        24 * 60 * 60 * 1000
      : false

  return (
    <div
      ref={ref}
      className={twMerge(
        `has-focus-visible:envis-outline dark:has-focus-visible:envis-outline-invert flex h-full flex-col rounded-card px-6 py-8 text-slate-80 focus:outline-hidden dark:text-white-100`,
        colorKeyToUtilityMap[background ?? 'gray-20'].background,
        variant === 'carousel' && 'w-[383px]',
        variant === 'single' && 'max-w-prose',
        className,
      )}
    >
      <BaseLink href={href} className='mb-6 hover:underline'>
        <Blocks
          value={title}
          as={hasSectionTitle ? 'h3' : 'h2'}
          variant='h5'
          blockClassName=''
        />
      </BaseLink>
      <div
        className={`flex w-fit grow flex-col justify-end divide-y divide-autumn-storm-60 *:pt-2 *:pr-8 *:pb-2 *:first:pt-0 *:last:pb-0`}
      >
        {/* Date */}
        <FormattedDateTime
          datetime={startDayTime ?? start ?? eventDate?.date}
          endDatetime={endDayTime}
          variant={isMoreThanOneDay ? 'period' : 'date'}
          dateIcon={true}
          className='text-sm **:text-sm **:leading-none'
        />
        {/* Time - Dont show if label is '-' or if event is more than one day*/}
        {startTimeLabel !== '-' && !isMoreThanOneDay && (
          <div className='flex items-end gap-1 **:text-sm **:leading-none'>
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
                  timeIcon={true}
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
        {location && (
          <div className={`flex items-start gap-2`}>
            <Icon
              data={world}
              color={'currentColor'}
              className='text-2xs text-norwegian-woods-100'
            />
            <div className='mt-1 flex text-sm leading-none'>{location}</div>
          </div>
        )}
      </div>
      {variant === 'single' && ingress && (
        <Blocks
          group='card'
          variant='ingress'
          value={ingress}
          blockClassName='pt-6'
        />
      )}
      <div className='mt-auto min-h-[83.3px] pt-8'>
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
  )
})
export default EventCard
