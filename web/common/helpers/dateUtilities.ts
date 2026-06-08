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

/* export const cestToUtcConverter = (date: string, time: string = '00:00') => {
  // 1. Combine into a clean local ISO format (YYYY-MM-DDTHH:mm:ss)
  const localIsoString = `${date}T${time.padEnd(5, ':00')}`

  // 2. Create a standard Date object from the string
  const baseDate = new Date(localIsoString)

  // 3. Use toLocaleString to find the precise offset difference for Oslo
  const tzString = baseDate.toLocaleString('en-GB', {
    timeZone: 'Europe/Oslo',
  })
  const tzDate = new Date(tzString)

  // 4. Calculate the time difference in milliseconds and apply it
  const offset = baseDate.getTime() - tzDate.getTime()
  const utcDate = new Date(baseDate.getTime() + offset)
  console.log('utcDate', utcDate)

  return utcDate?.toISOString()
} */

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
