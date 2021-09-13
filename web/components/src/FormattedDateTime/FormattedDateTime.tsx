import { FormattedDate } from './FormattedDate'
import { FormattedTime } from './FormattedTime'
import { DateProps, StyledDate, DateIcon } from './shared'

export const FormattedDateTime = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  icon = false,
  ...rest
}: DateProps): JSX.Element => {
  if (!icon) {
    return (
      <StyledDate {...rest}>
        <FormattedDate datetime={datetime} year={year} month={month} day={day} />
        <FormattedTime datetime={datetime} />
      </StyledDate>
    )
  }

  return (
    <StyledDate {...rest}>
      <DateIcon />
      <FormattedDate datetime={datetime} year={year} month={month} day={day} /> <FormattedTime datetime={datetime} />
    </StyledDate>
  )
}
