import { useEffect, useState } from 'react'
import { Badge, Flex, Box } from '@sanity/ui'
import type { PreviewProps, Reference } from 'sanity'
import { EdsIcon } from '../../../icons'
import { calendar_event } from '@equinor/eds-icons'

type EventPromotionPreviewProps = {
  tags?: string[]
  manuallySelectEvents?: boolean
  promotedEvents?: Reference[]
  promotePastEvents?: boolean
  promoteSingleUpcomingEvent?: boolean
  pastEventsCount?: number
  useTags?: boolean
} & PreviewProps

export const EventPromotionPreview = (props: EventPromotionPreviewProps) => {
  const {
    manuallySelectEvents,
    promotedEvents,
    promotePastEvents,
    pastEventsCount,
    promoteSingleUpcomingEvent,
    useTags,
    tags,
    renderDefault,
  } = props
  const [title, setTitle] = useState('Event promotion')

  useEffect(() => {
    if (manuallySelectEvents && promotedEvents) {
      return setTitle(`Showing ${promotedEvents.length} selected events`)
    }

    const time = promotePastEvents ? 'past' : `${promoteSingleUpcomingEvent ? 'single' : ''} upcoming`
    const number = promotePastEvents ? pastEventsCount || '50 (max)' : ''
    const withTags = useTags && tags ? `from ${tags.length} tag(s)` : ''

    return setTitle(`Showing ${number} ${time} ${promoteSingleUpcomingEvent ? 'event' : 'events'} ${withTags}`)
  }, [manuallySelectEvents, promotedEvents, useTags, tags, pastEventsCount, promoteSingleUpcomingEvent])

  return (
    <Flex align="center">
      <Box flex={1}>
        {renderDefault({ ...props, title: title, subtitle: 'Event promotion', media: EdsIcon(calendar_event) })}
      </Box>

      {manuallySelectEvents ? (
        <Badge tone="caution" marginLeft={1}>
          Manual
        </Badge>
      ) : (
        <>
          <Badge tone="primary" marginLeft={1}>
            Automatic
          </Badge>
          {promotePastEvents && (
            <Badge tone="primary" marginLeft={1}>
              Past events
            </Badge>
          )}
        </>
      )}
    </Flex>
  )
}
