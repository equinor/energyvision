import { DateProps, DateIcon } from './shared'
import { useFormatter } from 'next-intl'
import { twMerge } from 'tailwind-merge'

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
    <span {...rest} className={twMerge(`items-center space-x-2 text-base`, className)}>
      {icon && <DateIcon />}
      <span className={twMerge(`shrink ${icon ? '-mb-1' : ''}${uppercase ? 'uppercase' : ''}`)}>
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
