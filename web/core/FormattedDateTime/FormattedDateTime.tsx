import { forwardRef } from 'react'
import { Icon } from '@equinor/eds-core-react'
import { calendar, time } from '@equinor/eds-icons'
import { twMerge } from 'tailwind-merge'
import { FormattedDate } from 'react-intl'

export type FormattedDateTimeProps = {
  date: string
  hideIcon?: boolean
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
  className?: string
  timeClassName?: string
}

const FormattedDateTime = forwardRef<HTMLDivElement, FormattedDateTimeProps>(function PastEventsListItem(
  {
    date,
    year = 'numeric',
    month = 'long',
    day = '2-digit',
    hideIcon = false,
    className = '',
    timeClassName = '',
    ...rest
  },
  ref,
) {
  return (
    <span ref={ref} className={twMerge('inline-flex gap-2 items-center', className)} {...rest}>
      {!hideIcon && <DateIcon />}
      {date && (
        <time dateTime={date} className={twMerge('text-xs', timeClassName)}>
          <FormattedDate value={new Date(date)} day={day} year={year} month={month} />
        </time>
      )}
    </span>
  )
})
export default FormattedDateTime

export const DateIcon = (): JSX.Element => <Icon data={calendar} className="text-norwegian-woods-100" />
export const TimeIcon = (): JSX.Element => <Icon data={time} className="text-norwegian-woods-100" />
