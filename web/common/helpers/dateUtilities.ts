import { getYear, getMonth, getDate, getHours, getMinutes, getSeconds } from 'date-fns'
import { EventDateType } from '../../../web/types/index'

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
  let start = undefined
  let end = undefined
  if (!eventDate) {
    console.warn('Missing eventDate object for event')
    return { start, end }
  }
  const { date, startTime, endTime } = eventDate
  if (!date) return { start, end }

  if (startTime) {
    const [startHH, startMM] = startTime.split(':')
    const startDateTime = new Date(date)
    startDateTime.setHours(parseInt(startHH, 10))
    startDateTime.setMinutes(parseInt(startMM, 10))
    start = startDateTime
  }
  if (endTime) {
    const [endHH, endMM] = endTime.split(':')
    const endDateTime = new Date(date)
    endDateTime.setHours(parseInt(endHH, 10))
    endDateTime.setMinutes(parseInt(endMM, 10))
    end = endDateTime
  }
  return { start, end }
}

export const isDateAfter = (a: string, b: string) => {
  const dtA = new Date(a).getTime()
  const dtB = new Date(b).getTime()

  return dtA > dtB
}
