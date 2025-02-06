import { getYear, getMonth, getDate, getHours, getMinutes, getSeconds } from 'date-fns'
import { EventDateType } from '../../../web/types/index'
import { zonedTimeToUtc } from 'date-fns-tz'

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
  if (!eventDate) {
    console.warn('Missing eventDate object for event')
    return { start: null, end: null }
  }
  const { date, startTime, endTime, timezone } = eventDate
  if (!date) return { start: null, end: null }

  if (startTime && endTime) {
    const start = zonedTimeToUtc(new Date(`${date}T${startTime}`), timezone).toISOString()
    const end = zonedTimeToUtc(new Date(`${date}T${endTime}`), timezone).toISOString()
    return { start, end }
  } else {
    const [YYYY, MM, DD] = date.split('-').map(Number)
    const start = new Date()
    start.setFullYear(YYYY, MM - 1, DD)
    start.setHours(12, 0, 0, 0)

    return { start: start.toISOString(), end: null }
  }
}
