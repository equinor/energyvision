import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'
import { Language } from '../../common'
import { MappableAccordionType, MappableTextBlockType } from '../common/mappers'
import { plainTextExcludingStrikeThrough } from '../../common/queryHelpers'
import { ImageWithAlt, ImageWithAltAndCaption } from '../common/types'

export enum HeroTypes {
  DEFAULT = 'default',
  FIFTY_FIFTY = 'fiftyFifty',
  FULL_WIDTH_IMAGE = 'fullWidthImage',
  LOOPING_VIDEO = 'loopingVideo',
}

const publishDateTimeQuery = /* groq */ `
  select(
    customPublicationDate == true =>
      publishDateTime,
      coalesce(firstPublishedAt, _createdAt)
  )
`

export const query = /* groq */ `*[_type == "magazine" && lang == $lang && !(_id in path("drafts.**")) && excludeFromSearch != true] {
  "slug": slug.current,
  _id,
  "title": ${plainTextExcludingStrikeThrough('title')},
  "type": _type,
  "ingress": pt::text(ingress),
  "textBlocks": content[_type == "textBlock"]{
    "_key": _key,
    "title": select(
      isBigText == true =>
      ${plainTextExcludingStrikeThrough('bigTitle')},
      ${plainTextExcludingStrikeThrough('title')}
      ),
    "ingress": pt::text(ingress),
    "text": pt::text(text)  // TODO: Do this manually to cover all cases
  },
  "accordions": content[_type == "accordion"] {
    "_key": _key,
    "title": ${plainTextExcludingStrikeThrough('title')},
    "ingress": pt::text(ingress),
    "accordionItems":accordion[]{
      "id": _key,
      title,
      "content": pt::text(content)
    }
  },
  "magazineTags": magazineTags[]->.title[$lang],
  "heroFigure": select(
    heroType == 'loopingVideo' => { "image": heroLoopingVideo->thumbnail },
    heroFigure),
  openGraphImage,
  "publishDateTime": ${publishDateTimeQuery},
  "docToClear": _id match $id
}
`

const getQueryParams = (language: Language, id: string) => ({
  lang: language.internalCode,
  id: id,
})

export type MagazineArticle = {
  slug: string
  title: string
  ingress: string
  type: string
  textBlocks: MappableTextBlockType[]
  accordions: MappableAccordionType[]
  _id: string
  magazineTags?: string[]
  heroFigure?: { image: ImageWithAlt } | ImageWithAltAndCaption
  openGraphImage?: ImageWithAlt
  docToClear?: boolean
  publishDateTime?: string
}

type FetchDataType = (
  query: string,
) => (
  getQueryparams: (language: Language, id: string) => Readonly<Record<string, string>>,
) => (language: Language, id: string) => (sanityClient: SanityClient) => TE.TaskEither<Error, MagazineArticle[]>

const fetch: FetchDataType = (query) => (getQueryParams) => (language, id) => (sanityClient) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, getQueryParams(language, id)), E.toError))

export const fetchData = fetch(query)(getQueryParams)
