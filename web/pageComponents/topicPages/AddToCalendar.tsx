import { useEffect, useState } from 'react'
import { Button } from '@components'
import { blocksToText } from '../../common/helpers'
import { Icon } from '@equinor/eds-core-react'
import { add } from '@equinor/eds-icons'
import { getYear, getMonth, getDate, getHours, getMinutes } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import type { EventSchema } from '../../types/types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ics = require('ics')

type AddToCalendarProps = {
  event: EventSchema
}

const dateToParts = (datetime: Date): number[] => {
  return [getYear(datetime), getMonth(datetime), getDate(datetime), getHours(datetime), getMinutes(datetime)]
}

const AddToCalendar = ({ event }: AddToCalendarProps) => {
  const [fileData, setFileData] = useState('')

  useEffect(() => {
    // TODO: use date, time, and timezone from event once implemented
    // Date used here is just placeholder
    const date = new Date()
    const start = zonedTimeToUtc(date, 'Europe/Oslo')
    const end = zonedTimeToUtc(date.setHours(date.getHours() + 1), 'Europe/Oslo')

    const eventData = {
      start: dateToParts(start),
      startInputType: 'utc',
      end: dateToParts(end),
      endInputType: 'utc',
      title: blocksToText(event.title),
      location: event.content.location,
    }

    ics.createEvent(eventData, (error: any, value: string) => {
      if (error) {
        console.error('An error occured while generating ICS file.', error)
        return
      }

      const file = new Blob([value], { type: 'text/calendar' })
      setFileData(URL.createObjectURL(file))
    })
  }, [event])

  if (!fileData) return null

  return (
    <>
      <Button {...{ href: fileData, download: 'event.ics' }}>
        <Icon data={add} />
        Add to Calendar
      </Button>
    </>
  )
}

export default AddToCalendar
