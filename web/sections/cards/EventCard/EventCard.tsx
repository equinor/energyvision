'use client'
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { useFormatter, useTranslations } from 'next-intl'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime, {
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

  const formatter = useFormatter()
  const { start, end } = getEventDates(eventDate)
  const { dayTime: startDayTime, overrideTimeLabel: startTimeLabel } =
    startDayAndTime || {}
  const { dayTime: endDayTime, overrideTimeLabel: endTimeLabel } =
    endDayAndTime || {}
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const t = useTranslations()

  console.log('Event card startTimeLabel', startTimeLabel)

  const variantClassName: Partial<Record<Variants, string>> = {
    default: '',
    single: 'max-w-prose',
    carousel: 'w-[383px]',
  }

  return (
    <div
      ref={ref}
      className={twMerge(
        `has-[:focus-visible]:envis-outline dark:has-[:focus-visible]:envis-outline-invert flex h-full flex-col rounded-card px-6 py-8 text-slate-80 focus:outline-hidden dark:text-white-100 ${colorKeyToUtilityMap[background ?? 'gray-20'].background} ${variantClassName[variant]} `,
        className,
      )}
    >
      <div className='flex items-end text-xs'>
        {!startDayTime && (start || eventDate?.date) && (
          <FormattedDateTime
            variant='date'
            datetime={start ?? eventDate?.date}
            className='text-sm'
            timeClassName='leading-none'
          />
        )}
        {(startDayTime || endDayTime) && (
          <>
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
                <span className='flex items-end px-1 leading-none'>-</span>
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
          </>
        )}
      </div>
      <BaseLink href={slug} className='mt-4 mb-4 hover:underline'>
        <Blocks
          value={title}
          as={hasSectionTitle ? 'h3' : 'h2'}
          variant='h5'
          blockClassName=''
        />
      </BaseLink>

      <div className={`flex grow flex-col justify-end`}>
        {/*         {!startDayTime && (start || eventDate?.date) && (
          <div className='h-full py-2'>
            <FormattedDateTime
              variant='date'
              dateIcon={true}
              datetime={start ?? eventDate?.date}
              className='text-xs'
            />
          </div>
        )} */}
        {/*         {(startDayTime || endDayTime) && (
          <div className='flex h-full items-end gap-2 py-2 text-xs'>
            <DateIcon />
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
        )} */}
        {startDayTime && startTimeLabel !== '-' && (
          <div className='flex items-end gap-2 py-2 text-xs'>
            <TimeIcon />
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
          <div className={`flex items-start gap-1 py-2`}>
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
        {location && (
          <div className={`flex items-center gap-2 py-2`}>
            <Icon
              data={world}
              color={'currentColor'}
              className='text-2xs text-norwegian-woods-100'
            />
            <div className='mt-1 flex text-sm'>{location}</div>
          </div>
        )}
        {variant === 'single' && ingress && (
          <Blocks
            group='card'
            variant='ingress'
            value={ingress}
            blockClassName='pt-2 pb-3'
          />
        )}
      </div>
      <div className='mt-auto'>
        <AddToCalendar
          eventDate={eventDate}
          startDateTime={startDayTime}
          endDateTime={endDayTime}
          location={location}
          title={plainTitle}
        />
      </div>
    </div>
  )
})
export default EventCard
