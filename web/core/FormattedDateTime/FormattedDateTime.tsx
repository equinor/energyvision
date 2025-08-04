import { FormattedTime, FormattedTimeProps, FormattedDate } from '@/core/FormattedDateTime'
import { DateProps, DateIcon } from './shared'
import { twMerge } from 'tailwind-merge'

const FormattedDateTime = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  icon = false,
  showTimezone = false,
  uppercase = false,
  className = '',
  ...rest
}: DateProps & FormattedTimeProps): JSX.Element => {
  return (
    <span {...rest} className={twMerge(`flex items-center space-x-2 ${uppercase ? 'uppercase' : ''}`, className)}>
      {icon && <DateIcon />}
      <span className="box-content flex shrink gap-x-3">
        <FormattedDate uppercase={uppercase} datetime={datetime} year={year} month={month} day={day} />
        <FormattedTime datetime={datetime} showTimezone={showTimezone} />
      </span>
    </span>
  )
}

export default FormattedDateTime
