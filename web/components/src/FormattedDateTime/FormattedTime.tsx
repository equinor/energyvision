import { FormattedTime as ReactIntlTime } from 'react-intl'
import { StyledDate, TimeIcon } from './shared'

export type FormattedTimeProps = {
  datetime: string
  icon?: boolean
  timezone?: boolean
}

export const FormattedTime = ({ datetime, icon = false, timezone }: FormattedTimeProps): JSX.Element => {
  const date = new Date(datetime)
  return (
    <StyledDate>
      {icon && <TimeIcon />}
      <time dateTime={datetime}>
        <ReactIntlTime value={date} />
      </time>
      {timezone && <span>({date.toLocaleTimeString('es-NO', { timeZoneName: 'short' }).split(' ')[1]})</span>}
    </StyledDate>
  )
}
