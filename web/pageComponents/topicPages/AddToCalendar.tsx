import { useEffect, useState } from 'react'
import { Button } from '@components'
import { blocksToText } from '../../common/helpers'
import { Icon } from '@equinor/eds-core-react'
import { add } from '@equinor/eds-icons'
import { isAfter } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import { toUTCDateParts } from '../../common/helpers/dateUtilities'
import type { EventSchema } from '../../types/types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ics = require('ics')

type AddToCalendarProps = {
  event: EventSchema
}

type ICSProps = {
  start: number[]
  startInputType: string
  end: number[]
  endInputType: string
  title: string
  location?: string
}

// Because in 2021 we still have a zero-index month
// which means Jan = 0, Dec = 11, etc
const padMonth = (dateParts: number[]): number[] => {
  dateParts[1] = dateParts[1] + 1
  return dateParts
}

const isUpcoming = (eventDate: Date): boolean => {
  if (isAfter(eventDate, new Date())) {
    return true
  }
  return false
}

const splitToIntArray = (input: string, delimiter: string): number[] => input.split(delimiter).map(Number)

// Might be overengineering this, but better to be on the safe side when dealing with dates?
const convertDateTime = (date: string, time: string | undefined = undefined) => {
  const dateParts = splitToIntArray(date, '-')
  const output = new Date(dateParts[0], dateParts[1], dateParts[2])

  if (time) {
    const timeParts = splitToIntArray(time, ':')
    output.setHours(timeParts[0])
    output.setMinutes(timeParts[1])
  }

  return output
}

const createICS = (eventData: ICSProps): string | boolean => {
  return ics.createEvent(eventData, (error: any, value: string) => {
    if (error) {
      console.error('An error occured while generating ICS file.', error)
      return false
    }

    const file = new Blob([value], { type: 'text/calendar' })
    return URL.createObjectURL(file)
  })
}

const AddToCalendar = ({ event }: AddToCalendarProps) => {
  const [fileData, setFileData] = useState<string | boolean>(false)
  const eventTitle = blocksToText(event.title)

  useEffect(() => {
    const { eventDate, location } = event.content
    const { date, timezone, startTime, endTime } = eventDate

    const start = zonedTimeToUtc(convertDateTime(date, startTime), timezone)
    const end = zonedTimeToUtc(convertDateTime(date, endTime), timezone)

    if (isUpcoming(end)) {
      const eventData = {
        start: padMonth(toUTCDateParts(start)), // ICS lib expects start & end to be an array
        startInputType: 'utc',
        end: padMonth(toUTCDateParts(end)), // ICS lib expects start & end to be an array
        endInputType: 'utc',
        title: eventTitle,
        location: location,
      }

      setFileData(createICS(eventData))
    }
  }, [event, eventTitle])

  if (!fileData) return null

  return (
    <Button {...(fileData && { href: fileData as string, download: `${eventTitle.replace(/ /g, '_')}.ics` })}>
      <Icon data={add} />
      Add to Calendar
    </Button>
  )
}

export default AddToCalendar
