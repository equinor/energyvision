// TODO: Refactor - This file is only concerned with events. Should not be a "global" file for search
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'
import { Language } from '../../common'

const query = /* groq */ `*[_type match "route_" + $lang + "*" && content->_type == "event" && !(_id in path("drafts.**")) && excludeFromSearch != true] {
  "slug": slug.current,
  _id,
  "content": content->{
    "title": pt::text(title),
    "ingress": pt::text(ingress),
    "eventDate": eventDate.date,
    "eventDescription": pt::text(content),
  },
  "docToClear": ($id match content._ref || _id match $id)
}
`

const getQueryParams = (language: Language, id: string) => ({
  lang: language.internalCode,
  id: id,
})

export type Event = {
  slug: string
  content: {
    title: string
    ingress: string
    eventDescription: string
    eventDate: string
  }
  _id: string
  docToClear?: boolean
}

type FetchDataType = (
  query: string,
) => (
  getQueryparams: (language: Language, id: string) => Readonly<Record<string, string>>,
) => (language: Language, id: string) => (sanityClient: SanityClient) => TE.TaskEither<Error, Event[]>

const fetch: FetchDataType = (query) => (getQueryParams) => (language, id) => (sanityClient) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, getQueryParams(language, id)), E.toError))

export const fetchData = fetch(query)(getQueryParams)
