import { FormattedTime as ReactIntlTime } from 'react-intl'
import { StyledDate, TimeIcon } from './shared'

export type FormattedTimeProps = {
  datetime: string
  icon?: boolean
}

export const FormattedTime = ({ datetime, icon = false }: FormattedTimeProps): JSX.Element => {
  if (icon) {
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
