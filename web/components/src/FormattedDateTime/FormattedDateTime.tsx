import { FormattedDate, FormattedTime } from './'
import { DateProps, StyledDate, DateIcon } from './shared'

export const FormattedDateTime = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  withIcon = true,
}: DateProps): JSX.Element => {
  if (!withIcon) {
    return (
      <>
        <FormattedDate datetime={datetime} year={year} month={month} day={day} /> <FormattedTime datetime={datetime} />
      </>
    )
  }

  return (
    <StyledDate>
      <DateIcon />
      <FormattedDate datetime={datetime} year={year} month={month} day={day} /> <FormattedTime datetime={datetime} />
    </StyledDate>
  )
}
