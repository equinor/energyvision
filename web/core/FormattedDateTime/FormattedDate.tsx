import { FormattedDate as ReactIntlDate } from 'react-intl'
import { DateProps, DateIcon } from './shared'

const FormattedDate = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  weekday,
  icon = false,
  uppercase = false,
  ...rest
}: DateProps): JSX.Element => {
  return (
    <span className={`inline-flex items-center space-x-2 ${uppercase && 'uppercase'}`} {...rest}>
      {icon && <DateIcon />}
      <span className={`flex-shrink box-content ${icon && '-mb-1'}`}>
        <time suppressHydrationWarning dateTime={datetime}>
          <ReactIntlDate
            value={new Date(datetime)}
            day={day}
            year={year}
            month={month}
            {...(weekday && { weekday: weekday })}
          />
        </time>
      </span>
    </span>
  )
}

export default FormattedDate
