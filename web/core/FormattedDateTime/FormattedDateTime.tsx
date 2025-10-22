'use client'
import { twMerge } from 'tailwind-merge'
import { forwardRef, HTMLAttributes } from 'react'
import { DateTimeFormatOptions, useFormatter } from 'next-intl'
import { Icon } from '@equinor/eds-core-react'
import { calendar, time } from '@equinor/eds-icons'

export const DateIcon = (): JSX.Element => <Icon data={calendar} className="text-norwegian-woods-100" />
export const TimeIcon = (): JSX.Element => <Icon data={time} className="text-norwegian-woods-100" />

type Variant = 'datetime' | 'date' | 'time'

export type FormattedDateTimeProps = {
  variant?: Variant
  datetime: string | Date
  dateIcon?: boolean
  timeIcon?: boolean
  /* Render date with uppercase */
  uppercase?: boolean
  /* Render time with timezone */
  showTimezone?: boolean
} & HTMLAttributes<HTMLSpanElement> &
  DateTimeFormatOptions

const FormattedDateTime = forwardRef<HTMLSpanElement, FormattedDateTimeProps>(
  (
    {
      variant = 'datetime',
      datetime,
      year,
      month,
      day,
      weekday,
      dateIcon = false,
      timeIcon = false,
      showTimezone = false,
      uppercase = false,
      className = '',
    },
    ref,
  ) => {
    const formatter = useFormatter()

    let date = undefined
    if (typeof date === 'string' && datetime) {
      date = new Date(datetime)
    } else {
      date = datetime as Date
    }
    if (!date) {
      return null
    }

    const getVariantConfig = (): DateTimeFormatOptions => {
      switch (variant) {
        case 'date':
          return {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            ...(showTimezone && {
              timeZoneName: 'short',
            }),
          }
        case 'time':
          return { timeStyle: 'short' }
        case 'datetime':
        default:
          return {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            ...(showTimezone && {
              timeZoneName: 'short',
            }),
          }
      }
    }

    const variantClassName: Record<Variant, string> = {
      date: `${dateIcon ? '' : ''}`,
      datetime: '',
      time: `${timeIcon ? '' : ''}`,
    }
    let config: DateTimeFormatOptions = getVariantConfig()
    /** Override default configs */
    if (year && month && day) {
      config = {
        year: year ?? 'numeric',
        month: month ?? 'long',
        day: day ?? '2-digit',
        ...(weekday && { weekday: weekday }),
      }
    }

    return (
      <span ref={ref} className={twMerge(`flex items-end gap-2 text-base ${uppercase ? 'uppercase' : ''}`, className)}>
        {dateIcon && <DateIcon />}
        {timeIcon && <TimeIcon />}
        <time suppressHydrationWarning dateTime={datetime?.toLocaleString()}>
          <span className={`mt-auto block leading-6 ${variantClassName[variant]} `}>
            {formatter.dateTime(new Date(datetime), config)}
          </span>
        </time>
      </span>
    )
  },
)

export default FormattedDateTime
