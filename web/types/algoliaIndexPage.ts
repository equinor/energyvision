import { InstantSearchServerState } from 'react-instantsearch'
import type {
  FooterColumns,
  IntlData,
  TeaserData,
  HeroType,
  ImageWithCaptionData,
  SeoData,
  BackgroundColours,
  MenuData,
  LinkData,
  MagazineCardData,
} from './index'
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
  firstPublishedAt?: string
  heroImage: ImageWithCaptionData
  thumbnailUrl?: string
  ingress?: string
  tags?: any
  countryTags?: any
}

export type NewsRoomPageType = {
  seoAndSome: SeoData
  title: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  subscriptionLink?: { slug: string; type: string; lang: string }
  subscriptionLinkTitle?: string
  newsArticles: NewsRoomNewsItem[]
  localNewsPages?: LinkData[]
  fallbackImages?: SanityImageObject[]
}

export type MagazineIndexPageType = {
  seoAndSome: SeoData
  title: PortableTextBlock[]
  hero: HeroType
  ingress: {
    content: PortableTextBlock[]
    background: BackgroundColours
  }
  query?: any
  magazineArticles: MagazineCardData[]
  heroImage: ImageWithCaptionData
  footerComponent?: TeaserData
  magazineTags: { id: string; title: string; key: string }[]
  background: BackgroundColours
}
