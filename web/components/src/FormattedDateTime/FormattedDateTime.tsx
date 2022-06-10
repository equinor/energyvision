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
  uppercase = false,
  ...rest
}: DateProps & FormattedTimeProps): JSX.Element => {
  return (
    <StyledDate {...rest}>
      {icon && <DateIcon />}
      <FormattedDate uppercase={uppercase} datetime={datetime} year={year} month={month} day={day} />
      <FormattedTime suppressHydrationWarning datetime={datetime} timezone={timezone} />
    </StyledDate>
  )
}
