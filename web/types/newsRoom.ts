import { InstantSearchServerState } from 'react-instantsearch-hooks-web'
import type { MenuData, FooterColumns, IntlData, ImageWithAlt } from './types'
import { PortableTextBlock } from '@portabletext/types'

export type NewsRoomProps = {
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

export type NewsroomData = {
  documentTitle?: string
  metaDescription?: string
  openGraphImage?: ImageWithAlt
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
}
