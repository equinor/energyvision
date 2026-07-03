import { TZDate } from '@date-fns/tz/date'
import type { EventDate } from '@/templates/event/Event'

const parseDateParts = (date: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null
  }

  const reference = new Date(Date.UTC(year, month - 1, day))
  if (
    reference.getUTCFullYear() !== year ||
    reference.getUTCMonth() !== month - 1 ||
    reference.getUTCDate() !== day
  ) {
    return null
  }

  return { year, month, day }
}

const parseTimeParts = (time: string) => {
  const match = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(time)
  if (!match) return null

  const hour = Number(match[1])
  const minute = Number(match[2])
  const second = Number(match[3] ?? 0)

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    !Number.isInteger(second)
  ) {
    return null
  }

  if (
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59
  ) {
    return null
  }

  return { hour, minute, second }
}

export const getEventDates = (eventDate: EventDate | undefined) => {
  let start: string | undefined
  let end: string | undefined

  if (!eventDate) {
    return { start, end }
  }
  const { date, startTime, endTime } = eventDate
  if (!date) return { start, end }

  const parsedDate = parseDateParts(date)
  if (!parsedDate) return { start, end }

  if (startTime) {
    const parsedStartTime = parseTimeParts(startTime)
    if (!parsedStartTime) return { start, end }

    const { year, month, day } = parsedDate
    const {
      hour: startHour,
      minute: startMinute,
      second: startSecond,
    } = parsedStartTime

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
      const parsedEndTime = parseTimeParts(endTime)
      if (!parsedEndTime) return { start, end }

      const {
        hour: endHour,
        minute: endMinute,
        second: endSecond,
      } = parsedEndTime

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
