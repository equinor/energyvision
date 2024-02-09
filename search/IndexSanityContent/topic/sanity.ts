import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'
import { Language } from '../../common'
import { MappableAccordionType, MappableTextBlockType } from '../common/mappers'
import { plainTextExcludingStrikeThrough } from '../../common/queryHelpers'

export const query = /* groq */ `*[_type match "route_" + $lang + "*" && content->_type == "page" && !(_id in path("drafts.**")) && excludeFromSearch != true] {
  "slug": slug.current,
  _id,
  "title": ${plainTextExcludingStrikeThrough('content->title')},
  "type": content->_type,
  "textBlocks": content->content[_type == "textBlock"]{
    "_key": _key,
    "title": select(
      isBigText == true =>
        ${plainTextExcludingStrikeThrough('bigTitle')},
        ${plainTextExcludingStrikeThrough('title')}
      ),
    "ingress": pt::text(ingress),
    "text": pt::text(text)  // TODO: Do this manually to cover all cases
  },
  "accordions": content->content[_type == "accordion"] {
    "_key": _key,
    "title": ${plainTextExcludingStrikeThrough('title')},
    "ingress": pt::text(ingress),
    "accordionItems":accordion[]{
      "id": _key,
      title,
      "content": pt::text(content)
    }
  },
  "docToClear": ($id match content._ref || _id match $id)
}
`

const getQueryParams = (language: Language, id: string) => ({
  lang: language.internalCode,
  id: id,
})

export type Slug = {
  slug: string
}
export type TopicPage = {
  slug: string
  title: string
  textBlocks: MappableTextBlockType[]
  accordions: MappableAccordionType[]
  _id: string
  type: string
  docToClear?: boolean
}

type FetchDataType = (
  query: string,
) => (
  getQueryparams: (language: Language, id: string) => Readonly<Record<string, string>>,
) => (language: Language, id: string) => (sanityClient: SanityClient) => TE.TaskEither<Error, TopicPage[]>

const fetch: FetchDataType = (query) => (getQueryParams) => (language, id) => (sanityClient) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, getQueryParams(language, id)), E.toError))

export const fetchData = fetch(query)(getQueryParams)
