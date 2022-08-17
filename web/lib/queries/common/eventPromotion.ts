export const eventPromotionFields = `
"type": "events",
"id": _id,
"slug": slug.current,
"title": content->title,
"location": content->location,
"eventDate": content->eventDate,
`

export const pastEventsQuery = `
*[_type match "route_" + $lang + "*" && content->_type == "event"  && content->eventDate.date < $date && !(_id in path("drafts.**")) ]| order(dateTime(content->eventDate.date+"T23:20:50.52Z") desc)[0...50]`
