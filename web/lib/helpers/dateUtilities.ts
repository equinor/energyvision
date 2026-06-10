import { TZDate } from '@date-fns/tz/date'
import type { EventDate } from '@/templates/event/Event'

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
