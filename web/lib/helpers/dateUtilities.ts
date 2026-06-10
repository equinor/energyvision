import { TZDate } from '@date-fns/tz/date'
import {
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
} from 'date-fns'

import type { EventDate } from '@/templates/event/Event'

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

export const getEventDates = (eventDate: EventDate | undefined) => {
  let start: string | undefined
  let end: string | undefined

  if (!eventDate) {
    return { start, end }
  }
  const { date, startTime, endTime } = eventDate
  if (!date) return { start, end }
  if (startTime) {
    const [year, month, day] = date.split('-').map(Number)
    const [startHour, startMinute, startSecond = 0] = startTime
      .split(':')
      .map(Number)
    const startCET = new TZDate(
      year,
      month - 1,
      day,
      startHour,
      startMinute,
      startSecond,
      0,
      'Europe/Oslo',
    )

    // Get browser's timezone string automatically
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log('browserTimeZone', browserTimeZone)
    const startDateTime = startCET.withTimeZone(browserTimeZone ?? 'UTC')
    start = startDateTime.toISOString()

    if (endTime) {
      const [endHour, endMinute, endSecond = 0] = endTime.split(':').map(Number)
      const endCET = new TZDate(
        year,
        month - 1,
        day,
        endHour,
        endMinute,
        endSecond,
        0,
        'Europe/Oslo',
      )
      const endDateTime = endCET.withTimeZone(browserTimeZone ?? 'UTC')
      end = endDateTime.toISOString()
    }
  }
  return { start, end }
}

export const isDateAfter = (a: string, b: string) => {
  const dtA = new Date(a).getTime()
  const dtB = new Date(b).getTime()

  return dtA > dtB
}

export const cestToUtcConverter = (date: string, time = '00:00') => {
  // 1. Combine into a clean local ISO format (YYYY-MM-DDTHH:mm:ss)
  const localIsoString = `${date}T${time.padEnd(5, ':00')}`

  // 2. Create a standard Date object from the string
  const baseDate = new Date(localIsoString)

  // 3. Use toLocaleString to find the precise offset difference for Oslo
  const tzString = baseDate.toLocaleString('en-US', { timeZone: 'Europe/Oslo' })
  const tzDate = new Date(tzString)

  // 4. Calculate the time difference in milliseconds and apply it
  const offset = baseDate.getTime() - tzDate.getTime()
  const utcDate = new Date(baseDate.getTime() + offset)

  return utcDate.toISOString()
}
