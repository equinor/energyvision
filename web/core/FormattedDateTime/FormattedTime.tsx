import { HTMLAttributes } from 'react'
import { TimeIcon } from '@/core/FormattedDateTime'
import { useFormatter } from 'next-intl'
import { twMerge } from 'tailwind-merge'

export type FormattedTimeProps = {
  datetime?: Date | string
  icon?: boolean
  showTimezone?: boolean
  small?: boolean
} & HTMLAttributes<HTMLSpanElement>

const FormattedTime = ({
  datetime,
  icon = false,
  small = false,
  showTimezone = false,
  className = '',
  ...rest
}: FormattedTimeProps) => {
  const format = useFormatter()

  let date = undefined
  if (typeof date === 'string' && datetime) {
    date = new Date(datetime)
  } else {
    date = datetime as Date
  }

  if (!date) {
    return null
  }

  return (
    <span {...rest} className={twMerge('flex h-full items-center gap-2 text-base', className)}>
      {icon && <TimeIcon />}
      <time suppressHydrationWarning dateTime={datetime?.toLocaleString()}>
        <div className="mt-1 flex content-center items-center justify-center text-center align-middle">
          {format.dateTime(date, { timeStyle: 'short' })}
          {showTimezone && ` (CEST)`}
        </div>
      </time>
    </span>
  )
}

export default FormattedTime
