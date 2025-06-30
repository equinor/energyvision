import envisTwMerge from '@/twMerge'
import { DateProps, DateIcon } from './shared'
import { useFormatter } from 'next-intl'

const FormattedDate = ({
  datetime,
  year = 'numeric',
  month = 'long',
  day = '2-digit',
  weekday,
  icon = false,
  uppercase = false,
  className = '',
  ...rest
}: DateProps): JSX.Element => {
  const formatter = useFormatter()
  return (
    <span {...rest} className={envisTwMerge(`text-base inline-flex items-center space-x-2`, className)}>
      {icon && <DateIcon />}
      <span className={`flex-shrink box-content ${icon && '-mb-1'} ${uppercase ? 'uppercase' : ''}`}>
        <time suppressHydrationWarning dateTime={datetime}>
          {formatter.dateTime(new Date(datetime), {
            year: year,
            month: month,
            day: day,
            ...(weekday && { weekday: weekday }),
          })}
        </time>
      </span>
    </span>
  )
}

export default FormattedDate
