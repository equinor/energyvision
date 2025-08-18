import { InstantSearchServerState } from 'react-instantsearch'
import type {
  FooterColumns,
  IntlData,
  TeaserData,
  HeroType,
  ImageWithCaptionData,
  SeoData,
  MenuData,
  LinkData,
  MagazineCardData,
} from './index'
import { PortableTextBlock } from '@portabletext/types'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { SearchResponse } from 'instantsearch.js'
import { ColorKeyTokens } from '../styles/colorKeyToUtilityMap'

export type AlgoliaIndexPageType = {
  serverState?: InstantSearchServerState
  data: {
    menuData?: MenuData
    footerData?: { footerColumns: FooterColumns[] }
    intl: IntlData
    pageData: MagazineIndexPageType | NewsRoomPageType
    slug?: string
    response: SearchResponse<any>
  }
}

export type NewsRoomNewsItem = {
  id: string
  slug: string
  title: string
  publishDateTime?: string
  firstPublishedAt?: string
  heroImage: ImageWithCaptionData
  thumbnailUrl?: string
  ingress?: string
}

export type NewsRoomPageType = {
  seoAndSome: SeoData
  title: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  subscriptionLink?: LinkData
  subscriptionLinkTitle?: string
  localNewsPages?: LinkData[]
  fallbackImages?: SanityImageObject[]
}

export type MagazineIndexPageType = {
  seoAndSome: SeoData
  title: PortableTextBlock[]
  hero: HeroType
  ingress: {
    content: PortableTextBlock[]
    background: keyof ColorKeyTokens
  }
  query?: any
  magazineArticles: MagazineCardData[]
  heroImage: ImageWithCaptionData
  footerComponent?: TeaserData
  magazineTags: { id: string; title: string; key: string }[]
  background: keyof ColorKeyTokens
}
