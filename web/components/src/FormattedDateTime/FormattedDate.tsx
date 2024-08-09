import { FormattedDate as ReactIntlDate } from 'react-intl'
import { DateProps, StyledDate, DateIcon } from './shared'
import styled from 'styled-components'

const StyledTime = styled.time`
  /* Better alignment with the icon */
  svg + & {
    margin-bottom: -2px;
  }
`
export const FormattedDate = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  weekday = 'long',
  icon = false,
  uppercase = false,
  ...rest
}: DateProps): JSX.Element => {
  return (
    <StyledDate $uppercase={uppercase} {...rest}>
      {icon && <DateIcon />}
      <StyledTime suppressHydrationWarning dateTime={datetime}>
        <ReactIntlDate value={new Date(datetime)} day={day} year={year} month={month} />
      </StyledTime>
    </StyledDate>
  )
}
