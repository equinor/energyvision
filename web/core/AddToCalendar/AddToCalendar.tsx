'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { createIcsFile, isUpcomingDate } from '@/lib/ics/ics'
import ResourceLink from '../Link/ResourceLink'

type DateTimeInput = Date | string

type AddToCalendarProps = {
  // Accept local Date instance or local datetime iso string
  startDateTime?: DateTimeInput
  endDateTime?: DateTimeInput
  location?: string
  title: string
}

const toDate = (input?: DateTimeInput): Date | null => {
  if (!input) return null

  const date = input instanceof Date ? new Date(input) : new Date(input)
  return Number.isNaN(date.getTime()) ? null : date
}

const AddToCalendar = ({
  startDateTime,
  endDateTime,
  title,
  location,
}: AddToCalendarProps) => {
  const intl = useTranslations()
  const [fileData, setFileData] = useState<string | boolean>(false)

  useEffect(() => {
    if (!startDateTime) {
      setFileData(false)
      return
    }

    const start = toDate(startDateTime)
    if (!start) {
      setFileData(false)
      return
    }

    let end: Date
    if (!endDateTime) {
      /* If time is not specified add to calendar as a full day */
      end = new Date(start)
      start.setHours(0, 0, 0)
      end.setHours(23, 59, 59)
    } else {
      const parsedEnd = toDate(endDateTime)
      if (!parsedEnd) {
        setFileData(false)
        return
      }
      end = parsedEnd
    }

    if (isUpcomingDate(end)) {
      setFileData(createIcsFile({ start, end, title, location }))
      return
    }

    setFileData(false)
  }, [startDateTime, endDateTime, location, title])

  if (!fileData) return null
  const atc = intl('add_to_calendar_event')
  const atcAriaLabel = intl('add_to_calendar_aria_label', { eventTitle: title })

  return fileData ? (
    <ResourceLink
      href={fileData as string}
      type='icsLink'
      aria-label={atcAriaLabel}
      variant='fit'
      ariaHideText
    >
      {atc}
    </ResourceLink>
  ) : null
}

export default AddToCalendar
