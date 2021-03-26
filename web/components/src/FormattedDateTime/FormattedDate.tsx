import { FormattedDate as ReactIntlDate } from 'react-intl'
import { DateProps, StyledDate, DateIcon } from './shared'
import styled from 'styled-components'

const StyledTime = styled.time`
  text-transform: uppercase;
`

export const FormattedDate = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  withIcon = false,
}: DateProps): JSX.Element => {
  if (withIcon) {
    return (
      <StyledDate>
        <DateIcon />
        <time dateTime={datetime}>
          <ReactIntlDate value={new Date(datetime)} year={year} month={month} day={day} />
        </time>
      </StyledDate>
    )
  }

  return (
    <StyledTime dateTime={datetime}>
      <ReactIntlDate value={new Date(datetime)} year={year} month={month} day={day} />
    </StyledTime>
  )
}
