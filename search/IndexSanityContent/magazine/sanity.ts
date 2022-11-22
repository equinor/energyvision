import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { SanityClient } from '@sanity/client'
import { Language } from '../../common'

export const query = /* groq */ `*[_type == "magazine" && _lang == $lang && !(_id in path("drafts.**")) && excludeFromSearch != true] {
  "slug": slug.current,
  _id,
  "title": pt::text(title),
  "type": _type,
  "ingress": pt::text(ingress),
  "textBlocks": content[_type == "textBlock"]{
    "_key": _key,
    "title": pt::text(title),
    "ingress": pt::text(ingress),
    "text": pt::text(text)  // TODO: Do this manually to cover all cases
  },
  "accordions": content[_type == "accordion"] {
    "_key": _key,
    "title": pt::text(title),
    "ingress": pt::text(ingress)
  },
  "magazineTags": magazineTags[]->.title[$lang],
  heroFigure,
  openGraphImage,
  "heroVideo":heroVideo.asset->{
    playbackId,
  },
  "heroType": coalesce(heroType, 'default'),
  "docToClear": _id match $id
}
`

const getQueryParams = (language: Language, id: string) => ({
  lang: language.internalCode,
  id: id,
})

export type ImageWithAlt = {
  _type: 'imageWithAlt'
  alt: string
  isDecorative?: boolean
  asset: {
    _ref: string
    _type: 'reference'
  }
  crop?: {
    _type: 'sanity.imageCrop'
    bottom: number
    left: number
    right: number
    top: number
  }
  hotspot?: {
    _type: 'sanity.imageHotspot'
    height: number
    width: number
    x: number
    y: number
  }
}

export type ImageWithAltAndCaption = {
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: ImageWithAlt
}

export type VideoData = {
  playbackId: string
}

export enum HeroTypes {
  DEFAULT = 'default',
  FIFTY_FIFTY = 'fiftyFifty',
  FULL_WIDTH_IMAGE = 'fullWidthImage',
  VIDEO_HERO = 'videoHero',
}

export type MagazineArticle = {
  slug: string
  title: string
  ingress: string
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
  magazineTags?: string[]
  heroFigure?: ImageWithAltAndCaption
  openGraphImage?: ImageWithAlt
  docToClear?: boolean
  heroVideo: VideoData
  heroType: HeroTypes
}

type FetchDataType = (
  query: string,
) => (
  getQueryparams: (language: Language, id: string) => Readonly<Record<string, string>>,
) => (language: Language, id: string) => (sanityClient: SanityClient) => TE.TaskEither<Error, MagazineArticle[]>

const fetch: FetchDataType = (query) => (getQueryParams) => (language, id) => (sanityClient) =>
  pipe(TE.tryCatch(() => sanityClient.fetch(query, getQueryParams(language, id)), E.toError))

export const fetchData = fetch(query)(getQueryParams)
