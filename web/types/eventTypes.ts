import { PeopleCardData, RelatedLinksData, PortableTextBlock, SeoData, ContactListData, IFrameData } from './index'

export type EventDateType = {
  date: string
  startTime?: string
  endTime?: string
  timezone: string
}

export type EventPromotionSettings = {
  manuallySelectEvents: boolean
  promotePastEvents: boolean
  promoteSingleUpcomingEvent: boolean
  pastEventsCount?: number
}
