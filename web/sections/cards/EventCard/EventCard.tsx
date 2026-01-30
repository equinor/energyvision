'use client'
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { useFormatter, useTranslations } from 'next-intl'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime, {
  DateIcon,
  TimeIcon,
} from '@/core/FormattedDateTime/FormattedDateTime'
import { BaseLink } from '@/core/Link/BaseLink'
import { getEventDates } from '@/lib/helpers/dateUtilities'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import AddToCalendar from '../../../core/AddToCalendar/AddToCalendar'
import Blocks from '../../../portableText/Blocks'

type Variants = 'default' | 'single' | 'carousel'

export type EventDateType = {
  date: string
  startTime?: string
  endTime?: string
  timezone: string
}

export type EventCardData = {
  id: string
  type: 'events'
  title: PortableTextBlock[]
  slug: string
  location?: string
  eventDate: EventDateType
  ingress?: PortableTextBlock[]
  startDayAndTime?: any
  endDayAndTime?: any
}

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
  console.log('startDayAndTime', startDayAndTime)
  console.log('endDayAndTime', endDayAndTime)
  const formatter = useFormatter()
  const { start, end } = getEventDates(eventDate)
  const { dayTime: startDayTime, overrideTimeLabel: startOverrideTimeLabel } =
    startDayAndTime || {}
  const { dayTime: endDayTime, overrideTimeLabel: endOverrideTimeLabel } =
    endDayAndTime || {}
  const dateEyebrow = `${formatter
    .dateTime(new Date(startDayTime), {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
    .split(' ')
    .slice(0, 2)
    .join(' ')}`

  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  const t = useTranslations()

  const variantClassName: Partial<Record<Variants, string>> = {
    default: '',
    single: 'max-w-prose',
    carousel: 'w-[383px]',
  }

  return (
    <div
      ref={ref}
      className={twMerge(
        `focus-visible:envis-outline dark:focus-visible:envis-outline-invert grid h-full w-full grid-rows-[1fr_max-content_max-content] gap-4 rounded-card px-6 py-8 text-slate-80 focus:outline-hidden dark:text-white-100 ${colorKeyToUtilityMap[background ?? 'gray-20'].background} ${variantClassName[variant]} `,
        className,
      )}
    >
      <BaseLink href={slug} className='hover:underline'>
        <Blocks
          value={title}
          as={hasSectionTitle ? 'h3' : 'h2'}
          variant='h5'
          blockClassName='mb-1'
        />
      </BaseLink>
      <div
        className={`${
          variant === 'single' ? 'w-fit min-w-[200px]' : ''
        } flex flex-col justify-center divide-y divide-autumn-storm-60`}
      >
        {!startDayTime && start && (
          <div className='h-full py-2'>
            <FormattedDateTime
              variant='date'
              dateIcon={true}
              datetime={start}
              className='text-xs'
            />
          </div>
        )}
        {(startDayTime || endDayTime) && (
          <div className='flex h-full items-end gap-2 py-2 text-xs'>
            <DateIcon />
            <time
              dateTime={startDayTime.toLocaleString()}
              className='leading-none'
            >
              {dateEyebrow}
            </time>
            {endDayTime && (
              <>
                <span className=''>-</span>
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
        {location && (
          <div className={`flex h-full items-center gap-2 py-2`}>
            <Icon
              data={world}
              color={'currentColor'}
              className='text-2xs text-norwegian-woods-100'
            />
            <div className='mt-1 flex text-xs'>{location}</div>
          </div>
        )}
        {startDayTime && startOverrideTimeLabel !== '-' && (
          <div className='flex h-full items-end gap-2 py-2 text-xs'>
            <TimeIcon />
            {startOverrideTimeLabel
              ? startOverrideTimeLabel
              : new Date(startDayTime).toTimeString()}
            {endDayTime &&
              endOverrideTimeLabel &&
              endOverrideTimeLabel !== '-' && (
                <>
                  <span className=''>-</span>
                  {endOverrideTimeLabel &&
                    endOverrideTimeLabel !== '-' &&
                    endOverrideTimeLabel}
                  {!endOverrideTimeLabel &&
                    new Date(startDayTime).toTimeString()}
                </>
              )}
          </div>
        )}

        {!startDayAndTime && start && end && (
          <div className={`flex h-full items-start gap-1 py-2`}>
            <FormattedDateTime
              variant='time'
              timeIcon={true}
              datetime={start}
              className='text-xs'
            />
            <span>-</span>
            <FormattedDateTime
              variant='time'
              datetime={end}
              showTimezone
              className='text-xs'
            />
          </div>
        )}
        {!startDayAndTime && !start && (
          <div
            className={`grid h-full grid-cols-[24px_auto] items-center gap-sm py-2`}
          >
            <TimeIcon />
            {t('tba')}
          </div>
        )}
      </div>
      {variant === 'single' && ingress && (
        <Blocks
          value={ingress}
          blockClassName='max-w-prose text-sm text-pretty'
        />
      )}
      <div className='mt-4 lg:mt-8'>
        <AddToCalendar
          eventDate={startDayTime ?? eventDate}
          location={location}
          title={plainTitle}
        />
      </div>
    </div>
  )
})
export default EventCard
