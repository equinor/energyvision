import {
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
} from 'date-fns'
import type { EventDateType } from '@/sections/cards/EventCard/EventCard'

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
  let start: any
  let end: any
  if (!eventDate) {
    return { start, end }
  }
  const { date, startTime, endTime } = eventDate
  if (!date) return { start, end }
  if (startTime) {
    const startDateTime = cestToUtcConverter(date, startTime)
    start = startDateTime
  }
  if (endTime) {
    const endDateTime = cestToUtcConverter(date, endTime)
    end = endDateTime
  }
  return { start, end }
}

export const isDateAfter = (a: string, b: string) => {
  const dtA = new Date(a).getTime()
  const dtB = new Date(b).getTime()

  return dtA > dtB
}

export const cestToUtcConverter = (date: string, time: string = "00:00") => {
  // 1. Combine into a clean local ISO format (YYYY-MM-DDTHH:mm:ss)
  const localIsoString = `${date}T${time.padEnd(5, ":00")}`; 

  // 2. Create a standard Date object from the string
  const baseDate = new Date(localIsoString);

  // 3. Use toLocaleString to find the precise offset difference for Oslo
  const tzString = baseDate.toLocaleString("en-US", { timeZone: "Europe/Oslo" });
  const tzDate = new Date(tzString);

  // 4. Calculate the time difference in milliseconds and apply it
  const offset = baseDate.getTime() - tzDate.getTime();
  const utcDate = new Date(baseDate.getTime() + offset);
  
  return utcDate.toISOString();
}