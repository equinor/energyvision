import { ResourceLink } from '@core/Link'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { createIcsFile, isUpcomingDate } from '../../common/helpers/ics'

type AddToCalendarProps = {
  //Expect local datetime iso string as getEventDates returns local iso string from Intl.DateTimeFormat().resolvedOptions().timeZone
  startDateTime?: string
  endDateTime?: string
  location?: string
  title: string
}

const AddToCalendar = ({ startDateTime, endDateTime, title, location }: AddToCalendarProps) => {
  const intl = useIntl()
  const [fileData, setFileData] = useState<string | boolean>(false)

  useEffect(() => {
    if (!startDateTime) {
      setFileData(false)
      return
    }

    const start = new Date(startDateTime)
    if (Number.isNaN(start.getTime())) {
      setFileData(false)
      return
    }

    let end: Date
    if (!endDateTime) {
      /* If time is not specified add to calendar as a full day */
      end = new Date(startDateTime)
      start.setHours(0, 0, 0)
      end.setHours(23, 59, 59)
    } else {
      end = new Date(endDateTime)
    }

    if (Number.isNaN(end.getTime())) {
      setFileData(false)
      return
    }

    if (isUpcomingDate(end)) {
      setFileData(createIcsFile({ start, end, title, location }))
      return
    }

    setFileData(false)
  }, [startDateTime, endDateTime, location, title])

  if (!fileData) return null

  const atc = intl.formatMessage({
    id: 'add_to_calendar_event',
    defaultMessage: 'Add to Calendar',
  })

  const atcAriaLabel = intl.formatMessage(
    {
      id: 'add_to_calendar_aria_label',
      defaultMessage: `Add {eventTitle} to calendar`,
    },
    { eventTitle: title },
  )
  return fileData ? (
    <ResourceLink
      href={fileData as string}
      download={`${title.replace(/ /g, '_')}.ics`}
      type="icsLink"
      aria-label={atcAriaLabel}
      variant="fit"
      ariaHideText
    >
      {atc}
    </ResourceLink>
  ) : null
}

export default AddToCalendar
