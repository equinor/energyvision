'use client'
import { tz } from '@date-fns/tz'
import { Icon } from '@equinor/eds-core-react'
import { calendar, time } from '@equinor/eds-icons'
import { format } from 'date-fns'
import {
  cy,
  de,
  enGB,
  es,
  ja,
  ko,
  type Locale,
  nb,
  pl,
  ptBR,
} from 'date-fns/locale'
import { type DateTimeFormatOptions, useLocale } from 'next-intl'
import { forwardRef, type HTMLAttributes, useEffect, useState } from 'react'
import { twMerge } from '@/lib/twMerge/twMerge'

export const DateIcon = (): JSX.Element => (
  <Icon data={calendar} className='text-norwegian-woods-100' />
)
export const TimeIcon = (): JSX.Element => (
  <Icon data={time} className='text-norwegian-woods-100' />
)

const getTimezoneName = (
  date: Date,
  locale = 'en-GB',
  browserTimeZone?: string,
) => {
  return (
    new Intl.DateTimeFormat(locale, {
      timeZone: browserTimeZone || 'Europe/Oslo',
      timeZoneName: 'short',
    })
      .formatToParts(date)
      .find(p => p.type === 'timeZoneName')?.value ?? ''
  )
}

type Variant = 'datetime' | 'date' | 'pastDate' | 'time'

export type FormattedDateTimeProps = {
  /**
   * Formatting variant used to render the value.
   * @default 'date'
   */
  variant?: Variant
  /**
   * Start date/time value.
   */
  datetime: string | Date
  /**
   * End date/time value used by period variants.
   */
  endDatetime?: string | Date
  /**
   * Show the date icon.
   * @default 'false'
   */
  dateIcon?: boolean
  /**
   * Show the time icon.
   * @default 'false'
   */
  timeIcon?: boolean
  /**
   * Render the output text in uppercase.
   * @default 'false'
   */
  uppercase?: boolean
  /**
   * Append timezone to the rendered value.
   * @default true for all variants except 'date'
   */
  showTimezone?: boolean
  /**
   * Do not wrap timezone in parentheses.
   * @default 'false'
   */
  noTimeZoneParanthesis?: boolean
  /**
   * Extra class name for the inner time wrapper.
   */
  timeClassName?: string
} & HTMLAttributes<HTMLDivElement> &
  DateTimeFormatOptions

const getLocale = (locale: string): Locale => {
  switch (locale) {
    case 'nb-NO':
      return nb
    case 'pt-BR':
      return ptBR
    case 'pl-PL':
      return pl
    case 'cy-CY':
      return cy
    case 'ja-JP':
      return ja
    case 'ko-KR':
      return ko
    case 'de-DE':
      return de
    case 'es-AR':
      return es
    default:
      enGB
  }
  return enGB
}
const FormattedDateTime = forwardRef<HTMLDivElement, FormattedDateTimeProps>(
  (
    {
      variant = 'date',
      datetime,
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
    const locale = useLocale()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
      setIsMounted(true)
    }, [])

    const _showTimezone =
      showTimezone ?? (variant !== 'date' && variant !== 'pastDate')

    if (!datetime) {
      return null
    }

    let date: Date
    if (typeof datetime === 'string') {
      date = new Date(datetime)
    } else {
      date = datetime as Date
    }

    //https://date-fns.org/v4.4.0/docs/format
    //April 29th, 2025
    let dateFormat = 'PPP'

    if (variant === 'time') {
      //12:00 AM
      dateFormat = 'p'
    }
    if (variant === 'datetime') {
      dateFormat = `${dateFormat} p`
    }

    // Keep the initial server/client render deterministic, then switch to browser timezone.
    const browserTimeZone = isMounted
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : 'Europe/Oslo'
    const timezoneName = getTimezoneName(date, locale, browserTimeZone)

    const formattedDate = `${format(date, dateFormat, {
      in: tz(browserTimeZone),
      locale: getLocale(locale),
    })}${_showTimezone ? `${noTimeZoneParanthesis ? ' ' : ' ('}${timezoneName}${noTimeZoneParanthesis ? '' : ')'}` : ''}`

    return (
      <div
        ref={ref}
        className={twMerge(
          `inline-flex items-center gap-2 space-x-2 text-base **:leading-none ${uppercase ? 'uppercase' : ''}`,
          className,
        )}
      >
        {dateIcon && <DateIcon />}
        {timeIcon && <TimeIcon />}
        <div className={twMerge('mt-1.5', timeClassName)}>
          <time dateTime={formattedDate} className={timeClassName}>
            {variant !== 'pastDate' ? (
              formattedDate
            ) : (
              <div className='flex flex-col items-center justify-start gap-4 text-center'>
                <div className='text-md'>{`${format(date, 'dd')} ${format(date, 'MMM')}`}</div>
                <div className='text-sm'>{format(date, 'yyyy')}</div>
              </div>
            )}
          </time>
        </div>
      </div>
    )
  },
)

export default FormattedDateTime
