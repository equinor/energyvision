import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'
import { Language } from '../../common'

export const query = /* groq */ `*[_type == "magazine" && _lang == $lang && !(_id in path("drafts.**")) && excludeFromSearch != true] {
  "slug": slug.current,
  _id,
  "title": title,
  "type": _type,
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

export type MagazineArticle = {
  slug: string
  title: string
  textBlocks: {
    _key: string
    title: string
    ingress: string
    text: string
  }[]
  accordions: {
    _key: string
    title: string
    ingress: string
    text: string
  }[]
  _id: string
}

type FetchDataType = (
  query: string,
) => (
  getQueryparams: (language: Language) => Readonly<Record<string, string>>,
) => (language: Language) => (sanityClient: SanityClient) => TE.TaskEither<Error, MagazineArticle[]>

const fetch: FetchDataType = (query) => (getQueryParams) => (language) => (sanityClient) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, getQueryParams(language)), E.toError))

export const fetchData = fetch(query)(getQueryParams)