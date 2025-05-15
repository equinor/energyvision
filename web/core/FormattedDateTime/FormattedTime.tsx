import { HTMLAttributes } from 'react'
import { TimeIcon } from '@core/FormattedDateTime'
import { useFormatter } from 'next-intl'

export type FormattedTimeProps = {
  datetime: string
  icon?: boolean
  timezone?: boolean
  small?: boolean
} & HTMLAttributes<HTMLSpanElement>

const FormattedTime = ({
  datetime,
  icon = false,
  small = false,
  timezone,
  ...rest
}: FormattedTimeProps): JSX.Element => {
  const date = new Date(datetime)
  const format = useFormatter()
  return (
    <span className="inline-flex items-center space-x-2" {...rest}>
      {icon && <TimeIcon />}
      <span className={`flex-shrink box-content ${small ? 'text-2xs mt-1' : 'mt-0'}`}>
        <time suppressHydrationWarning dateTime={datetime}>
          {format.dateTime(date, { hour: 'numeric', minute: 'numeric', hour12: false }) + ' '}
        </time>
        {timezone && (
          <span suppressHydrationWarning style={{ marginLeft: 'var(--space-4)' }}>
            ({date.toLocaleTimeString('es-NO', { timeZoneName: 'short' }).split(' ')[1]})
          </span>
        )}
      </span>
    </span>
  )
}

export default FormattedTime
