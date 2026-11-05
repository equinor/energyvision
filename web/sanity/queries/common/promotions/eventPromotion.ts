import { notDraft } from '../langAndDrafts';

export const eventPromotionFields = /* groq */ `
    "type": "events",
    "id": _id,
    "slug": slug.current,
    "title": content->title,
    "location": content->location,
    "eventDate": content->eventDate,
    "ingress": content->ingress,
    `;

const tagFilter = /* groq */ `
  && count(content->eventTags[_ref in ^.^.tags[]._ref]) > 0
`;

export const pastEventsQuery = (withTags = true): string => /* groq */ `
  *[string::startsWith(_type, "route_") && _type != "route_homepage" && lang == $lang
    && ${notDraft}
    && content->_type == "event"
    && content->eventDate.date < string::split(now(),"T")[0]
    ${withTags ? tagFilter : ''} ]
    | order(content->eventDate.date desc, coalesce(content->eventDate.startTime, "00:00") desc)[0...50]
`;

export const futureEventsQuery = (withTags = true): string => /* groq */ `
  *[string::startsWith(_type, "route_") && _type != "route_homepage" && lang == $lang
    && ${notDraft}
    && content->_type == "event"
    && content->eventDate.date >= string::split(now(),"T")[0]
    ${withTags ? tagFilter : ''}
  ] | order(content->eventDate.date asc, coalesce(content->eventDate.startTime, "00:00") asc)
`;
