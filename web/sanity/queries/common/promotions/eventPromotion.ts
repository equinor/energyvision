export const eventPromotionFields = /* groq */ `
    "type": "events",
    "id": _id,
    "slug": slug.current,
    "title": content->title,
    "location": content->location,
    "eventDate": content->eventDate,
    "startDayAndTime": content->startDayAndTime,
    "endDayAndTime": content->endDayAndTime,
    "ingress": content->ingress,
    `

const tagFilter = /* groq */ `
  && count(content->eventTags[_ref in ^.^.tags[]._ref]) > 0
`

/* Unable to pass end time along with the date to sort. So using hard coded timestamp*/
export const pastEventsQuery = (withTags = true): string => /* groq */ `
    *[_type match "route_" + $lang + "*"
    && content->_type == "event"
    && (content->eventDate.date) + 'T00:00:00Z' < now()
    ${withTags ? tagFilter : ''} ]
    | order(coalesce(content->startDayAndTime.dayTime, (content->eventDate.date) + 'T00:00:00Z') desc)[0...50]
`

export const futureEventsQuery = (withTags = true): string => /* groq */ `
  *[_type match "route_" + $lang + "*"
    && content->_type == "event"
    && coalesce(content->startDayAndTime.dayTime, (content->eventDate.date) + 'T00:00:00Z') >= now()
    ${withTags ? tagFilter : ''}
  ] | order( coalesce(content->startDayAndTime.dayTime, ((content->eventDate.date) + 'T00:00:00Z')) asc)
`
