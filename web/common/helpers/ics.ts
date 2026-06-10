import { createEvent, type DateArray, type EventAttributes } from 'ics'

type IcsEventTextFields = Pick<EventAttributes, 'title' | 'location'>

export type CreateIcsFileInput = {
  start: Date
  end: Date
} & IcsEventTextFields

const toIcsLocalDateParts = (date: Date): DateArray => {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()]
}

export const buildIcsEventData = ({ start, end, title, location }: CreateIcsFileInput): EventAttributes => {
  return {
    start: toIcsLocalDateParts(start),
    startInputType: 'local',
    end: toIcsLocalDateParts(end),
    endInputType: 'local',
    title,
    location: location || '',
  }
}

export const createIcsFile = (input: CreateIcsFileInput): string | boolean => {
  const eventData = buildIcsEventData(input)
  const { error, value } = createEvent(eventData)

  if (error || !value) {
    console.error('An error occurred while generating ICS file.', error)
    return false
  }

  const file = new Blob([value], { type: 'text/calendar' })
  return URL.createObjectURL(file)
}

export const isUpcomingDate = (eventDate: Date): boolean => {
  return eventDate.getTime() > Date.now()
}
