import { FormattedTime, FormattedTimeProps, FormattedDate } from '@/core/FormattedDateTime'
import { DateProps, DateIcon } from './shared'

const FormattedDateTime = ({
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
    <span className={`inline-flex items-center space-x-2 ${uppercase && 'uppercase'}`} {...rest}>
      {icon && <DateIcon />}
      <span className="flex-shrink box-content space-x-3">
        <FormattedDate uppercase={uppercase} datetime={datetime} year={year} month={month} day={day} />
        <FormattedTime datetime={datetime} timezone={timezone} />
      </span>
    </span>
  )
}

export default FormattedDateTime
