import { TZDate } from '@date-fns/tz'
import { getDate, getHours, getMinutes, getMonth, getSeconds, getYear } from 'date-fns'
import type { EventDateType } from '../../../web/types/index'

export const toDateParts = (datetime: Date): number[] => {
  return [
    getYear(datetime),
    getMonth(datetime),
    getDate(datetime),
    getHours(datetime),
    getMinutes(datetime),
    getSeconds(datetime),
  ]
}

export const toUTCDateParts = (datetime: Date): number[] => {
  return [
    datetime.getUTCFullYear(),
    datetime.getUTCMonth(),
    datetime.getUTCDate(),
    datetime.getUTCHours(),
    datetime.getUTCMinutes(),
    datetime.getUTCSeconds(),
  ]
}

export const getEventDates = (eventDate: EventDateType | undefined) => {
  let start: string | undefined
  let end: string | undefined
  if (!eventDate) {
    return { start, end }
  }
  const { date, startTime, endTime } = eventDate || {}
  if (!date) return { start, end }

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  if (startTime) {
    const [year, month, day] = date.split('-').map(Number)
    const [startHour, startMinute, startSecond = 0] = startTime.split(':').map(Number)
    const startCET = new TZDate(year, month - 1, day, startHour, startMinute, startSecond, 0, 'Europe/Oslo')
    const startDateTime = startCET.withTimeZone(userTimeZone ?? 'UTC')
    start = startDateTime.toISOString()

    if (endTime) {
      const [endHour, endMinute, endSecond = 0] = endTime.split(':').map(Number)
      const endCET = new TZDate(year, month - 1, day, endHour, endMinute, endSecond, 0, 'Europe/Oslo')
      const endDateTime = endCET.withTimeZone(userTimeZone ?? 'UTC')
      end = endDateTime.toISOString()
    }
    return { start, end }
  } else {
    const [YYYY, MM, DD] = date.split('-').map(Number)
    const start = new Date()
    start.setFullYear(YYYY, MM - 1, DD)
    start.setHours(12, 0, 0, 0)

    return { start: start.toISOString(), end }
  }
}
