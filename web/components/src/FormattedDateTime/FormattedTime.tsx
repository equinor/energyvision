import { HTMLAttributes } from 'react'
import { FormattedTime as ReactIntlTime } from 'react-intl'
import { StyledDate, TimeIcon } from './shared'

export type FormattedTimeProps = {
  datetime: string
  icon?: boolean
  timezone?: boolean
  small?: boolean
} & HTMLAttributes<HTMLSpanElement>

export const FormattedTime = ({
  datetime,
  icon = false,
  small = false,
  timezone,
  ...rest
}: FormattedTimeProps): JSX.Element => {
  const date = new Date(datetime)
  return (
    <StyledDate {...rest}>
      {icon && <TimeIcon />}
      <span className={`${small ? 'text-2xs mt-1' : 'mt-0'}`}>
        <time suppressHydrationWarning dateTime={datetime}>
          <ReactIntlTime value={date} />
        </time>
        {timezone && (
          <span suppressHydrationWarning style={{ marginLeft: 'var(--space-4)' }}>
            ({date.toLocaleTimeString('es-NO', { timeZoneName: 'short' }).split(' ')[1]})
          </span>
        )}
      </span>
    </StyledDate>
  )
}
