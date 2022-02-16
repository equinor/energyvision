// TODO: Refactor - This file is only concerned with events. Should not be a "global" file for search
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'
import { Language } from '../../common'

export const query = /* groq */ `*[_type match "route_" + $lang + "*" && content->_type == "page"] {
  "slug": slug.current,
  _id,
  "title": pt::text(content->title),
  "type": content->_type,
  "textBlocks": content->content[_type == "textBlock"]{
    "_key": _key,
    "title": pt::text(title),
    "ingress": pt::text(ingress),
    "text": pt::text(text)  // TODO: Do this manually to cover all cases
  },
  "accordions": content->content[_type == "accordion"] {
    "_key": _key,
    "title": pt::text(title),
    "ingress": pt::text(ingress)
  }
}
`

const getQueryParams = (language: Language) => ({
  lang: language.internalCode,
})

export type TopicPage = {
  slug: string
  title: string
  textBlocks: {
    _key: string
    title: string
    ingress: string
    text: string
  }[],
  accordions : {
    _key: string
    title: string
    ingress: string
    text: string
  }[],
  _id: string
}

type FetchDataType = (
  query: string,
) => (
  getQueryparams: (language: Language) => Readonly<Record<string, string>>,
) => (sanityClient: SanityClient) => (language: Language) => TE.TaskEither<Error, TopicPage[]>

const fetch: FetchDataType = (query) => (getQueryParams) => (sanityClient) => (language) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, getQueryParams(language)), E.toError))

export const fetchData = fetch(query)(getQueryParams)
