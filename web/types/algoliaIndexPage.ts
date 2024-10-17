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
  MagazineCardData,
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
  query?: any
  magazineArticles: MagazineCardData[]
  heroImage: ImageWithCaptionData
  footerComponent?: TeaserData
  magazineTags: { id: string; title: string; key: string }[]
  background: BackgroundColours
}
