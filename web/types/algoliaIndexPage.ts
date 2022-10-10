import { InstantSearchServerState } from 'react-instantsearch-hooks-web'
import type { MenuData, FooterColumns, IntlData, ImageWithAlt, TeaserData, SeoData } from './types'
import { PortableTextBlock } from '@portabletext/types'

export type AlgoliaIndexPageProps = {
  serverState?: InstantSearchServerState
  /* url: string */
  isServerRendered?: boolean
  data: {
    menuData?: MenuData
    footerData?: { footerColumns: FooterColumns[] }
    intl: IntlData
    pageData: NewsroomData
    slug?: string
  }
}

export type NewsRoomProps = AlgoliaIndexPageProps
export type MagazineIndexProps = /* { url: string } & */ AlgoliaIndexPageProps

export type AlgoliaIndexPageData = {
  seoAndSome: SeoData
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  magazineTags: string[]
}

export type NewsroomData = AlgoliaIndexPageData
export type MagazineIndexData = {
  footerComponent?: TeaserData
} & AlgoliaIndexPageData
