'use client'
import { tz } from '@date-fns/tz'
import { Icon } from '@equinor/eds-core-react'
import { calendar, time } from '@equinor/eds-icons'
import { format } from 'date-fns'
import { enGB, nb } from 'date-fns/locale'
import { type DateTimeFormatOptions, useLocale } from 'next-intl'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from '@/lib/twMerge/twMerge'

export const DateIcon = (): JSX.Element => (
  <Icon data={calendar} className='text-norwegian-woods-100' />
)
export const TimeIcon = (): JSX.Element => (
  <Icon data={time} className='text-norwegian-woods-100' />
)

const getLocaleDateFormatting = (locale: string) => {
  return (
    {
      'en-GB': 'd MMMM yyyy',
      'nb-NO': 'd. MMMM yyyy',
    }[locale] || 'd MMMM yyyy'
  )
}

const getLocaleShortDayFormat = (locale: string) => {
  return (
    {
      'en-GB': 'd MMM',
      'nb-NO': 'd. MMM',
    }[locale] || 'd MMM'
  )
}

const getTimezoneName = (date: Date) => {
  return (
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Oslo',
      timeZoneName: 'short',
    })
      .formatToParts(date)
      .find(p => p.type === 'timeZoneName')?.value ?? ''
  )
}

type Variant = 'datetime' | 'date' | 'time' | 'period'

export type FormattedDateTimeProps = {
  /** Type of formatting to apply to the date.
   * @default 'datetime'
   */
  variant?: Variant
  /** Start datetime */
  datetime: string | Date
  /** End datetime, used for period variant */
  endDatetime?: string | Date
  /* Show a date icon
   * @default false
   */
  dateIcon?: boolean
  /* @default false */
  timeIcon?: boolean
  /* Render date with uppercase */
  /* @default false */
  uppercase?: boolean
  /* Render time with timezone, will be rendered if variant includes time. Can be overriden by setting false */
  showTimezone?: boolean
  /** dont wrap timezone in parentheses */
  noTimeZoneParanthesis?: boolean
  timeClassName?: string
} & HTMLAttributes<HTMLDivElement> &
  DateTimeFormatOptions

const FormattedDateTime = forwardRef<HTMLDivElement, FormattedDateTimeProps>(
  (
    {
      variant = 'datetime',
      datetime,
      endDatetime,
      dateIcon = false,
      timeIcon = false,
      showTimezone,
      uppercase = false,
      noTimeZoneParanthesis = false,
      className = '',
      timeClassName = '',
    },
    ref,
  ) => {
    const locale = 'nb-NO' //useLocale()
    const _showTimezone = showTimezone ?? variant !== 'date'

    if (!datetime) {
      return null
    }

    let date: Date
    if (typeof datetime === 'string') {
      date = new Date(datetime)
    } else {
      date = datetime as Date
    }

    let endDate: Date
    if (typeof endDatetime === 'string') {
      endDate = new Date(endDatetime)
    } else {
      endDate = endDatetime as Date
    }

    const timezoneName = getTimezoneName(date)
    let dateFormat = getLocaleDateFormatting(locale)

    if (variant === 'time') {
      dateFormat = 'HH:mm'
    }
    if (variant === 'datetime') {
      dateFormat = `${dateFormat} HH:mm`
    }

    const formattedDate = `${format(date, dateFormat, {
      in: tz('Europe/Oslo'),
      locale: locale === 'nb-NO' ? nb : enGB,
    })}${_showTimezone ? `${noTimeZoneParanthesis ? ' ' : ' ('}${timezoneName}${noTimeZoneParanthesis ? '' : ')'}` : ''}`

    return (
      <div
        ref={ref}
        className={twMerge(
          `flex items-end gap-2 text-base ${uppercase ? 'uppercase' : ''}`,
          className,
        )}
      >
        {dateIcon && <DateIcon />}
        {timeIcon && <TimeIcon />}
        {variant !== 'period' ? (
          <time suppressHydrationWarning dateTime={datetime?.toLocaleString()}>
            {formattedDate}
          </time>
        ) : (
          <>
            <time
              suppressHydrationWarning
              dateTime={datetime?.toLocaleString()}
              className='whitespace-nowrap'
            >
              {`${format(date, `${getLocaleShortDayFormat(locale)}`, {
                in: tz('Europe/Oslo'),
                locale: locale === 'nb-NO' ? nb : enGB,
              })}`}
            </time>
            <span>-</span>
            <time
              suppressHydrationWarning
              dateTime={endDatetime?.toLocaleString()}
              className='whitespace-nowrap'
            >
              {`${format(endDate, `${getLocaleShortDayFormat(locale)} yyyy`, {
                in: tz('Europe/Oslo'),
                locale: locale === 'nb-NO' ? nb : enGB,
              })}`}
            </time>
          </>
        )}
      </div>
    )
  },
)

export default FormattedDateTime
