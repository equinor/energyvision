import { FormattedDate, FormattedTime } from './'
import { DateProps, StyledDate, DateIcon } from './shared'

export const FormattedDateTime = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  withIcon = true,
  ...rest
}: DateProps): JSX.Element => {
  if (!withIcon) {
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
