import { getYear, getMonth, getDate, getHours, getMinutes, getSeconds } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import { EventDateType } from '../../../web/types/types'

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

export const getEventDates = ({ date, startTime, endTime, timezone }: EventDateType) => {
  if (!date) return { start: null, end: null }
  if (startTime && endTime) {
    const start = zonedTimeToUtc(new Date(date + ' ' + startTime), timezone).toString()
    const end = zonedTimeToUtc(new Date(date + ' ' + endTime), timezone).toString()
    return { start: start, end: end }
  } else {
    const [YYYY, MM, DD] = date.split('-').map(Number)
    const start = new Date()
    start.setDate(DD)
    start.setMonth(MM - 1)
    start.setFullYear(YYYY)
    start.setHours(12, 0, 0, 0)
    return { start: start.toString(), end: null }
  }
}
