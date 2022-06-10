import { HTMLAttributes } from 'react'
import { FormattedTime as ReactIntlTime } from 'react-intl'
import { StyledDate, TimeIcon } from './shared'
import styled from 'styled-components'

export type FormattedTimeProps = {
  datetime: string
  icon?: boolean
  timezone?: boolean
  small?: boolean
} & HTMLAttributes<HTMLSpanElement>

const SmallText = styled.span<{ small?: boolean }>`
  font-size: ${(props) => (props.small ? 'var(--typeScale-0)' : 'var(--typeScale-1)')};
  margin-top: ${(props) => (props.small ? 'var(--space-3)' : '0')};
`

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
      <SmallText small={small}>
        <time suppressHydrationWarning dateTime={datetime}>
          <ReactIntlTime value={date} />
        </time>
        {timezone && (
          <span suppressHydrationWarning style={{ marginLeft: 'var(--space-4)' }}>
            ({date.toLocaleTimeString('es-NO', { timeZoneName: 'short' }).split(' ')[1]})
          </span>
        )}
      </SmallText>
    </StyledDate>
  )
}
