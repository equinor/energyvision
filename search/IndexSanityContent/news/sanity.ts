import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'
import { Language } from '../../common'
import { SharedNewsFields } from '../common/news/SharedNewsFields'

const publishDateTimeQuery = /* groq */ `
  select(
    customPublicationDate == true =>
      publishDateTime,
      coalesce(firstPublishedAt, _createdAt)
  )
`

export const query = /* groq */ `*[_type == "news" && lang == $lang && !(_id in path("drafts.**")) && excludeFromSearch != true] {
  "slug": slug.current,
  _id,
  "title": title,
  "ingress": pt::text(ingress),
  "type": _type,
  "publishDateTime": ${publishDateTimeQuery},
  "topicTags": tags[]->.title[$lang],
  "countryTags": countryTags[]->.title[$lang],
  "blocks": content[_type == "block"] {
    "blockKey": _key,
    "children": children[text match "*"] {
      "childKey": _key,
      "text": text
    }
  },
  "factboxes": content[_type == "factbox"] {
    "blockKey": _key,
    title,
    "text": pt::text(content)
  },
  "docToClear": _id match $id
}
`

const getQueryParams = (language: Language, id: string) => ({
  lang: language.internalCode,
  id: id,
})

export type NewsArticle = SharedNewsFields & {
  topicTags?: string[]
  countryTags?: string[]
}

type FetchDataType = (
  query: string,
) => (
  getQueryparams: (language: Language, id: string) => Readonly<Record<string, string>>,
) => (language: Language, id: string) => (sanityClient: SanityClient) => TE.TaskEither<Error, NewsArticle[]>

const fetch: FetchDataType = (query) => (getQueryParams) => (language, id) => (sanityClient) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, getQueryParams(language, id)), E.toError))

export const fetchData = fetch(query)(getQueryParams)
