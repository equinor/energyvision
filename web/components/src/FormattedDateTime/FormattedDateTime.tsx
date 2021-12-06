import { FormattedDate } from './FormattedDate'
import { FormattedTime, FormattedTimeProps } from './FormattedTime'
import { DateProps, StyledDate, DateIcon } from './shared'

export const FormattedDateTime = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  icon = false,
  timezone,
  ...rest
}: DateProps & FormattedTimeProps): JSX.Element => {
  return (
    <StyledDate {...rest}>
      {icon && <DateIcon />}
      <FormattedDate datetime={datetime} year={year} month={month} day={day} />
      <FormattedTime datetime={datetime} timezone={timezone} />
    </StyledDate>
  )
}
