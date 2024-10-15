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
} from './index'
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

export type NewsRoomPageType = {
  seoAndSome: SeoData
  title: PortableTextBlock[]
  ingress?: PortableTextBlock[]
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
