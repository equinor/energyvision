// TODO: Refactor - This file is only concerned with events. Should not be a "global" file for search
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'

type Event = {
  slug: string
  content: {
    title: string
    ingress: string
  }
  _id: string
}

export const mapData = (event: Event) => ({
  ...event.content,
  slug: event.slug,
  objectID: event._id,
  type: 'event',
})

type FetchDataType = (
  query: string,
) => (queryparams: Readonly<Record<string, string>>) => (sanityClient: SanityClient) => TE.TaskEither<Error, Event[]>
export const fetchData: FetchDataType = (query) => (queryParams) => (sanityClient) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, queryParams), E.toError))
