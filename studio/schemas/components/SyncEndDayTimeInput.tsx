import { useEffect, useRef } from 'react'
import { type StringInputProps, set, unset, useFormValue } from 'sanity'

type DateTimeValue = string | undefined

export const SyncEndDayTimeInput = (props: StringInputProps) => {
  const { onChange } = props
  const startDayTime = useFormValue([
    'startDayAndTime',
    'dayTime',
  ]) as DateTimeValue
  const previousStartDayTime = useRef<DateTimeValue>(startDayTime)

  useEffect(() => {
    if (startDayTime === previousStartDayTime.current) return

    previousStartDayTime.current = startDayTime
    onChange(startDayTime ? set(startDayTime) : unset())
  }, [startDayTime, onChange])

  return props.renderDefault(props)
}
