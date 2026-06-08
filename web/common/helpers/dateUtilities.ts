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
  let start: string | null = null
  let end: string | null = null
  if (!eventDate) {
    return { start, end }
  }
  const { date, startTime, endTime } = eventDate || {}
  if (!date) return { start, end }

  if (startTime) {
    const startCET = new TZDate(new Date(`${date}T${startTime}`), 'Europe/Oslo')
    const startDateTime = startCET.withTimeZone('UTC')
    start = startDateTime.toISOString()

    if (endTime) {
      const endCET = new TZDate(new Date(`${date}T${endTime}`), 'Europe/Oslo')
      const endDateTime = endCET.withTimeZone('UTC')
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
