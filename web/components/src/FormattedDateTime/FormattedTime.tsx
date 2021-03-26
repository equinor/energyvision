import { FormattedTime as ReactIntlTime } from 'react-intl'
import { StyledDate, TimeIcon } from './shared'

export type FormattedTimeProps = {
  datetime: string
  withIcon?: boolean
}

export const FormattedTime = ({ datetime, withIcon = false }: FormattedTimeProps): JSX.Element => {
  if (withIcon) {
    return (
      <StyledDate>
        <TimeIcon />
        <time dateTime={datetime}>
          <ReactIntlTime value={new Date(datetime)} />
        </time>
      </StyledDate>
    )
  }

  return (
    <time dateTime={datetime}>
      <ReactIntlTime value={new Date(datetime)} />
    </time>
  )
}
