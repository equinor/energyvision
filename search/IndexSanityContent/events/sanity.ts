// TODO: Refactor - This file is only concerned with events. Should not be a "global" file for search
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'

export const query = /* groq */ `*[_type match "route_" + $lang + "*" && content->_type == "event"] {
  "slug": slug.current,
  _id,
  "content": content->{
    "title": pt::text(title),
    "ingress": pt::text(ingress)
  }
}
`

export const queryParams = { lang: 'en_GB' }

export type Event = {
  slug: string
  content: {
    title: string
    ingress: string
  }
  _id: string
}

type FetchDataType = (
  query: string,
) => (queryparams: Readonly<Record<string, string>>) => (sanityClient: SanityClient) => TE.TaskEither<Error, Event[]>
export const fetchData: FetchDataType = (query) => (queryParams) => (sanityClient) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, queryParams), E.toError))
