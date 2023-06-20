import { InstantSearchServerState } from 'react-instantsearch-hooks-web'
import type {
  MenuData,
  FooterColumns,
  IntlData,
  TeaserData,
  SeoData,
  HeroType,
  ImageWithCaptionData,
  BackgroundColours,
} from './types'
import { PortableTextBlock } from '@portabletext/types'

export type AlgoliaIndexPageType = {
  serverState?: InstantSearchServerState
  url: string
  isServerRendered?: boolean
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
