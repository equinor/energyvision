// eslint-disable-next-line @typescript-eslint/no-var-requires
const ics = require('ics')

type ICSProps = {
  start: number[]
  startInputType: 'local'
  end: number[]
  endInputType: 'local'
  title: string
  location?: string
}

export type CreateIcsFileInput = {
  start: Date
  end: Date
  title: string
  location?: string
}

const toIcsLocalDateParts = (date: Date): number[] => {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ]
}

export const buildIcsEventData = ({ start, end, title, location }: CreateIcsFileInput): ICSProps => {
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

  return ics.createEvent(eventData, (error: Error, value: string) => {
    if (error) {
      console.error('An error occurred while generating ICS file.', error)
      return false
    }

    const file = new Blob([value], { type: 'text/calendar' })
    return URL.createObjectURL(file)
  })
}

export const isUpcomingDate = (eventDate: Date): boolean => {
  return eventDate.getTime() > Date.now()
}
