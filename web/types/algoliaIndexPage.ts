import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { SearchResponse } from 'instantsearch.js'
import type { InstantSearchServerState } from 'react-instantsearch'
import type {
  FooterColumns,
  ImageWithCaptionData,
  IntlData,
  LinkData,
  MenuData,
  SeoData,
} from './index'

export type AlgoliaIndexPageType = {
  serverState?: InstantSearchServerState
  data: {
    menuData?: MenuData
    footerData?: { footerColumns: FooterColumns[] }
    intl: IntlData
    pageData: NewsRoomPageType
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
