import { InstantSearchServerState } from 'react-instantsearch'
import type {
  MenuData,
  FooterColumns,
  IntlData,
  TeaserData,
  SeoData,
  HeroType,
  ImageWithCaptionData,
  BackgroundColours,
  CardData,
  LinkData,
  SanityNewsTag,
} from './types'
import { PortableTextBlock } from '@portabletext/types'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'

export type AlgoliaIndexPageType = {
  isServerRendered?: boolean
  serverState?: InstantSearchServerState
  url: string
  data: {
    menuData?: MenuData
    footerData?: { footerColumns: FooterColumns[] }
    intl: IntlData
    pageData: MagazineIndexPageType | NewsRoomPageType
    slug?: string
  }
}

export type NewsRoomNewsItem = {
  id: string
  slug: string
  title: string
  publishDateTime?: string
  heroImage: ImageWithCaptionData
  ingress?: string
}

export type NewsRoomPageType = {
  seoAndSome: SeoData
  title: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  news?: NewsRoomNewsItem[]
  subscriptionLink?: { slug: string; type: string; lang: string }
  subscriptionLinkTitle?: string
  localNewsPages?: LinkData[]
  fallbackImages?: SanityImageObject[]
  tags: {
    topic: SanityNewsTag[]
    country: SanityNewsTag[]
    year: SanityNewsTag[]
  }
}

export type MagazineIndexPageType = {
  seoAndSome: SeoData
  title: PortableTextBlock[]
  hero: HeroType
  ingress: {
    content: PortableTextBlock[]
    background: BackgroundColours
  }
  heroImage: ImageWithCaptionData
  footerComponent?: TeaserData
  magazineTags: string[]
  background: BackgroundColours
}
