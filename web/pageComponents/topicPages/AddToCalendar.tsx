import { useEffect, useState } from 'react'
import { Button } from '@components'
import { isAfter } from 'date-fns'
import { getEventDates, toUTCDateParts } from '../../common/helpers/dateUtilities'

import type { EventDateType } from '../../types/types'
import { useIntl } from 'react-intl'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ics = require('ics')

type AddToCalendarProps = {
  eventDate: EventDateType
  location?: string
  title: string
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

const createICS = (eventData: ICSProps): string | boolean => {
  return ics.createEvent(eventData, (error: Error, value: string) => {
    if (error) {
      console.error('An error occured while generating ICS file.', error)
      return false
    }

    const file = new Blob([value], { type: 'text/calendar' })
    return URL.createObjectURL(file)
  })
}

const AddToCalendar = ({ eventDate, title, location }: AddToCalendarProps) => {
  const intl = useIntl()
  const [fileData, setFileData] = useState<string | boolean>(false)

  useEffect(() => {
    const { start: startString, end: endString } = getEventDates(eventDate)

    if (!startString) return

    const start = new Date(startString)

    let end: Date
    if (!endString) {
      /* If time is not specified add to calendar as a full day */
      end = new Date(startString)
      start.setHours(0, 0, 0)
      end.setHours(23, 59, 59)
    } else {
      end = new Date(endString)
    }

    if (isUpcoming(end)) {
      const eventData = {
        start: padMonth(toUTCDateParts(start)), // ICS lib expects start & end to be an array
        startInputType: 'utc',
        end: padMonth(toUTCDateParts(end)), // ICS lib expects start & end to be an array
        endInputType: 'utc',
        title: title,
        location: location,
      }

      setFileData(createICS(eventData))
    }
  }, [eventDate, location, title])

  if (!fileData) return null
  const atc = intl.formatMessage({ id: 'add_to_calendar_event', defaultMessage: 'Add to Calendar' })
  return (
    <Button
      aria-label={`${atc} ${title}`}
      id="atc"
      {...(fileData && { href: fileData as string, download: `${title.replace(/ /g, '_')}.ics` })}
    >
      {/*  <Icon data={add} /> */}
      {atc}
    </Button>
  )
}

export default AddToCalendar
