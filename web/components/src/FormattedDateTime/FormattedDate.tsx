import { FormattedDate as ReactIntlDate } from 'react-intl'
import { DateProps, StyledDate, DateIcon } from './shared'

export const FormattedDate = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  icon = false,
  uppercase = false,
  ...rest
}: DateProps): JSX.Element => {
  return (
    <StyledDate uppercase={uppercase} {...rest}>
      {icon && <DateIcon />}
      <time dateTime={datetime}>
        <ReactIntlDate value={new Date(datetime)} day={day} year={year} month={month} />
      </time>
    </StyledDate>
  )
}
