import { getYear, getMonth, getDate, getHours, getMinutes, getSeconds } from 'date-fns'
import { EventDateType } from '../../../web/types/index'
import { zonedTimeToUtc } from 'date-fns-tz'

export const toDateParts = (datetime: Date): number[] => {
  return [
    getYear(datetime),
    getMonth(datetime) + 1,
    getDate(datetime),
    getHours(datetime),
    getMinutes(datetime),
    getSeconds(datetime),
  ]
}

export const toUTCDateParts = (datetime: Date): number[] => {
  return [
    datetime.getUTCFullYear(),
    datetime.getUTCMonth() + 1,
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
  console.log('eventDate,eventDate', eventDate)
  const { date, startTime, endTime, timezone } = eventDate
  console.log('date', date)

  if (!date) return { start: null, end: null }

  const universalDate = date.replace(/-/g, '/')
  console.log('universalDate', universalDate)

  if (startTime && endTime) {
    const start = zonedTimeToUtc(new Date(universalDate + ' ' + startTime), timezone).toString()
    const end = zonedTimeToUtc(new Date(universalDate + ' ' + endTime), timezone).toString()

    return { start: start, end: end }
  } else {
    const [YYYY, MM, DD] = date.split('-').map(Number)
    console.log('YYYY', YYYY)
    console.log('MM', MM)
    console.log('DD', DD)
    const start = new Date()
    start.setDate(DD)
    start.setMonth(MM - 1)
    start.setFullYear(YYYY)
    start.setHours(12, 0, 0, 0)
    console.log('start.toString()', start.toString())
    return { start: start.toString(), end: null }
  }
}
