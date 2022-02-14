// TODO: Refactor - This file is only concerned with events. Should not be a "global" file for search
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'
import { Language } from '../../common'

const query = /* groq */ `*[_type match "route_" + $lang + "*" && content->_type == "event"] {
  "slug": slug.current,
  _id,
  "content": content->{
    "title": pt::text(title),
    "ingress": pt::text(ingress),
    "eventDate": eventDate.date, 
  }
}
`

const getQueryParams = (language: Language) => ({
  lang: language.internalCode,
})

export type Event = {
  slug: string
  content: {
    title: string
    ingress: string
    eventDate: string
  }
  _id: string
}

type FetchDataType = (
  query: string,
) => (
  getQueryparams: (language: Language) => Readonly<Record<string, string>>,
) => (sanityClient: SanityClient) => (language: Language) => TE.TaskEither<Error, Event[]>

const fetch: FetchDataType = (query) => (getQueryParams) => (sanityClient) => (language) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, getQueryParams(language)), E.toError))

export const fetchData = fetch(query)(getQueryParams)
