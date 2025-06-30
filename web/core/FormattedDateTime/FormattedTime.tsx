import { HTMLAttributes } from 'react'
import { TimeIcon } from '@/core/FormattedDateTime'
import { useFormatter } from 'next-intl'

export type FormattedTimeProps = {
  datetime: string
  icon?: boolean
  showTimezone?: boolean
  small?: boolean
} & HTMLAttributes<HTMLSpanElement>

const FormattedTime = ({
  datetime,
  icon = false,
  small = false,
  showTimezone = false,
  ...rest
}: FormattedTimeProps): JSX.Element => {
  const date = new Date(datetime)
  const format = useFormatter()
  return (
    <span className="text-xs inline-flex items-center space-x-2" {...rest}>
      {icon && <TimeIcon />}
      <span className={`flex-shrink box-content ${small ? 'mt-1' : 'mt-0'}`}>
        <time suppressHydrationWarning dateTime={datetime}>
          {format.dateTime(date, { hour: 'numeric', minute: 'numeric', hour12: false }) + ' '}
        </time>
        {showTimezone && <span>(CEST)</span>}
      </span>
    </span>
  )
}

export default FormattedTime
