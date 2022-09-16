import { InstantSearchServerState } from 'react-instantsearch-hooks-web'
import type { MenuData, FooterColumns, IntlData, ImageWithAlt } from './types'
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
export type MagazineIndexProps = { url: string } & AlgoliaIndexPageProps

export type AlgoliaIndexPageData = {
  documentTitle?: string
  metaDescription?: string
  openGraphImage?: ImageWithAlt
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
}

export type NewsroomData = AlgoliaIndexPageData
export type MagazineIndexData = AlgoliaIndexPageData
