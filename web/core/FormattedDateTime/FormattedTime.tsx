import { HTMLAttributes } from 'react'
import { TimeIcon } from '@/core/FormattedDateTime'
import { useFormatter } from 'next-intl'
import { twMerge } from 'tailwind-merge'

export type FormattedTimeProps = {
  datetime: string | Date
  icon?: boolean
  showTimezone?: boolean
  small?: boolean
} & HTMLAttributes<HTMLSpanElement>

const FormattedTime = ({
  datetime,
  icon = false,
  small = false,
  showTimezone = false,
  className = '',
  ...rest
}: FormattedTimeProps): JSX.Element => {
  //Fix getEventDates DAte and string mixins
  const date = new Date(datetime)
  const format = useFormatter()
  return (
    <span {...rest} className={twMerge('inline-flex items-center gap-2 text-base', className)}>
      {icon && <TimeIcon />}
      <span className={`box-content shrink ${small ? 'mt-1' : 'mt-0'}`}>
        <time suppressHydrationWarning dateTime={datetime}>
          {format.dateTime(date, { hour: 'numeric', minute: 'numeric', hour12: false }) + ' '}
        </time>
        {showTimezone && <span>(CEST)</span>}
      </span>
    </span>
  )
}

export default FormattedTime
