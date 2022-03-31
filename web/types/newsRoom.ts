import { InstantSearchServerState } from 'react-instantsearch-hooks'
import type { MenuData, FooterColumns, IntlData, NewsroomData } from './types'

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
