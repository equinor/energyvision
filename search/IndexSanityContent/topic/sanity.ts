// TODO: Refactor - This file is only concerned with events. Should not be a "global" file for search
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'

export const query = /* groq */ `*[_type match "route_" + $lang + "*" && content->_type == "page"] {
  "slug": slug.current,
  _id,
  "title": pt::text(content->title),
  "type": content->_type,
  "textBlocks": content->content[_type == "textBlock"]{
    "title": pt::text(title),
    "ingress": pt::text(ingress),
    "text": pt::text(text)
  }
}
`

export const queryParams = { lang: 'en_GB' }

export type TopicPage = {
  slug: string
  textBlocks: {
    title: string
    ingress: string,
    text: string
  }[]
  _id: string
}

type FetchDataType = (
  query: string,
) => (
  queryparams: Readonly<Record<string, string>>,
) => (sanityClient: SanityClient) => TE.TaskEither<Error, TopicPage[]>
export const fetchData: FetchDataType = (query) => (queryParams) => (sanityClient) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, queryParams), E.toError))
