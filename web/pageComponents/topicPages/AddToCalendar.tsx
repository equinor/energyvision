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

const isUpcomming = (eventDate: Date): boolean => {
  if (isAfter(eventDate, new Date())) {
    return true
  }
  return false
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

  useEffect(() => {
    const date = new Date() // placeholder
    const tz = 'Europe/Oslo' // TODO: use timezone passed by event
    const start = zonedTimeToUtc(date, tz) // TODO: use start date passed by event
    const end = zonedTimeToUtc(date.setHours(date.getHours() + 1), tz) // TODO: use end date passed by event

    if (isUpcomming(end)) {
      const eventData = {
        start: padMonth(toUTCDateParts(start)),
        startInputType: 'utc',
        end: padMonth(toUTCDateParts(end)),
        endInputType: 'utc',
        title: blocksToText(event.title),
        location: event.content.location,
      }

      setFileData(createICS(eventData))
    }
  }, [event])

  if (!fileData) return null

  return (
    <Button {...(fileData && { href: fileData as string, download: 'event.ics' })}>
      <Icon data={add} />
      Add to Calendar
    </Button>
  )
}

export default AddToCalendar
