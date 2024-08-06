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
} from './types'
import { PortableTextBlock } from '@portabletext/types'

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

export type Tag = {
  id?: string
  key?: string
  title?: string
}

export type NewsRoomPageType = {
  seoAndSome: SeoData
  title: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  newsList?: CardData[]
  newsTopicTagList?: Tag[]
  newsCountryTagList?: Tag[]
  subscriptionHeading?: string
  subscriptionLink?: LinkData
  subscriptionLinkTitle?: string
  localNewsPagesHeading?: string
  localNewsPages?: LinkData[]
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
